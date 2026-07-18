import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: "Portfolio — AI Systems We've Built",
  description:
    'Real AI automation systems built and deployed for businesses — from WhatsApp AI to document intelligence and CRM automation.',
};

const categoryColors: Record<string, string> = {
  'WhatsApp AI': 'text-green-400 bg-green-400/10 border-green-400/20',
  'Healthcare AI': 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  'Business Automation': 'text-accent bg-accent/10 border-accent/20',
  'AI Assistants': 'text-primary bg-primary/10 border-primary/20',
  'Document AI': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Internal AI Tools': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'CRM Automation': 'text-purple-400 bg-purple-400/8 border-purple-400/20',
  'HR Automation': 'text-teal-400 bg-teal-400/10 border-teal-400/20',
};

function getColorClass(category: string) {
  return categoryColors[category] ?? 'text-primary bg-primary/10 border-primary/20';
}

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

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-primary opacity-25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Briefcase size={11} />
            Portfolio
          </div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
            Real AI Systems,{' '}
            <span className="gradient-text">Measurable Results</span>
          </h1>
          <p className="text-xl text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Every project here is a production system we designed, built, and deployed for real businesses. No
            mock-ups. No theoretical demos.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
            {[
              { value: '50+', label: 'Systems Deployed' },
              { value: '12', label: 'Industries Served' },
              { value: '95%', label: 'Client Retention' },
              { value: '2-4 wks', label: 'Avg Delivery' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-tight font-bold text-3xl gradient-text">{value}</div>
                <div className="text-sm text-brand-secondary mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {projects.length === 0 ? (
            <div className="text-center py-20 text-brand-secondary">No projects yet. Check back soon.</div>
          ) : (
            projects.map((project) => {
              const colorClass = getColorClass(project.category);
              const [colorText, colorBg, colorBorder] = colorClass.split(' ');
              return (
                <article
                  key={project.slug}
                  className={`p-8 rounded-3xl border ${colorBorder} ${colorBg} bg-brand-card/30 group`}
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
                          {project.category}
                        </span>
                        {project.is_featured && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium border border-primary/30 text-primary bg-primary/10">
                            Featured
                          </span>
                        )}
                      </div>

                      <h2
                        className={`font-tight font-bold text-2xl text-white group-hover:${colorText} transition-colors duration-200`}
                      >
                        {project.title}
                      </h2>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {project.challenge && (
                          <div className="space-y-1.5">
                            <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium">
                              Challenge
                            </p>
                            <p className="text-sm text-brand-secondary leading-relaxed">{project.challenge}</p>
                          </div>
                        )}
                        {project.outcome && (
                          <div className="space-y-1.5">
                            <p className="text-xs uppercase tracking-wider text-brand-success/70 font-medium">
                              Outcome
                            </p>
                            <p className="text-sm text-white/80 leading-relaxed">{project.outcome}</p>
                          </div>
                        )}
                      </div>

                      {project.tech_stack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech_stack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${colorBg} border ${colorBorder} ${colorText}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: CTA */}
                    <div className="space-y-4 flex flex-col justify-between">
                      <div className="glass rounded-2xl p-5 border border-white/8">
                        <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium mb-3">
                          Solution
                        </p>
                        <p className="text-sm text-brand-secondary leading-relaxed line-clamp-4">
                          {project.solution ?? 'See full case study for details.'}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/portfolio/${project.slug}`}
                          className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${colorBg} ${colorText} border ${colorBorder}`}
                        >
                          View Full Case Study
                          <ArrowRight size={14} />
                        </Link>
                        <Link
                          href="/contact"
                          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all border border-white/10 text-brand-secondary hover:text-white hover:border-white/20"
                        >
                          Build Something Similar
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
