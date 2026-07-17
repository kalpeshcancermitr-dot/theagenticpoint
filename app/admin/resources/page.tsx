'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, RefreshCw, Package, Edit2, Trash2, X, Loader2, Eye, EyeOff, Download } from 'lucide-react';

type Resource = {
  id: string;
  title: string;
  description: string | null;
  type: 'template' | 'guide' | 'tool' | 'checklist' | 'other';
  file_url: string | null;
  tags: string[];
  download_count: number;
  is_published: boolean;
  created_at: string;
};

const TYPES = ['template', 'guide', 'tool', 'checklist', 'other'];

const typeColors: Record<string, string> = {
  template: 'text-primary bg-primary/10 border-primary/20',
  guide: 'text-accent bg-accent/10 border-accent/20',
  tool: 'text-brand-success bg-brand-success/10 border-brand-success/20',
  checklist: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  other: 'text-brand-secondary bg-white/5 border-white/10',
};

function ResourceForm({
  initial,
  onSave,
  onClose,
  saving,
}: {
  initial: Partial<Resource>;
  onSave: (data: Partial<Resource>) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Partial<Resource>>({
    title: '',
    description: '',
    type: 'template',
    file_url: '',
    tags: [],
    is_published: false,
    ...initial,
  });
  const [tagInput, setTagInput] = useState((initial.tags ?? []).join(', '));

  const set = <K extends keyof Resource>(k: K, v: Resource[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    const tags = tagInput.split(',').map((t) => t.trim()).filter(Boolean);
    onSave({ ...form, tags });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg glass-strong rounded-2xl border border-white/15 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h2 className="font-tight font-bold text-white">{initial.id ? 'Edit Resource' : 'Add Resource'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Title *</label>
            <input
              value={form.title ?? ''}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Resource title..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Type</label>
              <select
                value={form.type ?? 'template'}
                onChange={(e) => set('type', e.target.value as Resource['type'])}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 capitalize"
              >
                {TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Visibility</label>
              <select
                value={form.is_published ? 'published' : 'draft'}
                onChange={(e) => set('is_published', e.target.value === 'published')}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Description</label>
            <textarea
              value={form.description ?? ''}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Short description of this resource..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">File / Download URL</label>
            <input
              value={form.file_url ?? ''}
              onChange={(e) => set('file_url', e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Tags (comma-separated)</label>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="n8n, OpenAI, WhatsApp"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div className="px-6 pb-6 flex justify-end gap-3 border-t border-white/8 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-brand-secondary text-sm font-medium hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold hover:scale-105 transition-all disabled:opacity-50"
          >
            {saving && <Loader2 size={13} className="animate-spin" />}
            {initial.id ? 'Save Changes' : 'Add Resource'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<Partial<Resource> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchResources = async () => {
    setLoading(true);
    const { data } = await supabase.from('resources').select('*').order('created_at', { ascending: false });
    setResources((data ?? []) as Resource[]);
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, []);

  const handleSave = async (form: Partial<Resource>) => {
    setSaving(true);
    if (form.id) {
      const { error } = await supabase.from('resources').update(form).eq('id', form.id);
      if (!error) {
        setResources((prev) => prev.map((r) => r.id === form.id ? { ...r, ...form } as Resource : r));
        setEditTarget(null);
      }
    } else {
      const { data, error } = await supabase.from('resources').insert(form).select().single();
      if (!error && data) {
        setResources((prev) => [data as Resource, ...prev]);
        setEditTarget(null);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('resources').delete().eq('id', id);
    if (!error) {
      setResources((prev) => prev.filter((r) => r.id !== id));
      setDeleteId(null);
    }
  };

  const filtered = resources.filter((r) =>
    !search || [r.title, r.description ?? '', r.type].some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-bold text-2xl text-white">Resources</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{resources.length} resources</p>
        </div>
        <button
          onClick={() => setEditTarget({})}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all hover:scale-105"
        >
          <Plus size={15} /> Add Resource
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
        />
      </div>

      <div className="rounded-2xl border border-white/8 bg-brand-card/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm">
            <RefreshCw size={15} className="animate-spin" /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package size={36} className="text-brand-secondary/20 mx-auto mb-3" />
            <p className="text-brand-secondary font-medium">No resources yet</p>
            <button onClick={() => setEditTarget({})} className="mt-3 text-sm text-primary hover:text-primary/80">
              Add your first resource
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {['Title', 'Type', 'Tags', 'Status', 'Downloads', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((resource, i) => (
                <tr key={resource.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-white">{resource.title}</p>
                    {resource.description && <p className="text-xs text-brand-secondary mt-0.5 line-clamp-1">{resource.description}</p>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${typeColors[resource.type]}`}>
                      {resource.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {(resource.tags ?? []).slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-xs text-brand-secondary font-mono">{tag}</span>
                      ))}
                      {(resource.tags ?? []).length > 2 && (
                        <span className="text-xs text-brand-secondary">+{resource.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${resource.is_published ? 'bg-brand-success/10 text-brand-success border-brand-success/20' : 'bg-white/5 text-brand-secondary border-white/10'}`}>
                      {resource.is_published ? <Eye size={10} /> : <EyeOff size={10} />}
                      {resource.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-brand-secondary text-xs">
                      <Download size={12} />
                      {resource.download_count ?? 0}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditTarget(resource)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setDeleteId(resource.id)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editTarget !== null && (
        <ResourceForm initial={editTarget} onSave={handleSave} onClose={() => setEditTarget(null)} saving={saving} />
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-2xl border border-white/15 p-7 max-w-sm w-full shadow-card">
            <h3 className="font-tight font-bold text-white mb-2">Delete Resource?</h3>
            <p className="text-sm text-brand-secondary mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/30">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-brand-secondary text-sm font-semibold hover:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
