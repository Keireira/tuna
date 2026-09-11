import { UHA_MARKDOWN } from '@/lib/agent-discovery';

export const GET = () =>
	new Response(UHA_MARKDOWN, {
		headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' }
	});
