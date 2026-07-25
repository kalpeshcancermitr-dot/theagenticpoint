import type { Metadata } from 'next';
import { BookOpen, FileCode2, Lightbulb, Calculator, MessageSquare, ArrowRight, Download } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Resources — Automation Guides, Templates & Tools',
  description: 'Free n8n templates, automation guides, ROI calculator, prompt library, and more from the AgenticPoint team.',
};

const tools = [
  { icon: Calculator, title: 'ROI Calculator', description: 'Calculate the potential ROI of automating your business processes with AI.', label: 'Use Calculator', color: '#2862d7', href: '#calculator' },
  { icon: MessageSquare, title: 'Prompt Library', description: '100+ production-tested prompts for common business AI use cases.', label: 'Browse Prompts', color: '#625fff', href: '#prompts' },
  { icon: FileCode2, title: 'WhatsApp API Guide', description: 'Complete step-by-step guide to setting up WhatsApp Business API for automation.', label: 'Read Guide', color: '#3bdc8c', href: '#whatsapp-guide' },
  { icon: Lightbulb, title: 'Implementation Checklist', description: 'A 47-point checklist for launching AI automation projects successfully.', label: 'Download Checklist', color: '#facc15', href: '#checklist' },
];

const blogPosts = [
  { title: 'The Complete Guide to WhatsApp Business Automation', excerpt: 'Everything you need to know about building production-ready WhatsApp AI agents — from API setup to conversation design.', category: 'Guides', readTime: '12 min read', color: '#3bdc8c' },
  { title: 'How to Calculate ROI for AI Automation Projects', excerpt: 'A practical framework for measuring and projecting the business value of AI automation before and after implementation.', category: 'Strategy', readTime: '8 min read', color: '#2862d7' },
  { title: 'n8n vs Make.com vs Zapier: Which Automation Tool is Right for You?', excerpt: 'An honest comparison of the three leading automation platforms for AI-powered business workflows.', category: 'Comparison', readTime: '10 min read', color: '#625fff' },
  { title: 'Building Production-Ready RAG Systems with Supabase', excerpt: 'Step-by-step guide to building knowledge base AI that actually works in production using Supabase pgvector.', category: 'Technical', readTime: '15 min read', color: '#facc15' },
  { title: '10 Processes Every Business Should Automate First', excerpt: 'The highest-ROI automation opportunities most businesses overlook — ranked by impact and implementation effort.', category: 'Strategy', readTime: '7 min read', color: '#fb923c' },
  { title: 'Prompt Engineering for Business AI Agents', excerpt: 'Advanced techniques for writing prompts that make AI agents more reliable, accurate, and on-brand.', category: 'Technical', readTime: '11 min read', color: '#a78bfa' },
];

const templates = [
  { title: 'Lead Qualification Flow', description: 'n8n workflow for qualifying inbound leads via WhatsApp with a 7-question conversational flow.', tags: ['n8n', 'WhatsApp', 'Gemini'], color: '#3bdc8c' },
  { title: 'Invoice Processing Pipeline', description: 'Extract, validate, and route invoice data from email attachments into your accounting system.', tags: ['n8n', 'Claude AI', 'QuickBooks'], color: '#facc15' },
  { title: 'Customer Support Triage', description: 'Classify incoming support tickets by category, urgency, and route to the right team automatically.', tags: ['n8n', 'Gemini', 'Intercom'], color: '#2862d7' },
  { title: 'Appointment Booking Bot', description: 'Full booking workflow including availability check, confirmation, and Google Calendar sync.', tags: ['n8n', 'Gemini', 'Google Calendar'], color: '#625fff' },
  { title: 'Email Follow-up Sequence', description: 'Automated multi-step email follow-up with personalization powered by CRM data.', tags: ['n8n', 'Gemini', 'HubSpot'], color: '#2dd4bf' },
  { title: 'Document Classification', description: 'Automatically classify and tag uploaded documents by type, sender, and priority.', tags: ['n8n', 'Claude', 'Supabase'], color: '#fb923c' },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen surface-void">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[500px] h-[400px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <BookOpen size={11} />
            Resources
          </div>
          <h1 className="font-tight font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em]">
            Learn, Build, and{' '}
            <span className="gradient-text">Automate Faster</span>
          </h1>
          <p className="text-base lg:text-lg text-brand-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Free guides, templates, tools, and deep-dives from the AgenticPoint team. Everything you need to start automating your business with AI.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="py-16 surface-abyss">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-2">
            <h2 className="font-tight font-medium text-3xl text-white">Free Tools & Resources</h2>
            <p className="text-brand-secondary font-light">Practical tools to help you plan and execute AI automation projects.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.title} className="card-elevated card-hover space-y-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${tool.color}1a`, borderColor: `${tool.color}40` }}>
                    <Icon size={20} style={{ color: tool.color }} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-tight font-medium text-white">{tool.title}</h3>
                    <p className="text-sm text-brand-secondary font-light">{tool.description}</p>
                  </div>
                  <a href={tool.href} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: tool.color }}>
                    {tool.label}
                    <ArrowRight size={12} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-16 surface-void">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
            <div className="space-y-2">
              <h2 className="font-tight font-medium text-3xl text-white">Latest Articles</h2>
              <p className="text-brand-secondary font-light">Deep dives on AI automation, implementation strategies, and industry insights.</p>
            </div>
            <span className="text-sm text-brand-secondary shrink-0 font-light">Coming soon — subscribe for updates</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <div key={post.title} className="card-elevated card-hover space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border" style={{ color: post.color, backgroundColor: `${post.color}1a`, borderColor: `${post.color}40` }}>
                  {post.category}
                </span>
                <h3 className="font-tight font-medium text-white leading-snug">{post.title}</h3>
                <p className="text-sm text-brand-secondary leading-relaxed font-light">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-brand-slate font-light">{post.readTime}</span>
                  <span className="text-xs font-medium" style={{ color: post.color }}>Coming soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* n8n Templates */}
      <section id="templates" className="py-16 surface-abyss">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-2">
            <h2 className="font-tight font-medium text-3xl text-white">Free n8n Templates</h2>
            <p className="text-brand-secondary font-light">Production-ready workflow templates you can import and customize for your business.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div key={template.title} className="card-elevated card-hover space-y-3">
                <h3 className="font-tight font-medium text-white">{template.title}</h3>
                <p className="text-sm text-brand-secondary leading-relaxed font-light">{template.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-mono font-medium border" style={{ color: template.color, backgroundColor: `${template.color}1a`, borderColor: `${template.color}40` }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 text-sm font-medium opacity-60" style={{ color: template.color }}>
                  <Download size={12} />
                  Download Template (Coming Soon)
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 surface-void border-t border-brand-edge">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex">Newsletter</div>
          <h2 className="font-tight font-medium text-3xl text-white">
            Get AI Automation Insights Weekly
          </h2>
          <p className="text-brand-secondary font-light">
            Practical automation tips, new templates, and industry case studies — directly in your inbox. No fluff.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <CTASection />
    </div>
  );
}
