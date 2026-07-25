/*
# Admin RBAC, Services, Solutions, and Portfolio Case Studies

## Overview
Adds a full role-based access control system for the admin dashboard, plus
database-backed Services and Solutions (currently hardcoded), and detailed
case-study fields for portfolio projects.

## New Tables
- admin_roles, admin_permissions, admin_role_permissions, admin_profiles (RBAC)
- services, service_landing_sections, service_testimonials (Services + landing pages)
- solutions (Industries)
- portfolio_testimonials (case-study testimonials)

## Alterations
- portfolio_projects: add case_study_headline, case_study_detail, detailed_sections, is_case_study (additive)

## Security
- RLS on all tables. RBAC tables writable only by super admins via is_super_admin().
- Public read on published services + solutions; authenticated CRUD otherwise.
*/

-- ============================================================================
-- RBAC: roles
-- ============================================================================
create table if not exists public.admin_roles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  is_super_admin boolean not null default false,
  created_at timestamptz default now()
);
alter table public.admin_roles enable row level security;

-- ============================================================================
-- RBAC: permissions catalog
-- ============================================================================
create table if not exists public.admin_permissions (
  id uuid primary key default gen_random_uuid(),
  module text not null,
  action text not null,
  description text,
  unique (module, action)
);
alter table public.admin_permissions enable row level security;

-- ============================================================================
-- RBAC: role <-> permission join
-- ============================================================================
create table if not exists public.admin_role_permissions (
  role_id uuid not null references public.admin_roles(id) on delete cascade,
  permission_id uuid not null references public.admin_permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);
alter table public.admin_role_permissions enable row level security;

-- ============================================================================
-- RBAC: user profiles (link auth.users -> role)
-- ============================================================================
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role_id uuid references public.admin_roles(id) on delete set null,
  display_name text,
  created_at timestamptz default now()
);
alter table public.admin_profiles enable row level security;

-- ============================================================================
-- RBAC: helper function (defined after tables exist)
-- ============================================================================
create or replace function public.is_super_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.admin_profiles ap
    join public.admin_roles ar on ar.id = ap.role_id
    where ap.user_id = auth.uid() and ar.is_super_admin = true
  );
$$;

-- Policies (after function exists)
drop policy if exists "auth_select_admin_roles" on public.admin_roles;
create policy "auth_select_admin_roles" on public.admin_roles for select to authenticated using (true);
drop policy if exists "superadmin_insert_admin_roles" on public.admin_roles;
create policy "superadmin_insert_admin_roles" on public.admin_roles for insert to authenticated with check (public.is_super_admin());
drop policy if exists "superadmin_update_admin_roles" on public.admin_roles;
create policy "superadmin_update_admin_roles" on public.admin_roles for update to authenticated using (public.is_super_admin()) with check (public.is_super_admin());
drop policy if exists "superadmin_delete_admin_roles" on public.admin_roles;
create policy "superadmin_delete_admin_roles" on public.admin_roles for delete to authenticated using (public.is_super_admin());

drop policy if exists "auth_select_admin_permissions" on public.admin_permissions;
create policy "auth_select_admin_permissions" on public.admin_permissions for select to authenticated using (true);
drop policy if exists "superadmin_write_admin_permissions" on public.admin_permissions;
create policy "superadmin_write_admin_permissions" on public.admin_permissions for insert to authenticated with check (public.is_super_admin());
drop policy if exists "superadmin_update_admin_permissions" on public.admin_permissions;
create policy "superadmin_update_admin_permissions" on public.admin_permissions for update to authenticated using (public.is_super_admin()) with check (public.is_super_admin());
drop policy if exists "superadmin_delete_admin_permissions" on public.admin_permissions;
create policy "superadmin_delete_admin_permissions" on public.admin_permissions for delete to authenticated using (public.is_super_admin());

drop policy if exists "auth_select_role_permissions" on public.admin_role_permissions;
create policy "auth_select_role_permissions" on public.admin_role_permissions for select to authenticated using (true);
drop policy if exists "superadmin_write_role_permissions" on public.admin_role_permissions;
create policy "superadmin_write_role_permissions" on public.admin_role_permissions for insert to authenticated with check (public.is_super_admin());
drop policy if exists "superadmin_delete_role_permissions" on public.admin_role_permissions;
create policy "superadmin_delete_role_permissions" on public.admin_role_permissions for delete to authenticated using (public.is_super_admin());

