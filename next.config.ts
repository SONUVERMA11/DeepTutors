import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // To allow this host in development, added per Next.js dev resource error
  allowedDevOrigins: ['172.16.2.46'],
};

export default nextConfig;
