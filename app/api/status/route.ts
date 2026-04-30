export const GET = () =>
	Response.json({
		status: 'ok',
		service: 'uha.app',
		components: {
			website: 'ok',
			mcp: 'ok'
		}
	});
