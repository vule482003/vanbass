"use client";

import React, { useState } from "react";
import { useLanguage } from "../lib/language-context";

interface GalleryItem {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  tagVi: string;
  tagEn: string;
  image: string;
  locationVi: string;
  locationEn: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    titleVi: "Huế Wonderverse Festival",
    titleEn: "Huế Wonderverse Festival",
    descVi: "Nghệ sĩ DJ quốc tế cùng đội ngũ kỹ thuật VanBass bên dàn Pioneer DJ setup.",
    descEn: "International headliner performing with VanBass sound engineering crew.",
    tagVi: "Sự kiện âm nhạc",
    tagEn: "Music Festival",
    image: "/images/community/event_hue_wonderverse_dj.jpg",
    locationVi: "Huế, Miền Trung",
    locationEn: "Hue, Central Vietnam",
  },
  {
    id: "2",
    titleVi: "Mainstage Huế Wonderverse",
    titleEn: "Huế Wonderverse Mainstage",
    descVi: "Dàn thiết bị Pioneer DJ & hệ thống âm thanh VanBass đồng hành trên sân khấu lớn.",
    descEn: "Full Pioneer DJ setup & pro audio equipment powered by VanBass.",
    tagVi: "Đại nhạc hội",
    tagEn: "Mainstage Event",
    image: "/images/community/event_hue_wonderverse_stage.jpg",
    locationVi: "Thừa Thiên Huế",
    locationEn: "Hue City",
  },
  {
    id: "3",
    titleVi: "Bàn giao Loa & Tai Nghe Studio",
    titleEn: "Studio Monitors & Headphones Handover",
    descVi: "Khách hàng quốc tế trang bị loa kiểm âm Pioneer DM-40BT-W và tai nghe HDJ-CUE1 tại showroom.",
    descEn: "International client picking up Pioneer DM-40BT-W monitors & HDJ-CUE1 headphones.",
    tagVi: "Khách hàng quốc tế",
    tagEn: "International Client",
    image: "/images/community/client_expat_speakers_handover.jpg",
    locationVi: "Showroom VanBass",
    locationEn: "VanBass Showroom",
  },
  {
    id: "4",
    titleVi: "Đài Phát Thanh Festival",
    titleEn: "Đài Phát Thanh Festival",
    descVi: "Khoảnh khắc bùng nổ cùng hàng ngàn khán giả trên sân khấu ánh sáng.",
    descEn: "Electrifying performance in front of thousands of music lovers.",
    tagVi: "Festival biểu diễn",
    tagEn: "Festival Show",
    image: "/images/community/event_daiphatthanh_stage.jpg",
    locationVi: "Đà Nẵng & Miền Trung",
    locationEn: "Da Nang & Central VN",
  },
  {
    id: "5",
    titleVi: "Stadium Arena Concert",
    titleEn: "Stadium Arena Concert",
    descVi: "Góc nhìn bao quát từ DJ Booth mâm đĩa xoay hướng về biển khán giả rực rỡ.",
    descEn: "Panoramic view from the DJ booth overlooking a massive arena crowd.",
    tagVi: "Concert quy mô lớn",
    tagEn: "Arena Concert",
    image: "/images/community/event_stadium_crowd_booth.jpg",
    locationVi: "Sân vận động / Arena",
    locationEn: "Stadium Arena",
  },
  {
    id: "6",
    titleVi: "Trọn bộ Pro Studio Setup",
    titleEn: "Complete Pro Studio Setup",
    descVi: "Bàn giao trọn gói DDJ-FLX4, loa kiểm âm Pioneer VM-50-W và tai nghe studio.",
    descEn: "Complete studio package: DDJ-FLX4, Pioneer VM-50-W monitors & headphones.",
    tagVi: "Bàn giao trọn gói",
    tagEn: "Studio Bundle",
    image: "/images/community/client_expat_full_dj_setup.jpg",
    locationVi: "Showroom Đà Nẵng",
    locationEn: "Da Nang Center",
  },
  {
    id: "7",
    titleVi: "Cộng đồng DJ & Khách Quốc Tế",
    titleEn: "International DJ Community",
    descVi: "Bàn giao Pioneer DDJ-FLX4 và tai nghe HDJ cho nghệ sĩ quốc tế.",
    descEn: "Handing over Pioneer DDJ-FLX4 & pro HDJ headphones to foreign DJ.",
    tagVi: "Khách hàng quốc tế",
    tagEn: "International Expat",
    image: "/images/community/client_expat_ddj_flx4.jpg",
    locationVi: "Showroom VanBass",
    locationEn: "VanBass Store",
  },
  {
    id: "8",
    titleVi: "Nghệ sĩ Nữ DJ",
    titleEn: "Female DJ Artist",
    descVi: "Trải nghiệm và nhận bàn giao thiết bị biểu diễn tại không gian VanBass.",
    descEn: "Testing and collecting DJ performance setup at VanBass center.",
    tagVi: "Nghệ sĩ biểu diễn",
    tagEn: "Artist Handover",
    image: "/images/community/client_female_dj_handover.jpg",
    locationVi: "VanBass DJ Store",
    locationEn: "VanBass DJ Store",
  },
  {
    id: "9",
    titleVi: "Showroom VanBass Music Center",
    titleEn: "VanBass Showroom Experience",
    descVi: "Không gian trưng bày & trải nghiệm trực tiếp Pioneer DJ, AlphaTheta & Flight cases.",
    descEn: "Hands-on experience with official Pioneer DJ, AlphaTheta & pro flight cases.",
    tagVi: "Showroom chính hãng",
    tagEn: "Flagship Showroom",
    image: "/images/community/showroom_pioneer_flightcases.jpg",
    locationVi: "Đà Nẵng & Huế",
    locationEn: "Da Nang & Hue",
  },
  {
    id: "10",
    titleVi: "Khách hàng Quốc Tế Tin Chọn",
    titleEn: "Trusted by Global Artists",
    descVi: "Bàn giao bàn DJ chính hãng đập hộp nguyên seal 100%.",
    descEn: "Brand new in-box official Pioneer DJ gear collection.",
    tagVi: "Thiết bị mới 100%",
    tagEn: "Brand New Sealed",
    image: "/images/community/client_expat_flx4_unboxing.jpg",
    locationVi: "VanBass Music Center",
    locationEn: "VanBass Center",
  },
  {
    id: "11",
    titleVi: "Giao Nhận Tận Nơi 24/7",
    titleEn: "24/7 On-Site Handover",
    descVi: "Giao tận tay tai nghe AlphaTheta HDJ-F10 cho khách quốc tế tại Hội An / Đà Nẵng.",
    descEn: "Direct delivery of AlphaTheta HDJ-F10 headphones in Hoi An / Da Nang.",
    tagVi: "Giao tận nơi 24/7",
    tagEn: "24/7 Delivery",
    image: "/images/community/client_expat_alphatheta_delivery.jpg",
    locationVi: "Đà Nẵng / Hội An",
    locationEn: "Hoi An / Da Nang",
  },
  {
    id: "12",
    titleVi: "Trung Tâm Sửa Chữa & Bảo Hành",
    titleEn: "Authorized Service & Repair Area",
    descVi: "Khu vực kỹ thuật chuyên nghiệp: bảo dưỡng, thay fader, sửa chữa mixer Pioneer DJ & dàn âm thanh.",
    descEn: "Professional service station: maintenance, fader replacement, and Pioneer DJ mixer repairs.",
    tagVi: "Sửa chữa & Bảo dưỡng",
    tagEn: "Repair & Service",
    image: "/images/community/service_repair_pioneer_mixers.jpg",
    locationVi: "Khu kỹ thuật VanBass",
    locationEn: "VanBass Service Area",
  },
];

