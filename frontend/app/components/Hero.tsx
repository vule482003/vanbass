"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-3cards-section" id="hero">
      {/* Dynamic Soundwaves / Ambient Energy lines (Above the 3 cards - according to sketch) */}
      <svg
        className="hero-soundwave-svg hero-soundwave-top"
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 30 Q 150 5 250 30 T 450 30 T 650 30 T 850 30 T 1050 30 T 1150 30"
          stroke="rgba(34, 197, 94, 0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 100 25 Q 220 50 340 25 T 580 25 T 820 25 T 1060 25"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.2"
        />
        <path
          d="M 200 35 Q 280 15 360 35 T 520 35 T 680 35 T 840 35 T 1000 35"
          stroke="rgba(34, 197, 94, 0.2)"
          strokeWidth="2"
        />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 10, width: "min(1240px, calc(100% - 40px))" }}>
        {/* Top Centered Header Intro */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 4px auto" }}>
          <div className="hero-header-badge">
            <span />
            VANBASS MUSIC CENTER • ĐÀ NẴNG
          </div>
          <h1
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: "0 0 6px 0",
              textTransform: "uppercase",
            }}
          >
            HỆ THỐNG ÂM THANH &amp; THIẾT BỊ DJ CHUYÊN NGHIỆP
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              margin: "0 auto",
              maxWidth: "580px",
            }}
          >
            Phân phối chính hãng Pioneer DJ, AlphaTheta, Allen &amp; Heath và giải pháp biểu diễn âm thanh sự kiện hàng đầu miền Trung.
          </p>
        </div>

        {/* 3 TILTED CARDS: THIẾT BỊ • DJ • TRẢI NGHIỆM (CHUẨN BẢN VẼ TAY) */}
        <div className="hero-3cards-grid">
          {/* KHUNG 1: THIẾT BỊ */}
          <Link href="/products" className="tilted-card">
            <div className="tilted-card-inner">
              <div>
                <div className="tilted-card-tag">01 / HARDWARE &amp; AUDIO</div>
                <h2 className="tilted-card-title">THIẾT BỊ</h2>
                <p className="tilted-card-desc">
                  Phân phối chính hãng bàn DJ, Mixer, CDJ, Loa kiểm âm và bộ xử lý tín hiệu âm thanh cao cấp.
                </p>
              </div>

              {/* Graphic Visual 1: Pro Controller Deck with Dual Jog Wheels */}
              <div className="tilted-card-visual">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "88%",
                    height: "85%",
                    background: "#0d0f0d",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    padding: "8px 12px",
                  }}
                >
                  {/* Left Jog Wheel */}
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #1a241b 0%, #080a08 100%)",
                      border: "2px solid #22c55e",
                      boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "#000",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    />
                  </div>

                  {/* Center Mixer Strip & VU Meters */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "3px" }}>
                      <div style={{ width: "3px", height: "24px", background: "#22c55e", borderRadius: "1px" }} />
                      <div style={{ width: "3px", height: "28px", background: "#4ade80", borderRadius: "1px" }} />
                      <div style={{ width: "3px", height: "20px", background: "#22c55e", borderRadius: "1px" }} />
                    </div>
                    <div
                      style={{
                        width: "28px",
                        height: "4px",
                        background: "#27272a",
                        borderRadius: "2px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "40%",
                          top: "-3px",
                          width: "6px",
                          height: "10px",
                          background: "#fff",
                          borderRadius: "1px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Jog Wheel */}
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #1a241b 0%, #080a08 100%)",
                      border: "2px solid #22c55e",
                      boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "#000",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="tilted-card-btn">
                <span>Khám phá thiết bị</span>
                <span style={{ fontSize: "16px" }}>→</span>
              </div>
            </div>
          </Link>

          {/* KHUNG 2: DJ (TRỌNG TÂM - FEATURED CARD) */}
          <Link href="/products?category=dj" className="tilted-card card-featured">
            <div className="tilted-card-inner">
              <div>
                <div className="tilted-card-tag">02 / NIGHTLIFE &amp; CLUB</div>
                <h2 className="tilted-card-title">DJ</h2>
                <p className="tilted-card-desc">
                  Thiết bị biểu diễn đỉnh cao, All-in-One Standalone, Battle Scratch &amp; CDJ Flagship thế hệ mới.
                </p>
              </div>

              {/* Graphic Visual 2: Flagship Club CDJ Waveform Display */}
              <div className="tilted-card-visual">
                <div
                  style={{
                    width: "88%",
                    height: "85%",
                    background: "#090d0a",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    borderRadius: "6px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Waveform graphic */}
                  <div
                    style={{
                      height: "36px",
                      background: "#050705",
                      borderRadius: "4px",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "2px",
                      padding: "0 6px",
                    }}
                  >
                    {[12, 22, 16, 28, 32, 24, 18, 30, 34, 26, 14, 28, 32, 20, 15, 29, 35, 22, 16, 24, 18].map(
                      (h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h}px`,
                            background: i % 2 === 0 ? "#22c55e" : "#4ade80",
                            borderRadius: "1px",
                          }}
                        />
                      )
                    )}
                  </div>

                  {/* Hot Cue Pads Matrix */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
                    {["#22c55e", "#fbbf24", "#38bdf8", "#ec4899"].map((col, idx) => (
                      <div
                        key={idx}
                        style={{
                          height: "14px",
                          background: col,
                          borderRadius: "2px",
                          boxShadow: `0 0 6px ${col}66`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="tilted-card-btn">
                <span>Dòng sản phẩm DJ</span>
                <span style={{ fontSize: "16px" }}>→</span>
              </div>
            </div>
          </Link>

          {/* KHUNG 3: TRẢI NGHIỆM */}
          <Link href="/contact" className="tilted-card">
            <div className="tilted-card-inner">
              <div>
                <div className="tilted-card-tag">03 / SHOWROOM &amp; STUDIO</div>
                <h2 className="tilted-card-title">TRẢI NGHIỆM</h2>
                <p className="tilted-card-desc">
                  Trải nghiệm nghe thử âm thanh trực tiếp tại Showroom Đà Nẵng, tư vấn setup sân khấu &amp; hỗ trợ kỹ thuật 24/7.
                </p>
              </div>

              {/* Graphic Visual 3: Studio Headphone & Acoustic Spectrum Dial */}
              <div className="tilted-card-visual">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "18px",
                    width: "88%",
                    height: "85%",
                    background: "#0d0f0d",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                  }}
                >
                  {/* Master Volume Dial */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #242424 0%, #111111 100%)",
                      border: "2px solid #a1a1aa",
                      display: "grid",
                      placeItems: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        width: "3px",
                        height: "10px",
                        background: "#22c55e",
                        borderRadius: "1px",
                      }}
                    />
                  </div>

                  {/* Soundwave Frequency Rings */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "10px", color: "#a1a1aa", fontWeight: 700 }}>SHOWROOM</span>
                      <span style={{ fontSize: "10px", color: "#22c55e", fontWeight: 800 }}>LIVE DEMO</span>
                    </div>
                    <div style={{ display: "flex", gap: "3px" }}>
                      {[8, 14, 20, 26, 18, 12, 22, 16].map((val, i) => (
                        <div
                          key={i}
                          style={{
                            width: "4px",
                            height: `${val}px`,
                            background: "#22c55e",
                            borderRadius: "1px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="tilted-card-btn">
                <span>Ghé thăm Showroom</span>
                <span style={{ fontSize: "16px" }}>→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Trust Indicators Bar */}
        <div className="hero-bottom-trust-bar">
          <div className="trust-item">
            <span className="icon">✓</span>
            <span>100% Phân Phối Chính Hãng</span>
          </div>
          <div className="trust-item">
            <span className="icon">🛡️</span>
            <span>Bảo Hành Kỹ Thuật 12 - 24 Tháng</span>
          </div>
          <div className="trust-item">
            <span className="icon">📍</span>
            <span>Showroom Trải Nghiệm Tại Đà Nẵng</span>
          </div>
          <div className="trust-item">
            <span className="icon">⚡</span>
            <span>Tư Vấn &amp; Setup Sân Khấu 24/7</span>
          </div>
        </div>
      </div>

      {/* Dynamic Soundwaves (Bottom - according to sketch) */}
      <svg
        className="hero-soundwave-svg hero-soundwave-bottom"
        viewBox="0 0 1200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 30 Q 180 50 310 30 T 570 30 T 830 30 T 1090 30"
          stroke="rgba(34, 197, 94, 0.3)"
          strokeWidth="1.5"
        />
        <path
          d="M 120 35 Q 260 10 400 35 T 680 35 T 960 35"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />
      </svg>
    </section>
  );
}