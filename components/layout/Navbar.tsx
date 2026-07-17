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

  if (pathname.startsWith('/admin')) return null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-strong border-b border-white/10 shadow-card'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="font-tight font-bold text-xl text-white tracking-tight">
                Agentic<span className="gradient-text">Point</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-brand-secondary hover:text-white hover:bg-white/6'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-200 hover:scale-105 active:scale-100"
              >
                Book Discovery Call
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-brand-secondary hover:text-white hover:bg-white/8 transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
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
          className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 glass-strong border-l border-white/10 flex flex-col transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary-gradient flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="font-tight font-bold text-white">AgenticPoint</span>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg text-brand-secondary hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-white bg-white/10 border border-white/10'
                    : 'text-brand-secondary hover:text-white hover:bg-white/6'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t border-white/10">
            <Link
              href="/contact"
              className="block w-full px-5 py-3 rounded-xl bg-primary-gradient text-white text-sm font-semibold text-center shadow-glow-sm"
            >
              Book Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
