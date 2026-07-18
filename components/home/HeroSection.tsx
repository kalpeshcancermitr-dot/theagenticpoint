import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const activityFeed = [
  { label: 'Lead qualified via WhatsApp', time: '2s ago' },
  { label: 'Invoice processed automatically', time: '8s ago' },
  { label: 'Appointment booked, calendar synced', time: '14s ago' },
  { label: 'Support ticket resolved by AI', time: '21s ago' },
  { label: 'Follow-up email sent to prospect', time: '35s ago' },
];

function ExampleDashboard() {
  return (
    <div className="relative w-full max-w-[400px] mx-auto lg:mx-0 animate-float">
      {/* Subtle glow behind the card */}
      <div
        className="absolute -inset-8 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(98,95,255,0.25) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background: '#0d172b',
          border: '1px solid #151e32',
          boxShadow: 'rgba(0,0,0,0.5) 0px 20px 35px 0px, rgba(0,0,0,0.25) 0px 4px 13px 0px',
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-1.5 px-4 py-3 border-b"
          style={{ borderColor: '#151e32', background: '#0e111b' }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-slate/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate/60" />
          <span className="ml-2 text-[12px] font-mono text-ash/60">AI Automation Dashboard — Example</span>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-px" style={{ background: '#0e111b' }}>
          {[
            { value: '247', label: 'Leads Today', icon: TrendingUp },
            { value: '78%', label: 'Auto-Resolved', icon: CheckCircle2 },
            { value: '14.2h', label: 'Time Saved', icon: Zap },
          ].map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-1 py-4"
              style={{ background: '#0d172b' }}
            >
              <Icon size={12} className="text-frosted-lilac" />
              <span className="font-display font-semibold text-[18px] text-quartz leading-none">{value}</span>
              <span className="text-[11px] text-ash text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="p-4 space-y-2">
          <p className="section-label mb-3">Live Activity</p>
          {activityFeed.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#625fff' }} />
                <span className="text-[12px] text-mist truncate">{item.label}</span>
              </div>
              <span className="text-[11px] font-mono text-slate shrink-0">{item.time}</span>
            </div>
          ))}
        </div>

        {/* Status footer */}
        <div className="px-4 pb-4">
          <div
            className="flex items-center justify-between px-3 py-2 rounded-lg"
            style={{ background: 'rgba(98,95,255,0.08)', border: '1px solid rgba(98,95,255,0.2)' }}
          >
            <span className="text-[11px] font-mono text-frosted-lilac">illustrative scenario</span>
            <span className="text-[11px] font-mono text-slate">your data here</span>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getSettings(): Promise<Record<string, string>> {
  const { data } = await supabase.from('site_settings').select('key, value');
  const map: Record<string, string> = {};
  (data ?? []).forEach((row: { key: string; value: string }) => {
    map[row.key] = row.value;
  });
  return map;
}

export default async function HeroSection() {
  const settings = await getSettings();

  const headline = settings['hero_headline'] || 'Building AI Employees\nfor Modern Businesses.';
  const subheadline =
    settings['hero_subheadline'] ||
    'We design and deploy intelligent AI systems that automate operations, eliminate repetitive work, and help your business scale — without scaling headcount.';
  const ctaText = settings['hero_cta_primary'] || 'Book Discovery Call';

  const stats = [
    { value: settings['hero_stat_1_value'] || '50+', label: settings['hero_stat_1_label'] || 'AI Systems Deployed' },
    { value: settings['hero_stat_2_value'] || '10x', label: settings['hero_stat_2_label'] || 'Average ROI' },
    { value: settings['hero_stat_3_value'] || '2–4 wks', label: settings['hero_stat_3_label'] || 'To Production' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#0b0c0e' }}>
      {/* Aurora glows */}
      <div className="aurora-purple absolute inset-0 pointer-events-none" />
      <div className="aurora-pink absolute inset-0 pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0b0c0e, transparent)' }}
      />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-up">
            {/* Eyebrow */}
            <div className="badge-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-frosted-lilac animate-pulse" />
              AI Automation Studio
            </div>

            {/* Headline */}
            <div className="space-y-5">
              <h1
                className="text-quartz whitespace-pre-line"
                style={{
                  fontFamily: 'Figtree, DM Sans, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(40px, 5.5vw, 64px)',
                  lineHeight: 1.08,
                  letterSpacing: '-1.28px',
                }}
              >
                {headline}
              </h1>
              <p className="text-ash leading-relaxed max-w-lg" style={{ fontSize: '16px', fontWeight: 300 }}>
                {subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">
                {ctaText}
                <ArrowRight size={14} />
              </Link>
              <Link href="/playground" className="btn-ghost">
                Explore Live Demos
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
              {stats.map(({ value, label }) => (
                <div key={label} className="space-y-0.5">
                  <div
                    className="text-quartz"
                    style={{
                      fontFamily: 'Figtree, DM Sans, sans-serif',
                      fontWeight: 500,
                      fontSize: '24px',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    {value}
                  </div>
                  <div className="text-ash" style={{ fontSize: '13px', fontWeight: 300 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: example dashboard */}
          <div className="flex justify-center lg:justify-end animate-fade-up animation-delay-300">
            <ExampleDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
