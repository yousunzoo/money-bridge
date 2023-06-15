/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/pblist/",
        destination: "/pblist?speciality=ALL",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
