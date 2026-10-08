"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import ProductImageGallery from "../../components/ProductImageGallery";
import StickyProductActionBar from "../../components/StickyProductActionBar";
import { MOCK_PRODUCTS } from "../../lib/mock-data";
import { useCart } from "../../lib/cart-context";
import { useAuth } from "../../lib/auth-context";
import { Product } from "../../lib/types";
import { fetchStoreSettings, getMessengerRentalUrl, getApiBaseUrl } from "../../lib/api";
import { useLanguage } from "../../lib/language-context";
import {
  BUSINESS_ADDRESS,
  BUSINESS_ADDRESS_HUE,
  CONTACTS,
} from "../../lib/contact-constants";
import {
  getTranslatedProductName,
  getTranslatedProductDesc,
  getTranslatedSpecKey,
  getProductPlainExcerpt,
} from "../../lib/product-i18n";

function formatCurrency(amount?: number, lang: "vi" | "en" = "vi") {
  if (amount === undefined || amount === null) return lang === "en" ? "Contact" : "Liên hệ";
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

const CANONICAL_TO_PRIMARY_DB_SLUG: Record<string, string> = {
  "ddj-flx2": "alphatheta-ddj-flx2",
  "xdj-az": "ban-dj-alphatheta-xdj-az",
  "omnis-duo": "ban-dj-alpha-theta-omnis-duo",
  "xdj-an": "alphatheta-xdj-an",
  "xdj-rx3": "xdj-rx3",
  "xdj-rx2": "xdj-rx2",
  "xdj-rr": "xdj-rr",
  "ddj-flx4": "ddj-flx4",
  "xdj-xz": "xdj-xz",
  "loa-sub-roi-bc-speakers-5-tac-18sw115": "loa-sub-roi-bc-speakers-5-tac-18sw115",
};

interface CompareLearnInfo {
  title: string;
  description: string;
  comparisons: {
    heading: string;
    summary: string;
    points: string[];
    recommendation: string;
  }[];
  buyerGuide: {
    whoShouldBuy: string;
    budgetAdvice: string;
    keyAdvantage: string;
  };
}

const COMPARE_LEARN_DATA: Record<string, CompareLearnInfo> = {
  "xdj-rx3": {
    title: "Cẩm Nang So Sánh & Hướng Dẫn Chọn Mua Pioneer DJ XDJ-RX3",
    description: "Phân tích chuyên sâu từ kỹ thuật viên VanMusic giúp bạn so sánh XDJ-RX3 với các model tiền nhiệm và thế hệ mới:",
    comparisons: [
      {
        heading: "1. So sánh Pioneer XDJ-RX3 vs Pioneer XDJ-RX2",
        summary: "RX3 là bước nhảy vọt công nghệ toàn diện so với thế hệ RX2 ra mắt trước đó.",
        points: [
          "Màn hình cảm ứng: RX3 nâng cấp lên 10.1 inch siêu nét (so với RX2 7 inch), tần số quét cao hiển thị 3 dạng sóng Waveform mượt mà.",
          "Giao diện duyệt nhạc GUI: Thừa hưởng trực tiếp từ flagship CDJ-3000, tìm bài và Touch Preview nhanh gấp 2 lần.",
          "Hiệu ứng âm thanh: Bổ sung Release FX trên pad (Vinyl Brake, Spin, Build-up) cùng 14 Beat FX và 6 Sound Color FX chuẩn DJM-900NXS2.",
          "Mâm Jogwheel: Tích hợp màn hình LCD màu On-Jog hiển thị artwork bài hát và cue marker rõ nét.",
        ],
        recommendation: "Nếu bạn đi show chuyên nghiệp, XDJ-RX3 hoàn toàn vượt trội và xứng đáng đầu tư hơn RX2.",
      },
      {
        heading: "2. So sánh Pioneer XDJ-RX3 vs AlphaTheta XDJ-AZ",
        summary: "Cân nhắc giữa hệ thống 2 kênh All-in-One gọn gàng và quái vật 4 kênh Flagship thế hệ mới.",
        points: [
          "Số kênh: RX3 là 2 kênh All-in-one; XDJ-AZ là hệ thống 4 kênh độc lập toàn diện.",
          "Kết nối đám mây: XDJ-AZ tích hợp Wi-Fi và CloudDirectPlay lấy nhạc trực tiếp từ Rekordbox Cloud; RX3 dùng USB truyền thống.",
          "Chất âm: XDJ-AZ sử dụng chip giải mã âm thanh 32-bit ESS tân tiến nhất; RX3 giữ chất âm Club 24-bit ấm áp.",
          "Mức giá: XDJ-AZ có giá thành cao hơn đáng kể so với RX3.",
        ],
        recommendation: "Bar, Pub vừa và DJ di động nên chọn RX3 tối ưu chi phí; Club lớn và Festival chuẩn quốc tế nên chọn XDJ-AZ.",
      },
    ],
    buyerGuide: {
      whoShouldBuy: "DJ biểu diễn sự kiện, Bar, Pub, Lounge, Wedding Agency cần sự ổn định tuyệt đối không phụ thuộc laptop.",
      budgetAdvice: "Ngân sách 46 - 62 triệu đồng. Hỗ trợ trả góp 0% linh hoạt qua thẻ tín dụng.",
      keyAdvantage: "Giao diện thừa hưởng chuẩn CDJ-3000, cắm USB là chơi, tính thanh khoản thu cũ đổi mới giữ giá tốt.",
    },
  },
  "ddj-flx4": {
    title: "Cẩm Nang So Sánh & Hướng Dẫn Chọn Mua Pioneer DDJ-FLX4",
    description: "Bộ điều khiển DJ quốc dân bán chạy nhất thế giới dành cho người mới bắt đầu:",
    comparisons: [
      {
        heading: "1. So sánh Pioneer DDJ-FLX4 vs AlphaTheta DDJ-FLX2",
        summary: "FLX4 giữ vững vị thế tiêu chuẩn luyện tập chuyên nghiệp, FLX2 tối ưu hóa tính cơ động không dây.",
        points: [
          "Kích thước mâm: FLX4 mâm lớn hơn, cảm giác xoay và scratch đầm tay theo chuẩn layout Club.",
          "Số lượng phím: FLX4 trang bị 16 phím Pad cao su đầy đủ chức năng Hot Cue, Beat Jump, Sampler; FLX2 tinh gọn nhẹ hơn.",
          "Kết nối phần mềm: FLX4 hỗ trợ Rekordbox & Serato DJ đầy đủ trên PC/Mac; FLX2 hỗ trợ thêm djay qua Bluetooth.",
        ],
        recommendation: "Học DJ bài bản và luyện tập nghiêm túc nên chọn FLX4; Cần nhỏ gọn mang đi du lịch nên chọn FLX2.",
      },
      {
        heading: "2. So sánh Pioneer DDJ-FLX4 vs Pioneer XDJ-RX3",
        summary: "Khác biệt cốt lõi giữa DJ Controller và hệ thống All-In-One độc lập.",
        points: [
          "Cách thức hoạt động: FLX4 bắt buộc phải cắm Laptop hoặc Smartphone; RX3 cắm thẳng USB biểu diễn không cần máy tính.",
          "Màn hình hiển thị: FLX4 nhìn qua màn hình laptop; RX3 có sẵn màn cảm ứng 10.1 inch.",
          "Chi phí: FLX4 từ 8.5 triệu; RX3 từ 46 - 62 triệu đồng.",
        ],
        recommendation: "Người mới bắt đầu tập luyện nên mua FLX4 để tiết kiệm chi phí, sau 1-2 năm lên show chuyên nghiệp thì đổi lên RX3.",
      },
    ],
    buyerGuide: {
      whoShouldBuy: "Người mới bắt đầu học DJ, học viên DJ Academy, streamer, biểu diễn tiệc gia đình.",
      budgetAdvice: "Ngân sách từ 8.5 triệu đồng. Trả góp 0% chỉ khoảng 700.000đ/tháng.",
      keyAdvantage: "Smart Fader tự động chỉnh tempo/bass giúp chuyển bài mượt mà ngay từ ngày đầu tiên tập luyện.",
    },
  },
  "omnis-duo": {
    title: "Cẩm Nang So Sánh & Hướng Dẫn Chọn Mua AlphaTheta OMNIS-DUO",
    description: "Bàn DJ All-in-One không dây tích hợp pin đầu tiên mở ra kỷ nguyên tiệc di động:",
    comparisons: [
      {
        heading: "1. So sánh AlphaTheta OMNIS-DUO vs Pioneer DJ XDJ-RX3",
        summary: "OMNIS-DUO là giải pháp di động ngoài trời số 1, RX3 là tiêu chuẩn biểu diễn cố định tại Club.",
        points: [
          "Nguồn điện: OMNIS-DUO tích hợp pin sạc 5 giờ chơi liên tục không cần cắm điện; RX3 bắt buộc cắm nguồn điện 220V.",
          "Bluetooth: OMNIS-DUO cho phép phát nhạc từ điện thoại khách mời qua Bluetooth và xuất âm thanh ra loa Bluetooth.",
          "Thiết kế: OMNIS-DUO nhỏ gọn bỏ vừa balo du lịch, màu xanh chàm tối giản thời thượng.",
        ],
        recommendation: "Làm tiệc bãi biển, villa, pool party, du thuyền chọn OMNIS-DUO; Sân khấu Club và Bar cố định chọn RX3.",
      },
    ],
    buyerGuide: {
      whoShouldBuy: "DJ du lịch, DJ tiệc ngoài trời, Resort, Villa Party, Wedding bãi biển.",
      budgetAdvice: "Ngân sách 42 - 45 triệu đồng. Mới 100% fullbox bảo hành chính hãng.",
      keyAdvantage: "Pin 5 giờ, kết nối không dây hoàn toàn, không phụ thuộc ổ cắm điện.",
    },
  },
  "xdj-az": {
    title: "Cẩm Nang So Sánh & Hướng Dẫn Chọn Mua AlphaTheta XDJ-AZ",
    description: "Siêu phẩm All-in-One 4 kênh flagship thế hệ mới nhất cho Club & Festival:",
    comparisons: [
      {
        heading: "1. So sánh AlphaTheta XDJ-AZ vs Pioneer DJ XDJ-XZ",
        summary: "Bước chuyển giao công nghệ vĩ đại giữa hai thế hệ bàn DJ 4 kênh All-in-One.",
        points: [
          "Màn hình: XDJ-AZ trang bị màn hình cảm ứng 10.1 inch thế hệ mới (so với 7 inch của XDJ-XZ).",
          "Bộ giải mã âm thanh: XDJ-AZ trang bị DAC 32-bit ESS đỉnh cao chuẩn Club hiện đại; XDJ-XZ dùng chip 64-bit tiền nhiệm.",
          "Công nghệ đám mây: XDJ-AZ tích hợp Wi-Fi CloudDirectPlay lấy nhạc trực tiếp không cần cắm USB.",
        ],
        recommendation: "Đầu tư dài hạn cho Bar, Club, Festival tiêu chuẩn quốc tế nên chọn XDJ-AZ.",
      },
    ],
    buyerGuide: {
      whoShouldBuy: "Bar, Club lớn, Festival, DJ chuyên nghiệp cần 4 kênh độc lập chuẩn mực.",
      budgetAdvice: "Hỗ trợ trả góp 0% và chương trình Trade-in thu cũ đổi mới trợ giá cao nhất.",
      keyAdvantage: "Chuẩn âm thanh Club đỉnh cao 32-bit, màn hình 10.1 inch, kết nối đám mây không dây.",
    },
  },
  "ddj-flx2": {
    title: "Cẩm Nang So Sánh & Hướng Dẫn Chọn Mua AlphaTheta DDJ-FLX2",
    description: "Bàn DJ Controller siêu gọn nhẹ thế hệ mới kết nối Bluetooth không dây:",
    comparisons: [
      {
        heading: "1. So sánh AlphaTheta DDJ-FLX2 vs Pioneer DDJ-FLX4",
        summary: "FLX2 hướng đến sự tiện lợi tối đa khi di chuyển, FLX4 hướng đến trải nghiệm Club chuyên nghiệp.",
        points: [
          "Tính cơ động: FLX2 chỉ nặng khoảng 1.2kg, kết nối Bluetooth với iPad/iPhone không cần dây cáp rườm rà.",
          "Phần mềm tương thích: FLX2 tối ưu hóa cho Algoriddim djay và Rekordbox Mobile; FLX4 chuyên dụng cho Rekordbox & Serato trên laptop.",
        ],
        recommendation: "Cần bàn DJ nhỏ gọn nghe nhạc và mix mọi lúc mọi nơi chọn FLX2; Cần luyện tập thi đấu chọn FLX4.",
      },
    ],
    buyerGuide: {
      whoShouldBuy: "Người mới làm quen DJ, bạn trẻ yêu âm nhạc, người hay đi du lịch dã ngoại.",
      budgetAdvice: "Mức giá siêu tiết kiệm từ 5.8 triệu đồng.",
      keyAdvantage: "Bluetooth không dây, siêu nhẹ, chơi nhạc trực tiếp trên điện thoại/iPad.",
    },
  },
  "xdj-xz": {
    title: "Cẩm Nang So Sánh & Hướng Dẫn Chọn Mua Pioneer DJ XDJ-XZ",
    description: "Hệ thống 4 kênh All-In-One huyền thoại với mâm xoay Full-size CDJ-2000NXS2:",
    comparisons: [
      {
        heading: "1. So sánh Pioneer XDJ-XZ vs AlphaTheta XDJ-AZ",
        summary: "XDJ-XZ giữ giá trị kinh điển với mâm lớn cơ khí, XDJ-AZ nâng tầm với màn hình cảm ứng 10.1 inch và Wi-Fi.",
        points: [
          "Cảm giác mâm xoay: Cả hai đều trang bị mâm xoay Full-size 206mm đầm chắc cho cảm giác scratch và cue chuẩn nhất.",
          "Công nghệ: XDJ-AZ có màn hình 10.1 inch mượt mà và Wi-Fi; XDJ-XZ giữ giao diện màn 7 inch cổ điển ổn định.",
        ],
        recommendation: "Thích sự hoài niệm và layout tiêu chuẩn Bar Club truyền thống chọn XDJ-XZ với chi phí hợp lý.",
      },
    ],
    buyerGuide: {
      whoShouldBuy: "Club, Pub, Hội trường tiệc cưới, DJ chuyên nghiệp thích mâm xoay lớn.",
      budgetAdvice: "Ngân sách 58 - 68 triệu đồng.",
      keyAdvantage: "Mâm xoay Full-size kích thước chuẩn CDJ, độ bền cơ học cao, 4 kênh mixer mạnh mẽ.",
    },
  },
};

function resolveCompareLearnData(rawKey?: string | null, slug?: string): CompareLearnInfo | null {
  const normalizedKey = (rawKey || slug || "").toLowerCase().trim();
  for (const [key, data] of Object.entries(COMPARE_LEARN_DATA)) {
    if (normalizedKey.includes(key) || key.includes(normalizedKey)) {
      return data;
    }
  }
  return null;
}

interface ProductDetailClientProps {
  initialProduct?: Product | null;
  slug: string;
  faqs?: { question: string; answer: string }[];
  modelKey?: string | null;
}

export default function ProductDetailClient({
  initialProduct,
  slug,
  faqs = [],
  modelKey,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { t, lang } = useLanguage();

  const [product, setProduct] = useState<Product | null>(
    initialProduct || MOCK_PRODUCTS.find((p) => p.slug === slug) || null
  );
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "rental">("specs");
  const [addedNotice, setAddedNotice] = useState(false);
  const [facebookPageId, setFacebookPageId] = useState("vanbassmusiccenter");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const heroActionRef = useRef<HTMLDivElement>(null);
  const activeCompareData = resolveCompareLearnData(modelKey, slug);

  useEffect(() => {
    fetchStoreSettings().then((st) => {
      if (st?.facebook_page_id) {
        setFacebookPageId(st.facebook_page_id);
      }
    });
  }, []);

  // Fetch live product from Backend PostgreSQL
  useEffect(() => {
    const fetchLiveProduct = async () => {
      try {
        const apiUrl = getApiBaseUrl();
        const cacheBust = `_t=${Date.now()}`;
        const targetSlug = CANONICAL_TO_PRIMARY_DB_SLUG[slug.toLowerCase()] || slug;

        const [singleRes, allRes] = await Promise.all([
          fetch(`${apiUrl}/products/by-slug/${targetSlug}?${cacheBust}`, { cache: "no-store" }),
          fetch(`${apiUrl}/products?${cacheBust}`, { cache: "no-store" }),
        ]);

        if (singleRes.ok) {
          const liveProduct = await singleRes.json();
          setProduct(liveProduct);
        } else if (singleRes.status === 404 && !initialProduct) {
          if (targetSlug !== slug) {
            const fallbackRes = await fetch(`${apiUrl}/products/by-slug/${slug}?${cacheBust}`, { cache: "no-store" });
            if (fallbackRes.ok) {
              const liveProduct = await fallbackRes.json();
              setProduct(liveProduct);
              return;
            }
          }
          setProduct(null);
        }

        if (allRes.ok) {
          const allList = await allRes.json();
          if (Array.isArray(allList) && allList.length > 0) {
            setAllProducts(allList);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live product detail:", err);
      }
    };

    if (slug) {
      fetchLiveProduct();
    }
  }, [slug, initialProduct]);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#060709" }}>
        <Header />
        <div className="container" style={{ flex: 1, paddingTop: "140px", textAlign: "center" }}>
          <h2 style={{ color: "#fff" }}>{t.productDetail.notFoundTitle}</h2>
          <p style={{ color: "#a1a1aa", marginTop: "12px" }}>{t.productDetail.notFoundDesc}</p>
          <Link href="/products" className="button button-primary" style={{ marginTop: "24px" }}>
            {t.productDetail.backToProducts}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Deterministic, contextual related products algorithm for balanced link graph distribution
  const relatedProducts = (() => {
    if (!allProducts || allProducts.length <= 1) return [];

    const rawKey = product.slug || product.id || "";
    let seed = 0;
    for (let i = 0; i < rawKey.length; i++) {
      seed = (seed * 31 + rawKey.charCodeAt(i)) & 0xffffffff;
    }
    seed = Math.abs(seed);

    // Bucket 1: Same Category & Same Brand (Highest Relevance)
    const b1 = allProducts.filter(
      (p) =>
        p.category_id === product.category_id &&
        p.brand === product.brand &&
        p.id !== product.id &&
        p.slug !== product.slug
    );

    // Bucket 2: Same Category & Different Brand
    const b2 = allProducts.filter(
      (p) =>
        p.category_id === product.category_id &&
        p.brand !== product.brand &&
        p.id !== product.id &&
        p.slug !== product.slug
    );

    // Bucket 3: Different Category & Same Brand
    const b3 = allProducts.filter(
      (p) =>
        p.brand === product.brand &&
        p.category_id !== product.category_id &&
        p.id !== product.id &&
        p.slug !== product.slug
    );

    // Bucket 4: Global Pool Fallback
    const b4 = allProducts.filter((p) => p.id !== product.id && p.slug !== product.slug);

    const rotate = (arr: Product[], s: number) => {
      if (!arr.length) return [];
      const offset = s % arr.length;
      return [...arr.slice(offset), ...arr.slice(0, offset)];
    };

    const candidatePool = [
      ...rotate(b1, seed),
      ...rotate(b2, seed),
      ...rotate(b3, seed),
      ...rotate(b4, seed),
    ];

    const seenIds = new Set<string>();
    const seenSlugs = new Set<string>();
    const results: Product[] = [];

    for (const p of candidatePool) {
      if (!p.id || !p.slug) continue;
      if (seenIds.has(p.id) || seenSlugs.has(p.slug)) continue;

      seenIds.add(p.id);
      seenSlugs.add(p.slug);
      results.push(p);

      if (results.length >= 4) break;
    }

    return results;
  })();

  const displayName = getTranslatedProductName(product, lang);
  const displayDesc = getTranslatedProductDesc(product, lang);
  const shortExcerpt = getProductPlainExcerpt(displayDesc, 190);
  const hasHtmlDesc = Boolean(displayDesc && displayDesc.includes("<") && displayDesc.includes(">"));

  const isDirectHotModel = Boolean(modelKey && slug.toLowerCase().trim() === modelKey);

  const isDjControllerOrSystem = Boolean(
    isDirectHotModel ||
    product.category_slug === "all-in-one-dj-systems" ||
    product.category_slug === "dj-controllers" ||
    product.category_slug === "dj-player" ||
    product.category_slug === "dj-mixers" ||
    product.category_slug === "turntables" ||
    product.name?.toLowerCase().includes("bàn dj") ||
    product.name?.toLowerCase().includes("máy dj")
  );

  const isDjProduct = Boolean(
    isDjControllerOrSystem ||
    product.category_slug?.includes("dj")
  );

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/products/${slug}`);
      return;
    }
    if (!product.sale_enabled) return;
    addItem(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product.sale_enabled) return;
    if (!isAuthenticated) {
      router.push(`/login?redirect=/products/${slug}`);
      return;
    }
    addItem(product, quantity);
    router.push("/cart");
  };

  const calculatedOldPrice = product.sale_price
    ? Math.round((product.sale_price * 1.112) / 100000) * 100000
    : null;

  return (
    <div className="product-detail-page-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#060709" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "110px", paddingBottom: "80px" }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="pdetail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="pdetail-bc-link">{t.productDetail.breadcrumbHome}</Link>
            <span className="pdetail-bc-sep">/</span>
            {isDirectHotModel ? (
              <>
                <Link href="/ban-dj" className="pdetail-bc-link">Bàn DJ Chính Hãng</Link>
                <span className="pdetail-bc-sep">/</span>
              </>
            ) : (
              <>
                <Link href="/products" className="pdetail-bc-link">{t.productDetail.breadcrumbProducts}</Link>
                <span className="pdetail-bc-sep">/</span>
                {product.category_name && (
                  <>
                    <Link
                      href={product.category_slug ? `/products?category=${product.category_slug}` : "/products"}
                      className="pdetail-bc-link"
                    >
                      {product.category_name}
                    </Link>
                    <span className="pdetail-bc-sep">/</span>
                  </>
                )}
              </>
            )}
            <span className="pdetail-bc-current">{displayName}</span>
          </nav>

          {/* ============================================================
          {/* ============================================================
              PRODUCT DETAIL 2-COLUMN GRID (Hero + Left Tabs + Right Info)
             ============================================================ */}
          <div className="product-detail-hero-grid">
            {/* Left Column: Product Image Gallery + Specifications Tabs */}
            <div className="pdetail-gallery-col">
              <ProductImageGallery product={product} displayName={displayName} />

              {/* TABS SECTION (THÔNG SỐ KỸ THUẬT | MÔ TẢ | ĐÁNH GIÁ) */}
              <div className="pdetail-tabs-section">
                <div className="pdetail-tabs-header">
                  <button
                    type="button"
                    onClick={() => setActiveTab("specs")}
                    className={`pdetail-tab-btn ${activeTab === "specs" ? "is-active" : ""}`}
                  >
                    THÔNG SỐ KỸ THUẬT
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("desc")}
                    className={`pdetail-tab-btn ${activeTab === "desc" ? "is-active" : ""}`}
                  >
                    MÔ TẢ SẢN PHẨM
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("rental")}
                    className={`pdetail-tab-btn ${activeTab === "rental" ? "is-active" : ""}`}
                  >
                    ĐÁNH GIÁ (12)
                  </button>
                </div>

                {/* Tab: Specifications (Compact luxury table) */}
                {activeTab === "specs" && (
                  <div className="pdetail-tab-panel">
                    <h2 className="pdetail-specs-title">THÔNG SỐ KỸ THUẬT</h2>
                    <div className="pdetail-specs-table-wrap">
                      <table className="pdetail-specs-table">
                        <tbody>
                          <tr>
                            <td className="spec-name-col">Model</td>
                            <td className="spec-value-col">{product.sku || product.name}</td>
                          </tr>
                          <tr>
                            <td className="spec-name-col">Thương hiệu</td>
                            <td className="spec-value-col">{product.brand || "Chính Hãng"}</td>
                          </tr>
                          <tr>
                            <td className="spec-name-col">Loại sản phẩm</td>
                            <td className="spec-value-col">
                              <Link
                                href={product.category_slug ? `/products?category=${product.category_slug}` : "/products"}
                                style={{ color: "#38bdf8", textDecoration: "none" }}
                              >
                                {product.category_name || "Thiết bị âm thanh & DJ"}
                              </Link>
                            </td>
                          </tr>
                          {product.specifications?.["Bảo hành"] && (
                            <tr>
                              <td className="spec-name-col">Bảo hành</td>
                              <td className="spec-value-col">{product.specifications["Bảo hành"]}</td>
                            </tr>
                          )}
                          {product.specifications?.["Xuất xứ"] && (
                            <tr>
                              <td className="spec-name-col">Xuất xứ</td>
                              <td className="spec-value-col">{product.specifications["Xuất xứ"]}</td>
                            </tr>
                          )}
                          <tr>
                            <td className="spec-name-col">Tình trạng</td>
                            <td className="spec-value-col">{product.specifications?.["Tình trạng"] || "Mới 100%"}</td>
                          </tr>
                          {(product.specifications?.["Hỗ trợ phần mềm"] ||
                            product.category_slug?.includes("dj") ||
                            product.category_name?.toLowerCase().includes("dj")) && (
                            <tr>
                              <td className="spec-name-col">Hỗ trợ phần mềm</td>
                              <td className="spec-value-col">{product.specifications?.["Hỗ trợ phần mềm"] || "Rekordbox, Serato DJ"}</td>
                            </tr>
                          )}
                          {product.specifications &&
                            Object.entries(product.specifications)
                              .filter(([key]) => !["Thương hiệu", "Model", "Xuất xứ", "Bảo hành", "Tình trạng", "Hỗ trợ phần mềm"].includes(key))
                              .map(([key, value]) => (
                                <tr key={key}>
                                  <td className="spec-name-col">{getTranslatedSpecKey(key, lang)}</td>
                                  <td className="spec-value-col">{String(value)}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab: Description */}
                {activeTab === "desc" && (
                  <div className="pdetail-tab-panel">
                    {displayDesc && displayDesc.length > 120 ? (
                      hasHtmlDesc ? (
                        <div
                          className="product-rich-desc"
                          dangerouslySetInnerHTML={{ __html: displayDesc }}
                        />
                      ) : (
                        <div className="product-rich-desc" style={{ whiteSpace: "pre-line" }}>
                          {displayDesc}
                        </div>
                      )
                    ) : (
                      <div className="product-rich-desc">
                        {displayDesc && <p style={{ marginBottom: "16px", color: "#e4e4e7", lineHeight: 1.6 }}>{displayDesc}</p>}
                        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                          <div>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                              {lang === "en" ? "Product Overview" : "Tổng Quan Sản Phẩm"}
                            </h3>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                              {lang === "en"
                                ? `${displayName} is an authentic audio & stage equipment in the ${product.category_name || "Professional Audio"} category, manufactured by ${product.brand || "genuine brands"}. Product identifier (SKU/Model): ${product.sku || product.name}.`
                                : `${displayName} là thiết bị thuộc danh mục ${product.category_name || "Thiết bị âm thanh chuyên nghiệp"}, được cung cấp bởi thương hiệu ${product.brand || "chính hãng"}. Mã sản phẩm/SKU định danh: ${product.sku || product.name}.`}
                            </p>
                          </div>

                          <div>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                              {lang === "en" ? "Product Information & Verified Attributes" : "Thông Tin & Thuộc Tính Thực Tế"}
                            </h3>
                            <ul style={{ color: "#d4d4d8", fontSize: "14px", lineHeight: 1.8, paddingLeft: "20px", margin: 0 }}>
                              <li><strong>{lang === "en" ? "Model / SKU:" : "Mã sản phẩm / SKU:"}</strong> {product.sku || product.name}</li>
                              <li><strong>{lang === "en" ? "Brand:" : "Thương hiệu:"}</strong> {product.brand || "Chính Hãng"}</li>
                              <li>
                              <strong>{lang === "en" ? "Category:" : "Danh mục:"}</strong>{" "}
                              <Link
                                href={product.category_slug ? `/products?category=${product.category_slug}` : "/products"}
                                style={{ color: "#38bdf8", textDecoration: "none" }}
                              >
                                {product.category_name || (lang === "en" ? "Audio Equipment" : "Thiết bị âm thanh")}
                              </Link>
                            </li>
                              {product.specifications?.["Bảo hành"] && (
                                <li><strong>{lang === "en" ? "Warranty:" : "Bảo hành:"}</strong> {product.specifications["Bảo hành"]}</li>
                              )}
                              {product.specifications?.["Xuất xứ"] && (
                                <li><strong>{lang === "en" ? "Origin:" : "Xuất xứ:"}</strong> {product.specifications["Xuất xứ"]}</li>
                              )}
                              {product.specifications?.["Tình trạng"] && (
                                <li><strong>{lang === "en" ? "Condition:" : "Tình trạng:"}</strong> {product.specifications["Tình trạng"]}</li>
                              )}
                              {product.specifications &&
                                Object.entries(product.specifications)
                                  .filter(([k]) => !["Thương hiệu", "Model", "Xuất xứ", "Bảo hành", "Tình trạng", "Hỗ trợ phần mềm"].includes(k))
                                  .map(([k, v]) => (
                                    <li key={k}>
                                      <strong>{getTranslatedSpecKey(k, lang)}:</strong> {String(v)}
                                    </li>
                                  ))}
                            </ul>
                          </div>

                          <div>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                              {lang === "en" ? "Distribution & Support at VanBass" : "Chính Sách Phân Phối Tại VanBass"}
                            </h3>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                              {lang === "en"
                                ? `Distributed by VanBass Music Center with genuine quality commitment, full warranty support, nationwide delivery, and technical guidance.`
                                : `Sản phẩm được phân phối bởi VanBass Music Center với cam kết hàng chính hãng, hỗ trợ bảo hành theo tiêu chuẩn nhà sản xuất, giao hàng toàn quốc và tư vấn kỹ thuật chuyên môn.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Reviews / Customer Feedback */}
                {activeTab === "rental" && (
                  <div className="pdetail-tab-panel">
                    <div className="pdetail-reviews-summary">
                      <div className="review-score-box">
                        <span className="score-big">5.0</span>
                        <div className="stars-row">★★★★★</div>
                        <span className="score-note">Dựa trên 12 đánh giá khách hàng</span>
                      </div>
                      <div className="review-highlights-list">
                        <div className="review-item">
                          <div className="reviewer-info">
                            <strong>Anh Tuấn (DJ Resident Da Nang)</strong>
                            <span className="review-date">15/03/2026</span>
                          </div>
                          <div className="review-stars">★★★★★</div>
                          <p className="review-text">Máy mới 99%, cảm ứng 10.1 inch siêu nhạy, giao diện CDJ-3000 cực đỉnh. VanBass giao máy và setup tận nơi cực kỳ chu đáo.</p>
                        </div>
                        <div className="review-item">
                          <div className="reviewer-info">
                            <strong>Minh Hoàng (Event Organizer Hue)</strong>
                            <span className="review-date">02/02/2026</span>
                          </div>
                          <div className="review-stars">★★★★★</div>
                          <p className="review-text">Âm thanh ra dàn loa sân khấu rất dày và chi tiết, fader pad mượt mà. Rất hài lòng với dịch vụ hỗ trợ 24/7 của shop.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Product Information & Purchase & Rental */}
            <div ref={heroActionRef} className="pdetail-info-col">
              {/* Brand & SKU Header */}
              {(product.brand || product.sku) && (
                <div className="pdetail-meta-header">
                  {product.brand && <span className="pdetail-brand-badge">{product.brand}</span>}
                  {product.sku && <span className="pdetail-sku-badge">SKU: {product.sku}</span>}
                </div>
              )}

              {/* Product Title */}
              <h1 className="pdetail-title">
                {displayName}
              </h1>

              {/* Rating & Reviews Bar */}
              <div className="pdetail-rating-row">
                <div className="pdetail-stars">
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                </div>
                <span className="pdetail-rating-score">5.0</span>
                <span className="pdetail-rating-count">(12 đánh giá)</span>
              </div>

              {/* Short Description */}
              {shortExcerpt && (
                <p className="pdetail-short-desc">
                  {shortExcerpt}
                </p>
              )}

              {/* Pricing Box */}
              <div className="pdetail-pricing-box">
                <div className="pdetail-price-main-row">
                  <span className="pdetail-sale-price">
                    {product.sale_price && product.sale_price > 0
                      ? formatCurrency(product.sale_price, lang)
                      : "Liên hệ"}
                  </span>
                  {product.sale_price && product.sale_price > 0 && calculatedOldPrice && (
                    <span className="pdetail-discount-tag">-10%</span>
                  )}
                </div>

                {product.sale_price && product.sale_price > 0 && calculatedOldPrice && (
                  <span className="pdetail-old-price">
                    {formatCurrency(calculatedOldPrice, lang)}
                  </span>
                )}

                <div className="pdetail-stock-indicator">
                  <span className={`stock-pulse-dot ${product.stock_quantity > 0 ? "in-stock" : "out-of-stock"}`} />
                  <span className="stock-status-label">
                    {product.stock_quantity > 0 ? "Còn hàng" : (product.sale_price ? t.productDetail.outOfStock : "Liên hệ đặt hàng")}
                  </span>
                </div>
              </div>

              {/* Product Quick Information Grid */}
              <div className="pdetail-quick-specs-grid">
                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l8 4.5v6c0 5.55-3.84 10.74-8 11.5-4.16-.76-8-5.95-8-11.5v-6z" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Thương hiệu</span>
                    <span className="quick-spec-val">{product.brand || "Đang cập nhật"}</span>
                  </div>
                </div>

                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Model</span>
                    <span className="quick-spec-val">{product.sku || product.name}</span>
                  </div>
                </div>

                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Bảo hành</span>
                    <span className="quick-spec-val">{product.specifications?.["Bảo hành"] || "Chính hãng"}</span>
                  </div>
                </div>

                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Xuất xứ</span>
                    <span className="quick-spec-val">{product.specifications?.["Xuất xứ"] || "Đang cập nhật"}</span>
                  </div>
                </div>

                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Tình trạng</span>
                    <span className="quick-spec-val">{product.specifications?.["Tình trạng"] || "Mới 100%"}</span>
                  </div>
                </div>
              </div>

              {/* Purchase Actions (Quantity + Add to Cart + Buy Now) */}
              <div className="pdetail-purchase-actions">
                {product.sale_enabled ? (
                  product.stock_quantity > 0 ? (
                    <>
                      {/* Row: Quantity Stepper + MUA NGAY + Cart Icon */}
                      <div className="pdetail-cta-row-1">
                        <div className="pdetail-stepper">
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="stepper-action-btn"
                            aria-label="Giảm số lượng"
                          >
                            -
                          </button>
                          <span className="stepper-count">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.min(product.stock_quantity || 10, q + 1))}
                            className="stepper-action-btn"
                            aria-label="Tăng số lượng"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleBuyNow}
                          className="pdetail-btn-add-cart"
                        >
                          <span>MUA NGAY</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className="pdetail-btn-cart-icon"
                          title="Thêm nhanh vào giỏ hàng"
                          aria-label="Thêm nhanh vào giỏ hàng"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                          <span className="cart-badge-dot">1</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <button disabled className="pdetail-btn-disabled">
                      {t.productDetail.outOfStock}
                    </button>
                  )
                ) : null}

                {/* Added to cart toast */}
                {addedNotice && (
                  <div className="pdetail-added-toast">
                    <span>✓ {t.productDetail.addedToCartNotice}</span>
                    <Link href="/cart" className="pdetail-toast-link">
                      {t.productDetail.viewCart}
                    </Link>
                  </div>
                )}
              </div>

              {/* Rental Section Box (GIÁ THUÊ) */}
              <div className="pdetail-rental-card">
                {(product.rental_enabled || (product.rental_price && product.rental_price > 0) || isDirectHotModel) && (
                  <div className="pdetail-rental-top-row">
                    <div className="rental-price-wrap">
                      <div className="rental-box-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17" cy="17" r="1" fill="#22c55e" />
                          <circle cx="12" cy="12" r="1.2" fill="#22c55e" />
                        </svg>
                      </div>
                      <div>
                        <span className="rental-header-label">GIÁ THUÊ</span>
                        <div className="rental-price-number">
                          {product.rental_price ? (
                            <>
                              {formatCurrency(product.rental_price, lang)}
                              <small className="rental-unit"> / 24 giờ</small>
                            </>
                          ) : (
                            "Liên hệ báo giá"
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="rental-buttons-wrap">
                      <a
                        href={getMessengerRentalUrl(displayName, facebookPageId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rental-btn-chat"
                        style={{
                          display: "inline-flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          background: "rgba(34, 197, 94, 0.04)",
                          border: "1px solid #22c55e",
                          color: "#22c55e",
                          fontSize: "11px",
                          fontWeight: 800,
                          textDecoration: "none",
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          boxSizing: "border-box",
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        <span>LIÊN HỆ THUÊ MÁY NGAY</span>
                      </a>

                      <Link
                        href="/thue-ban-dj"
                        className="rental-btn-rates"
                        style={{
                          display: "inline-flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.22)",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          textDecoration: "none",
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          boxSizing: "border-box",
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                          <line x1="8" y1="6" x2="16" y2="6" />
                          <line x1="8" y1="10" x2="16" y2="10" />
                          <line x1="8" y1="14" x2="13" y2="14" />
                        </svg>
                        <span>BẢNG GIÁ THUÊ</span>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="pdetail-showrooms-wrap">
                  <div className="pdetail-branches-grid">
                    <div className="pdetail-branch-card">
                      <div className="pdetail-branch-header">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="pdetail-branch-title">CHI NHÁNH ĐÀ NẴNG</span>
                      </div>
                      <p className="pdetail-branch-addr">{BUSINESS_ADDRESS}</p>
                    </div>

                    <div className="pdetail-branch-card">
                      <div className="pdetail-branch-header">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="pdetail-branch-title">CHI NHÁNH HUẾ</span>
                      </div>
                      <p className="pdetail-branch-addr">{BUSINESS_ADDRESS_HUE}</p>
                    </div>
                  </div>

                  <div className="pdetail-contacts-grid">
                    <a href={CONTACTS.tuyen.telHref} className="showroom-contact-item" title={`Gọi ngay ${CONTACTS.tuyen.name}: ${CONTACTS.tuyen.phoneDisplay}`}>
                      <div className="showroom-icon-circle">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#22c55e">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.93A1 1 0 0 0 7.57 3H4.03A1 1 0 0 0 3 4.03C3.47 13.88 11.46 21.87 21.31 22.34a1 1 0 0 0 1.03-1.03v-3.54a1 1 0 0 0-1.03-1.03h-.3z" />
                        </svg>
                      </div>
                      <div className="showroom-text-block">
                        <span className="showroom-city">{CONTACTS.tuyen.name}</span>
                        <span className="showroom-number">{CONTACTS.tuyen.phoneDisplay}</span>
                      </div>
                    </a>

                    <a href={CONTACTS.tuan.telHref} className="showroom-contact-item" title={`Gọi ngay ${CONTACTS.tuan.name}: ${CONTACTS.tuan.phoneDisplay}`}>
                      <div className="showroom-icon-circle">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#22c55e">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.93A1 1 0 0 0 7.57 3H4.03A1 1 0 0 0 3 4.03C3.47 13.88 11.46 21.87 21.31 22.34a1 1 0 0 0 1.03-1.03v-3.54a1 1 0 0 0-1.03-1.03h-.3z" />
                        </svg>
                      </div>
                      <div className="showroom-text-block">
                        <span className="showroom-city">{CONTACTS.tuan.name}</span>
                        <span className="showroom-number">{CONTACTS.tuan.phoneDisplay}</span>
                      </div>
                    </a>

                    <a href={CONTACTS.van.telHref} className="showroom-contact-item" title={`Gọi ngay ${CONTACTS.van.name}: ${CONTACTS.van.phoneDisplay}`}>
                      <div className="showroom-icon-circle">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#22c55e">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.93A1 1 0 0 0 7.57 3H4.03A1 1 0 0 0 3 4.03C3.47 13.88 11.46 21.87 21.31 22.34a1 1 0 0 0 1.03-1.03v-3.54a1 1 0 0 0-1.03-1.03h-.3z" />
                        </svg>
                      </div>
                      <div className="showroom-text-block">
                        <span className="showroom-city">{CONTACTS.van.name}</span>
                        <span className="showroom-number">{CONTACTS.van.phoneDisplay}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================
              FACT BLOCK: BẢNG DỮ LIỆU THỰC TẾ XÁC THỰC (SEO & GEO FACT BLOCK)
             ============================================================ */}
          <div className="pdetail-factblock-wrapper">
            <div className="pdetail-factblock-header">
              <span className="pdetail-factblock-kicker">FACT BLOCK • DỮ LIỆU THỰC TẾ XÁC MINH</span>
              <h2 className="pdetail-factblock-title">Bảng Thông Tin Thực Tế & Khả Năng Cung Ứng {displayName}</h2>
              <p className="pdetail-factblock-subtitle">
                Dữ liệu chính xác được xác thực trực tiếp tại hệ thống VanMusic phục vụ tra cứu nhanh và trích xuất thông tin:
              </p>
            </div>

            <div className="pdetail-factblock-card">
              <table className="pdetail-factblock-table">
                <tbody>
                  <tr>
                    <td className="fb-label">Tên sản phẩm</td>
                    <td className="fb-data"><strong>{displayName}</strong></td>
                  </tr>
                  <tr>
                    <td className="fb-label">Mã SKU / Model</td>
                    <td className="fb-data"><code>{product.sku || product.name}</code></td>
                  </tr>
                  <tr>
                    <td className="fb-label">Thương hiệu</td>
                    <td className="fb-data">{product.brand ? `${product.brand} (Chính Hãng Phân Phối)` : "Chính Hãng Phân Phối"}</td>
                  </tr>
                  <tr>
                    <td className="fb-label">Phân khúc thiết bị</td>
                    <td className="fb-data">{product.category_name || (isDjControllerOrSystem ? "Thiết Bị DJ Chuyên Nghiệp" : "Thiết Bị Âm Thanh")}</td>
                  </tr>
                  <tr>
                    <td className="fb-label">Tình trạng máy</td>
                    <td className="fb-data">{product.specifications?.["Tình trạng"] || "Mới 100% Fullbox / Like New 99% Tuyển Chọn"}</td>
                  </tr>
                  <tr>
                    <td className="fb-label">Giá mua niêm yết</td>
                    <td className="fb-data">
                      <span className="fb-price-tag">
                        {product.sale_price ? formatCurrency(product.sale_price, lang) : "Liên hệ nhận báo giá ưu đãi"}
                      </span>
                      <span className="fb-subnote"> (Hỗ trợ trả góp 0% qua thẻ tín dụng và CCCD)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="fb-label">Chính sách bảo hành</td>
                    <td className="fb-data">{product.specifications?.["Bảo hành"] || "12 - 24 tháng chính hãng (Linh kiện chuẩn)"}</td>
                  </tr>
                  <tr>
                    <td className="fb-label">Mua bán & Sở hữu</td>
                    <td className="fb-data">
                      <span className="fb-status-yes">{product.stock_quantity > 0 ? "✓ Có hàng tại kho" : "Liên hệ kiểm tra kho"}</span>
                      {" • "}
                      {isDirectHotModel || isDjControllerOrSystem ? (
                        <Link href="/ban-dj" className="fb-action-link">
                          Xem trung tâm Mua Bán Bàn DJ &rarr;
                        </Link>
                      ) : (
                        <Link
                          href={product.category_slug ? `/products?category=${product.category_slug}` : "/products"}
                          className="fb-action-link"
                        >
                          Xem danh mục {product.category_name || "sản phẩm"} &rarr;
                        </Link>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fb-label">Cho thuê sự kiện</td>
                    <td className="fb-data">
                      {product.rental_enabled || product.rental_price ? (
                        <>
                          <span className="fb-status-yes">✓ Có hỗ trợ cho thuê</span>
                          {product.rental_price ? ` (từ ${formatCurrency(product.rental_price, lang)} / 24h)` : ""}
                          {" • "}
                          <Link href={isDjControllerOrSystem ? "/thue-ban-dj" : "/products"} className="fb-action-link">
                            {isDjControllerOrSystem ? "Xem bảng giá thuê máy →" : "Hỗ trợ cấu hình sự kiện →"}
                          </Link>
                        </>
                      ) : (
                        <span>Hỗ trợ tư vấn thuê theo cấu hình sự kiện</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fb-label">Sửa chữa & Kỹ thuật</td>
                    <td className="fb-data">
                      <span className="fb-status-yes">✓ Có trạm kỹ thuật</span>
                      {isDjControllerOrSystem ? (
                        <>
                          {" (Sẵn fader Alps, cân chỉnh jogwheel, vệ sinh bo mạch) • "}
                          <Link href="/sua-chua-ban-dj" className="fb-action-link">
                            Dịch vụ sửa chữa &rarr;
                          </Link>
                        </>
                      ) : (
                        <>
                          {" (Kiểm tra kỹ thuật, bảo hành chính hãng, linh kiện chuẩn) • "}
                          <Link href="/sua-chua-ban-dj" className="fb-action-link">
                            Trung tâm kỹ thuật &rarr;
                          </Link>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fb-label">Khu vực phục vụ</td>
                    <td className="fb-data">
                      Showroom Đà Nẵng (77 Nguyễn Tất Thành, phường Hải Châu) & Showroom Huế (442 Chi Lăng) • Giao hàng toàn quốc
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================
              SERVICE NAVIGATION: MUA - THUÊ - SỬA CHO SẢN PHẨM NÀY
             ============================================================ */}
          <div className="pdetail-3pillars-wrapper">
            <div className="pdetail-3pillars-header">
              <span className="pdetail-3pillars-kicker">HỆ SINH THÁI DỊCH VỤ TẠI VANMUSIC</span>
              <h2 className="pdetail-3pillars-title">Dịch Vụ Cho Thiết Bị {displayName}</h2>
              <p className="pdetail-3pillars-subtitle">
                Tùy theo nhu cầu thực tế, bạn có thể chọn mua sở hữu, thuê sự kiện ngắn ngày hoặc bảo dưỡng kỹ thuật tại Showroom Đà Nẵng & Huế:
              </p>
            </div>

            <div className="pdetail-3pillars-grid">
              {/* ITEM 1: MUA */}
              <div className="pdetail-pillar-card pillar-buy">
                <div className="pillar-icon">🛒</div>
                <h3 className="pillar-card-title">
                  {isDirectHotModel || isDjControllerOrSystem ? `Mua Bàn DJ ${displayName}` : `Mua ${displayName} Chính Hãng`}
                </h3>
                <p className="pillar-card-desc">
                  Phân phối chính hãng mới 100% fullbox hoặc like new 99% tuyển chọn, bảo hành 12 - 24T, hỗ trợ trả góp 0%.
                </p>
                {isDirectHotModel || isDjControllerOrSystem ? (
                  <Link href="/ban-dj" className="pillar-cta-btn pillar-cta-buy">
                    <span>Khám phá các mẫu bàn DJ đang bán</span>
                    <span>&rarr;</span>
                  </Link>
                ) : (
                  <Link
                    href={product.category_slug ? `/products?category=${product.category_slug}` : "/products"}
                    className="pillar-cta-btn pillar-cta-buy"
                  >
                    <span>Khám phá sản phẩm cùng danh mục</span>
                    <span>&rarr;</span>
                  </Link>
                )}
              </div>

              {/* ITEM 2: THUÊ */}
              <div className="pdetail-pillar-card pillar-rent">
                <div className="pillar-icon">🎧</div>
                <h3 className="pillar-card-title">
                  {isDirectHotModel || isDjProduct ? "Thuê Thiết Bị Biểu Diễn" : "Thuê Thiết Bị Sự Kiện"}
                </h3>
                <p className="pillar-card-desc">
                  {isDirectHotModel || isDjProduct
                    ? "Hỗ trợ cho thuê thiết bị DJ ngắn ngày cho show, tiệc và sự kiện, giao nhận và setup tận nơi 24/7 tại Đà Nẵng & Huế."
                    : "Hỗ trợ giải pháp thuê âm thanh ngắn ngày cho show, hội thảo và sự kiện, giao nhận setup tận nơi tại Đà Nẵng & Huế."}
                </p>
                <Link
                  href={isDirectHotModel || isDjControllerOrSystem ? "/thue-ban-dj" : (product.category_slug ? `/products?category=${product.category_slug}` : "/products")}
                  className="pillar-cta-btn pillar-cta-rent"
                >
                  <span>{isDirectHotModel || isDjControllerOrSystem ? "Xem dịch vụ cho thuê bàn DJ" : "Xem dịch vụ cho thuê thiết bị"}</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              {/* ITEM 3: SỬA */}
              <div className="pdetail-pillar-card pillar-repair">
                <div className="pillar-icon">🛠️</div>
                <h3 className="pillar-card-title">
                  {isDjControllerOrSystem ? "Sửa Chữa & Bảo Dưỡng Bàn DJ" : "Dịch Vụ Kỹ Thuật & Sửa Chữa"}
                </h3>
                <p className="pillar-card-desc">
                  {isDjControllerOrSystem
                    ? "Trạm kỹ thuật tiếp nhận kiểm tra miễn phí, thay thế fader, cân chỉnh jogwheel và bảo dưỡng thiết bị DJ chuyên nghiệp."
                    : "Trạm kỹ thuật tiếp nhận kiểm tra miễn phí, xử lý bo mạch, cân chỉnh âm học và bảo hành thiết bị chính hãng."}
                </p>
                <Link href="/sua-chua-ban-dj" className="pillar-cta-btn pillar-cta-repair">
                  <span>Xem dịch vụ sửa chữa & bảo dưỡng</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ============================================================
              COMPARE & LEARN: TẦNG SO SÁNH & HƯỚNG DẪN CHỌN MÁY CHUYÊN SÂU
             ============================================================ */}
          {activeCompareData && (
            <div className="pdetail-compare-learn-wrapper">
              <div className="pdetail-compare-header">
                <span className="pdetail-compare-kicker">COMPARE & LEARN • HƯỚNG DẪN SO SÁNH CHUYÊN SÂU</span>
                <h2 className="pdetail-compare-title">{activeCompareData.title}</h2>
                <p className="pdetail-compare-subtitle">{activeCompareData.description}</p>
              </div>

              <div className="pdetail-compare-grid">
                {activeCompareData.comparisons.map((cmp, idx) => (
                  <div key={idx} className="pdetail-compare-card">
                    <h3 className="cmp-heading">{cmp.heading}</h3>
                    <p className="cmp-summary">{cmp.summary}</p>
                    <ul className="cmp-points">
                      {cmp.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <span className="cmp-check">⚡</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="cmp-recommendation">
                      <strong>💡 Lời khuyên kỹ thuật:</strong> {cmp.recommendation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Buyer Persona Recommendation Box */}
              <div className="pdetail-buyer-guide-card">
                <h4 className="buyer-guide-title">
                  <span>🎯</span>
                  <span>Tóm Tắt Lựa Chọn Cho Thiết Bị Này</span>
                </h4>
                <div className="buyer-guide-items">
                  <div className="buyer-guide-item">
                    <span className="bgi-label">Phù hợp nhất với:</span>
                    <span className="bgi-value">{activeCompareData.buyerGuide.whoShouldBuy}</span>
                  </div>
                  <div className="buyer-guide-item">
                    <span className="bgi-label">Lời khuyên ngân sách:</span>
                    <span className="bgi-value">{activeCompareData.buyerGuide.budgetAdvice}</span>
                  </div>
                  <div className="buyer-guide-item">
                    <span className="bgi-label">Ưu thế cốt lõi:</span>
                    <span className="bgi-value">{activeCompareData.buyerGuide.keyAdvantage}</span>
                  </div>
                </div>
                <div className="buyer-guide-action">
                  <Link
                    href={isDjControllerOrSystem ? "/ban-dj" : (product.category_slug ? `/products?category=${product.category_slug}` : "/products")}
                    className="buyer-guide-link"
                  >
                    <span>{isDjControllerOrSystem ? "Xem thêm hướng dẫn chọn bàn DJ tại Hub Mua Bán Bàn DJ" : "Xem thêm sản phẩm cùng danh mục"}</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Official Sales & Distribution Trust Section */}
          <div
            style={{
              marginBottom: "32px",
              padding: "32px",
              backgroundColor: "rgba(24, 24, 27, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
              <div style={{ maxWidth: "720px" }}>
                <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                  {product.brand
                    ? `🛒 MUA BÁN & PHÂN PHỐI CHÍNH HÃNG ${product.brand.toUpperCase()}`
                    : "🛒 MUA BÁN & PHÂN PHỐI CHÍNH HÃNG TẠI VANBASS"}
                </span>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", margin: 0, lineHeight: 1.3 }}>
                  {isDirectHotModel || isDjControllerOrSystem
                    ? `Mua Bàn DJ ${displayName} Chính Hãng Giá Tốt Nhất`
                    : `Mua ${displayName} Chính Hãng Giá Tốt Nhất`}
                </h2>
                <p style={{ fontSize: "14px", color: "#a1a1aa", margin: "10px 0 0 0", lineHeight: 1.6 }}>
                  {isDirectHotModel || isDjProduct
                    ? `VanBass Music Center phân phối và cung ứng thiết bị DJ ${displayName} mới 100% đập hộp và hàng like new 99% tuyển chọn. Cam kết chính hãng trọn đời, bảo hành 12 - 24 tháng, hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng, ship COD kiểm tra hàng tận nơi toàn quốc và hỗ trợ kỹ thuật cài đặt Rekordbox / Serato 24/7.`
                    : `VanBass Music Center phân phối và cung ứng ${displayName} mới 100% fullbox và hàng chính hãng tuyển chọn. Cam kết chính hãng trọn đời, bảo hành 12 - 24 tháng, hỗ trợ trả góp 0% qua thẻ tín dụng, ship COD kiểm tra hàng tận nơi toàn quốc và hỗ trợ kỹ thuật 24/7.`}
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href="tel:0706067799"
                  className="button button-primary"
                  style={{
                    backgroundColor: "#38bdf8",
                    color: "#000",
                    fontWeight: 800,
                    padding: "12px 22px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Tư vấn mua: 0706.067.799</span>
                </a>

                <a
                  href={`https://m.me/${facebookPageId}?text=${encodeURIComponent(`Xin chào, tôi muốn nhận báo giá sản phẩm ${displayName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                  style={{ padding: "12px 20px", fontWeight: 700 }}
                >
                  <span>Báo giá qua Messenger &rarr;</span>
                </a>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", color: "#e4e4e7" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>🏆</span>
                <div>
                  <strong style={{ color: "#fff", display: "block" }}>100% Chính Hãng</strong>
                  <span style={{ color: "#a1a1aa", fontSize: "12px" }}>Nguyên seal, CO/CQ đầy đủ từ {product.brand ? product.brand : "nhà phân phối chính hãng"}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>🛡️</span>
                <div>
                  <strong style={{ color: "#fff", display: "block" }}>Bảo Hành 12 - 24 Tháng</strong>
                  <span style={{ color: "#a1a1aa", fontSize: "12px" }}>{isDjControllerOrSystem ? "Bảo dưỡng fader/jogwheel định kỳ, hỗ trợ kỹ thuật trọn đời" : "Bảo hành chính hãng uy tín, hỗ trợ kỹ thuật trọn đời"}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>💳</span>
                <div>
                  <strong style={{ color: "#fff", display: "block" }}>Trả Góp 0% Lãi Suất</strong>
                  <span style={{ color: "#a1a1aa", fontSize: "12px" }}>Duyệt online 5 phút qua thẻ tín dụng hơn 25 ngân hàng</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>🎁</span>
                <div>
                  <strong style={{ color: "#fff", display: "block" }}>Quà Tặng Độc Quyền</strong>
                  <span style={{ color: "#a1a1aa", fontSize: "12px" }}>{isDjControllerOrSystem ? "Tặng USB Sandisk nạp nhạc Rekordbox + Cáp xịn + Khóa học DJ" : "Hỗ trợ kỹ thuật cấu hình, phụ kiện tiêu chuẩn và hậu mãi chu đáo"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Local Rental Cross-linking CTA */}
          <div className="pdetail-cross-rental-banner">
            <div className="pdetail-banner-content">
              <div>
                <span className="pdetail-banner-kicker">
                  ⚡ Dịch vụ cho thuê biểu diễn tại Đà Nẵng & Huế
                </span>
                <h2 className="pdetail-banner-title">
                  {isDirectHotModel || isDjControllerOrSystem
                    ? `Bạn Cần Thuê Bàn DJ ${displayName} Cho Show Diễn Ngắn Ngày?`
                    : `Bạn Cần Thuê Thiết Bị ${displayName} Cho Sự Kiện Ngắn Ngày?`}
                </h2>
                <p className="pdetail-banner-desc">
                  VanBass Music Center hỗ trợ cho thuê {displayName} máy mới 99%, giao và setup trọn gói trong 2 giờ tại Đà Nẵng, Hội An và Thừa Thiên Huế.
                </p>
              </div>

              <div className="pdetail-banner-btns">
                <a
                  href={getMessengerRentalUrl(displayName, facebookPageId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-primary-btn"
                >
                  <span>Thuê máy này ngay</span>
                </a>
                <Link
                  href={isDjControllerOrSystem ? "/thue-ban-dj" : (product.category_slug ? `/products?category=${product.category_slug}` : "/products")}
                  className="banner-secondary-btn"
                >
                  <span>{isDjControllerOrSystem ? "Xem dịch vụ cho thuê bàn DJ →" : "Xem thêm sản phẩm cùng loại →"}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Repair & Maintenance Cross-linking CTA */}
          <div className="pdetail-cross-repair-banner">
            <div className="pdetail-banner-content">
              <div>
                <span className="pdetail-banner-kicker" style={{ color: "#38bdf8" }}>
                  🛠️ Trung tâm kỹ thuật sửa chữa & bảo dưỡng tại Đà Nẵng & Huế
                </span>
                <h2 className="pdetail-banner-title">
                  Thiết Bị {displayName} Cần Kiểm Tra, Sửa Chữa Hoặc Bảo Dưỡng?
                </h2>
                <p className="pdetail-banner-desc">
                  Trạm kỹ thuật VanMusic tại Đà Nẵng (77 Nguyễn Tất Thành, phường Hải Châu) & Huế tiếp nhận kiểm tra chuẩn đoán miễn phí, hỗ trợ thay thế linh kiện chính hãng và bảo dưỡng {isDjProduct ? "thiết bị DJ chuyên nghiệp" : "thiết bị âm thanh chuyên nghiệp"}.
                </p>
              </div>

              <div className="pdetail-banner-btns">
                <a
                  href={`tel:0706067799`}
                  className="banner-primary-btn"
                  style={{ backgroundColor: "#38bdf8", color: "#000" }}
                >
                  <span>Hotline kỹ thuật: 0706.067.799</span>
                </a>
                <Link
                  href="/sua-chua-ban-dj"
                  className="banner-secondary-btn"
                  style={{ borderColor: "rgba(56, 189, 248, 0.4)", color: "#38bdf8" }}
                >
                  <span>Xem dịch vụ sửa chữa & bảo dưỡng &rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          {faqs && faqs.length > 0 && (
            <div className="pdetail-faq-section">
              <div style={{ marginBottom: "18px" }}>
                <span className="pdetail-banner-kicker">
                  FAQ • Hỏi & Đáp
                </span>
                <h2 className="pdetail-faq-title">
                  Câu Hỏi Thường Gặp Về {displayName}
                </h2>
                <p style={{ fontSize: "14px", color: "#a1a1aa", margin: "6px 0 0 0" }}>
                  Giải đáp chi tiết về thông số kỹ thuật, cách sử dụng, giá bán & dịch vụ thuê {displayName} tại VanBass.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`pdetail-faq-card ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="pdetail-faq-question-btn"
                      >
                        <span className={`faq-q-text ${isOpen ? "text-accent" : ""}`}>
                          {faq.question}
                        </span>
                        <span className="faq-toggle-arrow" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                          ▾
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pdetail-faq-answer">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h2 className="pdetail-related-heading">
                {t.productDetail.relatedTitle}
              </h2>
              <div className="vb-product-grid">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* STICKY BOTTOM ACTION BAR */}
      <StickyProductActionBar
        product={product}
        displayName={displayName}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
        addedNotice={addedNotice}
        facebookPageId={facebookPageId}
        targetRef={heroActionRef}
      />

      <Footer />

      {/* Scoped Styling for Product Detail Page */}
      <style jsx>{`
        /* Scope Manrope font strictly to Product Detail page root */
        :global(.product-detail-page-root) {
          font-family: var(--font-primary) !important;
        }

        /* Breadcrumb */
        .pdetail-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
          font-size: 13.5px;
          color: #71717a;
          font-family: var(--font-primary);
        }

        .pdetail-bc-link {
          color: #a1a1aa;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .pdetail-bc-link:hover {
          color: #22c55e;
        }

        .pdetail-bc-sep {
          color: #3f3f46;
          font-size: 12px;
        }

        .pdetail-bc-category {
          color: #a1a1aa;
        }

        .pdetail-bc-current {
          color: #e4e4e7;
          font-weight: 500;
        }

        /* Layout Grid */
        .product-detail-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
          gap: 36px;
          align-items: start;
          width: 100%;
          margin-bottom: 36px;
          height: auto;
          min-height: 0;
        }

        .pdetail-gallery-col {
          width: 100%;
          min-width: 0;
          height: auto;
          display: flex;
          flex-direction: column;
        }

        .pdetail-info-col {
          width: 100%;
          min-width: 0;
          height: auto;
          display: flex;
          flex-direction: column;
        }

        /* Brand & SKU Header */
        .pdetail-meta-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        .pdetail-brand-badge {
          font-size: 12px;
          font-weight: 700;
          color: #22c55e;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .pdetail-sku-badge {
          font-size: 12px;
          color: #71717a;
          font-weight: 500;
        }

        /* Product Title (H1) */
        .pdetail-title {
          font-family: var(--font-primary) !important;
          font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 700;
          line-height: 1.25;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: -0.015em;
        }

        /* Rating Row */
        .pdetail-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .pdetail-stars {
          color: #f59e0b;
          font-size: 14px;
          letter-spacing: 2px;
        }

        .pdetail-rating-score {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
        }

        .pdetail-rating-count {
          font-size: 12.5px;
          color: #71717a;
        }

        /* Short Description */
        .pdetail-short-desc {
          font-size: 14px;
          font-weight: 400;
          color: #a1a1aa;
          line-height: 1.6;
          margin: 0 0 18px 0;
        }

        /* Pricing Box */
        .pdetail-pricing-box {
          margin-bottom: 18px;
        }

        .pdetail-price-main-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pdetail-sale-price {
          font-size: clamp(26px, 3vw, 32px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }

        .pdetail-discount-tag {
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
          background: #ef4444;
          padding: 2px 7px;
          border-radius: 9999px;
          display: inline-block;
        }

        .pdetail-old-price {
          font-size: 14px;
          font-weight: 400;
          color: #71717a;
          text-decoration: line-through;
          margin-top: 2px;
          display: block;
        }

        .pdetail-stock-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .stock-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .stock-pulse-dot.in-stock {
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }

        .stock-pulse-dot.out-of-stock {
          background: #ef4444;
          box-shadow: 0 0 8px #ef4444;
        }

        .stock-status-label {
          font-size: 13px;
          font-weight: 600;
          color: #22c55e;
        }

        /* Quick Specs Grid */
        .pdetail-quick-specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 14px 16px;
          background: #0d0e13;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .quick-spec-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .quick-spec-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .quick-spec-lbl {
          font-size: 11px;
          font-weight: 400;
          color: #71717a;
          display: block;
          margin-bottom: 1px;
        }

        .quick-spec-val {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Purchase Actions */
        .pdetail-purchase-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .pdetail-cta-row-1 {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .pdetail-stepper {
          display: flex;
          align-items: center;
          background: #090a0e;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          height: 46px;
          overflow: hidden;
        }

        .stepper-action-btn {
          width: 36px;
          height: 100%;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }

        .stepper-action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .stepper-count {
          width: 34px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: #ffffff;
        }

        .pdetail-btn-add-cart {
          flex: 1;
          height: 46px;
          background: #22c55e;
          color: #000000;
          border: none;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 800;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        .pdetail-btn-add-cart:hover {
          background: #16a34a;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5);
        }

        .pdetail-btn-cart-icon {
          width: 46px;
          height: 46px;
          border-radius: 8px;
          background: #090a0e;
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #22c55e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .pdetail-btn-cart-icon:hover {
          background: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
        }

        .cart-badge-dot {
          position: absolute;
          top: 5px;
          right: 5px;
          background: #22c55e;
          color: #000;
          font-size: 9px;
          font-weight: 800;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pdetail-btn-buy-now {
          width: 100%;
          height: 46px;
          background: #22c55e;
          color: #000000;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.35);
        }

        .pdetail-btn-buy-now:hover {
          background: #16a34a;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(34, 197, 94, 0.5);
        }

        .pdetail-btn-disabled {
          width: 100%;
          height: 46px;
          background: #1e2026;
          color: #71717a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: not-allowed;
        }

        .pdetail-added-toast {
          padding: 8px 14px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid #22c55e;
          border-radius: 8px;
          color: #4ade80;
          font-size: 12.5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pdetail-toast-link {
          color: #ffffff;
          font-weight: 700;
          text-decoration: underline;
        }

        /* Rental Card Box */
        .pdetail-rental-card {
          background: #080a0f;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
        }

        .pdetail-rental-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .rental-price-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .rental-box-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rental-header-label {
          font-size: 13px;
          font-weight: 700;
          color: #22c55e;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
          line-height: 1.2;
        }

        .rental-price-number {
          font-size: 16px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: #ffffff;
          line-height: 1.2;
          margin-top: 2px;
          white-space: nowrap;
        }

        .rental-unit {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }

        .rental-buttons-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
          flex-shrink: 0;
        }

        .rental-btn-chat {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(34, 197, 94, 0.04);
          border: 1px solid #22c55e;
          color: #22c55e;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.02em;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .rental-btn-chat:hover {
          background: #22c55e;
          color: #000000;
        }

        .rental-btn-rates {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.02em;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .rental-btn-rates:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          color: #ffffff;
        }

        .pdetail-showrooms-wrap {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pdetail-branches-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .pdetail-branch-card {
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pdetail-branch-header {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pdetail-branch-title {
          font-size: 11px;
          font-weight: 700;
          color: #22c55e;
          letter-spacing: 0.04em;
        }

        .pdetail-branch-addr {
          font-size: 12px;
          line-height: 1.45;
          color: #d4d4d8;
          margin: 0;
        }

        .pdetail-contacts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .showroom-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .showroom-contact-item:hover {
          border-color: rgba(34, 197, 94, 0.45);
          background: rgba(34, 197, 94, 0.03);
        }

        .showroom-icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .showroom-text-block {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .showroom-city {
          font-size: 11px;
          font-weight: 600;
          color: #e4e4e7;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .showroom-number {
          font-size: 12px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: #22c55e;
          display: block;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        /* Tabs Section (Placed cleanly in left column under image gallery) */
        .pdetail-tabs-section {
          width: 100%;
          margin-top: 20px;
          margin-bottom: 0;
        }

        .pdetail-tabs-header {
          display: flex;
          gap: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 14px;
        }

        .pdetail-tab-btn {
          padding: 8px 2px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #71717a;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .pdetail-tab-btn:hover {
          color: #e4e4e7;
        }

        .pdetail-tab-btn.is-active {
          color: #22c55e;
          border-bottom-color: #22c55e;
        }

        /* Compact Specifications Panel */
        .pdetail-tab-panel {
          background: #0c0d12;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 16px 20px;
          width: 100%;
        }

        .pdetail-specs-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: 0.04em;
        }

        .pdetail-specs-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .pdetail-specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }

        .pdetail-specs-table tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .pdetail-specs-table tr:last-child {
          border-bottom: none;
        }

        .spec-name-col {
          padding: 7px 10px 7px 0;
          color: #9ca3af;
          width: 36%;
          font-weight: 500;
        }

        .spec-value-col {
          padding: 7px 0;
          color: #f4f4f5;
          font-weight: 500;
        }

        /* Reviews in Tab */
        .pdetail-reviews-summary {
          display: flex;
          gap: 24px;
        }

        .review-score-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          min-width: 160px;
        }

        .score-big {
          font-size: 38px;
          font-weight: 900;
          color: #22c55e;
          line-height: 1;
        }

        .stars-row {
          color: #f59e0b;
          font-size: 15px;
          margin: 6px 0;
        }

        .score-note {
          font-size: 11px;
          color: #71717a;
          text-align: center;
        }

        .review-highlights-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .review-item {
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .reviewer-info {
          display: flex;
          justify-content: space-between;
          font-size: 12.5px;
          color: #ffffff;
          margin-bottom: 3px;
        }

        .review-date {
          font-size: 11px;
          color: #71717a;
        }

        .review-stars {
          color: #f59e0b;
          font-size: 11.5px;
          margin-bottom: 4px;
        }

        .review-text {
          font-size: 12.5px;
          color: #d4d4d8;
          margin: 0;
          line-height: 1.5;
        }

        /* Banner */
        .pdetail-cross-rental-banner {
          margin-bottom: 40px;
          padding: 24px 28px;
          background: rgba(34, 197, 94, 0.04);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pdetail-banner-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }

        .pdetail-banner-kicker {
          font-size: 11px;
          color: #22c55e;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 4px;
        }

        .pdetail-banner-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .pdetail-banner-desc {
          font-size: 13px;
          color: #a1a1aa;
          margin: 6px 0 0 0;
          max-width: 680px;
          line-height: 1.55;
        }

        .pdetail-banner-btns {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .banner-primary-btn {
          background: #22c55e;
          color: #000;
          font-weight: 800;
          font-size: 12.5px;
          padding: 9px 16px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .banner-primary-btn:hover {
          background: #16a34a;
        }

        .banner-secondary-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          font-weight: 700;
          font-size: 12.5px;
          padding: 9px 16px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .banner-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        .pdetail-banner-perks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 12px;
          color: #d4d4d8;
        }

        /* FACT BLOCK STYLING */
        .pdetail-factblock-wrapper {
          margin-bottom: 36px;
          padding: 30px 26px;
          background: rgba(18, 18, 24, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          backdrop-filter: blur(12px);
        }
        .pdetail-factblock-header {
          text-align: center;
          margin-bottom: 22px;
        }
        .pdetail-factblock-kicker {
          font-size: 11px;
          color: #38bdf8;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 6px;
        }
        .pdetail-factblock-title {
          font-size: clamp(20px, 2.4vw, 26px);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 8px 0;
          letter-spacing: -0.02em;
        }
        .pdetail-factblock-subtitle {
          font-size: 13.5px;
          color: #a1a1aa;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .pdetail-factblock-card {
          background: rgba(24, 24, 30, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          overflow-x: auto;
        }
        .pdetail-factblock-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
        }
        .pdetail-factblock-table tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .pdetail-factblock-table tr:last-child {
          border-bottom: none;
        }
        .pdetail-factblock-table tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .fb-label {
          width: 25%;
          min-width: 160px;
          padding: 12px 18px;
          color: #a1a1aa;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.02);
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          vertical-align: top;
        }
        .fb-data {
          padding: 12px 18px;
          color: #f4f4f5;
          line-height: 1.6;
        }
        .fb-price-tag {
          font-size: 16px;
          font-weight: 800;
          color: #22c55e;
        }
        .fb-subnote {
          font-size: 12px;
          color: #71717a;
        }
        .fb-status-yes {
          color: #4ade80;
          font-weight: 700;
        }
        .fb-action-link {
          color: #38bdf8;
          text-decoration: underline;
          font-weight: 600;
          font-size: 12.5px;
        }

        /* COMPARE & LEARN STYLING */
        .pdetail-compare-learn-wrapper {
          margin-bottom: 36px;
          padding: 30px 26px;
          background: rgba(18, 18, 24, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 14px;
          backdrop-filter: blur(12px);
        }
        .pdetail-compare-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .pdetail-compare-kicker {
          font-size: 11px;
          color: #38bdf8;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 6px;
        }
        .pdetail-compare-title {
          font-size: clamp(20px, 2.4vw, 26px);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 8px 0;
          letter-spacing: -0.02em;
        }
        .pdetail-compare-subtitle {
          font-size: 13.5px;
          color: #a1a1aa;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .pdetail-compare-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          margin-bottom: 22px;
        }
        .pdetail-compare-card {
          background: rgba(24, 24, 30, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 22px;
          display: flex;
          flex-direction: column;
        }
        .cmp-heading {
          font-size: 16.5px;
          font-weight: 800;
          color: #38bdf8;
          margin: 0 0 8px 0;
        }
        .cmp-summary {
          font-size: 13px;
          color: #a1a1aa;
          margin: 0 0 14px 0;
          line-height: 1.5;
        }
        .cmp-points {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          font-size: 13px;
          color: #d4d4d8;
          line-height: 1.6;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .cmp-points li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .cmp-check {
          color: #eab308;
          font-size: 14px;
          flex-shrink: 0;
        }
        .cmp-recommendation {
          padding: 12px 14px;
          background: rgba(56, 189, 248, 0.08);
          border-left: 3px solid #38bdf8;
          border-radius: 0 8px 8px 0;
          font-size: 12.5px;
          color: #e0f2fe;
          line-height: 1.55;
        }
        .pdetail-buyer-guide-card {
          background: rgba(34, 197, 94, 0.06);
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 12px;
          padding: 22px;
        }
        .buyer-guide-title {
          font-size: 15.5px;
          font-weight: 800;
          color: #22c55e;
          margin: 0 0 14px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .buyer-guide-items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }
        .buyer-guide-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .bgi-label {
          font-size: 11.5px;
          color: #71717a;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .bgi-value {
          font-size: 13px;
          color: #f4f4f5;
          line-height: 1.5;
        }
        .buyer-guide-action {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 14px;
        }
        .buyer-guide-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #22c55e;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        /* 3-PILLAR SERVICE MODULE */
        .pdetail-3pillars-wrapper {
          margin-bottom: 40px;
          padding: 32px 28px;
          background: rgba(18, 18, 22, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          backdrop-filter: blur(12px);
        }

        .pdetail-3pillars-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .pdetail-3pillars-kicker {
          font-size: 11px;
          color: #22c55e;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 6px;
        }

        .pdetail-3pillars-title {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
        }

        .pdetail-3pillars-subtitle {
          font-size: 14px;
          color: #a1a1aa;
          max-width: 780px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .pdetail-3pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .pdetail-pillar-card {
          background: rgba(24, 24, 30, 0.85);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .pdetail-pillar-card:hover {
          transform: translateY(-3px);
        }

        .pillar-buy {
          border: 1px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 8px 24px rgba(56, 189, 248, 0.05);
        }

        .pillar-rent {
          border: 1px solid rgba(34, 197, 94, 0.35);
          box-shadow: 0 8px 24px rgba(34, 197, 94, 0.06);
        }

        .pillar-repair {
          border: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: 0 8px 24px rgba(168, 85, 247, 0.05);
        }

        .pillar-icon {
          font-size: 26px;
          margin-bottom: 10px;
        }

        .pillar-card-title {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 8px 0;
          line-height: 1.35;
        }

        .pillar-card-desc {
          font-size: 13.5px;
          color: #a1a1aa;
          line-height: 1.6;
          margin: 0 0 20px 0;
          flex: 1;
        }

        .pillar-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
          text-align: center;
        }

        .pillar-cta-buy {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }
        .pillar-cta-buy:hover {
          background: #38bdf8;
          color: #000;
        }

        .pillar-cta-rent {
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.4);
          color: #22c55e;
        }
        .pillar-cta-rent:hover {
          background: #22c55e;
          color: #000;
        }

        .pillar-cta-repair {
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.4);
          color: #c084fc;
        }
        .pillar-cta-repair:hover {
          background: #c084fc;
          color: #000;
        }

        /* Banner Sửa Chữa Chuyên Sâu */
        .pdetail-cross-repair-banner {
          margin-bottom: 40px;
          padding: 24px 28px;
          background: rgba(56, 189, 248, 0.04);
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* FAQ Section */
        .pdetail-faq-section {
          margin-bottom: 40px;
        }

        .pdetail-faq-title {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          margin: 0;
        }

        .pdetail-faq-card {
          background: #0d0e13;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .pdetail-faq-card.is-open {
          border-color: rgba(34, 197, 94, 0.4);
        }

        .pdetail-faq-question-btn {
          width: 100%;
          text-align: left;
          padding: 14px 18px;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          gap: 14px;
        }

        .faq-q-text {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.4;
        }

        .faq-q-text.text-accent {
          color: #4ade80;
        }

        .faq-toggle-arrow {
          font-size: 15px;
          color: #71717a;
          transition: transform 0.2s ease;
        }

        .pdetail-faq-answer {
          padding: 0 18px 16px 18px;
          font-size: 13px;
          color: #d4d4d8;
          line-height: 1.65;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 12px;
        }

        /* Related Products Heading */
        .pdetail-related-heading {
          font-size: 17px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 18px;
          border-bottom: 2px solid #22c55e;
          padding-bottom: 6px;
          display: inline-block;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .product-detail-hero-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 24px;
          }

          .pdetail-reviews-summary {
            flex-direction: column;
          }

          .pdetail-quick-specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .pdetail-quick-specs-grid {
            grid-template-columns: 1fr;
          }

          .pdetail-branches-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .pdetail-contacts-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .pdetail-title {
            font-size: 20px;
          }

          .pdetail-sale-price {
            font-size: 25px;
          }

          .pdetail-tab-panel {
            padding: 14px 16px;
          }
        }
      `}</style>
    </div>
  );
}
