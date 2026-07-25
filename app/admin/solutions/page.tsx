'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAdminPerms, can } from '@/lib/admin-auth';
import {
  Plus, Search, RefreshCw, Lightbulb, Edit2, Trash2, X, Loader2,
  Eye, EyeOff, ExternalLink,
} from 'lucide-react';

type JsonItem = { title?: string; detail?: string; metric?: string; label?: string };
type Solution = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  accent_color: string;
  roi: string | null;
  challenges: JsonItem[];
  offerings: JsonItem[];
  results: JsonItem[];
  tech_stack: string[];
  case_study_headline: string | null;
  case_study_detail: string | null;
  is_published: boolean;
  sort_order: number;
};

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const emptySolution: Partial<Solution> = {
  title: '', slug: '', tagline: '', description: '', accent_color: '#2862d7', roi: '',
  challenges: [], offerings: [], results: [], tech_stack: [],
  case_study_headline: '', case_study_detail: '', is_published: true, sort_order: 0,
};

export default function SolutionsAdminPage() {
  const { allowed } = useAdminPerms();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<Partial<Solution> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState('');

  const canManage = can(allowed, 'solutions', 'edit') || can(allowed, 'solutions', 'create');

  useEffect(() => {
    if (!can(allowed, 'solutions', 'view')) return;
    fetchSolutions();
  }, [allowed]);

  const fetchSolutions = async () => {
    setLoading(true);
    const { data } = await supabase.from('solutions').select('*').order('sort_order');
    setSolutions((data ?? []) as Solution[]);
    setLoading(false);
  };

  const handleSave = async (form: Partial<Solution>) => {
    setSaving(true);
    const payload = { ...form, updated_at: new Date().toISOString() };
    if (form.id) {
      const { id, ...updateData } = payload;
      const { error } = await supabase.from('solutions').update(updateData).eq('id', id);
      if (error) setSaveError(error.message);
      else { setSolutions((prev) => prev.map((s) => s.id === id ? { ...s, ...form } as Solution : s)); setEditTarget(null); }
    } else {
      const { id: _, ...insertData } = payload;
      const { data, error } = await supabase.from('solutions').insert(insertData).select().single();
      if (error) setSaveError(error.message);
      else if (data) { setSolutions((prev) => [...prev, data as Solution]); setEditTarget(null); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('solutions').delete().eq('id', id);
    if (!error) { setSolutions((prev) => prev.filter((s) => s.id !== id)); setDeleteId(null); }
  };

  const togglePublished = async (s: Solution) => {
    const { error } = await supabase.from('solutions').update({ is_published: !s.is_published }).eq('id', s.id);
    if (!error) setSolutions((prev) => prev.map((x) => x.id === s.id ? { ...x, is_published: !s.is_published } : x));
  };

  const filtered = solutions.filter((s) =>
    !search || [s.title, s.tagline].some((v) => (v ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  if (!can(allowed, 'solutions', 'view')) {
    return <div className="p-8 flex items-center justify-center min-h-[60vh]"><div className="text-center"><Lightbulb size={40} className="text-brand-secondary/30 mx-auto mb-3" /><p className="text-white font-medium">No access</p></div></div>;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-semibold text-2xl text-white">Solutions</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{solutions.length} solutions · {solutions.filter((s) => s.is_published).length} published</p>
        </div>
        {can(allowed, 'solutions', 'create') && (
          <button onClick={() => setEditTarget({ ...emptySolution })} className="flex items-center gap-2 px-4 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold transition-all hover:scale-105">
            <Plus size={15} /> New Solution
          </button>
        )}
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search solutions..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" />
      </div>

      <div className="rounded-2xl border border-brand-edge surface-deep-sea/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm"><RefreshCw size={15} className="animate-spin" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16"><Lightbulb size={36} className="text-brand-secondary/20 mx-auto mb-3" /><p className="text-brand-secondary font-medium">No solutions yet</p></div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-brand-edge">{['Solution', 'Slug', 'Status', ''].map((h) => (<th key={h} className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">{h}</th>))}</tr></thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-b-0">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border" style={{ backgroundColor: `${s.accent_color}1a`, borderColor: `${s.accent_color}40` }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.accent_color }} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{s.title}</p>
                        {s.tagline && <p className="text-xs text-brand-secondary mt-0.5 line-clamp-1">{s.tagline}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="font-mono text-xs text-brand-secondary">{s.slug}</span></td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => togglePublished(s)} className={`p-1.5 rounded-lg transition-all ${s.is_published ? 'text-brand-success hover:bg-brand-success/10' : 'text-brand-secondary hover:text-white hover:bg-white/8'}`} title={s.is_published ? 'Published' : 'Draft'}>
                      {s.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <a href={`/solutions/${s.slug}`} target="_blank" className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all"><ExternalLink size={13} /></a>
                      {canManage && <button onClick={() => setEditTarget(s)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all"><Edit2 size={13} /></button>}
                      {can(allowed, 'solutions', 'delete') && <button onClick={() => setDeleteId(s.id)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all"><Trash2 size={13} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {saveError && <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm shadow-card max-w-sm">{saveError}<button onClick={() => setSaveError('')} className="ml-3 text-red-400/60 hover:text-red-400">Dismiss</button></div>}
      {editTarget !== null && <SolutionForm initial={editTarget} onSave={handleSave} onClose={() => setEditTarget(null)} saving={saving} />}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-2xl border border-brand-hairline p-7 max-w-sm w-full shadow-card">
            <h3 className="font-tight font-semibold text-white mb-2">Delete Solution?</h3>
            <p className="text-sm text-brand-secondary mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-brand-edge text-brand-secondary text-sm font-semibold hover:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function JsonListEditor({ items, onChange, type }: { items: JsonItem[]; onChange: (items: JsonItem[]) => void; type: 'challenges' | 'offerings' | 'results' }) {
  const label = type === 'challenges' ? 'Challenge' : type === 'offerings' ? 'Solution Offering' : 'Result';
  const isResults = type === 'results';

  const update = (i: number, key: keyof JsonItem, val: string) => {
    onChange(items.map((item, idx) => idx === i ? { ...item, [key]: val } : item));
  };
  const add = () => onChange([...items, isResults ? { metric: '', label: '' } : { title: '', detail: '' }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1 space-y-1.5">
            <div className="flex gap-2">
              <input value={item.title ?? item.metric ?? ''} onChange={(e) => update(i, isResults ? 'metric' : 'title', e.target.value)} placeholder={isResults ? 'Metric (e.g. 40%)' : `${label} title`} className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" />
              <input value={item.label ?? item.detail ?? ''} onChange={(e) => update(i, isResults ? 'label' : 'detail', e.target.value)} placeholder={isResults ? 'Label' : 'Detail'} className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" />
            </div>
          </div>
          <button onClick={() => remove(i)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 mt-1"><Trash2 size={13} /></button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-medium hover:bg-brand-primary/20"><Plus size={12} /> Add {label}</button>
    </div>
  );
}

function SolutionForm({ initial, onSave, onClose, saving }: {
  initial: Partial<Solution>; onSave: (d: Partial<Solution>) => void; onClose: () => void; saving: boolean;
}) {
  const [form, setForm] = useState<Partial<Solution>>({
    ...emptySolution,
    ...initial,
    challenges: initial.challenges ?? [],
    offerings: initial.offerings ?? [],
    results: initial.results ?? [],
    tech_stack: initial.tech_stack ?? [],
  });
  const [techInput, setTechInput] = useState((initial.tech_stack ?? []).join(', '));

  const set = <K extends keyof Solution>(k: K, v: Solution[K]) => setForm((f) => ({ ...f, [k]: v, ...(k === 'title' && !initial.slug ? { slug: toSlug(v as string) } : {}) }));

  const handleSave = () => {
    onSave({ ...form, tech_stack: techInput.split(',').map((t) => t.trim()).filter(Boolean) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl surface-abyss border-l border-brand-edge flex flex-col shadow-card overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge sticky top-0 surface-abyss z-10">
          <h2 className="font-tight font-semibold text-white">{initial.id ? 'Edit Solution' : 'New Solution'}</h2>
          <div className="flex items-center gap-2">
            <button onClick={handleSave} disabled={saving || !form.title} className="flex items-center gap-2 px-5 py-2 rounded-xl accent-cta text-white text-sm font-semibold hover:scale-105 transition-all disabled:opacity-50">
              {saving && <Loader2 size={13} className="animate-spin" />}{initial.id ? 'Save' : 'Create'}
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white"><X size={18} /></button>
          </div>
        </div>
        <div className="p-6 space-y-5 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Title *</label>
              <input value={form.title ?? ''} onChange={(e) => set('title', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Slug</label>
              <input value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm font-mono focus:outline-none focus:border-brand-primary" /></div>
          </div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Tagline</label>
            <input value={form.tagline ?? ''} onChange={(e) => set('tagline', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Description</label>
            <textarea value={form.description ?? ''} onChange={(e) => set('description', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary resize-none" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Accent Color</label>
              <input type="color" value={form.accent_color ?? '#2862d7'} onChange={(e) => set('accent_color', e.target.value)} className="w-full h-10 rounded-xl bg-white/5 border border-brand-edge cursor-pointer" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Sort Order</label>
              <input type="number" value={form.sort_order ?? 0} onChange={(e) => set('sort_order', parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Status</label>
              <select value={form.is_published ? 'yes' : 'no'} onChange={(e) => set('is_published', e.target.value === 'yes')} className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm"><option value="yes">Published</option><option value="no">Draft</option></select></div>
          </div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">ROI Summary</label>
            <input value={form.roi ?? ''} onChange={(e) => set('roi', e.target.value)} placeholder="40% fewer no-shows, 15hrs/week saved" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>

          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Challenges</label>
            <JsonListEditor items={form.challenges ?? []} onChange={(items) => set('challenges', items)} type="challenges" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Solution Offerings</label>
            <JsonListEditor items={form.offerings ?? []} onChange={(items) => set('offerings', items)} type="offerings" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Results / Metrics</label>
            <JsonListEditor items={form.results ?? []} onChange={(items) => set('results', items)} type="results" /></div>

          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Tech Stack (comma-separated)</label>
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>

          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Case Study Headline</label>
            <input value={form.case_study_headline ?? ''} onChange={(e) => set('case_study_headline', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Case Study Detail</label>
            <textarea value={form.case_study_detail ?? ''} onChange={(e) => set('case_study_detail', e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary resize-none" /></div>
        </div>
      </div>
    </div>
  );
}
