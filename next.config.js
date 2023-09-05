/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL_BACKEND: process.env.BASE_URL_BACKEND
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
