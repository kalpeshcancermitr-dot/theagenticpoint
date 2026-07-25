import { Star, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Testimonial = {
  id: string;
  author_name: string;
  author_title: string;
  company: string;
  content: string;
  rating: number;
};

async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('id, author_name, author_title, company, content, rating')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .limit(6);

  if (error || !data) return [];
  return data as Testimonial[];
}

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="section-pad surface-void relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="aurora-orb w-[600px] h-[600px] top-[20%] left-[20%] aurora-purple opacity-40" />
      </div>

      <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
          <div className="eyebrow">Client Stories</div>
          <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em]">
            Trusted by{' '}
            <span className="gradient-text">forward-thinking teams</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="card-elevated card-hover space-y-4 flex flex-col">
              <Quote size={18} className="text-brand-primary shrink-0" />
              <p className="text-sm text-brand-tertiary leading-relaxed font-light flex-1">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-1 pt-2 border-t border-brand-inkline">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < t.rating ? 'fill-brand-accent text-brand-accent' : 'text-brand-slate'}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full surface-cobalt border border-brand-hairline flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {t.author_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{t.author_name}</p>
                  <p className="text-xs text-brand-secondary">{t.author_title}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
