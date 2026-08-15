'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send, Sparkles, ChevronRight, ArrowRight, AlertCircle,
  RotateCcw, MessageSquare, Zap, Loader2, X, Menu, Bot,
  Users, Calendar, FileText, Mail,
  BarChart3, Mic, Workflow, Brain, type LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import BackendActionPanel from '@/components/playground/BackendActionPanel';

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

const COLOR_MAP: Record<string, { dot: string; bg: string; border: string; text: string }> = {
  primary: { dot: '#2862d7', bg: 'rgba(40,98,215,0.12)', border: 'rgba(40,98,215,0.30)', text: '#5C96DC' },
  accent: { dot: '#625fff', bg: 'rgba(98,95,255,0.12)', border: 'rgba(98,95,255,0.30)', text: '#85a6e9' },
  green: { dot: '#3bdc8c', bg: 'rgba(59,220,140,0.12)', border: 'rgba(59,220,140,0.30)', text: '#3bdc8c' },
  yellow: { dot: '#facc15', bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.30)', text: '#facc15' },
  orange: { dot: '#fb923c', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.30)', text: '#fb923c' },
  teal: { dot: '#2dd4bf', bg: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.30)', text: '#2dd4bf' },
  rose: { dot: '#fb7185', bg: 'rgba(251,113,133,0.12)', border: 'rgba(251,113,133,0.30)', text: '#fb7185' },
  purple: { dot: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.30)', text: '#a78bfa' },
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSessionId(getSessionId());
    fetch('/api/agents/list')
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Failed to load (HTTP ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setAgents(data.agents ?? []);
        if (data.agents?.length > 0) {
          setActiveAgent(data.agents[0]);
          if (data.agents[0].welcome_message) {
            setMessages([{ role: 'assistant', content: data.agents[0].welcome_message }]);
          }
        }
      })
      .catch((e) => setLoadError(e.message || 'Unable to connect. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(agents.map((a) => a.category).filter(Boolean))) as string[]];
  const filtered = selectedCategory === 'All' ? agents : agents.filter((a) => a.category === selectedCategory);

  const selectAgent = useCallback((agent: PublicAgent) => {
    setActiveAgent(agent);
    setMessages(agent.welcome_message ? [{ role: 'assistant', content: agent.welcome_message }] : []);
    setChatError('');
    setInput('');
    setDrawerOpen(false);
    setTimeout(() => inputRef.current?.focus(), 100);
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
        body: JSON.stringify({ message, sessionId, history: newMessages.slice(-10) }),
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
      <div className="min-h-screen flex items-center justify-center surface-void">
        <Loader2 size={28} className="text-brand-accent animate-spin" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 surface-void">
        <div className="text-center max-w-md space-y-4">
          <AlertCircle size={32} className="text-rose-400 mx-auto mb-3" />
          <p className="text-white font-medium">Couldn&apos;t load the playground</p>
          <p className="text-brand-secondary text-sm mt-1">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="pill-cta inline-flex items-center gap-2 mt-4"
          >
            <RotateCcw size={14} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 surface-void">
        <div className="text-center max-w-md">
          <Bot size={40} className="text-brand-slate mx-auto mb-3" />
          <p className="text-white font-medium">No agents available yet</p>
          <p className="text-brand-secondary text-sm mt-1">Check back soon — we&apos;re adding live AI demos.</p>
        </div>
      </div>
    );
  }

  const activeColor = activeAgent ? getColor(activeAgent.color_theme) : getColor('primary');
  const ActiveIcon = activeAgent ? getIcon(activeAgent.icon) : Bot;

  return (
    <div className="min-h-screen surface-void flex flex-col">
      {/* Hero header */}
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[500px] h-[400px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Sparkles size={11} />
            Live AI Playground
          </div>
          <h1 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em]">
            Chat with Real{' '}
            <span className="gradient-text">AI Agents</span>
          </h1>
          <p className="text-sm sm:text-base text-brand-secondary max-w-xl mx-auto font-light">
            These aren&apos;t scripted demos — they&apos;re live AI agents powered by real models. Pick one and start a conversation.
          </p>
        </div>
      </section>

      {/* Playground body */}
      <section className="flex-1 pb-10">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile agent picker bar */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl surface-deep-sea border border-brand-edge"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: activeColor.bg, border: `1px solid ${activeColor.border}` }}
              >
                <ActiveIcon size={15} style={{ color: activeColor.dot }} />
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="text-sm text-white font-medium truncate">{activeAgent?.name}</p>
                <p className="text-xs text-brand-secondary">{filtered.length} agents available</p>
              </div>
              <Menu size={16} className="text-brand-secondary" />
            </button>
          </div>

          {/* Category filter — desktop */}
          {categories.length > 1 && (
            <div className="hidden lg:flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-normal transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'surface-cobalt text-white border border-brand-hairline'
                      : 'border border-brand-edge text-brand-secondary hover:text-white hover:border-brand-hairline'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-5">
            {/* Agent list — desktop sidebar */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-2">
              {filtered.map((agent) => {
                const DIcon = getIcon(agent.icon);
                const color = getColor(agent.color_theme);
                const isActive = activeAgent?.id === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => selectAgent(agent)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                      isActive
                        ? 'surface-cobalt border-brand-hairline'
                        : 'surface-abyss border-brand-inkline hover:border-brand-edge'
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: color.bg, border: `1px solid ${color.border}` }}
                    >
                      <DIcon size={16} style={{ color: color.dot }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-tight font-medium text-sm text-white truncate">{agent.name}</div>
                      <p className="text-xs text-brand-secondary mt-0.5 line-clamp-2 font-light">{agent.description}</p>
                      <span className="text-xs font-medium mt-1 inline-block" style={{ color: color.text }}>{agent.category}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="shrink-0 mt-1" style={{ color: color.dot }} />}
                  </button>
                );
              })}
            </div>

            {/* Chat panel */}
            <div className="lg:col-span-8 xl:col-span-9 grid xl:grid-cols-3 gap-5">
              <div
                className="xl:col-span-2 surface-abyss rounded-2xl border border-brand-inkline overflow-hidden flex flex-col shadow-card"
                style={{ minHeight: '70vh' }}
              >
                {/* Chat header */}
                <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-brand-inkline">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: activeColor.bg, border: `1px solid ${activeColor.border}` }}
                  >
                    <ActiveIcon size={20} style={{ color: activeColor.dot }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-tight font-medium text-white truncate">{activeAgent?.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
                      <span className="text-xs text-brand-secondary">
                        {sending ? 'Thinking...' : 'Live · ready to chat'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => activeAgent && selectAgent(activeAgent)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-brand-secondary hover:text-white border border-brand-edge hover:border-brand-hairline transition-all"
                  >
                    <RotateCcw size={12} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 sm:p-5 space-y-3 overflow-y-auto">
                  {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-12">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: activeColor.bg, border: `1px solid ${activeColor.border}` }}
                      >
                        <ActiveIcon size={26} style={{ color: activeColor.dot }} />
                      </div>
                      <div>
                        <p className="font-tight font-medium text-white mb-1">{activeAgent?.name}</p>
                        <p className="text-sm text-brand-secondary max-w-xs font-light">{activeAgent?.description}</p>
                      </div>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                      {msg.role === 'assistant' && (
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 mr-2"
                          style={{ backgroundColor: activeColor.bg }}
                        >
                          <Zap size={12} style={{ color: activeColor.dot }} />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'chat-user text-white'
                            : 'chat-ai text-brand-tertiary'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {sending && (
                    <div className="flex justify-start">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1 mr-2"
                        style={{ backgroundColor: activeColor.bg }}
                      >
                        <Zap size={12} style={{ color: activeColor.dot }} />
                      </div>
                      <div className="chat-ai px-4 py-3">
                        <div className="flex gap-1.5 items-center">
                          <span className="typing-dot" />
                          <span className="typing-dot animation-delay-200" />
                          <span className="typing-dot animation-delay-400" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested prompts */}
                {messages.length <= 1 && (activeAgent?.suggested_prompts ?? []).length > 0 && !sending && (
                  <div className="px-4 sm:px-5 pb-3 flex flex-wrap gap-2">
                    {activeAgent!.suggested_prompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-transform hover:scale-105"
                        style={{ backgroundColor: activeColor.bg, border: `1px solid ${activeColor.border}`, color: activeColor.text }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Error */}
                {chatError && (
                  <div className="px-4 sm:px-5 pb-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                      <AlertCircle size={13} className="shrink-0" />
                      <span className="flex-1">{chatError}</span>
                      <button onClick={() => setChatError('')} className="text-rose-400/60 hover:text-rose-400">
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="px-4 sm:px-5 pb-4 pt-1">
                  <div className="flex items-center gap-2 rounded-xl surface-deep-sea border border-brand-edge px-4 py-3 focus-within:border-brand-primary transition-colors">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !sending) sendMessage(input); }}
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-brand-slate outline-none"
                      disabled={sending}
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={sending || !input.trim()}
                      className="text-brand-primary disabled:opacity-40 hover:scale-110 transition-transform"
                      aria-label="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-brand-slate mt-2 text-center font-light">
                    Live AI · conversations are logged for quality. No sensitive data please.
                  </p>
                </div>
              </div>

              {/* Side panel — desktop: backend action feed */}
              <div className="hidden xl:block xl:col-span-1 space-y-4">
                <BackendActionPanel
                  agentSlug={activeAgent?.slug ?? ''}
                  messageCount={messages.filter((m) => m.role === 'user').length}
                  color={activeColor}
                />

                <div className="surface-abyss rounded-2xl p-5 border border-brand-inkline space-y-3">
                  <p className="font-tight font-medium text-white text-sm flex items-center gap-2">
                    <MessageSquare size={14} style={{ color: activeColor.dot }} />
                    About this agent
                  </p>
                  <p className="text-sm text-brand-secondary leading-relaxed font-light">{activeAgent?.description}</p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: activeColor.text }}>{activeAgent?.category}</span>
                  </div>
                </div>

                <div className="card-highlight rounded-2xl p-5 space-y-3">
                  <p className="font-tight font-medium text-white text-sm">Build this for your business</p>
                  <p className="text-xs text-brand-tertiary font-light leading-relaxed">
                    We can deploy a production version of this AI agent tailored to your workflows within 2-4 weeks.
                  </p>
                  <Link href="/contact" className="pill-cta flex items-center justify-center gap-2 w-full text-sm">
                    Get Started
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Mobile "build this" CTA */}
              <div className="xl:hidden card-highlight rounded-2xl p-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-tight font-medium text-white text-sm">Build this for your business</p>
                  <p className="text-xs text-brand-tertiary font-light">Deploy in 2-4 weeks.</p>
                </div>
                <Link href="/contact" className="pill-cta flex items-center gap-2 text-xs whitespace-nowrap">
                  Get Started
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile agent drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-brand-bg/90 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
        <div
          className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-sm glass-strong flex flex-col transition-transform duration-300 ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-brand-edge">
            <p className="font-tight font-medium text-white">Select an agent</p>
            <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white">
              <X size={20} />
            </button>
          </div>

          {categories.length > 1 && (
            <div className="px-5 py-4 flex flex-wrap gap-2 border-b border-brand-edge">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-normal transition-all ${
                    selectedCategory === cat
                      ? 'surface-cobalt text-white border border-brand-hairline'
                      : 'border border-brand-edge text-brand-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filtered.map((agent) => {
              const DIcon = getIcon(agent.icon);
              const color = getColor(agent.color_theme);
              const isActive = activeAgent?.id === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => selectAgent(agent)}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'surface-cobalt border-brand-hairline'
                      : 'surface-abyss border-brand-inkline'
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: color.bg, border: `1px solid ${color.border}` }}
                  >
                    <DIcon size={16} style={{ color: color.dot }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-tight font-medium text-sm text-white truncate">{agent.name}</div>
                    <p className="text-xs text-brand-secondary mt-0.5 line-clamp-2 font-light">{agent.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
