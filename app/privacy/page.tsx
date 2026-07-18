import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AgenticPoint — how we collect, use, and protect your data.',
};

const lastUpdated = 'July 18, 2026';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="badge-primary inline-flex mb-5">Legal</div>
          <h1 className="font-tight font-extrabold text-4xl lg:text-5xl text-white tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-brand-secondary">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-content space-y-10">

            <div className="p-6 rounded-2xl border border-white/8 bg-brand-card/30 text-brand-secondary text-sm leading-relaxed">
              This Privacy Policy explains how AgenticPoint (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects information you provide when using our website and services. By using our services, you agree to the collection and use of information in accordance with this policy.
            </div>

            {[
              {
                title: '1. Information We Collect',
                content: [
                  {
                    subtitle: 'Information you provide directly',
                    text: 'When you fill out our contact form, book a discovery call, or subscribe to our newsletter, we collect your name, email address, company name, and any message or project details you provide.',
                  },
                  {
                    subtitle: 'Automatically collected information',
                    text: 'We may collect certain information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited. This data is used for analytics and to improve our website.',
                  },
                ],
              },
              {
                title: '2. How We Use Your Information',
                content: [
                  {
                    subtitle: null,
                    text: 'We use the information we collect to: respond to your inquiries and provide requested services; send you relevant updates, newsletters, or marketing communications (only if you have opted in); improve our website and services; comply with legal obligations; and prevent fraud and ensure security.',
                  },
                ],
              },
              {
                title: '3. Data Storage & Security',
                content: [
                  {
                    subtitle: null,
                    text: 'Your data is stored securely using Supabase (PostgreSQL) with industry-standard encryption at rest and in transit. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We retain your data only as long as necessary to fulfill the purposes outlined in this policy.',
                  },
                ],
              },
              {
                title: '4. Third-Party Services',
                content: [
                  {
                    subtitle: null,
                    text: 'We may use third-party services that collect, monitor, and analyze data, including analytics providers (e.g., Vercel Analytics) and email service providers. These third parties have their own privacy policies, and we encourage you to review them. We do not sell your personal data to third parties.',
                  },
                ],
              },
              {
                title: '5. Cookies',
                content: [
                  {
                    subtitle: null,
                    text: 'Our website may use cookies and similar tracking technologies to enhance your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our site may not function properly.',
                  },
                ],
              },
              {
                title: '6. Your Rights',
                content: [
                  {
                    subtitle: null,
                    text: 'Depending on your location, you may have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your personal data; object to or restrict processing of your data; and data portability. To exercise any of these rights, please contact us at the email address below.',
                  },
                ],
              },
              {
                title: '7. Children\'s Privacy',
                content: [
                  {
                    subtitle: null,
                    text: 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information.',
                  },
                ],
              },
              {
                title: '8. Changes to This Policy',
                content: [
                  {
                    subtitle: null,
                    text: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically.',
                  },
                ],
              },
              {
                title: '9. Contact Us',
                content: [
                  {
                    subtitle: null,
                    text: 'If you have any questions about this Privacy Policy or our data practices, please contact us at:',
                  },
                ],
              },
            ].map((section) => (
              <div key={section.title} className="space-y-4">
                <h2 className="font-tight font-bold text-xl text-white">{section.title}</h2>
                {section.content.map((block, i) => (
                  <div key={i} className="space-y-1.5">
                    {block.subtitle && (
                      <h3 className="font-semibold text-white/80 text-sm">{block.subtitle}</h3>
                    )}
                    <p className="text-brand-secondary leading-relaxed text-sm">{block.text}</p>
                  </div>
                ))}
              </div>
            ))}

            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-2">
              <p className="font-semibold text-white">AgenticPoint</p>
              <a href="mailto:hello@agenticpoint.com" className="text-primary hover:text-primary/80 transition-colors text-sm">
                hello@agenticpoint.com
              </a>
            </div>

            <div className="pt-4 border-t border-white/8">
              <Link href="/terms" className="text-sm text-brand-secondary hover:text-white transition-colors">
                View our Terms of Service &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
