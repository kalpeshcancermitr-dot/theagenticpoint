'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, Bot, Trash2, Plus, X, Loader2, Zap, Save, RotateCcw } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const PROVIDERS = [
  {
    id: 'gemini',
    label: 'Google Gemini',
    models: [
      'gemini-3-flash-preview',
      'gemini-3.5-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
      'gemini-2.5-pro',
      'gemini-2.5-flash',
    ],
  },
  { id: 'openai', label: 'OpenAI', models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4.1-mini', 'gpt-4.1'] },
  { id: 'anthropic', label: 'Anthropic', models: ['claude-3-5-haiku-20241022', 'claude-3-5-sonnet-20241022'] },
];

const ICON_OPTIONS = ['Bot', 'Users', 'MessageSquare', 'Calendar', 'FileText', 'Mail', 'BarChart3', 'Mic', 'Zap', 'Workflow', 'Sparkles', 'Brain'];
const COLOR_OPTIONS = ['primary', 'accent', 'green', 'yellow', 'orange', 'teal', 'rose', 'purple'];

type Agent = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  icon: string;
  color_theme: string;
  provider: string;
  model: string;
  system_prompt: string;
  welcome_message: string | null;
  suggested_prompts: string[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  daily_request_cap: number;
  session_message_cap: number;
  created_at: string;
};

