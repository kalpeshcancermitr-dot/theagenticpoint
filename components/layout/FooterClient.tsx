'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Zap, Twitter, Linkedin, Github, Mail } from 'lucide-react';

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

type FooterProps = {
  contactEmail: string;
  twitterUrl: string;
  linkedinUrl: string;
  githubUrl: string;
};

export default function FooterClient({ contactEmail, twitterUrl, linkedinUrl, githubUrl }: FooterProps) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const socialLinks = [
    { icon: Twitter, href: twitterUrl, label: 'Twitter' },
    { icon: Linkedin, href: linkedinUrl, label: 'LinkedIn' },
    { icon: Github, href: githubUrl, label: 'GitHub' },
  ].filter((s) => s.href);

  return (
    <footer className="relative border-t border-brand-edge surface-abyss">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-accent-gradient flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <span className="font-tight font-semibold text-2xl text-white tracking-tight">
                Agentic<span className="gradient-text">Point</span>
              </span>
            </Link>

            <p className="text-brand-secondary text-sm leading-relaxed max-w-xs font-light">
              An AI Automation Studio building intelligent systems that automate business operations, streamline workflows, and create exceptional customer experiences.
            </p>

            <div className="space-y-3">
              <p className="eyebrow">Get in touch</p>
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2 text-sm text-brand-secondary hover:text-white transition-colors group"
              >
                <Mail size={14} className="text-brand-primary" />
                <span>{contactEmail}</span>
              </a>
            </div>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg border border-brand-edge surface-deep-sea flex items-center justify-center text-brand-secondary hover:text-white hover:border-brand-hairline transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="font-tight font-medium text-sm text-white">{category}</h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-secondary hover:text-white transition-colors duration-200 block font-light"
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
        <div className="mt-16 pt-8 border-t border-brand-edge flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-secondary font-light">
            &copy; {new Date().getFullYear()} AgenticPoint. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-brand-secondary font-light">Building AI Employees for Modern Businesses</span>
            <span className="text-brand-primary">&#9670;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
