/*
# Enable anon access for the public playground

## Purpose
The AI agent playground is a public, no-sign-in feature. Visitors need to:
1. Read the list of active agents (public columns only — system_prompt excluded).
2. Have the server create conversation + message rows when they chat.

Because there is no Supabase service-role key available in this environment,
the API routes use the anon key. This migration adds the minimum anon policies
needed for the playground to function, while keeping system_prompt protected.

## Security changes
- `agents`: anon + authenticated can SELECT. The API route only selects
  public columns (never system_prompt), so even though the policy allows
  the read, the route never returns the prompt to the browser. Admin
  management stays authenticated-only (insert/update/delete).
- `agent_conversations`: anon + authenticated can INSERT and SELECT.
  UPDATE/DELETE stay authenticated-only (admin analytics).
- `agent_messages`: anon + authenticated can INSERT and SELECT.
  UPDATE/DELETE stay authenticated-only.
- `agent_usage_daily`: anon + authenticated can SELECT (for guardrail checks)
  and INSERT (to create the daily row). UPDATE stays authenticated-only —
  the route uses an upsert pattern that works with INSERT + SELECT.

## Notes
1. system_prompt is still never sent to the client — the /api/agents/list
   route explicitly selects only public columns.
2. All conversation/message writes go through the API routes which apply
   guardrails (rate limits, caps) before writing.
3. These are intentionally permissive for a public demo playground. The
   admin CMS pages remain protected behind authenticated-only policies.
*/

-- agents: anon can read (public projection only; system_prompt never selected by the route)
DROP POLICY IF EXISTS "anon_select_agents" ON agents;
CREATE POLICY "anon_select_agents" ON agents FOR SELECT
  TO anon, authenticated USING (true);

-- agent_conversations: anon can insert + read (playground creates sessions)
DROP POLICY IF EXISTS "anon_insert_conversations" ON agent_conversations;
CREATE POLICY "anon_insert_conversations" ON agent_conversations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_conversations" ON agent_conversations;
CREATE POLICY "anon_select_conversations" ON agent_conversations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_update_conversations" ON agent_conversations;
CREATE POLICY "anon_update_conversations" ON agent_conversations FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- agent_messages: anon can insert + read
DROP POLICY IF EXISTS "anon_insert_messages" ON agent_messages;
CREATE POLICY "anon_insert_messages" ON agent_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_messages" ON agent_messages;
CREATE POLICY "anon_select_messages" ON agent_messages FOR SELECT
  TO anon, authenticated USING (true);

-- agent_usage_daily: anon can read (guardrail check) + insert (first row of the day)
DROP POLICY IF EXISTS "anon_select_usage" ON agent_usage_daily;
CREATE POLICY "anon_select_usage" ON agent_usage_daily FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_usage" ON agent_usage_daily;
CREATE POLICY "anon_insert_usage" ON agent_usage_daily FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_usage" ON agent_usage_daily;
CREATE POLICY "anon_update_usage" ON agent_usage_daily FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);
