'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const activityFeed = [
  { icon: '⚡', text: 'Lead qualified via WhatsApp', time: '2s ago', color: 'text-green-400' },
  { icon: '📄', text: 'Invoice processed automatically', time: '18s ago', color: 'text-yellow-400' },
  { icon: '📅', text: 'Appointment booked, calendar synced', time: '1m ago', color: 'text-accent' },
  { icon: '🎯', text: 'Support ticket resolved by AI', time: '3m ago', color: 'text-primary' },
  { icon: '📧', text: 'Follow-up email sent to prospect', time: '5m ago', color: 'text-orange-400' },
];

function LiveDashboard() {
  const [tick, setTick] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems((v) => Math.min(v + 1, activityFeed.length));
    }, 800);
    return () => clearTimeout(timer);
  }, [visibleItems]);

  const baseLeads = 247 + (tick % 60 === 0 ? 1 : 0);

  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0 animate-float">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl blur-2xl" />

      <div className="relative glass-strong rounded-2xl border border-white/12 overflow-hidden shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8 bg-white/3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary-gradient flex items-center justify-center">
              <Zap size={12} className="text-white fill-white" />
            </div>
            <span className="font-tight font-semibold text-sm text-white">AgenticPoint AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
            <span className="text-xs text-brand-success font-medium">Live</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/8">
          {[
            { value: baseLeads.toString(), label: 'Leads Today', icon: TrendingUp, color: 'text-primary' },
            { value: '78%', label: 'Auto-Resolved', icon: CheckCircle2, color: 'text-brand-success' },
            { value: '14.2h', label: 'Time Saved', icon: Zap, color: 'text-accent' },
          ].map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-1 py-3.5 bg-brand-surface/50">
              <Icon size={13} className={color} />
              <span className={`font-tight font-bold text-base ${color}`}>{value}</span>
              <span className="text-xs text-brand-secondary leading-none text-center">{label}</span>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="p-4 space-y-2">
          <p className="text-xs font-medium text-brand-secondary/60 uppercase tracking-wider mb-3">Recent Activity</p>
          {activityFeed.slice(0, visibleItems).map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 animate-fade-up"
              style={{ opacity: 1 }}
            >
              <span className="text-sm shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-brand-secondary truncate">{item.text}</p>
              </div>
              <span className="text-xs text-brand-secondary/50 shrink-0 font-mono">{item.time}</span>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-brand-success/8 border border-brand-success/20">
            <span className="text-xs text-brand-success font-medium">All systems operational</span>
            <span className="font-mono text-xs text-brand-secondary">99.9% uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* Glow orbs */}
        <div
          className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full opacity-15 animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, #4F8CFF 0%, transparent 65%)', transform: 'translate(-30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 animate-pulse-glow animation-delay-500"
          style={{ background: 'radial-gradient(circle, #6EE7F9 0%, transparent 65%)', transform: 'translate(30%, 30%)' }}
        />
        {/* Gradient fade bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI Automation Studio
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-tight font-extrabold text-[2.6rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] text-white tracking-[-0.03em] leading-[1.08]">
                Building AI Employees<br />
                for Modern Businesses.
              </h1>
              <p className="text-lg text-brand-secondary max-w-lg leading-relaxed pt-2">
                We design and deploy intelligent AI systems that automate operations, eliminate repetitive work, and help your business scale — without scaling headcount.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-100"
              >
                Book Discovery Call
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/playground"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white font-semibold text-sm hover:bg-white/5 hover:border-white/25 transition-all duration-200"
              >
                Explore Live Demos
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              {[
                { value: '50+', label: 'AI Systems Deployed' },
                { value: '10x', label: 'Average ROI' },
                { value: '2-4 wks', label: 'To Production' },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="font-tight font-bold text-xl text-white">{value}</span>
                  <span className="text-sm text-brand-secondary">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: live dashboard preview */}
          <div className="flex justify-center lg:justify-end animate-fade-up animation-delay-300">
            <LiveDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
