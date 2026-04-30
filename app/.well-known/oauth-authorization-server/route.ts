import { SITE_URL } from '@agents';

export const GET = () =>
	Response.json({
		issuer: SITE_URL,
		authorization_endpoint: `${SITE_URL}/oauth/authorize`,
		token_endpoint: `${SITE_URL}/oauth/token`,
		jwks_uri: `${SITE_URL}/.well-known/jwks.json`,
		grant_types_supported: ['authorization_code'],
		response_types_supported: ['code'],
		scopes_supported: ['public.read']
	});
