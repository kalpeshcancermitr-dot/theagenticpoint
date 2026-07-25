'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAdminPerms, can, moduleLabel, actionLabel, MODULES, ACTIONS } from '@/lib/admin-auth';
import { Plus, Shield, RefreshCw, X, Loader2, Edit2, Trash2, Check } from 'lucide-react';

type Role = { id: string; name: string; description: string | null; is_super_admin: boolean };
type Permission = { id: string; module: string; action: string };
type RolePerm = { role_id: string; permission: Permission };

export default function RolesPage() {
  const { allowed, isSuperAdmin } = useAdminPerms();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePerms, setRolePerms] = useState<Record<string, Set<string>>>({});
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState<Role | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!can(allowed, 'roles', 'view')) return;
    fetchData();
  }, [allowed]);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: rolesData }, { data: permsData }, { data: rpData }] = await Promise.all([
      supabase.from('admin_roles').select('*'),
      supabase.from('admin_permissions').select('*'),
      supabase.from('admin_role_permissions').select('role_id, permission:admin_permissions(id, module, action)'),
    ]);
    setRoles((rolesData ?? []) as Role[]);
    setPermissions((permsData ?? []) as Permission[]);

    const map: Record<string, Set<string>> = {};
    (rpData ?? []).forEach((rp: any) => {
      const rid = rp.role_id;
      if (!map[rid]) map[rid] = new Set();
      if (rp.permission) map[rid].add(`${rp.permission.module}:${rp.permission.action}`);
    });
    setRolePerms(map);
    setLoading(false);
  };

  if (!can(allowed, 'roles', 'view')) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Shield size={40} className="text-brand-secondary/30 mx-auto mb-3" />
          <p className="text-white font-medium">You don&apos;t have permission to view this page</p>
        </div>
      </div>
    );
  }

  const canManage = isSuperAdmin || can(allowed, 'roles', 'edit');

  const togglePerm = async (roleId: string, permKey: string) => {
    if (!canManage) return;
    const [module, action] = permKey.split(':');
    const perm = permissions.find((p) => p.module === module && p.action === action);
    if (!perm) return;

    const has = rolePerms[roleId]?.has(permKey);
    setRolePerms((prev) => {
      const next = { ...prev };
      const set = new Set(next[roleId] ?? []);
      if (has) set.delete(permKey); else set.add(permKey);
      next[roleId] = set;
      return next;
    });

    if (has) {
      await supabase.from('admin_role_permissions').delete().eq('role_id', roleId).eq('permission_id', perm.id);
    } else {
      await supabase.from('admin_role_permissions').insert({ role_id: roleId, permission_id: perm.id });
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-semibold text-2xl text-white">Roles & Permissions</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{roles.length} roles · {permissions.length} permissions</p>
        </div>
        {canManage && can(allowed, 'roles', 'create') && (
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold transition-all hover:scale-105">
            <Plus size={15} /> New Role
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm">
          <RefreshCw size={15} className="animate-spin" /> Loading...
        </div>
      ) : (
        <div className="space-y-6">
          {roles.map((role) => (
            <div key={role.id} className="rounded-2xl border border-brand-edge surface-deep-sea/30 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-brand-edge">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${role.is_super_admin ? 'bg-yellow-400/10 border border-yellow-400/30' : 'bg-brand-primary/10 border border-brand-primary/30'}`}>
                    <Shield size={16} className={role.is_super_admin ? 'text-yellow-400' : 'text-brand-primary'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-tight font-semibold text-white">{role.name}</h3>
                      {role.is_super_admin && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium text-yellow-400 bg-yellow-400/10 border border-yellow-400/30">Super Admin</span>
                      )}
                    </div>
                    {role.description && <p className="text-xs text-brand-secondary mt-0.5">{role.description}</p>}
                  </div>
                </div>
                {canManage && !role.is_super_admin && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditTarget(role)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => setDeleteTarget(role)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>

              {!role.is_super_admin && (
                <div className="p-5">
                  <p className="text-xs font-medium text-brand-secondary uppercase tracking-wider mb-3">
                    Module Permissions {canManage && '— click to toggle'}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-brand-edge">
                          <th className="text-left py-2 px-3 text-xs font-medium text-brand-secondary/70">Module</th>
                          {ACTIONS.map((a) => (
                            <th key={a} className="text-center py-2 px-3 text-xs font-medium text-brand-secondary/70 uppercase">{actionLabel(a)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {MODULES.map((module) => (
                          <tr key={module} className="border-b border-white/5 last:border-b-0">
                            <td className="py-2.5 px-3 text-sm text-white font-medium">{moduleLabel(module)}</td>
                            {ACTIONS.map((action) => {
                              const permKey = `${module}:${action}`;
                              const exists = permissions.some((p) => p.module === module && p.action === action);
                              const granted = rolePerms[role.id]?.has(permKey);
                              if (!exists) return <td key={action} className="text-center py-2.5 px-3 text-brand-slate">—</td>;
                              return (
                                <td key={action} className="text-center py-2.5 px-3">
                                  <button
                                    onClick={() => togglePerm(role.id, permKey)}
                                    disabled={!canManage}
                                    className={`inline-flex items-center justify-center w-7 h-7 rounded-lg transition-all ${
                                      granted
                                        ? 'bg-brand-success/15 text-brand-success border border-brand-success/30'
                                        : 'bg-white/5 text-brand-slate border border-brand-edge hover:text-brand-secondary'
                                    } ${canManage ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                  >
                                    {granted ? <Check size={13} /> : ''}
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {role.is_super_admin && (
                <div className="p-5">
                  <p className="text-sm text-brand-secondary">Super Admin roles have unrestricted access to all modules and actions.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm shadow-card max-w-sm">
          {error}
          <button onClick={() => setError('')} className="ml-3 text-red-400/60 hover:text-red-400">Dismiss</button>
        </div>
      )}

      {(showCreate || editTarget) && (
        <RoleForm
          initial={editTarget}
          onClose={() => { setShowCreate(false); setEditTarget(null); }}
          onSave={async (name, description) => {
            setSaving(true);
            if (editTarget) {
              const { error } = await supabase.from('admin_roles').update({ name, description }).eq('id', editTarget.id);
              if (error) setError(error.message);
            } else {
              const { error } = await supabase.from('admin_roles').insert({ name, description, is_super_admin: false });
              if (error) setError(error.message);
            }
            setSaving(false);
            setShowCreate(false);
            setEditTarget(null);
            fetchData();
          }}
          saving={saving}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-strong rounded-2xl border border-brand-hairline p-7 max-w-sm w-full shadow-card">
            <h3 className="font-tight font-semibold text-white mb-2">Delete Role?</h3>
            <p className="text-sm text-brand-secondary mb-5">Users with this role will lose their permissions. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={async () => {
                const { error } = await supabase.from('admin_roles').delete().eq('id', deleteTarget.id);
                if (error) setError(error.message);
                setDeleteTarget(null);
                fetchData();
              }} className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 rounded-xl border border-brand-edge text-brand-secondary text-sm font-semibold hover:text-white">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleForm({ initial, onClose, onSave, saving }: {
  initial: Role | null;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
  saving: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass-strong rounded-2xl border border-brand-hairline w-full max-w-md shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge">
          <h2 className="font-tight font-semibold text-white">{initial ? 'Edit Role' : 'New Role'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Role Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Content Manager"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary resize-none" />
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={() => onSave(name, description)} disabled={saving || !name}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold disabled:opacity-50">
            {saving && <Loader2 size={14} className="animate-spin" />}
            {initial ? 'Save Changes' : 'Create Role'}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-brand-edge text-brand-secondary text-sm font-semibold hover:text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}
