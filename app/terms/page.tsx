import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AgenticPoint — the rules governing use of our website and services.',
};

const lastUpdated = 'July 18, 2026';

export default function TermsPage() {
  return (
    <div className="min-h-screen surface-void">
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="aurora-orb w-[500px] h-[400px] top-[-20%] left-1/2 -translate-x-1/2 aurora-purple opacity-40" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="badge-primary inline-flex mb-5">Legal</div>
          <h1 className="font-tight font-semibold text-4xl lg:text-5xl text-white tracking-[-0.03em] mb-4">Terms of Service</h1>
          <p className="text-brand-secondary">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">

            <div className="p-6 rounded-2xl border border-brand-edge surface-deep-sea text-brand-secondary text-sm leading-relaxed font-light">
              Please read these Terms of Service (&quot;Terms&quot;) carefully before using the AgenticPoint website or engaging with our services. By accessing our website or purchasing our services, you agree to be bound by these Terms.
            </div>

            {[
              {
                title: '1. Acceptance of Terms',
                text: 'By accessing and using this website, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these Terms, please do not use our website or services.',
              },
              {
                title: '2. Services',
                text: 'AgenticPoint provides AI automation consulting, development, and deployment services for businesses. The specific scope, deliverables, timelines, and pricing for each engagement are defined in a separate Statement of Work (SOW) or service agreement signed between AgenticPoint and the client.',
              },
              {
                title: '3. Intellectual Property',
                text: 'Unless otherwise agreed in writing, all custom AI systems, workflows, and code developed by AgenticPoint for a client become the property of that client upon full payment. AgenticPoint retains the right to use general methodologies, frameworks, and learnings (without disclosing client-specific data) for future projects.',
              },
              {
                title: '4. Confidentiality',
                text: 'AgenticPoint treats all client business information as confidential. We will not disclose your proprietary information, business processes, or project details to third parties without your consent, except as required by law. Clients are similarly expected to treat AgenticPoint\'s proprietary methodologies and pricing as confidential.',
              },
              {
                title: '5. Payment Terms',
                text: 'Payment terms are specified in each individual service agreement. Generally, projects require a deposit before work commences. Failure to make timely payments may result in suspension of work. All fees are non-refundable unless otherwise specified in the service agreement.',
              },
              {
                title: '6. Limitation of Liability',
                text: 'AgenticPoint\'s liability for any claim arising out of or related to our services is limited to the total fees paid by the client in the three months preceding the claim. We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.',
              },
              {
                title: '7. Warranties and Disclaimers',
                text: 'We warrant that our services will be performed in a professional and workmanlike manner. However, we do not guarantee specific business outcomes, revenue increases, or ROI. AI systems are probabilistic by nature and performance may vary. The website and its content are provided "as is" without warranties of any kind.',
              },
              {
                title: '8. Third-Party Integrations',
                text: 'Our services often involve integrating with third-party platforms (e.g., WhatsApp Business API, OpenAI, n8n, Supabase). We are not responsible for changes, outages, or policy violations related to these third-party platforms. Clients are responsible for maintaining valid accounts and complying with the terms of any third-party services used.',
              },
              {
                title: '9. Prohibited Use',
                text: 'You may not use our website or services for any unlawful purpose, to transmit spam or malicious content, to build competing services without express written consent, or to violate any applicable laws or regulations including those related to data privacy, consumer protection, or intellectual property.',
              },
              {
                title: '10. Termination',
                text: 'Either party may terminate a service engagement for cause if the other party materially breaches the service agreement and fails to cure such breach within 14 days of written notice. Upon termination, all amounts owed for work completed are immediately due.',
              },
              {
                title: '11. Governing Law',
                text: 'These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under these Terms shall first be attempted to be resolved through good-faith negotiation, and if unsuccessful, through binding arbitration.',
              },
              {
                title: '12. Changes to Terms',
                text: 'We reserve the right to modify these Terms at any time. We will indicate the date of the last update at the top of this page. Your continued use of our website after changes are posted constitutes your acceptance of the modified Terms.',
              },
              {
                title: '13. Contact',
                text: 'If you have questions about these Terms, please contact us:',
              },
            ].map((section) => (
              <div key={section.title} className="space-y-3">
                <h2 className="font-tight font-medium text-xl text-white">{section.title}</h2>
                <p className="text-brand-secondary leading-relaxed text-sm">{section.text}</p>
              </div>
            ))}

            <div className="p-6 rounded-2xl border border-brand-hairline card-highlight space-y-2">
              <p className="font-medium text-white">AgenticPoint</p>
              <a href="mailto:hello@agenticpoint.com" className="text-brand-primary hover:text-white transition-colors text-sm">
                hello@agenticpoint.com
              </a>
            </div>

            <div className="pt-4 border-t border-brand-edge">
              <Link href="/privacy" className="text-sm text-brand-secondary hover:text-white transition-colors">
                View our Privacy Policy &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