const emptyForm = {
  slug: '', name: '', description: '', category: '', icon: 'Bot', color_theme: 'primary',
  provider: 'gemini', model: 'gemini-3-flash-preview', system_prompt: 'You are a helpful assistant.',
  welcome_message: '', suggested_prompts: [] as string[],
  temperature: 0.7, max_tokens: 500, top_p: 1.0,
  is_active: true, is_featured: false, sort_order: 0,
  daily_request_cap: 200, session_message_cap: 15,
};

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Agent | 'new' | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [testMessages, setTestMessages] = useState<Message[]>([]);
  const [testInput, setTestInput] = useState('');
  const [testLoading, setTestLoading] = useState(false);

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) {
      setSaveError(error.message);
    } else {
      setAgents((data ?? []) as Agent[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAgents(); }, [fetchAgents]);

  const openEdit = (agent: Agent | 'new') => {
    setEditing(agent);
    setSaveError('');
    setTestMessages([]);
    if (agent === 'new') {
      setForm({ ...emptyForm });
    } else {
      setForm({
        slug: agent.slug, name: agent.name, description: agent.description ?? '', category: agent.category ?? '',
        icon: agent.icon, color_theme: agent.color_theme, provider: agent.provider, model: agent.model,
        system_prompt: agent.system_prompt, welcome_message: agent.welcome_message ?? '',
        suggested_prompts: agent.suggested_prompts ?? [],
        temperature: agent.temperature, max_tokens: agent.max_tokens, top_p: agent.top_p,
        is_active: agent.is_active, is_featured: agent.is_featured, sort_order: agent.sort_order,
        daily_request_cap: agent.daily_request_cap, session_message_cap: agent.session_message_cap,
      });
      if (agent.welcome_message) {
        setTestMessages([{ role: 'assistant', content: agent.welcome_message }]);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    const payload = {
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      suggested_prompts: form.suggested_prompts.filter((p) => p.trim()),
    };
    if (editing === 'new') {
      const { error } = await supabase.from('agents').insert(payload);
      if (error) { setSaveError(error.message); setSaving(false); return; }
    } else if (editing) {
      const { error } = await supabase.from('agents').update(payload).eq('id', editing.id);
      if (error) { setSaveError(error.message); setSaving(false); return; }
    }
    setSaving(false);
    setEditing(null);
    fetchAgents();
  };

  const toggleActive = async (agent: Agent) => {
    const { error } = await supabase.from('agents').update({ is_active: !agent.is_active }).eq('id', agent.id);
    if (error) { setSaveError(error.message); return; }
    fetchAgents();
  };

  const deleteAgent = async (agent: Agent) => {
    if (!confirm(`Delete "${agent.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('agents').delete().eq('id', agent.id);
    if (error) { setSaveError(error.message); return; }
    fetchAgents();
  };

  const sendTestMessage = async () => {
    if (!testInput.trim() || editing === 'new' || !editing) return;
    const agent = editing;
    const userMsg: Message = { role: 'user', content: testInput };
    const history = [...testMessages, userMsg];
    setTestMessages(history);
    setTestInput('');
    setTestLoading(true);
    try {
      const res = await fetch(`/api/agents/${agent.slug}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          sessionId: `admin-test-${agent.id}`,
          history: history.slice(-10),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTestMessages((prev) => [...prev, { role: 'assistant', content: `⚠️ ${data.error || 'Request failed'}` }]);
      } else {
        setTestMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setTestMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ Network error. Is an API key configured?' }]);
    }
    setTestLoading(false);
  };

  const colorClass = (theme: string) => {
    const map: Record<string, string> = {
      primary: 'text-primary', accent: 'text-accent', green: 'text-brand-success',
      yellow: 'text-yellow-400', orange: 'text-orange-400', teal: 'text-teal-400',
      rose: 'text-rose-400', purple: 'text-purple-400',
    };
    return map[theme] ?? 'text-primary';
  };

  if (editing) {
    const models = PROVIDERS.find((p) => p.id === form.provider)?.models ?? [];
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-tight font-bold text-2xl text-white">
              {editing === 'new' ? 'New Agent' : 'Edit Agent'}
            </h1>
            <p className="text-sm text-brand-secondary mt-0.5">Configure your AI agent</p>
          </div>
          <button onClick={() => setEditing(null)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-brand-secondary hover:text-white hover:border-white/20 text-sm transition-all">
            <X size={14} /> Close
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-white/8 bg-brand-card/30 p-5 space-y-4">
              <h2 className="font-tight font-semibold text-white text-sm">Basics</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-base" placeholder="Sales Qualification Agent" />
                </Field>
                <Field label="Slug (URL)">
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-base" placeholder="lead-qualification" />
                </Field>
                <Field label="Category">
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-base" placeholder="Sales" />
                </Field>
                <Field label="Sort order">
                  <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="input-base" />
                </Field>
              </div>
              <Field label="Description">
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="input-base resize-none" placeholder="Short description shown on the agent card" />
              </Field>
              <Field label="Welcome message">
                <textarea value={form.welcome_message} onChange={(e) => setForm({ ...form, welcome_message: e.target.value })} rows={2} className="input-base resize-none" placeholder="First message the visitor sees" />
              </Field>
            </div>

            <div className="rounded-2xl border border-white/8 bg-brand-card/30 p-5 space-y-4">
              <h2 className="font-tight font-semibold text-white text-sm">Appearance</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Icon (lucide-react)">
                  <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-base">
                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </Field>
                <Field label="Color theme">
                  <select value={form.color_theme} onChange={(e) => setForm({ ...form, color_theme: e.target.value })} className="input-base">
                    {COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Suggested prompts (one per line)">
                <textarea
                  value={form.suggested_prompts.join('\n')}
                  onChange={(e) => setForm({ ...form, suggested_prompts: e.target.value.split('\n') })}
                  rows={3}
                  className="input-base resize-none"
                  placeholder={"We're a SaaS company\nHow does pricing work?"}
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-white/8 bg-brand-card/30 p-5 space-y-4">
              <h2 className="font-tight font-semibold text-white text-sm">AI Provider</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Provider">
                  <select value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value, model: PROVIDERS.find((p) => p.id === e.target.value)?.models[0] ?? form.model })} className="input-base">
                    {PROVIDERS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </Field>
                <Field label="Model">
                  <select value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="input-base">
                    {models.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="System prompt (never shown to visitors)">
                <textarea value={form.system_prompt} onChange={(e) => setForm({ ...form, system_prompt: e.target.value })} rows={6} className="input-base resize-none font-mono text-xs" placeholder="You are a helpful assistant that..." />
                <p className="text-xs text-brand-secondary/60 mt-1">A safety suffix is appended automatically — it can&apos;t be overridden.</p>
              </Field>
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Temperature">
                  <input type="number" step="0.1" min="0" max="2" value={form.temperature} onChange={(e) => setForm({ ...form, temperature: Number(e.target.value) })} className="input-base" />
                </Field>
                <Field label="Max tokens">
                  <input type="number" value={form.max_tokens} onChange={(e) => setForm({ ...form, max_tokens: Number(e.target.value) })} className="input-base" />
                </Field>
                <Field label="Top P">
                  <input type="number" step="0.1" min="0" max="1" value={form.top_p} onChange={(e) => setForm({ ...form, top_p: Number(e.target.value) })} className="input-base" />
                </Field>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-brand-card/30 p-5 space-y-4">
              <h2 className="font-tight font-semibold text-white text-sm">Guardrails</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Daily request cap">
                  <input type="number" value={form.daily_request_cap} onChange={(e) => setForm({ ...form, daily_request_cap: Number(e.target.value) })} className="input-base" />
                </Field>
                <Field label="Session message cap">
                  <input type="number" value={form.session_message_cap} onChange={(e) => setForm({ ...form, session_message_cap: Number(e.target.value) })} className="input-base" />
                </Field>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-primary" />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-primary" />
                  Featured
                </label>
              </div>
            </div>

            {saveError && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {saveError}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button onClick={handleSave} disabled={saving || !form.name} className="flex items-center gap-2 px-5 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold transition-all disabled:opacity-50">
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {editing === 'new' ? 'Create Agent' : 'Save Changes'}
              </button>
              <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-xl border border-white/10 text-brand-secondary hover:text-white hover:border-white/20 text-sm transition-all">
                Cancel
              </button>
            </div>
          </div>

          {/* Live test panel */}
          {editing !== 'new' && editing && (
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-white/8 bg-brand-card/30 flex flex-col sticky top-6" style={{ maxHeight: 'calc(100vh - 120px)' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                  <Zap size={14} className="text-primary" />
                  <span className="font-tight font-semibold text-white text-sm">Live Test</span>
                  <button onClick={() => setTestMessages(form.welcome_message ? [{ role: 'assistant', content: form.welcome_message }] : [])} className="ml-auto p-1 rounded-lg text-brand-secondary hover:text-white">
                    <RotateCcw size={13} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {testMessages.length === 0 && (
                    <div className="text-center py-8 text-brand-secondary text-sm">
                      <Bot size={28} className="mx-auto mb-2 opacity-40" />
                      Send a message to test this agent live.
                    </div>
                  )}
                  {testMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-3 py-2 text-sm rounded-2xl whitespace-pre-line ${msg.role === 'user' ? 'chat-user text-white' : 'chat-ai text-brand-secondary'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {testLoading && (
                    <div className="flex justify-start">
                      <div className="chat-ai px-3 py-2">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-white/8">
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                    <input
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !testLoading) sendTestMessage(); }}
                      placeholder="Test message..."
                      className="flex-1 bg-transparent text-sm text-white placeholder-brand-secondary/40 outline-none"
                      disabled={testLoading}
                    />
                    <button onClick={sendTestMessage} disabled={testLoading || !testInput.trim()} className="text-primary disabled:opacity-40">
                      <Send size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-brand-secondary/50 mt-2 text-center">Uses saved config — save changes first to test updates.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-bold text-2xl text-white">AI Agents</h1>
          <p className="text-sm text-brand-secondary mt-0.5">Manage the agents shown in your public playground</p>
        </div>
        <button onClick={() => openEdit('new')} className="flex items-center gap-2 px-4 py-2 rounded-xl accent-cta text-white text-sm font-semibold transition-all">
          <Plus size={15} /> New Agent
        </button>
      </div>

      {saveError && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between">
          {saveError}
          <button onClick={() => setSaveError('')} className="text-red-400/60 hover:text-red-400">Dismiss</button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="text-primary animate-spin" />
        </div>
      ) : agents.length === 0 ? (
        <div className="text-center py-16">
          <Bot size={40} className="text-brand-secondary/30 mx-auto mb-3" />
          <p className="text-brand-secondary">No agents yet</p>
          <p className="text-brand-secondary/60 text-sm mt-1">Create your first AI agent to populate the playground.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="rounded-2xl border border-white/8 bg-brand-card/30 p-5 card-hover">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 ${colorClass(agent.color_theme)}`}>
                  <Bot size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-tight font-semibold text-white text-sm truncate">{agent.name}</h3>
                  <p className="text-xs text-brand-secondary">{agent.category ?? 'Uncategorized'}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${agent.is_active ? 'bg-brand-success/10 text-brand-success border-brand-success/20' : 'bg-white/5 text-brand-secondary border-white/10'}`}>
                  {agent.is_active ? 'Active' : 'Off'}
                </span>
              </div>
              <p className="text-xs text-brand-secondary line-clamp-2 mb-3">{agent.description ?? 'No description'}</p>
              <div className="flex items-center gap-2 text-xs text-brand-secondary/60 mb-3">
                <span className="font-mono">{agent.provider}</span>
                <span>·</span>
                <span className="font-mono">{agent.model}</span>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <button onClick={() => openEdit(agent)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 text-white text-xs font-medium hover:bg-white/10 transition-colors">
                  Edit
                </button>
                <button onClick={() => toggleActive(agent)} className="px-3 py-2 rounded-lg bg-white/5 text-brand-secondary text-xs font-medium hover:text-white hover:bg-white/10 transition-colors">
                  {agent.is_active ? 'Disable' : 'Enable'}
                </button>
                <button onClick={() => deleteAgent(agent)} className="p-2 rounded-lg bg-white/5 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-brand-secondary mb-1.5">{label}</span>
      {children}
    </label>
  );
}
