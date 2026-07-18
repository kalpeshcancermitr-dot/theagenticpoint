'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, RefreshCw, MessageSquare, Edit2, Trash2, X, Loader2, Eye, EyeOff, Star } from 'lucide-react';

type Testimonial = {
  id: string;
  client_name: string;
  client_title: string | null;
  content: string;
  rating: number | null;
  is_published: boolean;
  created_at: string;
};

function TestimonialForm({
  initial,
  onSave,
  onClose,
  saving,
}: {
  initial: Partial<Testimonial>;
  onSave: (data: Partial<Testimonial>) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Partial<Testimonial>>({
    client_name: '', client_title: '', content: '', rating: 5, is_published: false, ...initial,
  });

  const set = <K extends keyof Testimonial>(k: K, v: Testimonial[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass-strong rounded-2xl border border-white/15 w-full max-w-lg shadow-card overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-brand-surface z-10">
          <h2 className="font-tight font-bold text-white">{initial.id ? 'Edit Testimonial' : 'New Testimonial'}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSave(form)}
              disabled={saving || !form.client_name || !form.content}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary-gradient text-white text-sm font-semibold hover:scale-105 transition-all disabled:opacity-50"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              {initial.id ? 'Save Changes' : 'Create'}
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Client Name *</label>
              <input
                value={form.client_name ?? ''}
                onChange={(e) => set('client_name', e.target.value)}
                placeholder="Jane Smith"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Title / Company</label>
              <input
                value={form.client_title ?? ''}
                onChange={(e) => set('client_title', e.target.value)}
                placeholder="CEO, Acme Corp"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Testimonial *</label>
            <textarea
              value={form.content ?? ''}
              onChange={(e) => set('content', e.target.value)}
              rows={4}
              placeholder="What the client said..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Rating (1–5)</label>
              <select
                value={form.rating ?? 5}
                onChange={(e) => set('rating', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} star{r !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Status</label>
              <select
                value={form.is_published ? 'published' : 'draft'}
                onChange={(e) => set('is_published', e.target.value === 'published')}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    setTestimonials((data ?? []) as Testimonial[]);
    setLoading(false);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const handleSave = async (form: Partial<Testimonial>) => {
    setSaving(true);
    if (form.id) {
      const { error } = await supabase.from('testimonials').update(form).eq('id', form.id);
      if (!error) {
        setTestimonials((prev) => prev.map((t) => t.id === form.id ? { ...t, ...form } as Testimonial : t));
        setEditTarget(null);
      }
    } else {
      const { data, error } = await supabase.from('testimonials').insert(form).select().single();
      if (!error && data) {
        setTestimonials((prev) => [data as Testimonial, ...prev]);
        setEditTarget(null);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setDeleteId(null);
    }
  };

  const togglePublished = async (t: Testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_published: !t.is_published })
      .eq('id', t.id);
    if (!error) {
      setTestimonials((prev) => prev.map((x) => x.id === t.id ? { ...x, is_published: !t.is_published } : x));
    }
  };

  const published = testimonials.filter((t) => t.is_published).length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-bold text-2xl text-white">Testimonials</h1>
          <p className="text-sm text-brand-secondary mt-0.5">
            {testimonials.length} total · {published} published
          </p>
        </div>
        <button
          onClick={() => setEditTarget({})}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all hover:scale-105"
        >
          <Plus size={15} /> New Testimonial
        </button>
      </div>

      <div className="rounded-2xl border border-white/8 bg-brand-card/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm">
            <RefreshCw size={15} className="animate-spin" /> Loading...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare size={36} className="text-brand-secondary/20 mx-auto mb-3" />
            <p className="text-brand-secondary font-medium">No testimonials yet</p>
            <button onClick={() => setEditTarget({})} className="mt-3 text-sm text-primary hover:text-primary/80">
              Add first testimonial
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {testimonials.map((t) => (
              <div key={t.id} className="flex items-start gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-white text-sm">{t.client_name}</span>
                    {t.client_title && (
                      <span className="text-xs text-brand-secondary">{t.client_title}</span>
                    )}
                    {t.rating && (
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                        t.is_published
                          ? 'text-brand-success bg-brand-success/10 border-brand-success/20'
                          : 'text-brand-secondary bg-white/5 border-white/10'
                      }`}
                    >
                      {t.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-brand-secondary line-clamp-2 leading-relaxed">{t.content}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => togglePublished(t)}
                    className={`p-1.5 rounded-lg transition-all ${
                      t.is_published
                        ? 'text-brand-success hover:bg-brand-success/10'
                        : 'text-brand-secondary hover:text-white hover:bg-white/8'
                    }`}
                    title={t.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {t.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => setEditTarget(t)}
                    className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteId(t.id)}
                    className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editTarget !== null && (
        <TestimonialForm
          initial={editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
          saving={saving}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-2xl border border-white/15 p-7 max-w-sm w-full shadow-card">
            <h3 className="font-tight font-bold text-white mb-2">Delete Testimonial?</h3>
            <p className="text-sm text-brand-secondary mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-brand-secondary text-sm font-semibold hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
