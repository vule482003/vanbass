"use client";

import React from "react";
import Link from "next/link";
interface BrandItem {
  id: string;
  name: string;
  queryKey: string;
  src: string;
  maxHeight: number;
}

export default function BrandLogoCloud() {
  const BRANDS: BrandItem[] = [
    // Row 1
    {
      id: "jbl",
      name: "JBL",
      queryKey: "jbl",
      src: "/images/brands/jbl.svg?v=11",
      maxHeight: 34,
    },
    {
      id: "alphatheta",
      name: "AlphaTheta",
      queryKey: "alphatheta",
      src: "/images/brands/alphatheta.svg?v=11",
      maxHeight: 26,
    },
    {
      id: "pioneer-dj",
      name: "Pioneer DJ",
      queryKey: "pioneer dj",
      src: "/images/brands/pioneerdj.svg?v=12",
      maxHeight: 25,
    },
    {
      id: "bc-speakers",
      name: "B&C SPEAKERS",
      queryKey: "b&c speakers",
      src: "/images/brands/bc_speakers.svg?v=11",
      maxHeight: 38,
    },
    // Row 2
    {
      id: "nexo",
      name: "NEXO",
      queryKey: "nexo",
      src: "/images/brands/nexo.svg?v=11",
      maxHeight: 32,
    },
    {
      id: "yamaha",
      name: "YAMAHA",
      queryKey: "yamaha",
      src: "/images/brands/yamaha.svg?v=11",
      maxHeight: 26,
    },
    {
      id: "allen-heath",
      name: "ALLEN & HEATH",
      queryKey: "allen & heath",
      src: "/images/brands/allen_heath.svg?v=11",
      maxHeight: 24,
    },
    {
      id: "behringer",
      name: "BEHRINGER",
      queryKey: "behringer",
      src: "/images/brands/behringer.svg?v=11",
      maxHeight: 38,
    },
  ];

  return (
    <section className="brand-crosshair-section" aria-label="Thương hiệu đối tác phân phối chính hãng">
      <div className="container">
        {/* Crosshair Grid Container (4 columns x 2 rows, wide & airy like Retool) */}
        <div className="crosshair-grid-wrap">
          {/* Row 1 */}
          <div className="crosshair-row">
            {BRANDS.slice(0, 4).map((brand) => (
              <Link
                key={brand.id}
                href={`/products?brand=${encodeURIComponent(brand.queryKey)}`}
                className="brand-logo-cell"
                title={`Xem sản phẩm hãng ${brand.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="brand-logo-monochrome"
                  style={{ maxHeight: `${brand.maxHeight}px` }}
                />
              </Link>
            ))}
          </div>

          {/* Center Crosshairs separator (+ marks between columns) */}
          <div className="crosshairs-separator" aria-hidden="true">
            <span className="crosshair-plus crosshair-p1">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="13" y1="2" x2="13" y2="24" />
                <line x1="2" y1="13" x2="24" y2="13" />
              </svg>
            </span>
            <span className="crosshair-plus crosshair-p2">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="13" y1="2" x2="13" y2="24" />
                <line x1="2" y1="13" x2="24" y2="13" />
              </svg>
            </span>
            <span className="crosshair-plus crosshair-p3">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="13" y1="2" x2="13" y2="24" />
                <line x1="2" y1="13" x2="24" y2="13" />
              </svg>
            </span>
          </div>

          {/* Row 2 */}
          <div className="crosshair-row">
            {BRANDS.slice(4, 8).map((brand) => (
              <Link
                key={brand.id}
                href={`/products?brand=${encodeURIComponent(brand.queryKey)}`}
                className="brand-logo-cell"
                title={`Xem sản phẩm hãng ${brand.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="brand-logo-monochrome"
                  style={{ maxHeight: `${brand.maxHeight}px` }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scoped Styling */}
      <style jsx>{`
        .brand-crosshair-section {
          padding: 80px 0;
          background: #09090b;
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .crosshair-grid-wrap {
          max-width: 1220px;
          margin: 0 auto;
          position: relative;
        }

        .crosshair-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
          justify-items: center;
          padding: 32px 0;
        }

        .crosshairs-separator {
          position: relative;
          width: 100%;
          height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .crosshair-plus {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.32);
          user-select: none;
          line-height: 1;
        }

        .crosshair-p1 {
          left: 25%;
        }

        .crosshair-p2 {
          left: 50%;
        }

        .crosshair-p3 {
          left: 75%;
        }

        .brand-logo-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 84px;
          text-decoration: none;
          padding: 0 28px;
          opacity: 0.88;
          transition: opacity 0.25s ease, transform 0.25s ease;
          cursor: pointer;
        }

        .brand-logo-cell:hover {
          opacity: 1;
          transform: translateY(-2px);
        }

        .brand-logo-monochrome {
          max-width: 185px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
          display: block;
        }

        /* Mobile / Tablet Responsive */
        @media (max-width: 860px) {
          .brand-crosshair-section {
            padding: 50px 0;
          }

          .crosshair-row {
            grid-template-columns: repeat(2, 1fr);
            padding: 16px 0;
          }

          .crosshair-p1,
          .crosshair-p3 {
            display: none;
          }

          .crosshair-p2 {
            left: 50%;
          }

          .brand-logo-cell {
            height: 64px;
            padding: 0 16px;
          }

          .brand-logo-monochrome {
            max-width: 140px;
          }
        }
      `}</style>
    </section>
  );
}
