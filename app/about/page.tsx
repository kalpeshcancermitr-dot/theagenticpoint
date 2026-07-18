import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Target, Eye, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'About — AgenticPoint AI Studio',
  description: 'AgenticPoint is an AI Automation Studio on a mission to help businesses replace repetitive manual work with intelligent AI systems.',
};

const values = [
  { icon: Target, title: 'Practical AI', description: 'We don\'t chase AI trends. We build systems that solve real, measurable business problems.' },
  { icon: CheckCircle2, title: 'Production Ready', description: 'Every system we deploy is built for real-world conditions — scale, reliability, and edge cases included.' },
  { icon: Heart, title: 'Business First', description: 'Technology is the tool. Your business outcome is the goal. We measure success in ROI, not technical complexity.' },
  { icon: Eye, title: 'Transparent', description: 'No black boxes. We explain what we\'re building, why, and how it works. You own everything we create.' },
];

const techStack = [
  { category: 'AI Models', items: ['OpenAI GPT-4o', 'Anthropic Claude 3.5', 'Google Gemini', 'Llama 3'] },
  { category: 'Automation', items: ['n8n', 'Make.com', 'Zapier', 'Custom APIs'] },
  { category: 'Infrastructure', items: ['Supabase', 'Vercel', 'AWS', 'Google Cloud'] },
  { category: 'Channels', items: ['WhatsApp Business API', 'Twilio', 'ElevenLabs', 'Slack'] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-primary opacity-25" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex">About Us</div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            We Build{' '}
            <span className="gradient-text">AI Employees</span>,<br />
            Not Software
          </h1>
          <p className="text-xl text-brand-secondary leading-relaxed">
            AgenticPoint is an AI Automation Studio. We design, build, and deploy intelligent AI systems that take over repetitive business operations — so your team can focus on what actually matters.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-20 border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="badge-primary inline-flex">Our Mission</div>
              <h2 className="font-tight font-bold text-4xl text-white leading-tight">
                Making Enterprise-Grade Automation Accessible to Every Business
              </h2>
              <div className="space-y-4 text-brand-secondary leading-relaxed">
                <p>
                  Large enterprises have had AI automation for years. They can afford armies of developers, consultants, and custom software. Small and mid-sized businesses couldn&apos;t.
                </p>
                <p>
                  AgenticPoint exists to close that gap. We bring the same level of intelligent automation — AI assistants, workflow orchestration, document intelligence — to businesses of every size, at a fraction of traditional costs.
                </p>
                <p>
                  Our approach is simple: understand the business first, design the smartest solution possible, and build it to production standards that actually hold up under real-world conditions.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { number: '50+', label: 'AI Systems Deployed', sub: 'In production across 12+ industries' },
                { number: '2-4 Weeks', label: 'Delivery Timeline', sub: 'From discovery to production deployment' },
                { number: '$2M+', label: 'Client Savings Delivered', sub: 'In operational cost reduction' },
                { number: '95%', label: 'Client Retention Rate', sub: 'Long-term partnership approach' },
              ].map(({ number, label, sub }) => (
                <div key={label} className="flex items-center gap-5 p-5 rounded-2xl glass border border-white/8">
                  <div className="font-tight font-bold text-3xl gradient-text shrink-0">{number}</div>
                  <div>
                    <div className="font-tight font-semibold text-white">{label}</div>
                    <div className="text-sm text-brand-secondary">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="badge-primary inline-flex">Our Values</div>
            <h2 className="font-tight font-bold text-4xl text-white">
              How We Think and{' '}
              <span className="gradient-text">Why It Matters</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl border border-white/8 bg-brand-card/40 space-y-3 card-hover">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-tight font-bold text-white">{title}</h3>
                <p className="text-sm text-brand-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="badge-primary inline-flex">Technology</div>
            <h2 className="font-tight font-bold text-4xl text-white">
              Built on the <span className="gradient-text">Best Tools Available</span>
            </h2>
            <p className="text-brand-secondary max-w-xl mx-auto">
              We stay at the forefront of AI technology to ensure every system we build uses the most capable, reliable tools available.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map(({ category, items }) => (
              <div key={category} className="p-5 rounded-2xl glass border border-white/8 space-y-3">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-primary" />
                  <span className="font-tight font-semibold text-white text-sm">{category}</span>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-brand-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-brand-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="badge-primary inline-flex">Our Philosophy</div>
          <blockquote className="font-tight font-bold text-4xl lg:text-5xl text-white leading-tight">
            &ldquo;We don&apos;t sell software.<br />
            <span className="gradient-text">We build AI employees.&rdquo;</span>
          </blockquote>
          <p className="text-brand-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            The businesses that thrive in the next decade will be those that leverage AI as a genuine operational resource — not just a feature. Our job is to make that transition practical, fast, and profitable.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-gradient text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
          >
            Work With Us
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
