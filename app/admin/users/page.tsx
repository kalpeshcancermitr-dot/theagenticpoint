'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAdminPerms, can, loadPermissions, type AdminUserProfile } from '@/lib/admin-auth';
import { Plus, Search, RefreshCw, Users as UsersIcon, Edit2, Trash2, X, Loader2, Shield, Mail } from 'lucide-react';

type Role = { id: string; name: string; description: string | null; is_super_admin: boolean };

type AdminUser = {
  user_id: string;
  display_name: string | null;
  role_id: string | null;
  role: Role | null;
  email: string;
};

export default function AdminUsersPage() {
  const { allowed, isSuperAdmin } = useAdminPerms();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (!can(allowed, 'users', 'view')) return;
    fetchData();
  }, [allowed]);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: profiles }, { data: rolesData }] = await Promise.all([
      supabase.from('admin_profiles').select('user_id, display_name, role_id, role:admin_roles(id, name, description, is_super_admin)'),
      supabase.from('admin_roles').select('*'),
    ]);
    setRoles((rolesData ?? []) as unknown as Role[]);

    const profilesList = (profiles ?? []) as any[];
    const usersWithEmails: AdminUser[] = [];
    for (const p of profilesList) {
      const { data: u } = await supabase.auth.admin.getUserById(p.user_id);
      usersWithEmails.push({
        user_id: p.user_id,
        display_name: p.display_name,
        role_id: p.role_id,
        role: p.role,
        email: u?.user?.email ?? '',
      });
    }
    setUsers(usersWithEmails);
    setLoading(false);
  };

  const canManage = isSuperAdmin || can(allowed, 'users', 'edit');

  const filtered = users.filter((u) =>
    !search || [u.email, u.display_name, u.role?.name].some((v) => (v ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  if (!can(allowed, 'users', 'view')) {
    return <NoAccess />;
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-tight font-semibold text-2xl text-white">Admin Users</h1>
          <p className="text-sm text-brand-secondary mt-0.5">{users.length} users · {roles.length} roles</p>
        </div>
        {canManage && can(allowed, 'users', 'create') && (
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold transition-all hover:scale-105"
          >
            <Plus size={15} /> Invite User
          </button>
        )}
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary"
        />
      </div>

      <div className="rounded-2xl border border-brand-edge surface-deep-sea/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-brand-secondary text-sm">
            <RefreshCw size={15} className="animate-spin" /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <UsersIcon size={36} className="text-brand-secondary/20 mx-auto mb-3" />
            <p className="text-brand-secondary font-medium">No users found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-edge">
                {['User', 'Role', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-brand-secondary/70 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.user_id} className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-b-0">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-brand-primary">{u.email.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{u.display_name ?? u.email}</p>
                        <p className="text-xs text-brand-secondary">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    {u.role ? (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        u.role.is_super_admin
                          ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
                          : 'text-brand-primary bg-brand-primary/10 border-brand-primary/30'
                      }`}>
                        <Shield size={10} />
                        {u.role.name}
                      </span>
                    ) : (
                      <span className="text-xs text-brand-secondary">No role assigned</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {canManage && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => setEditTarget(u)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-all">
                          <Edit2 size={13} />
                        </button>
                        {isSuperAdmin && u.role?.is_super_admin !== true && (
                          <button onClick={() => setDeleteTarget(u)} className="p-1.5 rounded-lg text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all">
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {error && (
        <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm shadow-card max-w-sm">
          {error}
          <button onClick={() => setError('')} className="ml-3 text-red-400/60 hover:text-red-400">Dismiss</button>
        </div>
      )}

      {showInvite && (
        <InviteModal
          roles={roles}
          onClose={() => setShowInvite(false)}
          onDone={() => { setShowInvite(false); fetchData(); }}
          onError={setError}
        />
      )}

      {editTarget && (
        <EditRoleModal
          user={editTarget}
          roles={roles}
          onClose={() => setEditTarget(null)}
          onDone={() => { setEditTarget(null); fetchData(); }}
          onError={setError}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          user={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDone={async () => {
            const { error } = await supabase.from('admin_profiles').delete().eq('user_id', deleteTarget.user_id);
            if (error) setError(error.message);
            else { setDeleteTarget(null); fetchData(); }
          }}
        />
      )}
    </div>
  );
}

function InviteModal({ roles, onClose, onDone, onError }: {
  roles: Role[];
  onClose: () => void;
  onDone: () => void;
  onError: (m: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [roleId, setRoleId] = useState(roles.find((r) => !r.is_super_admin)?.id ?? '');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleInvite = async () => {
    setSaving(true);
    onError('');
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: password || undefined,
      email_confirm: true,
      user_metadata: { display_name: displayName },
    });
    if (error) {
      onError(error.message);
      setSaving(false);
      return;
    }
    if (data.user) {
      const { error: profileErr } = await supabase.from('admin_profiles').insert({
        user_id: data.user.id,
        display_name: displayName || email,
        role_id: roleId || null,
      });
      if (profileErr) onError(profileErr.message);
    }
    setSaving(false);
    onDone();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass-strong rounded-2xl border border-brand-hairline w-full max-w-md shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge">
          <h2 className="font-tight font-semibold text-white">Invite Admin User</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Email *</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary/50" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="new.admin@agenticpoint.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Display Name</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Jane Smith"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Temporary Password (optional)</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Leave blank for email invite"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white placeholder-brand-secondary/40 text-sm focus:outline-none focus:border-brand-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Role</label>
            <select value={roleId} onChange={(e) => setRoleId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary">
              {roles.map((r) => <option key={r.id} value={r.id}>{r.name}{r.is_super_admin ? ' (Super Admin)' : ''}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={handleInvite} disabled={saving || !email}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold disabled:opacity-50">
            {saving && <Loader2 size={14} className="animate-spin" />}
            Create User
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-brand-edge text-brand-secondary text-sm font-semibold hover:text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function EditRoleModal({ user, roles, onClose, onDone, onError }: {
  user: AdminUser;
  roles: Role[];
  onClose: () => void;
  onDone: () => void;
  onError: (m: string) => void;
}) {
  const [roleId, setRoleId] = useState(user.role_id ?? '');
  const [displayName, setDisplayName] = useState(user.display_name ?? '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('admin_profiles')
      .update({ role_id: roleId || null, display_name: displayName || null })
      .eq('user_id', user.user_id);
    if (error) onError(error.message);
    setSaving(false);
    onDone();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass-strong rounded-2xl border border-brand-hairline w-full max-w-md shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-edge">
          <h2 className="font-tight font-semibold text-white">Edit User</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-brand-secondary hover:text-white"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-brand-edge">
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center">
              <span className="text-sm font-semibold text-brand-primary">{user.email.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium text-white text-sm">{user.email}</p>
              <p className="text-xs text-brand-secondary">{user.role?.name ?? 'No role'}</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Display Name</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brand-secondary uppercase tracking-wider">Role</label>
            <select value={roleId} onChange={(e) => setRoleId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl surface-deep-sea border border-brand-edge text-white text-sm focus:outline-none focus:border-brand-primary">
              <option value="">No role</option>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.name}{r.is_super_admin ? ' (Super Admin)' : ''}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={handleSave} disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl accent-cta text-white text-sm font-semibold disabled:opacity-50">
            {saving && <Loader2 size={14} className="animate-spin" />}
            Save Changes
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-brand-edge text-brand-secondary text-sm font-semibold hover:text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ user, onClose, onDone }: { user: AdminUser; onClose: () => void; onDone: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass-strong rounded-2xl border border-brand-hairline p-7 max-w-sm w-full shadow-card">
        <h3 className="font-tight font-semibold text-white mb-2">Remove Admin User?</h3>
        <p className="text-sm text-brand-secondary mb-5">
          {user.email} will lose access to the dashboard. Their auth account will be deleted.
        </p>
        <div className="flex gap-3">
          <button onClick={async () => { await supabase.auth.admin.deleteUser(user.user_id); onDone(); }}
            className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold">Remove</button>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-brand-edge text-brand-secondary text-sm font-semibold hover:text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function NoAccess() {
  return (
    <div className="p-8 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Shield size={40} className="text-brand-secondary/30 mx-auto mb-3" />
        <p className="text-white font-medium">You don&apos;t have permission to view this page</p>
        <p className="text-sm text-brand-secondary mt-1">Contact a super admin to request access.</p>
      </div>
    </div>
  );
}
