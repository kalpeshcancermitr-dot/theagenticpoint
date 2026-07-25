import Link from 'next/link';
import { ArrowRight, Zap, Bot } from 'lucide-react';
import { getSettings } from '@/lib/getSettings';

const activityFeed = [
  { icon: Zap, text: 'Lead qualified via WhatsApp', color: '#625fff' },
  { icon: Bot, text: 'Invoice processed automatically', color: '#ff7dda' },
  { icon: Bot, text: 'Appointment booked, calendar synced', color: '#2862d7' },
  { icon: Bot, text: 'Support ticket resolved by AI', color: '#625fff' },
  { icon: Bot, text: 'Follow-up email sent to prospect', color: '#ff7dda' },
];

function TerminalVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 animate-float">
      {/* Stacked code panels for depth */}
      <div className="absolute -top-4 -right-4 w-full h-full code-block opacity-20 rotate-3" />
      <div className="absolute -top-2 -right-2 w-full h-full code-block opacity-40 rotate-1" />

      <div className="relative code-block shadow-float overflow-hidden">
        {/* Header row */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-brand-inkline">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent-gradient flex items-center justify-center">
              <Zap size={11} className="text-white fill-white" />
            </div>
            <span className="font-mono text-xs text-brand-secondary">agent.ts</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-slate" />
            <span className="w-2 h-2 rounded-full bg-brand-slate" />
            <span className="w-2 h-2 rounded-full bg-brand-slate" />
          </div>
        </div>

        {/* Code body */}
        <div className="p-4 font-mono text-xs leading-relaxed">
          <div className="flex"><span className="code-ln w-6 select-none">1</span><span className="code-txt"><span className="code-kw">import</span> <span className="code-cmt">&#123; Agent &#125;</span> <span className="code-kw">from</span> <span className="code-str">&apos;agenticpoint&apos;</span></span></div>
          <div className="flex"><span className="code-ln w-6 select-none">2</span><span className="code-txt"></span></div>
          <div className="flex"><span className="code-ln w-6 select-none">3</span><span className="code-txt"><span className="code-kw">const</span> <span className="code-str">agent</span> = <span className="code-kw">new</span> Agent(&#123;</span></div>
          <div className="flex"><span className="code-ln w-6 select-none">4</span><span className="code-txt pl-4">model: <span className="code-str">&apos;gemini-2.5-pro&apos;</span>,</span></div>
          <div className="flex"><span className="code-ln w-6 select-none">5</span><span className="code-txt pl-4">role: <span className="code-str">&apos;sales-qualification&apos;</span>,</span></div>
          <div className="flex"><span className="code-ln w-6 select-none">6</span><span className="code-txt pl-4">tools: [<span className="code-str">&apos;calendar&apos;</span>, <span className="code-str">&apos;crm&apos;</span>],</span></div>
          <div className="flex"><span className="code-ln w-6 select-none">7</span><span className="code-txt">&#125;)</span></div>
          <div className="flex"><span className="code-ln w-6 select-none">8</span><span className="code-txt"></span></div>
          <div className="flex"><span className="code-ln w-6 select-none">9</span><span className="code-cmt">&#47;&#47; live in production</span></div>
          <div className="flex"><span className="code-ln w-6 select-none">10</span><span className="code-txt"><span className="code-kw">await</span> agent.deploy()</span></div>
        </div>

        {/* Activity feed */}
        <div className="px-4 py-3 border-t border-brand-inkline space-y-2">
          <p className="font-mono text-[10px] text-brand-slate uppercase tracking-wider">live feed</p>
          {activityFeed.slice(0, 3).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2 animate-slide-up" style={{ animationDelay: `${i * 120}ms` }}>
                <Icon size={12} style={{ color: item.color }} className="shrink-0" />
                <p className="text-xs text-brand-tertiary truncate flex-1">{item.text}</p>
                <span className="font-mono text-[10px] text-brand-slate">ok</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default async function HeroSection() {
  const settings = await getSettings();

  const headline = settings['hero_headline'] || 'Building AI Employees\nfor Modern Businesses.';
  const subheadline =
    settings['hero_subheadline'] ||
    'We design and deploy intelligent AI systems that automate operations, eliminate repetitive work, and help your business scale — without scaling headcount.';
  const ctaText = settings['hero_cta_primary'] || 'Let\'s chat';

  const stats = [
    { value: settings['hero_stat_1_value'] || '50+', label: settings['hero_stat_1_label'] || 'AI Systems Deployed' },
    { value: settings['hero_stat_2_value'] || '10x', label: settings['hero_stat_2_label'] || 'Average ROI' },
    { value: settings['hero_stat_3_value'] || '2-4 wks', label: settings['hero_stat_3_label'] || 'To Production' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise surface-void">
      {/* Aurora glows — hero only */}
      <div className="absolute inset-0">
        <div className="aurora-orb w-[700px] h-[700px] top-[-15%] left-[-10%] aurora-purple" />
        <div className="aurora-orb w-[600px] h-[600px] bottom-[-10%] right-[-5%] aurora-pink animation-delay-500" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-up">
            <div className="badge-primary inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              AI Automation Studio
            </div>

            <div className="space-y-4">
              <h1 className="font-tight font-semibold text-[2.5rem] sm:text-5xl lg:text-6xl text-white tracking-[-0.03em] leading-[1.05] whitespace-pre-line">
                {headline}
              </h1>
              <p className="text-base lg:text-lg text-brand-secondary max-w-lg leading-relaxed font-light">
                {subheadline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="pill-cta group flex items-center gap-2">
                {ctaText}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/playground" className="ghost-btn flex items-center gap-2">
                Explore Playground
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span className="font-tight font-semibold text-xl text-white">{value}</span>
                  <span className="text-sm text-brand-secondary font-light">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: terminal visual */}
          <div className="flex justify-center lg:justify-end animate-fade-up animation-delay-300">
            <TerminalVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
