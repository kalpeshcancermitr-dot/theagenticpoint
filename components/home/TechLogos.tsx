const technologies = [
  'OpenAI', 'Anthropic Claude', 'Google Gemini', 'n8n', 'Supabase',
  'WhatsApp Business API', 'Twilio', 'Stripe', 'Google Workspace',
  'Microsoft 365', 'Notion', 'Slack', 'HubSpot', 'Salesforce',
  'Shopify', 'WooCommerce', 'Zoho CRM', 'Calendly', 'Resend', 'Zapier',
];

// Duplicate for seamless loop
const all = [...technologies, ...technologies];

export default function TechLogos() {
  return (
    <section className="py-16 border-y border-white/8 overflow-hidden bg-brand-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs uppercase tracking-widest text-brand-secondary font-medium">
          Powered by Industry-Leading Technologies
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-brand-surface to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-brand-surface to-transparent" />

        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {all.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/8 text-sm text-brand-secondary font-medium shrink-0 hover:text-white hover:border-white/20 transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
