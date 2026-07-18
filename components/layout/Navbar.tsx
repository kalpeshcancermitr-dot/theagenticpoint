'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'AI Playground', href: '/playground' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-void/90 backdrop-blur-xl border-b border-obsidian-edge'
            : 'bg-transparent'
        }`}
        style={{ height: 60 }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pulse-violet to-accent flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="font-display font-semibold text-[17px] text-white tracking-tight">
                Agentic<span className="gradient-text">Point</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-[14px] transition-colors duration-150 ${
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-quartz font-normal'
                      : 'text-ash hover:text-quartz font-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link href="/contact" className="btn-ghost text-sm py-2 px-4">
                Let&apos;s chat
              </Link>
              <Link href="/contact" className="btn-primary text-sm py-2 px-4">
                Book Discovery Call
              </Link>
            </div>

            {/* Mobile button */}
            <button
              className="lg:hidden p-2 rounded-lg text-ash hover:text-quartz transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-void/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-abyss border-l border-obsidian-edge flex flex-col transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-obsidian-edge">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-pulse-violet to-accent flex items-center justify-center">
                <Zap size={12} className="text-white fill-white" />
              </div>
              <span className="font-display font-semibold text-white text-[15px]">AgenticPoint</span>
            </Link>
            <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-lg text-ash hover:text-white">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-lg text-[14px] transition-colors duration-150 ${
                  pathname === link.href
                    ? 'text-quartz bg-deep-sea border border-obsidian-edge'
                    : 'text-ash hover:text-quartz hover:bg-white/4'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-obsidian-edge">
            <Link href="/contact" className="btn-primary w-full justify-center py-2.5 text-sm">
              Book Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
