'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, RefreshCw, Briefcase, Edit2, Trash2, X, Loader2, Star, StarOff } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  tech_stack: string[];
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

const CATEGORIES = ['WhatsApp AI', 'Healthcare AI', 'Business Automation', 'AI Assistants', 'Document AI', 'Internal AI Tools', 'CRM Automation', 'HR Automation', 'Voice AI'];

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function ProjectForm({
  initial,
  onSave,
  onClose,
  saving,
}: {
  initial: Partial<Project>;
  onSave: (data: Partial<Project>) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Partial<Project>>({
    title: '', slug: '', category: '', challenge: '', solution: '', outcome: '',
    tech_stack: [], is_featured: false, sort_order: 0, ...initial,
  });
  const [techInput, setTechInput] = useState((initial.tech_stack ?? []).join(', '));

  const set = <K extends keyof Project>(k: K, v: Project[K]) => setForm((f) => ({
    ...f, [k]: v,
    ...(k === 'title' && !initial.slug ? { slug: toSlug(v as string) } : {}),
  }));

  const handleSave = () => {
    const tech_stack = techInput.split(',').map((t) => t.trim()).filter(Boolean);
    onSave({ ...form, tech_stack });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl bg-brand-surface border-l border-white/10 flex flex-col shadow-card overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-brand-surface z-10">
          <h2 className="font-tight font-bold text-white">{initial.id ? 'Edit Project' : 'New Project'}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.title}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary-gradient text-white text-sm font-semibold hover:scale-105 transition-all disabled:opacity-50"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              {initial.id ? 'Save Changes' : 'Create Project'}
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5 flex-1">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Title *</label>
            <input
              value={form.title ?? ''}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Project title..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Slug</label>
              <input
                value={form.slug ?? ''}
                onChange={(e) => set('slug', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Category</label>
              <select
                value={form.category ?? ''}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="">Select...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Sort Order</label>
              <input
                type="number"
                value={form.sort_order ?? 0}
                onChange={(e) => set('sort_order', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Featured</label>
              <select
                value={form.is_featured ? 'yes' : 'no'}
                onChange={(e) => set('is_featured', e.target.value === 'yes')}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="no">Not Featured</option>
                <option value="yes">Featured on Homepage</option>
              </select>
            </div>
          </div>

          {[
            { key: 'challenge' as keyof Project, label: 'Business Challenge' },
            { key: 'solution' as keyof Project, label: 'Solution Built' },
            { key: 'outcome' as keyof Project, label: 'Business Outcome' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">{label}</label>
              <textarea
                value={(form[key] as string) ?? ''}
                onChange={(e) => set(key, e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 resize-none"
              />
            </div>
          ))}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Tech Stack (comma-separated)</label>
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="OpenAI GPT-4, n8n, Supabase, WhatsApp API"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase.from('portfolio_projects').select('*').order('sort_order');
    setProjects((data ?? []) as Project[]);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSave = async (form: Partial<Project>) => {
    setSaving(true);
    if (form.id) {
      const { error } = await supabase.from('portfolio_projects').update(form).eq('id', form.id);
      if (!error) {
        setProjects((prev) => prev.map((p) => p.id === form.id ? { ...p, ...form } as Project : p));
        setEditTarget(null);
      }
    } else {
      const { data, error } = await supabase.from('portfolio_projects').insert(form).select().single();
      if (!error && data) {
        setProjects((prev) => [...prev, data as Project]);
        setEditTarget(null);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeleteId(null);
    }
  };

  const toggleFeatured = async (p: Project) => {
    const { error } = await supabase.from('portfolio_projects').update({ is_featured: !p.is_featured }).eq('id', p.id);
    if (!error) setProjects((prev) => prev.map((x) => x.id === p.id ? { ...x, is_featured: !p.is_featured } : x));
  };

  const filtered = projects.filter((p) =>
    !search || [p.title, p.category].some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-bold text-2xl text-white">Portfolio</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{projects.length} projects · {projects.filter((p) => p.is_featured).length} featured</p>
        </div>
        <button
          onClick={() => setEditTarget({})}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all hover:scale-105"
        >
          <Plus size={15} /> New Project
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
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
            <Briefcase size={36} className="text-brand-secondary/20 mx-auto mb-3" />
            <p className="text-brand-secondary font-medium">No projects yet</p>
            <button onClick={() => setEditTarget({})} className="mt-3 text-sm text-primary hover:text-primary/80">Add first project</button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {['#', 'Project', 'Category', 'Tech Stack', 'Featured', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((project, i) => (
                <tr key={project.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5 text-brand-secondary/50 font-mono text-xs">{project.sort_order}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-white">{project.title}</p>
                    {project.outcome && <p className="text-xs text-brand-secondary mt-0.5 line-clamp-1">{project.outcome}</p>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 border border-primary/20 text-primary">{project.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {(project.tech_stack ?? []).slice(0, 2).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 text-xs font-mono text-brand-secondary">{t}</span>
                      ))}
                      {(project.tech_stack ?? []).length > 2 && <span className="text-xs text-brand-secondary">+{project.tech_stack.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => toggleFeatured(project)}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${project.is_featured ? 'text-yellow-400 hover:text-yellow-400/70' : 'text-brand-secondary hover:text-yellow-400'}`}
                    >
                      {project.is_featured ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}
                      {project.is_featured ? 'Featured' : 'Add'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditTarget(project)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setDeleteId(project.id)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all">
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

      {editTarget !== null && <ProjectForm initial={editTarget} onSave={handleSave} onClose={() => setEditTarget(null)} saving={saving} />}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-2xl border border-white/15 p-7 max-w-sm w-full shadow-card">
            <h3 className="font-tight font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-sm text-brand-secondary mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-brand-secondary text-sm font-semibold hover:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
