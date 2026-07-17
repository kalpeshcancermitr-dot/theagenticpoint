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
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    href: '/services#assistants',
  },
  {
    icon: Bot,
    title: 'WhatsApp AI',
    description: 'WhatsApp-based AI agents for lead qualification, customer support, and automated follow-ups.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    href: '/services#whatsapp',
  },
  {
    icon: Mic,
    title: 'Voice AI',
    description: 'Intelligent voice agents that handle inbound calls, schedule appointments, and qualify prospects.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    href: '/services#voice',
  },
  {
    icon: Workflow,
    title: 'Business Automation',
    description: 'End-to-end workflow automation connecting your tools, eliminating manual data entry.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
    href: '/services#automation',
  },
  {
    icon: Brain,
    title: 'Internal AI Tools',
    description: 'Custom AI tools for your team — proposal generators, research assistants, content engines.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/8',
    border: 'border-purple-400/20',
    href: '/services#internal',
  },
  {
    icon: Database,
    title: 'CRM Automation',
    description: 'Automate CRM data entry, lead scoring, pipeline updates, and follow-up sequences.',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
    href: '/services#crm',
  },
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'AI that reads, extracts, classifies, and processes documents at scale with 95%+ accuracy.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    href: '/services#document',
  },
  {
    icon: Mail,
    title: 'Email Automation',
    description: 'Intelligent email agents that draft, send, follow up, and manage inbox workflows.',
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/20',
    href: '/services#email',
  },
];

export default function WhatWeBuild() {
  return (
    <section className="section-pad bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Users size={11} />
            What We Build
          </div>
          <h2 className="font-tight font-bold text-4xl lg:text-5xl text-white">
            AI Systems Built for{' '}
            <span className="gradient-text">Real Business Impact</span>
          </h2>
          <p className="text-brand-secondary text-lg">
            From customer-facing AI assistants to complex internal automation systems, we build production-ready solutions that transform how your business operates.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className={`group p-6 rounded-2xl border ${service.border} ${service.bg} card-hover bg-brand-card/50 flex flex-col gap-4`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${service.bg} border ${service.border}`}>
                  <Icon size={20} className={service.color} />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-tight font-semibold text-white text-base group-hover:text-white">{service.title}</h3>
                  <p className="text-sm text-brand-secondary leading-relaxed">{service.description}</p>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-medium ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
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
