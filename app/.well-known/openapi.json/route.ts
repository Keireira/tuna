import { SITE_URL, MCP_SERVER_INFO, UHA_PRODUCT } from '@/content/product';

export const GET = () =>
	Response.json({
		openapi: '3.1.0',
		info: {
			title: 'Uha Public Product Information',
			version: MCP_SERVER_INFO.version,
			description:
				'Read-only public product facts. The separate MCP endpoint uses MCP Streamable HTTP, not this REST contract.'
		},
		servers: [{ url: SITE_URL }],
		externalDocs: { description: 'MCP tools and connection instructions', url: `${SITE_URL}/en/mcp` },
		paths: {
			'/prices.json': {
				get: {
					operationId: 'getUhaPriceCatalog',
					summary: 'Get Free and Unlimited details and a dated regional price snapshot',
					responses: {
						'200': {
							description:
								'Customer prices from developer exports, with scheduled changes separate from snapshot prices. Not a live quote.',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										required: ['free', 'unlimited', 'storefrontPrices'],
										properties: {
											free: { type: 'object', additionalProperties: true },
											unlimited: { type: 'object', additionalProperties: true },
											storefrontPrices: {
												type: 'object',
												required: ['snapshotAsOf', 'prices', 'scheduledChanges'],
												properties: {
													snapshotAsOf: { type: 'string', format: 'date' },
													prices: { type: 'array', items: { type: 'object', additionalProperties: true } },
													scheduledChanges: { type: 'array', items: { type: 'object', additionalProperties: true } }
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			'/product.json': {
				get: {
					operationId: 'getUhaProductInformation',
					summary: 'Get current public Uha features, pricing model, limitations, and official links',
					responses: {
						'200': {
							description:
								'Public product information. Regional purchase prices and personal subscription data are not returned.',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										required: [
											'name',
											'lastReviewed',
											'description',
											'features',
											'limitations',
											'pricing',
											'links',
											'mcpScope'
										],
										properties: {
											name: { type: 'string' },
											alternateName: { type: 'string' },
											lastReviewed: { type: 'string', format: 'date' },
											description: { type: 'string' },
											platforms: { type: 'array', items: { type: 'string' } },
											features: { type: 'array', items: { type: 'string' } },
											limitations: { type: 'array', items: { type: 'string' } },
											privacy: { type: 'object', additionalProperties: { type: 'string' } },
											pricing: { type: 'object', additionalProperties: true },
											website: { type: 'string', format: 'uri' },
											links: { type: 'object', additionalProperties: { type: 'string', format: 'uri' } },
											license: { type: 'string' },
											mcpScope: { type: 'object', additionalProperties: { type: 'boolean' } }
										}
									},
									example: UHA_PRODUCT
								}
							}
						}
					}
				}
			}
		}
	});
