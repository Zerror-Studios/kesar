/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "kesarpetroproducts.com",
          },
        ],
        destination: "https://www.kesarpetroproducts.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://www.kesarpetroproducts.com/:path*",
        permanent: true,
      },
    ];
  },
};


export default nextConfig;



