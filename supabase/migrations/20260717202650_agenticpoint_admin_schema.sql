/*
# AgenticPoint Admin Schema

## Overview
Admin content management tables and lead tracking enhancements.

## Tables

### articles
Blog articles and content managed from the admin dashboard.
- id: Primary key
- title, slug: Article identity
- excerpt: Short preview text
- content: Full article content (markdown)
- category: Article category tag
- status: 'draft' or 'published'
- cover_image_url: Optional header image
- read_time: Estimated read time string
- author: Author display name
- published_at: Timestamp when published
- created_at, updated_at: Timestamps

### resources
Downloadable templates, guides, checklists, and tools.
- id: Primary key
- title, description: Resource identity
- type: 'template' | 'guide' | 'tool' | 'checklist' | 'other'
- file_url: Optional download URL
- tags: Text array of tags
- download_count: Counter for tracking
- is_published: Public visibility flag
- created_at: Timestamp

### site_settings
Key-value store for editable site content.
- key: Setting identifier (primary key)
- value: Setting value
- updated_at: Last update timestamp

## Alterations

### contact_requests
Add status column for lead tracking (new/reviewed/archived).
No data is affected — default is 'new' for all rows.

## Security
- RLS enabled on all new tables
- Articles and resources: anon SELECT on published only; authenticated full CRUD
- site_settings: anon SELECT; authenticated INSERT/UPDATE
- contact_requests status: authenticated UPDATE allowed
*/

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  category text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  cover_image_url text,
  read_time text,
  author text DEFAULT 'AgenticPoint Team',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_published_articles" ON articles;
CREATE POLICY "anon_select_published_articles" ON articles FOR SELECT
  TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "auth_insert_articles" ON articles;
CREATE POLICY "auth_insert_articles" ON articles FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_articles" ON articles;
CREATE POLICY "auth_update_articles" ON articles FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_articles" ON articles;
CREATE POLICY "auth_delete_articles" ON articles FOR DELETE
  TO authenticated USING (true);

-- Admin full select (for dashboard)
DROP POLICY IF EXISTS "auth_select_all_articles" ON articles;
CREATE POLICY "auth_select_all_articles" ON articles FOR SELECT
  TO authenticated USING (true);

-- Resources
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'template' CHECK (type IN ('template', 'guide', 'tool', 'checklist', 'other')),
  file_url text,
  tags text[] DEFAULT '{}',
  download_count integer DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_published_resources" ON resources;
CREATE POLICY "anon_select_published_resources" ON resources FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "auth_select_all_resources" ON resources;
CREATE POLICY "auth_select_all_resources" ON resources FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_resources" ON resources;
CREATE POLICY "auth_insert_resources" ON resources FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_resources" ON resources;
CREATE POLICY "auth_update_resources" ON resources FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_resources" ON resources;
CREATE POLICY "auth_delete_resources" ON resources FOR DELETE
  TO authenticated USING (true);

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_settings" ON site_settings;
CREATE POLICY "anon_select_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_upsert_settings" ON site_settings;
CREATE POLICY "auth_upsert_settings" ON site_settings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_settings" ON site_settings;
CREATE POLICY "auth_update_settings" ON site_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Add status column to contact_requests (additive only)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_requests' AND column_name = 'status'
  ) THEN
    ALTER TABLE contact_requests ADD COLUMN status text DEFAULT 'new';
  END IF;
END $$;

-- Allow authenticated users to update contact_requests (for marking as reviewed)
DROP POLICY IF EXISTS "auth_update_contacts" ON contact_requests;
CREATE POLICY "auth_update_contacts" ON contact_requests FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated users to select all contact requests
DROP POLICY IF EXISTS "auth_select_all_contacts" ON contact_requests;
CREATE POLICY "auth_select_all_contacts" ON contact_requests FOR SELECT
  TO authenticated USING (true);

-- Seed default site settings
INSERT INTO site_settings (key, value) VALUES
  ('hero_headline', 'Building AI Employees for Modern Businesses.'),
  ('hero_subheadline', 'We design and deploy intelligent AI systems that automate operations, eliminate repetitive work, and help your business scale — without scaling headcount.'),
  ('hero_cta_primary', 'Book Discovery Call'),
  ('contact_email', 'hello@agenticpoint.com'),
  ('company_name', 'AgenticPoint')
ON CONFLICT (key) DO NOTHING;
