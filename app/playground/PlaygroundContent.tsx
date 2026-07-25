'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send, Sparkles, ChevronRight, ArrowRight, AlertCircle,
  RotateCcw, MessageSquare, Zap, Loader2, X,
  Users, Calendar, FileText, Mail,
  BarChart3, Mic, Bot, Workflow, Brain, type LucideIcon
} from 'lucide-react';
import Link from 'next/link';

type PublicAgent = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  icon: string;
  color_theme: string;
  welcome_message: string | null;
  suggested_prompts: string[];
  is_featured: boolean;
  sort_order: number;
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const ICON_MAP: Record<string, LucideIcon> = {
  Users, MessageSquare, Calendar, FileText, Mail,
  BarChart3, Mic, Bot, Zap, Workflow, Sparkles, Brain,
};

const COLOR_MAP: Record<string, { text: string; bg: string; border: string }> = {
  primary: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/25' },
  accent: { text: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/25' },
  green: { text: 'text-brand-success', bg: 'bg-brand-success/10', border: 'border-brand-success/25' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/25' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/25' },
  teal: { text: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/25' },
  rose: { text: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/25' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/25' },
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Bot;
}

function getColor(theme: string) {
  return COLOR_MAP[theme] ?? COLOR_MAP.primary;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('agenticpoint_session');
  if (!id) {
    id = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem('agenticpoint_session', id);
  }
  return id;
}

export default function PlaygroundContent() {
  const [agents, setAgents] = useState<PublicAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAgent, setActiveAgent] = useState<PublicAgent | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState('');
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(getSessionId());
    fetch('/api/agents/list')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setAgents(data.agents ?? []);
        if (data.agents?.length > 0) {
          setActiveAgent(data.agents[0]);
          if (data.agents[0].welcome_message) {
            setMessages([{ role: 'assistant', content: data.agents[0].welcome_message }]);
          }
        }
      })
      .catch((e) => setLoadError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(agents.map((a) => a.category).filter(Boolean))) as string[]];

  const filtered = selectedCategory === 'All' ? agents : agents.filter((a) => a.category === selectedCategory);

  const selectAgent = useCallback((agent: PublicAgent) => {
    setActiveAgent(agent);
    setMessages(agent.welcome_message ? [{ role: 'assistant', content: agent.welcome_message }] : []);
    setChatError('');
    setInput('');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || !activeAgent || sending) return;
    setChatError('');

    const userMsg: ChatMessage = { role: 'user', content: message };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setSending(true);

    try {
      const res = await fetch(`/api/agents/${activeAgent.slug}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          sessionId,
          history: newMessages.slice(-10),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setChatError(data.error || 'Something went wrong. Please try again.');
        if (data.code === 'session_limit_reached' || data.code === 'daily_limit_reached') {
          setMessages((prev) => [...prev, { role: 'assistant', content: data.error }]);
        }
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setChatError('Network error. Please check your connection and try again.');
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={28} className="text-primary animate-spin" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
          <p className="text-white font-semibold">Couldn&apos;t load the playground</p>
          <p className="text-brand-secondary text-sm mt-1">{loadError}</p>
        </div>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Bot size={40} className="text-brand-secondary/40 mx-auto mb-3" />
          <p className="text-white font-semibold">No agents available yet</p>
          <p className="text-brand-secondary text-sm mt-1">Check back soon — we&apos;re adding live AI demos.</p>
        </div>
      </div>
    );
  }

  const activeColor = activeAgent ? getColor(activeAgent.color_theme) : getColor('primary');
  const ActiveIcon = activeAgent ? getIcon(activeAgent.icon) : Bot;

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-primary opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Sparkles size={11} />
            Live AI Playground
          </div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
            Chat with Real{' '}
            <span className="gradient-text">AI Agents</span>
          </h1>
          <p className="text-xl text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            These aren&apos;t scripted demos — they&apos;re live AI agents powered by real LLMs. Pick one and start a conversation.
          </p>
        </div>
      </section>

      {/* Main playground */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-glow-sm'
                      : 'border border-white/15 text-brand-secondary hover:text-white hover:border-white/25'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Agent list */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-2">
              {filtered.map((agent) => {
                const DIcon = getIcon(agent.icon);
                const color = getColor(agent.color_theme);
                return (
                  <button
                    key={agent.id}
                    onClick={() => selectAgent(agent)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                      activeAgent?.id === agent.id
                        ? `${color.border} glass-strong shadow-glow-sm`
                        : 'border-white/8 hover:border-white/15 hover:bg-white/4'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color.bg}`}>
                      <DIcon size={16} className={color.text} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-tight font-semibold text-sm text-white truncate">{agent.name}</div>
                      <p className="text-xs text-brand-secondary mt-0.5 line-clamp-2">{agent.description}</p>
                      <span className={`text-xs font-medium mt-1 inline-block ${color.text}`}>{agent.category}</span>
                    </div>
                    {activeAgent?.id === agent.id && (
                      <ChevronRight size={14} className={`shrink-0 mt-1 ${color.text}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Chat + details */}
            <div className="lg:col-span-8 xl:col-span-9 grid xl:grid-cols-3 gap-6">
              {/* Chat panel */}
              <div className="xl:col-span-2 glass-strong rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-card" style={{ minHeight: 560 }}>
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeColor.bg}`}>
                    <ActiveIcon size={20} className={activeColor.text} />
                  </div>
                  <div>
                    <div className="font-tight font-semibold text-white">{activeAgent?.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                      <span className="text-xs text-brand-secondary">
                        {sending ? 'Thinking...' : 'Live · ready to chat'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => activeAgent && selectAgent(activeAgent)}
                    className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-brand-secondary hover:text-white border border-white/10 hover:border-white/20 transition-all"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-5 space-y-3 overflow-y-auto">
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${activeColor.bg} border ${activeColor.border}`}>
                        <ActiveIcon size={26} className={activeColor.text} />
                      </div>
                      <div>
                        <p className="font-tight font-semibold text-white mb-1">{activeAgent?.name}</p>
                        <p className="text-sm text-brand-secondary max-w-xs">{activeAgent?.description}</p>
                      </div>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
                      {msg.role === 'assistant' && (
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 mr-2 ${activeColor.bg}`}>
                          <Zap size={12} className={activeColor.text} />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user' ? 'chat-user text-white' : 'chat-ai text-brand-secondary'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {sending && (
                    <div className="flex justify-start">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 mr-2 ${activeColor.bg}`}>
                        <Zap size={12} className={activeColor.text} />
                      </div>
                      <div className="chat-ai px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested prompts */}
                {messages.length <= 1 && (activeAgent?.suggested_prompts ?? []).length > 0 && !sending && (
                  <div className="px-5 pb-3 flex flex-wrap gap-2">
                    {activeAgent!.suggested_prompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${activeColor.border} ${activeColor.bg} ${activeColor.text} hover:scale-105 transition-transform`}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Error */}
                {chatError && (
                  <div className="px-5 pb-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      <AlertCircle size={13} className="shrink-0" />
                      <span className="flex-1">{chatError}</span>
                      <button onClick={() => setChatError('')} className="text-red-400/60 hover:text-red-400">
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="px-5 pb-5 pt-1">
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 focus-within:border-primary/40 transition-colors">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !sending) sendMessage(input); }}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent text-sm text-white placeholder-brand-secondary/40 outline-none"
                      disabled={sending}
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={sending || !input.trim()}
                      className="text-primary disabled:opacity-40 hover:scale-110 transition-transform"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-brand-secondary/40 mt-2 text-center">
                    Live AI · conversations are logged for quality. Be respectful — no sensitive data.
                  </p>
                </div>
              </div>

              {/* Side panel */}
              <div className="xl:col-span-1 space-y-4">
                {/* About */}
                <div className="glass rounded-2xl p-5 border border-white/8 space-y-3">
                  <p className="font-tight font-semibold text-white text-sm flex items-center gap-2">
                    <MessageSquare size={14} className={activeColor.text} />
                    About this agent
                  </p>
                  <p className="text-sm text-brand-secondary leading-relaxed">{activeAgent?.description}</p>
                  <div className="pt-2">
                    <span className={`text-xs font-medium ${activeColor.text}`}>{activeAgent?.category}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className={`rounded-2xl p-5 border ${activeColor.border} ${activeColor.bg} space-y-3`}>
                  <p className="font-tight font-semibold text-white text-sm">Build this for your business</p>
                  <p className="text-xs text-brand-secondary">
                    We can deploy a production version of this AI agent tailored to your workflows within 2-4 weeks.
                  </p>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 bg-white text-brand-bg hover:shadow-glow"
                  >
                    Get Started
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
