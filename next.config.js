/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname:
          process.env.NODE_ENV === 'development'
            ? 'lavidluxe.local'
            : 'lavidluxe.byethost8.com',
        // port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
