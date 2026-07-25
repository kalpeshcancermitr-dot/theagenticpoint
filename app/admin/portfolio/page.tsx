'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAdminPerms, can } from '@/lib/admin-auth';
import {
  Plus, Search, RefreshCw, Briefcase, Edit2, Trash2, X, Loader2,
  Star, StarOff, ExternalLink, MessageSquare, Check,
} from 'lucide-react';

type Project = {
  id: string; title: string; slug: string; category: string;
  challenge: string | null; solution: string | null; outcome: string | null;
  tech_stack: string[]; is_featured: boolean; is_case_study: boolean;
  sort_order: number; created_at: string;
  case_study_headline: string | null; case_study_detail: string | null;
  detailed_sections: { heading: string; body: string }[];
};

type Testimonial = { id: string; client_name: string; client_title: string | null; content: string; rating: number | null; is_published: boolean };

const CATEGORIES = ['WhatsApp AI', 'Healthcare AI', 'Business Automation', 'AI Assistants', 'Document AI', 'Internal AI Tools', 'CRM Automation', 'HR Automation', 'Voice AI'];

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function ProjectForm({ initial, onSave, onClose, saving }: {
  initial: Partial<Project>; onSave: (d: Partial<Project>) => void; onClose: () => void; saving: boolean;
}) {
  const [form, setForm] = useState<Partial<Project>>({
    title: '', slug: '', category: '', challenge: '', solution: '', outcome: '',
    tech_stack: [], is_featured: false, is_case_study: false, sort_order: 0,
    case_study_headline: '', case_study_detail: '', detailed_sections: [], ...initial,
  });
  const [techInput, setTechInput] = useState((initial.tech_stack ?? []).join(', '));
  const [sections, setSections] = useState<{ heading: string; body: string }[]>(initial.detailed_sections ?? []);

  const set = <K extends keyof Project>(k: K, v: Project[K]) => setForm((f) => ({ ...f, [k]: v, ...(k === 'title' && !initial.slug ? { slug: toSlug(v as string) } : {}) }));

  const handleSave = () => {
    const tech_stack = techInput.split(',').map((t) => t.trim()).filter(Boolean);
    onSave({ ...form, tech_stack, detailed_sections: sections });
  };

  const addSection = () => setSections((prev) => [...prev, { heading: '', body: '' }]);
  const updateSection = (i: number, key: 'heading' | 'body', val: string) => setSections((prev) => prev.map((s, idx) => idx === i ? { ...s, [key]: val } : s));
  const removeSection = (i: number) => setSections((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl surface-abyss border-l border-brand-edge flex flex-col shadow-card overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge sticky top-0 surface-abyss z-10">
          <h2 className="font-tight font-semibold text-white">{initial.id ? 'Edit Project' : 'New Project'}</h2>
          <div className="flex items-center gap-2">
            <button onClick={handleSave} disabled={saving || !form.title} className="flex items-center gap-2 px-5 py-2 rounded-xl accent-cta text-white text-sm font-semibold hover:scale-105 transition-all disabled:opacity-50">
              {saving && <Loader2 size={13} className="animate-spin" />}{initial.id ? 'Save Changes' : 'Create Project'}
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white"><X size={18} /></button>
          </div>
        </div>
        <div className="p-6 space-y-5 flex-1">
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Title *</label>
            <input value={form.title ?? ''} onChange={(e) => set('title', e.target.value)} placeholder="Project title..." className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Slug</label>
              <input value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary font-mono" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Category</label>
              <select value={form.category ?? ''} onChange={(e) => set('category', e.target.value)} className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary">
                <option value="">Select...</option>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Sort Order</label>
              <input type="number" value={form.sort_order ?? 0} onChange={(e) => set('sort_order', parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Featured</label>
              <select value={form.is_featured ? 'yes' : 'no'} onChange={(e) => set('is_featured', e.target.value === 'yes')} className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm">
                <option value="no">No</option><option value="yes">Featured</option></select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Type</label>
              <select value={form.is_case_study ? 'yes' : 'no'} onChange={(e) => set('is_case_study', e.target.value === 'yes')} className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm">
                <option value="no">Scenario</option><option value="yes">Case Study</option></select></div>
          </div>
          {[
            { key: 'challenge' as keyof Project, label: 'Business Challenge' },
            { key: 'solution' as keyof Project, label: 'Solution Built' },
            { key: 'outcome' as keyof Project, label: 'Business Outcome' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">{label}</label>
              <textarea value={(form[key] as string) ?? ''} onChange={(e) => set(key, e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary resize-none" />
            </div>
          ))}
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Tech Stack (comma-separated)</label>
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="OpenAI GPT-4, n8n, Supabase" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>

          <div className="pt-4 border-t border-brand-edge space-y-4">
            <p className="text-xs font-medium text-brand-primary uppercase tracking-wider">Detailed Case Study</p>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Case Study Headline</label>
              <input value={form.case_study_headline ?? ''} onChange={(e) => set('case_study_headline', e.target.value)} placeholder="e.g. How we reduced no-shows by 38%" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Case Study Summary</label>
              <textarea value={form.case_study_detail ?? ''} onChange={(e) => set('case_study_detail', e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary resize-none" /></div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Detailed Sections</label>
                <button onClick={addSection} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-medium"><Plus size={11} /> Add</button>
              </div>
              {sections.map((sec, i) => (
                <div key={i} className="rounded-xl border border-brand-edge bg-white/3 p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input value={sec.heading} onChange={(e) => updateSection(i, 'heading', e.target.value)} placeholder="Section heading..." className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" />
                    <button onClick={() => removeSection(i)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400"><Trash2 size={13} /></button>
                  </div>
                  <textarea value={sec.body} onChange={(e) => updateSection(i, 'body', e.target.value)} rows={3} placeholder="Section content..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary resize-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialLinker({ project, onClose }: { project: Project; onClose: () => void }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [linked, setLinked] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: all }, { data: linkedRows }] = await Promise.all([
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('portfolio_testimonials').select('testimonial_id').eq('project_id', project.id),
      ]);
      setTestimonials((all ?? []) as Testimonial[]);
      setLinked((linkedRows ?? []).map((r: any) => r.testimonial_id));
      setLoading(false);
    })();
  }, [project.id]);

  const toggle = async (id: string) => {
    const isLinked = linked.includes(id);
    if (isLinked) {
      await supabase.from('portfolio_testimonials').delete().eq('project_id', project.id).eq('testimonial_id', id);
      setLinked((prev) => prev.filter((x) => x !== id));
    } else {
      await supabase.from('portfolio_testimonials').insert({ project_id: project.id, testimonial_id: id, sort_order: linked.length });
      setLinked((prev) => [...prev, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass-strong rounded-2xl border border-brand-hairline w-full max-w-lg max-h-[80vh] flex flex-col shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge">
          <div><h2 className="font-tight font-semibold text-white">Link Testimonials</h2><p className="text-xs text-brand-secondary mt-0.5">{project.title}</p></div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white"><X size={18} /></button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {loading ? <div className="text-center py-8 text-brand-secondary text-sm">Loading...</div> : testimonials.filter((t) => t.is_published).length === 0 ? (
            <p className="text-sm text-brand-secondary text-center py-8">No published testimonials. Create some in the Testimonials section first.</p>
          ) : (
            <div className="space-y-2">
              {testimonials.filter((t) => t.is_published).map((t) => (
                <button key={t.id} onClick={() => toggle(t.id)} className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${linked.includes(t.id) ? 'bg-brand-primary/10 border-brand-primary/30' : 'bg-white/3 border-brand-edge hover:border-brand-hairline'}`}>
                  <div className={`w-4 h-4 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center ${linked.includes(t.id) ? 'bg-brand-primary border-brand-primary' : 'border-brand-edge'}`}>
                    {linked.includes(t.id) && <Check size={10} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{t.client_name}</p>
                    <p className="text-xs text-brand-secondary line-clamp-1">{t.content}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioAdminPage() {
  const { allowed } = useAdminPerms();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState('');
  const [testimonialTarget, setTestimonialTarget] = useState<Project | null>(null);

  const canManage = can(allowed, 'portfolio', 'edit') || can(allowed, 'portfolio', 'create');

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase.from('portfolio_projects').select('*').order('sort_order');
    setProjects((data ?? []) as Project[]);
    setLoading(false);
  };

  useEffect(() => { if (can(allowed, 'portfolio', 'view')) fetchProjects(); }, [allowed]);

  const handleSave = async (form: Partial<Project>) => {
    setSaving(true);
    if (form.id) {
      const { id, ...updateData } = form;
      const { error } = await supabase.from('portfolio_projects').update(updateData).eq('id', id);
      if (error) setSaveError(error.message);
      else { setProjects((prev) => prev.map((p) => p.id === id ? { ...p, ...form } as Project : p)); setEditTarget(null); }
    } else {
      const { id: _, ...insertData } = form;
      const { data, error } = await supabase.from('portfolio_projects').insert(insertData).select().single();
      if (error) setSaveError(error.message);
      else if (data) { setProjects((prev) => [...prev, data as Project]); setEditTarget(null); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
    if (!error) { setProjects((prev) => prev.filter((p) => p.id !== id)); setDeleteId(null); }
  };

  const toggleFeatured = async (p: Project) => {
    const { error } = await supabase.from('portfolio_projects').update({ is_featured: !p.is_featured }).eq('id', p.id);
    if (!error) setProjects((prev) => prev.map((x) => x.id === p.id ? { ...x, is_featured: !p.is_featured } : x));
  };

  const filtered = projects.filter((p) => !search || [p.title, p.category].some((v) => v.toLowerCase().includes(search.toLowerCase())));

  if (!can(allowed, 'portfolio', 'view')) {
    return <div className="p-8 flex items-center justify-center min-h-[60vh]"><div className="text-center"><Briefcase size={40} className="text-brand-secondary/30 mx-auto mb-3" /><p className="text-white font-medium">No access</p></div></div>;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-semibold text-2xl text-white">Portfolio</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{projects.length} projects · {projects.filter((p) => p.is_featured).length} featured</p>
        </div>
        {can(allowed, 'portfolio', 'create') && (
          <button onClick={() => setEditTarget({})} className="flex items-center gap-2 px-4 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold transition-all hover:scale-105"><Plus size={15} /> New Project</button>
        )}
      </div>
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" />
      </div>
      <div className="rounded-2xl border border-brand-edge surface-deep-sea/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm"><RefreshCw size={15} className="animate-spin" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16"><Briefcase size={36} className="text-brand-secondary/20 mx-auto mb-3" /><p className="text-brand-secondary font-medium">No projects yet</p></div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-brand-edge">{['#', 'Project', 'Category', 'Featured', ''].map((h) => (<th key={h} className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">{h}</th>))}</tr></thead>
            <tbody>
              {filtered.map((project, i) => (
                <tr key={project.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5 text-brand-secondary/50 font-mono text-xs">{project.sort_order}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-white">{project.title}</p>
                    {project.outcome && <p className="text-xs text-brand-secondary mt-0.5 line-clamp-1">{project.outcome}</p>}
                  </td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 border border-brand-primary/30 text-brand-primary">{project.category}</span></td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleFeatured(project)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${project.is_featured ? 'text-yellow-400 hover:text-yellow-400/70' : 'text-brand-secondary hover:text-yellow-400'}`}>
                      {project.is_featured ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}{project.is_featured ? 'Featured' : 'Add'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <a href={`/portfolio/${project.slug}`} target="_blank" className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all"><ExternalLink size={13} /></a>
                      <button onClick={() => setTestimonialTarget(project)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all" title="Link testimonials"><MessageSquare size={13} /></button>
                      {canManage && <button onClick={() => setEditTarget(project)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all"><Edit2 size={13} /></button>}
                      {can(allowed, 'portfolio', 'delete') && <button onClick={() => setDeleteId(project.id)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all"><Trash2 size={13} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {saveError && <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm shadow-card max-w-sm">{saveError}<button onClick={() => setSaveError('')} className="ml-3 text-red-400/60 hover:text-red-400">Dismiss</button></div>}
      {editTarget !== null && <ProjectForm initial={editTarget} onSave={handleSave} onClose={() => setEditTarget(null)} saving={saving} />}
      {testimonialTarget && <TestimonialLinker project={testimonialTarget} onClose={() => setTestimonialTarget(null)} />}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-2xl border border-brand-hairline p-7 max-w-sm w-full shadow-card">
            <h3 className="font-tight font-semibold text-white mb-2">Delete Project?</h3><p className="text-sm text-brand-secondary mb-5">This cannot be undone.</p>
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
