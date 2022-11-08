/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_IPFS_TOKEN: process.env.NEXT_APP_IPFS_TOKEN
  }
};

module.exports = nextConfig;
