"use client";

import React from "react";
import { useLanguage } from "../lib/language-context";

interface RentalFleetHeroProps {
  messengerUrl: string;
  hotline: string;
}

export default function RentalFleetHero({ messengerUrl, hotline }: RentalFleetHeroProps) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  return (
    <section
      style={{
        backgroundColor: "#09090b",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "50px 0 70px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top Grid: Left Information (Chừa chỗ rộng rãi) | Right Hardware Photo (Nhích qua phải cố tình cắt góc) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.85fr) minmax(0, 1fr)",
            gap: "36px",
            alignItems: "center",
            marginBottom: "50px",
          }}
        >
          {/* Left Column: Heading & Specifications (Rộng Rãi, Dễ Đọc) */}
          <div style={{ paddingRight: "16px" }}>
            {/* Headline - H1 Chữ Xám Chuẩn, Nét Vuông Mảnh Sang Trọng */}
            <h1
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: "clamp(34px, 5vw, 62px)",
                fontWeight: 600,
                letterSpacing: "0.02em",
                lineHeight: 1.08,
                color: "#9ca3af",
                margin: "0 0 18px 0",
                textTransform: "uppercase",
              }}
            >
              VANBASS <br />
              {isVi ? "DÀN BÀN DJ CHO THUÊ" : "RENTAL FLEET"}
            </h1>

            {/* Subtitle Tối Ưu SEO Cho Google Tìm Kiếm & AI Overview - Cỡ chữ to rõ */}
            <p
              style={{
                fontSize: "15.5px",
                color: "#a1a1aa",
                lineHeight: 1.65,
                marginBottom: "28px",
                maxWidth: "640px",
              }}
            >
              {isVi
                ? "Dịch vụ cho thuê bàn DJ Đà Nẵng & toàn quốc uy tín giá rẻ từ 400k/ngày: Pioneer DJ XDJ-RX3, DDJ-FLX4, XDJ-XZ, CDJ-3000. Máy mới 99%, giao và setup tận nơi 24/7."
                : "Professional DJ gear rental in Da Nang & nationwide from 400k/day: Pioneer DJ XDJ-RX3, DDJ-FLX4, XDJ-XZ, CDJ-3000. 99% new equipment, 24/7 on-site delivery & setup."}
            </p>

            {/* Technical Specifications (Điền nội dung kỹ thuật chuẩn SEO - Tăng cỡ chữ dễ đọc) */}
            <div style={{ marginBottom: "26px", maxWidth: "640px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#f4f4f5",
                  marginBottom: "12px",
                  letterSpacing: "0.01em",
                }}
              >
                {isVi ? "Thông Số Kỹ Thuật" : "Technical Specifications"}
              </span>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "14.5px",
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                }}
              >
                {isVi ? (
                  <>
                    <li>• Màn hình cảm ứng 10.1 inch High-Res hiển thị sóng âm 3Band Waveform</li>
                    <li>• Mâm xoay Jogwheel Full-size có màn hình On-Jog LCD màu hiển thị Cue</li>
                    <li>• Bộ xử lý âm thanh 64-bit chuẩn Club Standard quốc tế (1500Hz)</li>
                    <li>• 16 Phím Performance Pads & Release FX chuyển bài chuyên nghiệp</li>
                    <li>• Cắm Dual USB Plug & Play chơi độc lập trực tiếp không cần laptop</li>
                  </>
                ) : (
                  <>
                    <li>• 10.1-inch High-Res Touchscreen displaying 3-Band Waveform</li>
                    <li>• Full-size Jogwheels with color On-Jog LCD Cue display</li>
                    <li>• 64-bit audio processor meeting international Club Standard (1500Hz)</li>
                    <li>• 16 Performance Pads & Release FX for professional transitions</li>
                    <li>• Dual USB Plug & Play standalone mixing without laptop</li>
                  </>
                )}
              </ul>
              {/* Divider line under specs as in mockup */}
              <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.12)", marginTop: "18px" }} />
            </div>

            {/* Rental Rates (Bảng giá tóm tắt - Tăng cỡ chữ to rõ) */}
            <div style={{ marginBottom: "28px", maxWidth: "640px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#f4f4f5",
                  marginBottom: "12px",
                  letterSpacing: "0.01em",
                }}
              >
                {isVi ? "Bảng Giá Cho Thuê" : "Rental Rates"}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", color: "#e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "540px" }}>
                  <span>• Pioneer DDJ-FLX4 ({isVi ? "Controller 2 Kênh" : "Controller 2-Channel"})</span>
                  <strong style={{ color: "#ffffff" }}>400.000đ / {isVi ? "ngày" : "day"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "540px" }}>
                  <span>• Pioneer DJ XDJ-RX3 ({isVi ? "All-In-One 2 Kênh" : "All-In-One 2-Channel"})</span>
                  <strong style={{ color: "#ffffff" }}>1.200.000đ / {isVi ? "ngày" : "day"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "540px" }}>
                  <span>• Pioneer DJ XDJ-XZ ({isVi ? "All-In-One 4 Kênh" : "All-In-One 4-Channel"})</span>
                  <strong style={{ color: "#ffffff" }}>1.800.000đ / {isVi ? "ngày" : "day"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "540px" }}>
                  <span>• Set 2x CDJ-3000 + Mixer DJM-A9</span>
                  <strong style={{ color: "#22c55e" }}>{isVi ? "Báo giá Show" : "Show Quote"}</strong>
                </div>
              </div>
            </div>

            {/* Quick CTA Actions */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
                style={{
                  padding: "12px 24px",
                  borderRadius: "6px",
                  fontWeight: 800,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {isVi ? "Tư Vấn Messenger" : "Messenger Chat"}
              </a>
              <a
                href={`tel:${hotline}`}
                className="button button-secondary"
                style={{
                  padding: "12px 20px",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "13px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                }}
              >
                Hotline: {hotline}
              </a>
            </div>
          </div>

          {/* Right Column: Bàn DJ phóng to và nhích qua phải cố tình làm hiệu ứng cắt ảnh (bleed off edge) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              minHeight: "460px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              overflow: "visible",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/rental/rental_fleet_hardware_transparent.png"
              alt="VanBass Rental Fleet Pioneer DJ XDJ-RX3 Hardware"
              style={{
                width: "185%",
                maxWidth: "none",
                height: "auto",
                objectFit: "contain",
                transform: "translateX(42%) translateY(2%)",
                filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.95))",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* =====================================================================
            3 PRICING CARDS: GÓI THEO NGÀY / GÓI CUỐI TUẦN / GÓI SỰ KIỆN
            (TIẾNG VIỆT CHUẨN XÁC, TỰ ĐỘNG CHUYỂN ANH-VIỆT THEO LANGUAGE SWITCHER)
           ===================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* CARD 1: GÓI THEO NGÀY (THẺ TRẮNG NHƯ MOCKUP) */}
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#111114",
              borderRadius: "8px",
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #e4e4e7",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              position: "relative",
            }}
          >
            {/* Badge */}
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  border: "1px solid #111114",
                  padding: "4px 12px",
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "inline-block",
                }}
              >
                {isVi ? "GÓI THEO NGÀY" : "DAILY"}
              </span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#71717a", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                {isVi ? "GIÁ CHỈ TỪ" : "FROM"}
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <strong style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>400.000đ</strong>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#71717a" }}>{isVi ? "/ NGÀY" : "/ DAY"}</span>
              </div>
            </div>

            <div style={{ width: "100%", height: "1px", backgroundColor: "#e4e4e7", marginBottom: "20px" }} />

            {/* What's included (Điền thông tin SEO tối ưu) */}
            <div style={{ flex: 1, marginBottom: "32px" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, display: "block", marginBottom: "14px" }}>
                {isVi ? "Dịch vụ bao gồm:" : "What's included:"}
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#3f3f46" }}>
                {isVi ? (
                  <>
                    <li>• Pioneer DDJ-FLX4 / DDJ-FLX6 Controller</li>
                    <li>• Layout chuẩn Club Standard & Smart Fader</li>
                    <li>• 16 Phím Performance Pads & Beat FX</li>
                    <li>• Kết nối USB Plug & Play (dùng máy tính)</li>
                    <li>• Đầy đủ túi chống sốc & cáp tín hiệu</li>
                  </>
                ) : (
                  <>
                    <li>• Pioneer DDJ-FLX4 / DDJ-FLX6 Controller</li>
                    <li>• Club-standard layout & Smart Fader</li>
                    <li>• 16 Performance Pads & Beat FX</li>
                    <li>• Plug and play USB (laptop connection)</li>
                    <li>• Protective carry bag & full signal cables</li>
                  </>
                )}
              </ul>
            </div>

            {/* Solid Button */}
            <a
              href={`https://m.me/vanbassmusiccenter?text=${encodeURIComponent(isVi ? "Tôi muốn thuê bàn DJ gói THEO NGÀY 400k" : "I want to rent DAILY DJ pack 400k")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 20px",
                backgroundColor: "#111114",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              {isVi ? "THUÊ NGAY" : "RENT NOW"}
            </a>
          </div>

          {/* CARD 2: GÓI CUỐI TUẦN (THẺ TRẮNG NHƯ MOCKUP) */}
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#111114",
              borderRadius: "8px",
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #e4e4e7",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              position: "relative",
            }}
          >
            {/* Badge */}
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  border: "1px solid #111114",
                  padding: "4px 12px",
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "inline-block",
                }}
              >
                {isVi ? "GÓI CUỐI TUẦN" : "WEEKEND"}
              </span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#71717a", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                {isVi ? "GIÁ CHỈ TỪ" : "FROM"}
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <strong style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>1.200.000đ</strong>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#71717a" }}>{isVi ? "/ CUỐI TUẦN" : "/ WEEKEND"}</span>
              </div>
            </div>

            <div style={{ width: "100%", height: "1px", backgroundColor: "#e4e4e7", marginBottom: "20px" }} />

            {/* What's included (Điền thông tin SEO tối ưu) */}
            <div style={{ flex: 1, marginBottom: "32px" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, display: "block", marginBottom: "14px" }}>
                {isVi ? "Dịch vụ bao gồm:" : "What's included:"}
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#3f3f46" }}>
                {isVi ? (
                  <>
                    <li>• Pioneer DJ XDJ-RX3 hoặc XDJ-XZ Flagship</li>
                    <li>• Màn hình cảm ứng 10.1-inch High-Res mượt mà</li>
                    <li>• Layout Club Standard chuẩn sân khấu biểu diễn</li>
                    <li>• Mâm xoay Full-size có màn On-Jog LCD màu</li>
                    <li>• Cắm USB chơi độc lập không cần máy tính</li>
                    <li>• Kỹ thuật viên hỗ trợ giao & setup tận nơi</li>
                  </>
                ) : (
                  <>
                    <li>• Pioneer DJ XDJ-RX3 or XDJ-XZ Flagship</li>
                    <li>• 10.1-inch High-Res smooth Touchscreen</li>
                    <li>• Club-standard stage performance layout</li>
                    <li>• Full-size Jogwheels with color On-Jog LCD</li>
                    <li>• Standalone USB mixing without laptop</li>
                    <li>• Technician on-site delivery & setup support</li>
                  </>
                )}
              </ul>
            </div>

            {/* Solid Button */}
            <a
              href={`https://m.me/vanbassmusiccenter?text=${encodeURIComponent(isVi ? "Tôi muốn thuê bàn DJ gói CUỐI TUẦN RX3 XZ" : "I want to rent WEEKEND DJ pack RX3 XZ")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 20px",
                backgroundColor: "#111114",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              {isVi ? "THUÊ NGAY" : "RENT NOW"}
            </a>
          </div>

          {/* CARD 3: GÓI SỰ KIỆN (THẺ ĐEN TƯƠNG PHẢN NHƯ MOCKUP) */}
          <div
            style={{
              backgroundColor: "#111114",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              position: "relative",
            }}
          >
            {/* Badge */}
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "4px 12px",
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  display: "inline-block",
                }}
              >
                {isVi ? "GÓI SỰ KIỆN" : "EVENT"}
              </span>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <strong
                style={{
                  display: "block",
                  fontSize: "26px",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  textTransform: "uppercase",
                }}
              >
                {isVi ? (
                  <>
                    LIÊN HỆ <br />
                    BÁO GIÁ
                  </>
                ) : (
                  <>
                    CONTACT <br />
                    FOR QUOTE
                  </>
                )}
              </strong>
            </div>

            <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.12)", marginBottom: "20px" }} />

            {/* What's included (Điền thông tin SEO tối ưu) */}
            <div style={{ flex: 1, marginBottom: "32px" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, display: "block", marginBottom: "14px", color: "#e4e4e7" }}>
                {isVi ? "Dịch vụ bao gồm:" : "What's included:"}
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#a1a1aa" }}>
                {isVi ? (
                  <>
                    <li>• Dàn 2x Pioneer CDJ-3000 + Mixer DJM-A9</li>
                    <li>• Hệ thống loa Line Array Nexo / Loa PA sự kiện</li>
                    <li>• 02 Micro không dây Sennheiser chuyên nghiệp</li>
                    <li>• Thiết bị dự phòng 1:1 an toàn tại hiện trường</li>
                    <li>• Kỹ sư âm thanh trực tiếp soundcheck & túc trực 24/7</li>
                  </>
                ) : (
                  <>
                    <li>• 2x Pioneer CDJ-3000 + DJM-A9 Mixer setup</li>
                    <li>• Nexo Line Array / PA Event Sound System</li>
                    <li>• 02 Professional Sennheiser Wireless Microphones</li>
                    <li>• 1:1 on-site backup hardware safety redundancy</li>
                    <li>• Audio sound engineer live soundcheck & 24/7 standby</li>
                  </>
                )}
              </ul>
            </div>

            {/* Solid White Button */}
            <a
              href={`https://m.me/vanbassmusiccenter?text=${encodeURIComponent(isVi ? "Tôi cần báo giá Gói SỰ KIỆN CDJ-3000" : "I need a quote for EVENT CDJ-3000")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 20px",
                backgroundColor: "#ffffff",
                color: "#111114",
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              {isVi ? "NHẬN BÁO GIÁ" : "GET A QUOTE"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
