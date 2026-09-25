"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import ProductGrid from "./ProductGrid";
import CategoryGrid from "./CategoryGrid";
import RentalSection from "./RentalSection";
import IntroSection from "./IntroSection";
import Footer from "./Footer";
import ScrollObserver from "./ScrollObserver";
import FloatingContact from "./FloatingContact";
import BrandLogoCloud from "./BrandLogoCloud";
import { DEFAULT_HOME_DATA, HomeData } from "../types/home_config";

interface LiveHomePageClientProps {
  initialHomeData: HomeData;
  mode?: "public" | "editor";
}

function updateNestedKey(obj: any, path: string, value: any): any {
  const parts = path.split(".");
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  let curr = copy;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    curr[p] = Array.isArray(curr[p]) ? [...curr[p]] : { ...(curr[p] || {}) };
    curr = curr[p];
  }
  curr[parts[parts.length - 1]] = value;
  return copy;
}

export default function LiveHomePageClient({ initialHomeData, mode = "public" }: LiveHomePageClientProps) {
  const [homeData, setHomeData] = useState<HomeData>(initialHomeData || DEFAULT_HOME_DATA);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const isEditor = mode === "editor";

  useEffect(() => {
    if (!isEditor) return;

    const allowedOrigin = typeof window !== "undefined" ? window.location.origin : "";

    // 1. Send Ready Handshake to CMS parent
    try {
      window.parent.postMessage({ type: "VANBASS_EDITOR_READY" }, allowedOrigin);
    } catch {
      // Ignore if not iframe
    }

    // 2. Listen to messages from CMS parent
    const handleMessage = (event: MessageEvent) => {
      // Validate origin if not wildcard local
      if (allowedOrigin && event.origin !== allowedOrigin) return;
      if (!event.data || typeof event.data !== "object") return;

      const { type } = event.data;

      if (type === "VANBASS_LIVE_CONFIG" || type === "VANBASS_LOAD_STATE") {
        if (event.data.data) {
          setHomeData(event.data.data);
        }
      } else if (type === "VANBASS_UPDATE_ELEMENT") {
        const { elementId, value } = event.data;
        if (elementId) {
          setHomeData((prev) => updateNestedKey(prev, elementId, value));
        }
      } else if (type === "VANBASS_RESET") {
        setHomeData(event.data.data || DEFAULT_HOME_DATA);
        setSelectedElement(null);
      } else if (type === "VANBASS_SCROLL_TO" && event.data.section) {
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

    // 3. CAPTURING PHASE: Completely block all normal website interactions in Editor Mode
    const handleCaptureClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Always block browser navigation, link clicks, form actions, business logic
      e.preventDefault();
      e.stopPropagation();

      // Check if target or parent is an editable CMS element
      const cmsEl = target.closest("[data-cms-key]") as HTMLElement | null;

      if (cmsEl) {
        const elementId = cmsEl.getAttribute("data-cms-key") || "";
        const label = cmsEl.getAttribute("data-cms-label") || "Chỉnh sửa phần tử";
        const fieldType = cmsEl.getAttribute("data-cms-type") || "text";
        const currentVal = cmsEl.innerText?.trim() || "";

        setSelectedElement(elementId);

        window.parent.postMessage(
          {
            type: "VANBASS_ELEMENT_SELECTED",
            elementId,
            label,
            fieldType,
            currentVal,
          },
          allowedOrigin
        );
      } else {
        // Also check if clicking on a general section to sync section accordion
        const sectionEl = target.closest("section");
        if (sectionEl?.id) {
          const idMap: Record<string, string> = {
            hero: "hero",
            categories: "categories",
            rental: "rental",
            "about-intro": "intro",
            "contact-cta": "cta",
          };
          const mapped = idMap[sectionEl.id];
          if (mapped) {
            window.parent.postMessage({ type: "VANBASS_SELECT_SECTION", section: mapped }, allowedOrigin);
          }
        }
      }
    };

    const handleCaptureSubmit = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleCaptureKeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        const target = e.target as HTMLElement | null;
        if (target?.closest("a, button, input[type='submit']")) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("click", handleCaptureClick, true);
    window.addEventListener("submit", handleCaptureSubmit, true);
    window.addEventListener("keydown", handleCaptureKeydown, true);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("click", handleCaptureClick, true);
      window.removeEventListener("submit", handleCaptureSubmit, true);
      window.removeEventListener("keydown", handleCaptureKeydown, true);
    };
  }, [isEditor]);

  const { visibility } = homeData;

  return (
    <>
      {isEditor && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Editor Mode Canvas Styles */
          html, body {
            cursor: default !important;
            user-select: none !important;
          }

          /* Disable normal button hover/active effects in canvas */
          a, button {
            cursor: pointer !important;
          }

          /* Push fixed header down so sticky banner does not overlap */
          .site-header {
            top: 48px !important;
          }

          /* Hover overlay on editable elements */
          [data-cms-key]:not(.triptych-bg) {
            position: relative !important;
            transition: outline 0.15s ease, box-shadow 0.15s ease !important;
            cursor: pointer !important;
          }

          [data-cms-key]:not(.triptych-bg):hover {
            outline: 2px dashed #06b6d4 !important;
            outline-offset: 3px !important;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.4) !important;
          }

          [data-cms-key]:not(.triptych-bg):hover::after {
            content: "Click để sửa";
            position: absolute;
            top: -24px;
            left: 50%;
            transform: translateX(-50%);
            background: #09090b;
            color: #22d3ee;
            border: 1px solid #06b6d4;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 800;
            border-radius: 4px;
            white-space: nowrap;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.8);
            pointer-events: none;
          }

          /* Selected Element Active Overlay */
          ${
            selectedElement
              ? `
            [data-cms-key="${selectedElement}"]:not(.triptych-bg) {
              outline: 2.5px solid #22c55e !important;
              outline-offset: 4px !important;
              box-shadow: 0 0 25px rgba(34, 197, 94, 0.7) !important;
            }
            [data-cms-key="${selectedElement}"]:not(.triptych-bg)::after {
              content: "Đang sửa" !important;
              background: #15803d !important;
              color: #ffffff !important;
              border: 1px solid #22c55e !important;
              position: absolute;
              top: -24px;
              left: 50%;
              transform: translateX(-50%);
              padding: 2px 8px;
              font-size: 11px;
              font-weight: 800;
              border-radius: 4px;
              white-space: nowrap;
              z-index: 9999;
              box-shadow: 0 4px 12px rgba(0,0,0,0.8);
              pointer-events: none;
            }
          `
              : ""
          }

          .triptych-edit-img-btn:hover {
            background-color: #22c55e !important;
            color: #000000 !important;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.7) !important;
            transform: scale(1.05);
          }

          /* Khóa tĩnh các hiệu ứng banner trong Live Preview */
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
        `,
          }}
        />
      )}

      {/* Editor Canvas Mode Sticky Banner */}
      {isEditor && (
        <aside
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999999,
            backgroundColor: "#09090b",
            borderBottom: "1.5px solid #06b6d4",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#e4e4e7",
            boxShadow: "0 4px 15px rgba(0,0,0,0.8)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#06b6d4", boxShadow: "0 0 10px #06b6d4" }} />
            <strong style={{ color: "#22d3ee" }}>CANVAS EDITOR MODE:</strong>
            <span style={{ color: "#a1a1aa" }}>Nhấp trực tiếp vào bất kỳ tiêu đề, đoạn văn hoặc hình ảnh để chỉnh sửa.</span>
          </div>
          <span style={{ fontSize: "11px", color: "#4ade80", backgroundColor: "rgba(34, 197, 94, 0.12)", border: "1px solid rgba(34, 197, 94, 0.3)", padding: "2px 8px", borderRadius: "4px", fontWeight: 700 }}>
            🔒 Đã khóa tất cả điều hướng liên kết web
          </span>
        </aside>
      )}

      <Header config={homeData.header} isEditor={isEditor} />
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
            isInsideIframe={isEditor}
          />
        )}

        {/* 1.5 Framer-Style Brand Logo Cloud (8 World Leading Brands) */}
        <BrandLogoCloud />

        {/* 2. Thiết bị nổi bật */}
        {visibility.show_products && <ProductGrid />}

        {/* 3. Danh mục sản phẩm */}
        {visibility.show_categories && <CategoryGrid config={homeData.categories_highlight} />}

        {/* 4. Dịch vụ cho thuê thiết bị */}
        {visibility.show_rental && <RentalSection config={homeData.rental} />}

        {/* 5. Giới thiệu VanBass */}
        {visibility.show_intro && <IntroSection config={homeData.intro} />}
      </main>

      {/* Chân trang Footer */}
      <Footer />

      {/* Floating Contact Widget */}
      {visibility.show_floating_contact && (
        <FloatingContact config={homeData.floating_contacts} forceShow={isEditor} />
      )}
    </>
  );
}

