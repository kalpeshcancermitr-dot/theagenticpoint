const technologies = [
  'OpenAI', 'Anthropic Claude', 'Google Gemini', 'n8n', 'Supabase',
  'WhatsApp Business API', 'Twilio', 'Stripe', 'Google Workspace',
  'Microsoft 365', 'Notion', 'Slack', 'HubSpot', 'Salesforce',
  'Shopify', 'WooCommerce', 'Zoho CRM', 'Calendly', 'Resend', 'Zapier',
];

const all = [...technologies, ...technologies];

export default function TechLogos() {
  return (
    <section
      className="py-14 overflow-hidden"
      style={{ background: '#0e111b', borderTop: '1px solid #172540', borderBottom: '1px solid #172540' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="section-label">Powered by Industry-Leading Technologies</p>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0e111b, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0e111b, transparent)' }}
        />

        <div className="flex gap-3 animate-marquee whitespace-nowrap">
          {all.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 shrink-0 text-ash hover:text-mist transition-colors duration-200"
              style={{
                background: '#0d172b',
                border: '1px solid #172540',
                borderRadius: '9999px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 300,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: '#305fbd' }}
              />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
