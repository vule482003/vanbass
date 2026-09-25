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
      { protocol: "https", hostname: "*.onrender.com" },
      { protocol: "https", hostname: "img.vietqr.io" },
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
  async rewrites() {
    return [
      {
        source: "/static/:path*",
        destination: "http://127.0.0.1:8000/static/:path*",
      },
    ];
  },
};

export default nextConfig;
