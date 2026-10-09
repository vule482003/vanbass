import { Product } from "./types";

export function resolveProductImage(url?: string | null, slug?: string): string {
  if (!url || typeof url !== "string") {
    if (slug) return `/images/products/${slug}.png`;
    return "/images/products/placeholder.png";
  }

  const trimmed = url.trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") {
    if (slug) return `/images/products/${slug}.png`;
    return "/images/products/placeholder.png";
  }

  // If local development host is hardcoded in the database, strip it out so it works in production
  const cleaned = trimmed.replace(/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i, "");

  // If already full valid web URL
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://") || cleaned.startsWith("data:") || cleaned.startsWith("blob:")) {
    // If running on HTTPS, convert any internal HTTP to relative or HTTPS to prevent mixed content blocking
    if (typeof window !== "undefined" && window.location.protocol === "https:" && cleaned.startsWith("http://")) {
      try {
        const parsed = new URL(cleaned);
        if (parsed.hostname === window.location.hostname) {
          return `${parsed.pathname}${parsed.search}`;
        }
      } catch {
        // Continue
      }
    }
    return cleaned;
  }

  // If starts with /images/
  if (cleaned.startsWith("/images/")) {
    return cleaned;
  }

  if (cleaned.startsWith("images/")) {
    return `/${cleaned}`;
  }

  // If uploads/ or other backend paths
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
  const backendBase = apiUrl.replace(/\/api\/?$/, "");
  const normalizedPath = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;

  return `${backendBase}${normalizedPath}`;
}

export function getProductImageUrl(
  product?: (Partial<Product> & { image?: string; thumbnail?: string }) | null
): string {
  if (!product) return "/images/products/placeholder.png";

  const rawUrl =
    product.images?.[0]?.image_url ||
    product.image_url ||
    product.image ||
    product.thumbnail;

  if (rawUrl && typeof rawUrl === "string") {
    const trimmed = rawUrl.trim();
    if (trimmed && trimmed !== "null" && trimmed !== "undefined") {
      return resolveProductImage(trimmed, product.slug);
    }
  }

  if (product.slug) {
    return `/images/products/${product.slug}.png`;
  }

  return "/images/products/placeholder.png";
}

export function getProductFallbackImage(slug?: string): string {
  if (!slug) return "/images/products/placeholder.png";
  return `/images/products/${slug}.png`;
}
