import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, ArrowLeft, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

type Solution = {
  id: string; slug: string; title: string; tagline: string | null;
  description: string | null; accent_color: string; roi: string | null;
  challenges: { title: string; detail?: string }[];
  offerings: { title: string; detail?: string }[];
  results: { metric?: string; label?: string }[];
  tech_stack: string[];
  case_study_headline: string | null;
  case_study_detail: string | null;
};

async function getSolution(slug: string) {
  const { data } = await supabase
    .from('solutions')
    .select('*')
    .eq('slug', slug)
    .maybeSingle<Solution>();
  return data;
}

export async function generateStaticParams() {
  const { data } = await supabase.from('solutions').select('slug');
  return (data ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sol = await getSolution(params.slug);
  if (!sol) return { title: 'Solution Not Found' };
  return { title: sol.title, description: (sol.description ?? '').slice(0, 160) };
}

export default async function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = await getSolution(params.slug);
  if (!solution) notFound();
  const c = solution.accent_color;

  return (
    <div className="min-h-screen surface-void">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[500px] h-[400px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-40" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions" className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />All Solutions
          </Link>
          <div className="mb-6">
            {solution.tagline && <div className="text-sm font-medium mb-2" style={{ color: c }}>{solution.tagline}</div>}
            <h1 className="font-tight font-semibold text-4xl lg:text-5xl text-white tracking-[-0.03em]">{solution.title}</h1>
          </div>
          {solution.description && <p className="text-lg text-brand-secondary leading-relaxed max-w-2xl font-light">{solution.description}</p>}
        </div>
      </section>

      {solution.results?.length > 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl border" style={{ backgroundColor: `${c}0d`, borderColor: `${c}33` }}>
              {solution.results.map((r, i) => (
                <div key={i} className="text-center">
                  <div className="font-tight font-semibold text-3xl" style={{ color: c }}>{r.metric}</div>
                  <div className="text-sm text-brand-secondary mt-1 font-light">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="font-tight font-medium text-2xl text-white">The Challenges</h2>
              <div className="space-y-3">
                {(solution.challenges ?? []).map((ch, i) => (
                  <div key={i} className="card-elevated space-y-1">
                    <div className="font-medium text-white text-sm">{ch.title}</div>
                    {ch.detail && <div className="text-brand-secondary text-sm leading-relaxed font-light">{ch.detail}</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="font-tight font-medium text-2xl text-white">Our Solutions</h2>
              <div className="space-y-3">
                {(solution.offerings ?? []).map((of, i) => (
                  <div key={i} className="rounded-xl border p-4 space-y-1" style={{ backgroundColor: `${c}0d`, borderColor: `${c}33` }}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} style={{ color: c }} />
                      <div className="font-medium text-sm" style={{ color: c }}>{of.title}</div>
                    </div>
                    {of.detail && <div className="text-brand-secondary text-sm leading-relaxed pl-5 font-light">{of.detail}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {solution.case_study_headline && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card-highlight p-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} style={{ color: c }} />
                <span className="eyebrow" style={{ color: c }}>Case Study</span>
              </div>
              <h3 className="font-tight font-medium text-xl text-white mb-3">{solution.case_study_headline}</h3>
              {solution.case_study_detail && <p className="text-brand-tertiary leading-relaxed font-light">{solution.case_study_detail}</p>}
            </div>
          </div>
        </section>
      )}

      {solution.tech_stack?.length > 0 && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-tight font-medium text-xl text-white mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {solution.tech_stack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg border text-sm font-mono font-medium" style={{ color: c, backgroundColor: `${c}1a`, borderColor: `${c}40` }}>{tech}</span>
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
            <h2 className="font-tight font-medium text-2xl text-white">Ready to automate your {solution.title.split(' ').slice(0, 2).join(' ')} operations?</h2>
            <p className="text-brand-tertiary max-w-md mx-auto font-light">Book a free 30-minute strategy session. We&apos;ll map your workflows and show you exactly what&apos;s possible.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="pill-cta flex items-center justify-center gap-2">Book Discovery Call<ArrowRight size={15} /></Link>
              <Link href="/solutions" className="ghost-btn flex items-center justify-center gap-2">View All Solutions</Link>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}
