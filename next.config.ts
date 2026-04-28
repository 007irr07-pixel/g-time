import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "../../../../../gtime-next",
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
    ],
  },
};

export default nextConfig;