export default function CommunityShowcase() {
  const { lang } = useLanguage();
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const currentItem = GALLERY_ITEMS[activeSlideIdx] || GALLERY_ITEMS[0];

  const handleNext = () => {
    setActiveSlideIdx((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveSlideIdx((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  return (
    <section className="community-section reveal-on-scroll" id="community-moments">
      <div className="container">
        {/* Header split layout */}
        <div className="community-layout-grid">
          {/* CỘT TRÁI: BRAND STORY & TRUST METRICS */}
          <div className="community-story-col">
            <h2 className="community-title">
              {lang === "en" ? (
                <>
                  Featured <span className="text-highlight">Events & Customers</span> Who Trust VanBass.
                </>
              ) : (
                <>
                  Sự Kiện Thực Tế & <span className="text-highlight">Khách Hàng Tin Chọn</span> VanBass.
                </>
              )}
            </h2>

            <p className="community-desc">
              {lang === "en"
                ? "VanBass is proud to be the trusted partner powering premier music festivals, clubs, and live events across Da Nang, Hue, and Central Vietnam. We are the preferred destination for domestic performers, touring international DJs, and expat artists seeking genuine Pioneer DJ & B&C pro audio equipment."
                : "VanBass tự hào là đơn vị đồng hành cung cấp & lắp đặt thiết bị DJ, âm thanh biểu diễn cho hàng trăm đại nhạc hội, bar/lounge lớn tại Đà Nẵng, Thừa Thiên Huế, Hội An & Miền Trung. Là điểm đến tin cậy của cộng đồng DJ Việt Nam cùng các nghệ sĩ & khách hàng quốc tế."}
            </p>

            {/* Trust Metrics Cards */}
            <div className="community-stats-grid">
              <div className="community-stat-card">
                <div className="stat-number">500+</div>
                <div className="stat-label">
                  {lang === "en" ? "Events & Festivals" : "Sự kiện & Festival"}
                </div>
              </div>

              <div className="community-stat-card">
                <div className="stat-number">1,500+</div>
                <div className="stat-label">
                  {lang === "en" ? "Domestic & Expat DJs" : "Khách hàng Việt & Quốc tế"}
                </div>
              </div>

              <div className="community-stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">
                  {lang === "en" ? "Genuine Hardware" : "Pioneer DJ & B&C Chính hãng"}
                </div>
              </div>

              <div className="community-stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">
                  {lang === "en" ? "On-site Delivery & Soundman" : "Giao lắp & Sound-man 24/7"}
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: INTERACTIVE GLASS BENTO SHOWCASE */}
          <div className="community-showcase-col">
            {/* Featured Hero Photo Card with Click-to-Enlarge */}
            <div
              className="community-featured-frame"
              onClick={() => setLightboxItem(currentItem)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentItem.image}
                alt={lang === "en" ? currentItem.titleEn : currentItem.titleVi}
                className="community-featured-img"
              />
              <div className="community-featured-gradient" />

              {/* Tag Badges */}
              <div className="community-card-top-tags">
                <span className="comm-tag-badge">
                  {lang === "en" ? currentItem.tagEn : currentItem.tagVi}
                </span>
                <span className="comm-location-badge">
                  📍 {lang === "en" ? currentItem.locationEn : currentItem.locationVi}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="community-card-bottom-info">
                <h3 className="comm-card-title">
                  {lang === "en" ? currentItem.titleEn : currentItem.titleVi}
                </h3>
                <p className="comm-card-desc">
                  {lang === "en" ? currentItem.descEn : currentItem.descVi}
                </p>
              </div>

              <div className="comm-zoom-hint">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>{lang === "en" ? "Click to view full photo" : "Bấm để xem ảnh phóng to"}</span>
              </div>
            </div>

            {/* Thumbnail Strip & Navigation Controls */}
            <div className="community-thumbs-bar">
              <div className="comm-nav-arrows">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="comm-arrow-btn"
                  title="Previous"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="comm-arrow-btn"
                  title="Next"
                >
                  ›
                </button>
              </div>

              <div className="comm-thumbnails-scroll">
                {GALLERY_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`comm-thumb-btn ${idx === activeSlideIdx ? "active" : ""}`}
                    title={lang === "en" ? item.titleEn : item.titleVi}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={lang === "en" ? item.titleEn : item.titleVi}
                      className="comm-thumb-img"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="community-lightbox-backdrop"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="community-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxItem(null)}
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxItem.image}
              alt={lang === "en" ? lightboxItem.titleEn : lightboxItem.titleVi}
              className="lightbox-full-img"
            />
            <div className="lightbox-caption">
              <div className="lightbox-tags-row">
                <span className="comm-tag-badge">
                  {lang === "en" ? lightboxItem.tagEn : lightboxItem.tagVi}
                </span>
                <span className="comm-location-badge">
                  📍 {lang === "en" ? lightboxItem.locationEn : lightboxItem.locationVi}
                </span>
              </div>
              <h4>{lang === "en" ? lightboxItem.titleEn : lightboxItem.titleVi}</h4>
              <p>{lang === "en" ? lightboxItem.descEn : lightboxItem.descVi}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
