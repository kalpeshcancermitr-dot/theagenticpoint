import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Briefcase } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Portfolio — AI Systems We\'ve Built',
  description: 'Real AI automation systems built and deployed for businesses — from WhatsApp AI to document intelligence and CRM automation.',
};

const projects = [
  {
    title: 'WhatsApp Lead Qualification Agent',
    slug: 'whatsapp-lead-qualification',
    category: 'WhatsApp AI',
    industry: 'Real Estate',
    challenge: 'A real estate agency was manually screening 200+ daily WhatsApp inquiries, missing hot leads during off-hours and wasting agents\' time on unqualified prospects.',
    solution: 'Built a WhatsApp AI agent using the official Business API that runs a 7-question qualification flow, scores lead intent (hot/warm/cold), and routes hot prospects to available agents with full context.',
    outcome: '68% reduction in response time, 3x increase in qualified meetings booked, 24/7 lead coverage without additional staff.',
    tech_stack: ['WhatsApp Business API', 'OpenAI GPT-4', 'n8n', 'Supabase', 'Twilio'],
    colorClass: 'text-green-400 bg-green-400/10 border-green-400/20',
    metrics: [
      { value: '3x', label: 'More Qualified Leads' },
      { value: '68%', label: 'Faster Response' },
      { value: '24/7', label: 'Coverage' },
    ],
  },
  {
    title: 'Healthcare Patient Follow-up System',
    slug: 'healthcare-followup-assistant',
    category: 'Healthcare AI',
    industry: 'Healthcare',
    challenge: 'A medical clinic was struggling with post-appointment follow-ups and medication reminders, leading to poor patient adherence and a 30% no-show rate.',
    solution: 'Deployed a HIPAA-aware conversational AI that sends personalized follow-up messages via WhatsApp and SMS, tracks patient responses, and escalates concerns to medical staff automatically.',
    outcome: '40% improvement in medication adherence, 60% reduction in appointment no-shows, clinical staff saved 15 hours per week on manual outreach.',
    tech_stack: ['Twilio', 'OpenAI', 'Supabase', 'n8n', 'Google Calendar API'],
    colorClass: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    metrics: [
      { value: '40%', label: 'Better Adherence' },
      { value: '60%', label: 'Fewer No-Shows' },
      { value: '15hrs', label: 'Saved Weekly' },
    ],
  },
  {
    title: 'Intelligent Appointment Booking Agent',
    slug: 'appointment-booking-agent',
    category: 'Business Automation',
    industry: 'Professional Services',
    challenge: 'A consulting firm was losing potential clients due to slow response times on booking requests. Back-and-forth scheduling emails were taking 2-3 days to resolve.',
    solution: 'Built a multi-channel booking agent (web chat + WhatsApp) that checks real-time calendar availability, handles rescheduling, sends confirmations, and syncs with Google Calendar.',
    outcome: '90% of bookings now happen without human involvement. Zero double-bookings. Average booking-to-confirmation time dropped from 2.5 days to 4 minutes.',
    tech_stack: ['Google Calendar API', 'OpenAI', 'n8n', 'Supabase', 'Calendly'],
    colorClass: 'text-accent bg-accent/10 border-accent/20',
    metrics: [
      { value: '90%', label: 'Automated' },
      { value: '4 min', label: 'Booking Time' },
      { value: '4.9/5', label: 'Client Rating' },
    ],
  },
  {
    title: 'E-Commerce Customer Support AI',
    slug: 'customer-support-ai',
    category: 'AI Assistants',
    industry: 'E-Commerce',
    challenge: 'An online retail brand was receiving 500+ daily support tickets covering order tracking, returns, product questions, and complaints. Their 48-hour average response time was hurting retention.',
    solution: 'Deployed a multi-channel AI support agent trained on their product catalog, policies, and order system. Integrated with Shopify, Intercom, and WhatsApp for unified support.',
    outcome: '78% of tickets resolved automatically, response time dropped from 48 hours to under 2 minutes, customer satisfaction score improved from 3.2 to 4.7/5.',
    tech_stack: ['OpenAI GPT-4', 'Supabase pgvector', 'n8n', 'Intercom', 'Shopify API'],
    colorClass: 'text-primary bg-primary/10 border-primary/20',
    metrics: [
      { value: '78%', label: 'Auto-Resolved' },
      { value: '<2min', label: 'Response Time' },
      { value: '4.7/5', label: 'CSAT Score' },
    ],
  },
  {
    title: 'Automated Invoice Processing System',
    slug: 'invoice-processing-ai',
    category: 'Document AI',
    industry: 'Finance',
    challenge: 'A mid-sized accounting firm was processing 300+ vendor invoices monthly, with staff spending 40+ hours per week on manual data entry, validation, and ERP input.',
    solution: 'Built a document intelligence pipeline that receives invoice emails, extracts structured data using Claude AI + Google Vision, validates against POs, routes for approval, and auto-creates ERP entries.',
    outcome: '95% extraction accuracy, 38 hours per week reclaimed, payment processing cycle shortened from 12 days to 3 days, zero data entry errors in first 3 months.',
    tech_stack: ['Claude AI', 'Google Cloud Vision', 'n8n', 'Supabase', 'QuickBooks API'],
    colorClass: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    metrics: [
      { value: '95%', label: 'Accuracy' },
      { value: '38hrs', label: 'Saved/Week' },
      { value: '3 days', label: 'Payment Cycle' },
    ],
  },
  {
    title: 'AI-Powered Sales Proposal Generator',
    slug: 'proposal-generator',
    category: 'Internal AI Tools',
    industry: 'B2B Agency',
    challenge: 'A digital agency was taking 3-5 days to create custom client proposals, losing deals to faster competitors. Each proposal required research, pricing, case study selection, and design.',
    solution: 'Built an internal AI tool that takes a sales brief, automatically selects relevant case studies, calculates ROI projections, configures pricing tiers, and generates a 12-16 page branded PDF proposal.',
    outcome: 'Proposal creation time dropped from 3-5 days to under 10 minutes. Win rate on proposals sent within 24 hours increased by 45%.',
    tech_stack: ['OpenAI GPT-4', 'Anthropic Claude', 'n8n', 'Notion API', 'Google Docs API'],
    colorClass: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    metrics: [
      { value: '10 min', label: 'Proposal Time' },
      { value: '45%', label: 'Higher Win Rate' },
      { value: '97%', label: 'Quality Score' },
    ],
  },
  {
    title: 'CRM Pipeline Automation',
    slug: 'crm-automation',
    category: 'CRM Automation',
    industry: 'SaaS',
    challenge: 'A SaaS company\'s CRM (HubSpot) was perpetually out of date. Reps weren\'t logging calls, deals stalled silently, and leadership had no pipeline visibility.',
    solution: 'Built an AI-powered CRM automation system that captures email interactions, transcribes calls, updates deal stages based on activity, scores leads, and sends automated follow-up prompts to reps.',
    outcome: 'CRM data accuracy went from 40% to 94%. Pipeline visibility enabled management to identify and recover $280K in stalled deals in Q1.',
    tech_stack: ['HubSpot API', 'OpenAI', 'n8n', 'Gong.io', 'Supabase'],
    colorClass: 'text-purple-400 bg-purple-400/8 border-purple-400/20',
    metrics: [
      { value: '94%', label: 'CRM Accuracy' },
      { value: '$280K', label: 'Deals Recovered' },
      { value: '3hrs', label: 'Admin Saved/Rep' },
    ],
  },
  {
    title: 'Recruitment AI Agent',
    slug: 'recruitment-ai',
    category: 'HR Automation',
    industry: 'Staffing',
    challenge: 'A staffing agency was manually screening 200+ CVs per week for each open role. Initial screening took 3-4 days and relied on keyword matching rather than contextual understanding.',
    solution: 'Deployed a recruitment AI that parses CVs, scores candidates against job criteria using contextual understanding, generates interview questions, and drafts personalized outreach messages.',
    outcome: 'CV screening time reduced by 85%, quality-of-hire scores improved by 30%, recruiters now spend time on relationship-building rather than document review.',
    tech_stack: ['Claude AI', 'OpenAI', 'n8n', 'Supabase', 'ATS API Integration'],
    colorClass: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
    metrics: [
      { value: '85%', label: 'Faster Screening' },
      { value: '30%', label: 'Better Hires' },
      { value: '200+', label: 'CVs/Week Handled' },
    ],
  },
  {
    title: 'Knowledge Base AI Assistant',
    slug: 'knowledge-base-assistant',
    category: 'Internal AI Tools',
    industry: 'Technology',
    challenge: 'A 200-person tech company had documentation scattered across Notion, Confluence, Google Drive, and Slack. Employees wasted an average of 2 hours/day searching for information.',
    solution: 'Built a unified knowledge base AI using RAG (Retrieval Augmented Generation) that indexes all company documentation and answers questions with source citations in Slack.',
    outcome: 'Employee information retrieval time reduced by 80%, documentation quality improved through gap identification, 2 hours/day per employee reclaimed.',
    tech_stack: ['OpenAI', 'Supabase pgvector', 'n8n', 'Slack API', 'Notion API'],
    colorClass: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    metrics: [
      { value: '80%', label: 'Faster Answers' },
      { value: '2hrs', label: 'Saved Daily' },
      { value: '98%', label: 'Accuracy Rate' },
    ],
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-primary opacity-25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Briefcase size={11} />
            Portfolio
          </div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
            Real AI Systems,{' '}
            <span className="gradient-text">Measurable Results</span>
          </h1>
          <p className="text-xl text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Every project here is a production system we designed, built, and deployed for real businesses. No mock-ups. No theoretical demos.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
            {[
              { value: '50+', label: 'Systems Deployed' },
              { value: '12', label: 'Industries Served' },
              { value: '95%', label: 'Client Retention' },
              { value: '2-4 wks', label: 'Avg Delivery' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-tight font-bold text-3xl gradient-text">{value}</div>
                <div className="text-sm text-brand-secondary mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {projects.map((project, i) => {
            const [colorText, colorBg, colorBorder] = project.colorClass.split(' ');
            return (
              <article
                key={project.slug}
                className={`p-8 rounded-3xl border ${colorBorder} ${colorBg} bg-brand-card/30 group`}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left */}
                  <div className="lg:col-span-2 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${project.colorClass}`}>
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-brand-secondary">
                        {project.industry}
                      </span>
                    </div>

                    <h2 className={`font-tight font-bold text-2xl text-white group-hover:${colorText} transition-colors duration-200`}>
                      {project.title}
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium">Challenge</p>
                        <p className="text-sm text-brand-secondary leading-relaxed">{project.challenge}</p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-xs uppercase tracking-wider text-brand-success/70 font-medium">Outcome</p>
                        <p className="text-sm text-white/80 leading-relaxed">{project.outcome}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${colorBg} border ${colorBorder} ${colorText}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: metrics + CTA */}
                  <div className="space-y-4">
                    <div className="glass rounded-2xl p-5 border border-white/8 grid grid-cols-3 gap-3">
                      {project.metrics.map(({ value, label }) => (
                        <div key={label} className="text-center">
                          <div className={`font-tight font-bold text-xl ${colorText}`}>{value}</div>
                          <div className="text-xs text-brand-secondary mt-1 leading-tight">{label}</div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${colorBg} ${colorText} border ${colorBorder}`}
                    >
                      Build Something Similar
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
