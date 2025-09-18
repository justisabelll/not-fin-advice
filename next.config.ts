import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      // Set workspace root explicitly to avoid lockfile root inference warnings
      root: __dirname,
    },
  },
};

export default nextConfig;
