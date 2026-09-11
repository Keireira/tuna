import { UHA_LLMS_INDEX } from '@/lib/agent-discovery';

export const GET = () =>
	new Response(UHA_LLMS_INDEX, {
		headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' }
	});
