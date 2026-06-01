import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  allowedDevOrigins: ["192.168.11.71", "localhost", "127.0.0.1"],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  turbopack: { rules: { "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" } } },
};

export default nextConfig;
