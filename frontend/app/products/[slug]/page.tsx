import type { Metadata } from "next";
import { MOCK_PRODUCTS } from "../../lib/mock-data";
import ProductDetailClient from "./ProductDetailClient";
import { Product } from "../../lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  const localProduct = MOCK_PRODUCTS.find((p) => p.slug === slug);
  if (localProduct) return localProduct;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const res = await fetch(`${apiUrl}/products/by-slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanbass.vercel.app";

  if (!product) {
    return {
      title: "Sản phẩm không tìm thấy | VanBass Music Center",
      description: "Sản phẩm không tồn tại hoặc đã ngừng kinh doanh tại VanBass Music Center.",
    };
  }

  // Specific high-converting SEO optimizations for key targets
  if (slug === "xdj-rx3") {
    const title = "Bàn DJ Pioneer DJ XDJ-RX3 All-In-One | Thuê Bàn DJ & Mua Chính Hãng";
    const description =
      "Dịch vụ cho thuê bàn DJ Pioneer DJ XDJ-RX3 All-In-One và phân phối chính hãng tại Đà Nẵng & Toàn quốc. Màn hình cảm ứng 10.1 inch, hiệu ứng chuyên nghiệp, thiết bị mới 99%, giao nhận và setup tận nơi 24/7.";
    return {
      title,
      description,
      keywords: [
        "thuê bàn dj",
        "thue ban dj",
        "DJ PIONEER DJ XDJ-RX3",
        "Pioneer DJ XDJ-RX3",
        "thuê bàn dj pioneer rx3",
        "thuê xdj rx3",
        "bàn dj all in one",
        "vanbass music center",
      ],
      alternates: {
        canonical: `/products/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${baseUrl}/products/${slug}`,
        type: "article",
        images: [
          {
            url: `${baseUrl}/images/products/xdj-rx3.png`,
            width: 800,
            height: 600,
            alt: "Bàn DJ Pioneer DJ XDJ-RX3 All-In-One",
          },
        ],
      },
    };
  }

  if (slug === "ddj-flx4") {
    const title = "DJ Pioneer DDJ-FLX4 – DJ Controller 2 Kênh | Thuê & Mua Giá Rẻ";
    const description =
      "Cho thuê và phân phối DJ Pioneer DDJ-FLX4 – DJ Controller 2 kênh dành cho Rekordbox & Serato DJ. Thiết kế nhỏ gọn, hỗ trợ Smart Fader & Smart CFX, giá thuê rẻ nhất, giao nhận nhanh chóng.";
    return {
      title,
      description,
      keywords: [
        "thuê bàn dj",
        "thue ban dj",
        "DJ Pioneer DDJ-FLX4 – DJ Controller",
        "DJ Pioneer DDJ-FLX4",
        "Pioneer DDJ-FLX4",
        "thuê bàn dj mini",
        "thuê flx4",
        "bàn dj controller",
        "vanbass",
      ],
      alternates: {
        canonical: `/products/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${baseUrl}/products/${slug}`,
        type: "article",
        images: [
          {
            url: `${baseUrl}/images/products/ddj-flx4.png`,
            width: 800,
            height: 600,
            alt: "DJ Pioneer DDJ-FLX4 – DJ Controller",
          },
        ],
      },
    };
  }

  // General product metadata
  const title = `${product.name} | Thuê & Mua Chính Hãng`;
  const plainDesc = product.description
    ? product.description.replace(/<[^>]*>/g, "").slice(0, 160).trim()
    : product.name;
  const description = `${plainDesc}... Dịch vụ cho thuê bàn DJ và phân phối thiết bị âm thanh chính hãng tại VanBass Music Center.`;
  const rawImg = product.images?.[0]?.image_url || product.image_url || "/images/placeholder.png";
  const ogImg = rawImg.startsWith("http") ? rawImg : `${baseUrl}${rawImg.startsWith("/") ? "" : "/"}${rawImg}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.brand || "DJ Pioneer",
      "thuê bàn dj",
      "thue ban dj",
      "thiết bị dj",
      "vanbass",
    ],
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/products/${slug}`,
      type: "article",
      images: [
        {
          url: ogImg,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanbass.vercel.app";

  let jsonLd = null;
  if (product) {
    const rawImg = product.images?.[0]?.image_url || product.image_url || "/images/placeholder.png";
    const fullImg = rawImg.startsWith("http") ? rawImg : `${baseUrl}${rawImg.startsWith("/") ? "" : "/"}${rawImg}`;
    const plainDesc = product.description
      ? product.description.replace(/<[^>]*>/g, "").slice(0, 250).trim()
      : product.name;

    jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${baseUrl}/products/${slug}#product`,
          "name": product.name,
          "image": fullImg,
          "description": plainDesc,
          "sku": product.sku || product.slug,
          "brand": {
            "@type": "Brand",
            "name": product.brand || "Pioneer DJ",
          },
          "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/products/${slug}`,
            "priceCurrency": "VND",
            "price": product.sale_price || 0,
            "itemCondition": "https://schema.org/NewCondition",
            "availability":
              product.stock_quantity > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "VanBass Music Center",
              "url": baseUrl,
            },
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${baseUrl}/products/${slug}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Trang chủ",
              "item": baseUrl,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Sản phẩm",
              "item": `${baseUrl}/products`,
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": product.name,
              "item": `${baseUrl}/products/${slug}`,
            },
          ],
        },
      ],
    };
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient initialProduct={product} slug={slug} />
    </>
  );
}
