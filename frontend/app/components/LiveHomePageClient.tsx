"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import ProductGrid from "./ProductGrid";
import CategoryGrid from "./CategoryGrid";
import RentalSection from "./RentalSection";
import IntroSection from "./IntroSection";
import LocalCTA from "./LocalCTA";
import Footer from "./Footer";
import ScrollObserver from "./ScrollObserver";
import FloatingContact from "./FloatingContact";
import { DEFAULT_HOME_DATA, HomeData } from "../types/home_config";

interface LiveHomePageClientProps {
  initialHomeData: HomeData;
}

export default function LiveHomePageClient({ initialHomeData }: LiveHomePageClientProps) {
  const [homeData, setHomeData] = useState<HomeData>(initialHomeData || DEFAULT_HOME_DATA);
  const [isInsideIframe, setIsInsideIframe] = useState<boolean>(false);

  useEffect(() => {
    const inIframe = typeof window !== "undefined" && window.self !== window.top;
    if (inIframe) {
      setIsInsideIframe(true);
    }

    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;

      if (event.data.type === "VANBASS_LIVE_CONFIG" && event.data.data) {
        setHomeData(event.data.data);
      }

      if (event.data.type === "VANBASS_SCROLL_TO" && event.data.section) {
        const sectionMap: Record<string, string> = {
          hero: "hero",
          marquee: "hero",
          products: "featured-products",
          categories: "categories",
          rental: "rental",
          intro: "about-intro",
          cta: "contact-cta",
          floating: "hero",
          visibility: "hero",
        };

        const targetId = sectionMap[event.data.section];
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    };

    const handleSectionClick = (e: MouseEvent) => {
      if (!inIframe) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const sectionEl = target.closest("section");
      if (sectionEl?.id) {
        const idMap: Record<string, string> = {
          "hero": "hero",
          "categories": "categories",
          "rental": "rental",
          "about-intro": "intro",
          "contact-cta": "cta",
        };
        const mapped = idMap[sectionEl.id];
        if (mapped) {
          window.parent.postMessage({ type: "VANBASS_SELECT_SECTION", section: mapped }, "*");
        }
      }
    };

    const handleCmsClick = (e: MouseEvent) => {
      if (!inIframe) return;

      // Prevent any link navigation or form submit inside iframe CMS canvas
      const clickableTarget = (e.target as HTMLElement | null)?.closest("a, button, [data-cms-key]");
      if (clickableTarget) {
        e.preventDefault();
        e.stopPropagation();
      }

      const target = (e.target as HTMLElement | null)?.closest("[data-cms-key]") as HTMLElement | null;
      if (!target) return;

      const fieldKey = target.getAttribute("data-cms-key") || "";
      const label = target.getAttribute("data-cms-label") || "Chỉnh sửa phần tử";
      const fieldType = target.getAttribute("data-cms-type") || "text";
      const currentVal = target.innerText?.trim() || "";

      window.parent.postMessage({
        type: "VANBASS_OPEN_INLINE_EDITOR",
        fieldKey,
        label,
        fieldType,
        currentVal,
      }, "*");
    };

    window.addEventListener("message", handleMessage);

    // Notify parent admin that iframe is ready to receive live config
    if (inIframe) {
      window.parent.postMessage({ type: "VANBASS_IFRAME_READY" }, "*");
      window.addEventListener("click", handleCmsClick, true);
    }

    return () => {
      window.removeEventListener("message", handleMessage);
      if (inIframe) {
        window.removeEventListener("click", handleCmsClick, true);
      }
    };
  }, []);

  const { visibility } = homeData;

  return (
    <>
      {isInsideIframe && (
        <style dangerouslySetInnerHTML={{ __html: `
          [data-cms-key]:not(.triptych-bg):not(button):not(img) {
            position: relative !important;
            transition: outline 0.15s ease, box-shadow 0.15s ease !important;
          }
          [data-cms-key]:not(.triptych-bg):not(button):not(img):hover {
            outline: 2px dashed #22c55e !important;
            outline-offset: 3px !important;
            cursor: pointer !important;
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.35) !important;
          }
          [data-cms-key]:not(.triptych-bg):not(button):not(img):hover::after {
            content: "✏️ Click sửa";
            position: absolute;
            top: -24px;
            left: 50%;
            transform: translateX(-50%);
            background: #18181b;
            color: #4ade80;
            border: 1px solid #22c55e;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 800;
            border-radius: 4px;
            white-space: nowrap;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.8);
            pointer-events: none;
          }
          .triptych-edit-img-btn:hover {
            background-color: #22c55e !important;
            color: #000000 !important;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.7) !important;
            transform: scale(1.05);
          }

          /* Khóa tĩnh các hiệu ứng banner trong Live Preview để việc click chỉnh sửa không bị giật/lệch */
          .hero-triptych-container:hover .triptych-panel,
          .hero-triptych-container:hover .triptych-panel:hover,
          .triptych-panel {
            flex: 1 !important;
            transition: none !important;
          }
          .triptych-panel.panel-featured {
            flex: 1.15 !important;
          }
          .triptych-bg,
          .triptych-panel:hover .triptych-bg {
            transform: none !important;
            transition: none !important;
          }
          .triptych-content,
          .triptych-panel:hover .triptych-content {
            transform: none !important;
            transition: none !important;
          }
          .triptych-overlay,
          .hero-triptych-container:hover .triptych-panel .triptych-overlay,
          .triptych-panel:hover .triptych-overlay {
            opacity: 0.38 !important;
            transition: none !important;
          }
        ` }} />
      )}
      <Header />
      <ScrollObserver />

      <main style={{ minHeight: "100vh", overflowX: "hidden" }}>
        {/* 1. Hero Banner (THIẾT BỊ • DJ • TRẢI NGHIỆM) */}
        {(visibility.show_hero || visibility.show_marquee) && (
          <Hero
            marqueeItems={homeData.marquee_items}
            heroLeft={homeData.hero_left}
            heroCenter={homeData.hero_center}
            heroRight={homeData.hero_right}
            showMarquee={visibility.show_marquee}
            showHero={visibility.show_hero}
            isInsideIframe={isInsideIframe}
          />
        )}

        {/* 2. Thiết bị nổi bật */}
        {visibility.show_products && <ProductGrid />}

        {/* 3. Danh mục sản phẩm */}
        {visibility.show_categories && (
          <CategoryGrid config={homeData.categories_highlight} />
        )}

        {/* 4. Dịch vụ cho thuê thiết bị */}
        {visibility.show_rental && (
          <RentalSection config={homeData.rental} />
        )}

        {/* 5. Giới thiệu VanBass */}
        {visibility.show_intro && (
          <IntroSection config={homeData.intro} />
        )}

        {/* 6. Kêu gọi hành động & Showroom */}
        {visibility.show_cta && (
          <LocalCTA config={homeData.local_cta} />
        )}
      </main>

      {/* Chân trang Footer */}
      <Footer />

      {/* Floating Contact Widget (Hiển thị nếu bật) */}
      {visibility.show_floating_contact && (
        <FloatingContact config={homeData.floating_contacts} forceShow={isInsideIframe} />
      )}
    </>
  );
}
