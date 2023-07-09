/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["moneybridge.s3.ap-northeast-2.amazonaws.com"],
  },
  env: {
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_KAKAO_API_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    NEXT_PUBLIC_KAKAO_REST_API_KEY: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    NEXT_PUBLIC_KAKAO_API_COORD_URL: process.env.NEXT_PUBLIC_KAKAO_API_COORD_URL,
    NEXT_PUBLIC_KAKAO_API_SEARCH_URL: process.env.NEXT_PUBLIC_KAKAO_API_SEARCH_URL,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_PROXY_API_KEY}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
