'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, RefreshCw, FileText, Edit2, Trash2, X, Loader2, Eye, EyeOff } from 'lucide-react';

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  status: 'draft' | 'published';
  cover_image_url: string | null;
  read_time: string | null;
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const CATEGORIES = ['Guides', 'Strategy', 'Technical', 'Comparison', 'Case Study', 'News'];

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function ArticleForm({
  initial,
  onSave,
  onClose,
  saving,
}: {
  initial: Partial<Article>;
  onSave: (data: Partial<Article>) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Partial<Article>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft',
    cover_image_url: '',
    read_time: '',
    author: 'AgenticPoint Team',
    ...initial,
  });

  const set = (k: keyof Article, v: string) => {
    setForm((f) => ({
      ...f,
      [k]: v,
      ...(k === 'title' && !initial.slug ? { slug: toSlug(v) } : {}),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl bg-brand-surface border-l border-white/10 flex flex-col shadow-card overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-brand-surface z-10">
          <h2 className="font-tight font-bold text-white">{initial.id ? 'Edit Article' : 'New Article'}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSave(form)}
              disabled={saving || !form.title}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary-gradient text-white text-sm font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : null}
              {initial.id ? 'Save Changes' : 'Publish'}
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5 flex-1">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Title *</label>
            <input
              value={form.title ?? ''}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Article title..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Slug</label>
              <input
                value={form.slug ?? ''}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="article-slug"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Status</label>
              <select
                value={form.status ?? 'draft'}
                onChange={(e) => set('status', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Category</label>
              <select
                value={form.category ?? ''}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Read Time</label>
              <input
                value={form.read_time ?? ''}
                onChange={(e) => set('read_time', e.target.value)}
                placeholder="8 min read"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Excerpt</label>
            <textarea
              value={form.excerpt ?? ''}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="Short preview shown in article lists..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Cover Image URL</label>
            <input
              value={form.cover_image_url ?? ''}
              onChange={(e) => set('cover_image_url', e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Author</label>
            <input
              value={form.author ?? ''}
              onChange={(e) => set('author', e.target.value)}
              placeholder="Author name"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Content (Markdown)</label>
            <textarea
              value={form.content ?? ''}
              onChange={(e) => set('content', e.target.value)}
              placeholder="Write your article content in Markdown..."
              rows={16}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 resize-y font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<Partial<Article> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    setArticles((data ?? []) as Article[]);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleSave = async (form: Partial<Article>) => {
    setSaving(true);
    if (form.id) {
      const { error } = await supabase.from('articles').update({
        ...form,
        updated_at: new Date().toISOString(),
        published_at: form.status === 'published' ? (form.published_at ?? new Date().toISOString()) : null,
      }).eq('id', form.id);
      if (!error) {
        setArticles((prev) => prev.map((a) => a.id === form.id ? { ...a, ...form } as Article : a));
        setEditTarget(null);
      }
    } else {
      const { data, error } = await supabase.from('articles').insert({
        ...form,
        published_at: form.status === 'published' ? new Date().toISOString() : null,
      }).select().single();
      if (!error && data) {
        setArticles((prev) => [data as Article, ...prev]);
        setEditTarget(null);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (!error) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setDeleteId(null);
    }
  };

  const filtered = articles.filter((a) =>
    !search || [a.title, a.category ?? '', a.author].some((v) => v.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-bold text-2xl text-white">Articles</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{articles.length} articles total</p>
        </div>
        <button
          onClick={() => setEditTarget({})}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all hover:scale-105"
        >
          <Plus size={15} /> New Article
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/8 bg-brand-card/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm">
            <RefreshCw size={15} className="animate-spin" /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={36} className="text-brand-secondary/20 mx-auto mb-3" />
            <p className="text-brand-secondary font-medium">No articles yet</p>
            <button
              onClick={() => setEditTarget({})}
              className="mt-3 text-sm text-primary hover:text-primary/80"
            >
              Write your first article
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {['Title', 'Category', 'Status', 'Author', 'Date', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((article, i) => (
                <tr
                  key={article.id}
                  className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-white">{article.title}</p>
                    {article.excerpt && <p className="text-xs text-brand-secondary mt-0.5 line-clamp-1">{article.excerpt}</p>}
                  </td>
                  <td className="px-5 py-3.5 text-brand-secondary">{article.category ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      article.status === 'published'
                        ? 'bg-brand-success/10 text-brand-success border-brand-success/20'
                        : 'bg-white/5 text-brand-secondary border-white/10'
                    }`}>
                      {article.status === 'published' ? <Eye size={10} /> : <EyeOff size={10} />}
                      {article.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-brand-secondary">{article.author}</td>
                  <td className="px-5 py-3.5 text-brand-secondary/60 text-xs">{new Date(article.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditTarget(article)}
                        className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(article.id)}
                        className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all"
                      >
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
        <ArticleForm
          initial={editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
          saving={saving}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-2xl border border-white/15 p-7 max-w-sm w-full shadow-card">
            <h3 className="font-tight font-bold text-white mb-2">Delete Article?</h3>
            <p className="text-sm text-brand-secondary mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-brand-secondary text-sm font-semibold hover:text-white transition-colors"
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
