import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	compress: true,
	reactStrictMode: true,
	poweredByHeader: false,
	compiler: {
		styledComponents: true
	},
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
