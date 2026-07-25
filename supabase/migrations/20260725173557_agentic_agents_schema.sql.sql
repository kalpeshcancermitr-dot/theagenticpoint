/*
# AgenticPoint AI Agents Platform Schema

## Purpose
Adds the data layer that powers the real, functional AI agent playground:
configurable agents, anonymous visitor conversations, message history, and
per-agent daily usage tracking for cost guardrails. This is additive — no
existing tables are modified, and all current functionality (leads, articles,
portfolio, contact form, etc.) is unchanged.

## New Tables

1. `agents` — the configurable AI agents shown in the public playground.
   - slug (unique, URL identifier), name, description, category, icon
     (lucide-react name), color_theme
   - provider ('openai' | 'gemini' | 'anthropic'), model, system_prompt
     (NEVER exposed to the public client), welcome_message,
     suggested_prompts (quick-reply chips)
   - tuning: temperature, max_tokens, top_p
   - control: is_active, is_featured, sort_order
   - guardrails: daily_request_cap, session_message_cap
   - timestamps

2. `agent_conversations` — one row per anonymous visitor chat session.
   - agent_id (FK cascade), session_id (client-generated UUID stored in
     localStorage), optional lead_email, message_count, timestamps

3. `agent_messages` — every message in every conversation.
   - conversation_id (FK cascade), role ('user' | 'assistant'), content,
     tokens_used, created_at

4. `agent_usage_daily` — daily aggregate per agent for budget guardrails.
   - composite PK (usage_date, agent_id), request_count, total_tokens

## Security (RLS)

- `agents`: authenticated admin can manage (select/insert/update/delete).
  The public playground NEVER reads this table directly with the anon key —
  it reads a safe, system_prompt-free projection via the server-side API
  route (service role bypasses RLS). This prevents system_prompt leakage to
  the browser. No anon policy is intentionally created.
- `agent_conversations`, `agent_messages`, `agent_usage_daily`: written only
  by the server (service role bypasses RLS inside API routes). Authenticated
  admin can read them for analytics. No direct client writes allowed.

## Notes
1. The system_prompt column is intentionally NOT readable by the anon role.
2. Conversation/message INSERTs happen server-side via the service-role key,
   so they are not blocked by the authenticated-only RLS policies.
3. All caps default to values that protect a public site from runaway cost.
*/

-- ============================================================
-- AGENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  category text,
  icon text DEFAULT 'bot',
  color_theme text DEFAULT 'primary',
  provider text NOT NULL DEFAULT 'openai',
  model text NOT NULL DEFAULT 'gpt-4o-mini',
  system_prompt text NOT NULL DEFAULT 'You are a helpful assistant.',
  welcome_message text,
  suggested_prompts text[] DEFAULT '{}',
  temperature numeric DEFAULT 0.7,
  max_tokens int DEFAULT 500,
  top_p numeric DEFAULT 1.0,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  sort_order int DEFAULT 0,
  daily_request_cap int DEFAULT 200,
  session_message_cap int DEFAULT 15,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- CONVERSATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS agent_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  lead_email text,
  message_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_agent_conversations_agent_session
  ON agent_conversations(agent_id, session_id);

-- ============================================================
-- MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS agent_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES agent_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL,
  tokens_used int,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_agent_messages_conversation
  ON agent_messages(conversation_id, created_at);

-- ============================================================
-- USAGE DAILY
-- ============================================================
CREATE TABLE IF NOT EXISTS agent_usage_daily (
  usage_date date NOT NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
  request_count int DEFAULT 0,
  total_tokens int DEFAULT 0,
  PRIMARY KEY (usage_date, agent_id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_usage_daily ENABLE ROW LEVEL SECURITY;

-- agents: only authenticated admin can manage (public reads go through the
-- server-side API route using the service-role key, which bypasses RLS).
DROP POLICY IF EXISTS "admin_select_agents" ON agents;
CREATE POLICY "admin_select_agents" ON agents FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_agents" ON agents;
CREATE POLICY "admin_insert_agents" ON agents FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_agents" ON agents;
CREATE POLICY "admin_update_agents" ON agents FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_agents" ON agents;
CREATE POLICY "admin_delete_agents" ON agents FOR DELETE
  TO authenticated USING (true);

-- conversations / messages / usage: authenticated admin can read for analytics.
-- Writes happen server-side via service role (bypasses RLS), so no anon/auth
-- insert policies are created — direct client writes are intentionally blocked.
DROP POLICY IF EXISTS "admin_select_conversations" ON agent_conversations;
CREATE POLICY "admin_select_conversations" ON agent_conversations FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_select_messages" ON agent_messages;
CREATE POLICY "admin_select_messages" ON agent_messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_select_usage" ON agent_usage_daily;
CREATE POLICY "admin_select_usage" ON agent_usage_daily FOR SELECT
  TO authenticated USING (true);
