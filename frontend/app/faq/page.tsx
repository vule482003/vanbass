"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../lib/language-context";

interface FaqItem {
  id: string;
  category: "all" | "products" | "order" | "warranty" | "services";
  questionVi: string;
  questionEn: string;
  answerVi: string;
  answerEn: string;
}

const FAQ_DATA: FaqItem[] = [
  // Products (Sản phẩm)
  {
    id: "p1",
    category: "products",
    questionVi: "Thiết bị DJ tại VanBass có phải hàng chính hãng 100% không?",
    questionEn: "Is all DJ equipment at VanBass 100% genuine?",
    answerVi:
      "Tất cả các sản phẩm thiết bị DJ (Pioneer DJ, AlphaTheta, Allen & Heath, JBL...) phân phối tại VanBass Music Center đều là hàng chính hãng 100%, có đầy đủ hóa đơn chứng từ, tem niêm phong và bảo hành chính thức 12 tháng từ nhà sản xuất.",
    answerEn:
      "All DJ and audio equipment distributed by VanBass Music Center is 100% authentic, complete with official invoices, warranty seals, and a 12-month manufacturer standard warranty.",
  },
  {
    id: "p2",
    category: "products",
    questionVi: "Tôi là người mới bắt đầu học DJ, nên chọn bàn DJ nào phù hợp?",
    questionEn: "I am a beginner DJ, which controller should I choose?",
    answerVi:
      "Với người mới, các mẫu như Pioneer DDJ-FLX4 hoặc DDJ-200 là lựa chọn lý tưởng nhờ khả năng kết nối linh hoạt với máy tính, điện thoại, hỗ trợ Rekordbox & Serato DJ, cùng mức chi phí dễ tiếp cận.",
    answerEn:
      "For beginners, controllers like the Pioneer DDJ-FLX4 or DDJ-200 are ideal choices due to their flexible connectivity with laptops/smartphones, support for Rekordbox & Serato DJ, and accessible price points.",
  },
  {
    id: "p3",
    category: "products",
    questionVi: "Bàn DJ mua tại VanBass có được tặng kèm phần mềm và cáp kết nối không?",
    questionEn: "Does DJ equipment purchased at VanBass include software licenses and cables?",
    answerVi:
      "Tất cả thiết bị đều đi kèm đầy đủ cáp nguồn, cáp USB chính hãng và quyền kích hoạt phần mềm Rekordbox / Serato DJ bản quyền theo tiêu chuẩn đóng gói của nhà sản xuất.",
    answerEn:
      "All units come complete with genuine power cables, USB connection cables, and hardware unlock licenses for Rekordbox / Serato DJ according to official factory standards.",
  },

  // Order & Payment (Đặt hàng & Thanh toán)
  {
    id: "o1",
    category: "order",
    questionVi: "VanBass hỗ trợ những phương thức thanh toán nào?",
    questionEn: "What payment methods are supported by VanBass?",
    answerVi:
      "Chúng tôi hỗ trợ đa dạng phương thức: Chuyển khoản ngân hàng tự động qua VietQR, thanh toán tiền mặt khi nhận hàng (COD), quẹt thẻ POS tại Showroom và chuyển khoản tài khoản công ty có xuất hóa đơn VAT điện tử.",
    answerEn:
      "We support automated VietQR bank transfers, Cash on Delivery (COD), in-store POS card swiping, and corporate wire transfers with electronic VAT invoices.",
  },
  {
    id: "o2",
    category: "order",
    questionVi: "Thời gian giao hàng tại Đà Nẵng và các tỉnh thành khác mất bao lâu?",
    questionEn: "How long does delivery take in Da Nang and other provinces?",
    answerVi:
      "Tại nội thành Đà Nẵng: Giao hỏa tốc trong 1 - 2 giờ. Đối với các tỉnh thành miền Trung (Huế, Hội An, Quảng Nam, Quảng Ngãi): Giao trong ngày qua nhà xe hoặc chuyển phát nhanh 24 - 48 giờ trên toàn quốc.",
    answerEn:
      "Within Da Nang city: Express delivery within 1 - 2 hours. For other Central provinces (Hue, Hoi An, Quang Nam, Quang Ngai): Same-day coach transport or 24 - 48 hours nationwide express shipping.",
  },
  {
    id: "o3",
    category: "order",
    questionVi: "Tôi có thể kiểm tra và thử máy trước khi thanh toán không?",
    questionEn: "Can I inspect and test the gear before making payment?",
    answerVi:
      "Có. Bạn hoàn toàn có quyền đồng kiểm kiện hàng, mở hộp kiểm tra ngoại quan máy và cắm nguồn test thử các tính năng cơ bản trước khi thanh toán cho nhân viên giao hàng.",
    answerEn:
      "Yes. You are fully entitled to co-inspect the parcel, check physical condition, and power-test basic hardware features before paying the courier.",
  },

  // Warranty & Return (Bảo hành & Đổi trả)
  {
    id: "w1",
    category: "warranty",
    questionVi: "Chính sách đổi trả sản phẩm mới tại VanBass được áp dụng như thế nào?",
    questionEn: "What is the return and replacement policy for new products?",
    answerVi:
      "VanBass áp dụng chính sách 1 đổi 1 trong vòng 7 ngày đầu tiên nếu máy phát sinh lỗi phần cứng từ nhà sản xuất. Sản phẩm đổi trả cần giữ nguyên tem niêm phong, đầy đủ hộp xốp và phụ kiện kèm theo.",
    answerEn:
      "We offer a 1-to-1 immediate replacement within the first 7 days if the hardware exhibits manufacturer defects. Returned items must retain original warranty seals, full box packing, and all bundled accessories.",
  },
  {
    id: "w2",
    category: "warranty",
    questionVi: "Thời gian tiếp nhận và xử lý bảo hành thường mất bao lâu?",
    questionEn: "How long does warranty processing typically take?",
    answerVi:
      "Các lỗi cơ bản được đội ngũ kỹ thuật viên VanBass kiểm tra xử lý trong 24 - 48 giờ làm việc. Đối với các lỗi bo mạch phức tạp cần linh kiện hãng, thời gian dự kiến từ 3 - 5 ngày làm việc.",
    answerEn:
      "Standard issues are inspected and handled by our technical team within 24 - 48 working hours. For intricate motherboard faults requiring factory components, turnaround is estimated at 3 - 5 business days.",
  },

  // Services (Dịch vụ)
  {
    id: "s1",
    category: "services",
    questionVi: "Quy trình đặt thuê thiết bị DJ cho sự kiện tại Đà Nẵng diễn ra như thế nào?",
    questionEn: "How does the DJ rental booking process work in Da Nang?",
    answerVi:
      "Quy trình gồm 4 bước đơn giản: (1) Chọn thiết bị và thời gian thuê trên website; (2) Kỹ thuật viên VanBass xác nhận lịch và hỗ trợ giao máy; (3) Ký hợp đồng bàn giao kèm kiểm tra tình trạng máy; (4) Hoàn trả máy và nhận lại 100% tiền cọc.",
    answerEn:
      "The rental process consists of 4 simple steps: (1) Select equipment and dates online; (2) VanBass technician confirms schedule and delivery; (3) Sign handover contract after joint testing; (4) Return equipment and receive 100% deposit back.",
  },
  {
    id: "s2",
    category: "services",
    questionVi: "VanBass có cung cấp kỹ thuật viên túc trực âm thanh cho sự kiện không?",
    questionEn: "Does VanBass provide on-site sound engineers for events?",
    answerVi:
      "Có. Chúng tôi cung cấp dịch vụ kỹ thuật viên chuyên nghiệp hỗ trợ vận chuyển, lắp đặt, sound check và túc trực kỹ thuật trong suốt thời gian diễn ra sự kiện, tiệc cưới hay biểu diễn ngoài trời.",
    answerEn:
      "Yes. We offer professional audio technicians who handle transport, setup, live sound checks, and on-site standby support throughout your entire event or concert.",
  },
  {
    id: "s3",
    category: "services",
    questionVi: "VanBass có nhận sửa chữa bàn DJ lấy liền và bảo dưỡng không?",
    questionEn: "Does VanBass provide same-day DJ repair and maintenance services?",
    answerVi:
      "Có. Trung tâm kỹ thuật VanBass chuyên thay fader, sửa mâm xoay jogwheel, khắc phục chập nguồn, sửa jack cắm và vệ sinh chuyên sâu lấy liền trong ngày với linh kiện chính hãng bảo hành 6 - 12 tháng.",
    answerEn:
      "Yes. Our technical center specializes in fader replacements, jogwheel repairs, power supply fixes, I/O jack servicing, and deep ultrasonic cleaning with genuine parts backed by 6 - 12 month warranties.",
  },
];

