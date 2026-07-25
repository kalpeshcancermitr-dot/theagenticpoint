import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, Check, AlertCircle } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Industry Solutions',
  description: 'AI automation solutions tailored for healthcare, real estate, e-commerce, recruitment, finance, and more.',
};

const industries = [
  {
    id: 'healthcare', title: 'Healthcare', tagline: 'Improve patient outcomes while reducing administrative burden.',
    challenges: ['Manual appointment scheduling', 'Poor medication adherence', 'Staff overwhelmed by admin', 'Slow patient communication'],
    solutions: ['Patient follow-up AI', 'Appointment booking agent', 'Intake form automation', 'Insurance verification AI'],
    roi: '40% fewer no-shows, 15hrs/week saved per staff member',
    accent: '#fb7185', href: '/solutions/healthcare',
  },
  {
    id: 'real-estate', title: 'Real Estate', tagline: 'Qualify more leads and close deals faster with AI automation.',
    challenges: ['Slow response to inquiries', 'Manual lead qualification', 'Follow-up delays', 'Admin taking agent time'],
    solutions: ['WhatsApp lead qualification', 'Property inquiry AI', 'Automated follow-up sequences', 'Viewing scheduler bot'],
    roi: '3x qualified meetings, 68% faster response time',
    accent: '#3bdc8c', href: '/solutions/real-estate',
  },
  {
    id: 'ecommerce', title: 'E-Commerce & Retail', tagline: 'Automate support, recover abandoned carts, and increase customer LTV.',
    challenges: ['High support ticket volume', 'Cart abandonment', 'Slow order resolution', 'Manual returns processing'],
    solutions: ['24/7 support AI', 'Abandoned cart recovery', 'Order tracking assistant', 'Returns automation'],
    roi: '78% tickets auto-resolved, 23% cart recovery increase',
    accent: '#2862d7', href: '/solutions/ecommerce',
  },
  {
    id: 'recruitment', title: 'Recruitment & HR', tagline: 'Screen more candidates faster without sacrificing quality.',
    challenges: ['CV screening bottleneck', 'Slow candidate communication', 'Poor candidate experience', 'Inconsistent screening'],
    solutions: ['AI CV screening', 'Candidate follow-up AI', 'Interview scheduling bot', 'Onboarding automation'],
    roi: '85% faster screening, 30% improvement in hire quality',
    accent: '#2dd4bf', href: '/solutions/recruitment',
  },
  {
    id: 'professional-services', title: 'Professional Services', tagline: 'Win more business with AI-powered proposals and client management.',
    challenges: ['Slow proposal creation', 'Manual client follow-ups', 'Admin stealing billable hours', 'Inconsistent onboarding'],
    solutions: ['AI proposal generator', 'Client onboarding AI', 'Invoice processing', 'Meeting summarization'],
    roi: 'Proposals in 10 min (vs 3 days), 45% higher win rate',
    accent: '#625fff', href: '/solutions/professional-services',
  },
  {
    id: 'finance', title: 'Finance', tagline: 'Automate document processing, compliance, and client communication.',
    challenges: ['Manual document review', 'Compliance reporting overhead', 'Slow client onboarding', 'Data entry errors'],
    solutions: ['Invoice processing AI', 'KYC document automation', 'Client onboarding flow', 'Report generation AI'],
    roi: '95% extraction accuracy, 38hrs/week saved on document processing',
    accent: '#facc15', href: '/solutions/finance',
  },
  {
    id: 'hospitality', title: 'Hospitality', tagline: 'Deliver 5-star experiences with AI-powered guest communication.',
    challenges: ['Late-night guest inquiries', 'Manual reservation management', 'Slow complaint resolution', 'Staff shortages'],
    solutions: ['Guest communication AI', 'Reservation booking agent', 'Review response automation', 'WhatsApp concierge'],
    roi: '24/7 guest service, 4.8+ review scores, 40% fewer complaints escalated',
    accent: '#fb923c', href: '/solutions/hospitality',
  },
  {
    id: 'education', title: 'Education', tagline: 'Automate student support, admissions, and administrative workflows.',
    challenges: ['High-volume admissions inquiries', 'Student support overload', 'Manual enrollment processes', 'Communication delays'],
    solutions: ['Admissions AI chatbot', 'Student support assistant', 'Course recommendation AI', 'Enrollment automation'],
    roi: '70% reduction in admissions queries handled manually',
    accent: '#a78bfa', href: '/solutions/education',
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen surface-void">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[600px] h-[500px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-50" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Building2 size={11} />
            Industry Solutions
          </div>
          <h1 className="font-tight font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.03em]">
            AI Built for{' '}
            <span className="gradient-text">Your Industry</span>
          </h1>
          <p className="text-base lg:text-lg text-brand-secondary max-w-2xl mx-auto leading-relaxed font-light">
            Every industry has unique workflows and challenges. We build AI automation systems tailored to how your sector actually operates.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="pb-24">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industries.map((industry) => (
              <div
                key={industry.id}
                id={industry.id}
                className="card-elevated card-hover scroll-mt-24"
              >
                <div className="mb-5">
                  <h2 className="font-tight font-medium text-xl lg:text-2xl text-white">{industry.title}</h2>
                  <p className="text-sm font-medium mt-0.5" style={{ color: industry.accent }}>{industry.tagline}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <p className="eyebrow mb-2 flex items-center gap-1.5"><AlertCircle size={11} />Challenges</p>
                    <ul className="space-y-1.5">
                      {industry.challenges.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-brand-secondary font-light">
                          <span className="w-1 h-1 rounded-full bg-brand-slate shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow mb-2 flex items-center gap-1.5" style={{ color: '#3bdc8c99' }}><Check size={11} />Solutions</p>
                    <ul className="space-y-1.5">
                      {industry.solutions.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-brand-tertiary font-light">
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: industry.accent }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-brand-inkline">
                  <div>
                    <p className="eyebrow mb-0.5">Typical ROI</p>
                    <p className="text-sm font-medium" style={{ color: industry.accent }}>{industry.roi}</p>
                  </div>
                  <Link
                    href={industry.href}
                    className="flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5"
                    style={{ color: industry.accent }}
                  >
                    Explore
                    <ArrowRight size={13} />
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
