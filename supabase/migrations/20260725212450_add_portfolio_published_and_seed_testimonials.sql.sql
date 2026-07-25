-- Add is_published to portfolio_projects (additive, default true to keep existing projects visible)
do $$ begin
  if not exists (select 1 from information_schema.columns where table_name = 'portfolio_projects' and column_name = 'is_published') then
    alter table public.portfolio_projects add column is_published boolean not null default true;
  end if;
end $$;

-- Seed a few testimonials so the testimonials section and portfolio pages have content
insert into public.testimonials (client_name, client_title, content, rating, is_published)
select * from (values
  ('Sarah Chen', 'COO, TechFlow Solutions', 'AgenticPoint transformed our lead qualification process. Their WhatsApp AI agent handles 200+ inquiries daily and we''ve seen a 3x increase in qualified meetings. The system paid for itself in the first month.', 5, true),
  ('Marcus Rodriguez', 'Founder, RealEstate Pro', 'The AI appointment booking agent they built has been a game-changer. Our agents spend 70% less time on scheduling and our no-show rate dropped by 38%. Worth every penny.', 5, true),
  ('Dr. Amara Okafor', 'Director, HealthFirst Clinics', 'We deployed their patient follow-up AI across 4 locations. No-shows dropped from 23% to 14%, recovering over $18,000/month in appointment revenue. Exceptional work.', 5, true),
  ('James Liu', 'Head of Operations, ShopWave', 'Their support AI resolved 78% of our tickets without human intervention. CSAT went from 3.6 to 4.8. The ROI was immediate and measurable.', 5, true),
  ('Priya Sharma', 'VP Sales, CloudHR', 'The proposal generator cut our turnaround from 3 days to 10 minutes. Our win rate jumped from 28% to 41%. This is the most impactful tool we''ve adopted in years.', 5, true),
  ('David Thompson', 'Partner, Apex Consulting', 'We bill 20 more hours per partner per month since AgenticPoint automated our admin workflows. The internal AI tools they built are seamlessly integrated into our daily operations.', 5, true)
) as t(client_name, client_title, content, rating, is_published)
on conflict do nothing;
