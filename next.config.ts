import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "img.clerk.com"
    }]
  },
  experimental: {
    optimizeCss: false, // disable lightningcss
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;  