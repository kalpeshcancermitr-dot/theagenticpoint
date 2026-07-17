'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Users, MessageSquare, Calendar, FileText, Mail, BarChart3,
  Mic, Bot, Send, Sparkles, ChevronRight, Play, ArrowRight,
  CheckCircle2, Zap, Workflow
} from 'lucide-react';
import Link from 'next/link';

type Message = { role: 'user' | 'ai'; text: string };

type Demo = {
  id: string;
  icon: React.ElementType;
  title: string;
  category: string;
  description: string;
  color: string;
  bg: string;
  border: string;
  conversation: Message[];
  benefits: string[];
  techStack: string[];
};

const demos: Demo[] = [
  {
    id: 'lead-qualification',
    icon: Users,
    title: 'Sales Qualification Agent',
    category: 'Sales',
    description: 'Qualifies B2B leads through a smart conversational flow, scores intent, and routes hot prospects instantly.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/25',
    benefits: ['24/7 lead response', 'Smart intent scoring', 'Instant hot-lead routing', 'CRM auto-update'],
    techStack: ['OpenAI GPT-4', 'n8n', 'HubSpot', 'WhatsApp API'],
    conversation: [
      { role: 'ai', text: "Hi! I'm the AgenticPoint Sales AI. To match you with the right solution, what industry is your business in?" },
      { role: 'user', text: 'We run a SaaS company, about 150 employees' },
      { role: 'ai', text: "Great! SaaS companies typically see huge ROI from AI automation. What's your biggest operational bottleneck — customer onboarding, support tickets, or sales follow-up?" },
      { role: 'user', text: 'Customer support is costing us too much' },
      { role: 'ai', text: 'Understood. With 150 employees, you\'re likely handling 500-2,000 tickets/month. Our AI Support Platform typically reduces ticket volume by 70-80%. What\'s your current monthly support cost?' },
      { role: 'user', text: 'Around $25,000 a month' },
      { role: 'ai', text: '🎯 High-intent lead detected!\n\nBased on your profile:\n• Company: SaaS, 150 employees\n• Pain: Customer support ($25K/month)\n• Potential savings: $17,500-$20,000/month\n\nI\'m routing you to our Enterprise Solutions team. A specialist will reach out within 2 hours. Want me to book a time now?' },
    ],
  },
  {
    id: 'customer-support',
    icon: MessageSquare,
    title: 'Customer Support AI',
    category: 'Operations',
    description: 'Multi-channel AI agent that resolves 78% of support tickets instantly without human intervention.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/25',
    benefits: ['78% ticket auto-resolution', '2-min avg response', 'Multi-channel support', 'Seamless escalation'],
    techStack: ['OpenAI GPT-4', 'Supabase pgvector', 'n8n', 'Intercom'],
    conversation: [
      { role: 'user', text: "I ordered the Pro plan 3 days ago but my account still shows Free. Order #PRO-8847." },
      { role: 'ai', text: "I can see order #PRO-8847 — payment of $149 processed successfully on July 14. The upgrade delay was caused by a sync issue on our end. I'm manually triggering the upgrade now." },
      { role: 'user', text: 'How long will it take?' },
      { role: 'ai', text: "Your account has been upgraded to Pro as of right now. Please log out and back in to see all features. I've also applied a 7-day extension to compensate for the delay. Is there anything else I can help with?" },
      { role: 'user', text: 'Perfect, thank you! Can you explain what the Pro plan includes?' },
      { role: 'ai', text: 'Pro plan includes:\n• Unlimited AI agent conversations\n• 10 workflow automations\n• Priority email & chat support\n• Advanced analytics dashboard\n• API access & webhooks\n• White-label option\n\nYou now have access to all of these. Your first billing date will be Aug 21.' },
    ],
  },
  {
    id: 'appointment',
    icon: Calendar,
    title: 'Appointment Booking Agent',
    category: 'Operations',
    description: 'Fully automated booking agent that handles scheduling, confirmations, rescheduling, and reminders.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/25',
    benefits: ['90% bookings automated', 'Zero scheduling conflicts', 'Auto-reminders', 'Calendar sync'],
    techStack: ['OpenAI', 'Google Calendar API', 'n8n', 'Calendly', 'Twilio'],
    conversation: [
      { role: 'user', text: "I'd like to book a consultation about AI automation for my business" },
      { role: 'ai', text: "I'd love to help schedule that! We have 30-minute discovery calls available. Here's what's open this week:\n\n• Tuesday Jul 22 — 10:00 AM, 2:00 PM, 4:00 PM\n• Wednesday Jul 23 — 11:00 AM, 3:00 PM\n• Thursday Jul 24 — 9:00 AM, 1:00 PM\n\nWhat time works best for you?" },
      { role: 'user', text: 'Tuesday at 2pm works' },
      { role: 'ai', text: "Booked! Here's your confirmation:\n\n📅 Tuesday, July 22\n⏰ 2:00 PM – 2:30 PM (GMT+0)\n📍 Google Meet (link sent to your email)\n\nI've sent a calendar invite and you'll receive a reminder 1 hour before. Our AI specialist will review your business beforehand. Anything specific you'd like to discuss?" },
      { role: 'user', text: 'Yes, I want to know about WhatsApp automation specifically' },
      { role: 'ai', text: "Perfect — I've added that to your meeting notes so our specialist comes prepared with WhatsApp AI examples relevant to your industry. See you Tuesday! 🚀" },
    ],
  },
  {
    id: 'document',
    icon: FileText,
    title: 'Document Intelligence',
    category: 'Finance',
    description: 'AI that reads, extracts, validates, and processes invoices and documents with 95%+ accuracy.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/25',
    benefits: ['95% extraction accuracy', '38hrs/week saved', 'Auto ERP sync', 'Fraud detection'],
    techStack: ['Claude AI', 'Google Cloud Vision', 'n8n', 'QuickBooks API', 'Supabase'],
    conversation: [
      { role: 'ai', text: '📄 Invoice received from TechVendor Solutions Ltd.\n\nExtracting document data...' },
      { role: 'ai', text: '✅ Extraction complete:\n\nInvoice #: INV-2024-0483\nVendor: TechVendor Solutions Ltd\nAmount: $4,250.00 + $637.50 tax = $4,887.50\nDue date: August 1, 2024\nServices: Cloud infrastructure (Jul 2024)\n\nValidating against PO database...' },
      { role: 'ai', text: '✅ PO Match Found: PO-2024-0892\nStatus: Within approved budget ($5,000 limit)\nVendor ID: Verified ✓\nTax ID: Confirmed ✓\n\nRouting for approval: Amount under $5K threshold → auto-approval eligible. Notifying Finance Manager Sarah K. for final sign-off.' },
      { role: 'user', text: 'Approved' },
      { role: 'ai', text: '✅ Invoice approved by Sarah K.\n\nActions taken:\n• QuickBooks entry created (Accounts Payable)\n• Payment scheduled: July 29 (3 days before due)\n• Vendor notified via email\n• Document archived: /invoices/2024/jul/INV-2024-0483.pdf\n\nProcessed in 47 seconds (vs 15 min manual average).' },
    ],
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email AI Assistant',
    category: 'Marketing',
    description: 'Intelligent email agent that drafts, sends, follows up, and manages inbox workflows automatically.',
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/25',
    benefits: ['10x faster outreach', 'Personalized at scale', 'Smart follow-ups', 'CRM auto-sync'],
    techStack: ['OpenAI GPT-4', 'Gmail API', 'Resend', 'HubSpot', 'n8n'],
    conversation: [
      { role: 'user', text: 'Draft a follow-up for the Meridian Capital proposal we sent last Thursday. They haven\'t responded.' },
      { role: 'ai', text: 'Pulling context from CRM... Found:\n• Proposal sent: July 10 to james.chen@meridian.com\n• Proposal value: $48,000\n• Stage: Proposal Sent (Day 7 of follow-up)\n\nDrafting personalized follow-up...' },
      { role: 'ai', text: '📧 Draft ready:\n\nSubject: Meridian Capital AI Proposal — Quick Question\n\nHi James,\n\nI wanted to follow up on the AI automation proposal we sent last week. Given Meridian\'s focus on portfolio analytics, I\'ve been thinking about one additional workflow that could save your team 20+ hours monthly.\n\nWould 15 minutes this week work to walk through it?\n\nBest,\nAlex' },
      { role: 'user', text: 'Perfect. Send it and set a reminder if no reply in 3 days.' },
      { role: 'ai', text: '✅ Email sent to james.chen@meridian.com\n⏰ Reminder set: July 20 if no reply\n📊 CRM updated: "Follow-up #2 sent Jul 17"\n\nI\'ll monitor the open rate and let you know when James reads it.' },
    ],
  },
  {
    id: 'proposal',
    icon: BarChart3,
    title: 'Proposal Generator',
    category: 'Sales',
    description: 'AI that generates custom branded proposals with case studies, pricing, and ROI projections in minutes.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/25',
    benefits: ['10-min proposal creation', '45% higher win rate', 'Auto case studies', 'ROI modeling'],
    techStack: ['OpenAI GPT-4', 'Claude', 'Notion API', 'Google Docs API', 'n8n'],
    conversation: [
      { role: 'user', text: 'Generate a proposal for GlobalTech Inc — they want CRM automation for their 200-person sales team' },
      { role: 'ai', text: 'Generating proposal for GlobalTech Inc...\n\n🔍 Researching: Pulling 3 relevant case studies from portfolio\n📊 Calculating: ROI projection for 200-seat CRM automation\n💰 Pricing: Configuring Enterprise tier\n📄 Building: Document structure...' },
      { role: 'ai', text: '✅ Proposal ready: "GlobalTech Inc — AI CRM Automation"\n\n14 pages including:\n• Executive summary\n• Current pain point analysis\n• Proposed solution architecture  \n• 3 relevant case studies (similar company sizes)\n• Implementation timeline: 3 phases, 6 weeks\n• Pricing: $72,000 (3 tiers presented)\n• ROI projection: $340,000 annual savings\n• Risk mitigation & security overview\n\nSend to contact?' },
      { role: 'user', text: 'Yes, send it to sarah@globaltech.com' },
      { role: 'ai', text: '📧 Proposal sent to sarah@globaltech.com\n📊 CRM: Deal created "GlobalTech - CRM Automation - $72K"\n📅 Follow-up reminder: July 22\n🔔 Tracking: I\'ll alert you when Sarah opens the proposal\n\nAverage close time for proposals this size: 12 days.' },
    ],
  },
  {
    id: 'healthcare',
    icon: Mic,
    title: 'Healthcare Follow-up AI',
    category: 'Healthcare',
    description: 'HIPAA-aware AI that handles patient follow-ups, medication reminders, and appointment confirmations.',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/25',
    benefits: ['40% better adherence', '60% fewer no-shows', 'HIPAA compliant', 'EHR integration'],
    techStack: ['OpenAI', 'Twilio', 'n8n', 'Supabase', 'Google Calendar'],
    conversation: [
      { role: 'ai', text: "Hi Ms. Rodriguez, this is Northside Clinic's care assistant. Following up on your appointment with Dr. Chen on Monday — how are you feeling?" },
      { role: 'user', text: "A little better but I forgot to take my blood pressure medication yesterday" },
      { role: 'ai', text: "Thank you for letting me know. Missing one dose of lisinopril occasionally isn't usually harmful, but consistency is important. I'm logging this in your care record for Dr. Chen.\n\nHave you set up phone reminders for your medication schedule?" },
      { role: 'user', text: "No, I keep forgetting" },
      { role: 'ai', text: "I've set up a daily reminder for you at 9:00 AM for your medication. You'll receive a text each morning.\n\nAlso, your 3-month follow-up appointment is due. I have Dr. Chen available:\n• August 15 at 10:00 AM\n• August 18 at 2:00 PM\n\nShall I book one of these for you?" },
    ],
  },
  {
    id: 'knowledge-base',
    icon: Bot,
    title: 'Knowledge Base Chatbot',
    category: 'Internal Tools',
    description: 'AI trained on your company documentation that gives instant, accurate answers to any question.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/8',
    border: 'border-purple-400/25',
    benefits: ['Instant accurate answers', 'Trained on your docs', 'Always up-to-date', 'Multi-language'],
    techStack: ['OpenAI', 'Supabase pgvector', 'LangChain', 'n8n', 'Notion API'],
    conversation: [
      { role: 'user', text: "What's our refund policy for enterprise annual subscriptions?" },
      { role: 'ai', text: 'Based on the Enterprise Agreement v2.3 (updated March 2024):\n\nEnterprise annual subscriptions qualify for:\n• Full refund within 30 days of purchase\n• Pro-rated refund after 30 days (up to 6 months)\n• No refund after 6 months unless service SLA was breached\n\nExceptions: Custom implementations and dedicated infrastructure costs are non-refundable after kickoff.\n\nSource: Enterprise Terms of Service, Section 8.2' },
      { role: 'user', text: 'What if the customer claims we missed SLA?' },
      { role: 'ai', text: 'If a customer claims SLA breach (Section 9.4):\n\n1. Request incident logs from the customer\n2. Cross-reference with our uptime dashboard (StatusPage)\n3. If breach confirmed: customer is eligible for service credits (10% per hour of downtime)\n4. If downtime exceeds 72hrs in a billing period: full month credit applicable\n\nFor refund claims due to SLA breach, escalate to Legal team (legal@company.com) with incident documentation.\n\nWant me to pull the full SLA definition table?' },
    ],
  },
];

