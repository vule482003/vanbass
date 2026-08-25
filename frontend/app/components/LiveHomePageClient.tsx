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
  const [isInsideIframe] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.self !== window.top;
    }
    return false;
  });

  useEffect(() => {
    const inIframe = typeof window !== "undefined" && window.self !== window.top;

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
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Notify parent admin that iframe is ready to receive live config
    if (inIframe) {
      window.parent.postMessage({ type: "VANBASS_IFRAME_READY" }, "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const { visibility } = homeData;

  return (
    <>
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
