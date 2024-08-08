/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    domains: ['media.licdn.com'],
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
