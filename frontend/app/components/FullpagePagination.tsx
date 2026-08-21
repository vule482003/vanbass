"use client";

import { useCallback, useEffect, useState } from "react";

export interface SlideItem {
  id: string;
  label: string;
  short: string;
}

export const SLIDES: SlideItem[] = [
  { id: "hero", label: "Trang chủ", short: "01" },
  { id: "featured-products", label: "Thiết bị nổi bật", short: "02" },
  { id: "categories", label: "Danh mục sản phẩm", short: "03" },
  { id: "rental", label: "Dịch vụ cho thuê", short: "04" },
  { id: "about-intro", label: "Về VanBass", short: "05" },
  { id: "contact-cta", label: "Showroom & Liên hệ", short: "06" },
];

export default function FullpagePagination() {
  const [activeSlide, setActiveSlide] = useState("hero");

  const scrollToSlide = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const slideElements = SLIDES.map((slide) =>
      document.getElementById(slide.id)
    ).filter(Boolean) as HTMLElement[];

    if (slideElements.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-25% 0px -25% 0px",
      threshold: 0.25,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSlide(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    slideElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Keyboard navigation support (ArrowUp, ArrowDown, PageUp, PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        const curIdx = SLIDES.findIndex((s) => s.id === activeSlide);
        if (curIdx >= 0 && curIdx < SLIDES.length - 1) {
          e.preventDefault();
          scrollToSlide(SLIDES[curIdx + 1].id);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        const curIdx = SLIDES.findIndex((s) => s.id === activeSlide);
        if (curIdx > 0) {
          e.preventDefault();
          scrollToSlide(SLIDES[curIdx - 1].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide, scrollToSlide]);

  const activeIndex = SLIDES.findIndex((s) => s.id === activeSlide);
  const displayIndex = activeIndex >= 0 ? activeIndex + 1 : 1;

  return (
    <nav
      className="fullpage-pagination"
      aria-label="Điều hướng slide"
    >
      {/* Slide Counter */}
      <div className="fullpage-counter">
        <span className="current-num">0{displayIndex}</span>
        <span className="divider">/</span>
        <span className="total-num">0{SLIDES.length}</span>
      </div>

      {/* Dots List */}
      <div className="fullpage-dots">
        {SLIDES.map((slide) => {
          const isActive = activeSlide === slide.id;
          return (
            <button
              key={slide.id}
              type="button"
              className={`fullpage-dot-btn ${isActive ? "active" : ""}`}
              onClick={() => scrollToSlide(slide.id)}
              aria-label={`Chuyển tới ${slide.label}`}
              title={slide.label}
            >
              <span className="dot-indicator" />
              <span className="dot-tooltip">{slide.label}</span>
              <span className="dot-number">{slide.short}</span>
            </button>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="fullpage-nav-arrows">
        <button
          type="button"
          className="nav-arrow-btn"
          disabled={activeIndex <= 0}
          onClick={() => {
            if (activeIndex > 0) {
              scrollToSlide(SLIDES[activeIndex - 1].id);
            }
          }}
          aria-label="Slide trước"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        <button
          type="button"
          className="nav-arrow-btn"
          disabled={activeIndex >= SLIDES.length - 1}
          onClick={() => {
            if (activeIndex < SLIDES.length - 1) {
              scrollToSlide(SLIDES[activeIndex + 1].id);
            }
          }}
          aria-label="Slide tiếp theo"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
