import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  metadataBase: new URL('https://agenticpoint.com'),
  title: {
    default: 'AgenticPoint — Building AI Employees for Modern Businesses',
    template: '%s | AgenticPoint',
  },
  description:
    'AgenticPoint is an AI Automation Studio that designs, builds, and deploys intelligent AI systems for businesses — from WhatsApp AI assistants to complete workflow automation.',
  keywords: [
    'AI automation',
    'AI employees',
    'workflow automation',
    'WhatsApp AI',
    'n8n automation',
    'business AI',
    'AI agents',
    'AI assistant',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agenticpoint.com',
    siteName: 'AgenticPoint',
    title: 'AgenticPoint — Building AI Employees for Modern Businesses',
    description:
      'AI Automation Studio designing intelligent systems that automate workflows, streamline operations, and create exceptional customer experiences.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgenticPoint — AI Automation Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgenticPoint — Building AI Employees for Modern Businesses',
    description: 'AI Automation Studio building intelligent systems for real businesses.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans bg-brand-bg text-brand-text antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
