import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  Workflow, MessageSquare, Mic, Bot, Brain, FileText,
  Database, Mail, ArrowRight, Check, Zap, type LucideIcon
} from 'lucide-react';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'AI Automation Services',
  description: 'Explore AgenticPoint\'s full range of AI automation services — from WhatsApp AI and voice agents to workflow automation and document intelligence.',
};

const ICON_MAP: Record<string, LucideIcon> = {
  Workflow, MessageSquare, Mic, Bot, Brain, FileText, Database, Mail, Zap,
};

type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  icon: string;
  accent_color: string;
  problem: string | null;
  solution: string | null;
  benefits: string[];
  tech_stack: string[];
  sort_order: number;
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Workflow;
}

export default async function ServicesPage() {
  const { data } = await supabase
    .from('services')
    .select('id, slug, title, tagline, icon, accent_color, problem, solution, benefits, tech_stack, sort_order')
    .eq('is_published', true)
    .order('sort_order');

  const services = (data ?? []) as Service[];

  return (
    <div className="min-h-screen surface-void">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[600px] h-[500px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex items-center gap-1.5"><Zap size={11} />Our Services</div>
          <h1 className="font-tight font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em]">
            AI Systems Built for <span className="gradient-text">Every Business Need</span>
          </h1>
          <p className="text-base lg:text-lg text-brand-secondary max-w-2xl mx-auto leading-relaxed font-light">
            From customer-facing AI assistants to complex internal automation — we build production-ready systems that transform how your business operates.
          </p>
          <Link href="/contact" className="pill-cta inline-flex items-center gap-2">Discuss Your Project<ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const isEven = i % 2 === 0;
            return (
              <div key={service.id} id={service.slug} className="card-elevated scroll-mt-24 grid lg:grid-cols-2 gap-8 items-start">
                <div className={`space-y-6 ${isEven ? '' : 'lg:order-2'}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${service.accent_color}1a`, borderColor: `${service.accent_color}40` }}>
                    <Icon size={24} style={{ color: service.accent_color }} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-tight font-medium text-2xl lg:text-3xl text-white">{service.title}</h2>
                    {service.tagline && <p className="text-base font-medium" style={{ color: service.accent_color }}>{service.tagline}</p>}
                  </div>
                  <div className="space-y-4">
                    {service.problem && (<div><p className="eyebrow mb-2">The Problem</p><p className="text-brand-secondary leading-relaxed font-light">{service.problem}</p></div>)}
                    {service.solution && (<div><p className="eyebrow mb-2" style={{ color: '#3bdc8c99' }}>Our Solution</p><p className="text-brand-tertiary leading-relaxed font-light">{service.solution}</p></div>)}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 border" style={{ backgroundColor: `${service.accent_color}1a`, borderColor: `${service.accent_color}40`, color: service.accent_color }}>
                      Build This System<ArrowRight size={14} />
                    </Link>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 border border-brand-edge text-brand-secondary hover:text-white hover:border-brand-hairline">
                      Learn More<ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className={`space-y-4 ${isEven ? '' : 'lg:order-1'}`}>
                  {service.benefits?.length > 0 && (
                    <div className="surface-deep-sea rounded-xl p-5 border border-brand-inkline">
                      <p className="eyebrow mb-3">Key Benefits</p>
                      <ul className="space-y-2.5">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5 text-sm text-brand-secondary">
                            <Check size={15} style={{ color: service.accent_color }} className="mt-0.5 shrink-0" /><span className="font-light">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.tech_stack?.length > 0 && (
                    <div className="surface-deep-sea rounded-xl p-5 border border-brand-inkline">
                      <p className="eyebrow mb-3">Technology Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {service.tech_stack.map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium font-mono border" style={{ backgroundColor: `${service.accent_color}1a`, borderColor: `${service.accent_color}40`, color: service.accent_color }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <CTASection />
    </div>
  );
}
