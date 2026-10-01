import { MetadataRoute } from "next";
import { MOCK_PRODUCTS } from "./lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/thue-ban-dj`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Hot Search Priority Models (Top DJ Gear for Sales & Rental)
  const hotSearchSlugs = [
    "xdj-rx3",
    "xdj-rx2",
    "xdj-rr",
    "ddj-flx4",
    "ddj-flx2",
    "omnis-duo",
    "xdj-az",
    "xdj-an",
    "xdj-xz",
  ];

  const hotModelRoutes: MetadataRoute.Sitemap = hotSearchSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 1.0,
  }));

  // Dynamic product routes (excluding duplicates and alias slugs from hotSearchSlugs)
  const excludedFromDynamic = new Set([
    ...hotSearchSlugs,
    "alphatheta-ddj-flx2",
    "ban-dj-alpha-theta-omnis-duo",
    "ban-dj-alphatheta-xdj-az",
    "alphatheta-xdj-an",
    "ddj-flx4-w",
    "xdj-xz-n",
  ]);

  const productRoutes: MetadataRoute.Sitemap = MOCK_PRODUCTS.filter(
    (product) => !excludedFromDynamic.has(product.slug)
  ).map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...hotModelRoutes, ...productRoutes];
}
