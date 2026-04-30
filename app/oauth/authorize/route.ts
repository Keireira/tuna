export const GET = () =>
	Response.json(
		{
			error: 'temporarily_unavailable',
			error_description: 'Interactive OAuth authorization is not required for public Uha discovery endpoints.'
		},
		{
			status: 501
		}
	);
