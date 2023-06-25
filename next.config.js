/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/myCounseling/newReservation",
        source: "/myCounseling/canceledConsultation",
        destination: "/myCounseling",
        permanent: true,
      },
      {
        source: "/management/newReservation",
        source: "/management/canceledConsultation",
        source: "/management/changeReservation",
        source: "/management/completedConsultation",
        source: "/management/confirmedReservation",
        destination: "/management",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["https://d2ky5wm6akosox.cloudfront.net"],
  },
};

module.exports = nextConfig;
