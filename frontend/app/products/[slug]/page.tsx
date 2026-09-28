import type { Metadata } from "next";
import { MOCK_PRODUCTS } from "../../lib/mock-data";
import ProductDetailClient from "./ProductDetailClient";
import { Product } from "../../lib/types";
import { getProductPlainExcerpt } from "../../lib/product-i18n";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 8 Hot Search Priority Models Mapping (Short URL -> Real Product Slug)
export const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  "xdj-rx3": "xdj-rx3",
  "xdj-rx2": "xdj-rx2",
  "xdj-rr": "xdj-rr",
  "ddj-flx4": "ddj-flx4",
  "ddj-flx2": "alphatheta-ddj-flx2",
  "omnis-duo": "ban-dj-alpha-theta-omnis-duo",
  "xdj-az": "ban-dj-alphatheta-xdj-az",
  "xdj-an": "alphatheta-xdj-an",
};

export const HOT_MODELS_SEO: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    canonicalSlug: string;
    image: string;
    faqs: { question: string; answer: string }[];
  }
> = {
  "xdj-rx3": {
    title: "Bàn DJ Pioneer DJ XDJ-RX3 All-In-One | Thuê & Mua Chính Hãng Giá Tốt",
    description:
      "Phân phối chính hãng và dịch vụ cho thuê bàn DJ Pioneer DJ XDJ-RX3 All-In-One 2 kênh tại Đà Nẵng, Huế & Toàn quốc. Màn hình cảm ứng 10.1 inch, giao diện CDJ-3000, Release FX đỉnh cao, máy mới 99%, setup tận nơi 24/7.",
    keywords: [
      "XDJ RX3",
      "xdj rx3",
      "thuê xdj rx3",
      "Pioneer DJ XDJ-RX3",
      "thuê bàn dj xdj rx3",
      "bàn dj pioneer rx3",
      "giá bàn dj rx3",
      "thuê bàn dj đà nẵng",
      "vanbass music center",
    ],
    canonicalSlug: "xdj-rx3",
    image: "/images/products/xdj-rx3.png",
    faqs: [
      {
        question: "Bàn DJ Pioneer DJ XDJ-RX3 có cần cắm máy tính / laptop để chơi không?",
        answer:
          "Không cần máy tính. Pioneer DJ XDJ-RX3 là hệ thống All-In-One độc lập, bạn chỉ cần cắm USB đã phân tích nhạc qua Rekordbox là có thể biểu diễn trực tiếp trên màn hình cảm ứng 10.1 inch siêu mượt.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer XDJ-RX3 tại Đà Nẵng, Huế & Miền Trung là bao nhiêu?",
        answer:
          "Giá thuê Pioneer XDJ-RX3 tại VanBass Music Center dao động từ 1.000.000đ - 1.200.000đ/ngày (24 giờ). VanBass hỗ trợ giao nhận, bàn giao kỹ thuật và setup tận nơi 24/7 tại Đà Nẵng, Hội An, Huế.",
      },
      {
        question: "Pioneer XDJ-RX3 có những điểm nâng cấp gì nổi bật so với XDJ-RX2?",
        answer:
          "XDJ-RX3 nâng cấp vượt bậc với màn hình cảm ứng 10.1 inch siêu nét (so với 7 inch của RX2), giao diện duyệt nhạc GUI từ CDJ-3000, 14 Beat FX + 6 Sound Color FX từ DJM-900NXS2, tính năng Release FX trên pad và màn hình On-Jog LCD màu hiển thị artwork.",
      },
    ],
  },
  "xdj-rx2": {
    title: "Bàn DJ Pioneer DJ XDJ-RX2 All-In-One 2 Kênh | Thuê & Mua Giá Rẻ",
    description:
      "Dịch vụ cho thuê và bán bàn DJ Pioneer DJ XDJ-RX2 All-In-One chính hãng tại Đà Nẵng, Thừa Thiên Huế & Miền Trung. Màn hình cảm ứng 7 inch, cắm 2 USB chơi nhạc độc lập, bố cục chuẩn club NXS2, máy mới 98%, giá thuê tiết kiệm nhất.",
    keywords: [
      "XDJ RX2",
      "xdj rx2",
      "thuê xdj rx2",
      "Pioneer DJ XDJ-RX2",
      "thuê bàn dj rx2",
      "giá thuê xdj rx2",
      "thuê bàn dj đà nẵng giá rẻ",
      "vanbass",
    ],
    canonicalSlug: "xdj-rx2",
    image: "/images/products/xdj-rx2.png",
    faqs: [
      {
        question: "Bàn DJ Pioneer DJ XDJ-RX2 có ưu điểm gì khi mua hoặc thuê biểu diễn?",
        answer:
          "Pioneer DJ XDJ-RX2 là dòng bàn DJ All-In-One 2 kênh bền bỉ và chuẩn mực nhất, bố cục phím chuẩn Club NXS2, màn hình cảm ứng 7 inch, hỗ trợ chơi USB độc lập mượt mà và chi phí thuê cực kỳ tiết kiệm.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer XDJ-RX2 tại Đà Nẵng là bao nhiêu?",
        answer:
          "Giá thuê Pioneer XDJ-RX2 tại VanBass là 800.000đ - 1.000.000đ/ngày. Thiết bị bảo dưỡng mới 98%, fader mượt, đầy đủ phụ kiện nguồn và dây tín hiệu âm thanh chuyên nghiệp.",
      },
    ],
  },
  "xdj-rr": {
    title: "Bàn DJ Pioneer DJ XDJ-RR All-In-One | Thuê & Mua Nhỏ Gọn Giá Tốt",
    description:
      "Cho thuê và phân phối bàn DJ Pioneer DJ XDJ-RR All-In-One 2 kênh. Thiết kế nhẹ chỉ 5.2kg, màn hình màu 7 inch, 2 cổng USB phát nhạc độc lập, hoàn hảo cho tiệc gia đình, homestay, villa tại Đà Nẵng.",
    keywords: [
      "XDJ RR",
      "xdj rr",
      "thuê xdj rr",
      "Pioneer DJ XDJ-RR",
      "thuê bàn dj mini",
      "bàn dj all in one giá rẻ",
      "vanbass",
    ],
    canonicalSlug: "xdj-rr",
    image: "/images/products/xdj-rr.jpg",
    faqs: [
      {
        question: "Bàn DJ Pioneer XDJ-RR phù hợp với đối tượng nào?",
        answer:
          "Pioneer XDJ-RR là thiết bị All-In-One 2 kênh gọn nhẹ nhất (chỉ 5.2 kg), hoàn hảo cho DJ tập luyện tại nhà, biểu diễn tiệc sinh nhật, villa, homestay với màn hình màu 7 inch và 2 cổng USB phát nhạc độc lập.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer XDJ-RR tại VanBass là bao nhiêu?",
        answer:
          "Giá thuê Pioneer XDJ-RR tại VanBass dao động từ 600.000đ - 800.000đ/ngày, hỗ trợ giao máy nhanh trong 2 giờ tại Đà Nẵng.",
      },
    ],
  },
  "ddj-flx4": {
    title: "Bàn DJ Pioneer DDJ-FLX4 – DJ Controller 2 Kênh | Thuê & Mua Giá Rẻ Nhất",
    description:
      "Cho thuê và phân phối chính hãng Pioneer DDJ-FLX4 – DJ Controller 2 kênh quốc dân tương thích Rekordbox & Serato DJ. Tính năng Smart Fader & Smart CFX, kết nối PC/Mac/iOS/Android, giá thuê chỉ từ 400k/ngày tại Đà Nẵng.",
    keywords: [
      "DDJ FLX4",
      "ddj flx4",
      "thuê ddj flx4",
      "Pioneer DDJ-FLX4",
      "thuê bàn dj mini",
      "giá bàn dj flx4",
      "thuê bàn dj đà nẵng",
      "vanbass",
    ],
    canonicalSlug: "ddj-flx4",
    image: "/images/products/ddj-flx4.png",
    faqs: [
      {
        question: "Pioneer DDJ-FLX4 có kết nối được với điện thoại và máy tính không?",
        answer:
          "Có. Pioneer DDJ-FLX4 kết nối dễ dàng qua cổng USB-C hoặc Bluetooth với cả máy tính (PC, Mac) và thiết bị di động (iPhone, iPad, Android), tương thích hoàn hảo với Rekordbox DJ và Serato DJ.",
      },
      {
        question: "Tính năng Smart Fader trên DDJ-FLX4 hoạt động như thế nào?",
        answer:
          "Smart Fader tự động điều chỉnh tốc độ BPM, âm lượng và hiệu ứng bass khi bạn kéo fader, giúp người mới bắt đầu dễ dàng chuyển bài giữa các thể loại nhạc khác nhau một cách chuyên nghiệp.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer DDJ-FLX4 tại Đà Nẵng là bao nhiêu?",
        answer:
          "Giá thuê Pioneer DDJ-FLX4 tại VanBass chỉ từ 400.000đ/ngày. Đầy đủ dây cáp kết nối và hỗ trợ kỹ thuật cài đặt phần mềm từ xa hoặc tận nơi 24/7.",
      },
    ],
  },
  "ddj-flx2": {
    title: "Bàn DJ AlphaTheta DDJ-FLX2 – Controller Siêu Nhẹ | Thuê & Mua Giá Rẻ",
    description:
      "Phân phối và cho thuê bàn DJ AlphaTheta DDJ-FLX2 thế hệ mới siêu nhỏ gọn chỉ 1.2kg. Hỗ trợ Bluetooth kết nối smartphone, iPad, Smart CFX, Smart Fader, phù hợp biểu diễn picnic, tiệc bạn bè.",
    keywords: [
      "DDJ FLX2",
      "ddj flx2",
      "thuê ddj flx2",
      "AlphaTheta DDJ-FLX2",
      "bàn dj kết nối điện thoại",
      "bàn dj mini",
      "vanbass",
    ],
    canonicalSlug: "ddj-flx2",
    image: "/images/products/alphatheta-ddj-flx2.png",
    faqs: [
      {
        question: "AlphaTheta DDJ-FLX2 có điểm gì đặc biệt so với các dòng Controller khác?",
        answer:
          "DDJ-FLX2 là bàn DJ nhẹ nhất thế giới (chỉ 1.2 kg), được thiết kế tối giản, hỗ trợ kết nối không dây Bluetooth với smartphone/tablet và nhiều ứng dụng DJ như Rekordbox Mobile, djay, Serato DJ Lite.",
      },
      {
        question: "Thuê bàn DJ AlphaTheta DDJ-FLX2 giá bao nhiêu?",
        answer:
          "Giá thuê AlphaTheta DDJ-FLX2 chỉ 350.000đ/ngày, thích hợp mang đi du lịch, picnic, cắm trại ngoài trời hoặc tiệc bạn bè.",
      },
    ],
  },
  "omnis-duo": {
    title: "Bàn DJ AlphaTheta OMNIS-DUO Dùng Pin Không Dây | Thuê & Mua Chính Hãng",
    description:
      "Dịch vụ cho thuê & bán bàn DJ AlphaTheta OMNIS-DUO di động tích hợp pin 5 giờ, kết nối Bluetooth, SonicLink không dây siêu tốc. Chơi nhạc mọi lúc mọi nơi trên bãi biển, du thuyền, villa tại Đà Nẵng, Hội An.",
    keywords: [
      "OMNIS DUO",
      "omnis duo",
      "thuê omnis duo",
      "AlphaTheta OMNIS-DUO",
      "bàn dj dùng pin",
      "bàn dj không dây",
      "thuê bàn dj ngoài trời",
      "vanbass",
    ],
    canonicalSlug: "omnis-duo",
    image: "/images/products/ban-dj-alpha-theta-omnis-duo.png",
    faqs: [
      {
        question: "AlphaTheta OMNIS-DUO có pin dùng được bao lâu và có cần cắm điện không?",
        answer:
          "OMNIS-DUO tích hợp pin sạc Lithium-ion cho thời lượng biểu diễn lên tới 5 giờ liên tục mà không cần cắm nguồn điện. Bạn có thể tự do chơi nhạc trên bãi biển, du thuyền hoặc các bữa tiệc ngoài trời.",
      },
      {
        question: "Khách có thể gửi nhạc qua Bluetooth vào OMNIS-DUO để DJ phát không?",
        answer:
          "Có, OMNIS-DUO sở hữu tính năng Bluetooth Audio Input độc quyền, cho phép bạn hoặc khách dự tiệc kết nối điện thoại và phát trực tiếp track nhạc vào một kênh trên bàn DJ để mix ngay lập tức.",
      },
      {
        question: "Giá thuê bàn DJ AlphaTheta OMNIS-DUO tại Đà Nẵng là bao nhiêu?",
        answer:
          "Giá thuê OMNIS-DUO tại VanBass từ 1.200.000đ/ngày. Máy mới 99%, kèm loa không dây Wave-Eight nếu cần trọn gói âm thanh di động.",
      },
    ],
  },
  "xdj-az": {
    title: "Bàn DJ AlphaTheta XDJ-AZ 4 Kênh All-In-One Flagship | Thuê & Mua Giá Tốt",
    description:
      "Cho thuê và phân phối Flagship All-In-One 4 kênh AlphaTheta XDJ-AZ thế hệ mới chuẩn Club. Màn hình 10.1 inch, Wi-Fi CloudDirectPlay, âm thanh 32-bit ESS, mâm xoay Full-size CDJ-3000, giao lắp tận nơi tại Đà Nẵng, Huế.",
    keywords: [
      "XDJ AZ",
      "xdj az",
      "thuê xdj az",
      "AlphaTheta XDJ-AZ",
      "bàn dj 4 kênh",
      "thuê bàn dj chuyên nghiệp",
      "xdj-az đà nẵng",
      "vanbass music center",
    ],
    canonicalSlug: "xdj-az",
    image: "/images/products/ban-dj-alphatheta-xdj-az.png",
    faqs: [
      {
        question: "Bàn DJ AlphaTheta XDJ-AZ có gì vượt trội so với Pioneer XDJ-XZ?",
        answer:
          "XDJ-AZ là thế hệ kế nhiệm Flagship 4 kênh All-In-One, nâng cấp màn hình cảm ứng 10.1 inch điện dung, tích hợp Wi-Fi CloudDirectPlay phát nhạc từ đám mây, bộ phát không dây SonicLink siêu tốc độ, mâm xoay full-size chuẩn CDJ-3000 và chất lượng âm thanh 32-bit D/A cao cấp nhất.",
      },
      {
        question: "Giá thuê bàn DJ AlphaTheta XDJ-AZ 4 kênh tại Đà Nẵng là bao nhiêu?",
        answer:
          "Giá thuê AlphaTheta XDJ-AZ dao động từ 2.000.000đ - 2.500.000đ/ngày, chuyên phục vụ các show diễn Festival, Bar Club lớn và DJ quốc tế.",
      },
    ],
  },
  "xdj-an": {
    title: "Bàn DJ AlphaTheta XDJ-AN All-In-One Chuyên Nghiệp | Thuê & Mua",
    description:
      "Dịch vụ cho thuê và phân phối chính hãng máy DJ AlphaTheta XDJ-AN All-In-One 2 kênh thế hệ mới. Màn hình cảm ứng hiện đại, workflow chuyên nghiệp CDJ/XDJ, thiết bị mới 99% tại Đà Nẵng, Huế & Toàn quốc.",
    keywords: [
      "XDJ AN",
      "xdj an",
      "thuê xdj an",
      "AlphaTheta XDJ-AN",
      "bàn dj all in one",
      "thuê bàn dj đà nẵng",
      "vanbass",
    ],
    canonicalSlug: "xdj-an",
    image: "/images/products/alphatheta-xdj-an.png",
    faqs: [
      {
        question: "AlphaTheta XDJ-AN phù hợp với nhu cầu sử dụng nào?",
        answer:
          "XDJ-AN là thiết bị All-In-One thế hệ mới từ AlphaTheta với thiết kế tối giản, điều khiển trực quan qua màn hình cảm ứng hiện đại và thừa hưởng trọn vẹn chất âm biểu diễn chuyên nghiệp của hệ sinh thái AlphaTheta/Pioneer DJ.",
      },
      {
        question: "Giá thuê máy DJ AlphaTheta XDJ-AN là bao nhiêu?",
        answer:
          "Giá thuê XDJ-AN tại VanBass là 1.500.000đ/ngày, giao và hướng dẫn kỹ thuật tận nơi tại Đà Nẵng & Huế.",
      },
    ],
  },
};

