import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern, smaller formats first (AVIF then WebP) to cut LCP image bytes.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit qualities allowlist (default is [75]).
    // 68 is used for large hero/LCP imagery to trim bytes with no visible loss.
    qualities: [68, 75],
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
      {
        // TEMP: Supabase Storage (Testing bucket) used while hosted on Vercel.
        protocol: "https",
        hostname: "igzgiyulxkvkrjymisqy.supabase.co",
      },
    ],
  },
};

export default nextConfig;
