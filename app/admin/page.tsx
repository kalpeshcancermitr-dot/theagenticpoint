'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, FileText, Package, Briefcase, TrendingUp, Clock, ArrowRight, RefreshCw, Bot } from 'lucide-react';
import Link from 'next/link';

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service_interest: string | null;
  status: string;
  created_at: string;
};

type Stats = {
  leads: number;
  newLeads: number;
  articles: number;
  resources: number;
  portfolio: number;
  agents: number;
  agentConversations: number;
};

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  sub?: string;
  color: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group p-5 rounded-2xl border border-white/8 bg-brand-card/50 card-hover flex items-start gap-4"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform`}>
        <Icon size={18} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-brand-secondary">{label}</p>
        <p className={`font-tight font-bold text-2xl text-white mt-0.5`}>{value}</p>
        {sub && <p className={`text-xs font-medium mt-0.5 ${color}`}>{sub}</p>}
      </div>
      <ArrowRight size={14} className="text-brand-secondary/40 group-hover:text-brand-secondary transition-colors mt-1" />
    </Link>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return 'Just now';
}

const statusStyles: Record<string, string> = {
  new: 'bg-primary/10 text-primary border-primary/20',
  reviewed: 'bg-brand-success/10 text-brand-success border-brand-success/20',
  archived: 'bg-white/5 text-brand-secondary border-white/10',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ leads: 0, newLeads: 0, articles: 0, resources: 0, portfolio: 0, agents: 0, agentConversations: 0 });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const [leadsRes, articlesRes, resourcesRes, portfolioRes, agentsRes, agentConvoRes] = await Promise.all([
      supabase.from('contact_requests').select('id, name, email, company, service_interest, status, created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('articles').select('id', { count: 'exact', head: true }),
      supabase.from('resources').select('id', { count: 'exact', head: true }),
      supabase.from('portfolio_projects').select('id', { count: 'exact', head: true }),
      supabase.from('agents').select('id', { count: 'exact', head: true }),
      supabase.from('agent_conversations').select('id', { count: 'exact', head: true }),
    ]);

    const leads = leadsRes.data ?? [];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    const newLeads = leads.filter((l) => (l.status ?? 'new') === 'new').length;

    setStats({
      leads: leads.length,
      newLeads,
      articles: articlesRes.count ?? 0,
      resources: resourcesRes.count ?? 0,
      portfolio: portfolioRes.count ?? 0,
      agents: agentsRes.count ?? 0,
      agentConversations: agentConvoRes.count ?? 0,
    });
    setRecentLeads(leads.slice(0, 8) as Lead[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-bold text-2xl text-white">Dashboard</h1>
          <p className="text-sm text-brand-secondary mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-brand-secondary hover:text-white hover:border-white/20 text-sm transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Leads"
          value={loading ? '—' : stats.leads}
          sub={stats.newLeads > 0 ? `${stats.newLeads} unreviewed` : 'All reviewed'}
          color="text-primary"
          href="/admin/leads"
        />
        <StatCard
          icon={Bot}
          label="AI Agents"
          value={loading ? '—' : stats.agents}
          sub={stats.agentConversations > 0 ? `${stats.agentConversations} conversations` : 'No chats yet'}
          color="text-accent"
          href="/admin/agents"
        />
        <StatCard
          icon={FileText}
          label="Articles"
          value={loading ? '—' : stats.articles}
          sub="Published & drafts"
          color="text-accent"
          href="/admin/articles"
        />
        <StatCard
          icon={Briefcase}
          label="Portfolio"
          value={loading ? '—' : stats.portfolio}
          sub="Case studies"
          color="text-brand-success"
          href="/admin/portfolio"
        />
      </div>

      {/* Recent leads */}
      <div className="rounded-2xl border border-white/8 bg-brand-card/30 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-primary" />
            <h2 className="font-tight font-semibold text-white">Recent Leads</h2>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            View all <ArrowRight size={11} />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-brand-secondary text-sm">
              <RefreshCw size={15} className="animate-spin" />
              Loading...
            </div>
          </div>
        ) : recentLeads.length === 0 ? (
          <div className="text-center py-12">
            <Users size={32} className="text-brand-secondary/30 mx-auto mb-2" />
            <p className="text-brand-secondary text-sm">No leads yet</p>
            <p className="text-brand-secondary/60 text-xs mt-1">Leads will appear here when visitors submit the contact form.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider hidden lg:table-cell">Interest</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider hidden md:table-cell">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-white/5 hover:bg-white/3 transition-colors ${
                      i === recentLeads.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-medium text-white">{lead.name}</p>
                        {lead.company && <p className="text-xs text-brand-secondary">{lead.company}</p>}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-brand-secondary hidden sm:table-cell">{lead.email}</td>
                    <td className="px-5 py-3.5 text-brand-secondary hidden lg:table-cell">
                      {lead.service_interest ?? '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[lead.status ?? 'new']}`}>
                        {lead.status ?? 'new'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-brand-secondary/60 text-xs hidden md:table-cell">
                      {timeAgo(lead.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Create AI Agent', href: '/admin/agents', icon: Bot, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
          { label: 'Write New Article', href: '/admin/articles', icon: FileText, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
          { label: 'Add Portfolio Project', href: '/admin/portfolio', icon: Briefcase, color: 'text-brand-success', bg: 'bg-brand-success/10', border: 'border-brand-success/20' },
        ].map(({ label, href, icon: Icon, color, bg, border }) => (
          <Link
            key={label}
            href={href}
            className={`group flex items-center gap-3 p-4 rounded-xl border ${border} ${bg} bg-brand-card/20 hover:scale-[1.02] transition-all`}
          >
            <Icon size={18} className={color} />
            <span className="font-medium text-sm text-white">{label}</span>
            <ArrowRight size={13} className="ml-auto text-brand-secondary/40 group-hover:text-brand-secondary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
