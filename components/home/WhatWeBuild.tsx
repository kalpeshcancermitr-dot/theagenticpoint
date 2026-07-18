import Link from 'next/link';
import {
  MessageSquare, Bot, Mic, Workflow, Database, FileText,
  Users, Mail, ArrowRight, Brain,
} from 'lucide-react';

const services = [
  {
    icon: MessageSquare,
    title: 'AI Assistants',
    description: 'Custom AI assistants trained on your business knowledge to handle customer queries 24/7.',
    href: '/services#assistants',
  },
  {
    icon: Bot,
    title: 'WhatsApp AI',
    description: 'WhatsApp-based AI agents for lead qualification, customer support, and automated follow-ups.',
    href: '/services#whatsapp',
  },
  {
    icon: Mic,
    title: 'Voice AI',
    description: 'Intelligent voice agents that handle inbound calls, schedule appointments, and qualify prospects.',
    href: '/services#voice',
  },
  {
    icon: Workflow,
    title: 'Business Automation',
    description: 'End-to-end workflow automation connecting your tools, eliminating manual data entry.',
    href: '/services#automation',
  },
  {
    icon: Brain,
    title: 'Internal AI Tools',
    description: 'Custom AI tools for your team — proposal generators, research assistants, content engines.',
    href: '/services#internal',
  },
  {
    icon: Database,
    title: 'CRM Automation',
    description: 'Automate CRM data entry, lead scoring, pipeline updates, and follow-up sequences.',
    href: '/services#crm',
  },
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'AI that reads, extracts, classifies, and processes documents at scale with 95%+ accuracy.',
    href: '/services#document',
  },
  {
    icon: Mail,
    title: 'Email Automation',
    description: 'Intelligent email agents that draft, send, follow up, and manage inbox workflows.',
    href: '/services#email',
  },
];

export default function WhatWeBuild() {
  return (
    <section className="section-pad" style={{ background: '#0e111b' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <p className="section-label flex items-center justify-center gap-1.5">
            <Users size={11} />
            What We Build
          </p>
          <h2
            className="text-quartz"
            style={{
              fontFamily: 'Figtree, DM Sans, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.13,
              letterSpacing: '-0.96px',
            }}
          >
            AI Systems Built for{' '}
            <span className="gradient-text">Real Business Impact</span>
          </h2>
          <p className="text-ash" style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.5 }}>
            From customer-facing AI assistants to complex internal automation systems, we build production-ready solutions that transform how your business operates.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group card-hover flex flex-col gap-4"
                style={{
                  background: '#0d172b',
                  border: '1px solid #172540',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: '#12244f', border: '1px solid #1e2b48' }}
                >
                  <Icon size={16} className="text-frosted-lilac" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-quartz font-medium text-[15px]">{service.title}</h3>
                  <p className="text-ash leading-relaxed" style={{ fontSize: '13px', fontWeight: 300 }}>{service.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] font-medium text-frosted-lilac opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more
                  <ArrowRight size={11} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
