'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen surface-void flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)' }}>
            <AlertTriangle size={32} className="text-rose-400" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="font-tight font-semibold text-3xl text-white tracking-[-0.025em]">Something Went Wrong</h1>
          <p className="text-brand-secondary leading-relaxed font-light">
            An unexpected error occurred. We&apos;ve been notified and are looking into it.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-brand-slate">Error ID: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="pill-cta flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="ghost-btn flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>

        <div className="pt-4 border-t border-brand-edge">
          <p className="text-sm text-brand-slate font-light">
            If the issue persists, email{' '}
            <a href="mailto:hello@agenticpoint.com" className="text-brand-primary hover:text-white transition-colors">
              hello@agenticpoint.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
