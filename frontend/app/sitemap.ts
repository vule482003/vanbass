import { MetadataRoute } from "next";
import { fetchProducts } from "./lib/api";
import { PRODUCT_SLUG_ALIASES } from "./products/[slug]/page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn").replace(/\/+$/, "");
  const now = new Date();

  // 1. Static Core & Hub Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ban-dj`,
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
      url: `${baseUrl}/sua-chua-ban-dj`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/day-hoc-dj`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/day-hoc-mc-hype`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/su-kien-setup`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
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
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/policies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Hot Search Priority Models (Top DJ Gear for Sales & Rental)
  const hotSearchSlugs = new Set([
    "xdj-rx3",
    "xdj-rx2",
    "xdj-rr",
    "ddj-flx4",
    "ddj-flx2",
    "omnis-duo",
    "xdj-az",
    "xdj-an",
    "xdj-xz",
  ]);

  // Track URLs to strictly prevent any duplication and redirect URLs
  const seenUrls = new Set<string>();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    if (!seenUrls.has(route.url)) {
      seenUrls.add(route.url);
      sitemapEntries.push(route);
    }
  }

  // 2. Fetch Real Product Data from Backend / PostgreSQL (with graceful fallback)
  try {
    const products = await fetchProducts();

    if (Array.isArray(products)) {
      for (const product of products) {
        // Exclude inactive products
        if (product.is_active === false) continue;

        const rawSlug = product.slug?.trim();
        if (!rawSlug) continue;

        // Resolve to final Canonical Slug (strips legacy aliases & redirects like ban-dj-alphatheta-xdj-az -> xdj-az)
        const normalizedSlug = rawSlug.toLowerCase();
        const canonicalSlug = PRODUCT_SLUG_ALIASES[normalizedSlug] || normalizedSlug;

        // Ensure slug is clean and URL-safe
        const cleanSlug = encodeURI(canonicalSlug);
        const productUrl = `${baseUrl}/products/${cleanSlug}`;

        if (!seenUrls.has(productUrl)) {
          seenUrls.add(productUrl);

          const isHot = hotSearchSlugs.has(canonicalSlug);
          sitemapEntries.push({
            url: productUrl,
            lastModified: now,
            changeFrequency: isHot ? "daily" : "weekly",
            priority: isHot ? 1.0 : 0.8,
          });
        }
      }
    }

    // 3. Ensure Core Canonical DJ Models are guaranteed in sitemap if not already added by API
    for (const hotSlug of hotSearchSlugs) {
      const canonicalSlug = PRODUCT_SLUG_ALIASES[hotSlug] || hotSlug;
      const cleanSlug = encodeURI(canonicalSlug);
      const productUrl = `${baseUrl}/products/${cleanSlug}`;

      if (!seenUrls.has(productUrl)) {
        seenUrls.add(productUrl);
        sitemapEntries.push({
          url: productUrl,
          lastModified: now,
          changeFrequency: "daily",
          priority: 1.0,
        });
      }
    }
  } catch (error) {
    console.error("[Sitemap Generation] Error fetching products for sitemap:", error);
  }

  return sitemapEntries;
}


