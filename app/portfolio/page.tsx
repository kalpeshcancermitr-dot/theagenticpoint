import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: "Portfolio — AI Systems We've Built",
  description: 'Real AI automation systems built and deployed for businesses — from WhatsApp AI to document intelligence and CRM automation.',
};

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  tech_stack: string[];
  is_featured: boolean;
  sort_order: number;
};

async function getProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('sort_order', { ascending: true });
  return (data as Project[]) ?? [];
}

const stats = [
  { value: '50+', label: 'Systems Deployed' },
  { value: '12', label: 'Industries Served' },
  { value: '95%', label: 'Client Retention' },
  { value: '2-4 wks', label: 'Avg Delivery' },
];

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen surface-void">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[600px] h-[500px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Briefcase size={11} />
            Portfolio
          </div>
          <h1 className="font-tight font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em]">
            Real AI Systems,{' '}
            <span className="gradient-text">Measurable Results</span>
          </h1>
          <p className="text-base lg:text-lg text-brand-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Every project here is a production system we designed, built, and deployed for real businesses. No mock-ups. No theoretical demos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-tight font-semibold text-2xl lg:text-3xl gradient-text">{value}</div>
                <div className="text-sm text-brand-secondary mt-1 font-light">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {projects.length === 0 ? (
            <div className="text-center py-20 text-brand-secondary font-light">No projects yet. Check back soon.</div>
          ) : (
            projects.map((project) => (
              <article key={project.slug} className="card-elevated card-hover">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="badge-primary">{project.category}</span>
                      {project.is_featured && (
                        <span className="badge-primary" style={{ background: 'rgba(98,95,255,0.15)', color: '#85a6e9', borderColor: 'rgba(98,95,255,0.3)' }}>
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="font-tight font-medium text-xl lg:text-2xl text-white">{project.title}</h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {project.challenge && (
                        <div className="space-y-1.5">
                          <p className="eyebrow">Challenge</p>
                          <p className="text-sm text-brand-secondary leading-relaxed font-light">{project.challenge}</p>
                        </div>
                      )}
                      {project.outcome && (
                        <div className="space-y-1.5">
                          <p className="eyebrow" style={{ color: '#3bdc8c99' }}>Outcome</p>
                          <p className="text-sm text-brand-tertiary leading-relaxed font-light">{project.outcome}</p>
                        </div>
                      )}
                    </div>

                    {project.tech_stack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech_stack.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-full text-xs font-mono font-medium badge-primary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="surface-deep-sea rounded-xl p-5 border border-brand-inkline">
                      <p className="eyebrow mb-3">Solution</p>
                      <p className="text-sm text-brand-secondary leading-relaxed font-light line-clamp-4">
                        {project.solution ?? 'See full case study for details.'}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link href={`/portfolio/${project.slug}`} className="pill-cta flex items-center justify-center gap-2 w-full text-sm">
                        View Case Study
                        <ArrowRight size={14} />
                      </Link>
                      <Link
                        href="/contact"
                        className="ghost-btn flex items-center justify-center gap-2 w-full text-sm"
                      >
                        Build Something Similar
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
