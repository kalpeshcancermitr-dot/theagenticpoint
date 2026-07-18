import { supabase } from '@/lib/supabase';
import { Star, Quote } from 'lucide-react';

type Testimonial = {
  id: string;
  client_name: string;
  client_title: string | null;
  content: string;
  rating: number | null;
};

async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('id, client_name, client_title, content, rating')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  return (data as Testimonial[]) ?? [];
}

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="section-pad bg-brand-surface relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-4">
          <div className="badge-primary inline-flex">Testimonials</div>
          <h2 className="font-tight font-bold text-4xl lg:text-5xl text-white">
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group flex flex-col p-6 rounded-2xl border border-white/8 bg-brand-card/40 card-hover space-y-4"
            >
              <div className="flex items-center justify-between">
                <Quote size={20} className="text-primary/40" />
                {t.rating && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                )}
              </div>

              <p className="text-brand-secondary text-sm leading-relaxed flex-1">&ldquo;{t.content}&rdquo;</p>

              <div className="pt-3 border-t border-white/8">
                <p className="font-tight font-semibold text-white text-sm">{t.client_name}</p>
                {t.client_title && (
                  <p className="text-xs text-brand-secondary mt-0.5">{t.client_title}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
