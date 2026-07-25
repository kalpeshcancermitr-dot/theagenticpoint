'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { loadPermissions, canView, AdminPermsProvider, type AdminUserProfile } from '@/lib/admin-auth';
import {
  Zap, LayoutDashboard, Users, FileText, Package,
  Briefcase, Settings, LogOut, Menu, X, ChevronRight,
  ExternalLink, Loader2, MessageSquare, Bot, Shield,
  Wrench, Lightbulb, type LucideIcon
} from 'lucide-react';

type NavItem = { label: string; href: string; icon: LucideIcon; module?: string; exact?: boolean };

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, module: 'dashboard', exact: true },
  { label: 'Leads', href: '/admin/leads', icon: Users, module: 'leads' },
  { label: 'AI Agents', href: '/admin/agents', icon: Bot, module: 'agents' },
  { label: 'Articles', href: '/admin/articles', icon: FileText, module: 'articles' },
  { label: 'Resources', href: '/admin/resources', icon: Package, module: 'resources' },
  { label: 'Services', href: '/admin/services', icon: Wrench, module: 'services' },
  { label: 'Solutions', href: '/admin/solutions', icon: Lightbulb, module: 'solutions' },
  { label: 'Portfolio', href: '/admin/portfolio', icon: Briefcase, module: 'portfolio' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare, module: 'testimonials' },
  { label: 'Users', href: '/admin/users', icon: Users, module: 'users' },
  { label: 'Roles', href: '/admin/roles', icon: Shield, module: 'roles' },
  { label: 'Settings', href: '/admin/settings', icon: Settings, module: 'settings' },
];

function AdminSidebar({
  user,
  onLogout,
  mobileOpen,
  onMobileClose,
  allowed,
}: {
  user: AdminUserProfile | null;
  onLogout: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  allowed: Set<string>;
}) {
  const pathname = usePathname();

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const visible = navItems.filter((item) => !item.module || canView(allowed, item.module));

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onMobileClose} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 flex flex-col surface-abyss border-r border-brand-edge transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-edge">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg accent-cta flex items-center justify-center">
              <Zap size={15} className="text-white fill-white" />
            </div>
            <div>
              <span className="font-tight font-semibold text-sm text-white block leading-none">AgenticPoint</span>
              <span className="text-xs text-brand-secondary leading-none">Admin</span>
            </div>
          </Link>
          <button onClick={onMobileClose} className="lg:hidden p-1 rounded-lg text-brand-secondary hover:text-white">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {visible.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-brand-primary/12 text-white border border-brand-primary/30'
                    : 'text-brand-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={active ? 'text-brand-primary' : ''} />
                {item.label}
                {active && <ChevronRight size={13} className="ml-auto text-brand-primary/60" />}
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-brand-edge">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-secondary hover:text-white hover:bg-white/5 transition-all"
            >
              <ExternalLink size={16} />
              View Website
            </Link>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-brand-edge space-y-1">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center">
              <span className="text-xs font-semibold text-brand-primary">
                {user?.display_name?.charAt(0).toUpperCase() ?? user?.email?.charAt(0).toUpperCase() ?? 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.display_name ?? user?.email ?? 'Admin'}</p>
              <p className="text-xs text-brand-secondary">{user?.role?.name ?? 'No role'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-secondary hover:text-red-400 hover:bg-red-500/8 transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [profile, setProfile] = useState<AdminUserProfile | null>(null);
  const [allowed, setAllowed] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/admin/login');
        setChecking(false);
        return;
      }

      const { profile, allowed } = await loadPermissions();
      if (!profile) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error: insertErr } = await supabase
            .from('admin_profiles')
            .insert({ user_id: user.id, display_name: user.email });
          if (insertErr) {
            console.error('Failed to create admin profile:', insertErr.message);
          }
          const retry = await loadPermissions();
          setProfile(retry.profile);
          setAllowed(retry.allowed);
          if (!retry.profile || retry.allowed.size === 0) {
            setAllowed(new Set(['*']));
          }
        }
      } else {
        setProfile(profile);
        if (allowed.size === 0 && !profile.role_id) {
          setAllowed(new Set(['*']));
        } else {
          setAllowed(allowed);
        }
      }
      setChecking(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (!session && !isLoginPage) {
          router.replace('/admin/login');
        } else if (session) {
          const { profile, allowed } = await loadPermissions();
          setProfile(profile);
          setAllowed(allowed);
        }
      })();
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen surface-void flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="text-brand-primary animate-spin" />
          <p className="text-sm text-brand-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminPermsProvider value={{ profile, allowed, isSuperAdmin: allowed.has('*') }}>
      <div className="flex h-screen surface-void overflow-hidden">
        <AdminSidebar
          user={profile}
          onLogout={handleLogout}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          allowed={allowed}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-brand-edge surface-abyss">
            <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg text-brand-secondary hover:text-white">
              <Menu size={20} />
            </button>
            <span className="font-tight font-semibold text-white text-sm">Admin</span>
          </div>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminPermsProvider>
  );
}
