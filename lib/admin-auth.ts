'use client';

import { createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';

export type AdminPermission = { module: string; action: string };

export type AdminRole = {
  id: string;
  name: string;
  description: string | null;
  is_super_admin: boolean;
  permissions?: AdminPermission[];
};

export type AdminUserProfile = {
  user_id: string;
  email: string;
  display_name: string | null;
  role_id: string | null;
  role: AdminRole | null;
};

type PermCtx = {
  profile: AdminUserProfile | null;
  allowed: Set<string>;
  isSuperAdmin: boolean;
};

const Ctx = createContext<PermCtx>({ profile: null, allowed: new Set(), isSuperAdmin: false });
export const AdminPermsProvider = Ctx.Provider;
export const useAdminPerms = () => useContext(Ctx);

const MODULE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  leads: 'Leads',
  agents: 'AI Agents',
  articles: 'Articles',
  resources: 'Resources',
  portfolio: 'Portfolio',
  testimonials: 'Testimonials',
  services: 'Services',
  solutions: 'Solutions',
  settings: 'Settings',
  users: 'Admin Users',
  roles: 'Roles & Permissions',
};

const ACTION_LABELS: Record<string, string> = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete',
};

export function moduleLabel(m: string) { return MODULE_LABELS[m] ?? m; }
export function actionLabel(a: string) { return ACTION_LABELS[a] ?? a; }
export const MODULES = Object.keys(MODULE_LABELS);
export const ACTIONS = ['view', 'create', 'edit', 'delete'];

export async function loadAdminProfile(): Promise<AdminUserProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('user_id, display_name, role_id, role:admin_roles(id, name, description, is_super_admin)')
    .eq('user_id', user.id)
    .maybeSingle() as { data: any };

  return {
    user_id: user.id,
    email: user.email ?? '',
    display_name: profile?.display_name ?? null,
    role_id: profile?.role_id ?? null,
    role: profile?.role ?? null,
  };
}

export async function loadPermissions(): Promise<{ profile: AdminUserProfile | null; allowed: Set<string> }> {
  const profile = await loadAdminProfile();
  if (!profile) return { profile: null, allowed: new Set() };

  if (profile.role?.is_super_admin) {
    return { profile, allowed: new Set(['*']) };
  }

  if (!profile.role_id) return { profile, allowed: new Set() };

  const { data: perms } = await supabase
    .from('admin_role_permissions')
    .select('permission:admin_permissions(module, action)')
    .eq('role_id', profile.role_id) as { data: any };

  const allowed = new Set<string>();
  (perms ?? []).forEach((p: any) => {
    if (p?.permission) allowed.add(`${p.permission.module}:${p.permission.action}`);
  });
  return { profile, allowed };
}

export function can(allowed: Set<string>, module: string, action: string): boolean {
  if (allowed.has('*')) return true;
  return allowed.has(`${module}:${action}`);
}

export function canView(allowed: Set<string>, module: string): boolean {
  return can(allowed, module, 'view');
}
