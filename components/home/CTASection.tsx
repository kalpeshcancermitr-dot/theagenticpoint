import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0e111b' }}>
      {/* Aurora glows */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(98,95,255,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] pointer-events-none animate-pulse-glow animation-delay-500"
        style={{
          background: 'radial-gradient(circle, rgba(255,125,218,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Top / bottom hairlines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(98,95,255,0.3), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(98,95,255,0.3), transparent)' }}
      />

      <div className="relative max-w-[1200px] mx-auto text-center space-y-8">
        {/* Label */}
        <div className="badge-primary inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
          Currently Accepting New Clients
        </div>

        {/* Headline */}
        <h2
          className="text-quartz"
          style={{
            fontFamily: 'Figtree, DM Sans, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.08,
            letterSpacing: '-1.28px',
          }}
        >
          Ready to Automate{' '}
          <span className="gradient-text">Your Business?</span>
        </h2>

        {/* Sub */}
        <p className="text-ash max-w-2xl mx-auto" style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1.5 }}>
          Book a free 30-minute strategy session. We&apos;ll map your workflows, identify automation opportunities, and show you exactly what AI can do for your business.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary text-base px-7 py-3">
            <Calendar size={16} />
            Book Free Strategy Session
            <ArrowRight size={14} />
          </Link>
          <Link href="/playground" className="btn-ghost text-base px-7 py-3">
            Explore Live Demos
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-mist" style={{ fontSize: '13px', fontWeight: 300 }}>
          {['No commitment required', 'Free workflow audit', 'Clear ROI projection', 'Response within 24 hours'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="text-brand-success">✓</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