drop policy if exists "auth_select_admin_profiles" on public.admin_profiles;
create policy "auth_select_admin_profiles" on public.admin_profiles for select to authenticated using (true);
drop policy if exists "superadmin_insert_admin_profiles" on public.admin_profiles;
create policy "superadmin_insert_admin_profiles" on public.admin_profiles for insert to authenticated with check (public.is_super_admin());
drop policy if exists "superadmin_update_admin_profiles" on public.admin_profiles;
create policy "superadmin_update_admin_profiles" on public.admin_profiles for update to authenticated using (public.is_super_admin()) with check (public.is_super_admin());
drop policy if exists "superadmin_delete_admin_profiles" on public.admin_profiles;
create policy "superadmin_delete_admin_profiles" on public.admin_profiles for delete to authenticated using (public.is_super_admin());

-- Seed permissions catalog
insert into public.admin_permissions (module, action, description)
select * from (values
  ('dashboard','view','View the admin dashboard overview'),
  ('leads','view','View inbound leads'), ('leads','edit','Update lead status'),
  ('agents','view','View AI agents'), ('agents','create','Create AI agents'), ('agents','edit','Edit AI agents'), ('agents','delete','Delete AI agents'),
  ('articles','view','View articles'), ('articles','create','Create articles'), ('articles','edit','Edit articles'), ('articles','delete','Delete articles'),
  ('resources','view','View resources'), ('resources','create','Create resources'), ('resources','edit','Edit resources'), ('resources','delete','Delete resources'),
  ('portfolio','view','View portfolio'), ('portfolio','create','Create portfolio projects'), ('portfolio','edit','Edit portfolio projects'), ('portfolio','delete','Delete portfolio projects'),
  ('testimonials','view','View testimonials'), ('testimonials','create','Create testimonials'), ('testimonials','edit','Edit testimonials'), ('testimonials','delete','Delete testimonials'),
  ('services','view','View services'), ('services','create','Create services'), ('services','edit','Edit services'), ('services','delete','Delete services'),
  ('solutions','view','View solutions'), ('solutions','create','Create solutions'), ('solutions','edit','Edit solutions'), ('solutions','delete','Delete solutions'),
  ('settings','view','View site settings'), ('settings','edit','Edit site settings'),
  ('users','view','View admin users'), ('users','create','Invite admin users'), ('users','edit','Edit admin users'), ('users','delete','Remove admin users'),
  ('roles','view','View roles & permissions'), ('roles','create','Create roles'), ('roles','edit','Edit roles & permissions'), ('roles','delete','Delete roles')
) as t(module, action, description)
on conflict (module, action) do nothing;

-- Seed roles
insert into public.admin_roles (name, description, is_super_admin)
select 'Super Admin','Full access to every module and activity', true
where not exists (select 1 from public.admin_roles where is_super_admin = true);
insert into public.admin_roles (name, description, is_super_admin)
select 'Editor','View and edit content across modules', false
on conflict (name) do nothing;

-- Super Admin gets every permission
insert into public.admin_role_permissions (role_id, permission_id)
select r.id, p.id from public.admin_roles r cross join public.admin_permissions p
where r.is_super_admin = true on conflict do nothing;

-- Editor gets content-module permissions
insert into public.admin_role_permissions (role_id, permission_id)
select r.id, p.id from public.admin_roles r
join public.admin_permissions p on p.module in ('leads','agents','articles','resources','portfolio','testimonials','services','solutions') and p.action in ('view','edit','create','delete')
where r.name = 'Editor' on conflict do nothing;

-- ============================================================================
-- Services
-- ============================================================================
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  icon text default 'Workflow',
  accent_color text default '#2862d7',
  problem text,
  solution text,
  benefits text[] default '{}',
  tech_stack text[] default '{}',
  is_published boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.services enable row level security;
drop policy if exists "anon_select_published_services" on public.services;
create policy "anon_select_published_services" on public.services for select to anon, authenticated using (is_published = true);
drop policy if exists "auth_select_all_services" on public.services;
create policy "auth_select_all_services" on public.services for select to authenticated using (true);
drop policy if exists "auth_insert_services" on public.services;
create policy "auth_insert_services" on public.services for insert to authenticated with check (true);
drop policy if exists "auth_update_services" on public.services;
create policy "auth_update_services" on public.services for update to authenticated using (true) with check (true);
drop policy if exists "auth_delete_services" on public.services;
create policy "auth_delete_services" on public.services for delete to authenticated using (true);

