import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Add your production image host(s) here once you migrate to Sanity
      // or another CDN-backed image source. Local /public images work by default.
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ]
  },
  async redirects() {
    return [];
  }
};

export default withNextIntl(nextConfig);
