import Link from 'next/link';
import { Zap, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen surface-void flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="aurora-orb w-[600px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aurora-purple opacity-40" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-float">
            <Zap size={32} className="text-white fill-white" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-8xl font-bold text-white/10 select-none leading-none">404</div>
          <h1 className="font-tight font-semibold text-3xl text-white tracking-[-0.025em] -mt-4">Page Not Found</h1>
          <p className="text-brand-secondary leading-relaxed font-light">
            Looks like this page went offline. The URL may have changed or the page no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="pill-cta flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="ghost-btn flex items-center justify-center gap-2"
          >
            <Search size={16} />
            Contact Support
          </Link>
        </div>

        <div className="pt-4 border-t border-brand-edge">
          <p className="text-sm text-brand-slate font-light">
            Need help?{' '}
            <a href="mailto:hello@agenticpoint.com" className="text-brand-primary hover:text-white transition-colors">
              hello@agenticpoint.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
