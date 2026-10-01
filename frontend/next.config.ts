import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  devIndicators: false,
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
      // 301 Permanent Redirects for alias slugs to canonical hot model URLs (Bing & Google Best Practice)
      {
        source: "/products/ban-dj-alphatheta-xdj-az",
        destination: "/products/xdj-az",
        permanent: true,
      },
      {
        source: "/products/ban-dj-alpha-theta-omnis-duo",
        destination: "/products/omnis-duo",
        permanent: true,
      },
      {
        source: "/products/alphatheta-ddj-flx2",
        destination: "/products/ddj-flx2",
        permanent: true,
      },
      {
        source: "/products/alphatheta-xdj-an",
        destination: "/products/xdj-an",
        permanent: true,
      },
      {
        source: "/products/pioneer-xdj-rx3",
        destination: "/products/xdj-rx3",
        permanent: true,
      },
      {
        source: "/products/pioneer-dj-xdj-rx3",
        destination: "/products/xdj-rx3",
        permanent: true,
      },
      {
        source: "/products/pioneer-ddj-flx4",
        destination: "/products/ddj-flx4",
        permanent: true,
      },
      {
        source: "/products/pioneer-dj-ddj-flx4",
        destination: "/products/ddj-flx4",
        permanent: true,
      },
      {
        source: "/products/pioneer-xdj-xz",
        destination: "/products/xdj-xz",
        permanent: true,
      },
      {
        source: "/products/pioneer-dj-xdj-xz",
        destination: "/products/xdj-xz",
        permanent: true,
      },
      {
        source: "/products/pioneer-xdj-rx2",
        destination: "/products/xdj-rx2",
        permanent: true,
      },
      {
        source: "/products/pioneer-dj-xdj-rx2",
        destination: "/products/xdj-rx2",
        permanent: true,
      },
      {
        source: "/products/pioneer-xdj-rr",
        destination: "/products/xdj-rr",
        permanent: true,
      },
      {
        source: "/products/pioneer-dj-xdj-rr",
        destination: "/products/xdj-rr",
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
