import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_info',
      {
        title: 'Get App Info',
        description:
          'Get information about Uha — a subscription tracker app for iOS and Android',
        inputSchema: {},
      },
      async () => ({
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              name: 'Uha',
              tagline: 'Subscription tracker with smart analytics',
              description:
                'Uha helps you track, analyze, and manage all your recurring subscriptions in one place. Supports 25+ languages, multiple currencies with real-time exchange rates, spending forecasts, and iCloud sync.',
              platforms: ['iOS', 'Android'],
              features: [
                'Track unlimited subscriptions',
                'Multi-currency support with real-time exchange rates',
                'Spending analytics and forecasts',
                'iCloud sync and backup',
                'CSV export',
                'Payment reminders',
                'Custom categories',
                '25+ languages',
              ],
              pricing: {
                free: {
                  price: 'Free',
                  limits: '5 subscriptions, 3 currencies, basic features',
                },
                unlimited: {
                  price: 'Paid subscription',
                  features:
                    'Unlimited subscriptions, all currencies, iCloud sync, CSV export, AI features, custom categories',
                },
              },
              website: 'https://uha.app',
              license: 'AGPL-3.0',
            }),
          },
        ],
      }),
    );

    server.registerTool(
      'get_app_links',
      {
        title: 'Get Download Links',
        description: 'Get App Store and Google Play download links for Uha',
        inputSchema: {},
      },
      async () => ({
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              website: 'https://uha.app',
              appStore: 'https://apps.apple.com/app/uha-subscription-tracker/id6740211581',
              googlePlay: 'https://play.google.com/store/apps/details?id=app.uha',
            }),
          },
        ],
      }),
    );

    server.registerTool(
      'search_services',
      {
        title: 'Search Trackable Services',
        description:
          'Search for services/subscriptions that Uha can track (e.g. Netflix, Spotify, Adobe)',
        inputSchema: {
          query: z.string().describe('Service name to search for'),
        },
      },
      async ({ query }) => {
        try {
          const res = await fetch(
            `https://soup.uha.app/search?q=${encodeURIComponent(query)}`,
          );
          const data = await res.json();
          return {
            content: [{ type: 'text', text: JSON.stringify(data) }],
          };
        } catch {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  error: 'Service search temporarily unavailable',
                }),
              },
            ],
          };
        }
      },
    );

    server.registerTool(
      'get_supported_currencies',
      {
        title: 'Get Supported Currencies',
        description: 'Get the list of currencies Uha supports for subscription tracking',
        inputSchema: {},
      },
      async () => {
        try {
          const res = await fetch('https://sharkie.uha.app/currencies');
          const data = await res.json();
          return {
            content: [{ type: 'text', text: JSON.stringify(data) }],
          };
        } catch {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  note: 'Uha supports 100+ currencies with real-time exchange rates',
                }),
              },
            ],
          };
        }
      },
    );
  },
  {},
  {
    basePath: '/api',
    maxDuration: 30,
  },
);

export { handler as GET, handler as POST, handler as DELETE };
