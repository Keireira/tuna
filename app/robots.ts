import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
	rules: [
		{
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/_next/']
		},
		{
			userAgent: ['GPTBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended'],
			allow: '/',
			disallow: '/api/'
		}
	],
	sitemap: 'https://uha.app/sitemap.xml',
	host: 'https://uha.app'
});

export default robots;
