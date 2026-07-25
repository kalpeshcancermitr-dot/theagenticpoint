import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, Eye, Heart, Check, ArrowRight, Zap } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'About — AgenticPoint AI Studio',
  description: 'AgenticPoint is an AI Automation Studio on a mission to help businesses replace repetitive manual work with intelligent AI systems.',
};

const values = [
  { icon: Target, title: 'Practical AI', description: 'We don\'t chase AI trends. We build systems that solve real, measurable business problems.' },
  { icon: Check, title: 'Production Ready', description: 'Every system we deploy is built for real-world conditions — scale, reliability, and edge cases included.' },
  { icon: Heart, title: 'Business First', description: 'Technology is the tool. Your business outcome is the goal. We measure success in ROI, not technical complexity.' },
  { icon: Eye, title: 'Transparent', description: 'No black boxes. We explain what we\'re building, why, and how it works. You own everything we create.' },
];

const techStack = [
  { category: 'AI Models', items: ['Google Gemini', 'Anthropic Claude', 'OpenAI GPT-4', 'Llama 3'] },
  { category: 'Automation', items: ['n8n', 'Make.com', 'Zapier', 'Custom APIs'] },
  { category: 'Infrastructure', items: ['Supabase', 'Vercel', 'AWS', 'Google Cloud'] },
  { category: 'Channels', items: ['WhatsApp Business API', 'Twilio', 'ElevenLabs', 'Slack'] },
];

const milestones = [
  { number: '50+', label: 'AI Systems Deployed', sub: 'In production across 12+ industries' },
  { number: '2-4 Weeks', label: 'Delivery Timeline', sub: 'From discovery to production deployment' },
  { number: '$2M+', label: 'Client Savings Delivered', sub: 'In operational cost reduction' },
  { number: '95%', label: 'Client Retention Rate', sub: 'Long-term partnership approach' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen surface-void">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[600px] h-[500px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex">About Us</div>
          <h1 className="font-tight font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em] leading-[1.1]">
            We Build{' '}
            <span className="gradient-text">AI Employees</span>,<br />
            Not Software
          </h1>
          <p className="text-base lg:text-lg text-brand-secondary leading-relaxed font-light">
            AgenticPoint is an AI Automation Studio. We design, build, and deploy intelligent AI systems that take over repetitive business operations — so your team can focus on what actually matters.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="section-pad surface-abyss">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="badge-primary inline-flex">Our Mission</div>
              <h2 className="font-tight font-semibold text-2xl lg:text-3xl text-white leading-tight">
                Making Enterprise-Grade Automation Accessible to Every Business
              </h2>
              <div className="space-y-4 text-brand-secondary leading-relaxed font-light">
                <p>Large enterprises have had AI automation for years. They can afford armies of developers, consultants, and custom software. Small and mid-sized businesses couldn&apos;t.</p>
                <p>AgenticPoint exists to close that gap. We bring the same level of intelligent automation — AI assistants, workflow orchestration, document intelligence — to businesses of every size, at a fraction of traditional costs.</p>
                <p>Our approach is simple: understand the business first, design the smartest solution possible, and build it to production standards that actually hold up under real-world conditions.</p>
              </div>
            </div>

            <div className="space-y-3">
              {milestones.map(({ number, label, sub }) => (
                <div key={label} className="flex items-center gap-5 card-elevated">
                  <div className="font-tight font-semibold text-2xl lg:text-3xl gradient-text shrink-0">{number}</div>
                  <div>
                    <div className="font-tight font-medium text-white">{label}</div>
                    <div className="text-sm text-brand-secondary font-light">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad surface-void relative overflow-hidden">
        <div className="aurora-orb w-[500px] h-[500px] top-[20%] right-[-10%] aurora-pink opacity-40" />
        <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="eyebrow">Our Values</div>
            <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em]">
              How We Think and{' '}
              <span className="gradient-text">Why It Matters</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card-elevated card-hover space-y-3">
                <div className="w-10 h-10 rounded-xl surface-cobalt border border-brand-hairline flex items-center justify-center">
                  <Icon size={18} className="text-brand-primary" />
                </div>
                <h3 className="font-tight font-medium text-white">{title}</h3>
                <p className="text-sm text-brand-secondary leading-relaxed font-light">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section-pad surface-abyss">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="eyebrow">Technology</div>
            <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em]">
              Built on the <span className="gradient-text">Best Tools Available</span>
            </h2>
            <p className="text-brand-secondary max-w-xl mx-auto font-light">
              We stay at the forefront of AI technology to ensure every system we build uses the most capable, reliable tools available.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map(({ category, items }) => (
              <div key={category} className="card-elevated space-y-3">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-brand-primary" />
                  <span className="font-tight font-medium text-white text-sm">{category}</span>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-brand-secondary font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 shrink-0" />
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
      <section className="section-pad surface-abyss">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="badge-primary inline-flex">Our Philosophy</div>
          <blockquote className="font-tight font-semibold text-3xl lg:text-4xl text-white leading-tight tracking-[-0.025em]">
            &ldquo;We don&apos;t sell software.<br />
            <span className="gradient-text">We build AI employees.&rdquo;</span>
          </blockquote>
          <p className="text-brand-secondary text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            The businesses that thrive in the next decade will be those that leverage AI as a genuine operational resource — not just a feature. Our job is to make that transition practical, fast, and profitable.
          </p>
          <Link href="/contact" className="pill-cta inline-flex items-center gap-2">
            Work With Us
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
