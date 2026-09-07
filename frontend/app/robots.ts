import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanbass.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/thue-ban-dj",
          "/products",
          "/products/*",
          "/images/*",
          "/about",
          "/contact",
          "/static/uploads/*",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/profile",
          "/profile/*",
          "/cart",
          "/login",
          "/register",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
