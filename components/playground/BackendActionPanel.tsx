'use client';

import { useEffect, useState } from 'react';
import {
  Calendar, UserPlus, FileText, Mail, ShoppingCart,
  Activity, CheckCircle2, type LucideIcon
} from 'lucide-react';

type ActionType = 'lead_qualified' | 'appointment_booked' | 'order_processed' | 'email_sent' | 'ticket_created' | 'document_processed';

type BackendAction = {
  id: string;
  type: ActionType;
  label: string;
  detail: string;
  status: 'completed' | 'processing';
  timestamp: number;
};

type AgentSlug = string;

const AGENT_ACTION_MAP: Record<string, ActionType[]> = {
  'lead-qualification': ['lead_qualified', 'email_sent', 'appointment_booked'],
  'appointment': ['appointment_booked', 'email_sent'],
  'customer-support': ['ticket_created', 'email_sent'],
  'document-intelligence': ['document_processed', 'email_sent'],
  'email-assistant': ['email_sent'],
  'proposal-generator': ['document_processed', 'email_sent'],
  'healthcare-followup': ['appointment_booked', 'email_sent'],
  'knowledge-base': ['ticket_created'],
};

const ACTION_META: Record<ActionType, { icon: LucideIcon; label: string; color: string }> = {
  lead_qualified: { icon: UserPlus, label: 'Lead Qualified', color: '#625fff' },
  appointment_booked: { icon: Calendar, label: 'Appointment Booked', color: '#2862d7' },
  order_processed: { icon: ShoppingCart, label: 'Order Processed', color: '#3bdc8c' },
  email_sent: { icon: Mail, label: 'Email Sent', color: '#fb923c' },
  ticket_created: { icon: FileText, label: 'Ticket Created', color: '#facc15' },
  document_processed: { icon: FileText, label: 'Document Processed', color: '#a78bfa' },
};

const TEMPLATES: Record<ActionType, string[]> = {
  lead_qualified: [
    'New lead: Sarah Chen (sarah@techcorp.io)',
    'Lead scored: 87/100 — High priority',
    'Lead routed to sales team #2',
  ],
  appointment_booked: [
    'Booked: Mar 15, 2:00 PM PST',
    'Calendar synced — Google Calendar updated',
    'Confirmation sent to client email',
  ],
  order_processed: [
    'Order #4821 processed — $4,250',
    'Inventory updated — 3 items reserved',
    'Shipping label generated',
  ],
  email_sent: [
    'Follow-up email sent to prospect',
    'Quote email delivered to 3 recipients',
    'Reminder email scheduled for tomorrow',
  ],
  ticket_created: [
    'Support ticket #8821 created',
    'Ticket assigned to Tier 2 team',
    'SLA timer started — 4hr resolution target',
  ],
  document_processed: [
    'Invoice INV-2024-0892 extracted',
    'Data validated — 14 fields captured',
    'Record synced to accounting system',
  ],
};

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function BackendActionPanel({ agentSlug, messageCount, color }: {
  agentSlug: string;
  messageCount: number;
  color: { dot: string; bg: string; border: string; text: string };
}) {
  const [actions, setActions] = useState<BackendAction[]>([]);
  const [metricCount, setMetricCount] = useState({ leads: 0, appointments: 0, emails: 0, tickets: 0 });

  const allowedActions = AGENT_ACTION_MAP[agentSlug] ?? ['email_sent'];

  useEffect(() => {
    if (messageCount === 0) return;

    const actionType = allowedActions[messageCount % allowedActions.length];
    const templates = TEMPLATES[actionType];
    const detail = templates[messageCount % templates.length];

    const newAction: BackendAction = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: actionType,
      label: ACTION_META[actionType].label,
      detail,
      status: 'processing',
      timestamp: Date.now(),
    };

    setActions((prev) => [newAction, ...prev].slice(0, 8));

    const timer = setTimeout(() => {
      setActions((prev) =>
        prev.map((a) => a.id === newAction.id ? { ...a, status: 'completed' } : a)
      );

      if (actionType === 'lead_qualified') setMetricCount((m) => ({ ...m, leads: m.leads + 1 }));
      if (actionType === 'appointment_booked') setMetricCount((m) => ({ ...m, appointments: m.appointments + 1 }));
      if (actionType === 'email_sent') setMetricCount((m) => ({ ...m, emails: m.emails + 1 }));
      if (actionType === 'ticket_created') setMetricCount((m) => ({ ...m, tickets: m.tickets + 1 }));
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageCount]);

  const stats = [
    { label: 'Leads', value: metricCount.leads, color: '#625fff' },
    { label: 'Appointments', value: metricCount.appointments, color: '#2862d7' },
    { label: 'Emails', value: metricCount.emails, color: '#fb923c' },
    { label: 'Tickets', value: metricCount.tickets, color: '#facc15' },
  ].filter((s) => allowedActions.some((a) =>
    (s.label === 'Leads' && a === 'lead_qualified') ||
    (s.label === 'Appointments' && a === 'appointment_booked') ||
    (s.label === 'Emails' && a === 'email_sent') ||
    (s.label === 'Tickets' && a === 'ticket_created')
  ));

  return (
    <div className="surface-abyss rounded-2xl border border-brand-inkline overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-brand-inkline">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color.bg, border: `1px solid ${color.border}` }}>
          <Activity size={15} style={{ color: color.dot }} />
        </div>
        <div className="flex-1">
          <p className="font-tight font-medium text-sm text-white">Backend Actions</p>
          <p className="text-xs text-brand-secondary">Live activity feed</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-brand-success">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
          Live
        </span>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-px bg-brand-inkline">
          {stats.map((stat) => (
            <div key={stat.label} className="surface-abyss px-4 py-3 text-center">
              <div className="font-tight font-semibold text-xl" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-brand-secondary font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Action feed */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[400px]" style={{ minHeight: '200px' }}>
        {actions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 py-10 text-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color.bg, border: `1px solid ${color.border}` }}>
              <Activity size={18} style={{ color: color.dot }} />
            </div>
            <div>
              <p className="text-sm text-white font-medium">No actions yet</p>
              <p className="text-xs text-brand-secondary mt-0.5 font-light">Start chatting to see the agent work</p>
            </div>
          </div>
        ) : (
          actions.map((action) => {
            const meta = ACTION_META[action.type];
            const Icon = meta.icon;
            return (
              <div
                key={action.id}
                className="flex items-start gap-2.5 p-2.5 rounded-lg surface-deep-sea border border-brand-inkline animate-slide-up"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${meta.color}1a`, border: `1px solid ${meta.color}40` }}
                >
                  {action.status === 'completed' ? (
                    <CheckCircle2 size={14} style={{ color: meta.color }} />
                  ) : (
                    <Icon size={13} style={{ color: meta.color }} className="animate-pulse" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white">{action.label}</span>
                    <span className="text-[10px] text-brand-slate font-mono ml-auto">{timeAgo(action.timestamp)}</span>
                  </div>
                  <p className="text-xs text-brand-secondary font-light mt-0.5 truncate">{action.detail}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-brand-inkline">
        <p className="text-[10px] text-brand-slate text-center font-light">
          Actions simulate what this agent does in production deployments
        </p>
      </div>
    </div>
  );
}
