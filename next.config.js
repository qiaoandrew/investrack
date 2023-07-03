/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.mktw.net', 'mw3.wsj.net', 'image.cnbcfm.com'],
  },
};

module.exports = nextConfig;
