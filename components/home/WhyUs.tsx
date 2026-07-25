import { Clock, Shield, Zap, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: 'Fast Time-to-Value',
    description: 'Most AI systems go live in 2-4 weeks, not months. We prioritize rapid deployment and iterative improvement over lengthy planning cycles.',
  },
  {
    icon: Shield,
    title: 'Production-Grade',
    description: 'Every system we build is designed for scale, with monitoring, fallbacks, and human-in-the-loop controls built in from day one.',
  },
  {
    icon: Zap,
    title: 'Real Business Impact',
    description: 'We measure success in hours saved, revenue generated, and costs reduced — not vanity metrics or demo polish.',
  },
  {
    icon: TrendingUp,
    title: 'Ongoing Optimization',
    description: 'AI systems need continuous tuning. We provide ongoing support, A/B testing, and optimization to keep performance improving over time.',
  },
];

export default function WhyUs() {
  return (
    <section className="section-pad surface-void relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="aurora-orb w-[500px] h-[500px] bottom-[-10%] left-[-10%] aurora-pink opacity-50" />
      </div>

      <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="eyebrow">Why AgenticPoint</div>
            <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em] leading-[1.1]">
              We don&apos;t build demos.{' '}
              <span className="gradient-text">We build businesses.</span>
            </h2>
            <p className="text-brand-secondary text-base lg:text-lg font-light">
              Most AI agencies deliver a polished prototype and disappear. We deploy production systems that run your business — and we stick around to keep them sharp.
            </p>
            <div className="card-highlight space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                <p className="text-sm text-white font-medium">Production-first philosophy</p>
              </div>
              <p className="text-sm text-brand-tertiary font-light leading-relaxed">
                Every agent we ship is monitored, measured, and optimized against real business KPIs — not toy benchmarks.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="card-elevated card-hover space-y-4">
                  <div className="w-10 h-10 rounded-xl surface-cobalt border border-brand-hairline flex items-center justify-center">
                    <Icon size={18} className="text-brand-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-tight font-medium text-white text-base">{reason.title}</h3>
                    <p className="text-sm text-brand-secondary leading-relaxed font-light">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
