"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoriesHighlightConfig, DEFAULT_HOME_DATA } from "../types/home_config";
import { useLanguage } from "../lib/language-context";

interface CategoryGridProps {
  config?: CategoriesHighlightConfig;
}

interface SubCategory {
  slug: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  image: string;
  count: number;
}

interface MainCategoryBlock {
  id: string;
  slug: string;
  nameVi: string;
  nameEn: string;
  brandOrLogoText: string;
  logoImg?: string;
  iconType: "dj" | "mixer" | "speaker" | "driver" | "mic" | "smoke";
  badgeVi: string;
  badgeEn: string;
  subcategories: SubCategory[];
}

const MAIN_CATEGORY_BLOCKS: MainCategoryBlock[] = [
  {
    id: "dj-hardware",
    slug: "dj",
    nameVi: "Thiết Bị DJ & Decks",
    nameEn: "DJ Gear & Decks",
    brandOrLogoText: "Pioneer DJ",
    logoImg: "/images/products/xdj-rx3.png",
    iconType: "dj",
    badgeVi: "6 Mục",
    badgeEn: "6 Items",
    subcategories: [
      {
        slug: "all-in-one-dj-systems",
        nameVi: "Hệ Thống All-in-One",
        nameEn: "All-in-One Systems",
        descVi: "Bàn DJ độc lập tích hợp màn hình cảm ứng, không cần máy tính.",
        descEn: "Standalone all-in-one DJ systems with built-in touchscreens.",
        image: "/images/products/xdj-rx3.png",
        count: 12,
      },
      {
        slug: "dj-controllers",
        nameVi: "DJ Controllers",
        nameEn: "DJ Controllers",
        descVi: "Bàn điều khiển kết nối phần mềm AlphaTheta & Pioneer DJ.",
        descEn: "Pro DJ controllers supporting Rekordbox & Serato DJ.",
        image: "/images/products/ddj-flx4.png",
        count: 24,
      },
      {
        slug: "dj-player",
        nameVi: "Đầu Phát CDJ / XDJ",
        nameEn: "CDJ Multi Players",
        descVi: "Đầu phát đa phương tiện chuyên nghiệp chuẩn club CDJ-3000.",
        descEn: "Club-standard multiplayer decks with ultra-low latency.",
        image: "/images/products/cdj-3000.png",
        count: 10,
      },
      {
        slug: "turntables",
        nameVi: "Mâm Đĩa Than Vinyl",
        nameEn: "Vinyl Turntables",
        descVi: "Mâm xoay đĩa than vinyl chuyên nghiệp cho DJ scratch.",
        descEn: "Direct drive vinyl turntables for scratch DJs and vinyl lovers.",
        image: "/images/products/plx-1000.jpg",
        count: 6,
      },
      {
        slug: "dj-mixers",
        nameVi: "Mixer DJ Chuyên Nghiệp",
        nameEn: "Pro DJ Mixers",
        descVi: "Bàn trộn âm thanh DJ từ 2 đến 6 kênh DJM-A9, V10, Euphonia.",
        descEn: "2 to 6-channel club mixers with studio-grade sound.",
        image: "/images/products/djm-a9.png",
        count: 16,
      },
      {
        slug: "dj-sampler",
        nameVi: "DJ Sampler & Remix",
        nameEn: "DJ Sampler & FX",
        descVi: "Thiết bị lấy mẫu âm thanh Sampler và Remix Stations biểu diễn live.",
        descEn: "Live performance samplers, effectors, and step sequencers.",
        image: "/images/products/djs-1000.png",
        count: 8,
      },
    ],
  },
  {
    id: "mixers-dsp",
    slug: "mixer",
    nameVi: "Mixer & Xử Lý DSP",
    nameEn: "Mixers & DSP",
    brandOrLogoText: "Mackie & DSP",
    logoImg: "/images/products/ban-mixer-mackie-profx16v3-16-kenh.jpg",
    iconType: "mixer",
    badgeVi: "3 Mục",
    badgeEn: "3 Items",
    subcategories: [
      {
        slug: "mixer-ban-tron-am-thanh",
        nameVi: "Mixer - Bàn Trộn Âm Thanh",
        nameEn: "Mixing Consoles",
        descVi: "Bàn trộn âm thanh sân khấu Analog & Digital Mackie, Behringer.",
        descEn: "Stage and live event mixing desks from compact to 32-channel.",
        image: "/images/products/ban-mixer-mackie-profx16v3-16-kenh.jpg",
        count: 26,
      },
      {
        slug: "thiet-bi-xu-ly-tin-hieu",
        nameVi: "Thiết Bị Xử Lý DSP",
        nameEn: "DSP Signal Processors",
        descVi: "Bộ xử lý tín hiệu kỹ thuật số DSP Marani, Crossover, Equalizer.",
        descEn: "Digital speaker management systems and active crossovers.",
        image: "/images/products/bo-xu-ly-tin-hieu-marani-mir260.png",
        count: 14,
      },
      {
        slug: "amplifier-cong-suat",
        nameVi: "Cục Đẩy Công Suất (Amp)",
        nameEn: "Power Amplifiers",
        descVi: "Cục đẩy công suất âm thanh nguồn xung và nguồn xuyến cho dàn lớn.",
        descEn: "High-efficiency Class-D power amps for pro sound systems.",
        image: "/images/products/p-3600.png",
        count: 18,
      },
    ],
  },
  {
    id: "speakers-pro",
    slug: "audio",
    nameVi: "Loa & Sân Khấu Pro",
    nameEn: "Pro Audio Speakers",
    brandOrLogoText: "Nexo & Line Array",
    logoImg: "/images/products/loa-full-2-tac-gm814fg.png",
    iconType: "speaker",
    badgeVi: "3 Mục",
    badgeEn: "3 Items",
    subcategories: [
      {
        slug: "loa-thung-pro-audio",
        nameVi: "Loa Thùng & Line Array",
        nameEn: "Stage PA & Line Arrays",
        descVi: "Hệ thống loa thùng biểu diễn sân khấu, loa cột PA và Subwoofer lớn.",
        descEn: "Full-range stage PA cabinets, column arrays, and high-power subs.",
        image: "/images/products/loa-full-2-tac-gm814fg.png",
        count: 32,
      },
      {
        slug: "loa-kiem-am",
        nameVi: "Loa Kiểm Âm (Monitor)",
        nameEn: "Studio Monitors",
        descVi: "Loa kiểm âm phòng thu Studio Monitor và kiểm âm sân khấu.",
        descEn: "High-precision active studio monitors and booth speakers.",
        image: "/images/products/dm-50d.png",
        count: 18,
      },
      {
        slug: "amplifier-cong-suat",
        nameVi: "Hệ Thống Khuếch Đại",
        nameEn: "Amplifier Systems",
        descVi: "Bộ khuếch đại công suất tải loa hội trường và sân khấu biểu diễn.",
        descEn: "Concert and club amplifier systems with built-in protection.",
        image: "/images/products/p-3600.png",
        count: 18,
      },
    ],
  },
  {
    id: "raw-drivers",
    slug: "loa-roi",
    nameVi: "Củ Loa & Phụ Kiện",
    nameEn: "Raw Drivers & Treble",
    brandOrLogoText: "B&C Speakers",
    logoImg: "/images/products/bc-speakers-10bg76.jpg",
    iconType: "driver",
    badgeVi: "2 Mục",
    badgeEn: "2 Items",
    subcategories: [
      {
        slug: "loa-roi",
        nameVi: "Củ Loa Rời & Củ Treble",
        nameEn: "Raw Woofers & Treble",
        descVi: "Củ loa rời, bass rời 2 tấc đến 5 tấc và củ treble B&C Speakers Italy.",
        descEn: "Raw woofers from 8\" to 18\" and compression drivers by B&C Italy.",
        image: "/images/products/bc-speakers-10bg76.jpg",
        count: 48,
      },
      {
        slug: "phu-kien-loa-roi",
        nameVi: "Họng Kèn & Màng Diaphragm",
        nameEn: "Horns & Diaphragms",
        descVi: "Họng kèn loa treble, màng loa thay thế diaphragm và linh kiện rời.",
        descEn: "Horn flares, replacement diaphragms, and speaker components.",
        image: "/images/products/hong-ken-loa-treble-bc-speakers-me90.png",
        count: 22,
      },
    ],
  },
  {
    id: "micro-headphones",
    slug: "accessories",
    nameVi: "Micro, Tai Nghe & Dây",
    nameEn: "Mics & Headphones",
    brandOrLogoText: "Sennheiser & Klotz",
    logoImg: "/images/products/tai-nghe-sennheiser-hd-25-plus.png",
    iconType: "mic",
    badgeVi: "4 Mục",
    badgeEn: "4 Items",
    subcategories: [
      {
        slug: "micro-khong-day",
        nameVi: "Micro Không Dây UHF",
        nameEn: "Wireless Microphones",
        descVi: "Hệ thống micro không dây UHF cao cấp Sennheiser EW-D, micro cài áo.",
        descEn: "Sennheiser EW-D digital wireless mics and handheld transmitters.",
        image: "/images/products/micro-khong-day-sennheiser-ew-d-835-s.png",
        count: 28,
      },
      {
        slug: "micro-co-day",
        nameVi: "Micro Có Dây & Phòng Thu",
        nameEn: "Vocal & Studio Mics",
        descVi: "Micro có dây dynamic cho ca sĩ, micro thu âm condenser phòng thu.",
        descEn: "Dynamic stage mics and high-sensitivity condenser studio mics.",
        image: "/images/products/micro-thu-am-sennheiser-mk4.png",
        count: 16,
      },
      {
        slug: "headphones-dj",
        nameVi: "Tai Nghe DJ & Kiểm Âm",
        nameEn: "DJ Headphones",
        descVi: "Tai nghe DJ chuyên nghiệp cách âm đỉnh cao AlphaTheta, HD 25.",
        descEn: "Closed-back DJ monitoring headphones with maximum sound isolation.",
        image: "/images/products/tai-nghe-sennheiser-hd-25.png",
        count: 20,
      },
      {
        slug: "day-tin-hieu-day-loa",
        nameVi: "Dây Tín Hiệu & Dây Loa",
        nameEn: "Audio Cables",
        descVi: "Dây cáp tín hiệu âm thanh Klotz AIS Germany, dây loa đồng chống nhiễu.",
        descEn: "German-engineered Klotz audio interconnects and speaker cables.",
        image: "/images/products/day-loa-klotz-ly225s.png",
        count: 25,
      },
    ],
  },
  {
    id: "stage-effects",
    slug: "stage-effects",
    nameVi: "Khói & Sân Khấu FX",
    nameEn: "Stage Smoke & FX",
    brandOrLogoText: "Antari FX",
    logoImg: "/images/products/hz-500-silent-hazer-on-flight-case.png",
    iconType: "smoke",
    badgeVi: "3 Mục",
    badgeEn: "3 Items",
    subcategories: [
      {
        slug: "may-tao-khoi",
        nameVi: "Máy Tạo Khói & Sương Haze",
        nameEn: "Fog & Haze Machines",
        descVi: "Máy tạo khói sân khấu, máy khói lạnh, máy tạo sương Haze Antari.",
        descEn: "Stage fog generators, low-lying cold foggers, and silent hazers.",
        image: "/images/products/may-khoi-antari-m-10.png",
        count: 15,
      },
      {
        slug: "dung-dich-tao-khoi",
        nameVi: "Dung Dịch & Nước Khói",
        nameEn: "Fog & Bubble Fluids",
        descVi: "Nước tạo khói tiêu chuẩn, dung dịch khói nhẹ Haze, nước bong bóng.",
        descEn: "Premium water-based fog fluids, haze fluids, bubble, and snow fluids.",
        image: "/images/products/nuoc-khoi-antari-flc-5.png",
        count: 12,
      },
      {
        slug: "quat-dieu-huong",
        nameVi: "Quạt Điều Hướng Gió",
        nameEn: "Stage Wind Fans",
        descVi: "Quạt gió chuyên dụng khuếch tán khói và tạo hiệu ứng gió sân khấu.",
        descEn: "High-velocity stage wind machines and DMX smoke diffusion fans.",
        image: "/images/products/antari-af-14c.png",
        count: 8,
      },
    ],
  },
];

