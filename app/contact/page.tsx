'use client';

import { useState } from 'react';
import { Calendar, Mail, MessageSquare, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const services = [
  'AI Workflow Automation',
  'WhatsApp AI',
  'Voice AI Agent',
  'Customer Support AI',
  'Document Intelligence',
  'CRM Automation',
  'Internal AI Tools',
  'Email Automation',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service_interest: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: dbError } = await supabase
      .from('contact_requests')
      .insert({
        name: form.name,
        email: form.email,
        company: form.company || null,
        service_interest: form.service_interest || null,
        message: form.message || null,
      });

    setLoading(false);
    if (dbError) {
      setError('Something went wrong. Please try again or email us directly.');
    } else {
      setSuccess(true);
      setForm({ name: '', email: '', company: '', service_interest: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] glow-primary opacity-25" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="badge-primary inline-flex">Contact Us</div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
            Let&apos;s Build Your{' '}
            <span className="gradient-text">AI System</span>
          </h1>
          <p className="text-xl text-brand-secondary max-w-xl mx-auto leading-relaxed">
            Book a free 30-minute strategy session. We&apos;ll map your workflows and show you exactly what&apos;s possible.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-2xl p-6 border border-white/8 space-y-4">
                <h3 className="font-tight font-bold text-white">What to Expect</h3>
                <ul className="space-y-3">
                  {[
                    'Free 30-minute discovery call',
                    'Workflow audit and opportunity mapping',
                    'Custom AI solution recommendation',
                    'Clear ROI projection',
                    'No commitment required',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-brand-secondary">
                      <CheckCircle2 size={14} className="text-brand-success mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:hello@agenticpoint.com"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/4 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">Email Us</div>
                    <div className="text-xs text-brand-secondary">hello@agenticpoint.com</div>
                  </div>
                  <ArrowRight size={14} className="text-brand-secondary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://calendly.com/agenticpoint/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/4 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calendar size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">Book Directly</div>
                    <div className="text-xs text-brand-secondary">Schedule via Calendly</div>
                  </div>
                  <ArrowRight size={14} className="text-brand-secondary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://wa.me/1234567890?text=Hi%2C%20I%27d%20like%20to%20discuss%20AI%20automation%20for%20my%20business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/4 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-400/10 flex items-center justify-center">
                    <MessageSquare size={16} className="text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">WhatsApp</div>
                    <div className="text-xs text-brand-secondary">Message us directly</div>
                  </div>
                  <ArrowRight size={14} className="text-brand-secondary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div className="text-sm text-brand-secondary">
                <span className="text-brand-success">✓</span> We respond to every inquiry within 24 hours.
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="glass-strong rounded-2xl border border-white/10 p-8 shadow-card">
                {success ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-success/10 border border-brand-success/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} className="text-brand-success" />
                    </div>
                    <h3 className="font-tight font-bold text-2xl text-white">Message Received!</h3>
                    <p className="text-brand-secondary max-w-xs mx-auto">
                      We&apos;ll review your request and get back to you within 24 hours with a tailored response.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="font-tight font-bold text-2xl text-white mb-1">Book a Discovery Call</h2>
                      <p className="text-sm text-brand-secondary">Tell us about your business and what you want to automate.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white">Work Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-white">Company</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Your company name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-white">I&apos;m interested in</label>
                      <select
                        value={form.service_interest}
                        onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-brand-surface border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-white">Tell us about your project</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="What processes would you like to automate? What's your biggest operational challenge?"
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/50 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-gradient text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Calendar size={16} />
                          Book Discovery Call
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-brand-secondary text-center">
                      No spam. No commitment. We&apos;ll respond within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
