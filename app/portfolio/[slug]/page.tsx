import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Star } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import type { Metadata } from 'next';

type Project = {
  id: string; title: string; slug: string; category: string;
  challenge: string | null; solution: string | null; outcome: string | null;
  tech_stack: string[]; is_featured: boolean; is_case_study: boolean;
  case_study_headline: string | null; case_study_detail: string | null;
  detailed_sections: { heading: string; body: string }[];
};

type Testimonial = {
  id: string; client_name: string; client_title: string | null;
  content: string; rating: number | null;
};

const categoryColors: Record<string, string> = {
  'WhatsApp AI': '#3bdc8c', 'Healthcare AI': '#fb7185', 'Business Automation': '#625fff',
  'AI Assistants': '#2862d7', 'Document AI': '#facc15', 'Internal AI Tools': '#fb923c',
  'CRM Automation': '#a78bfa', 'HR Automation': '#2dd4bf', 'Voice AI': '#2dd4bf',
};

function getColor(category: string) { return categoryColors[category] ?? '#2862d7'; }

async function getProject(slug: string): Promise<Project | null> {
  const { data } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle<Project>();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return { title: project.title, description: project.outcome ?? `Case study: ${project.title}` };
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) notFound();
  const c = getColor(project.category);

  const { data: linkedRows } = await supabase
    .from('portfolio_testimonials')
    .select('testimonial_id')
    .eq('project_id', project.id)
    .order('sort_order');

  let testimonials: Testimonial[] = [];
  if (linkedRows && linkedRows.length > 0) {
    const ids = linkedRows.map((r) => r.testimonial_id);
    const { data: testRows } = await supabase
      .from('testimonials')
      .select('id, client_name, client_title, content, rating')
      .in('id', ids);
    testimonials = (testRows ?? []) as Testimonial[];
  }

  const detailedSections = Array.isArray(project.detailed_sections) ? project.detailed_sections : [];

  return (
    <div className="min-h-screen surface-void">
      <div className="pt-24 pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-white transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />Back to Portfolio
          </Link>
        </div>
      </div>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[500px] h-[400px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-30" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border" style={{ color: c, backgroundColor: `${c}1a`, borderColor: `${c}40` }}>{project.category}</span>
            {project.is_case_study && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border" style={{ color: '#3bdc8c', backgroundColor: '#3bdc8c1a', borderColor: '#3bdc8c40' }}>
                <CheckCircle2 size={11} /> Verified Case Study
              </span>
            )}
          </div>
          <h1 className="font-tight font-semibold text-4xl lg:text-5xl text-white tracking-[-0.03em] leading-tight">{project.title}</h1>
          {project.outcome && (
            <div className="inline-flex items-start gap-2.5 px-5 py-3 rounded-2xl border" style={{ backgroundColor: `${c}0d`, borderColor: `${c}33` }}>
              <CheckCircle2 size={16} style={{ color: c }} className="mt-0.5 shrink-0" />
              <p className="text-sm font-medium text-white leading-relaxed">{project.outcome}</p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {project.challenge && (<div className="card-elevated space-y-3"><p className="eyebrow">The Challenge</p><p className="text-brand-secondary leading-relaxed font-light">{project.challenge}</p></div>)}
            {project.solution && (<div className="card-elevated space-y-3"><p className="eyebrow" style={{ color: '#3bdc8c99' }}>The Solution</p><p className="text-brand-tertiary leading-relaxed font-light">{project.solution}</p></div>)}
          </div>
        </div>
      </section>

      {project.case_study_headline && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card-highlight p-8">
              <h2 className="font-tight font-medium text-2xl text-white mb-4">{project.case_study_headline}</h2>
              {project.case_study_detail && <p className="text-brand-tertiary leading-relaxed font-light">{project.case_study_detail}</p>}
            </div>
          </div>
        </section>
      )}

      {detailedSections.length > 0 && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {detailedSections.map((sec, i) => (
              <div key={i} className="card-elevated space-y-3">
                <h3 className="font-tight font-medium text-xl text-white">{sec.heading}</h3>
                <p className="text-brand-secondary leading-relaxed font-light whitespace-pre-line">{sec.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.tech_stack?.length > 0 && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card-elevated space-y-4">
              <p className="eyebrow">Technology Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span key={tech} className="px-3.5 py-1.5 rounded-xl text-sm font-mono font-medium border" style={{ color: c, backgroundColor: `${c}1a`, borderColor: `${c}40` }}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-tight font-medium text-2xl text-white mb-6">Client Testimonials</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="card-elevated space-y-3">
                  {t.rating && (<div className="flex items-center gap-0.5">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />))}</div>)}
                  <p className="text-sm text-brand-tertiary leading-relaxed font-light">&ldquo;{t.content}&rdquo;</p>
                  <div><p className="text-sm font-medium text-white">{t.client_name}</p>{t.client_title && <p className="text-xs text-brand-secondary">{t.client_title}</p>}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-highlight text-center space-y-4">
            <h2 className="font-tight font-medium text-2xl text-white">Want a Similar System?</h2>
            <p className="text-brand-tertiary max-w-md mx-auto font-light">We can design and deploy a production version of this AI system tailored to your business within 2-4 weeks.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="pill-cta flex items-center gap-2">Discuss Your Project<ArrowRight size={14} /></Link>
              <Link href="/playground" className="ghost-btn flex items-center gap-2"><ExternalLink size={14} />Try Live Demo</Link>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}
