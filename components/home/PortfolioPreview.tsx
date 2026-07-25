import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Project = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image_url: string | null;
};

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('portfolio')
    .select('slug, title, category, excerpt, image_url')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .limit(3);

  if (error || !data) return [];
  return data as Project[];
}

export default async function PortfolioPreview() {
  const projects = await getProjects();
  if (projects.length === 0) return null;

  return (
    <section className="section-pad surface-abyss">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-xl">
            <div className="eyebrow">Selected Work</div>
            <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em]">
              Real systems.{' '}
              <span className="gradient-text">Real results.</span>
            </h2>
            <p className="text-brand-secondary text-base lg:text-lg font-light">
              A look at recent AI systems we&apos;ve built for clients across industries.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="ghost-btn flex items-center gap-2 self-start md:self-end"
          >
            View all work
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group card-elevated card-hover overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden surface-deep-sea">
                {project.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full grid-bg flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl surface-cobalt border border-brand-hairline flex items-center justify-center">
                      <ArrowRight size={20} className="text-brand-primary" />
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="badge-primary">{project.category}</span>
                </div>
              </div>
              <div className="p-5 space-y-2 flex-1">
                <h3 className="font-tight font-medium text-white text-lg group-hover:text-brand-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-brand-secondary leading-relaxed font-light line-clamp-2">
                  {project.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
