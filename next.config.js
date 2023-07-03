/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["d2ky5wm6akosox.cloudfront.net"],
  },
  env: {
    NEXT_PUBLIC_API_KEY: "https://money-bridge.shop:8080/",
    NEXT_PUBLIC_KAKAO_API_KEY: "a00d33a77c654313f467c84771f981c2",
  },
};

module.exports = nextConfig;
