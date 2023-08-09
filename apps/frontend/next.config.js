/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['common', 'graphql-hooks', 'editor'],
};

module.exports = nextConfig;
