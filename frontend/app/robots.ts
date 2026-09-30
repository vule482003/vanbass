import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "MSNBot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
          "facebookexternalhit",
          "Twitterbot",
          "*",
        ],
        allow: [
          "/",
          "/thue-ban-dj",
          "/products",
          "/products/*",
          "/images/*",
          "/about",
          "/contact",
          "/static/uploads/*",
          "/*.txt",
          "/*.xml",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/profile",
          "/profile/*",
          "/cart",
          "/login",
          "/register",
          "/api/admin/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
