/*
# AgenticPoint Website Schema

## Overview
Public-facing website schema for AgenticPoint AI Automation Studio.
No authentication required for public reads/writes — all data accessible by anon key.

## Tables
### contact_requests
Stores discovery call requests and project inquiry form submissions from website visitors.
- id: Primary key
- name: Visitor's full name
- email: Contact email
- company: Company or organization name
- message: Project description or inquiry details
- service_interest: Which service they are interested in
- created_at: Submission timestamp

### newsletter_subscribers
Stores email addresses for newsletter/update subscriptions.
- id: Primary key
- email: Subscriber email (unique)
- created_at: Subscription timestamp

### portfolio_projects
Stores portfolio case study data displayed on the website.
- id: Primary key
- title, slug, category: Project identity
- challenge, solution, outcome: Case study narrative
- tech_stack: Array of technologies used
- is_featured: Whether to show on homepage
- sort_order: Display order
- created_at: Creation timestamp

### testimonials
Reserved for future client testimonials.
- id, client_name, client_title, content, rating, is_published, created_at

## Security
- RLS enabled on all tables
- All policies use TO anon, authenticated (public-facing app)
- contact_requests and newsletter_subscribers: INSERT allowed for visitors, SELECT restricted to authenticated
- portfolio_projects and testimonials: SELECT allowed publicly, write restricted to authenticated
*/

-- Contact Requests
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text,
  service_interest text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact" ON contact_requests;
CREATE POLICY "public_insert_contact" ON contact_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "no_public_select_contact" ON contact_requests;
CREATE POLICY "no_public_select_contact" ON contact_requests FOR SELECT
  TO authenticated USING (true);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "no_public_select_newsletter" ON newsletter_subscribers;
CREATE POLICY "no_public_select_newsletter" ON newsletter_subscribers FOR SELECT
  TO authenticated USING (true);

-- Portfolio Projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  challenge text,
  solution text,
  outcome text,
  tech_stack text[] DEFAULT '{}',
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_portfolio" ON portfolio_projects;
CREATE POLICY "public_select_portfolio" ON portfolio_projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_portfolio" ON portfolio_projects;
CREATE POLICY "auth_insert_portfolio" ON portfolio_projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_portfolio" ON portfolio_projects;
CREATE POLICY "auth_update_portfolio" ON portfolio_projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_portfolio" ON portfolio_projects;
CREATE POLICY "auth_delete_portfolio" ON portfolio_projects FOR DELETE
  TO authenticated USING (true);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_testimonials" ON testimonials;
CREATE POLICY "public_select_testimonials" ON testimonials FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials" ON testimonials FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_testimonials" ON testimonials;
CREATE POLICY "auth_update_testimonials" ON testimonials FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials" ON testimonials FOR DELETE
  TO authenticated USING (true);

-- Seed featured portfolio projects
INSERT INTO portfolio_projects (title, slug, category, challenge, solution, outcome, tech_stack, is_featured, sort_order)
VALUES
  (
    'WhatsApp Lead Qualification Agent',
    'whatsapp-lead-qualification',
    'WhatsApp AI',
    'A real estate agency was manually screening 200+ daily WhatsApp inquiries, missing hot leads during off-hours.',
    'Built an AI assistant on WhatsApp Business API that qualifies leads with a 7-question flow, scores intent, and routes hot prospects to agents instantly.',
    '68% reduction in response time, 3x increase in qualified meetings booked, 24/7 lead coverage.',
    ARRAY['WhatsApp Business API', 'OpenAI GPT-4', 'n8n', 'Supabase', 'Twilio'],
    true, 1
  ),
  (
    'Healthcare Follow-up Assistant',
    'healthcare-followup-assistant',
    'Healthcare AI',
    'A medical clinic struggled with post-appointment follow-ups and medication reminders, leading to poor adherence rates.',
    'Deployed a HIPAA-aware AI assistant that sends personalized follow-up messages, appointment reminders, and escalates concerns to medical staff.',
    '40% improvement in patient adherence, 60% reduction in no-shows, staff saved 15 hours/week.',
    ARRAY['Twilio', 'OpenAI', 'Supabase', 'n8n', 'Google Calendar API'],
    true, 2
  ),
  (
    'Intelligent Appointment Booking Agent',
    'appointment-booking-agent',
    'Business Automation',
    'A professional services firm was losing clients due to slow response to booking requests and scheduling conflicts.',
    'Built a conversational booking agent that checks availability, handles rescheduling, sends confirmations, and syncs with Google Calendar in real time.',
    '90% of bookings now automated, zero scheduling conflicts, 4.9/5 client satisfaction score.',
    ARRAY['Google Calendar API', 'OpenAI', 'n8n', 'Supabase', 'Calendly'],
    true, 3
  ),
  (
    'Customer Support AI Platform',
    'customer-support-ai',
    'AI Assistants',
    'An e-commerce brand was receiving 500+ daily support tickets with a 48-hour average response time.',
    'Deployed a multi-channel AI support agent trained on product knowledge base, handling returns, tracking, and FAQs across email, chat, and WhatsApp.',
    '78% of tickets resolved without human intervention, average response time dropped to 2 minutes.',
    ARRAY['OpenAI GPT-4', 'Supabase pgvector', 'n8n', 'Intercom', 'Shopify API'],
    true, 4
  ),
  (
    'Automated Invoice Processing System',
    'invoice-processing-ai',
    'Document AI',
    'An accounting firm was spending 40+ hours/week manually extracting data from vendor invoices.',
    'Built a document intelligence pipeline that extracts, validates, and reconciles invoice data, then pushes structured records into their ERP system.',
    '95% accuracy in extraction, 38 hours/week saved, payable cycle cut from 12 days to 3.',
    ARRAY['Claude AI', 'n8n', 'Supabase', 'Google Cloud Vision', 'QuickBooks API'],
    true, 5
  ),
  (
    'AI-Powered Sales Proposal Generator',
    'proposal-generator',
    'Internal AI Tools',
    'A B2B agency took 3-5 days to create custom proposals, losing deals to faster competitors.',
    'Built an AI proposal engine that takes a brief, pulls relevant case studies and pricing, and generates a tailored, branded proposal in under 10 minutes.',
    'Proposal creation time reduced from 3 days to 10 minutes, 45% higher win rate on proposals sent within 24 hours.',
    ARRAY['OpenAI GPT-4', 'Anthropic Claude', 'n8n', 'Notion API', 'Google Docs API'],
    true, 6
  )
ON CONFLICT (slug) DO NOTHING;