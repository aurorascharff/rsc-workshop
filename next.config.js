/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    domains: ['media.licdn.com'],
  },
};

module.exports = nextConfig;
