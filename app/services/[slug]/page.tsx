import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Workflow, MessageSquare, Mic, Bot, Brain, FileText,
  Database, Mail, ArrowRight, ArrowLeft, Check, Zap, Star, type LucideIcon
} from 'lucide-react';
import CTASection from '@/components/home/CTASection';

const ICON_MAP: Record<string, LucideIcon> = {
  Workflow, MessageSquare, Mic, Bot, Brain, FileText, Database, Mail, Zap,
};

type Service = {
  id: string; slug: string; title: string; tagline: string | null;
  icon: string; accent_color: string; problem: string | null;
  solution: string | null; benefits: string[]; tech_stack: string[];
};

type Section = {
  id: string; section_type: string; title: string | null; body: string | null;
};

type Testimonial = {
  id: string; client_name: string; client_title: string | null;
  content: string; rating: number | null;
};

async function getService(slug: string) {
  const { data } = await supabase
    .from('services')
    .select('id, slug, title, tagline, icon, accent_color, problem, solution, benefits, tech_stack')
    .eq('slug', slug)
    .maybeSingle<Service>();
  return data;
}

export async function generateStaticParams() {
  const { data } = await supabase.from('services').select('slug');
  return (data ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getService(params.slug);
  if (!service) return { title: 'Service Not Found' };
  return { title: service.title, description: service.tagline ?? service.problem ?? '' };
}

export default async function ServiceLandingPage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug);
  if (!service) notFound();

  const c = service.accent_color;
  const Icon = ICON_MAP[service.icon] ?? Workflow;

  const [{ data: sections }, { data: linkedTestRows }] = await Promise.all([
    supabase.from('service_landing_sections').select('id, section_type, title, body').eq('service_id', service.id).order('sort_order'),
    supabase.from('service_testimonials').select('testimonial_id').eq('service_id', service.id).order('sort_order'),
  ]);

  let testimonials: Testimonial[] = [];
  if (linkedTestRows && linkedTestRows.length > 0) {
    const ids = linkedTestRows.map((r) => r.testimonial_id);
    const { data: testRows } = await supabase
      .from('testimonials')
      .select('id, client_name, client_title, content, rating')
      .in('id', ids);
    testimonials = (testRows ?? []) as Testimonial[];
  }

  return (
    <div className="min-h-screen surface-void">
      <div className="pt-24 pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-white transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />All Services
          </Link>
        </div>
      </div>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[500px] h-[400px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-30" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ backgroundColor: `${c}1a`, borderColor: `${c}40` }}>
            <Icon size={28} style={{ color: c }} />
          </div>
          <div className="space-y-3">
            {service.tagline && <p className="text-base font-medium" style={{ color: c }}>{service.tagline}</p>}
            <h1 className="font-tight font-semibold text-4xl lg:text-5xl text-white tracking-[-0.03em] leading-tight">{service.title}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 border" style={{ backgroundColor: `${c}1a`, borderColor: `${c}40`, color: c }}>
              Build This System<ArrowRight size={14} />
            </Link>
            <Link href="/playground" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-brand-edge text-brand-secondary hover:text-white hover:border-brand-hairline transition-all">
              Try Live Demo<ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {service.problem && (
            <div className="card-elevated space-y-3">
              <p className="eyebrow">The Problem</p>
              <p className="text-brand-secondary leading-relaxed font-light">{service.problem}</p>
            </div>
          )}
          {service.solution && (
            <div className="card-elevated space-y-3">
              <p className="eyebrow" style={{ color: '#3bdc8c99' }}>Our Solution</p>
              <p className="text-brand-tertiary leading-relaxed font-light">{service.solution}</p>
            </div>
          )}
        </div>
      </section>

      {service.benefits?.length > 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-tight font-medium text-2xl text-white mb-6">Key Benefits</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 surface-deep-sea rounded-xl p-5 border border-brand-inkline">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${c}1a`, border: `1px solid ${c}40` }}>
                    <Check size={14} style={{ color: c }} />
                  </div>
                  <p className="text-sm text-brand-secondary font-light leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(sections ?? []).map((sec) => (
        <section key={sec.id} className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {sec.section_type === 'stats' ? (
              <div className="card-highlight p-8 text-center">
                {sec.title && <h3 className="font-tight font-medium text-xl text-white mb-3">{sec.title}</h3>}
                {sec.body && <p className="text-brand-tertiary leading-relaxed font-light">{sec.body}</p>}
              </div>
            ) : sec.section_type === 'cta' ? (
              <div className="card-highlight p-8 text-center space-y-4">
                {sec.title && <h3 className="font-tight font-medium text-xl text-white">{sec.title}</h3>}
                {sec.body && <p className="text-brand-tertiary font-light">{sec.body}</p>}
                <Link href="/contact" className="pill-cta inline-flex items-center gap-2">Get Started<ArrowRight size={14} /></Link>
              </div>
            ) : (
              <div className="card-elevated space-y-3">
                {sec.title && <h3 className="font-tight font-medium text-xl text-white">{sec.title}</h3>}
                {sec.body && <p className="text-brand-secondary leading-relaxed font-light whitespace-pre-line">{sec.body}</p>}
              </div>
            )}
          </div>
        </section>
      ))}

      {service.tech_stack?.length > 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-tight font-medium text-xl text-white mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {service.tech_stack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg text-sm font-mono font-medium border" style={{ color: c, backgroundColor: `${c}1a`, borderColor: `${c}40` }}>{tech}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-tight font-medium text-2xl text-white mb-6">What Clients Say</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="card-elevated space-y-3">
                  {t.rating && (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />))}
                    </div>
                  )}
                  <p className="text-sm text-brand-tertiary leading-relaxed font-light">&ldquo;{t.content}&rdquo;</p>
                  <div>
                    <p className="text-sm font-medium text-white">{t.client_name}</p>
                    {t.client_title && <p className="text-xs text-brand-secondary">{t.client_title}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-highlight text-center space-y-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto" style={{ backgroundColor: `${c}1a`, border: `1px solid ${c}40` }}>
              <Zap size={22} style={{ color: c }} />
            </div>
            <h2 className="font-tight font-medium text-2xl text-white">Ready to build your {service.title.toLowerCase()}?</h2>
            <p className="text-brand-tertiary max-w-md mx-auto font-light">Book a free 30-minute strategy session. We&apos;ll map your workflows and show you exactly what&apos;s possible.</p>
            <Link href="/contact" className="pill-cta inline-flex items-center gap-2">Book Discovery Call<ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}
