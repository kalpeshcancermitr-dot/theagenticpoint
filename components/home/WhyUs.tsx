import { CheckCircle2, Zap, Shield, Clock, TrendingUp, HeartHandshake, Layers, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: CheckCircle2,
    title: 'Business-First Solutions',
    description: 'Every system we build is designed around your business outcomes, not just technical specs.',
  },
  {
    icon: Layers,
    title: 'Production-Ready Architecture',
    description: 'We don\'t build demos. Every solution is built for scale, reliability, and real-world usage.',
  },
  {
    icon: Zap,
    title: 'Rapid Delivery',
    description: 'Working prototypes in 5-7 days. Full production deployment in 2-4 weeks.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable by Design',
    description: 'Systems designed to grow with your business — from 100 to 100,000 interactions daily.',
  },
  {
    icon: Shield,
    title: 'Secure Integrations',
    description: 'Enterprise-grade security, encrypted data handling, and compliance-aware architecture.',
  },
  {
    icon: Clock,
    title: 'Modern Tech Stack',
    description: 'Latest AI models, best-in-class automation tools, and cloud-native infrastructure.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Direct access to the engineers who built your system — not a support ticket queue.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Partnership',
    description: 'We invest in your success. As you grow, we evolve your AI systems with you.',
  },
];

export default function WhyUs() {
  return (
    <section className="section-pad relative overflow-hidden" style={{ background: '#0b0c0e' }}>
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <p className="section-label">Why AgenticPoint</p>
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
            Built for{' '}
            <span className="gradient-text">Business Outcomes</span>,<br />
            Not Just Technology
          </h2>
          <p className="text-ash" style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.5 }}>
            We combine deep technical expertise with real-world business understanding to deliver AI systems that actually move the needle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group card-hover space-y-3"
                style={{
                  background: '#0d172b',
                  border: '1px solid #172540',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #172540' }}
                >
                  <Icon size={16} className="text-frosted-lilac" />
                </div>
                <h3 className="text-quartz font-medium text-[15px]">{reason.title}</h3>
                <p className="text-ash leading-relaxed" style={{ fontSize: '13px', fontWeight: 300 }}>{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
