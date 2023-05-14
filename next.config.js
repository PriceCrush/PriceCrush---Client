const BASE_URL = process.env.NEXT_PUBLIC_BASEURL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
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
