import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.hstatic.net" },
      { protocol: "https", hostname: "product.hstatic.net" },
      { protocol: "https", hostname: "file.hstatic.net" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/rental",
        destination: "/products?mode=rental",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
