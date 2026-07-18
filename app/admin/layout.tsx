'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  Zap, LayoutDashboard, Users, FileText, Package,
  Briefcase, Settings, LogOut, Menu, X, ChevronRight,
  ExternalLink, Loader2, MessageSquare
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Articles', href: '/admin/articles', icon: FileText },
  { label: 'Resources', href: '/admin/resources', icon: Package },
  { label: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function AdminSidebar({
  user,
  onLogout,
  mobileOpen,
  onMobileClose,
}: {
  user: { email?: string } | null;
  onLogout: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = usePathname();

  const isActive = (item: { href: string; exact?: boolean }) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 flex flex-col bg-brand-surface border-r border-white/8 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center shadow-glow-sm">
              <Zap size={15} className="text-white fill-white" />
            </div>
            <div>
              <span className="font-tight font-bold text-sm text-white block leading-none">AgenticPoint</span>
              <span className="text-xs text-brand-secondary leading-none">Admin</span>
            </div>
          </Link>
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 rounded-lg text-brand-secondary hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-primary/12 text-white border border-primary/20'
                    : 'text-brand-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={active ? 'text-primary' : ''} />
                {item.label}
                {active && <ChevronRight size={13} className="ml-auto text-primary/60" />}
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-white/8">
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

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {user?.email?.charAt(0).toUpperCase() ?? 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.email ?? 'Admin'}</p>
              <p className="text-xs text-brand-secondary">Administrator</p>
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
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/admin/login');
        setChecking(false);
      } else {
        setUser({ email: session.user.email });
        setChecking(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (!session && !isLoginPage) {
          router.replace('/admin/login');
        } else if (session) {
          setUser({ email: session.user.email });
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
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="text-primary animate-spin" />
          <p className="text-sm text-brand-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden">
      <AdminSidebar
        user={user}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-brand-surface">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg text-brand-secondary hover:text-white"
          >
            <Menu size={20} />
          </button>
          <span className="font-tight font-semibold text-white text-sm">Admin</span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
