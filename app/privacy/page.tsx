import type { Metadata } from 'next';
import { PrivacyPage } from '@/views/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Uha — a subscription manager for iOS. Learn how your data is handled.',
};

export default function Privacy() {
  return <PrivacyPage />;
}
