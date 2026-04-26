/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async redirects() {
    return [
      { source: '/exteriors', destination: '/projects', permanent: true },
      { source: '/interiors', destination: '/projects', permanent: true },
    ];
  },
};

export default nextConfig;
