import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // We will create our own custom service worker using workbox
  swSrc: 'worker/index.ts',
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
