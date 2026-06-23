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
  // Cache heavy static media in the browser (default was max-age=0). Big win for the
  // rotating 2nd hero video and repeat visits. To force-update a file, rename it.
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
};

export default nextConfig;
