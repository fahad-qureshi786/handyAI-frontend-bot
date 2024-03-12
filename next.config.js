/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL_BACKEND: process.env.BASE_URL_BACKEND,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
