import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Industry Solutions',
  description: 'AI automation solutions tailored for healthcare, real estate, e-commerce, recruitment, finance, and more.',
};

type Solution = {
  id: string; slug: string; title: string; tagline: string | null;
  accent_color: string; roi: string | null;
  challenges: { title: string; detail?: string }[];
  offerings: { title: string; detail?: string }[];
};

export default async function SolutionsPage() {
  const { data } = await supabase
    .from('solutions')
    .select('id, slug, title, tagline, accent_color, roi, challenges, offerings')
    .eq('is_published', true)
    .order('sort_order');

  const solutions = (data ?? []) as Solution[];

  return (
    <div className="min-h-screen surface-void">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[600px] h-[500px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="badge-primary inline-flex items-center gap-1.5"><Building2 size={11} />Industry Solutions</div>
          <h1 className="font-tight font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em]">
            AI Built for <span className="gradient-text">Your Industry</span>
          </h1>
          <p className="text-base lg:text-lg text-brand-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Every industry has unique workflows and challenges. We build AI automation systems tailored to how your sector actually operates.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {solutions.map((sol) => (
              <div key={sol.id} id={sol.slug} className="card-elevated card-hover scroll-mt-24">
                <div className="mb-5">
                  <h2 className="font-tight font-medium text-xl lg:text-2xl text-white">{sol.title}</h2>
                  {sol.tagline && <p className="text-sm font-medium mt-0.5" style={{ color: sol.accent_color }}>{sol.tagline}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <p className="eyebrow mb-2 flex items-center gap-1.5"><AlertCircle size={11} />Challenges</p>
                    <ul className="space-y-1.5">
                      {(sol.challenges ?? []).map((ch, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-brand-secondary font-light">
                          <span className="w-1 h-1 rounded-full bg-brand-slate shrink-0" />{ch.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-2 flex items-center gap-1.5" style={{ color: '#3bdc8c99' }}><Check size={11} />Solutions</p>
                    <ul className="space-y-1.5">
                      {(sol.offerings ?? []).map((of, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-brand-tertiary font-light">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: sol.accent_color }} />{of.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-brand-inkline">
                  <div>
                    <p className="eyebrow mb-0.5">Typical ROI</p>
                    <p className="text-sm font-medium" style={{ color: sol.accent_color }}>{sol.roi}</p>
                  </div>
                  <Link href={`/solutions/${sol.slug}`} className="flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5" style={{ color: sol.accent_color }}>
                    Explore<ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}
