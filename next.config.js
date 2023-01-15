/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        // port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        // port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
