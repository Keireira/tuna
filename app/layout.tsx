import type { Metadata, Viewport } from 'next';
import { StyledComponentsRegistry } from '@/lib/registry';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: {
    default: 'Uha — Subscription Manager for iOS',
    template: '%s | Uha',
  },
  description:
    'A private subscription manager for iOS. Track subscriptions, get renewal alerts, and manage spending — all data stays on your device. AI-powered, 100+ currencies, open source.',
  keywords: [
    'subscription manager',
    'iOS',
    'privacy',
    'subscription tracker',
    'renewal alerts',
    'spending analytics',
    'open source',
  ],
  openGraph: {
    title: 'Uha — Subscription Manager',
    description:
      'Track your subscriptions privately. All data stays on your device.',
    type: 'website',
    siteName: 'Uha',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uha — Subscription Manager',
    description:
      'Track your subscriptions privately. All data stays on your device.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#EDE8E1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-weight: 100 1000;
                font-family: 'Onest';
                font-style: normal;
                src: url("/assets/fonts/Onest-variable.ttf") format('truetype-variations');
                font-optical-sizing: auto;
              }
            `,
          }}
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AppShell>{children}</AppShell>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
