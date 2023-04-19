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
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.soldout.co.kr',
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/member/users',
        destination: `http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/users`,
      },
      {
        source: '/api/member/login',
        destination: `http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/auth`,
      },
    ];
  },
};

module.exports = nextConfig;
