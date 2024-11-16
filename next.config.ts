import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'media.licdn.com',
        pathname: '/dms/image/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