create table if not exists public.service_landing_sections (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  section_type text not null default 'text',
  title text,
  body text,
  image_url text,
  stats jsonb default '[]',
  sort_order integer default 0,
  created_at timestamptz default now()
);
alter table public.service_landing_sections enable row level security;
drop policy if exists "anon_select_landing_sections" on public.service_landing_sections;
create policy "anon_select_landing_sections" on public.service_landing_sections for select to anon, authenticated using (true);
drop policy if exists "auth_insert_landing_sections" on public.service_landing_sections;
create policy "auth_insert_landing_sections" on public.service_landing_sections for insert to authenticated with check (true);
drop policy if exists "auth_update_landing_sections" on public.service_landing_sections;
create policy "auth_update_landing_sections" on public.service_landing_sections for update to authenticated using (true) with check (true);
drop policy if exists "auth_delete_landing_sections" on public.service_landing_sections;
create policy "auth_delete_landing_sections" on public.service_landing_sections for delete to authenticated using (true);

create table if not exists public.service_testimonials (
  service_id uuid not null references public.services(id) on delete cascade,
  testimonial_id uuid not null references public.testimonials(id) on delete cascade,
  sort_order integer default 0,
  primary key (service_id, testimonial_id)
);
alter table public.service_testimonials enable row level security;
drop policy if exists "anon_select_service_testimonials" on public.service_testimonials;
create policy "anon_select_service_testimonials" on public.service_testimonials for select to anon, authenticated using (true);
drop policy if exists "auth_write_service_testimonials" on public.service_testimonials;
create policy "auth_write_service_testimonials" on public.service_testimonials for insert to authenticated with check (true);
drop policy if exists "auth_update_service_testimonials" on public.service_testimonials;
create policy "auth_update_service_testimonials" on public.service_testimonials for update to authenticated using (true) with check (true);
drop policy if exists "auth_delete_service_testimonials" on public.service_testimonials;
create policy "auth_delete_service_testimonials" on public.service_testimonials for delete to authenticated using (true);

