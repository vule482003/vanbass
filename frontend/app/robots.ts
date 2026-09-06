import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanbass.vn";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/products",
          "/products/*",
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
