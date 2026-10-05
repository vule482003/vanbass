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
        destination: "/thue-ban-dj",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/thue-ban-dj",
        permanent: true,
      },
      {
        source: "/en/rental",
        destination: "/thue-ban-dj",
        permanent: true,
      },
      {
        source: "/dj-rental-danang",
        destination: "/thue-ban-dj",
        permanent: true,
      },
      {
        source: "/rent-dj-da-nang",
        destination: "/thue-ban-dj",
        permanent: true,
      },
      {
        source: "/dj-equipment-rental-danang",
        destination: "/thue-ban-dj",
        permanent: true,
      },
      {
        source: "/mua-ban-dj",
        destination: "/ban-dj",
        permanent: true,
      },
      {
        source: "/mua-ban-ban-dj",
        destination: "/ban-dj",
        permanent: true,
      },
      {
        source: "/ban-dj-da-nang",
        destination: "/ban-dj",
        permanent: true,
      },
      {
        source: "/mua-ban-dj-da-nang",
        destination: "/ban-dj",
        permanent: true,
      },
      {
        source: "/thue-dj",
        destination: "/thue-ban-dj",
        permanent: true,
      },
      {
        source: "/thue-dj-da-nang",
        destination: "/thue-ban-dj",
        permanent: true,
      },
      {
        source: "/sua-ban-dj",
        destination: "/sua-chua-ban-dj",
        permanent: true,
      },
      {
        source: "/sua-ban-dj-da-nang",
        destination: "/sua-chua-ban-dj",
        permanent: true,
      },
      {
        source: "/sua-chua-ban-dj-da-nang",
        destination: "/sua-chua-ban-dj",
        permanent: true,
      },
      {
        source: "/san-pham",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/san-pham/:slug*",
        destination: "/products/:slug*",
        permanent: true,
      },
      // 301/308 Permanent Redirects for alias slugs to canonical hot model URLs (Bing & Google Best Practice)
      // 1. Pioneer DJ XDJ-RX3
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
        source: "/products/ban-dj-xdj-rx3",
        destination: "/products/xdj-rx3",
        permanent: true,
      },
      // 2. Pioneer DJ XDJ-RX2
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
        source: "/products/ban-dj-xdj-rx2",
        destination: "/products/xdj-rx2",
        permanent: true,
      },
      // 3. Pioneer DJ XDJ-RR
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
      {
        source: "/products/ban-dj-xdj-rr",
        destination: "/products/xdj-rr",
        permanent: true,
      },
      // 4. Pioneer DJ DDJ-FLX4
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
        source: "/products/ban-dj-flx4",
        destination: "/products/ddj-flx4",
        permanent: true,
      },
      // 5. AlphaTheta DDJ-FLX2
      {
        source: "/products/alphatheta-ddj-flx2",
        destination: "/products/ddj-flx2",
        permanent: true,
      },
      {
        source: "/products/pioneer-ddj-flx2",
        destination: "/products/ddj-flx2",
        permanent: true,
      },
      {
        source: "/products/ban-dj-flx2",
        destination: "/products/ddj-flx2",
        permanent: true,
      },
      // 6. AlphaTheta OMNIS-DUO
      {
        source: "/products/alpha-theta-omnis-duo",
        destination: "/products/omnis-duo",
        permanent: true,
      },
      {
        source: "/products/alphatheta-omnis-duo",
        destination: "/products/omnis-duo",
        permanent: true,
      },
      {
        source: "/products/ban-dj-omnis-duo",
        destination: "/products/omnis-duo",
        permanent: true,
      },
      {
        source: "/products/ban-dj-alpha-theta-omnis-duo",
        destination: "/products/omnis-duo",
        permanent: true,
      },
      // 7. AlphaTheta XDJ-AZ
      {
        source: "/products/pioneer-xdj-az",
        destination: "/products/xdj-az",
        permanent: true,
      },
      {
        source: "/products/alphatheta-xdj-az",
        destination: "/products/xdj-az",
        permanent: true,
      },
      {
        source: "/products/ban-dj-xdj-az",
        destination: "/products/xdj-az",
        permanent: true,
      },
      {
        source: "/products/ban-dj-alphatheta-xdj-az",
        destination: "/products/xdj-az",
        permanent: true,
      },
      // 8. AlphaTheta XDJ-AN
      {
        source: "/products/alphatheta-xdj-an",
        destination: "/products/xdj-an",
        permanent: true,
      },
      {
        source: "/products/ban-dj-xdj-an",
        destination: "/products/xdj-an",
        permanent: true,
      },
      // 9. Pioneer DJ XDJ-XZ
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
        source: "/products/ban-dj-xdj-xz",
        destination: "/products/xdj-xz",
        permanent: true,
      },
      // 10. 18SW115 Speaker
      {
        source: "/products/loa-sub-roi-b-c-speakers-5-tac-18sw115",
        destination: "/products/loa-sub-roi-bc-speakers-5-tac-18sw115",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backendInternalUrl = process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendInternalUrl}/api/:path*`,
      },
      {
        source: "/static/:path*",
        destination: `${backendInternalUrl}/static/:path*`,
      },
    ];
  },
};

export default nextConfig;