-- Seed the 8 existing services
insert into public.services (slug, title, tagline, icon, accent_color, problem, solution, benefits, tech_stack, is_published, is_featured, sort_order)
select * from (values
  ('automation','AI Workflow Automation','Automate complex multi-step business processes end-to-end.','Workflow','#2862d7','Your team spends hours on repetitive tasks — data entry, approvals, notifications, handoffs. These aren''t value-creating activities.','We design intelligent automation workflows using n8n, Gemini, and your existing tools to handle entire processes automatically — from trigger to resolution.',array['Eliminate manual data entry across systems','Automated approval routing and notifications','Real-time error detection and alerting','Connect 100+ business applications','Run 24/7 without human oversight'],array['n8n','Gemini','Supabase','Zapier','Make.com','REST APIs'],true,true,1),
  ('whatsapp','WhatsApp AI Solutions','AI-powered WhatsApp agents for sales, support, and operations.','MessageSquare','#3bdc8c','WhatsApp is where your customers are. But managing it manually means missed messages, slow responses, and burnt-out teams.','We build custom WhatsApp AI agents using the official Business API that handle lead qualification, customer support, bookings, and follow-ups autonomously.',array['24/7 instant response to every message','Intelligent lead qualification flows','Automated appointment scheduling','Escalation to human agents when needed','Full conversation analytics and reporting'],array['WhatsApp Business API','Gemini','Twilio','n8n','Supabase'],true,true,2),
  ('voice','Voice AI Agents','Intelligent voice agents for inbound calls and outbound campaigns.','Mic','#625fff','Phone calls are expensive to handle at scale. Hiring enough staff for call volumes is unsustainable.','We build natural-sounding voice AI agents that handle inbound calls, qualify callers, schedule appointments, and conduct outbound follow-up campaigns.',array['Handle unlimited concurrent calls','Natural, human-like conversation flow','Appointment scheduling integration','Call recording and transcription','CRM sync after every interaction'],array['ElevenLabs','Gemini','Twilio','Deepgram','n8n'],true,true,3),
  ('assistants','AI Chatbots & Assistants','Custom AI assistants trained on your business knowledge.','Bot','#fb923c','Generic chatbots frustrate customers with irrelevant answers. Your business needs an AI that actually knows your products, policies, and processes.','We build custom AI assistants using RAG (Retrieval Augmented Generation) trained on your documentation, FAQs, and product knowledge base.',array['Trained on your specific business knowledge','Multi-channel: web, WhatsApp, Slack, email','Accurate answers from your documentation','Seamless handoff to human agents','Continuous learning from conversations'],array['Gemini','Anthropic Claude','Supabase pgvector','LangChain','n8n'],true,true,4),
  ('internal','Internal AI Tools','Custom AI tools that make your team dramatically more productive.','Brain','#a78bfa','Your team''s time is the most valuable resource. Repetitive internal tasks — proposals, reports, research — are stealing hours every day.','We build internal AI tools like proposal generators, market research assistants, content engines, and report automation systems tailored to your workflows.',array['Proposal generation in minutes not days','AI-assisted research and analysis','Automated report creation and distribution','Knowledge base AI for instant answers','Integration with Notion, Slack, and more'],array['Gemini','Claude','Notion API','Google Workspace','Supabase'],true,true,5),
  ('document','Document Intelligence','AI that reads, extracts, and processes documents at scale.','FileText','#facc15','Manual document processing is slow, error-prone, and expensive. Invoices, contracts, forms, and reports pile up faster than your team can handle them.','We build document AI pipelines that automatically extract structured data, validate against business rules, and push records into your systems.',array['95%+ accuracy on structured extraction','Invoice, contract, and form processing','Automated validation and error flagging','ERP and accounting system integration','Handles PDFs, images, and scanned docs'],array['Claude AI','Google Cloud Vision','n8n','Supabase','QuickBooks API'],true,true,6),
  ('crm','CRM Automation','Keep your CRM clean, updated, and working for you automatically.','Database','#fb7185','Your CRM is only valuable if it''s accurate and up-to-date. Manual entry kills adoption, and dirty data kills pipeline visibility.','We build AI-powered CRM automation that captures contact data, scores leads, updates pipeline stages, and triggers follow-up sequences automatically.',array['Automatic contact and deal creation','AI-powered lead scoring and prioritization','Pipeline stage updates from email/calls','Automated follow-up sequence triggers','CRM health monitoring and deduplication'],array['HubSpot','Salesforce','Zoho','Gemini','n8n','Supabase'],true,true,7),
  ('email','Email AI Automation','Intelligent email agents that manage outreach and inbox workflows.','Mail','#2dd4bf','Email outreach at scale is tedious and generic. Your team spends hours on emails that could be personalized and automated.','We build AI email automation that drafts personalized outreach, manages follow-up sequences, summarizes threads, and routes inbound email intelligently.',array['Personalized outreach at scale','Automated multi-step follow-up sequences','Intelligent inbox triage and routing','Email thread summarization','CRM sync and tracking integration'],array['Gemini','Resend','Gmail API','Outlook API','n8n','HubSpot'],true,true,8)
) as t(slug, title, tagline, icon, accent_color, problem, solution, benefits, tech_stack, is_published, is_featured, sort_order)
on conflict (slug) do nothing;

-- ============================================================================
-- Solutions
-- ============================================================================
create table if not exists public.solutions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  accent_color text default '#2862d7',
  roi text,
  challenges jsonb default '[]',
  offerings jsonb default '[]',
  results jsonb default '[]',
  tech_stack text[] default '{}',
  case_study_headline text,
  case_study_detail text,
  is_published boolean not null default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.solutions enable row level security;
drop policy if exists "anon_select_published_solutions" on public.solutions;
create policy "anon_select_published_solutions" on public.solutions for select to anon, authenticated using (is_published = true);
drop policy if exists "auth_select_all_solutions" on public.solutions;
create policy "auth_select_all_solutions" on public.solutions for select to authenticated using (true);
drop policy if exists "auth_insert_solutions" on public.solutions;
create policy "auth_insert_solutions" on public.solutions for insert to authenticated with check (true);
drop policy if exists "auth_update_solutions" on public.solutions;
create policy "auth_update_solutions" on public.solutions for update to authenticated using (true) with check (true);
drop policy if exists "auth_delete_solutions" on public.solutions;
create policy "auth_delete_solutions" on public.solutions for delete to authenticated using (true);

