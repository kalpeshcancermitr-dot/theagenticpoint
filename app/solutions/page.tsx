import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Industry Solutions',
  description: 'AI automation solutions tailored for healthcare, real estate, e-commerce, recruitment, finance, and more.',
};

const industries = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    icon: '🏥',
    tagline: 'Improve patient outcomes while reducing administrative burden.',
    challenges: ['Manual appointment scheduling', 'Poor medication adherence', 'Staff overwhelmed by admin', 'Slow patient communication'],
    solutions: ['Patient follow-up AI', 'Appointment booking agent', 'Intake form automation', 'Insurance verification AI'],
    roi: '40% fewer no-shows, 15hrs/week saved per staff member',
    color: 'text-rose-400',
    border: 'border-rose-400/20',
    bg: 'bg-rose-400/8',
    href: '/solutions/healthcare',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    icon: '🏘️',
    tagline: 'Qualify more leads and close deals faster with AI automation.',
    challenges: ['Slow response to inquiries', 'Manual lead qualification', 'Follow-up delays', 'Admin taking agent time'],
    solutions: ['WhatsApp lead qualification', 'Property inquiry AI', 'Automated follow-up sequences', 'Viewing scheduler bot'],
    roi: '3x qualified meetings, 68% faster response time',
    color: 'text-green-400',
    border: 'border-green-400/20',
    bg: 'bg-green-400/8',
    href: '/solutions/real-estate',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail',
    icon: '🛍️',
    tagline: 'Automate support, recover abandoned carts, and increase customer LTV.',
    challenges: ['High support ticket volume', 'Cart abandonment', 'Slow order resolution', 'Manual returns processing'],
    solutions: ['24/7 support AI', 'Abandoned cart recovery', 'Order tracking assistant', 'Returns automation'],
    roi: '78% tickets auto-resolved, 23% cart recovery increase',
    color: 'text-primary',
    border: 'border-primary/20',
    bg: 'bg-primary/8',
    href: '/solutions/ecommerce',
  },
  {
    id: 'recruitment',
    title: 'Recruitment & HR',
    icon: '👥',
    tagline: 'Screen more candidates faster without sacrificing quality.',
    challenges: ['CV screening bottleneck', 'Slow candidate communication', 'Poor candidate experience', 'Inconsistent screening'],
    solutions: ['AI CV screening', 'Candidate follow-up AI', 'Interview scheduling bot', 'Onboarding automation'],
    roi: '85% faster screening, 30% improvement in hire quality',
    color: 'text-teal-400',
    border: 'border-teal-400/20',
    bg: 'bg-teal-400/8',
    href: '/solutions/recruitment',
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    icon: '⚖️',
    tagline: 'Win more business with AI-powered proposals and client management.',
    challenges: ['Slow proposal creation', 'Manual client follow-ups', 'Admin stealing billable hours', 'Inconsistent onboarding'],
    solutions: ['AI proposal generator', 'Client onboarding AI', 'Invoice processing', 'Meeting summarization'],
    roi: 'Proposals in 10 min (vs 3 days), 45% higher win rate',
    color: 'text-accent',
    border: 'border-accent/20',
    bg: 'bg-accent/8',
    href: '/solutions/professional-services',
  },
  {
    id: 'finance',
    title: 'Finance',
    icon: '💹',
    tagline: 'Automate document processing, compliance, and client communication.',
    challenges: ['Manual document review', 'Compliance reporting overhead', 'Slow client onboarding', 'Data entry errors'],
    solutions: ['Invoice processing AI', 'KYC document automation', 'Client onboarding flow', 'Report generation AI'],
    roi: '95% extraction accuracy, 38hrs/week saved on document processing',
    color: 'text-yellow-400',
    border: 'border-yellow-400/20',
    bg: 'bg-yellow-400/8',
    href: '/solutions/finance',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    icon: '🏨',
    tagline: 'Deliver 5-star experiences with AI-powered guest communication.',
    challenges: ['Late-night guest inquiries', 'Manual reservation management', 'Slow complaint resolution', 'Staff shortages'],
    solutions: ['Guest communication AI', 'Reservation booking agent', 'Review response automation', 'WhatsApp concierge'],
    roi: '24/7 guest service, 4.8+ review scores, 40% fewer complaints escalated',
    color: 'text-orange-400',
    border: 'border-orange-400/20',
    bg: 'bg-orange-400/8',
    href: '/solutions/hospitality',
  },
  {
    id: 'education',
    title: 'Education',
    icon: '🎓',
    tagline: 'Automate student support, admissions, and administrative workflows.',
    challenges: ['High-volume admissions inquiries', 'Student support overload', 'Manual enrollment processes', 'Communication delays'],
    solutions: ['Admissions AI chatbot', 'Student support assistant', 'Course recommendation AI', 'Enrollment automation'],
    roi: '70% reduction in admissions queries handled manually',
    color: 'text-purple-400',
    border: 'border-purple-400/20',
    bg: 'bg-purple-400/8',
    href: '/solutions/education',
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-primary opacity-25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="badge-primary inline-flex items-center gap-1.5">
            <Building2 size={11} />
            Industry Solutions
          </div>
          <h1 className="font-tight font-extrabold text-5xl lg:text-6xl text-white tracking-tight">
            AI Built for{' '}
            <span className="gradient-text">Your Industry</span>
          </h1>
          <p className="text-xl text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Every industry has unique workflows and challenges. We build AI automation systems tailored to how your sector actually operates.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.id}
                id={industry.id}
                className={`p-7 rounded-3xl border ${industry.border} ${industry.bg} bg-brand-card/30 group card-hover`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-3xl">{industry.icon}</span>
                  <div>
                    <h2 className="font-tight font-bold text-2xl text-white">{industry.title}</h2>
                    <p className={`text-sm font-medium ${industry.color} mt-0.5`}>{industry.tagline}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-secondary/60 font-medium mb-2">Common Challenges</p>
                    <ul className="space-y-1.5">
                      {industry.challenges.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-brand-secondary">
                          <span className="w-1 h-1 rounded-full bg-brand-secondary/50 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-success/70 font-medium mb-2">Our Solutions</p>
                    <ul className="space-y-1.5">
                      {industry.solutions.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-white/80">
                          <span className={`w-1 h-1 rounded-full ${industry.color.replace('text-', 'bg-')} shrink-0`} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`flex items-center justify-between pt-4 border-t ${industry.border}`}>
                  <div>
                    <p className="text-xs text-brand-secondary/60 uppercase tracking-wider font-medium mb-0.5">Typical ROI</p>
                    <p className={`text-sm font-medium ${industry.color}`}>{industry.roi}</p>
                  </div>
                  <Link
                    href={industry.href}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-all hover:scale-105 ${industry.color}`}
                  >
                    Explore Solution
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
