import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  cacheComponents: true,
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
};

export default nextConfig;
