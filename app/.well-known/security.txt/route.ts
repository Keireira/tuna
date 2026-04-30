export const GET = () =>
	new Response(
		`Contact: mailto:uha@alena.red
Policy: https://uha.app/security
Preferred-Languages: en, ru, ja, es, kk
Canonical: https://uha.app/.well-known/security.txt
Expires: 2027-04-30T00:00:00Z
`,
		{
			headers: {
				'content-type': 'text/plain; charset=utf-8'
			}
		}
	);
