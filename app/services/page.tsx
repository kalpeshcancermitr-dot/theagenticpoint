import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Workflow, MessageSquare, Mic, Bot, Brain, FileText,
  Database, Mail, ArrowRight, Check, Zap,
} from 'lucide-react';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'AI Automation Services',
  description: 'Explore AgenticPoint\'s full range of AI automation services — from WhatsApp AI and voice agents to workflow automation and document intelligence.',
};

const services = [
  {
    id: 'automation',
    icon: Workflow,
    title: 'AI Workflow Automation',
    tagline: 'Automate complex multi-step business processes end-to-end.',
    problem: 'Your team spends hours on repetitive tasks — data entry, approvals, notifications, handoffs. These aren\'t value-creating activities.',
    solution: 'We design intelligent automation workflows using n8n, Gemini, and your existing tools to handle entire processes automatically — from trigger to resolution.',
    benefits: ['Eliminate manual data entry across systems', 'Automated approval routing and notifications', 'Real-time error detection and alerting', 'Connect 100+ business applications', 'Run 24/7 without human oversight'],
    tech: ['n8n', 'Gemini', 'Supabase', 'Zapier', 'Make.com', 'REST APIs'],
    accent: '#2862d7',
  },
  {
    id: 'whatsapp',
    icon: MessageSquare,
    title: 'WhatsApp AI Solutions',
    tagline: 'AI-powered WhatsApp agents for sales, support, and operations.',
    problem: 'WhatsApp is where your customers are. But managing it manually means missed messages, slow responses, and burnt-out teams.',
    solution: 'We build custom WhatsApp AI agents using the official Business API that handle lead qualification, customer support, bookings, and follow-ups autonomously.',
    benefits: ['24/7 instant response to every message', 'Intelligent lead qualification flows', 'Automated appointment scheduling', 'Escalation to human agents when needed', 'Full conversation analytics and reporting'],
    tech: ['WhatsApp Business API', 'Gemini', 'Twilio', 'n8n', 'Supabase'],
    accent: '#3bdc8c',
  },
  {
    id: 'voice',
    icon: Mic,
    title: 'Voice AI Agents',
    tagline: 'Intelligent voice agents for inbound calls and outbound campaigns.',
    problem: 'Phone calls are expensive to handle at scale. Hiring enough staff for call volumes is unsustainable.',
    solution: 'We build natural-sounding voice AI agents that handle inbound calls, qualify callers, schedule appointments, and conduct outbound follow-up campaigns.',
    benefits: ['Handle unlimited concurrent calls', 'Natural, human-like conversation flow', 'Appointment scheduling integration', 'Call recording and transcription', 'CRM sync after every interaction'],
    tech: ['ElevenLabs', 'Gemini', 'Twilio', 'Deepgram', 'n8n'],
    accent: '#625fff',
  },
  {
    id: 'assistants',
    icon: Bot,
    title: 'AI Chatbots & Assistants',
    tagline: 'Custom AI assistants trained on your business knowledge.',
    problem: 'Generic chatbots frustrate customers with irrelevant answers. Your business needs an AI that actually knows your products, policies, and processes.',
    solution: 'We build custom AI assistants using RAG (Retrieval Augmented Generation) trained on your documentation, FAQs, and product knowledge base.',
    benefits: ['Trained on your specific business knowledge', 'Multi-channel: web, WhatsApp, Slack, email', 'Accurate answers from your documentation', 'Seamless handoff to human agents', 'Continuous learning from conversations'],
    tech: ['Gemini', 'Anthropic Claude', 'Supabase pgvector', 'LangChain', 'n8n'],
    accent: '#fb923c',
  },
  {
    id: 'internal',
    icon: Brain,
    title: 'Internal AI Tools',
    tagline: 'Custom AI tools that make your team dramatically more productive.',
    problem: 'Your team\'s time is the most valuable resource. Repetitive internal tasks — proposals, reports, research — are stealing hours every day.',
    solution: 'We build internal AI tools like proposal generators, market research assistants, content engines, and report automation systems tailored to your workflows.',
    benefits: ['Proposal generation in minutes not days', 'AI-assisted research and analysis', 'Automated report creation and distribution', 'Knowledge base AI for instant answers', 'Integration with Notion, Slack, and more'],
    tech: ['Gemini', 'Claude', 'Notion API', 'Google Workspace', 'Supabase'],
    accent: '#a78bfa',
  },
  {
    id: 'document',
    icon: FileText,
    title: 'Document Intelligence',
    tagline: 'AI that reads, extracts, and processes documents at scale.',
    problem: 'Manual document processing is slow, error-prone, and expensive. Invoices, contracts, forms, and reports pile up faster than your team can handle them.',
    solution: 'We build document AI pipelines that automatically extract structured data, validate against business rules, and push records into your systems.',
    benefits: ['95%+ accuracy on structured extraction', 'Invoice, contract, and form processing', 'Automated validation and error flagging', 'ERP and accounting system integration', 'Handles PDFs, images, and scanned docs'],
    tech: ['Claude AI', 'Google Cloud Vision', 'n8n', 'Supabase', 'QuickBooks API'],
    accent: '#facc15',
  },
  {
    id: 'crm',
    icon: Database,
    title: 'CRM Automation',
    tagline: 'Keep your CRM clean, updated, and working for you automatically.',
    problem: 'Your CRM is only valuable if it\'s accurate and up-to-date. Manual entry kills adoption, and dirty data kills pipeline visibility.',
    solution: 'We build AI-powered CRM automation that captures contact data, scores leads, updates pipeline stages, and triggers follow-up sequences automatically.',
    benefits: ['Automatic contact and deal creation', 'AI-powered lead scoring and prioritization', 'Pipeline stage updates from email/calls', 'Automated follow-up sequence triggers', 'CRM health monitoring and deduplication'],
    tech: ['HubSpot', 'Salesforce', 'Zoho', 'Gemini', 'n8n', 'Supabase'],
    accent: '#fb7185',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email AI Automation',
    tagline: 'Intelligent email agents that manage outreach and inbox workflows.',
    problem: 'Email outreach at scale is tedious and generic. Your team spends hours on emails that could be personalized and automated.',
    solution: 'We build AI email automation that drafts personalized outreach, manages follow-up sequences, summarizes threads, and routes inbound email intelligently.',
    benefits: ['Personalized outreach at scale', 'Automated multi-step follow-up sequences', 'Intelligent inbox triage and routing', 'Email thread summarization', 'CRM sync and tracking integration'],
    tech: ['Gemini', 'Resend', 'Gmail API', 'Outlook API', 'n8n', 'HubSpot'],
    accent: '#2dd4bf',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen surface-void">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[600px] h-[500px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Zap size={11} />
            Our Services
          </div>
          <h1 className="font-tight font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em]">
            AI Systems Built for{' '}
            <span className="gradient-text">Every Business Need</span>
          </h1>
          <p className="text-base lg:text-lg text-brand-secondary max-w-2xl mx-auto leading-relaxed font-light">
            From customer-facing AI assistants to complex internal automation — we build production-ready systems that transform how your business operates.
          </p>
          <Link href="/contact" className="pill-cta inline-flex items-center gap-2">
            Discuss Your Project
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className="card-elevated scroll-mt-24 grid lg:grid-cols-2 gap-8 items-start"
              >
                <div className={`space-y-6 ${isEven ? '' : 'lg:order-2'}`}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ backgroundColor: `${service.accent}1a`, borderColor: `${service.accent}40` }}
                  >
                    <Icon size={24} style={{ color: service.accent }} />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-tight font-medium text-2xl lg:text-3xl text-white">{service.title}</h2>
                    <p className="text-base font-medium" style={{ color: service.accent }}>{service.tagline}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="eyebrow mb-2">The Problem</p>
                      <p className="text-brand-secondary leading-relaxed font-light">{service.problem}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-2" style={{ color: '#3bdc8c99' }}>Our Solution</p>
                      <p className="text-brand-tertiary leading-relaxed font-light">{service.solution}</p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 border"
                    style={{ backgroundColor: `${service.accent}1a`, borderColor: `${service.accent}40`, color: service.accent }}
                  >
                    Build This System
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className={`space-y-4 ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="surface-deep-sea rounded-xl p-5 border border-brand-inkline">
                    <p className="eyebrow mb-3">Key Benefits</p>
                    <ul className="space-y-2.5">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5 text-sm text-brand-secondary">
                          <Check size={15} style={{ color: service.accent }} className="mt-0.5 shrink-0" />
                          <span className="font-light">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="surface-deep-sea rounded-xl p-5 border border-brand-inkline">
                    <p className="eyebrow mb-3">Technology Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-medium font-mono border"
                          style={{ backgroundColor: `${service.accent}1a`, borderColor: `${service.accent}40`, color: service.accent }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
