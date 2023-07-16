/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['common', 'ui', 'apollo-hooks'],
};

module.exports = nextConfig;
