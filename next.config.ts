import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	// experimental: {
	// 	rootParams: true
	// },
	compress: true,
	reactStrictMode: true,
	poweredByHeader: false,
	compiler: {
		styledComponents: true
	}
};

export default nextConfig;
