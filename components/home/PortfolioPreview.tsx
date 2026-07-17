import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

type Project = {
  title: string;
  slug: string;
  category: string;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  tech_stack: string[];
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
      {/* Category badge */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
          {project.category}
        </span>
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
        {project.tech_stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-brand-secondary font-mono"
          >
            {tech}
          </span>
        ))}
        {project.tech_stack.length > 3 && (
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-brand-secondary">
            +{project.tech_stack.length - 3} more
          </span>
        )}
      </div>

      {/* Link */}
      <Link
        href={`/portfolio/${project.slug}`}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
      >
        View case study
        <ExternalLink size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

const staticProjects: Project[] = [
  {
    title: 'WhatsApp Lead Qualification Agent',
    slug: 'whatsapp-lead-qualification',
    category: 'WhatsApp AI',
    challenge: 'A real estate agency was manually screening 200+ daily WhatsApp inquiries, missing hot leads during off-hours.',
    solution: 'Built an AI assistant that qualifies leads with a 7-question flow and routes hot prospects instantly.',
    outcome: '68% reduction in response time, 3x increase in qualified meetings booked, 24/7 lead coverage.',
    tech_stack: ['WhatsApp Business API', 'OpenAI GPT-4', 'n8n', 'Supabase', 'Twilio'],
  },
  {
    title: 'Healthcare Follow-up Assistant',
    slug: 'healthcare-followup-assistant',
    category: 'Healthcare AI',
    challenge: 'A medical clinic struggled with post-appointment follow-ups leading to poor patient adherence rates.',
    solution: 'Deployed a HIPAA-aware AI assistant that sends personalized follow-ups and medication reminders.',
    outcome: '40% improvement in patient adherence, 60% reduction in no-shows, staff saved 15 hours/week.',
    tech_stack: ['Twilio', 'OpenAI', 'Supabase', 'n8n', 'Google Calendar API'],
  },
  {
    title: 'Customer Support AI Platform',
    slug: 'customer-support-ai',
    category: 'AI Assistants',
    challenge: 'An e-commerce brand was receiving 500+ daily support tickets with a 48-hour average response time.',
    solution: 'Deployed a multi-channel AI support agent trained on product knowledge base across email, chat, and WhatsApp.',
    outcome: '78% of tickets resolved without human intervention, response time dropped to 2 minutes.',
    tech_stack: ['OpenAI GPT-4', 'Supabase pgvector', 'n8n', 'Intercom', 'Shopify API'],
  },
  {
    title: 'Intelligent Appointment Booking Agent',
    slug: 'appointment-booking-agent',
    category: 'Business Automation',
    challenge: 'A professional services firm was losing clients due to slow response to booking requests.',
    solution: 'Built a conversational booking agent that checks availability, handles rescheduling, and syncs with Google Calendar.',
    outcome: '90% of bookings now automated, zero scheduling conflicts, 4.9/5 client satisfaction.',
    tech_stack: ['Google Calendar API', 'OpenAI', 'n8n', 'Supabase', 'Calendly'],
  },
  {
    title: 'Invoice Processing System',
    slug: 'invoice-processing-ai',
    category: 'Document AI',
    challenge: 'An accounting firm was spending 40+ hours/week manually extracting data from vendor invoices.',
    solution: 'Built a document intelligence pipeline that extracts, validates, and reconciles invoice data automatically.',
    outcome: '95% accuracy in extraction, 38 hours/week saved, payable cycle cut from 12 days to 3.',
    tech_stack: ['Claude AI', 'n8n', 'Supabase', 'Google Cloud Vision', 'QuickBooks API'],
  },
  {
    title: 'AI Proposal Generator',
    slug: 'proposal-generator',
    category: 'Internal AI Tools',
    challenge: 'A B2B agency took 3-5 days to create custom proposals, losing deals to faster competitors.',
    solution: 'Built an AI engine that generates tailored, branded proposals from a brief in under 10 minutes.',
    outcome: 'Proposal creation time reduced from 3 days to 10 minutes, 45% higher win rate.',
    tech_stack: ['OpenAI GPT-4', 'Anthropic Claude', 'n8n', 'Notion API', 'Google Docs API'],
  },
];

export default function PortfolioPreview() {
  return (
    <section className="section-pad bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-lg">
            <div className="badge-primary inline-flex">Portfolio</div>
            <h2 className="font-tight font-bold text-4xl lg:text-5xl text-white">
              Real AI Systems,{' '}
              <span className="gradient-text">Real Results</span>
            </h2>
            <p className="text-brand-secondary">
              Production systems we've built and deployed for real businesses.
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
          {staticProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
