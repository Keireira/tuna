import { SITE_URL } from '@agents';

export const GET = () =>
	new Response(
		`User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: GPTBot
Allow: /
Disallow: /api/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: ClaudeBot
Allow: /
Disallow: /api/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: Claude-Web
Allow: /
Disallow: /api/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: PerplexityBot
Allow: /
Disallow: /api/
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: Google-Extended
Allow: /
Disallow: /api/
Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`,
		{
			headers: {
				'content-type': 'text/plain; charset=utf-8'
			}
		}
	);
