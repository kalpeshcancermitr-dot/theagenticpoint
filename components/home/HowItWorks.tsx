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
    <section className="section-pad" style={{ background: '#0e111b' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <p className="section-label">Our Process</p>
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
            From Idea to{' '}
            <span className="gradient-text">Production</span>
            {' '}in Weeks
          </h2>
          <p className="text-ash" style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.5 }}>
            A structured, transparent process from discovery to deployment — designed to minimize risk and maximize impact.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative card-hover"
              style={{
                background: '#0d172b',
                border: '1px solid #172540',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              {/* Big bg number */}
              <div
                className="font-mono font-bold absolute top-4 right-5 select-none pointer-events-none"
                style={{ fontSize: '48px', color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}
              >
                {step.number}
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(98,95,255,0.12)', border: '1px solid rgba(98,95,255,0.25)' }}
                >
                  <span className="font-mono text-[11px] font-semibold text-frosted-lilac">{step.number}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="h-px flex-1 hidden lg:block"
                    style={{ background: 'linear-gradient(to right, rgba(98,95,255,0.2), transparent)' }}
                  />
                )}
              </div>

              <h3 className="text-quartz font-medium text-[17px] mb-2">{step.title}</h3>
              <p className="text-ash mb-4 leading-relaxed" style={{ fontSize: '13px', fontWeight: 300 }}>{step.description}</p>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success" />
                <span className="text-brand-success font-medium" style={{ fontSize: '12px' }}>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
