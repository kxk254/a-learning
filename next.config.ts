import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  allowedDevOrigins: [
    "http://192.168.11.71:3000",
    "http://localhost:3000",
    "http://192.168.11.70:3000",
  ],
};

export default nextConfig;
