import { Compass, PencilRuler, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Compass,
    title: 'Discover & Design',
    description: 'We map your workflows, identify automation opportunities, and design a custom AI system architecture tailored to your business goals.',
    phase: '01',
  },
  {
    icon: PencilRuler,
    title: 'Build & Train',
    description: 'Our team builds and trains your AI agents on your business data, integrating with your existing tools and systems for seamless operation.',
    phase: '02',
  },
  {
    icon: Rocket,
    title: 'Deploy & Scale',
    description: 'We launch your AI systems into production with monitoring, optimization, and ongoing support to ensure continuous improvement.',
    phase: '03',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad surface-abyss">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-4">
          <div className="eyebrow">How It Works</div>
          <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em]">
            From idea to{' '}
            <span className="gradient-text">production</span>
            {' '}in weeks
          </h2>
          <p className="text-brand-secondary text-base lg:text-lg font-light max-w-xl mx-auto">
            A proven three-phase process that takes you from manual operations to AI-powered automation — fast.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative card-elevated card-hover space-y-5"
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl surface-cobalt border border-brand-hairline flex items-center justify-center">
                    <Icon size={20} className="text-brand-primary" />
                  </div>
                  <span className="font-mono text-xs text-brand-slate">{step.phase}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-tight font-medium text-lg text-white">{step.title}</h3>
                  <p className="text-sm text-brand-secondary leading-relaxed font-light">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-brand-hairline" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
