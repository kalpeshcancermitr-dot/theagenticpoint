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
          isScrolled ? 'glass-strong' : 'bg-transparent'
        }`}
      >
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-accent-gradient flex items-center justify-center transition-transform group-hover:scale-110">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="font-tight font-semibold text-lg text-white tracking-tight">
                Agentic<span className="gradient-text">Point</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-normal transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-white'
                      : 'text-brand-secondary hover:text-white'
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
                className="pill-cta text-sm"
              >
                Let&apos;s chat
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-brand-secondary hover:text-white transition-colors"
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
          className="absolute inset-0 bg-brand-bg/90 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 glass-strong flex flex-col transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-brand-edge">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent-gradient flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="font-tight font-semibold text-white">AgenticPoint</span>
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
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-normal transition-colors ${
                  pathname === link.href
                    ? 'text-white bg-brand-highlight/50 border border-brand-hairline'
                    : 'text-brand-secondary hover:text-white hover:bg-white/4'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-5 border-t border-brand-edge">
            <Link
              href="/contact"
              className="pill-cta block w-full text-center"
            >
              Let&apos;s chat
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
