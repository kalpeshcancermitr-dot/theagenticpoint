'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Zap, RefreshCw, Home, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
            <AlertTriangle size={32} className="text-rose-400" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-tight font-extrabold text-3xl text-white">Something Went Wrong</h1>
          <p className="text-brand-secondary leading-relaxed">
            An unexpected error occurred. We&apos;ve been notified and are looking into it.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-brand-secondary/50">Error ID: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-white font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-200 hover:scale-105 active:scale-100"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-brand-secondary hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>

        <div className="pt-4 border-t border-white/8">
          <p className="text-sm text-brand-secondary/60">
            If the issue persists, email{' '}
            <a href="mailto:hello@agenticpoint.com" className="text-primary hover:text-primary/80 transition-colors">
              hello@agenticpoint.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
