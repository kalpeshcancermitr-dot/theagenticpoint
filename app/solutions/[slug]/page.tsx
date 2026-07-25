import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowLeft, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

const solutionData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  color: string;
  challenges: { title: string; detail: string }[];
  solutions: { title: string; detail: string }[];
  results: { metric: string; label: string }[];
  techStack: string[];
  caseStudy?: { headline: string; detail: string };
}> = {
  healthcare: {
    title: 'Healthcare AI Automation',
    tagline: 'Improve patient outcomes while reducing administrative burden.',
    description: 'Healthcare providers are drowning in administrative tasks — appointment scheduling, patient follow-ups, insurance verification, and documentation. Our AI automation systems handle these workflows 24/7, freeing your clinical staff to focus on patients.',
    color: '#fb7185',
    challenges: [
      { title: 'High no-show rates', detail: 'Patients forget appointments, costing clinics thousands per month in lost revenue.' },
      { title: 'Staff overwhelmed by admin', detail: 'Clinical and admin staff spend 30-40% of their time on manual follow-ups and scheduling.' },
      { title: 'Slow patient communication', detail: 'Phone tag for appointment reminders, test results, and medication refills wastes time for both staff and patients.' },
      { title: 'Intake form inefficiency', detail: 'Paper or manual digital forms create bottlenecks and data entry errors before appointments even begin.' },
    ],
    solutions: [
      { title: 'Patient Follow-Up AI', detail: 'Automated WhatsApp/SMS reminders, post-visit check-ins, and medication adherence nudges that reduce no-shows by 40%.' },
      { title: 'Appointment Booking Agent', detail: '24/7 intelligent booking agent that handles scheduling, rescheduling, and cancellations via chat or voice.' },
      { title: 'Intake Form Automation', detail: 'Digital intake flows that collect patient information before the visit and feed directly into your practice management system.' },
      { title: 'Insurance Verification AI', detail: 'Automated eligibility checks and pre-authorization workflows that reduce front-desk burden.' },
    ],
    results: [
      { metric: '40%', label: 'Fewer no-shows' },
      { metric: '15hrs', label: 'Saved per staff/week' },
      { metric: '24/7', label: 'Patient communication' },
      { metric: '95%', label: 'Intake accuracy' },
    ],
    techStack: ['WhatsApp Business API', 'n8n', 'Gemini', 'Supabase', 'Twilio', 'EHR Integration'],
    caseStudy: {
      headline: 'Multi-practice clinic reduced no-shows by 38% in 60 days',
      detail: 'A regional healthcare group with 4 locations deployed our patient follow-up AI across their booking system. Automated reminders via WhatsApp with easy reschedule links cut no-shows from 23% to 14%, recovering over $18,000/month in appointment revenue.',
    },
  },
  'real-estate': {
    title: 'Real Estate AI Automation',
    tagline: 'Qualify more leads and close deals faster with AI automation.',
    description: 'Real estate agents and agencies waste hours responding to low-intent inquiries, manually qualifying leads, and following up on cold prospects. Our AI solutions handle lead qualification, property inquiries, and follow-up sequences automatically.',
    color: '#3bdc8c',
    challenges: [
      { title: 'Slow response to inquiries', detail: 'Leads from portals go cold in minutes. Manual follow-up means missed deals.' },
      { title: 'Manual lead qualification', detail: 'Agents spend time on unqualified inquiries rather than closing ready buyers.' },
      { title: 'Follow-up falls through the cracks', detail: 'Without automation, most leads receive 1-2 follow-ups before agents give up.' },
      { title: 'Admin eating agent time', detail: 'Scheduling viewings, coordinating availability, and sending property info takes hours daily.' },
    ],
    solutions: [
      { title: 'WhatsApp Lead Qualification', detail: 'Instant automated conversations that qualify budget, timeline, and requirements before involving an agent.' },
      { title: 'Property Inquiry AI', detail: 'Smart assistant that answers property questions, shares listings, and schedules viewings 24/7.' },
      { title: 'Automated Follow-Up Sequences', detail: '12-touch follow-up sequences across WhatsApp, email, and SMS that nurture cold leads over 90 days.' },
      { title: 'Viewing Scheduler Bot', detail: 'Calendar-integrated booking agent that coordinates agent and buyer availability without back-and-forth.' },
    ],
    results: [
      { metric: '3x', label: 'Qualified meetings' },
      { metric: '68%', label: 'Faster response time' },
      { metric: '12-touch', label: 'Automated follow-up' },
      { metric: '60%', label: 'Less admin time' },
    ],
    techStack: ['WhatsApp Business API', 'n8n', 'Gemini', 'Calendly', 'CRM Integration', 'Supabase'],
    caseStudy: {
      headline: 'Boutique real estate agency tripled qualified viewings',
      detail: 'A 6-agent real estate team deployed our WhatsApp qualification bot on their property portal listings. The bot pre-qualifies buyers and books viewings automatically. Qualified meetings per month grew from 28 to 89, with agents spending 70% less time on initial qualification calls.',
    },
  },
  ecommerce: {
    title: 'E-Commerce AI Automation',
    tagline: 'Automate support, recover abandoned carts, and increase customer LTV.',
    description: 'E-commerce businesses face high support ticket volume, cart abandonment, and returns complexity. Our AI automation handles customer support, cart recovery, order tracking, and returns processing — all without increasing headcount.',
    color: '#2862d7',
    challenges: [
      { title: 'High support ticket volume', detail: 'Order questions, delivery inquiries, and product issues overwhelm customer service teams.' },
      { title: 'Cart abandonment', detail: 'On average, 70% of shopping carts are abandoned — most never followed up on.' },
      { title: 'Slow order resolution', detail: 'Customers wait days for responses to simple queries about shipping and returns.' },
      { title: 'Manual returns processing', detail: 'Returns are labor-intensive and create customer friction that drives churn.' },
    ],
    solutions: [
      { title: '24/7 Customer Support AI', detail: 'AI agent that handles order status, returns, product questions, and complaints with your brand voice.' },
      { title: 'Abandoned Cart Recovery', detail: 'Smart recovery sequences via email and WhatsApp that re-engage abandoners with personalized offers.' },
      { title: 'Order Tracking Assistant', detail: 'Proactive shipping notifications and intelligent tracking responses that reduce "where\'s my order" tickets by 60%.' },
      { title: 'Returns Automation', detail: 'Self-service returns flow that captures reason, issues labels, and processes refunds automatically.' },
    ],
    results: [
      { metric: '78%', label: 'Tickets auto-resolved' },
      { metric: '23%', label: 'Cart recovery increase' },
      { metric: '60%', label: 'Fewer WISMO tickets' },
      { metric: '4.8★', label: 'Average support rating' },
    ],
    techStack: ['Shopify / WooCommerce', 'WhatsApp Business API', 'Gemini', 'n8n', 'Klaviyo', 'Supabase'],
    caseStudy: {
      headline: 'D2C brand resolved 78% of support tickets without human intervention',
      detail: 'A direct-to-consumer fashion brand processing 2,000 monthly orders deployed our support AI across email and WhatsApp. The AI handles order inquiries, exchanges, and returns automatically. Support costs dropped by 55% while CSAT scores increased from 3.6 to 4.8.',
    },
  },
  recruitment: {
    title: 'Recruitment & HR AI Automation',
    tagline: 'Screen more candidates faster without sacrificing quality.',
    description: 'Recruitment teams are bottlenecked at CV screening, bogged down by manual scheduling, and losing top candidates to slow processes. Our AI automation handles screening, communication, and coordination so your recruiters focus on relationships.',
    color: '#2dd4bf',
    challenges: [
      { title: 'CV screening bottleneck', detail: 'Hundreds of applications per role, manually reviewed by recruiters instead of strategic hiring work.' },
      { title: 'Slow candidate communication', detail: 'Candidates wait days for status updates, leading to drop-off and reputational damage.' },
      { title: 'Interview scheduling back-and-forth', detail: 'Coordinating availability between candidate and hiring manager wastes hours per hire.' },
      { title: 'Inconsistent candidate experience', detail: 'Without automation, candidate experience varies wildly based on which recruiter handles the process.' },
    ],
    solutions: [
      { title: 'AI CV Screening', detail: 'Role-specific screening that scores CVs against your criteria and surfaces top candidates automatically.' },
      { title: 'Candidate Follow-Up AI', detail: 'Automated status updates, rejection notices, and interview prep messages that keep candidates engaged.' },
      { title: 'Interview Scheduling Bot', detail: 'AI agent that collects availability and books interview slots without recruiter involvement.' },
      { title: 'Onboarding Automation', detail: 'Document collection, IT provisioning triggers, and day-one prep communications sent automatically.' },
    ],
    results: [
      { metric: '85%', label: 'Faster screening' },
      { metric: '30%', label: 'Better hire quality' },
      { metric: '3hrs', label: 'Saved per placement' },
      { metric: '92%', label: 'Candidate satisfaction' },
    ],
    techStack: ['Gemini', 'n8n', 'ATS Integration', 'WhatsApp Business API', 'Calendly', 'Supabase'],
    caseStudy: {
      headline: 'Staffing agency placed candidates 40% faster with AI screening',
      detail: 'A mid-size staffing agency processing 300 applications per week deployed our AI screening system. CVs are scored and ranked automatically. Recruiter time spent on initial screening dropped from 2 hours per role to 20 minutes, with hiring managers reporting better candidate quality.',
    },
  },
  'professional-services': {
    title: 'Professional Services AI',
    tagline: 'Win more business with AI-powered proposals and client management.',
    description: 'Law firms, consultancies, agencies, and accountancies spend billable hours on non-billable admin. Our AI automation handles proposals, client onboarding, document processing, and communication workflows so your team bills more and administers less.',
    color: '#625fff',
    challenges: [
      { title: 'Slow proposal creation', detail: 'Proposals take days to craft manually, losing deals to faster competitors.' },
      { title: 'Manual client follow-ups', detail: 'Partners and senior staff chase clients for documents, approvals, and payments.' },
      { title: 'Admin stealing billable hours', detail: 'Professionals spend 30% of their time on admin that could be automated.' },
      { title: 'Inconsistent onboarding', detail: 'New client onboarding is ad-hoc, creating poor experiences and setup delays.' },
    ],
    solutions: [
      { title: 'AI Proposal Generator', detail: 'Input the client brief, get a tailored proposal in 10 minutes. Trained on your past wins and brand voice.' },
      { title: 'Client Onboarding AI', detail: 'Automated workflows that collect documents, send welcome packs, and trigger internal setups without manual effort.' },
      { title: 'Invoice Processing', detail: 'AI that extracts invoice data, validates against POs, and routes for approval automatically.' },
      { title: 'Meeting Summarization', detail: 'AI that joins calls, generates summaries, action items, and follow-up emails instantly.' },
    ],
    results: [
      { metric: '10min', label: 'Proposal turnaround' },
      { metric: '45%', label: 'Higher win rate' },
      { metric: '20hrs', label: 'Saved per partner/month' },
      { metric: '2x', label: 'Faster client onboarding' },
    ],
    techStack: ['Gemini', 'n8n', 'Notion / Coda', 'DocuSign', 'Supabase', 'Zapier'],
    caseStudy: {
      headline: 'Management consultancy cut proposal time from 3 days to 10 minutes',
      detail: 'A boutique strategy consultancy deployed our proposal generator trained on 200 past proposals. Consultants now generate tailored first drafts in 10 minutes instead of 3 days. Win rate improved from 28% to 41% as faster turnaround impressed prospects.',
    },
  },
  finance: {
    title: 'Finance AI Automation',
    tagline: 'Automate document processing, compliance, and client communication.',
    description: 'Financial services firms face massive document processing burdens, compliance reporting overhead, and complex client communication needs. Our AI systems handle document extraction, KYC flows, reporting automation, and client onboarding at scale.',
    color: '#facc15',
    challenges: [
      { title: 'Manual document review', detail: 'Analysts spend hours extracting data from invoices, contracts, and financial statements.' },
      { title: 'Compliance reporting overhead', detail: 'Regulatory reports require manual data aggregation from multiple systems.' },
      { title: 'Slow client onboarding', detail: 'KYC and AML processes create weeks-long delays for new client activation.' },
      { title: 'Data entry errors', detail: 'Manual data entry from documents creates costly errors and rework.' },
    ],
    solutions: [
      { title: 'Invoice Processing AI', detail: 'Extract, validate, and route invoice data with 95%+ accuracy across any format.' },
      { title: 'KYC Document Automation', detail: 'Automated identity verification, document collection, and risk scoring workflows.' },
      { title: 'Client Onboarding Flow', detail: 'End-to-end onboarding automation that cuts time-to-active from weeks to days.' },
      { title: 'Report Generation AI', detail: 'Automated report generation from raw data — weekly, monthly, or on-demand.' },
    ],
    results: [
      { metric: '95%', label: 'Extraction accuracy' },
      { metric: '38hrs', label: 'Saved weekly on docs' },
      { metric: '5 days', label: 'KYC time (from 3 weeks)' },
      { metric: '$200k', label: 'Annual cost savings' },
    ],
    techStack: ['Claude', 'n8n', 'Supabase', 'Document AI', 'Plaid', 'Zapier'],
    caseStudy: {
      headline: 'Accounting firm eliminated 38 hours/week of manual invoice processing',
      detail: 'A mid-size accounting firm processing 500+ invoices per week deployed our document AI. The system extracts line items, validates totals, matches POs, and routes anomalies for review. Manual processing time dropped from 45 hours/week to 7 hours, with extraction accuracy exceeding 95%.',
    },
  },
  hospitality: {
    title: 'Hospitality AI Automation',
    tagline: 'Deliver 5-star experiences with AI-powered guest communication.',
    description: 'Hotels, restaurants, and hospitality businesses face 24/7 guest communication needs, reservation complexity, and review management challenges. Our AI agents handle guest inquiries, bookings, and feedback loops around the clock.',
    color: '#fb923c',
    challenges: [
      { title: 'Late-night guest inquiries', detail: 'Guests need answers at 11pm — manual staff coverage is expensive and inconsistent.' },
      { title: 'Manual reservation management', detail: 'Booking amendments, special requests, and availability queries handled by staff.' },
      { title: 'Slow complaint resolution', detail: 'Unresolved complaints go straight to public reviews, damaging ratings.' },
      { title: 'Review response backlog', detail: 'Most hospitality businesses respond to fewer than 40% of online reviews.' },
    ],
    solutions: [
      { title: 'Guest Communication AI', detail: '24/7 AI concierge via WhatsApp that handles inquiries, requests, and information with your brand voice.' },
      { title: 'Reservation Booking Agent', detail: 'Smart booking assistant that checks availability, processes reservations, and handles amendments.' },
      { title: 'Review Response Automation', detail: 'AI that monitors and responds to reviews across platforms within hours, at scale.' },
      { title: 'WhatsApp Concierge', detail: 'Digital concierge that handles restaurant bookings, local recommendations, and in-stay requests via WhatsApp.' },
    ],
    results: [
      { metric: '24/7', label: 'Guest service coverage' },
      { metric: '4.8+', label: 'Average review score' },
      { metric: '40%', label: 'Fewer complaints escalated' },
      { metric: '100%', label: 'Review response rate' },
    ],
    techStack: ['WhatsApp Business API', 'Gemini', 'n8n', 'Google Business API', 'Booking.com API', 'Supabase'],
    caseStudy: {
      headline: 'Boutique hotel chain improved review score from 4.1 to 4.8 in 3 months',
      detail: 'A group of 3 boutique hotels deployed our guest communication AI and review response system. Guests get instant responses to inquiries via WhatsApp. Complaints are flagged immediately for manager intervention. Reviews improved from 4.1 to 4.8 across all platforms in 90 days.',
    },
  },
  education: {
    title: 'Education AI Automation',
    tagline: 'Automate student support, admissions, and administrative workflows.',
    description: 'Educational institutions face high-volume admissions inquiries, student support overload, and manual enrollment processes. Our AI automation handles these workflows at scale, improving student experience while reducing staff burden.',
    color: '#a78bfa',
    challenges: [
      { title: 'High admissions inquiry volume', detail: 'Hundreds of daily questions about programs, requirements, and deadlines overwhelm admissions teams.' },
      { title: 'Student support overload', detail: 'Academic, administrative, and wellbeing queries compete for staff time.' },
      { title: 'Manual enrollment processes', detail: 'Document collection, form verification, and confirmation workflows are labor-intensive.' },
      { title: 'Communication delays', detail: 'Students wait days for responses, creating anxiety and drop-off during enrollment.' },
    ],
    solutions: [
      { title: 'Admissions AI Chatbot', detail: 'Trained on your prospectus and FAQs, answers admissions questions 24/7 and books open-day slots.' },
      { title: 'Student Support Assistant', detail: 'AI that handles academic calendar queries, administrative requests, and escalates complex issues to staff.' },
      { title: 'Course Recommendation AI', detail: 'Conversational AI that helps prospective students find the right program based on their goals.' },
      { title: 'Enrollment Automation', detail: 'Document collection workflows and confirmation sequences that guide students through enrollment automatically.' },
    ],
    results: [
      { metric: '70%', label: 'Fewer manual inquiries' },
      { metric: '24/7', label: 'Student availability' },
      { metric: '2x', label: 'Faster enrollment' },
      { metric: '88%', label: 'Student satisfaction' },
    ],
    techStack: ['Gemini', 'n8n', 'WhatsApp Business API', 'Supabase', 'CRM Integration', 'Email API'],
    caseStudy: {
      headline: 'University reduced admissions inquiry workload by 70%',
      detail: 'A private university deploying our admissions AI chatbot trained on their prospectus, fee structure, and FAQs. The AI handles 70% of incoming admissions queries automatically. The admissions team now focuses on high-intent applicants, increasing application completion rates by 25%.',
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(solutionData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const solution = solutionData[params.slug];
  if (!solution) return { title: 'Solution Not Found' };
  return {
    title: solution.title,
    description: solution.description.slice(0, 160),
  };
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = solutionData[params.slug];
  if (!solution) notFound();
  const c = solution.color;

  return (
    <div className="min-h-screen surface-void">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[500px] h-[400px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-40" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            All Solutions
          </Link>

          <div className="mb-6">
            <div className="text-sm font-medium mb-2" style={{ color: c }}>{solution.tagline}</div>
            <h1 className="font-tight font-semibold text-4xl lg:text-5xl text-white tracking-[-0.03em]">
              {solution.title}
            </h1>
          </div>

          <p className="text-lg text-brand-secondary leading-relaxed max-w-2xl font-light">
            {solution.description}
          </p>
        </div>
      </section>

      {/* Results metrics */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl border"
            style={{ backgroundColor: `${c}0d`, borderColor: `${c}33` }}
          >
            {solution.results.map((result) => (
              <div key={result.label} className="text-center">
                <div className="font-tight font-semibold text-3xl" style={{ color: c }}>{result.metric}</div>
                <div className="text-sm text-brand-secondary mt-1 font-light">{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="font-tight font-medium text-2xl text-white">The Challenges</h2>
              <div className="space-y-3">
                {solution.challenges.map((ch) => (
                  <div key={ch.title} className="card-elevated space-y-1">
                    <div className="font-medium text-white text-sm">{ch.title}</div>
                    <div className="text-brand-secondary text-sm leading-relaxed font-light">{ch.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-tight font-medium text-2xl text-white">Our Solutions</h2>
              <div className="space-y-3">
                {solution.solutions.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl border p-4 space-y-1"
                    style={{ backgroundColor: `${c}0d`, borderColor: `${c}33` }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} style={{ color: c }} />
                      <div className="font-medium text-sm" style={{ color: c }}>{s.title}</div>
                    </div>
                    <div className="text-brand-secondary text-sm leading-relaxed pl-5 font-light">{s.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case study */}
      {solution.caseStudy && (
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card-highlight p-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} style={{ color: c }} />
                <span className="eyebrow" style={{ color: c }}>Case Study</span>
              </div>
              <h3 className="font-tight font-medium text-xl text-white mb-3">{solution.caseStudy.headline}</h3>
              <p className="text-brand-tertiary leading-relaxed font-light">{solution.caseStudy.detail}</p>
            </div>
          </div>
        </section>
      )}

      {/* Tech stack */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-tight font-medium text-xl text-white mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {solution.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg border text-sm font-mono font-medium"
                style={{ color: c, backgroundColor: `${c}1a`, borderColor: `${c}40` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-highlight text-center space-y-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
              style={{ backgroundColor: `${c}1a`, border: `1px solid ${c}40` }}
            >
              <Zap size={22} style={{ color: c }} />
            </div>
            <h2 className="font-tight font-medium text-2xl text-white">
              Ready to automate your {solution.title.split(' ').slice(0, 2).join(' ')} operations?
            </h2>
            <p className="text-brand-tertiary max-w-md mx-auto font-light">
              Book a free 30-minute strategy session. We&apos;ll map your workflows and show you exactly what&apos;s possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="pill-cta flex items-center justify-center gap-2">
                Book Discovery Call
                <ArrowRight size={15} />
              </Link>
              <Link href="/solutions" className="ghost-btn flex items-center justify-center gap-2">
                View All Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
