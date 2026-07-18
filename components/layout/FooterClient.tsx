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
    <footer
      className="relative"
      style={{ background: '#0b0c0e', borderTop: '1px solid #172540' }}
    >
      {/* Top hairline accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(98,95,255,0.3), transparent)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pulse-violet to-accent flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="font-display font-semibold text-[17px] text-quartz tracking-tight">
                Agentic<span className="gradient-text">Point</span>
              </span>
            </Link>

            <p className="text-ash leading-relaxed max-w-xs" style={{ fontSize: '13px', fontWeight: 300 }}>
              An AI Automation Studio building intelligent systems that automate business operations, streamline workflows, and create exceptional customer experiences.
            </p>

            <div className="space-y-2">
              <p className="section-label">Get in touch</p>
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2 text-ash hover:text-quartz transition-colors group"
                style={{ fontSize: '13px' }}
              >
                <Mail size={13} className="text-frosted-lilac" />
                <span>{contactEmail}</span>
                <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-ash hover:text-quartz transition-colors duration-150"
                    style={{ background: '#0d172b', border: '1px solid #172540' }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-quartz font-medium" style={{ fontSize: '13px' }}>{category}</h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-ash hover:text-quartz transition-colors duration-150 block"
                        style={{ fontSize: '13px', fontWeight: 300 }}
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
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid #172540' }}
        >
          <p className="text-ash" style={{ fontSize: '13px', fontWeight: 300 }}>
            &copy; {new Date().getFullYear()} AgenticPoint. All rights reserved.
          </p>
          <p className="text-ash" style={{ fontSize: '13px', fontWeight: 300 }}>
            Building AI Employees for Modern Businesses
          </p>
        </div>
      </div>
    </footer>
  );
}
