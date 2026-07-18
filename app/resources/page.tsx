import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, FileCode2, Lightbulb, Calculator, MessageSquare, ArrowRight, Download } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Resources — Automation Guides, Templates & Tools',
  description: 'Free n8n templates, automation guides, ROI calculator, prompt library, and more from the AgenticPoint team.',
};

const blogPosts = [
  {
    title: 'The Complete Guide to WhatsApp Business Automation',
    excerpt: 'Everything you need to know about building production-ready WhatsApp AI agents — from API setup to conversation design.',
    category: 'Guides',
    readTime: '12 min read',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
  },
  {
    title: 'How to Calculate ROI for AI Automation Projects',
    excerpt: 'A practical framework for measuring and projecting the business value of AI automation before and after implementation.',
    category: 'Strategy',
    readTime: '8 min read',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    title: 'n8n vs Make.com vs Zapier: Which Automation Tool is Right for You?',
    excerpt: 'An honest comparison of the three leading automation platforms for AI-powered business workflows.',
    category: 'Comparison',
    readTime: '10 min read',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
  },
  {
    title: 'Building Production-Ready RAG Systems with Supabase',
    excerpt: 'Step-by-step guide to building knowledge base AI that actually works in production using Supabase pgvector.',
    category: 'Technical',
    readTime: '15 min read',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
  },
  {
    title: '10 Processes Every Business Should Automate First',
    excerpt: 'The highest-ROI automation opportunities most businesses overlook — ranked by impact and implementation effort.',
    category: 'Strategy',
    readTime: '7 min read',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
  },
  {
    title: 'Prompt Engineering for Business AI Agents',
    excerpt: 'Advanced techniques for writing prompts that make AI agents more reliable, accurate, and on-brand.',
    category: 'Technical',
    readTime: '11 min read',
    color: 'text-purple-400',
    bg: 'bg-purple-400/8',
    border: 'border-purple-400/20',
  },
];

const templates = [
  {
    title: 'Lead Qualification Flow',
    description: 'n8n workflow for qualifying inbound leads via WhatsApp with a 7-question conversational flow.',
    tags: ['n8n', 'WhatsApp', 'OpenAI'],
    color: 'text-green-400',
  },
  {
    title: 'Invoice Processing Pipeline',
    description: 'Extract, validate, and route invoice data from email attachments into your accounting system.',
    tags: ['n8n', 'Claude AI', 'QuickBooks'],
    color: 'text-yellow-400',
  },
  {
    title: 'Customer Support Triage',
    description: 'Classify incoming support tickets by category, urgency, and route to the right team automatically.',
    tags: ['n8n', 'OpenAI', 'Intercom'],
    color: 'text-primary',
  },
  {
    title: 'Appointment Booking Bot',
    description: 'Full booking workflow including availability check, confirmation, and Google Calendar sync.',
    tags: ['n8n', 'OpenAI', 'Google Calendar'],
    color: 'text-accent',
  },
  {
    title: 'Email Follow-up Sequence',
    description: 'Automated multi-step email follow-up with personalization powered by CRM data.',
    tags: ['n8n', 'OpenAI', 'HubSpot'],
    color: 'text-teal-400',
  },
  {
    title: 'Document Classification',
    description: 'Automatically classify and tag uploaded documents by type, sender, and priority.',
    tags: ['n8n', 'Claude', 'Supabase'],
    color: 'text-orange-400',
  },
];

const tools = [
  {
    icon: Calculator,
    title: 'ROI Calculator',
    description: 'Calculate the potential ROI of automating your business processes with AI.',
    label: 'Use Calculator',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    href: '#calculator',
  },
  {
    icon: MessageSquare,
    title: 'Prompt Library',
    description: '100+ production-tested prompts for common business AI use cases.',
    label: 'Browse Prompts',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    href: '#prompts',
  },
  {
    icon: FileCode2,
    title: 'WhatsApp API Guide',
    description: 'Complete step-by-step guide to setting up WhatsApp Business API for automation.',
    label: 'Read Guide',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    href: '#whatsapp-guide',
  },
  {
    icon: Lightbulb,
    title: 'Implementation Checklist',
    description: 'A 47-point checklist for launching AI automation projects successfully.',
    label: 'Download Checklist',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    href: '#checklist',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] glow-primary opacity-25" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <BookOpen size={11} />
            Resources
          </div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
            Learn, Build, and{' '}
            <span className="gradient-text">Automate Faster</span>
          </h1>
          <p className="text-xl text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Free guides, templates, tools, and deep-dives from the AgenticPoint team. Everything you need to start automating your business with AI.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="py-16 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-2">
            <h2 className="font-tight font-bold text-3xl text-white">Free Tools & Resources</h2>
            <p className="text-brand-secondary">Practical tools to help you plan and execute AI automation projects.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.title}
                  className={`group p-6 rounded-2xl border ${tool.border} ${tool.bg} bg-brand-card/30 card-hover space-y-4`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.bg} border ${tool.border}`}>
                    <Icon size={20} className={tool.color} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-tight font-bold text-white">{tool.title}</h3>
                    <p className="text-sm text-brand-secondary">{tool.description}</p>
                  </div>
                  <a href={tool.href} className={`flex items-center gap-1.5 text-sm font-medium ${tool.color}`}>
                    {tool.label}
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-16 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <h2 className="font-tight font-bold text-3xl text-white">Latest Articles</h2>
              <p className="text-brand-secondary">Deep dives on AI automation, implementation strategies, and industry insights.</p>
            </div>
            <span className="text-sm text-brand-secondary shrink-0">Coming soon — subscribe for updates</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post) => (
              <div
                key={post.title}
                className="group p-6 rounded-2xl border border-white/8 bg-brand-card/40 card-hover space-y-3"
              >
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${post.color} ${post.bg} ${post.border}`}>
                  {post.category}
                </span>
                <h3 className="font-tight font-bold text-white group-hover:text-primary transition-colors duration-200 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-brand-secondary leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-brand-secondary">{post.readTime}</span>
                  <span className={`text-xs font-medium ${post.color}`}>Coming soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* n8n Templates */}
      <section id="templates" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-2">
            <h2 className="font-tight font-bold text-3xl text-white">Free n8n Templates</h2>
            <p className="text-brand-secondary">Production-ready workflow templates you can import and customize for your business.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((template) => (
              <div
                key={template.title}
                className="group p-5 rounded-2xl border border-white/8 bg-brand-card/40 card-hover space-y-3"
              >
                <h3 className="font-tight font-semibold text-white">{template.title}</h3>
                <p className="text-sm text-brand-secondary leading-relaxed">{template.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded-md text-xs font-mono font-medium ${template.color} bg-white/5 border border-white/8`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className={`flex items-center gap-1.5 text-sm font-medium ${template.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <Download size={12} />
                  Download Template (Coming Soon)
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-brand-surface border-t border-white/8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex">Newsletter</div>
          <h2 className="font-tight font-bold text-3xl text-white">
            Get AI Automation Insights Weekly
          </h2>
          <p className="text-brand-secondary">
            Practical automation tips, new templates, and industry case studies — directly in your inbox. No fluff.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <CTASection />
    </div>
  );
}