export default function CategoryGrid({
  config = DEFAULT_HOME_DATA.categories_highlight,
}: CategoryGridProps) {
  const { t, lang } = useLanguage();
  const [selectedBlockId, setSelectedBlockId] = useState<string>(MAIN_CATEGORY_BLOCKS[0].id);

  const activeBlock = MAIN_CATEGORY_BLOCKS.find((b) => b.id === selectedBlockId) || MAIN_CATEGORY_BLOCKS[0];

  return (
    <section className="categories-strip-section reveal-on-scroll" id="categories">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading" style={{ marginBottom: "28px" }}>
          <div>
            <p
              className="section-kicker"
              style={{ fontSize: "11px", color: "#a1a1aa", letterSpacing: "0.15em", marginBottom: "6px" }}
              data-cms-key="categories_highlight.kicker"
              data-cms-label="Tag Kicker Danh Mục"
              data-cms-type="text"
            >
              {lang === "en" ? t.categories.title.toUpperCase() : (config.kicker || t.categories.title.toUpperCase())}
            </p>
            <h2
              style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em" }}
              data-cms-key="categories_highlight.title"
              data-cms-label="Tiêu Đề Danh Mục"
              data-cms-type="text"
            >
              {lang === "en" ? t.categories.subtitle : (config.title || t.categories.subtitle)}
            </h2>
          </div>

          <Link
            href={config.button_link || "/products"}
            className="text-link"
            style={{ fontSize: "12px", fontWeight: 700 }}
            data-cms-key="categories_highlight.button_text"
            data-cms-label="Chữ Nút Danh Mục"
            data-cms-type="text"
          >
            {lang === "en" ? t.categories.viewAll : (config.button_text || t.categories.viewAll)}
          </Link>
        </div>

        {/* 1. CONTIGUOUS HORIZONTAL MAIN CATEGORY BLOCKS STRIP */}
        <div className="cat-blocks-strip-container">
          <div className="cat-blocks-strip">
            {MAIN_CATEGORY_BLOCKS.map((block) => {
              const isActive = selectedBlockId === block.id;
              const blockName = lang === "en" ? block.nameEn : block.nameVi;
              const badgeText = lang === "en" ? block.badgeEn : block.badgeVi;

              return (
                <div
                  key={block.id}
                  className={`cat-strip-cell ${isActive ? "is-active" : ""}`}
                  onMouseEnter={() => setSelectedBlockId(block.id)}
                  onClick={() => setSelectedBlockId(block.id)}
                >
                  <div className="cat-cell-inner">
                    {/* Logo/Image Wrapper (User can customize) */}
                    {block.logoImg && (
                      <div className="cat-cell-logo-wrap">
                        <Image
                          src={block.logoImg}
                          alt={blockName}
                          width={48}
                          height={48}
                          className="cat-cell-logo-img"
                        />
                      </div>
                    )}

                    <div className="cat-cell-text-wrap">
                      <span className="cat-cell-brand">{block.brandOrLogoText}</span>
                      <h3 className="cat-cell-title">{blockName}</h3>
                    </div>

                    <div className="cat-cell-bottom-row">
                      <span className="cat-cell-badge">{badgeText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. FULL-WIDTH NESTED SUBCATEGORIES EXPANSION PANEL (NO CLIPPING, FULL SPAN) */}
          <div className="cat-fullwidth-expansion-panel" key={activeBlock.id}>
            <div className="cat-fullwidth-header">
              <div className="cat-fullwidth-header-left">
                <div>
                  <h4 className="cat-fullwidth-title">
                    {lang === "en" ? activeBlock.nameEn : activeBlock.nameVi}
                  </h4>
                  <span className="cat-fullwidth-subtitle">
                    {activeBlock.subcategories.length} {lang === "en" ? "specialized categories" : "danh mục chuyên sâu"} • {lang === "en" ? activeBlock.brandOrLogoText : activeBlock.brandOrLogoText}
                  </span>
                </div>
              </div>

              <Link
                href={`/products?category=${activeBlock.subcategories[0]?.slug || activeBlock.slug}`}
                className="cat-fullwidth-viewall-btn"
              >
                <span>{lang === "en" ? `View all ${activeBlock.nameEn}` : `Xem tất cả ${activeBlock.nameVi}`}</span>
              </Link>
            </div>

            {/* Sub-categories Grid across full width */}
            <div
              className="cat-fullwidth-grid"
              style={{
                gridTemplateColumns: `repeat(${Math.min(activeBlock.subcategories.length, 6)}, minmax(0, 1fr))`,
              }}
            >
              {activeBlock.subcategories.map((sub, idx) => {
                const subName = lang === "en" ? sub.nameEn : sub.nameVi;
                const subDesc = lang === "en" ? sub.descEn : sub.descVi;

                return (
                  <Link
                    key={sub.slug}
                    href={`/products?category=${sub.slug}`}
                    className="cat-fullwidth-card"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <div className="cat-fullwidth-card-top">
                      <div className="cat-fullwidth-thumb">
                        <Image
                          src={sub.image}
                          alt={subName}
                          width={48}
                          height={48}
                          className="cat-fullwidth-thumb-img"
                        />
                      </div>
                    </div>

                    <div className="cat-fullwidth-card-info">
                      <h5 className="cat-fullwidth-card-name">{subName}</h5>
                      <p className="cat-fullwidth-card-desc">{subDesc}</p>
                      <div className="cat-fullwidth-card-bottom">
                        <span className="cat-fullwidth-card-count">{sub.count}+ {lang === "en" ? "models" : "mẫu"}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}