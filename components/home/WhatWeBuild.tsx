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
    <section className="section-pad surface-abyss">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-4">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Users size={11} />
            What We Build
          </div>
          <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em]">
            AI Systems Built for{' '}
            <span className="gradient-text">Real Business Impact</span>
          </h2>
          <p className="text-brand-secondary text-base lg:text-lg font-light max-w-xl mx-auto">
            From customer-facing AI assistants to complex internal automation systems, we build production-ready solutions that transform how your business operates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group card-elevated card-hover flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl surface-cobalt border border-brand-hairline flex items-center justify-center">
                  <Icon size={18} className="text-brand-primary" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-tight font-medium text-white text-base">{service.title}</h3>
                  <p className="text-sm text-brand-secondary leading-relaxed font-light">{service.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
