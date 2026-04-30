import { SITE_URL } from '@agents';

export const GET = () =>
	Response.json({
		resource: SITE_URL,
		authorization_servers: [SITE_URL],
		scopes_supported: ['public.read'],
		resource_name: 'Uha public website and discovery API'
	});
