'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Filter, RefreshCw, Users, Eye, CheckCircle, Archive, X, Mail, Building2, Tag, MessageSquare } from 'lucide-react';

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service_interest: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const statusConfig = {
  new: { label: 'New', color: 'text-brand-primary bg-brand-primary/10 border-brand-primary/30' },
  reviewed: { label: 'Reviewed', color: 'text-brand-success bg-brand-success/10 border-brand-success/20' },
  archived: { label: 'Archived', color: 'text-brand-secondary bg-white/5 border-brand-edge' },
};

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

function LeadDetail({ lead, onClose, onStatusChange }: { lead: Lead; onClose: () => void; onStatusChange: (id: string, status: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg glass-strong rounded-2xl border border-brand-hairline shadow-card overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge">
          <div>
            <h2 className="font-tight font-semibold text-white">{lead.name}</h2>
            <p className="text-sm text-brand-secondary">{lead.email}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-brand-secondary/60 uppercase tracking-wider">
                <Building2 size={11} /> Company
              </div>
              <p className="text-sm text-white">{lead.company ?? 'Not provided'}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-brand-secondary/60 uppercase tracking-wider">
                <Tag size={11} /> Service Interest
              </div>
              <p className="text-sm text-white">{lead.service_interest ?? 'Not specified'}</p>
            </div>
          </div>

          {lead.message && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-brand-secondary/60 uppercase tracking-wider">
                <MessageSquare size={11} /> Message
              </div>
              <div className="p-3.5 rounded-xl bg-white/4 border border-brand-edge text-sm text-brand-secondary leading-relaxed">
                {lead.message}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-brand-secondary/60">{new Date(lead.created_at).toLocaleString()}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig[lead.status as keyof typeof statusConfig]?.color ?? statusConfig.new.color}`}>
              {statusConfig[lead.status as keyof typeof statusConfig]?.label ?? 'New'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-5 flex flex-wrap gap-2">
          <a
            href={`mailto:${lead.email}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/80 transition-colors"
          >
            <Mail size={13} /> Reply via Email
          </a>
          {(lead.status ?? 'new') !== 'reviewed' && (
            <button
              onClick={() => onStatusChange(lead.id, 'reviewed')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-success/10 border border-brand-success/20 text-brand-success text-sm font-medium hover:bg-brand-success/20 transition-colors"
            >
              <CheckCircle size={13} /> Mark Reviewed
            </button>
          )}
          {(lead.status ?? 'new') !== 'archived' && (
            <button
              onClick={() => onStatusChange(lead.id, 'archived')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-brand-edge text-brand-secondary text-sm font-medium hover:text-white transition-colors"
            >
              <Archive size={13} /> Archive
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [saveError, setSaveError] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });
    setLeads((data ?? []) as Lead[]);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_requests')
      .update({ status })
      .eq('id', id);
    if (error) {
      setSaveError(`Failed to update lead status: ${error.message}`);
    } else {
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
      setSelectedLead((prev) => prev?.id === id ? { ...prev, status } : prev);
    }
  };

  const filtered = leads.filter((l) => {
    const matchesSearch = !search || [l.name, l.email, l.company ?? '', l.service_interest ?? '']
      .some((v) => v.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || (l.status ?? 'new') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: leads.length,
    new: leads.filter((l) => (l.status ?? 'new') === 'new').length,
    reviewed: leads.filter((l) => l.status === 'reviewed').length,
    archived: leads.filter((l) => l.status === 'archived').length,
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-semibold text-2xl text-white">Leads</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{counts.new} unreviewed leads</p>
        </div>
        <button
          onClick={fetchLeads}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-edge text-brand-secondary hover:text-white text-sm transition-all"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-brand-edge">
          {(['all', 'new', 'reviewed', 'archived'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                statusFilter === s ? 'bg-brand-primary text-white' : 'text-brand-secondary hover:text-white'
              }`}
            >
              {s} ({counts[s]})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-brand-edge surface-deep-sea/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-2 text-brand-secondary text-sm">
              <RefreshCw size={15} className="animate-spin" />
              Loading leads...
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users size={36} className="text-brand-secondary/20 mx-auto mb-3" />
            <p className="text-brand-secondary font-medium">No leads found</p>
            <p className="text-brand-secondary/60 text-sm mt-1">
              {search || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Leads from the contact form will appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-edge">
                  {['Name', 'Email', 'Company', 'Service', 'Status', 'Time', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => {
                  const status = (lead.status ?? 'new') as keyof typeof statusConfig;
                  return (
                    <tr
                      key={lead.id}
                      className={`border-b border-brand-inkline hover:bg-white/3 transition-colors cursor-pointer ${i === filtered.length - 1 ? 'border-b-0' : ''}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-5 py-3.5 font-medium text-white">{lead.name}</td>
                      <td className="px-5 py-3.5 text-brand-secondary">{lead.email}</td>
                      <td className="px-5 py-3.5 text-brand-secondary">{lead.company ?? '—'}</td>
                      <td className="px-5 py-3.5 text-brand-secondary">{lead.service_interest ?? '—'}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig[status]?.color ?? statusConfig.new.color}`}>
                          {statusConfig[status]?.label ?? 'New'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-brand-secondary/60 text-xs">{timeAgo(lead.created_at)}</td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                          className="p-1.5 rounded-lg text-brand-secondary/50 hover:text-white hover:bg-brand-edge transition-all"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {saveError && (
        <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm shadow-card max-w-sm">
          {saveError}
          <button onClick={() => setSaveError('')} className="ml-3 text-red-400/60 hover:text-red-400">Dismiss</button>
        </div>
      )}

      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
