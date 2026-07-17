'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, MessageSquare, Users, Calendar, FileText, Mail, BarChart3 } from 'lucide-react';

const demos = [
  {
    id: 'lead-qualification',
    icon: Users,
    title: 'Sales Qualification Agent',
    category: 'Sales',
    description: 'AI agent that qualifies leads through WhatsApp with a smart 7-question flow.',
    preview: [
      { role: 'ai', text: "Hi! I'm your AI Sales Assistant. To see how we can help, what's your company size?" },
      { role: 'user', text: '50-200 employees' },
      { role: 'ai', text: "Great! What's your main challenge — lead gen, operations, or customer support?" },
      { role: 'user', text: 'Customer support is overwhelming us' },
      { role: 'ai', text: "Understood. Based on your profile, I'm routing you to a specialist. You qualify for our Enterprise Support AI solution. Scheduling a discovery call — what's your availability?" },
    ],
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    id: 'customer-support',
    icon: MessageSquare,
    title: 'Customer Support AI',
    category: 'Operations',
    description: 'Multi-channel AI resolving 78% of tickets without human intervention.',
    preview: [
      { role: 'user', text: "Where is my order #AP-2847? It's been 5 days." },
      { role: 'ai', text: 'Order #AP-2847 is currently in transit — dispatched on Jul 14, expected delivery Jul 18. Here is your live tracking link: track.example.com/AP-2847' },
      { role: 'user', text: 'Can I change the delivery address?' },
      { role: 'ai', text: "I've sent an address change request to our logistics team. You'll get a confirmation within 30 minutes. Is there anything else I can help with?" },
    ],
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    id: 'appointment',
    icon: Calendar,
    title: 'Appointment Booking Agent',
    category: 'Operations',
    description: 'Conversational booking agent handling scheduling end-to-end.',
    preview: [
      { role: 'user', text: "I'd like to book a consultation for next week" },
      { role: 'ai', text: 'Of course! I have availability Tuesday July 22 at 10am, 2pm, or 4pm, and Thursday July 24 at 11am. Which works for you?' },
      { role: 'user', text: 'Tuesday at 2pm' },
      { role: 'ai', text: "Perfect! I've booked Tuesday July 22 at 2:00 PM. A calendar invite has been sent to your email with the video call link. See you then!" },
    ],
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  {
    id: 'document',
    icon: FileText,
    title: 'Document Intelligence',
    category: 'Finance',
    description: 'AI that extracts, validates, and processes invoices with 95% accuracy.',
    preview: [
      { role: 'ai', text: "Invoice received from TechVendor Ltd. Extracting data..." },
      { role: 'ai', text: "Extracted: Invoice #INV-0483 | Amount: $4,250 | Due: Aug 1 | PO Match: ✓ | Tax ID verified." },
      { role: 'ai', text: "Routing for approval: Amount is within threshold. Notification sent to Finance Manager. ERP entry created automatically." },
    ],
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email AI Assistant',
    category: 'Marketing',
    description: 'Intelligent email agent that drafts, sends, and manages responses.',
    preview: [
      { role: 'user', text: "Draft a follow-up for the Johnson proposal we sent last Thursday" },
      { role: 'ai', text: `Drafting follow-up email...\n\nSubject: Following up — Johnson Corp Proposal\n\n"Hi Sarah, I wanted to follow up on the AI automation proposal we shared on July 10th. We'd love to answer any questions and discuss how we can tailor the solution..."` },
      { role: 'user', text: 'Looks great, send it' },
      { role: 'ai', text: 'Email sent to sarah@johnsoncorp.com. Follow-up reminder set for July 22 if no response. CRM updated.' },
    ],
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
  },
  {
    id: 'proposal',
    icon: BarChart3,
    title: 'Proposal Generator',
    category: 'Sales',
    description: 'AI that generates custom branded proposals in under 10 minutes.',
    preview: [
      { role: 'user', text: 'Generate a proposal for TechCorp — they need CRM automation for 100 users' },
      { role: 'ai', text: 'Generating proposal... pulling relevant case studies, pricing, and tech specs.' },
      { role: 'ai', text: 'Proposal ready: 12-page custom document covering solution overview, implementation plan, 3 pricing tiers, 2 relevant case studies, and ROI projection ($180K annual savings). Sending to your email.' },
    ],
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
];

export default function PlaygroundPreview() {
  const [activeDemo, setActiveDemo] = useState(0);
  const demo = demos[activeDemo];
  const Icon = demo.icon;

  return (
    <section className="section-pad bg-brand-surface relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-primary rounded-full opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-4">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Play size={11} fill="currentColor" />
            Interactive AI Playground
          </div>
          <h2 className="font-tight font-bold text-4xl lg:text-5xl text-white">
            Experience AI Before{' '}
            <span className="gradient-text">You Buy</span>
          </h2>
          <p className="text-brand-secondary text-lg">
            Try live demos of the exact AI systems we build. See how your business could operate on autopilot.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Demo list */}
          <div className="lg:col-span-2 space-y-2">
            {demos.map((d, i) => {
              const DIcon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDemo(i)}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                    activeDemo === i
                      ? `glass-strong border-primary/30 shadow-glow-sm`
                      : 'border-white/8 hover:border-white/15 hover:bg-white/4'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${d.bg}`}>
                    <DIcon size={16} className={d.color} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-tight font-semibold text-sm text-white">{d.title}</span>
                    </div>
                    <p className="text-xs text-brand-secondary mt-0.5 line-clamp-1">{d.description}</p>
                    <span className={`text-xs font-medium mt-1 inline-block ${d.color}`}>{d.category}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chat preview */}
          <div className="lg:col-span-3">
            <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col shadow-card">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${demo.bg}`}>
                  <Icon size={18} className={demo.color} />
                </div>
                <div>
                  <div className="font-tight font-semibold text-white text-sm">{demo.title}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                    <span className="text-xs text-brand-secondary">Live demo</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="badge-primary text-xs">{demo.category}</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-5 space-y-3 overflow-y-auto min-h-[320px]">
                {demo.preview.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'user' ? 'chat-user text-white' : 'chat-ai text-brand-secondary'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                  <span className="text-sm text-brand-secondary/60 flex-1">This is a live demo preview...</span>
                  <Link
                    href="/playground"
                    className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 shrink-0"
                  >
                    Full demo <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/playground"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-gradient text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
          >
            Try All AI Demos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
