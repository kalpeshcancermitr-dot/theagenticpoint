import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import CTASection from '@/components/home/CTASection';
import type { Metadata } from 'next';

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
};

async function getProject(slug: string): Promise<Project | null> {
  const { data } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return data as Project | null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.outcome ?? `Case study: ${project.title}`,
  };
}

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

function getColor(category: string) {
  return categoryColors[category] || 'text-primary bg-primary/10 border-primary/20';
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const colorClass = getColor(project.category);
  const [colorText] = colorClass.split(' ');

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Back nav */}
      <div className="pt-24 pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
              {project.category}
            </span>
          </div>

          <h1 className="font-tight font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          {project.outcome && (
            <div className={`inline-flex items-start gap-2.5 px-5 py-3 rounded-2xl border ${colorClass} bg-white/3`}>
              <CheckCircle2 size={16} className={`${colorText} mt-0.5 shrink-0`} />
              <p className="text-sm font-medium text-white leading-relaxed">{project.outcome}</p>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Challenge */}
            {project.challenge && (
              <div className="p-6 rounded-2xl border border-white/8 bg-brand-card/40 space-y-3">
                <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium">The Challenge</p>
                <p className="text-brand-secondary leading-relaxed">{project.challenge}</p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div className="p-6 rounded-2xl border border-white/8 bg-brand-card/40 space-y-3">
                <p className="text-xs uppercase tracking-wider text-brand-success/70 font-medium">The Solution</p>
                <p className="text-white/80 leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>

          {/* Tech stack */}
          {project.tech_stack?.length > 0 && (
            <div className="p-6 rounded-2xl border border-white/8 bg-brand-card/40 space-y-4">
              <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium">Technology Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3.5 py-1.5 rounded-xl text-sm font-mono font-medium border ${colorClass}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className={`p-8 rounded-3xl border ${colorClass.split(' ').slice(1).join(' ')} bg-white/2 text-center space-y-4`}>
            <h2 className="font-tight font-bold text-2xl text-white">Want a Similar System?</h2>
            <p className="text-brand-secondary max-w-md mx-auto">
              We can design and deploy a production version of this AI system tailored to your business within 2-4 weeks.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all hover:scale-105"
              >
                Discuss Your Project
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white font-semibold hover:bg-white/5 transition-all"
              >
                <ExternalLink size={14} />
                Try Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All projects */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/portfolio"
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/10 text-brand-secondary hover:text-white hover:border-white/20 transition-all text-sm font-medium"
        >
          View All Case Studies
          <ArrowRight size={14} />
        </Link>
      </div>

      <CTASection />
    </div>
  );
}
