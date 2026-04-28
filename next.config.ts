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
			source: '/favicon.ico',
			destination: '/favicon.png',
			permanent: true
		}
	]
};

export default nextConfig;
