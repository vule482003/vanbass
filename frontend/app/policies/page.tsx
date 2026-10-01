"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../lib/language-context";

const POLICY_SECTIONS = [
  { id: "overview", labelVi: "1. Tổng quan & Cam kết", labelEn: "1. Overview & Commitment" },
  { id: "warranty", labelVi: "2. Bảo hành sản phẩm", labelEn: "2. Product Warranty" },
  { id: "returns", labelVi: "3. Đổi trả & Hoàn tiền", labelEn: "3. Returns & Refunds" },
  { id: "rental", labelVi: "4. Thuê & Đặt cọc", labelEn: "4. Rental & Deposit Terms" },
  { id: "privacy", labelVi: "5. Bảo mật thông tin", labelEn: "5. Privacy Policy" },
  { id: "terms", labelVi: "6. Điều khoản sử dụng", labelEn: "6. Terms of Service" },
];

export default function PoliciesPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "var(--font-primary)",
      }}
    >
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ maxWidth: "780px", marginBottom: "50px" }}>
            <span
              style={{
                color: "#e6dec9",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              VANBASS POLICIES & TERMS
            </span>

            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
                color: "#ffffff",
              }}
            >
              {lang === "en" ? "Policies & Terms of Service" : "Chính sách & Quy định VanBass"}
            </h1>

            <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: 1.75, margin: 0 }}>
              {lang === "en"
                ? "Our commitment to genuine hardware quality, transparent equipment rental terms, and absolute consumer rights protection."
                : "Cam kết về chất lượng thiết bị chính hãng, chính sách bảo hành minh bạch và bảo vệ tối đa quyền lợi khách hàng khi giao dịch tại VanBass Music Center."}
            </p>
          </div>

          {/* Two Column Layout: Sidebar + Content */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "48px",
              alignItems: "flex-start",
            }}
            className="policies-grid"
          >
            {/* LEFT STICKY SIDEBAR (MỤC LỤC) */}
            <aside
              style={{
                position: "sticky",
                top: "100px",
                backgroundColor: "#111114",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                padding: "24px 20px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#e6dec9",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                {lang === "en" ? "Table of Contents" : "Mục lục chính sách"}
              </div>

              <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {POLICY_SECTIONS.map((sec) => {
                  const isActive = activeTab === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        textAlign: "left",
                        fontSize: "13.5px",
                        fontWeight: isActive ? 600 : 400,
                        backgroundColor: isActive ? "rgba(230, 222, 201, 0.12)" : "transparent",
                        color: isActive ? "#e6dec9" : "#a1a1aa",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        fontFamily: "var(--font-primary)",
                      }}
                    >
                      {lang === "en" ? sec.labelEn : sec.labelVi}
                    </button>
                  );
                })}
              </nav>

              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <p style={{ color: "#71717a", fontSize: "12.5px", lineHeight: 1.5, margin: "0 0 10px 0" }}>
                  {lang === "en" ? "Need policy advice?" : "Cần hỗ trợ về chính sách?"}
                </p>
                <a
                  href="tel:0706067799"
                  style={{
                    color: "#e6dec9",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Hotline: 0706.067.799
                </a>
              </div>
            </aside>

            {/* RIGHT CONTENT AREA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {/* SECTION 1: TỔNG QUAN */}
              <section
                id="overview"
                style={{
                  backgroundColor: "#111114",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 32px",
                }}
              >
                <span
                  style={{
                    color: "#e6dec9",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  PHẦN 01
                </span>
                <h2
                  style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                  }}
                >
                  {lang === "en" ? "Overview & Core Commitments" : "Tổng Quan & Cam Kết Chất Lượng"}
                </h2>
                <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: 1.8, marginBottom: "20px" }}>
                  {lang === "en"
                    ? "VanBass Music Center operates as an official authorized distributor and rental service for high-performance DJ and sound equipment in Central Vietnam. All products and services adhere to strict industry benchmarks."
                    : "VanBass Music Center hoạt động với tư cách là đơn vị phân phối và cho thuê thiết bị âm thanh, DJ chính hãng hàng đầu tại Đà Nẵng & miền Trung. Mọi sản phẩm cung cấp ra thị trường đều tuân thủ các quy chuẩn nghiêm ngặt."}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#d4d4d8",
                    fontSize: "14.5px",
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>100% thiết bị có nguồn gốc xuất xứ rõ ràng từ Pioneer DJ, AlphaTheta, Allen & Heath, Yamaha.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>Cung cấp hóa đơn chứng từ, tem niêm phong và bảo hành điện tử chính hãng.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>Đội ngũ kỹ thuật viên được đào tạo chuyên sâu về âm học và thiết bị biểu diễn.</span>
                  </div>
                </div>
              </section>

              {/* SECTION 2: BẢO HÀNH SẢN PHẨM */}
              <section
                id="warranty"
                style={{
                  backgroundColor: "#111114",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 32px",
                }}
              >
                <span
                  style={{
                    color: "#e6dec9",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  PHẦN 02
                </span>
                <h2
                  style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                  }}
                >
                  {lang === "en" ? "Official Product Warranty Policy" : "Chính Sách Bảo Hành Sản Phẩm"}
                </h2>
                <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: 1.8, marginBottom: "20px" }}>
                  {lang === "en"
                    ? "All new DJ controllers, mixers, monitors, and stage accessories purchased at VanBass come with a minimum 12-month manufacturer warranty."
                    : "Mọi sản phẩm bàn DJ Controller, All-in-One Standalone, Mixer, Loa kiểm âm và Phụ kiện âm thanh mua mới tại VanBass đều được bảo hành tiêu chuẩn từ 12 đến 24 tháng."}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#d4d4d8",
                    fontSize: "14.5px",
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>
                      <strong>Phạm vi bảo hành:</strong> Miễn phí linh kiện và công sửa chữa cho các lỗi phần cứng từ nhà sản xuất (hỏng fader, lỗi cảm biến jogwheel, lỗi cổng DAC USB, nguồn...).
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>
                      <strong>Thời gian xử lý:</strong> Tiếp nhận và chuẩn đoán lỗi trong 24 giờ. Xử lý hoàn tất trong 2 - 3 ngày làm việc.
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>
                      <strong>Hỗ trợ thiết bị thay thế:</strong> Đối với DJ biểu diễn chuyên nghiệp, VanBass hỗ trợ mượn máy tương đương trong thời gian thẩm định bảo hành.
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>
                      <strong>Từ chối bảo hành:</strong> Các trường hợp vô nước, chập điện do nguồn điện không ổn định, rơi vỡ, nứt mâm hoặc tự ý can thiệp phần cứng ngoài trung tâm.
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 3: ĐỔI TRẢ & HOÀN TIỀN */}
              <section
                id="returns"
                style={{
                  backgroundColor: "#111114",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 32px",
                }}
              >
                <span
                  style={{
                    color: "#e6dec9",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  PHẦN 03
                </span>
                <h2
                  style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                  }}
                >
                  {lang === "en" ? "Returns & 1-to-1 Replacement Policy" : "Chính Sách Đổi Trả & Hoàn Tiền (7 Ngày)"}
                </h2>
                <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: 1.8, marginBottom: "20px" }}>
                  {lang === "en"
                    ? "We offer a 1-to-1 replacement within the first 7 days if the product develops any manufacturer hardware defect."
                    : "Khách hàng được áp dụng chính sách 1 đổi 1 ngay lập tức trong vòng 7 ngày đầu tiên nếu máy phát sinh lỗi kỹ thuật do nhà sản xuất."}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#d4d4d8",
                    fontSize: "14.5px",
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>Thiết bị đổi trả phải còn nguyên tem bảo hành, không trầy xước ngoại quan.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>Đầy đủ vỏ hộp nguyên vẹn, xốp bảo vệ, sách hướng dẫn, túi chống sốc và dây cáp kèm theo.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>Hoàn tiền 100% qua chuyển khoản ngân hàng trong vòng 24 giờ nếu sản phẩm cùng loại tạm thời hết hàng.</span>
                  </div>
                </div>
              </section>

              {/* SECTION 4: THUÊ & ĐẶT CỌC */}
              <section
                id="rental"
                style={{
                  backgroundColor: "#111114",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 32px",
                }}
              >
                <span
                  style={{
                    color: "#e6dec9",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  PHẦN 04
                </span>
                <h2
                  style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                  }}
                >
                  {lang === "en" ? "Rental & Deposit Regulations" : "Quy Định Thuê & Đặt Cọc Thiết Bị"}
                </h2>
                <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: 1.8, marginBottom: "20px" }}>
                  {lang === "en"
                    ? "Equipment rental terms are designed for transparency, seamless gig performance, and fair collateral protection."
                    : "Quy định thuê thiết bị sự kiện tại VanBass nhằm đảm bảo tiến độ biểu diễn mượt mà, hỗ trợ kỹ thuật tối đa và hoàn trả cọc minh bạch."}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#d4d4d8",
                    fontSize: "14.5px",
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>
                      <strong>Thời gian thuê 1 ngày:</strong> Tính tròn 24 giờ kể từ thời điểm kỹ thuật viên bàn giao máy tại địa điểm sự kiện.
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>
                      <strong>Biên bản bàn giao:</strong> Hai bên cùng kiểm tra test chức năng fader, jogwheel, màn hình, cổng xuất âm thanh trước khi ký biên bản.
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>
                      <strong>Hoàn trả tiền cọc:</strong> VanBass chuyển khoản hoàn trả 100% tiền cọc ngay khi nhận lại thiết bị đầy đủ và nguyên vẹn.
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 5: BẢO MẬT THÔNG TIN */}
              <section
                id="privacy"
                style={{
                  backgroundColor: "#111114",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 32px",
                }}
              >
                <span
                  style={{
                    color: "#e6dec9",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  PHẦN 05
                </span>
                <h2
                  style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                  }}
                >
                  {lang === "en" ? "Customer Privacy & Data Protection" : "Chính Sách Bảo Mật Thông Tin Khách Hàng"}
                </h2>
                <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: 1.8, marginBottom: "20px" }}>
                  {lang === "en"
                    ? "We strictly protect your personal information, phone numbers, delivery addresses, and transaction histories."
                    : "VanBass cam kết bảo mật tuyệt đối thông tin cá nhân, số điện thoại, địa chỉ nhận hàng và lịch sử giao dịch của khách hàng."}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#d4d4d8",
                    fontSize: "14.5px",
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>Thông tin chỉ được sử dụng cho việc xác nhận đơn hàng, giao hàng và kích hoạt bảo hành điện tử.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>Tuyệt đối không chia sẻ, trao đổi hay bán dữ liệu khách hàng cho bất kỳ bên thứ ba nào.</span>
                  </div>
                </div>
              </section>

              {/* SECTION 6: ĐIỀU KHOẢN SỬ DỤNG */}
              <section
                id="terms"
                style={{
                  backgroundColor: "#111114",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 32px",
                }}
              >
                <span
                  style={{
                    color: "#e6dec9",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  PHẦN 06
                </span>
                <h2
                  style={{
                    fontSize: "21px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                  }}
                >
                  {lang === "en" ? "Terms of Service" : "Điều Khoản Sử Dụng Website & Dịch Vụ"}
                </h2>
                <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: 1.8, marginBottom: "20px" }}>
                  {lang === "en"
                    ? "By accessing the VanBass website or placing orders/rentals, you agree to comply with our commercial terms and operational guidelines."
                    : "Khi truy cập website VanBass hoặc thực hiện đặt mua/thuê thiết bị, quý khách đồng ý tuân thủ các điều khoản hoạt động và quy định thương mại điện tử hiện hành."}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    color: "#d4d4d8",
                    fontSize: "14.5px",
                    lineHeight: 1.7,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>Giá niêm yết trên website là giá chính xác tại thời điểm tra cứu và đã bao gồm thuế tiêu chuẩn.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#e6dec9" }}>•</span>
                    <span>VanBass bảo lưu quyền điều chỉnh thông số hoặc cập nhật bảng giá thuê thiết bị theo từng mùa cao điểm sự kiện.</span>
                  </div>
                </div>
              </section>

              {/* Bottom Navigation Link */}
              <div style={{ paddingTop: "10px" }}>
                <Link
                  href="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#f4f4f5",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  <span>← {lang === "en" ? "Back to Home" : "Quay lại trang chủ"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @media (max-width: 860px) {
          .policies-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          aside {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