-- Seed the 8 existing solutions
insert into public.solutions (slug, title, tagline, description, accent_color, roi, challenges, offerings, results, tech_stack, case_study_headline, case_study_detail, is_published, sort_order)
select * from (values
  ('healthcare','Healthcare AI Automation','Improve patient outcomes while reducing administrative burden.','Healthcare providers are drowning in administrative tasks — appointment scheduling, patient follow-ups, insurance verification, and documentation. Our AI automation systems handle these workflows 24/7, freeing your clinical staff to focus on patients.','#fb7185','40% fewer no-shows, 15hrs/week saved per staff member','[{"title":"High no-show rates","detail":"Patients forget appointments, costing clinics thousands per month in lost revenue."},{"title":"Staff overwhelmed by admin","detail":"Clinical and admin staff spend 30-40% of their time on manual follow-ups and scheduling."},{"title":"Slow patient communication","detail":"Phone tag for appointment reminders, test results, and medication refills wastes time for both staff and patients."},{"title":"Intake form inefficiency","detail":"Paper or manual digital forms create bottlenecks and data entry errors before appointments even begin."}]'::jsonb,'[{"title":"Patient Follow-Up AI","detail":"Automated WhatsApp/SMS reminders, post-visit check-ins, and medication adherence nudges that reduce no-shows by 40%."},{"title":"Appointment Booking Agent","detail":"24/7 intelligent booking agent that handles scheduling, rescheduling, and cancellations via chat or voice."},{"title":"Intake Form Automation","detail":"Digital intake flows that collect patient information before the visit and feed directly into your practice management system."},{"title":"Insurance Verification AI","detail":"Automated eligibility checks and pre-authorization workflows that reduce front-desk burden."}]'::jsonb,'[{"metric":"40%","label":"Fewer no-shows"},{"metric":"15hrs","label":"Saved per staff/week"},{"metric":"24/7","label":"Patient communication"},{"metric":"95%","label":"Intake accuracy"}]'::jsonb,array['WhatsApp Business API','n8n','Gemini','Supabase','Twilio','EHR Integration'],'Multi-practice clinic reduced no-shows by 38% in 60 days','A regional healthcare group with 4 locations deployed our patient follow-up AI across their booking system. Automated reminders via WhatsApp with easy reschedule links cut no-shows from 23% to 14%, recovering over $18,000/month in appointment revenue.',true,1),
  ('real-estate','Real Estate AI Automation','Qualify more leads and close deals faster with AI automation.','Real estate agents and agencies waste hours responding to low-intent inquiries, manually qualifying leads, and following up on cold prospects. Our AI solutions handle lead qualification, property inquiries, and follow-up sequences automatically.','#3bdc8c','3x qualified meetings, 68% faster response time','[{"title":"Slow response to inquiries","detail":"Leads from portals go cold in minutes. Manual follow-up means missed deals."},{"title":"Manual lead qualification","detail":"Agents spend time on unqualified inquiries rather than closing ready buyers."},{"title":"Follow-up falls through the cracks","detail":"Without automation, most leads receive 1-2 follow-ups before agents give up."},{"title":"Admin eating agent time","detail":"Scheduling viewings, coordinating availability, and sending property info takes hours daily."}]'::jsonb,'[{"title":"WhatsApp Lead Qualification","detail":"Instant automated conversations that qualify budget, timeline, and requirements before involving an agent."},{"title":"Property Inquiry AI","detail":"Smart assistant that answers property questions, shares listings, and schedules viewings 24/7."},{"title":"Automated Follow-Up Sequences","detail":"12-touch follow-up sequences across WhatsApp, email, and SMS that nurture cold leads over 90 days."},{"title":"Viewing Scheduler Bot","detail":"Calendar-integrated booking agent that coordinates agent and buyer availability without back-and-forth."}]'::jsonb,'[{"metric":"3x","label":"Qualified meetings"},{"metric":"68%","label":"Faster response time"},{"metric":"12-touch","label":"Automated follow-up"},{"metric":"60%","label":"Less admin time"}]'::jsonb,array['WhatsApp Business API','n8n','Gemini','Calendly','CRM Integration','Supabase'],'Boutique real estate agency tripled qualified viewings','A 6-agent real estate team deployed our WhatsApp qualification bot on their property portal listings. The bot pre-qualifies buyers and books viewings automatically. Qualified meetings per month grew from 28 to 89, with agents spending 70% less time on initial qualification calls.',true,2),
  ('ecommerce','E-Commerce AI Automation','Automate support, recover abandoned carts, and increase customer LTV.','E-commerce businesses face high support ticket volume, cart abandonment, and returns complexity. Our AI automation handles customer support, cart recovery, order tracking, and returns processing — all without increasing headcount.','#2862d7','78% tickets auto-resolved, 23% cart recovery increase','[{"title":"High support ticket volume","detail":"Order questions, delivery inquiries, and product issues overwhelm customer service teams."},{"title":"Cart abandonment","detail":"On average, 70% of shopping carts are abandoned — most never followed up on."},{"title":"Slow order resolution","detail":"Customers wait days for responses to simple queries about shipping and returns."},{"title":"Manual returns processing","detail":"Returns are labor-intensive and create customer friction that drives churn."}]'::jsonb,'[{"title":"24/7 Customer Support AI","detail":"AI agent that handles order status, returns, product questions, and complaints with your brand voice."},{"title":"Abandoned Cart Recovery","detail":"Smart recovery sequences via email and WhatsApp that re-engage abandoners with personalized offers."},{"title":"Order Tracking Assistant","detail":"Proactive shipping notifications and intelligent tracking responses that reduce WISMO tickets by 60%."},{"title":"Returns Automation","detail":"Self-service returns flow that captures reason, issues labels, and processes refunds automatically."}]'::jsonb,'[{"metric":"78%","label":"Tickets auto-resolved"},{"metric":"23%","label":"Cart recovery increase"},{"metric":"60%","label":"Fewer WISMO tickets"},{"metric":"4.8★","label":"Average support rating"}]'::jsonb,array['Shopify / WooCommerce','WhatsApp Business API','Gemini','n8n','Klaviyo','Supabase'],'D2C brand resolved 78% of support tickets without human intervention','A direct-to-consumer fashion brand processing 2,000 monthly orders deployed our support AI across email and WhatsApp. The AI handles order inquiries, exchanges, and returns automatically. Support costs dropped by 55% while CSAT scores increased from 3.6 to 4.8.',true,3),
  ('recruitment','Recruitment & HR AI Automation','Screen more candidates faster without sacrificing quality.','Recruitment teams are bottlenecked at CV screening, bogged down by manual scheduling, and losing top candidates to slow processes. Our AI automation handles screening, communication, and coordination so your recruiters focus on relationships.','#2dd4bf','85% faster screening, 30% improvement in hire quality','[{"title":"CV screening bottleneck","detail":"Hundreds of applications per role, manually reviewed by recruiters instead of strategic hiring work."},{"title":"Slow candidate communication","detail":"Candidates wait days for status updates, leading to drop-off and reputational damage."},{"title":"Interview scheduling back-and-forth","detail":"Coordinating availability between candidate and hiring manager wastes hours per hire."},{"title":"Inconsistent candidate experience","detail":"Without automation, candidate experience varies wildly based on which recruiter handles the process."}]'::jsonb,'[{"title":"AI CV Screening","detail":"Role-specific screening that scores CVs against your criteria and surfaces top candidates automatically."},{"title":"Candidate Follow-Up AI","detail":"Automated status updates, rejection notices, and interview prep messages that keep candidates engaged."},{"title":"Interview Scheduling Bot","detail":"AI agent that collects availability and books interview slots without recruiter involvement."},{"title":"Onboarding Automation","detail":"Document collection, IT provisioning triggers, and day-one prep communications sent automatically."}]'::jsonb,'[{"metric":"85%","label":"Faster screening"},{"metric":"30%","label":"Better hire quality"},{"metric":"3hrs","label":"Saved per placement"},{"metric":"92%","label":"Candidate satisfaction"}]'::jsonb,array['Gemini','n8n','ATS Integration','WhatsApp Business API','Calendly','Supabase'],'Staffing agency placed candidates 40% faster with AI screening','A mid-size staffing agency processing 300 applications per week deployed our AI screening system. CVs are scored and ranked automatically. Recruiter time spent on initial screening dropped from 2 hours per role to 20 minutes, with hiring managers reporting better candidate quality.',true,4),
  ('professional-services','Professional Services AI','Win more business with AI-powered proposals and client management.','Law firms, consultancies, agencies, and accountancies spend billable hours on non-billable admin. Our AI automation handles proposals, client onboarding, document processing, and communication workflows so your team bills more and administers less.','#625fff','Proposals in 10 min (vs 3 days), 45% higher win rate','[{"title":"Slow proposal creation","detail":"Proposals take days to craft manually, losing deals to faster competitors."},{"title":"Manual client follow-ups","detail":"Partners and senior staff chase clients for documents, approvals, and payments."},{"title":"Admin stealing billable hours","detail":"Professionals spend 30% of their time on admin that could be automated."},{"title":"Inconsistent onboarding","detail":"New client onboarding is ad-hoc, creating poor experiences and setup delays."}]'::jsonb,'[{"title":"AI Proposal Generator","detail":"Input the client brief, get a tailored proposal in 10 minutes. Trained on your past wins and brand voice."},{"title":"Client Onboarding AI","detail":"Automated workflows that collect documents, send welcome packs, and trigger internal setups without manual effort."},{"title":"Invoice Processing","detail":"AI that extracts invoice data, validates against POs, and routes for approval automatically."},{"title":"Meeting Summarization","detail":"AI that joins calls, generates summaries, action items, and follow-up emails instantly."}]'::jsonb,'[{"metric":"10min","label":"Proposal turnaround"},{"metric":"45%","label":"Higher win rate"},{"metric":"20hrs","label":"Saved per partner/month"},{"metric":"2x","label":"Faster client onboarding"}]'::jsonb,array['Gemini','n8n','Notion / Coda','DocuSign','Supabase','Zapier'],'Management consultancy cut proposal time from 3 days to 10 minutes','A boutique strategy consultancy deployed our proposal generator trained on 200 past proposals. Consultants now generate tailored first drafts in 10 minutes instead of 3 days. Win rate improved from 28% to 41% as faster turnaround impressed prospects.',true,5),
  ('finance','Finance AI Automation','Automate document processing, compliance, and client communication.','Financial services firms face massive document processing burdens, compliance reporting overhead, and complex client communication needs. Our AI systems handle document extraction, KYC flows, reporting automation, and client onboarding at scale.','#facc15','95% extraction accuracy, 38hrs/week saved on document processing','[{"title":"Manual document review","detail":"Analysts spend hours extracting data from invoices, contracts, and financial statements."},{"title":"Compliance reporting overhead","detail":"Regulatory reports require manual data aggregation from multiple systems."},{"title":"Slow client onboarding","detail":"KYC and AML processes create weeks-long delays for new client activation."},{"title":"Data entry errors","detail":"Manual data entry from documents creates costly errors and rework."}]'::jsonb,'[{"title":"Invoice Processing AI","detail":"Extract, validate, and route invoice data with 95%+ accuracy across any format."},{"title":"KYC Document Automation","detail":"Automated identity verification, document collection, and risk scoring workflows."},{"title":"Client Onboarding Flow","detail":"End-to-end onboarding automation that cuts time-to-active from weeks to days."},{"title":"Report Generation AI","detail":"Automated report generation from raw data — weekly, monthly, or on-demand."}]'::jsonb,'[{"metric":"95%","label":"Extraction accuracy"},{"metric":"38hrs","label":"Saved weekly on docs"},{"metric":"5 days","label":"KYC time (from 3 weeks)"},{"metric":"$200k","label":"Annual cost savings"}]'::jsonb,array['Claude','n8n','Supabase','Document AI','Plaid','Zapier'],'Accounting firm eliminated 38 hours/week of manual invoice processing','A mid-size accounting firm processing 500+ invoices per week deployed our document AI. The system extracts line items, validates totals, matches POs, and routes anomalies for review. Manual processing time dropped from 45 hours/week to 7 hours, with extraction accuracy exceeding 95%.',true,6),
  ('hospitality','Hospitality AI Automation','Deliver 5-star experiences with AI-powered guest communication.','Hotels, restaurants, and hospitality businesses face 24/7 guest communication needs, reservation complexity, and review management challenges. Our AI agents handle guest inquiries, bookings, and feedback loops around the clock.','#fb923c','24/7 guest service, 4.8+ review scores, 40% fewer complaints escalated','[{"title":"Late-night guest inquiries","detail":"Guests need answers at 11pm — manual staff coverage is expensive and inconsistent."},{"title":"Manual reservation management","detail":"Booking amendments, special requests, and availability queries handled by staff."},{"title":"Slow complaint resolution","detail":"Unresolved complaints go straight to public reviews, damaging ratings."},{"title":"Review response backlog","detail":"Most hospitality businesses respond to fewer than 40% of online reviews."}]'::jsonb,'[{"title":"Guest Communication AI","detail":"24/7 AI concierge via WhatsApp that handles inquiries, requests, and information with your brand voice."},{"title":"Reservation Booking Agent","detail":"Smart booking assistant that checks availability, processes reservations, and handles amendments."},{"title":"Review Response Automation","detail":"AI that monitors and responds to reviews across platforms within hours, at scale."},{"title":"WhatsApp Concierge","detail":"Digital concierge that handles restaurant bookings, local recommendations, and in-stay requests via WhatsApp."}]'::jsonb,'[{"metric":"24/7","label":"Guest service coverage"},{"metric":"4.8+","label":"Average review score"},{"metric":"40%","label":"Fewer complaints escalated"},{"metric":"100%","label":"Review response rate"}]'::jsonb,array['WhatsApp Business API','Gemini','n8n','Google Business API','Booking.com API','Supabase'],'Boutique hotel chain improved review score from 4.1 to 4.8 in 3 months','A group of 3 boutique hotels deployed our guest communication AI and review response system. Guests get instant responses to inquiries via WhatsApp. Complaints are flagged immediately for manager intervention. Reviews improved from 4.1 to 4.8 across all platforms in 90 days.',true,7),
  ('education','Education AI Automation','Automate student support, admissions, and administrative workflows.','Educational institutions face high-volume admissions inquiries, student support overload, and manual enrollment processes. Our AI automation handles these workflows at scale, improving student experience while reducing staff burden.','#a78bfa','70% reduction in admissions queries handled manually','[{"title":"High admissions inquiry volume","detail":"Hundreds of daily questions about programs, requirements, and deadlines overwhelm admissions teams."},{"title":"Student support overload","detail":"Academic, administrative, and wellbeing queries compete for staff time."},{"title":"Manual enrollment processes","detail":"Document collection, form verification, and confirmation workflows are labor-intensive."},{"title":"Communication delays","detail":"Students wait days for responses, creating anxiety and drop-off during enrollment."}]'::jsonb,'[{"title":"Admissions AI Chatbot","detail":"Trained on your prospectus and FAQs, answers admissions questions 24/7 and books open-day slots."},{"title":"Student Support Assistant","detail":"AI that handles academic calendar queries, administrative requests, and escalates complex issues to staff."},{"title":"Course Recommendation AI","detail":"Conversational AI that helps prospective students find the right program based on their goals."},{"title":"Enrollment Automation","detail":"Document collection workflows and confirmation sequences that guide students through enrollment automatically."}]'::jsonb,'[{"metric":"70%","label":"Fewer manual inquiries"},{"metric":"24/7","label":"Student availability"},{"metric":"2x","label":"Faster enrollment"},{"metric":"88%","label":"Student satisfaction"}]'::jsonb,array['Gemini','n8n','WhatsApp Business API','Supabase','CRM Integration','Email API'],'University reduced admissions inquiry workload by 70%','A private university deploying our admissions AI chatbot trained on their prospectus, fee structure, and FAQs. The AI handles 70% of incoming admissions queries automatically. The admissions team now focuses on high-intent applicants, increasing application completion rates by 25%.',true,8)
) as t(slug, title, tagline, description, accent_color, roi, challenges, offerings, results, tech_stack, case_study_headline, case_study_detail, is_published, sort_order)
on conflict (slug) do nothing;

