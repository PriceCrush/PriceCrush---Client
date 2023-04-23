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
      {
        protocol: 'https',
        hostname: 'developerkims-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
  async rewrites() {
    // 각각 어떤건  next api에 들어가 있고 어떤건 안들어가 있어서 다 api에 집어넣어야할지 고민중
    return [
      /**
       * @description 유저 회원가입 api
       */
      {
        source: '/api/member/users',
        destination: `http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/users`,
      },
      /**
       * @description 유저 로그인 api
       */
      {
        source: '/api/member/login',
        destination: `http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/auth`,
      },
      /**
       * @description 유저 아이디 찾기
       */
      {
        source: '/api/member/users/find/id',
        destination:
          'http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/users/find/id',
      },
    ];
  },
};

module.exports = nextConfig;