const categories = ['All', 'Sales', 'Operations', 'Finance', 'Marketing', 'Healthcare', 'Internal Tools'];

export default function PlaygroundPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeDemoId, setActiveDemoId] = useState(demos[0].id);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filtered = selectedCategory === 'All'
    ? demos
    : demos.filter((d) => d.category === selectedCategory);

  const activeDemo = demos.find((d) => d.id === activeDemoId) ?? demos[0];
  const Icon = activeDemo.icon;

  useEffect(() => {
    setVisibleMessages(0);
    setIsPlaying(false);
  }, [activeDemoId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages]);

  const playConversation = () => {
    setVisibleMessages(0);
    setIsPlaying(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleMessages(i);
      if (i >= activeDemo.conversation.length) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 900);
  };

  const handleDemoSelect = (id: string) => {
    setActiveDemoId(id);
    setVisibleMessages(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-primary opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Sparkles size={11} />
            Interactive AI Playground
          </div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
            Experience AI{' '}
            <span className="gradient-text">Before You Buy</span>
          </h1>
          <p className="text-xl text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Live demos of the exact AI systems we build. Select a category, pick an agent, and see it in action.
          </p>
        </div>
      </section>

      {/* Main playground */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-glow-sm'
                    : 'border border-white/15 text-brand-secondary hover:text-white hover:border-white/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Demo list */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-2">
              {filtered.map((demo) => {
                const DIcon = demo.icon;
                return (
                  <button
                    key={demo.id}
                    onClick={() => handleDemoSelect(demo.id)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                      activeDemoId === demo.id
                        ? `${demo.border} glass-strong shadow-glow-sm`
                        : 'border-white/8 hover:border-white/15 hover:bg-white/4'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${demo.bg}`}>
                      <DIcon size={16} className={demo.color} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-tight font-semibold text-sm text-white truncate">{demo.title}</div>
                      <p className="text-xs text-brand-secondary mt-0.5 line-clamp-2">{demo.description}</p>
                      <span className={`text-xs font-medium mt-1 inline-block ${demo.color}`}>{demo.category}</span>
                    </div>
                    {activeDemoId === demo.id && (
                      <ChevronRight size={14} className={`shrink-0 mt-1 ${demo.color}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Chat + details */}
            <div className="lg:col-span-8 xl:col-span-9 grid xl:grid-cols-3 gap-6">
              {/* Chat panel */}
              <div className="xl:col-span-2 glass-strong rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-card" style={{ minHeight: 520 }}>
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeDemo.bg}`}>
                    <Icon size={20} className={activeDemo.color} />
                  </div>
                  <div>
                    <div className="font-tight font-semibold text-white">{activeDemo.title}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                      <span className="text-xs text-brand-secondary">
                        {isPlaying ? 'Processing...' : 'Ready to demo'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={playConversation}
                    disabled={isPlaying}
                    className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isPlaying
                        ? 'opacity-50 cursor-not-allowed bg-white/5 text-brand-secondary'
                        : `${activeDemo.bg} ${activeDemo.color} border ${activeDemo.border} hover:scale-105`
                    }`}
                  >
                    <Play size={14} fill="currentColor" />
                    {isPlaying ? 'Playing...' : visibleMessages > 0 ? 'Replay' : 'Play Demo'}
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-5 space-y-3 overflow-y-auto">
                  {visibleMessages === 0 && !isPlaying && (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeDemo.bg} border ${activeDemo.border}`}>
                        <Icon size={26} className={activeDemo.color} />
                      </div>
                      <div>
                        <p className="font-tight font-semibold text-white mb-1">{activeDemo.title}</p>
                        <p className="text-sm text-brand-secondary max-w-xs">{activeDemo.description}</p>
                      </div>
                      <button
                        onClick={playConversation}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${activeDemo.bg} ${activeDemo.color} border ${activeDemo.border}`}
                      >
                        <Play size={14} fill="currentColor" />
                        Start Demo
                      </button>
                    </div>
                  )}

                  {activeDemo.conversation.slice(0, visibleMessages).map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}
                    >
                      {msg.role === 'ai' && (
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 mr-2 ${activeDemo.bg}`}>
                          <Zap size={12} className={activeDemo.color} />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user' ? 'chat-user text-white' : 'chat-ai text-brand-secondary'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isPlaying && visibleMessages > 0 && visibleMessages < activeDemo.conversation.length && (
                    <div className="flex justify-start">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 mr-2 bg-primary/10">
                        <Zap size={12} className="text-primary" />
                      </div>
                      <div className="chat-ai px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input (decorative) */}
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="This is a live demo — click Play Demo above..."
                      className="flex-1 bg-transparent text-sm text-brand-secondary placeholder-brand-secondary/40 outline-none"
                      readOnly
                    />
                    <Send size={14} className="text-brand-secondary/40 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Side panel */}
              <div className="xl:col-span-1 space-y-4">
                {/* Benefits */}
                <div className="glass rounded-2xl p-5 border border-white/8 space-y-3">
                  <p className="font-tight font-semibold text-white text-sm flex items-center gap-2">
                    <Sparkles size={14} className={activeDemo.color} />
                    Key Benefits
                  </p>
                  <ul className="space-y-2">
                    {activeDemo.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-brand-secondary">
                        <CheckCircle2 size={13} className={`${activeDemo.color} shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech */}
                <div className="glass rounded-2xl p-5 border border-white/8 space-y-3">
                  <p className="font-tight font-semibold text-white text-sm flex items-center gap-2">
                    <Workflow size={14} className={activeDemo.color} />
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDemo.techStack.map((t) => (
                      <span
                        key={t}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${activeDemo.bg} border ${activeDemo.border} ${activeDemo.color}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className={`rounded-2xl p-5 border ${activeDemo.border} ${activeDemo.bg} space-y-3`}>
                  <p className="font-tight font-semibold text-white text-sm">Build this for your business</p>
                  <p className="text-xs text-brand-secondary">
                    We can deploy a production version of this AI system tailored to your workflows within 2-4 weeks.
                  </p>
                  <Link
                    href="/contact"
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 bg-primary text-white shadow-glow-sm`}
                  >
                    Get Started
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
