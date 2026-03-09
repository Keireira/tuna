import type { Metadata } from 'next';
import { TermsPage } from '@/views/TermsPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for Uha — a subscription manager for iOS.',
};

export default function Terms() {
  return <TermsPage />;
}
