import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion", "embla-carousel-react"],
  },
};

export default nextConfig;
