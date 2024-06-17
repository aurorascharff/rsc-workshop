/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    }
  },
  images: {
    domains: ['media.licdn.com'],
  },
};

module.exports = nextConfig;
