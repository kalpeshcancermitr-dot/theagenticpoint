'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
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
      <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-brand-success text-sm font-medium max-w-md mx-auto" style={{ backgroundColor: 'rgba(59,220,140,0.10)', border: '1px solid rgba(59,220,140,0.25)' }}>
        <CheckCircle2 size={16} />
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
          className="input-base flex-1"
        />
        <button
          type="submit"
          disabled={loading}
          className="pill-cta flex items-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : null}
          Subscribe
        </button>
      </div>
      {error && (
        <p className="text-sm text-center text-brand-secondary font-light">{error}</p>
      )}
    </form>
  );
}
