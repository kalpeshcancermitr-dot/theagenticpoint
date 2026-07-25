import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { getSettings } from '@/lib/getSettings';

const agents = [
  { name: 'Sales Qualification', model: 'gemini-2.5-pro', color: '#625fff' },
  { name: 'Customer Support', model: 'gemini-2.5-flash', color: '#2862d7' },
  { name: 'Appointment Booking', model: 'gemini-3-flash-preview', color: '#ff7dda' },
  { name: 'Proposal Generator', model: 'gemini-2.5-pro', color: '#625fff' },
];

export default async function PlaygroundPreview() {
  const settings = await getSettings();
  const title = settings['playground_preview_title'] || 'Meet your AI workforce.';
  const subtitle =
    settings['playground_preview_subtitle'] ||
    'Eight specialized AI agents, live and ready to chat. Try them right now — no signup required.';

  return (
    <section className="section-pad surface-void relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="aurora-orb w-[500px] h-[500px] top-[10%] right-[-15%] aurora-purple opacity-60" />
      </div>

      <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile layout: heading → phone → button (stacked) */}
        <div className="lg:hidden space-y-8">
          <div className="space-y-5 text-center">
            <div className="badge-primary inline-flex items-center gap-1.5">
              <Play size={11} />
              Interactive Playground
            </div>
            <h2 className="font-tight font-semibold text-3xl text-white tracking-[-0.025em]">
              {title}
            </h2>
            <p className="text-brand-secondary text-base font-light max-w-lg mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="flex justify-center">
            <PhonePreview />
          </div>

          <div className="flex justify-center">
            <Link href="/playground" className="pill-cta flex items-center gap-2 group">
              Try the Playground
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Desktop layout: two-column */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="space-y-6">
            <div className="badge-primary inline-flex items-center gap-1.5">
              <Play size={11} />
              Interactive Playground
            </div>
            <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em]">
              {title}
            </h2>
            <p className="text-brand-secondary text-base lg:text-lg font-light max-w-lg">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/playground" className="pill-cta flex items-center gap-2 group">
                Try the Playground
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {agents.map((agent) => (
                <Link
                  key={agent.name}
                  href="/playground"
                  className="card-base card-hover flex items-center gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: 'rgba(98,95,255,0.1)', borderColor: 'rgba(98,95,255,0.25)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: agent.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium truncate">{agent.name}</p>
                    <p className="font-mono text-[10px] text-brand-slate truncate">{agent.model}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Phone mockup preview */}
          <div className="flex justify-center lg:justify-end">
            <PhonePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhonePreview() {
  return (
    <div className="relative">
      <div className="absolute inset-0 aurora-purple opacity-30 blur-3xl" />
      <div className="relative w-[280px] h-[560px] rounded-[2.5rem] surface-abyss border border-brand-edge shadow-float overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-brand-bg rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="absolute inset-0 pt-8 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-inkline">
            <div className="w-8 h-8 rounded-full surface-cobalt border border-brand-hairline flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">Sales Agent</p>
              <p className="text-[10px] text-brand-success flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-brand-success" /> online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-4 space-y-3 overflow-hidden">
            <div className="chat-ai p-3 max-w-[85%] animate-slide-up">
              <p className="text-xs text-brand-tertiary leading-relaxed">Hi! I&apos;m here to qualify your leads. What&apos;s your biggest sales challenge right now?</p>
            </div>
            <div className="chat-user p-3 max-w-[85%] ml-auto animate-slide-up animation-delay-200">
              <p className="text-xs text-white leading-relaxed">We get 200+ inquiries but only follow up on 30%.</p>
            </div>
            <div className="chat-ai p-3 max-w-[85%] animate-slide-up animation-delay-400">
              <p className="text-xs text-brand-tertiary leading-relaxed">I can handle all 200 instantly — qualifying and booking meetings automatically.</p>
            </div>
            <div className="flex items-center gap-1.5 pl-3 animate-fade-in animation-delay-600">
              <span className="typing-dot" />
              <span className="typing-dot animation-delay-200" />
              <span className="typing-dot animation-delay-400" />
            </div>
          </div>

          {/* Input bar */}
          <div className="p-3 border-t border-brand-inkline">
            <div className="flex items-center gap-2 surface-deep-sea rounded-full px-4 py-2.5 border border-brand-edge">
              <span className="text-xs text-brand-slate flex-1">Type a message...</span>
              <div className="w-6 h-6 rounded-full bg-accent-gradient flex items-center justify-center">
                <ArrowRight size={11} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
