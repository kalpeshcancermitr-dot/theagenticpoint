import { getSettings } from '@/lib/getSettings';
import FooterClient from './FooterClient';

export default async function Footer() {
  const settings = await getSettings();
  return (
    <FooterClient
      contactEmail={settings['contact_email'] || 'hello@agenticpoint.com'}
      twitterUrl={settings['social_twitter_url'] || ''}
      linkedinUrl={settings['social_linkedin_url'] || ''}
      githubUrl={settings['social_github_url'] || ''}
    />
  );
}
