'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAdminPerms, can } from '@/lib/admin-auth';
import {
  Plus, Search, RefreshCw, Wrench, Edit2, Trash2, X, Loader2,
  Eye, EyeOff, Star, StarOff, ExternalLink, Layout as LayoutIcon,
  MessageSquare, Check,
} from 'lucide-react';

type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  icon: string;
  accent_color: string;
  problem: string | null;
  solution: string | null;
  benefits: string[];
  tech_stack: string[];
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

const ICONS = ['Workflow', 'MessageSquare', 'Mic', 'Bot', 'Brain', 'FileText', 'Database', 'Mail', 'Zap', 'Users', 'Calendar', 'BarChart3'];

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ServicesAdminPage() {
  const { allowed } = useAdminPerms();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [landingEditor, setLandingEditor] = useState<Service | null>(null);
  const [saveError, setSaveError] = useState('');

  const canManage = can(allowed, 'services', 'edit') || can(allowed, 'services', 'create');

  useEffect(() => {
    if (!can(allowed, 'services', 'view')) return;
    fetchServices();
  }, [allowed]);

  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('sort_order');
    setServices((data ?? []) as Service[]);
    setLoading(false);
  };

  const handleSave = async (form: Partial<Service>) => {
    setSaving(true);
    if (form.id) {
      const { id, ...updateData } = form;
      const { error } = await supabase.from('services').update({ ...updateData, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) setSaveError(error.message);
      else { setServices((prev) => prev.map((s) => s.id === id ? { ...s, ...form } as Service : s)); setEditTarget(null); }
    } else {
      const { id: _, ...insertData } = form;
      const { data, error } = await supabase.from('services').insert(insertData).select().single();
      if (error) setSaveError(error.message);
      else if (data) { setServices((prev) => [...prev, data as Service]); setEditTarget(null); }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) { setServices((prev) => prev.filter((s) => s.id !== id)); setDeleteId(null); }
  };

  const togglePublished = async (s: Service) => {
    const { error } = await supabase.from('services').update({ is_published: !s.is_published }).eq('id', s.id);
    if (!error) setServices((prev) => prev.map((x) => x.id === s.id ? { ...x, is_published: !s.is_published } : x));
  };

  const toggleFeatured = async (s: Service) => {
    const { error } = await supabase.from('services').update({ is_featured: !s.is_featured }).eq('id', s.id);
    if (!error) setServices((prev) => prev.map((x) => x.id === s.id ? { ...x, is_featured: !s.is_featured } : x));
  };

  const filtered = services.filter((s) =>
    !search || [s.title, s.tagline].some((v) => (v ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  if (!can(allowed, 'services', 'view')) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center"><Wrench size={40} className="text-brand-secondary/30 mx-auto mb-3" /><p className="text-white font-medium">No access</p></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-semibold text-2xl text-white">Services</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{services.length} services · {services.filter((s) => s.is_published).length} published</p>
        </div>
        {can(allowed, 'services', 'create') && (
          <button onClick={() => setEditTarget({})} className="flex items-center gap-2 px-4 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold transition-all hover:scale-105">
            <Plus size={15} /> New Service
          </button>
        )}
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" />
      </div>

      <div className="rounded-2xl border border-brand-edge surface-deep-sea/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm"><RefreshCw size={15} className="animate-spin" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16"><Wrench size={36} className="text-brand-secondary/20 mx-auto mb-3" /><p className="text-brand-secondary font-medium">No services yet</p></div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-brand-edge">{['Service', 'Slug', 'Status', ''].map((h) => (<th key={h} className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">{h}</th>))}</tr></thead>
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
                    <div className="flex items-center gap-2">
                      <button onClick={() => togglePublished(s)} className={`p-1.5 rounded-lg transition-all ${s.is_published ? 'text-brand-success hover:bg-brand-success/10' : 'text-brand-secondary hover:text-white hover:bg-white/8'}`} title={s.is_published ? 'Published' : 'Draft'}>
                        {s.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button onClick={() => toggleFeatured(s)} className={`p-1.5 rounded-lg transition-all ${s.is_featured ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-brand-secondary hover:text-yellow-400'}`} title="Featured">
                        {s.is_featured ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <a href={`/services/${s.slug}`} target="_blank" className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all"><ExternalLink size={13} /></a>
                      <button onClick={() => setLandingEditor(s)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all" title="Edit landing page"><LayoutIcon size={13} /></button>
                      {canManage && <button onClick={() => setEditTarget(s)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all"><Edit2 size={13} /></button>}
                      {can(allowed, 'services', 'delete') && <button onClick={() => setDeleteId(s.id)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all"><Trash2 size={13} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {saveError && (
        <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm shadow-card max-w-sm">{saveError}<button onClick={() => setSaveError('')} className="ml-3 text-red-400/60 hover:text-red-400">Dismiss</button></div>
      )}

      {editTarget !== null && <ServiceForm initial={editTarget} onSave={handleSave} onClose={() => setEditTarget(null)} saving={saving} />}

      {landingEditor && <LandingEditor service={landingEditor} onClose={() => setLandingEditor(null)} />}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-2xl border border-brand-hairline p-7 max-w-sm w-full shadow-card">
            <h3 className="font-tight font-semibold text-white mb-2">Delete Service?</h3>
            <p className="text-sm text-brand-secondary mb-5">This will also delete its landing page. This cannot be undone.</p>
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

function ServiceForm({ initial, onSave, onClose, saving }: {
  initial: Partial<Service>; onSave: (d: Partial<Service>) => void; onClose: () => void; saving: boolean;
}) {
  const [form, setForm] = useState<Partial<Service>>({
    title: '', slug: '', tagline: '', icon: 'Workflow', accent_color: '#2862d7',
    problem: '', solution: '', benefits: [], tech_stack: [], is_published: true, is_featured: false, sort_order: 0, ...initial,
  });
  const [benefitsInput, setBenefitsInput] = useState((initial.benefits ?? []).join('\n'));
  const [techInput, setTechInput] = useState((initial.tech_stack ?? []).join(', '));

  const set = <K extends keyof Service>(k: K, v: Service[K]) => setForm((f) => ({ ...f, [k]: v, ...(k === 'title' && !initial.slug ? { slug: toSlug(v as string) } : {}) }));

  const handleSave = () => {
    onSave({ ...form, benefits: benefitsInput.split('\n').map((b) => b.trim()).filter(Boolean), tech_stack: techInput.split(',').map((t) => t.trim()).filter(Boolean) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl surface-abyss border-l border-brand-edge flex flex-col shadow-card overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge sticky top-0 surface-abyss z-10">
          <h2 className="font-tight font-semibold text-white">{initial.id ? 'Edit Service' : 'New Service'}</h2>
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
              <input value={form.title ?? ''} onChange={(e) => set('title', e.target.value)} placeholder="AI Workflow Automation" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Slug</label>
              <input value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary font-mono" /></div>
          </div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Tagline</label>
            <input value={form.tagline ?? ''} onChange={(e) => set('tagline', e.target.value)} placeholder="Automate complex multi-step business processes end-to-end." className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Icon</label>
              <select value={form.icon} onChange={(e) => set('icon', e.target.value)} className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary">{ICONS.map((i) => <option key={i} value={i}>{i}</option>)}</select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Accent Color</label>
              <input type="color" value={form.accent_color ?? '#2862d7'} onChange={(e) => set('accent_color', e.target.value)} className="w-full h-10 rounded-xl bg-white/5 border border-brand-edge cursor-pointer" /></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Sort Order</label>
              <input type="number" value={form.sort_order ?? 0} onChange={(e) => set('sort_order', parseInt(e.target.value) || 0)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" /></div>
          </div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">The Problem</label>
            <textarea value={form.problem ?? ''} onChange={(e) => set('problem', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary resize-none" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Our Solution</label>
            <textarea value={form.solution ?? ''} onChange={(e) => set('solution', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary resize-none" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Key Benefits (one per line)</label>
            <textarea value={benefitsInput} onChange={(e) => setBenefitsInput(e.target.value)} rows={5} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary resize-none" /></div>
          <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Tech Stack (comma-separated)</label>
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Status</label>
              <select value={form.is_published ? 'yes' : 'no'} onChange={(e) => set('is_published', e.target.value === 'yes')} className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary"><option value="yes">Published</option><option value="no">Draft</option></select></div>
            <div className="space-y-1.5"><label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Featured</label>
              <select value={form.is_featured ? 'yes' : 'no'} onChange={(e) => set('is_featured', e.target.value === 'yes')} className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary"><option value="no">Not Featured</option><option value="yes">Featured</option></select></div>
          </div>
        </div>
      </div>
    </div>
  );
}

type LandingSection = { id: string; service_id: string; section_type: string; title: string | null; body: string | null; image_url: string | null; sort_order: number };
type Testimonial = { id: string; client_name: string; client_title: string | null; content: string; rating: number | null; is_published: boolean };

function LandingEditor({ service, onClose }: { service: Service; onClose: () => void }) {
  const [sections, setSections] = useState<LandingSection[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [linkedTestimonials, setLinkedTestimonials] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState(false);

  useEffect(() => {
    fetchData();
  }, [service.id]);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: secs }, { data: allTest }, { data: linked }] = await Promise.all([
      supabase.from('service_landing_sections').select('*').eq('service_id', service.id).order('sort_order'),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('service_testimonials').select('testimonial_id').eq('service_id', service.id),
    ]);
    setSections((secs ?? []) as LandingSection[]);
    setTestimonials((allTest ?? []) as Testimonial[]);
    setLinkedTestimonials((linked ?? []).map((l: any) => l.testimonial_id));
    setLoading(false);
  };

  const addSection = async () => {
    const { data } = await supabase.from('service_landing_sections').insert({
      service_id: service.id, section_type: 'text', title: 'New Section', body: '', sort_order: sections.length,
    }).select().single();
    if (data) setSections((prev) => [...prev, data as LandingSection]);
  };

  const updateSection = async (id: string, updates: Partial<LandingSection>) => {
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, ...updates } : s));
    await supabase.from('service_landing_sections').update(updates).eq('id', id);
  };

  const deleteSection = async (id: string) => {
    await supabase.from('service_landing_sections').delete().eq('id', id);
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleTestimonial = async (testId: string) => {
    const linked = linkedTestimonials.includes(testId);
    if (linked) {
      await supabase.from('service_testimonials').delete().eq('service_id', service.id).eq('testimonial_id', testId);
      setLinkedTestimonials((prev) => prev.filter((id) => id !== testId));
    } else {
      await supabase.from('service_testimonials').insert({ service_id: service.id, testimonial_id: testId, sort_order: linkedTestimonials.length });
      setLinkedTestimonials((prev) => [...prev, testId]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl surface-abyss border-l border-brand-edge flex flex-col shadow-card overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge sticky top-0 surface-abyss z-10">
          <div>
            <h2 className="font-tight font-semibold text-white">Landing Page Editor</h2>
            <p className="text-xs text-brand-secondary mt-0.5">{service.title} · /services/{service.slug}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white"><X size={18} /></button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm"><RefreshCw size={15} className="animate-spin" /> Loading...</div>
        ) : (
          <div className="p-6 space-y-6 flex-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-tight font-semibold text-white text-sm flex items-center gap-2"><LayoutIcon size={14} /> Custom Sections</h3>
                <button onClick={addSection} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-medium hover:bg-brand-primary/20 transition-all"><Plus size={12} /> Add Section</button>
              </div>
              <div className="space-y-3">
                {sections.length === 0 ? (
                  <p className="text-sm text-brand-secondary py-4 text-center">No custom sections yet. Add one to extend the landing page.</p>
                ) : sections.map((sec) => (
                  <div key={sec.id} className="rounded-xl border border-brand-edge bg-white/3 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <select value={sec.section_type} onChange={(e) => updateSection(sec.id, { section_type: e.target.value })} className="px-3 py-1.5 rounded-lg surface-deep-sea border border-brand-edge text-white text-xs">
                        <option value="text">Text Block</option><option value="stats">Stats Block</option><option value="cta">Call to Action</option>
                      </select>
                      <button onClick={() => deleteSection(sec.id)} className="p-1 rounded-lg text-brand-secondary hover:text-red-400"><Trash2 size={13} /></button>
                    </div>
                    <input value={sec.title ?? ''} onChange={(e) => updateSection(sec.id, { title: e.target.value })} placeholder="Section title..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" />
                    <textarea value={sec.body ?? ''} onChange={(e) => updateSection(sec.id, { body: e.target.value })} rows={3} placeholder="Section content..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary resize-none" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-tight font-semibold text-white text-sm flex items-center gap-2 mb-3"><MessageSquare size={14} /> Linked Testimonials</h3>
              <div className="space-y-2">
                {testimonials.filter((t) => t.is_published).length === 0 ? (
                  <p className="text-sm text-brand-secondary py-4 text-center">No published testimonials available. Create some in the Testimonials section first.</p>
                ) : testimonials.filter((t) => t.is_published).map((t) => (
                  <button key={t.id} onClick={() => toggleTestimonial(t.id)} className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${linkedTestimonials.includes(t.id) ? 'bg-brand-primary/10 border-brand-primary/30' : 'bg-white/3 border-brand-edge hover:border-brand-hairline'}`}>
                    <div className={`w-4 h-4 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center ${linkedTestimonials.includes(t.id) ? 'bg-brand-primary border-brand-primary' : 'border-brand-edge'}`}>
                      {linkedTestimonials.includes(t.id) && <Check size={10} className="text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{t.client_name}</p>
                      <p className="text-xs text-brand-secondary line-clamp-1">{t.content}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


