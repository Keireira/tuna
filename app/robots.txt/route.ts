import { SITE_URL } from '@/content/product';

// Search/retrieval agents may index public pages and the assets needed to render them.
// Keep the existing no-training preference explicit for crawlers that honor robots.txt.
const searchAgents = [
	'OAI-SearchBot',
	'ChatGPT-User',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User'
];
const restrictedAgents = ['GPTBot', 'ClaudeBot', 'Google-Extended'];

export const GET = () =>
	new Response(
		[
			'User-agent: *\nAllow: /\nDisallow: /api/\nContent-Signal: ai-train=no, search=yes, ai-input=yes',
			...searchAgents.map((agent) => `User-agent: ${agent}\nAllow: /\nDisallow: /api/`),
			...restrictedAgents.map((agent) => `User-agent: ${agent}\nDisallow: /`),
			`Sitemap: ${SITE_URL}/sitemap.xml\n`
		].join('\n\n'),
		{
			headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' }
		}
	);
