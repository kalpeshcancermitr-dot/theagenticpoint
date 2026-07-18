-- Add new site_settings keys introduced by the expanded admin settings page.
-- Uses INSERT ... ON CONFLICT DO NOTHING so existing values are preserved.

INSERT INTO site_settings (key, value) VALUES
  ('hero_stat_1_value', '50+'),
  ('hero_stat_1_label', 'AI Systems Deployed'),
  ('hero_stat_2_value', '10x'),
  ('hero_stat_2_label', 'Average ROI'),
  ('hero_stat_3_value', '2-4 wks'),
  ('hero_stat_3_label', 'To Production'),
  ('calendly_url', 'https://calendly.com/agenticpoint/discovery'),
  ('whatsapp_number', ''),
  ('social_twitter_url', ''),
  ('social_linkedin_url', ''),
  ('social_github_url', '')
ON CONFLICT (key) DO NOTHING;
