import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Project = {
  title: string;
  slug: string;
  category: string;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  tech_stack: string[];
  is_case_study: boolean;
};

const categoryColors: Record<string, string> = {
  'WhatsApp AI': 'text-green-400 bg-green-400/10 border-green-400/20',
  'Healthcare AI': 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  'Business Automation': 'text-accent bg-accent/10 border-accent/20',
  'AI Assistants': 'text-primary bg-primary/10 border-primary/20',
  'Document AI': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Internal AI Tools': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
};

function getColor(category: string) {
  return categoryColors[category] || 'text-primary bg-primary/10 border-primary/20';
}

function ProjectCard({ project }: { project: Project }) {
  const colorClass = getColor(project.category);

  return (
    <div className="group flex flex-col p-6 rounded-2xl border border-white/8 bg-brand-card/40 card-hover h-full">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
          {project.category}
        </span>
        {!project.is_case_study && (
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 text-brand-secondary/60 bg-white/3">
            Example scenario
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-tight font-bold text-white text-xl mb-3 group-hover:text-primary transition-colors duration-200">
        {project.title}
      </h3>

      {/* Challenge */}
      {project.challenge && (
        <div className="mb-3">
          <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium mb-1">Challenge</p>
          <p className="text-sm text-brand-secondary leading-relaxed line-clamp-2">{project.challenge}</p>
        </div>
      )}

      {/* Outcome */}
      {project.outcome && (
        <div className="flex-1 mb-4">
          <p className="text-xs uppercase tracking-wider text-brand-success/70 font-medium mb-1">Outcome</p>
          <p className="text-sm text-white/80 leading-relaxed">{project.outcome}</p>
        </div>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(project.tech_stack ?? []).slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-brand-secondary font-mono"
          >
            {tech}
          </span>
        ))}
        {(project.tech_stack ?? []).length > 3 && (
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-brand-secondary">
            +{(project.tech_stack ?? []).length - 3} more
          </span>
        )}
      </div>

      {/* Link */}
      <Link
        href={`/portfolio/${project.slug}`}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
      >
        View details
        <ExternalLink size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

async function getFeaturedProjects(): Promise<Project[]> {
  const { data } = await supabase
    .from('portfolio_projects')
    .select('title, slug, category, challenge, solution, outcome, tech_stack, is_case_study')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(6);
  return (data as Project[]) ?? [];
}

export default async function PortfolioPreview() {
  const projects = await getFeaturedProjects();

  if (projects.length === 0) return null;

  return (
    <section className="section-pad bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-lg">
            <div className="badge-primary inline-flex">Capabilities</div>
            <h2 className="font-tight font-bold text-4xl lg:text-5xl text-white">
              What We Can Build{' '}
              <span className="gradient-text">For You</span>
            </h2>
            <p className="text-brand-secondary">
              Example use cases and system types we specialize in. These illustrate the kinds of AI automation we design and deploy.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white font-medium text-sm hover:bg-white/6 hover:border-white/25 transition-all duration-200 self-start sm:self-auto shrink-0"
          >
            View all projects
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
