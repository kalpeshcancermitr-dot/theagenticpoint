import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Workflow, MessageSquare, Mic, Bot, Brain, FileText,
  Database, Mail, ArrowRight, CheckCircle2, Zap
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
    solution: 'We design intelligent automation workflows using n8n, OpenAI, and your existing tools to handle entire processes automatically — from trigger to resolution.',
    benefits: [
      'Eliminate manual data entry across systems',
      'Automated approval routing and notifications',
      'Real-time error detection and alerting',
      'Connect 100+ business applications',
      'Run 24/7 without human oversight',
    ],
    tech: ['n8n', 'OpenAI', 'Supabase', 'Zapier', 'Make.com', 'REST APIs'],
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    gradient: 'from-primary/10 to-transparent',
  },
  {
    id: 'whatsapp',
    icon: MessageSquare,
    title: 'WhatsApp AI Solutions',
    tagline: 'AI-powered WhatsApp agents for sales, support, and operations.',
    problem: 'WhatsApp is where your customers are. But managing it manually means missed messages, slow responses, and burnt-out teams.',
    solution: 'We build custom WhatsApp AI agents using the official Business API that handle lead qualification, customer support, bookings, and follow-ups autonomously.',
    benefits: [
      '24/7 instant response to every message',
      'Intelligent lead qualification flows',
      'Automated appointment scheduling',
      'Escalation to human agents when needed',
      'Full conversation analytics and reporting',
    ],
    tech: ['WhatsApp Business API', 'OpenAI GPT-4', 'Twilio', 'n8n', 'Supabase'],
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    gradient: 'from-green-400/8 to-transparent',
  },
  {
    id: 'voice',
    icon: Mic,
    title: 'Voice AI Agents',
    tagline: 'Intelligent voice agents for inbound calls and outbound campaigns.',
    problem: 'Phone calls are expensive to handle at scale. Hiring enough staff for call volumes is unsustainable.',
    solution: 'We build natural-sounding voice AI agents that handle inbound calls, qualify callers, schedule appointments, and conduct outbound follow-up campaigns.',
    benefits: [
      'Handle unlimited concurrent calls',
      'Natural, human-like conversation flow',
      'Appointment scheduling integration',
      'Call recording and transcription',
      'CRM sync after every interaction',
    ],
    tech: ['ElevenLabs', 'OpenAI', 'Twilio', 'Deepgram', 'n8n'],
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    gradient: 'from-accent/8 to-transparent',
  },
  {
    id: 'assistants',
    icon: Bot,
    title: 'AI Chatbots & Assistants',
    tagline: 'Custom AI assistants trained on your business knowledge.',
    problem: 'Generic chatbots frustrate customers with irrelevant answers. Your business needs an AI that actually knows your products, policies, and processes.',
    solution: 'We build custom AI assistants using RAG (Retrieval Augmented Generation) trained on your documentation, FAQs, and product knowledge base.',
    benefits: [
      'Trained on your specific business knowledge',
      'Multi-channel: web, WhatsApp, Slack, email',
      'Accurate answers from your documentation',
      'Seamless handoff to human agents',
      'Continuous learning from conversations',
    ],
    tech: ['OpenAI GPT-4', 'Anthropic Claude', 'Supabase pgvector', 'LangChain', 'n8n'],
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
    gradient: 'from-orange-400/8 to-transparent',
  },
  {
    id: 'internal',
    icon: Brain,
    title: 'Internal AI Tools',
    tagline: 'Custom AI tools that make your team dramatically more productive.',
    problem: 'Your team\'s time is the most valuable resource. Repetitive internal tasks — proposals, reports, research — are stealing hours every day.',
    solution: 'We build internal AI tools like proposal generators, market research assistants, content engines, and report automation systems tailored to your workflows.',
    benefits: [
      'Proposal generation in minutes not days',
      'AI-assisted research and analysis',
      'Automated report creation and distribution',
      'Knowledge base AI for instant answers',
      'Integration with Notion, Slack, and more',
    ],
    tech: ['OpenAI GPT-4', 'Claude', 'Notion API', 'Google Workspace', 'Supabase'],
    color: 'text-purple-400',
    bg: 'bg-purple-400/8',
    border: 'border-purple-400/20',
    gradient: 'from-purple-400/8 to-transparent',
  },
  {
    id: 'document',
    icon: FileText,
    title: 'Document Intelligence',
    tagline: 'AI that reads, extracts, and processes documents at scale.',
    problem: 'Manual document processing is slow, error-prone, and expensive. Invoices, contracts, forms, and reports pile up faster than your team can handle them.',
    solution: 'We build document AI pipelines that automatically extract structured data, validate against business rules, and push records into your systems.',
    benefits: [
      '95%+ accuracy on structured extraction',
      'Invoice, contract, and form processing',
      'Automated validation and error flagging',
      'ERP and accounting system integration',
      'Handles PDFs, images, and scanned docs',
    ],
    tech: ['Claude AI', 'Google Cloud Vision', 'n8n', 'Supabase', 'QuickBooks API'],
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    gradient: 'from-yellow-400/8 to-transparent',
  },
  {
    id: 'crm',
    icon: Database,
    title: 'CRM Automation',
    tagline: 'Keep your CRM clean, updated, and working for you automatically.',
    problem: 'Your CRM is only valuable if it\'s accurate and up-to-date. Manual entry kills adoption, and dirty data kills pipeline visibility.',
    solution: 'We build AI-powered CRM automation that captures contact data, scores leads, updates pipeline stages, and triggers follow-up sequences automatically.',
    benefits: [
      'Automatic contact and deal creation',
      'AI-powered lead scoring and prioritization',
      'Pipeline stage updates from email/calls',
      'Automated follow-up sequence triggers',
      'CRM health monitoring and deduplication',
    ],
    tech: ['HubSpot', 'Salesforce', 'Zoho', 'OpenAI', 'n8n', 'Supabase'],
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
    gradient: 'from-rose-400/8 to-transparent',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email AI Automation',
    tagline: 'Intelligent email agents that manage outreach and inbox workflows.',
    problem: 'Email outreach at scale is tedious and generic. Your team spends hours on emails that could be personalized and automated.',
    solution: 'We build AI email automation that drafts personalized outreach, manages follow-up sequences, summarizes threads, and routes inbound email intelligently.',
    benefits: [
      'Personalized outreach at scale',
      'Automated multi-step follow-up sequences',
      'Intelligent inbox triage and routing',
      'Email thread summarization',
      'CRM sync and tracking integration',
    ],
    tech: ['OpenAI GPT-4', 'Resend', 'Gmail API', 'Outlook API', 'n8n', 'HubSpot'],
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/20',
    gradient: 'from-teal-400/8 to-transparent',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-primary opacity-25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Zap size={11} />
            Our Services
          </div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
            AI Systems Built for{' '}
            <span className="gradient-text">Every Business Need</span>
          </h1>
          <p className="text-xl text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            From customer-facing AI assistants to complex internal automation — we build production-ready systems that transform how your business operates.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-gradient text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
          >
            Discuss Your Project
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-10 items-start p-8 rounded-3xl border ${service.border} bg-gradient-to-br ${service.gradient} bg-brand-card/30 scroll-mt-24`}
              >
                {/* Content */}
                <div className={`space-y-6 ${isEven ? '' : 'lg:order-2'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${service.bg} border ${service.border}`}>
                    <Icon size={24} className={service.color} />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-tight font-bold text-3xl text-white">{service.title}</h2>
                    <p className={`text-lg font-medium ${service.color}`}>{service.tagline}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium mb-2">The Problem</p>
                      <p className="text-brand-secondary leading-relaxed">{service.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-brand-success/70 font-medium mb-2">Our Solution</p>
                      <p className="text-white/80 leading-relaxed">{service.solution}</p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${service.bg} border ${service.border} ${service.color}`}
                  >
                    Build This System
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Details panel */}
                <div className={`space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                  {/* Benefits */}
                  <div className="glass rounded-2xl p-5 border border-white/8">
                    <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium mb-3">Key Benefits</p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5 text-sm text-brand-secondary">
                          <CheckCircle2 size={15} className={`${service.color} mt-0.5 shrink-0`} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="glass rounded-2xl p-5 border border-white/8">
                    <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium mb-3">Technology Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-lg text-xs font-medium font-mono ${service.bg} border ${service.border} ${service.color}`}
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