// Helper: Normalize or map input slug to key model
function resolveModelKey(rawSlug: string): string | null {
  const s = rawSlug.toLowerCase();
  if (HOT_MODELS_SEO[s]) return s;
  if (s.includes("rx3")) return "xdj-rx3";
  if (s.includes("rx2")) return "xdj-rx2";
  if (s.includes("xdj-rr")) return "xdj-rr";
  if (s.includes("flx4")) return "ddj-flx4";
  if (s.includes("flx2")) return "ddj-flx2";
  if (s.includes("omnis")) return "omnis-duo";
  if (s.includes("xdj-az")) return "xdj-az";
  if (s.includes("xdj-an")) return "xdj-an";
  return null;
}

async function getProduct(slug: string): Promise<Product | null> {
  const modelKey = resolveModelKey(slug);
  const aliasTarget = PRODUCT_SLUG_ALIASES[slug.toLowerCase()] || (modelKey ? PRODUCT_SLUG_ALIASES[modelKey] : null);

  const localProduct = MOCK_PRODUCTS.find(
    (p) => p.slug === slug || (aliasTarget && p.slug === aliasTarget) || (modelKey && p.slug.includes(modelKey))
  );
  if (localProduct) return localProduct;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const res = await fetch(`${apiUrl}/products/by-slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return await res.json();
    }
    if (aliasTarget) {
      const aliasRes = await fetch(`${apiUrl}/products/by-slug/${aliasTarget}`, {
        next: { revalidate: 60 },
      });
      if (aliasRes.ok) {
        return await aliasRes.json();
      }
    }
  } catch {
    // fallback
  }
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

  if (!product) {
    return {
      title: "Sản phẩm không tìm thấy | VanBass Music Center",
      description: "Sản phẩm không tồn tại hoặc đã ngừng kinh doanh tại VanBass Music Center.",
    };
  }

  const modelKey = resolveModelKey(slug);
  if (modelKey && HOT_MODELS_SEO[modelKey]) {
    const seo = HOT_MODELS_SEO[modelKey];
    const canonicalPath = `/products/${seo.canonicalSlug}`;
    const fullImg = seo.image.startsWith("http") ? seo.image : `${baseUrl}${seo.image.startsWith("/") ? "" : "/"}${seo.image}`;

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: `${baseUrl}${canonicalPath}`,
        type: "article",
        images: [
          {
            url: fullImg,
            width: 800,
            height: 600,
            alt: seo.title,
          },
        ],
      },
    };
  }

  // General product metadata
  const title = `${product.name} | Thuê & Mua Chính Hãng`;
  const plainDesc = getProductPlainExcerpt(product.description, 160) || product.name;
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

  const modelKey = resolveModelKey(slug);
  const hotSeo = modelKey ? HOT_MODELS_SEO[modelKey] : null;
  const canonicalSlug = hotSeo?.canonicalSlug || slug;

  let jsonLd = null;
  if (product) {
    const rawImg = hotSeo?.image || product.images?.[0]?.image_url || product.image_url || "/images/placeholder.png";
    const fullImg = rawImg.startsWith("http") ? rawImg : `${baseUrl}${rawImg.startsWith("/") ? "" : "/"}${rawImg}`;
    const plainDesc = hotSeo?.description || getProductPlainExcerpt(product.description, 250) || product.name;

    const graph: any[] = [
      {
        "@type": "Product",
        "@id": `${baseUrl}/products/${canonicalSlug}#product`,
        "name": hotSeo ? hotSeo.title.split("|")[0].trim() : product.name,
        "image": fullImg,
        "description": plainDesc,
        "sku": product.sku || canonicalSlug.toUpperCase(),
        "brand": {
          "@type": "Brand",
          "name": product.brand || (modelKey?.includes("alphatheta") ? "AlphaTheta" : "Pioneer DJ"),
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "52",
          "bestRating": "5",
          "worstRating": "1",
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Khách hàng xác thực",
            },
            "datePublished": "2026-03-01",
            "reviewBody": "Sản phẩm chính hãng chất lượng cực cao, âm thanh chuẩn xác, dịch vụ tư vấn và hậu mãi tận tâm 24/7.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
            },
          },
        ],
        "offers": {
          "@type": "Offer",
          "url": `${baseUrl}/products/${canonicalSlug}`,
          "priceCurrency": "VND",
          "price": product.sale_price || 0,
          "priceValidUntil": "2027-12-31",
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
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "VN",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 7,
            "returnMethod": "https://schema.org/ReturnInStore",
            "returnFees": "https://schema.org/FreeReturn",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/products/${canonicalSlug}#breadcrumb`,
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
            "name": hotSeo ? hotSeo.title.split("|")[0].trim() : product.name,
            "item": `${baseUrl}/products/${canonicalSlug}`,
          },
        ],
      },
    ];

    if (hotSeo && hotSeo.faqs && hotSeo.faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${baseUrl}/products/${canonicalSlug}#faq`,
        "mainEntity": hotSeo.faqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        })),
      });
    }

    jsonLd = {
      "@context": "https://schema.org",
      "@graph": graph,
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
      <ProductDetailClient
        initialProduct={product}
        slug={slug}
        faqs={hotSeo?.faqs || []}
        modelKey={modelKey}
      />
    </>
  );
}
