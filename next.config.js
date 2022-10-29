/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['jabama-devjobs-api.vercel.app'],
  },
}

module.exports = nextConfig
