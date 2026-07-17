import { CheckCircle2, Zap, Shield, Clock, TrendingUp, HeartHandshake, Layers, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: CheckCircle2,
    title: 'Business-First Solutions',
    description: 'Every system we build is designed around your business outcomes, not just technical specs.',
    color: 'text-brand-success',
  },
  {
    icon: Layers,
    title: 'Production-Ready Architecture',
    description: 'We don\'t build demos. Every solution is built for scale, reliability, and real-world usage.',
    color: 'text-primary',
  },
  {
    icon: Zap,
    title: 'Rapid Delivery',
    description: 'Working prototypes in 5-7 days. Full production deployment in 2-4 weeks.',
    color: 'text-yellow-400',
  },
  {
    icon: TrendingUp,
    title: 'Scalable by Design',
    description: 'Systems designed to grow with your business — from 100 to 100,000 interactions daily.',
    color: 'text-accent',
  },
  {
    icon: Shield,
    title: 'Secure Integrations',
    description: 'Enterprise-grade security, encrypted data handling, and compliance-aware architecture.',
    color: 'text-rose-400',
  },
  {
    icon: Clock,
    title: 'Modern Tech Stack',
    description: 'Latest AI models, best-in-class automation tools, and cloud-native infrastructure.',
    color: 'text-orange-400',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Direct access to the engineers who built your system — not a support ticket queue.',
    color: 'text-teal-400',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Partnership',
    description: 'We invest in your success. As you grow, we evolve your AI systems with you.',
    color: 'text-purple-400',
  },
];

export default function WhyUs() {
  return (
    <section className="section-pad bg-brand-surface relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <div className="badge-primary inline-flex">Why AgenticPoint</div>
          <h2 className="font-tight font-bold text-4xl lg:text-5xl text-white">
            Built for{' '}
            <span className="gradient-text">Business Outcomes</span>,<br />
            Not Just Technology
          </h2>
          <p className="text-brand-secondary text-lg">
            We combine deep technical expertise with real-world business understanding to deliver AI systems that actually move the needle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group p-6 rounded-2xl border border-white/8 bg-brand-card/40 card-hover space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={reason.color} />
                </div>
                <h3 className="font-tight font-semibold text-white">{reason.title}</h3>
                <p className="text-sm text-brand-secondary leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
