'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Zap, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        const msg = authError.message;
        if (msg.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else if (msg.includes('rate limit') || msg.includes('Rate limit')) {
          setError('Too many attempts. Please wait a moment and try again.');
        } else if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed to fetch')) {
          setError('Cannot connect to the server. Please check your internet connection and try again.');
        } else {
          setError(msg);
        }
      } else {
        router.push('/admin');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed to fetch')) {
        setError('Cannot connect to the server. Please try again in a moment.');
      } else {
        setError(msg);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen surface-void flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15 animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, #4F8CFF 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl accent-cta flex items-center justify-center shadow-glow">
            <Zap size={22} className="text-white fill-white" />
          </div>
          <div className="text-center">
            <h1 className="font-tight font-semibold text-2xl text-white">AgenticPoint</h1>
            <p className="text-sm text-brand-secondary mt-0.5">Admin Dashboard</p>
          </div>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-2xl border border-brand-edge p-7 shadow-card">
          <h2 className="font-tight font-semibold text-white text-lg mb-5">Sign in to continue</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-secondary">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@agenticpoint.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-brand-secondary">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={14} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl accent-cta text-white font-semibold text-sm transition-all hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight size={14} /></>
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-brand-edge text-center">
            <p className="text-xs text-brand-secondary">
              Admin accounts are managed in the Supabase dashboard.
            </p>
          </div>
        </div>

        <Link href="/" className="block text-center mt-5 text-sm text-brand-secondary hover:text-white transition-colors">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
