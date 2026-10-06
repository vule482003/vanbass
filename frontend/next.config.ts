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
      // 301/308 Permanent 1-Hop Redirects for alias slugs under both /products/ and legacy /san-pham/
      ...[
        // 1. Pioneer DJ XDJ-RX3
        { canonical: "xdj-rx3", aliases: ["pioneer-xdj-rx3", "pioneer-dj-xdj-rx3", "ban-dj-xdj-rx3"] },
        // 2. Pioneer DJ XDJ-RX2
        { canonical: "xdj-rx2", aliases: ["pioneer-xdj-rx2", "pioneer-dj-xdj-rx2", "ban-dj-xdj-rx2"] },
        // 3. Pioneer DJ XDJ-RR
        { canonical: "xdj-rr", aliases: ["pioneer-xdj-rr", "pioneer-dj-xdj-rr", "ban-dj-xdj-rr"] },
        // 4. Pioneer DJ DDJ-FLX4
        { canonical: "ddj-flx4", aliases: ["pioneer-ddj-flx4", "pioneer-dj-ddj-flx4", "ban-dj-flx4"] },
        // 5. AlphaTheta DDJ-FLX2
        { canonical: "ddj-flx2", aliases: ["alphatheta-ddj-flx2", "pioneer-ddj-flx2", "ban-dj-flx2"] },
        // 6. AlphaTheta OMNIS-DUO
        {
          canonical: "omnis-duo",
          aliases: [
            "alpha-theta-omnis-duo",
            "alphatheta-omnis-duo",
            "ban-dj-omnis-duo",
            "ban-dj-alpha-theta-omnis-duo",
          ],
        },
        // 7. AlphaTheta XDJ-AZ
        {
          canonical: "xdj-az",
          aliases: [
            "pioneer-xdj-az",
            "alphatheta-xdj-az",
            "ban-dj-xdj-az",
            "ban-dj-alphatheta-xdj-az",
          ],
        },
        // 8. AlphaTheta XDJ-AN
        { canonical: "xdj-an", aliases: ["alphatheta-xdj-an", "ban-dj-xdj-an"] },
        // 9. Pioneer DJ XDJ-XZ
        { canonical: "xdj-xz", aliases: ["pioneer-xdj-xz", "pioneer-dj-xdj-xz", "ban-dj-xdj-xz"] },
        // 10. 18SW115 Speaker
        { canonical: "loa-sub-roi-bc-speakers-5-tac-18sw115", aliases: ["18sw115", "loa-sub-roi-b-c-speakers-5-tac-18sw115"] },
      ].flatMap(({ canonical, aliases }) =>
        aliases.flatMap((alias) => [
          {
            source: `/products/${alias}`,
            destination: `/products/${canonical}`,
            permanent: true,
          },
          {
            source: `/san-pham/${alias}`,
            destination: `/products/${canonical}`,
            permanent: true,
          },
        ])
      ),
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
