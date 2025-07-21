import PrivacyPolicy from '@/app/components/PrivacyPolicy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - PyDart | Data Protection & Privacy',
  description: 'Learn how PyDart protects your data and privacy. Read our comprehensive privacy policy covering data collection, usage, storage, and your rights.',
  keywords: 'PyDart privacy policy, data protection, privacy rights, data collection, GDPR compliance, data security',
  openGraph: {
    title: 'Privacy Policy - PyDart | Data Protection & Privacy',
    description: 'Learn how PyDart protects your data and privacy. Read our comprehensive privacy policy.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
