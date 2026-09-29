"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Product } from "../lib/types";
import { useLanguage } from "../lib/language-context";

interface ProductImageGalleryProps {
  product: Product;
  displayName: string;
}

export default function ProductImageGallery({ product, displayName }: ProductImageGalleryProps) {
  const { lang } = useLanguage();

  // Helper to resolve image URLs safely
  const resolveImageUrl = useCallback((url?: string) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
    if (url.startsWith("/images/")) return url;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const backendBase = apiUrl.replace(/\/api\/?$/, "");
    return `${backendBase}${url.startsWith("/") ? "" : "/"}${url}`;
  }, []);

  // Assemble full image list
  const imageList: string[] = React.useMemo(() => {
    const list: string[] = [];
    if (product.images && product.images.length > 0) {
      const sorted = [...product.images].sort((a, b) => a.sort_order - b.sort_order);
      sorted.forEach((img) => {
        const resolved = resolveImageUrl(img.image_url);
        if (resolved && !list.includes(resolved)) list.push(resolved);
      });
    }
    if (product.image_url) {
      const resolved = resolveImageUrl(product.image_url);
      if (resolved && !list.includes(resolved)) list.unshift(resolved);
    }
    return list;
  }, [product, resolveImageUrl]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(false);
  const [lightboxPan, setLightboxPan] = useState({ x: 50, y: 50 });

  const containerRef = useRef<HTMLDivElement>(null);

  const currentImage = imageList[activeIndex] || null;

  // Handle Mouse Move for Instant Pan-Zoom Lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomPos({ x: 50, y: 50 });
  };

  // Lightbox Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setLightboxZoom(false);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % (imageList.length || 1));
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + (imageList.length || 1)) % (imageList.length || 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, imageList.length]);

  // Prevent background scroll when Lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  const handleLightboxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lightboxZoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLightboxPan({ x, y });
  };

  return (
    <div className="product-gallery-system">
      {/* ============================================================
          DESKTOP: VERTICAL THUMBNAIL STRIP (LEFT) + MAIN STAGE (RIGHT)
          MOBILE: MAIN STAGE (TOP) + HORIZONTAL THUMBNAIL STRIP (BOTTOM)
         ============================================================ */}
      <div className="gallery-layout-wrapper">
        {/* Thumbnail Strip (Vertical on Desktop, Horizontal on Mobile) */}
        {imageList.length > 1 && (
          <div className="gallery-thumbnails-strip">
            {imageList.map((imgUrl, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`gallery-thumb-btn ${isSelected ? "is-active" : ""}`}
                  aria-label={`Xem ảnh ${idx + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt={`${displayName} thumb ${idx + 1}`} className="thumb-img" />
                </button>
              );
            })}
          </div>
        )}

        {/* Main Stage Container */}
        <div
          ref={containerRef}
          className={`gallery-main-stage ${isZooming ? "is-zooming" : ""}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsLightboxOpen(true)}
        >
          {currentImage ? (
            <div className="gallery-image-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage}
                alt={`${displayName} - Ảnh ${activeIndex + 1}`}
                className="gallery-main-image"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZooming ? "scale(2.2)" : "scale(1)",
                }}
              />
            </div>
          ) : (
            <div className="product-placeholder" style={{ width: "100%", height: "100%", maxWidth: "340px", maxHeight: "240px", display: "block" }}>
              <div className="product-placeholder-top">
                <span />
                <span />
                <span />
              </div>
              <div className="product-placeholder-body">
                <div className="product-wheel" style={{ width: "64px", height: "64px" }} />
                <div className="product-faders">
                  <i />
                  <i />
                </div>
                <div className="product-wheel" style={{ width: "64px", height: "64px" }} />
              </div>
            </div>
          )}

          {/* Previous / Next Arrows on Main Stage */}
          {imageList.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-stage-arrow prev-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
                }}
                aria-label="Ảnh trước"
              >
                ‹
              </button>
              <button
                type="button"
                className="gallery-stage-arrow next-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev + 1) % imageList.length);
                }}
                aria-label="Ảnh kế tiếp"
              >
                ›
              </button>
            </>
          )}

          {/* Top-Right Fullscreen / Lightbox Trigger Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="gallery-expand-btn"
            aria-label={lang === "en" ? "Expand high resolution image" : "Phóng to toàn màn hình"}
            title={lang === "en" ? "Click to view full screen" : "Bấm để xem ảnh phóng to full màn hình"}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>

          {/* Bottom Hover Hint */}
          <div className={`gallery-hover-hint ${isZooming ? "is-active" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>{lang === "en" ? "Hover to zoom • Click to expand" : "Di chuyển chuột để phóng to"}</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          FULLSCREEN LIGHTBOX MODAL (Obsidian Dark Theater Mode)
         ============================================================ */}
      {isLightboxOpen && currentImage && (
        <div
          className="gallery-lightbox-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setIsLightboxOpen(false);
            setLightboxZoom(false);
          }}
        >
          {/* Lightbox Header Bar */}
          <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-title-wrap">
              <span className="lightbox-brand">{product.brand || "VanBass Pro"}</span>
              <span className="lightbox-prod-name">{displayName}</span>
            </div>

            <div className="lightbox-controls">
              <span className="lightbox-counter">
                {activeIndex + 1} / {imageList.length}
              </span>

              <button
                type="button"
                onClick={() => setLightboxZoom(!lightboxZoom)}
                className={`lightbox-tool-btn ${lightboxZoom ? "is-active" : ""}`}
                title={lightboxZoom ? "Thu nhỏ (1x)" : "Phóng to cực đại (2.5x)"}
              >
                {lightboxZoom ? "1x" : "2.5x 🔍"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setLightboxZoom(false);
                }}
                className="lightbox-close-btn"
                aria-label="Đóng phóng to"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Lightbox Center Stage */}
          <div
            className={`lightbox-stage ${lightboxZoom ? "is-zoomed" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxZoom(!lightboxZoom);
            }}
            onMouseMove={handleLightboxMouseMove}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage}
              alt={`${displayName} Phóng to`}
              className="lightbox-full-img"
              style={{
                transformOrigin: lightboxZoom ? `${lightboxPan.x}% ${lightboxPan.y}%` : "center center",
                transform: lightboxZoom ? "scale(2.5)" : "scale(1)",
                cursor: lightboxZoom ? "zoom-out" : "zoom-in",
              }}
            />
          </div>

          {/* Navigation Arrows */}
          {imageList.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav-btn prev-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
                }}
                aria-label="Ảnh trước"
              >
                ‹
              </button>
              <button
                type="button"
                className="lightbox-nav-btn next-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) => (prev + 1) % imageList.length);
                }}
                aria-label="Ảnh kế tiếp"
              >
                ›
              </button>
            </>
          )}

          {/* Bottom Thumbnails Strip in Lightbox */}
          {imageList.length > 1 && (
            <div className="lightbox-bottom-strip" onClick={(e) => e.stopPropagation()}>
              {imageList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`lightbox-mini-thumb ${activeIndex === idx ? "is-active" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt="Thumbnail" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          SCOPED STYLES
         ============================================================ */}
      <style jsx>{`
        .product-gallery-system {
          width: 100%;
        }

        .gallery-layout-wrapper {
          display: flex;
          flex-direction: row;
          gap: 14px;
          align-items: stretch;
          width: 100%;
        }

        /* Thumbnail Strip - Vertical on Desktop */
        .gallery-thumbnails-strip {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 72px;
          flex-shrink: 0;
          overflow-y: auto;
          max-height: 480px;
        }

        .gallery-thumb-btn {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 4px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .gallery-thumb-btn:hover {
          border-color: rgba(34, 197, 94, 0.5);
          transform: translateY(-2px);
        }

        .gallery-thumb-btn.is-active {
          border-color: #22c55e;
          border-width: 2px;
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.3);
          background: #ffffff;
        }

        .thumb-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          user-select: none;
        }

        /* Main Image Stage */
        .gallery-main-stage {
          flex: 1;
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          min-height: 360px;
          max-height: 460px;
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow: hidden;
          cursor: crosshair;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.04);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .gallery-main-stage:hover {
          border-color: rgba(34, 197, 94, 0.35);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.65), 0 0 20px rgba(34, 197, 94, 0.1);
        }

        .gallery-image-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .gallery-main-image {
          max-width: 100%;
          max-height: 380px;
          object-fit: contain;
          transition: transform 0.1s ease-out;
          will-change: transform;
          pointer-events: none;
          user-select: none;
        }

        /* Nav Arrows on Main Stage */
        .gallery-stage-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(18, 20, 26, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #ffffff;
          font-size: 24px;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10;
          user-select: none;
        }

        .gallery-stage-arrow:hover {
          background: #22c55e;
          border-color: #22c55e;
          color: #000000;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 0 14px rgba(34, 197, 94, 0.4);
        }

        .prev-arrow {
          left: 14px;
        }

        .next-arrow {
          right: 14px;
        }

        /* Fullscreen Expand Button */
        .gallery-expand-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(18, 20, 26, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          color: #e4e4e7;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .gallery-expand-btn:hover {
          background: rgba(34, 197, 94, 0.2);
          border-color: #22c55e;
          color: #4ade80;
          transform: scale(1.06);
        }

        /* Hover Hint Bar */
        .gallery-hover-hint {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 14px;
          background: rgba(10, 11, 15, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          color: #8a8d9b;
          font-size: 11px;
          font-weight: 500;
          pointer-events: none;
          backdrop-filter: blur(8px);
          transition: opacity 0.2s ease;
        }

        .gallery-hover-hint.is-active {
          color: #22c55e;
          border-color: rgba(34, 197, 94, 0.3);
        }

        /* ============================================================
           FULLSCREEN LIGHTBOX MODAL
           ============================================================ */
        .gallery-lightbox-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 5, 8, 0.96);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          z-index: 999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          animation: lightboxFadeIn 0.25s ease-out;
          user-select: none;
        }

        @keyframes lightboxFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .lightbox-top-bar {
          width: 100%;
          max-width: 1400px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          z-index: 20;
        }

        .lightbox-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lightbox-brand {
          font-size: 11px;
          font-weight: 800;
          color: #22c55e;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .lightbox-prod-name {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
        }

        .lightbox-controls {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .lightbox-counter {
          font-size: 13px;
          color: #a1a1aa;
          font-weight: 600;
        }

        .lightbox-tool-btn {
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: #e4e4e7;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .lightbox-tool-btn:hover,
        .lightbox-tool-btn.is-active {
          background: #22c55e;
          border-color: #22c55e;
          color: #000;
        }

        .lightbox-close-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: #fff;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .lightbox-close-btn:hover {
          background: #ef4444;
          border-color: #ef4444;
          transform: rotate(90deg);
        }

        /* Lightbox Stage */
        .lightbox-stage {
          flex: 1;
          width: 100%;
          max-width: 1400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          padding: 20px;
        }

        .lightbox-full-img {
          max-width: 90vw;
          max-height: 72vh;
          object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.9));
          transition: transform 0.12s ease-out;
          will-change: transform;
        }

        /* Nav Buttons */
        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(20, 22, 28, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-size: 32px;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(12px);
          z-index: 30;
        }

        .lightbox-nav-btn:hover {
          background: #22c55e;
          border-color: #22c55e;
          color: #000;
          transform: translateY(-50%) scale(1.1);
        }

        .prev-btn {
          left: 32px;
        }

        .next-btn {
          right: 32px;
        }

        /* Bottom Mini Strip */
        .lightbox-bottom-strip {
          display: flex;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          max-width: 90vw;
          overflow-x: auto;
          z-index: 20;
        }

        .lightbox-mini-thumb {
          width: 52px;
          height: 52px;
          padding: 4px;
          background: #14151a;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .lightbox-mini-thumb.is-active {
          border-color: #22c55e;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
        }

        .lightbox-mini-thumb img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        @media (max-width: 768px) {
          .gallery-layout-wrapper {
            flex-direction: column-reverse;
            gap: 12px;
          }

          .gallery-thumbnails-strip {
            flex-direction: row;
            width: 100%;
            max-height: none;
            overflow-x: auto;
            padding-bottom: 4px;
          }

          .gallery-thumb-btn {
            width: 60px;
            height: 60px;
          }

          .gallery-main-stage {
            min-height: 280px;
            aspect-ratio: 1 / 1;
            padding: 16px;
          }

          .gallery-hover-hint {
            display: none;
          }

          .prev-btn {
            left: 10px;
            width: 42px;
            height: 42px;
            font-size: 24px;
          }

          .next-btn {
            right: 10px;
            width: 42px;
            height: 42px;
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
