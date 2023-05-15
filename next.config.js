const BASE_URL = process.env.NEXT_PUBLIC_BASEURL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_PRODUCTION: process.env.NEXT_PUBLIC_PRODUCTION,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developerkims-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'developerkims-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
