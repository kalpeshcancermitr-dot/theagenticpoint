'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Settings, Save, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';

type Setting = { key: string; value: string; label: string; description: string; type: 'text' | 'textarea' | 'email' };

const SETTINGS_SCHEMA: Setting[] = [
  { key: 'company_name', label: 'Company Name', description: 'Your company name shown across the site.', type: 'text', value: '' },
  { key: 'contact_email', label: 'Contact Email', description: 'Primary contact email displayed on the site.', type: 'email', value: '' },
  { key: 'hero_headline', label: 'Hero Headline', description: 'Main headline on the homepage hero section.', type: 'text', value: '' },
  { key: 'hero_subheadline', label: 'Hero Subheadline', description: 'Supporting text below the main headline.', type: 'textarea', value: '' },
  { key: 'hero_cta_primary', label: 'Primary CTA Text', description: 'Text on the main call-to-action button.', type: 'text', value: '' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from('site_settings').select('key, value');
    const map: Record<string, string> = {};
    (data ?? []).forEach((row: { key: string; value: string }) => { map[row.key] = row.value; });
    setSettings(map);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async () => {
    setSaving(true);
    const upserts = Object.entries(settings).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }));
    const { error } = await supabase.from('site_settings').upsert(upserts, { onConflict: 'key' });
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-bold text-2xl text-white">Settings</h1>
          <p className="text-sm text-brand-secondary mt-0.5">Manage site content and configuration</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSettings}
            className="p-2.5 rounded-xl border border-white/10 text-brand-secondary hover:text-white transition-all"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all hover:scale-105 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm">
          <RefreshCw size={15} className="animate-spin" /> Loading settings...
        </div>
      ) : (
        <div className="space-y-5 max-w-2xl">
          <div className="rounded-2xl border border-white/8 bg-brand-card/30 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex items-center gap-2">
              <Settings size={15} className="text-primary" />
              <h2 className="font-tight font-semibold text-white">Site Content</h2>
            </div>
            <div className="p-6 space-y-6">
              {SETTINGS_SCHEMA.map((schema) => (
                <div key={schema.key} className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-white">{schema.label}</label>
                    <p className="text-xs text-brand-secondary mt-0.5">{schema.description}</p>
                  </div>
                  {schema.type === 'textarea' ? (
                    <textarea
                      value={settings[schema.key] ?? ''}
                      onChange={(e) => setSettings((s) => ({ ...s, [schema.key]: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 resize-none"
                    />
                  ) : (
                    <input
                      type={schema.type}
                      value={settings[schema.key] ?? ''}
                      onChange={(e) => setSettings((s) => ({ ...s, [schema.key]: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-brand-card/30 p-6 space-y-3">
            <h2 className="font-tight font-semibold text-white">Admin Account</h2>
            <p className="text-sm text-brand-secondary">
              Admin accounts are managed directly in the Supabase Auth dashboard. To add a new admin or change the password, visit your Supabase project&apos;s Authentication section.
            </p>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Open Supabase Dashboard →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
