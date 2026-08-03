import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        // Kept so existing product images (URLs already in the DB) keep working.
        protocol: "https",
        hostname: "ziea.b-cdn.net",
      },
      {
        // New image storage: Hostinger public_html served from the site domain.
        protocol: "https",
        hostname: "ziea.in",
      },
      {
        protocol: "https",
        hostname: "www.ziea.in",
      },
    ],
  },
};

export default nextConfig;
