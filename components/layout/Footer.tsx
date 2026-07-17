'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Zap, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'AI Workflow Automation', href: '/services#automation' },
    { label: 'WhatsApp AI Solutions', href: '/services#whatsapp' },
    { label: 'Voice AI Agents', href: '/services#voice' },
    { label: 'Document Intelligence', href: '/services#document' },
    { label: 'CRM Automation', href: '/services#crm' },
    { label: 'Custom AI Development', href: '/services#custom' },
  ],
  Solutions: [
    { label: 'Healthcare AI', href: '/solutions/healthcare' },
    { label: 'Real Estate', href: '/solutions/real-estate' },
    { label: 'E-Commerce', href: '/solutions/ecommerce' },
    { label: 'Professional Services', href: '/solutions/professional-services' },
    { label: 'Recruitment', href: '/solutions/recruitment' },
    { label: 'Finance', href: '/solutions/finance' },
  ],
  Resources: [
    { label: 'Blog', href: '/resources#blog' },
    { label: 'n8n Templates', href: '/resources#templates' },
    { label: 'Automation Guides', href: '/resources#guides' },
    { label: 'ROI Calculator', href: '/resources#calculator' },
    { label: 'Prompt Library', href: '/resources#prompts' },
    { label: 'WhatsApp API Guide', href: '/resources#whatsapp-guide' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'AI Playground', href: '/playground' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return (
    <footer className="relative border-t border-white/8 bg-brand-surface">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary-gradient flex items-center justify-center shadow-glow-sm">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <span className="font-tight font-bold text-2xl text-white tracking-tight">
                Agentic<span className="gradient-text">Point</span>
              </span>
            </Link>

            <p className="text-brand-secondary text-sm leading-relaxed max-w-xs">
              An AI Automation Studio building intelligent systems that automate business operations, streamline workflows, and create exceptional customer experiences.
            </p>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-brand-secondary font-medium">Get in touch</p>
              <a
                href="mailto:hello@agenticpoint.com"
                className="flex items-center gap-2 text-sm text-brand-secondary hover:text-white transition-colors group"
              >
                <Mail size={14} className="text-primary" />
                <span>hello@agenticpoint.com</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
              </a>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-brand-secondary hover:text-white hover:border-white/20 hover:bg-white/6 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="font-tight font-semibold text-sm text-white">{category}</h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-secondary hover:text-white transition-colors duration-200 block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-secondary">
            &copy; {new Date().getFullYear()} AgenticPoint. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-sm text-brand-secondary">Building AI Employees for Modern Businesses</span>
            <span className="text-primary ml-1">&#9670;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