const CATEGORIES = [
  { key: "all", labelVi: "Tất cả", labelEn: "All" },
  { key: "products", labelVi: "Sản phẩm", labelEn: "Products" },
  { key: "order", labelVi: "Đặt hàng & Thanh toán", labelEn: "Orders & Payment" },
  { key: "warranty", labelVi: "Bảo hành & Đổi trả", labelEn: "Warranty & Returns" },
  { key: "services", labelVi: "Dịch vụ", labelEn: "Services" },
] as const;

export default function FAQPage() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ p1: true, s1: true });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const question = (lang === "en" ? item.questionEn : item.questionVi).toLowerCase();
      const answer = (lang === "en" ? item.answerEn : item.answerVi).toLowerCase();
      return question.includes(q) || answer.includes(q);
    });
  }, [activeCategory, searchQuery, lang]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#08090c",
        color: "#f4f4f5",
        fontFamily: "var(--font-primary)",
      }}
    >
      <Header />

      <main style={{ flex: 1, paddingTop: "130px", paddingBottom: "100px" }}>
        <div className="container" style={{ maxWidth: "880px", margin: "0 auto" }}>
          {/* =========================================================================
              HERO: Câu hỏi thường gặp
             ========================================================================= */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span
              style={{
                color: "#22c55e",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              VANBASS HELP CENTER
            </span>

            <h1
              style={{
                fontSize: "clamp(30px, 4.5vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
                color: "#ffffff",
              }}
            >
              {lang === "en" ? (
                <>
                  Frequently Asked <span style={{ color: "#22c55e" }}>Questions</span>
                </>
              ) : (
                <>
                  Câu hỏi <span style={{ color: "#22c55e" }}>thường gặp</span>
                </>
              )}
            </h1>

            <p
              style={{
                color: "#a1a1aa",
                fontSize: "15px",
                lineHeight: 1.7,
                maxWidth: "640px",
                margin: "0 auto 32px auto",
              }}
            >
              {lang === "en"
                ? "Find quick and comprehensive answers regarding product purchases, warranty, and DJ equipment rental services."
                : "Tổng hợp giải đáp chi tiết về mua sắm thiết bị, chính sách bảo hành chính hãng và dịch vụ cho thuê thiết bị DJ tại VanBass."}
            </p>

            {/* Search Input */}
            <div style={{ position: "relative", maxWidth: "560px", margin: "0 auto 28px auto" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "en"
                    ? "Search questions by keyword..."
                    : "Tìm câu hỏi theo từ khóa (fader, bảo hành, thuê máy...)"
                }
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontSize: "14.5px",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#71717a",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "4px 8px",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontSize: "13.5px",
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? "#22c55e" : "rgba(255, 255, 255, 0.04)",
                      color: isActive ? "#000000" : "#a1a1aa",
                      border: isActive ? "1px solid #22c55e" : "1px solid rgba(255, 255, 255, 0.08)",
                      cursor: "pointer",
                      boxShadow: isActive ? "0 2px 10px rgba(34, 197, 94, 0.3)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {lang === "en" ? cat.labelEn : cat.labelVi}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              FAQ ACCORDION
             ========================================================================= */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "60px" }}>
            {filteredFaqs.length === 0 ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  backgroundColor: "#0d0f15",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#a1a1aa",
                }}
              >
                <p style={{ margin: 0, fontSize: "15px" }}>
                  {lang === "en"
                    ? "No matching questions found. Please try another keyword or contact us directly."
                    : "Không tìm thấy câu hỏi phù hợp với từ khóa. Vui lòng thử từ khóa khác hoặc liên hệ trực tiếp với chúng tôi."}
                </p>
              </div>
            ) : (
              filteredFaqs.map((item) => {
                const isOpen = !!openIds[item.id];
                const question = lang === "en" ? item.questionEn : item.questionVi;
                const answer = lang === "en" ? item.answerEn : item.answerVi;

                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "#0d0f15",
                      border: isOpen
                        ? "1px solid rgba(34, 197, 94, 0.35)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      style={{
                        width: "100%",
                        padding: "20px 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#ffffff",
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "var(--font-primary)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15.5px",
                          fontWeight: 600,
                          lineHeight: 1.45,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {question}
                      </span>
                      <span
                        style={{
                          fontSize: "18px",
                          color: isOpen ? "#22c55e" : "#71717a",
                          transition: "transform 0.2s ease",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          flexShrink: 0,
                        }}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: "0 24px 22px 24px",
                          color: "#a1a1aa",
                          fontSize: "14.5px",
                          lineHeight: 1.75,
                          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                          paddingTop: "16px",
                        }}
                      >
                        {answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* =========================================================================
              BOTTOM CTA: Vẫn chưa tìm được câu trả lời?
             ========================================================================= */}
          <div
            style={{
              padding: "40px 36px",
              backgroundColor: "#0d0f15",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "19px",
                  fontWeight: 700,
                  margin: "0 0 6px 0",
                  color: "#ffffff",
                  letterSpacing: "-0.015em",
                }}
              >
                {lang === "en" ? "Still have questions?" : "Vẫn chưa tìm được câu trả lời?"}
              </h3>
              <p style={{ color: "#a1a1aa", margin: 0, fontSize: "14px" }}>
                {lang === "en" ? "Hotline technical support:" : "Hotline tư vấn kỹ thuật trực tiếp:"}{" "}
                <strong style={{ color: "#22c55e" }}>0706.067.799</strong>
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  backgroundColor: "#22c55e",
                  color: "#000000",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 18px rgba(34, 197, 94, 0.35)",
                }}
              >
                <span>{lang === "en" ? "Contact Now" : "Liên hệ ngay"}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
