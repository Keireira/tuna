export const POST = () =>
	Response.json(
		{
			error: 'temporarily_unavailable',
			error_description: 'Token issuance is not required for public Uha discovery endpoints.'
		},
		{
			status: 501
		}
	);
