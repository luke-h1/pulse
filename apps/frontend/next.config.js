/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  publicRuntimeConfig: {
    PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_PULSE_API_URL: process.env.PUBLIC_PULSE_API_URL,
    PUBLIC_CLOUDINARY_KEY: process.env.PUBLIC_CLOUDINARY_KEY,
    PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['common', 'graphql-hooks', 'editor'],
};

module.exports = nextConfig;
