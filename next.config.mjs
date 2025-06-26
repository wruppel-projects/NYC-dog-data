/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'willruppel.com',
            },
          ],
          destination: '/:path*',
        },
      ],
    };
  },
  // Add this if you're deploying to Vercel and want to use this domain
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Custom-Domain',
            value: 'willruppel.com',
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