-- ============================================================================
-- Portfolio enhancements (additive)
-- ============================================================================
do $$ begin
  if not exists (select 1 from information_schema.columns where table_name = 'portfolio_projects' and column_name = 'case_study_headline') then
    alter table public.portfolio_projects add column case_study_headline text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'portfolio_projects' and column_name = 'case_study_detail') then
    alter table public.portfolio_projects add column case_study_detail text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'portfolio_projects' and column_name = 'detailed_sections') then
    alter table public.portfolio_projects add column detailed_sections jsonb default '[]';
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'portfolio_projects' and column_name = 'is_case_study') then
    alter table public.portfolio_projects add column is_case_study boolean default false;
  end if;
end $$;

create table if not exists public.portfolio_testimonials (
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  testimonial_id uuid not null references public.testimonials(id) on delete cascade,
  sort_order integer default 0,
  primary key (project_id, testimonial_id)
);
alter table public.portfolio_testimonials enable row level security;
drop policy if exists "anon_select_portfolio_testimonials" on public.portfolio_testimonials;
create policy "anon_select_portfolio_testimonials" on public.portfolio_testimonials for select to anon, authenticated using (true);
drop policy if exists "auth_write_portfolio_testimonials" on public.portfolio_testimonials;
create policy "auth_write_portfolio_testimonials" on public.portfolio_testimonials for insert to authenticated with check (true);
drop policy if exists "auth_update_portfolio_testimonials" on public.portfolio_testimonials;
create policy "auth_update_portfolio_testimonials" on public.portfolio_testimonials for update to authenticated using (true) with check (true);
drop policy if exists "auth_delete_portfolio_testimonials" on public.portfolio_testimonials;
create policy "auth_delete_portfolio_testimonials" on public.portfolio_testimonials for delete to authenticated using (true);
