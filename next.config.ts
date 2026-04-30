import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
	output: 'standalone',
	compress: true,
	reactStrictMode: true,
	poweredByHeader: false,
	compiler: {
		styledComponents: true
	},
	headers: async () => [
		{
			source: '/:path*',
			headers: [
				{
					key: 'Content-Security-Policy',
					value: [
						"default-src 'self'",
						"base-uri 'self'",
						"font-src 'self'",
						"form-action 'self'",
						"frame-ancestors 'none'",
						"img-src 'self' data:",
						"object-src 'none'",
						[
							"script-src 'self' 'unsafe-inline'",
							isDevelopment ? "'unsafe-eval'" : '',
							'https://static.cloudflareinsights.com'
						]
							.filter(Boolean)
							.join(' '),
						"style-src 'self' 'unsafe-inline'",
						[
							"connect-src 'self'",
							'https://cloudflareinsights.com',
							'https://*.cloudflareinsights.com',
							isDevelopment ? 'http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*' : ''
						]
							.filter(Boolean)
							.join(' ')
					].join('; ')
				},
				{
					key: 'Referrer-Policy',
					value: 'strict-origin-when-cross-origin'
				},
				{
					key: 'X-Content-Type-Options',
					value: 'nosniff'
				}
			]
		}
	],
	redirects: async () => [
		{
			source: '/:path*',
			has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
			destination: 'https://uha.app/:path*',
			permanent: true
		},
		{
			source: '/:path*',
			has: [{ type: 'host', value: 'www.uha.app' }],
			destination: 'https://uha.app/:path*',
			permanent: true
		}
	]
};

export default nextConfig;
