import type { Metadata } from 'next';
import { getSettings } from '@/lib/getSettings';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact AgenticPoint — Book a Free Discovery Call',
  description:
    'Book a free 30-minute AI strategy session with AgenticPoint. We will map your workflows and show you exactly what AI automation can do for your business.',
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <ContactForm
      contactEmail={settings['contact_email'] || 'hello@agenticpoint.com'}
      calendlyUrl={settings['calendly_url'] || 'https://calendly.com/agenticpoint/discovery'}
      whatsappNumber={settings['whatsapp_number'] || ''}
    />
  );
}
