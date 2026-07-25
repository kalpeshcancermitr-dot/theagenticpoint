import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getSettings } from '@/lib/getSettings';

export default async function CTASection() {
  const settings = await getSettings();
  const title = settings['cta_title'] || 'Ready to put your business on autopilot?';
  const subtitle =
    settings['cta_subtitle'] ||
    'Book a free consultation. We\'ll map your automation opportunities and show you exactly where AI can save you time and money.';

  return (
    <section className="section-pad surface-abyss">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative card-highlight overflow-hidden text-center py-16 px-6 sm:px-12">
          {/* Aurora glow inside highlight card */}
          <div className="absolute inset-0 opacity-60">
            <div className="aurora-orb w-[400px] h-[400px] top-[-30%] left-[-10%] aurora-purple" />
            <div className="aurora-orb w-[350px] h-[350px] bottom-[-30%] right-[-10%] aurora-pink animation-delay-500" />
          </div>

          <div className="relative space-y-6 max-w-2xl mx-auto">
            <div className="badge-primary inline-flex items-center gap-1.5">
              <Sparkles size={11} />
              Free Consultation
            </div>
            <h2 className="font-tight font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.025em] leading-[1.1]">
              {title}
            </h2>
            <p className="text-brand-tertiary text-base lg:text-lg font-light max-w-xl mx-auto">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link href="/contact" className="pill-cta flex items-center gap-2 group">
                {settings['cta_button_text'] || 'Book a Call'}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/playground" className="ghost-btn">
                Explore Playground
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
