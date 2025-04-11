import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
