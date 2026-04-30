import { UHA_AGENT_SKILL } from '@agents';

export const GET = () =>
	new Response(UHA_AGENT_SKILL, {
		headers: {
			'content-type': 'text/markdown; charset=utf-8'
		}
	});
