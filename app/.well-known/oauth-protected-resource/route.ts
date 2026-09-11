// Public Uha MCP does not implement OAuth protected-resource discovery.
export const GET = () =>
	Response.json(
		{ error: 'not_found', message: 'This public MCP server does not require authentication.' },
		{ status: 404 }
	);
