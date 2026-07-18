import Link from 'next/link';
import { Zap, ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-primary opacity-15" />

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-glow">
            <Zap size={32} className="text-white fill-white" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-8xl font-bold text-white/10 select-none leading-none">404</div>
          <h1 className="font-tight font-extrabold text-3xl text-white -mt-4">Page Not Found</h1>
          <p className="text-brand-secondary leading-relaxed">
            Looks like this page went offline. The URL may have changed or the page no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-white font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-200 hover:scale-105 active:scale-100"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-brand-secondary hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
          >
            <Search size={16} />
            Contact Support
          </Link>
        </div>

        <div className="pt-4 border-t border-white/8">
          <p className="text-sm text-brand-secondary/60">
            Need help?{' '}
            <a href="mailto:hello@agenticpoint.com" className="text-primary hover:text-primary/80 transition-colors">
              hello@agenticpoint.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
