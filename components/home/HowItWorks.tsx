const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We map your current workflows, identify automation opportunities, and define success metrics with your team.',
    detail: '30-min strategy call',
  },
  {
    number: '02',
    title: 'Workflow Design',
    description: 'Our AI engineers design the architecture — data flows, integrations, AI models, and business logic.',
    detail: 'Visual workflow blueprint',
  },
  {
    number: '03',
    title: 'Prototype',
    description: 'We build a working prototype in 5-7 days so you can see the system in action before full development.',
    detail: 'Functional demo delivered',
  },
  {
    number: '04',
    title: 'Testing & Refinement',
    description: 'Rigorous testing with real data. We fine-tune responses, edge cases, and integration reliability.',
    detail: 'Quality assurance phase',
  },
  {
    number: '05',
    title: 'Deployment',
    description: 'Production deployment with monitoring, error handling, and performance tracking from day one.',
    detail: 'Go live in 2-4 weeks',
  },
  {
    number: '06',
    title: 'Ongoing Support',
    description: 'Continuous optimization, model updates, and feature additions as your business scales.',
    detail: 'Dedicated support channel',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <div className="badge-primary inline-flex">Our Process</div>
          <h2 className="font-tight font-bold text-4xl lg:text-5xl text-white">
            From Idea to{' '}
            <span className="gradient-text">Production</span>
            {' '}in Weeks
          </h2>
          <p className="text-brand-secondary text-lg">
            A structured, transparent process from discovery to deployment — designed to minimize risk and maximize impact.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative p-6 rounded-2xl border border-white/8 bg-brand-card/40 card-hover"
            >
              {/* Step number */}
              <div className="font-mono text-5xl font-bold text-white/5 absolute top-4 right-5 select-none group-hover:text-primary/10 transition-colors duration-300">
                {step.number}
              </div>

              {/* Step indicator */}
              <div className="relative flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="font-mono text-xs font-semibold text-primary">{step.number}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent hidden lg:block" />
                )}
              </div>

              <h3 className="font-tight font-bold text-white text-xl mb-2">{step.title}</h3>
              <p className="text-brand-secondary text-sm leading-relaxed mb-4">{step.description}</p>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success" />
                <span className="text-xs text-brand-success font-medium">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
