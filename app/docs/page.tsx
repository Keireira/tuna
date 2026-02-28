import type { Metadata } from 'next';
import { DocsPage } from '@/views/DocsPage';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Learn how to use Uha — adding subscriptions, managing spending, privacy features, AI tools, customization, and more.',
};

export default function Docs() {
  return <DocsPage />;
}
