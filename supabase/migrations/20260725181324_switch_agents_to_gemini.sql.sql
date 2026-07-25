/*
# Switch all seeded AI agents to Google Gemini models

## Purpose
The user is on the Gemini free tier and wants all playground agents to use
Gemini models exclusively. This migration updates every existing agent row
to use the Gemini provider with an appropriate free-tier model, mapped by
the agent's purpose:

- High-quality / long-output agents (Proposal Generator, Knowledge Base) →
  gemini-2.5-pro (most capable; still free-tier eligible at low volume).
- Standard conversational agents (Sales Qualification, Customer Support,
  Appointment Booking, Email Assistant, Healthcare Follow-up) →
  gemini-3-flash-preview (fast, capable, free-tier friendly).
- Lightweight extraction agent (Document Intelligence) →
  gemini-3.1-flash-lite (cheapest, ideal for structured tasks).

## Models used (official Gemini API identifiers)
- gemini-3-flash-preview      (Gemini 3 Flash)
- gemini-3.5-flash            (Gemini 3.5 Flash)
- gemini-3.1-flash-lite       (Gemini 3.5 Flash-Lite equivalent / lite tier)
- gemini-2.5-pro              (Gemini 2.5 Pro)
- gemini-2.5-flash            (Gemini 2.5 Flash)

## Notes
1. Only the provider and model columns change — system prompts, caps, and
   all other configuration are preserved.
2. The admin "New Agent" form now defaults to Gemini as well.
3. These are the official model identifiers from Google's Gemini API docs,
   confirmed compatible with the free tier at ai.google.dev.
*/

UPDATE agents SET provider = 'gemini', model = 'gemini-3-flash-preview', updated_at = now()
  WHERE slug IN ('lead-qualification', 'customer-support', 'appointment', 'email-assistant', 'healthcare-followup');

UPDATE agents SET provider = 'gemini', model = 'gemini-2.5-pro', updated_at = now()
  WHERE slug IN ('proposal-generator', 'knowledge-base');

UPDATE agents SET provider = 'gemini', model = 'gemini-3.1-flash-lite', updated_at = now()
  WHERE slug = 'document-intelligence';
