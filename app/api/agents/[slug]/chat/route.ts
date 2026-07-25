import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { callProvider, SAFETY_SUFFIX, type ChatMessage } from '@/lib/agent-providers';
import {
  validateInput,
  clampMaxTokens,
  todayDate,
  RATE_LIMIT_MS,
  type GuardrailError,
} from '@/lib/agent-guardrails';

export const dynamic = 'force-dynamic';

type AgentRow = {
  id: string;
  slug: string;
  name: string;
  provider: string;
  model: string;
  system_prompt: string;
  temperature: number;
  max_tokens: number;
  top_p: number;
  session_message_cap: number;
  daily_request_cap: number;
  is_active: boolean;
};

function errorResponse(err: GuardrailError) {
  return NextResponse.json({ error: err.message, code: err.code }, { status: err.httpStatus });
}

function serverError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  let body: { message?: string; sessionId?: string; history?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return serverError('Invalid request body.', 400);
  }

  const userMessage = body.message ?? '';
  const sessionId = body.sessionId ?? '';
  const history: ChatMessage[] = Array.isArray(body.history) ? body.history : [];

  if (!sessionId) return serverError('Missing session id.', 400);

  const inputError = validateInput(userMessage);
  if (inputError) return errorResponse(inputError);

  const { data: agent, error: agentErr } = await supabase
    .from('agents')
    .select('id, slug, name, provider, model, system_prompt, temperature, max_tokens, top_p, session_message_cap, daily_request_cap, is_active')
    .eq('slug', params.slug)
    .maybeSingle<AgentRow>();

  if (agentErr || !agent) return serverError('Agent not found.', 404);
  if (!agent.is_active) return serverError('This agent is currently unavailable.', 403);

  // 1. Session cap — find or create conversation, count messages
  const { data: convo } = await supabase
    .from('agent_conversations')
    .select('id, message_count, created_at')
    .eq('agent_id', agent.id)
    .eq('session_id', sessionId)
    .maybeSingle<{ id: string; message_count: number; created_at: string }>();

  if (convo && convo.message_count >= agent.session_message_cap) {
    return errorResponse({
      code: 'session_limit_reached',
      message: `You've reached the demo limit of ${agent.session_message_cap} messages. Start a new conversation or contact us to build a full version.`,
      httpStatus: 429,
    });
  }

  // 2. Rate limit — prevent spam within a session
  if (convo) {
    const lastMessage = await supabase
      .from('agent_messages')
      .select('created_at')
      .eq('conversation_id', convo.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle<{ created_at: string }>();

    if (lastMessage.data) {
      const age = Date.now() - new Date(lastMessage.data.created_at).getTime();
      if (age < RATE_LIMIT_MS) {
        return errorResponse({
          code: 'rate_limited',
          message: 'Please wait a moment before sending another message.',
          httpStatus: 429,
        });
      }
    }
  }

  // 3. Daily request cap
  const today = todayDate();
  const { data: usage } = await supabase
    .from('agent_usage_daily')
    .select('request_count, total_tokens')
    .eq('usage_date', today)
    .eq('agent_id', agent.id)
    .maybeSingle<{ request_count: number; total_tokens: number }>();

  if (usage && usage.request_count >= agent.daily_request_cap) {
    return errorResponse({
      code: 'daily_limit_reached',
      message: 'This demo has reached its daily usage limit. Please come back tomorrow or contact us to build your own.',
      httpStatus: 429,
    });
  }

  // 4. Build message payload with safety suffix
  const cappedMaxTokens = clampMaxTokens(agent.max_tokens);
  const messages: ChatMessage[] = [
    { role: 'system', content: agent.system_prompt + SAFETY_SUFFIX },
    ...history.slice(-10).filter((m) => m.role === 'user' || m.role === 'assistant'),
    { role: 'user', content: userMessage },
  ];

  // 5. Call provider
  let result;
  try {
    result = await callProvider(
      { provider: agent.provider, model: agent.model, temperature: agent.temperature, max_tokens: cappedMaxTokens, top_p: agent.top_p },
      messages,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Provider call failed.';
    return serverError(`AI provider error: ${message}`, 502);
  }

  // 6. Persist conversation + messages + usage (best-effort, non-blocking)
  const persist = (async () => {
    try {
      let conversationId = convo?.id;
      const newCount = (convo?.message_count ?? 0) + 1;

      if (!conversationId) {
        const { data: newConvo } = await supabase
          .from('agent_conversations')
          .insert({ agent_id: agent.id, session_id: sessionId, message_count: 1 })
          .select('id')
          .single();
        conversationId = newConvo?.id;
      } else {
        await supabase
          .from('agent_conversations')
          .update({ message_count: newCount, last_message_at: new Date().toISOString() })
          .eq('id', conversationId);
      }

      if (conversationId) {
        await supabase.from('agent_messages').insert([
          { conversation_id: conversationId, role: 'user', content: userMessage },
          { conversation_id: conversationId, role: 'assistant', content: result.text, tokens_used: result.tokensUsed },
        ]);
      }

      // Upsert daily usage
      if (usage) {
        await supabase
          .from('agent_usage_daily')
          .update({ request_count: usage.request_count + 1, total_tokens: (usage.total_tokens ?? 0) + result.tokensUsed })
          .eq('usage_date', today)
          .eq('agent_id', agent.id);
      } else {
        await supabase
          .from('agent_usage_daily')
          .insert({ usage_date: today, agent_id: agent.id, request_count: 1, total_tokens: result.tokensUsed });
      }
    } catch {
      // Persistence is best-effort — user still got their answer.
    }
  })();
  void persist;

  return NextResponse.json({ reply: result.text, tokensUsed: result.tokensUsed });
}
