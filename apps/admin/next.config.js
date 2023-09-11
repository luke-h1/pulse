/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  publicRuntimeConfig: {
    PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_PULSE_API_URL: process.env.PUBLIC_PULSE_API_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['common', 'graphql-hooks', 'editor', 'ui'],
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
