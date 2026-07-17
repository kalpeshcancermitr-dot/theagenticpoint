import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-surface" />
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-64 glow-primary opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-80 h-56 glow-accent opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-success/10 border border-brand-success/25 text-brand-success text-xs font-medium uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
          Currently Accepting New Clients
        </div>

        {/* Headline */}
        <h2 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
          Ready to Automate{' '}
          <span className="gradient-text">Your Business?</span>
        </h2>

        {/* Sub */}
        <p className="text-xl text-brand-secondary max-w-2xl mx-auto leading-relaxed">
          Book a free 30-minute strategy session. We'll map your workflows, identify automation opportunities, and show you exactly what AI can do for your business.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-gradient text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-100"
          >
            <Calendar size={18} />
            Book Free Strategy Session
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/playground"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white font-semibold text-lg hover:bg-white/6 hover:border-white/25 transition-all duration-200"
          >
            Explore Live Demos
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-brand-secondary">
          <span className="flex items-center gap-1.5">
            <span className="text-brand-success">✓</span> No commitment required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand-success">✓</span> Free workflow audit
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand-success">✓</span> Clear ROI projection
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand-success">✓</span> Response within 24 hours
          </span>
        </div>
      </div>
    </section>
  );
}
