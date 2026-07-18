'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');

    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email });

    setLoading(false);
    if (dbError) {
      if (dbError.code === '23505') {
        setError("You're already subscribed — we'll keep sending great content.");
      } else {
        setError('Something went wrong. Please try again.');
      }
    } else {
      setSuccess(true);
      setEmail('');
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-success/10 border border-brand-success/20 text-brand-success text-sm font-medium max-w-md mx-auto">
        You&apos;re subscribed! Expect your first issue soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
      <div className="flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-primary-gradient text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          Subscribe
        </button>
      </div>
      {error && (
        <p className="text-sm text-center text-brand-secondary">{error}</p>
      )}
    </form>
  );
}
