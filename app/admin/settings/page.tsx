'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Settings, Save, Loader2, CheckCircle2, RefreshCw, Globe, Share2, BarChart3 } from 'lucide-react';

type SettingField = { key: string; label: string; description: string; type: 'text' | 'textarea' | 'email' | 'url' };

const SETTINGS_GROUPS: { title: string; icon: React.ElementType; fields: SettingField[] }[] = [
  {
    title: 'Site Content',
    icon: Settings,
    fields: [
      { key: 'company_name', label: 'Company Name', description: 'Your company name shown across the site.', type: 'text' },
      { key: 'contact_email', label: 'Contact Email', description: 'Primary contact email displayed on the site.', type: 'email' },
      { key: 'hero_headline', label: 'Hero Headline', description: 'Main headline on the homepage hero section.', type: 'text' },
      { key: 'hero_subheadline', label: 'Hero Subheadline', description: 'Supporting text below the main headline.', type: 'textarea' },
      { key: 'hero_cta_primary', label: 'Primary CTA Text', description: 'Text on the main call-to-action button.', type: 'text' },
    ],
  },
  {
    title: 'Hero Stats',
    icon: BarChart3,
    fields: [
      { key: 'hero_stat_1_value', label: 'Stat 1 Value', description: 'e.g. 50+', type: 'text' },
      { key: 'hero_stat_1_label', label: 'Stat 1 Label', description: 'e.g. AI Systems Deployed', type: 'text' },
      { key: 'hero_stat_2_value', label: 'Stat 2 Value', description: 'e.g. 10x', type: 'text' },
      { key: 'hero_stat_2_label', label: 'Stat 2 Label', description: 'e.g. Average ROI', type: 'text' },
      { key: 'hero_stat_3_value', label: 'Stat 3 Value', description: 'e.g. 2-4 wks', type: 'text' },
      { key: 'hero_stat_3_label', label: 'Stat 3 Label', description: 'e.g. To Production', type: 'text' },
    ],
  },
  {
    title: 'Contact & Booking',
    icon: Globe,
    fields: [
      { key: 'calendly_url', label: 'Calendly URL', description: 'Full URL for your Calendly booking page.', type: 'url' },
      { key: 'whatsapp_number', label: 'WhatsApp Number', description: 'Phone number in international format (e.g. 447911123456). Used to build the wa.me link.', type: 'text' },
    ],
  },
  {
    title: 'Social Links',
    icon: Share2,
    fields: [
      { key: 'social_twitter_url', label: 'Twitter / X URL', description: 'Full URL e.g. https://twitter.com/agenticpoint. Leave empty to hide icon.', type: 'url' },
      { key: 'social_linkedin_url', label: 'LinkedIn URL', description: 'Full URL e.g. https://linkedin.com/company/agenticpoint. Leave empty to hide icon.', type: 'url' },
      { key: 'social_github_url', label: 'GitHub URL', description: 'Full URL e.g. https://github.com/agenticpoint. Leave empty to hide icon.', type: 'url' },
    ],
  },
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
          {SETTINGS_GROUPS.map(({ title, icon: Icon, fields }) => (
            <div key={title} className="rounded-2xl border border-white/8 bg-brand-card/30 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/8 flex items-center gap-2">
                <Icon size={15} className="text-primary" />
                <h2 className="font-tight font-semibold text-white">{title}</h2>
              </div>
              <div className="p-6 space-y-6">
                {fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <div>
                      <label className="text-sm font-medium text-white">{field.label}</label>
                      <p className="text-xs text-brand-secondary mt-0.5">{field.description}</p>
                    </div>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={settings[field.key] ?? ''}
                        onChange={(e) => setSettings((s) => ({ ...s, [field.key]: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50 resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={settings[field.key] ?? ''}
                        onChange={(e) => setSettings((s) => ({ ...s, [field.key]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-primary/50"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

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
