import { SITE_URL } from '@agents';

export const GET = () =>
	Response.json({
		issuer: SITE_URL,
		authorization_endpoint: `${SITE_URL}/oauth/authorize`,
		token_endpoint: `${SITE_URL}/oauth/token`,
		jwks_uri: `${SITE_URL}/.well-known/jwks.json`,
		grant_types_supported: ['authorization_code'],
		response_types_supported: ['code'],
		scopes_supported: ['openid', 'profile', 'public.read'],
		subject_types_supported: ['public'],
		id_token_signing_alg_values_supported: ['RS256']
	});
