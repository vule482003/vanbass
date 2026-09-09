"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../lib/language-context";

interface BrandItem {
  id: string;
  name: string;
  queryKey: string;
  src: string;
  maxHeight: number;
}

export default function BrandLogoCloud() {
  const { lang } = useLanguage();

  const BRANDS: BrandItem[] = [
    // 1. JBL (Row 1, Col 1 - above NEXO)
    {
      id: "jbl",
      name: "JBL",
      queryKey: "jbl",
      src: "/images/brands/jbl.svg?v=11",
      maxHeight: 46,
    },
    // 2. AlphaTheta (Row 1, Col 2)
    {
      id: "alphatheta",
      name: "AlphaTheta",
      queryKey: "alphatheta",
      src: "/images/brands/alphatheta.svg?v=11",
      maxHeight: 36,
    },
    // 3. Pioneer DJ (Row 1, Col 3 - right of AlphaTheta)
    {
      id: "pioneer-dj",
      name: "Pioneer DJ",
      queryKey: "pioneer dj",
      src: "/images/brands/pioneerdj.svg?v=12",
      maxHeight: 32,
    },
    // 4. B&C Speakers (Row 1, Col 4)
    {
      id: "bc-speakers",
      name: "B&C SPEAKERS",
      queryKey: "b&c speakers",
      src: "/images/brands/bc_speakers.svg?v=11",
      maxHeight: 52,
    },
    // 5. NEXO (Row 2, Col 1 - below JBL)
    {
      id: "nexo",
      name: "NEXO",
      queryKey: "nexo",
      src: "/images/brands/nexo.svg?v=11",
      maxHeight: 44,
    },
    // 6. YAMAHA (Row 2, Col 2 - below AlphaTheta)
    {
      id: "yamaha",
      name: "YAMAHA",
      queryKey: "yamaha",
      src: "/images/brands/yamaha.svg?v=11",
      maxHeight: 36,
    },
    // 7. Allen & Heath (Row 2, Col 3 - down to previous JBL spot)
    {
      id: "allen-heath",
      name: "ALLEN & HEATH",
      queryKey: "allen & heath",
      src: "/images/brands/allen_heath.svg?v=11",
      maxHeight: 32,
    },
    // 8. Behringer (Row 2, Col 4)
    {
      id: "behringer",
      name: "BEHRINGER",
      queryKey: "behringer",
      src: "/images/brands/behringer.svg?v=11",
      maxHeight: 56,
    },
  ];

  return (
    <section className="brand-showcase-section" aria-label="Thương hiệu phân phối và cho thuê chính hãng">
      <div className="container">
        {/* Minimalist Section Header */}
        <div className="brand-showcase-header">
          <h3 className="brand-title">
            {lang === "en" ? "Top Audio & DJ Brands" : "Các Thương Hiệu Thiết Bị Hàng Đầu"}
          </h3>
        </div>

        {/* Framer-Style Clean Grid (2 Rows x 4 Columns, Pure Logos with NO Borders / Boxes) */}
        <div className="brand-clean-grid">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={`/products?brand=${encodeURIComponent(brand.queryKey)}`}
              className="brand-logo-link"
              title={`Xem sản phẩm hãng ${brand.name}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.src}
                alt={brand.name}
                className="brand-official-img"
                style={{ maxHeight: `${brand.maxHeight}px` }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .brand-showcase-section {
          padding: 64px 0 74px 0;
          background: #09090b;
          position: relative;
        }

        .brand-showcase-header {
          text-align: center;
          margin: 0 auto 48px auto;
        }

        .brand-title {
          font-size: clamp(24px, 3.2vw, 32px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 0;
        }

        /* Framer-Style Clean Grid (2 Rows x 4 Columns, Pure Logos with NO Borders / Boxes) */
        .brand-clean-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 36px 24px;
          max-width: 940px;
          margin: 0 auto;
          align-items: center;
          justify-items: center;
        }

        .brand-logo-link {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          opacity: 1;
          transition: transform 0.2s ease, opacity 0.2s ease;
          cursor: pointer;
          width: 100%;
          height: 76px;
        }

        .brand-logo-link:hover {
          transform: translateY(-2px);
          opacity: 0.85;
        }

        .brand-official-img {
          max-width: 210px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 900px) {
          .brand-clean-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 16px;
            max-width: 500px;
          }

          .brand-showcase-section {
            padding: 44px 0 54px 0;
          }

          .brand-showcase-header {
            margin-bottom: 32px;
          }

          .brand-logo-link {
            height: 64px;
          }

          .brand-official-img {
            max-width: 160px;
          }
        }
      `}</style>
    </section>
  );
}
