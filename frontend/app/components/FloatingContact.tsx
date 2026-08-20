"use client";

import React, { useState } from "react";

const PHONE_NUMBER = "0706067799";
const PHONE_DISPLAY = "0706.067.799";
const ZALO_URL = "https://zalo.me/0706067799";
const FACEBOOK_URL = "https://www.facebook.com/vanbassmusiccenterdanangvietnam?locale=vi_VN";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Đà+Nẵng+VanBass+Music+Center";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="floating-contact-wrapper" aria-label="Kênh liên hệ hỗ trợ nhanh">
      {/* Quick Buttons Stack */}
      <div className={`floating-contact-list ${isOpen ? "is-open" : "is-collapsed"}`}>
        {/* 1. Hotline Gọi Ngay */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="floating-btn btn-phone"
          title={`Gọi Hotline tư vấn miễn phí: ${PHONE_DISPLAY}`}
          aria-label={`Gọi Hotline ${PHONE_DISPLAY}`}
        >
          <div className="floating-btn-icon">
            <span className="btn-pulse-wave" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span className="floating-btn-tooltip">
            <strong>Hotline 24/7</strong>
            <small>{PHONE_DISPLAY}</small>
          </span>
        </a>

        {/* 2. Chat Zalo */}
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn btn-zalo"
          title="Chat Zalo tư vấn thiết bị & báo giá thuê ngay"
          aria-label="Chat Zalo"
        >
          <div className="floating-btn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.42 3.84 7.02-.17 1.25-.8 3.16-1.57 4.15 1.7-.22 3.83-1.07 5.17-1.99.82.21 1.68.32 2.56.32 5.52 0 10-4.03 10-9s-4.48-9-10-9zm-3.5 11.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <span className="floating-btn-tooltip">
            <strong>Chat Zalo</strong>
            <small>Tư vấn &amp; Báo giá</small>
          </span>
        </a>

        {/* 3. Facebook Messenger Fanpage */}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn btn-messenger"
          title="Nhắn tin Messenger Fanpage VanBass Music Center"
          aria-label="Nhắn tin Facebook Messenger"
        >
          <div className="floating-btn-icon">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.145 2 11.257c0 2.914 1.455 5.518 3.735 7.214V22l3.41-1.872c.907.251 1.868.386 2.855.386 5.523 0 10-4.145 10-9.257C22 6.145 17.523 2 12 2zm1.066 12.443l-2.571-2.742-5.018 2.742 5.52-5.857 2.637 2.742 4.952-2.742-5.52 5.857z" />
            </svg>
          </div>
          <span className="floating-btn-tooltip">
            <strong>Messenger</strong>
            <small>Fanpage VanBass</small>
          </span>
        </a>

        {/* 4. Showroom & Bản đồ */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn btn-maps"
          title="Chỉ đường đến Showroom VanBass Đà Nẵng để test máy trực tiếp"
          aria-label="Chỉ đường Showroom Đà Nẵng"
        >
          <div className="floating-btn-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className="floating-btn-tooltip">
            <strong>Showroom</strong>
            <small>Test máy Đà Nẵng</small>
          </span>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        type="button"
        className={`floating-main-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Thu nhỏ liên hệ nhanh" : "Mở liên hệ tư vấn nhanh"}
        aria-expanded={isOpen}
      >
        <span className="trigger-pulse" />
        <span className="trigger-badge">1</span>
        
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="trigger-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        )}
      </button>
    </aside>
  );
}
