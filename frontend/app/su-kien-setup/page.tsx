import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

const setupFaqs = [
  {
    q: "VanBass cung cấp dịch vụ setup âm thanh cho những loại sự kiện nào?",
    a: "Chúng tôi nhận setup âm thanh & thiết bị DJ cho đa dạng sự kiện: Pool Party & Beach Event, Tiệc cưới cá tính, Gala Dinner & Year End Party doanh nghiệp, Khai trương Lounge/Bar, Private Villa Party và các giải đấu/lễ hội văn hóa thể thao tại Đà Nẵng, Hội An, Huế và các tỉnh miền Trung.",
  },
  {
    q: "Hệ thống bàn DJ trong gói setup có đáp ứng được Technical Rider của DJ chuyên nghiệp không?",
    a: "100% thiết bị DJ tại VanBass là hàng chính hãng Pioneer DJ / AlphaTheta (Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, CDJ-3000 / DJM-900NXS2). Thiết bị được kiểm tra kỹ thuật kỹ lưỡng, cập nhật Firmware mới nhất và tương thích hoàn toàn với USB Rekordbox của các DJ khách mời.",
  },
  {
    q: "Thời gian kỹ thuật viên đến setup và soundcheck trước sự kiện là bao lâu?",
    a: "Đội ngũ kỹ thuật VanBass luôn có mặt tại địa điểm sự kiện trước tối thiểu 2 - 4 tiếng để lắp đặt, đi dây an toàn, cân chỉnh âm học phòng/ngoài trời và cùng DJ test âm thanh hoàn chỉnh trước khi khách mời đến.",
  },
  {
    q: "Kỹ thuật viên có túc trực trong suốt thời gian diễn ra sự kiện không?",
    a: "Có. Mọi gói setup sự kiện tại VanBass đều bao gồm kỹ thuật viên âm thanh túc trực tại bàn điều khiển (Mixer/Console) suốt chương trình để giám sát mức âm lượng, xử lý micro và hỗ trợ DJ ngay lập tức.",
  },
];

export default function SuKienSetupPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": `${baseUrl}/su-kien-setup#service`,
        name: "Dịch Vụ Setup Âm Thanh & DJ Sự Kiện Chuyên Nghiệp Đà Nẵng",
        description:
          "Dịch vụ trọn gói setup âm thanh biểu diễn, bàn DJ Rider, ánh sáng sân khấu và kỹ thuật viên vận hành trực 24/7 cho các sự kiện tại Đà Nẵng & Miền Trung.",
        provider: {
          "@type": "LocalBusiness",
          name: "VanBass Music Center",
          url: baseUrl,
          telephone: ["+84905614566", "+84944498987", "+84706067799"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng",
            addressLocality: "phường Hải Châu, Đà Nẵng",
            addressRegion: "Đà Nẵng",
            addressCountry: "VN",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/su-kien-setup#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Dịch vụ",
            item: `${baseUrl}/dich-vu`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Setup âm thanh sự kiện",
            item: `${baseUrl}/su-kien-setup`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F6F8] flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        {/* Breadcrumb Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#747C89]">
            <Link href="/" className="hover:text-[#22C55E] transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/dich-vu" className="hover:text-[#22C55E] transition-colors">
              Dịch vụ
            </Link>
            <span>/</span>
            <span className="text-[#F5F6F8] font-semibold">Setup âm thanh sự kiện</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] text-xs font-bold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                VanBass Pro Production • Đà Nẵng
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F6F8] tracking-tight leading-tight mb-4">
                Setup Âm Thanh & DJ Sự Kiện Tại Đà Nẵng
              </h1>
              <p className="text-sm sm:text-base text-[#A2A8B3] leading-relaxed mb-6">
                Giải pháp trọn gói thiết bị âm thanh biểu diễn, DJ Booth chuẩn rider, ánh sáng sân khấu và đội ngũ kỹ thuật viên soundcheck túc trực 24/7 cho các sự kiện Pool Party, Tiệc cưới, Festival và Gala doanh nghiệp tại Đà Nẵng & Miền Trung.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:0944498987"
                  className="px-6 py-3 rounded-full bg-[#22C55E] text-[#08090B] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22C55E]/20"
                >
                  Yêu Cầu Báo Giá (Mr. Tuấn): 0944 498 987
                </a>
                <Link
                  href="/thue-ban-dj"
                  className="px-6 py-3 rounded-full bg-[#171A20] border border-[#292D35] text-[#F5F6F8] text-xs sm:text-sm font-bold hover:bg-[#20242D] hover:border-[#3A404B] transition-colors"
                >
                  Xem Bảng Giá Thiết Bị Thuê
                </Link>
              </div>
            </div>

            {/* Visual Photography Placeholder */}
            <div className="lg:col-span-5">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#292D35] shadow-2xl bg-[#101216]">
                <Image
                  src="/images/services/event_setup_hero.jpg"
                  alt="Không gian sân khấu sự kiện và hệ thống âm thanh DJ do VanBass setup tại Đà Nẵng"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-xs text-[#A2A8B3]">
                  <span className="font-bold text-[#22C55E]">Event Production:</span> Hệ thống âm thanh, DJ Booth & kỹ thuật túc trực.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Production Services */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
              Hạng Mục Dịch Vụ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mt-1 mb-2">
              Các Giải Pháp Setup Sự Kiện Tại VanBass
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Tùy chỉnh cấu hình linh hoạt từ không gian riêng tư (Private Villa) đến sân khấu ngoài trời quy mô lớn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "DJ Booth & Thiết Bị Rider",
                desc: "Cung cấp bàn DJ Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, CDJ-3000, bàn kê chuyên dụng, mâm xoay và tai nghe kiểm âm.",
              },
              {
                title: "Hệ Thống Loa Biểu Diễn",
                desc: "Hệ thống loa full, Subwoofer công suất thực từ các thương hiệu hàng đầu, cho dải bass uy lực, chắc gọn và dải treble tách bạch.",
              },
              {
                title: "Hệ Thống Micro Sân Khấu",
                desc: "Micro không dây chuyên dụng cho MC, ca sĩ và biểu diễn sân khấu, bắt sóng ổn định và chống hú rít tối ưu.",
              },
              {
                title: "Setup Sự Kiện Ngoài Trời / Bãi Biển",
                desc: "Giải pháp thiết bị chạy pin độc lập (AlphaTheta Omnis-Duo, loa di động công suất lớn) phù hợp tiệc bãi biển, du thuyền.",
              },
              {
                title: "Ánh Sáng Sân Khấu & Hiệu Ứng",
                desc: "Hệ thống đèn Moving Head, Par LED đổi màu, máy khói tạo không khí âm nhạc sống động đúng tinh thần sự kiện.",
              },
              {
                title: "Kỹ Thuật Viên Túc Trực 24/7",
                desc: "Chuyên viên âm thanh soundcheck kỹ lưỡng trước giờ G và trực tiếp vận hành bàn điều khiển suốt thời gian diễn ra sự kiện.",
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-xs font-bold text-[#22C55E] mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#F5F6F8] mb-2">{srv.title}</h3>
                  <p className="text-xs text-[#A2A8B3] leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5-Step Workflow */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#101216] border border-[#292D35] rounded-2xl p-6 sm:p-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                Quy Trình Triển Khai
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F6F8] mt-1 mb-2">
                5 Bước Setup Sự Kiện Chuyên Nghiệp
              </h2>
              <p className="text-xs sm:text-sm text-[#A2A8B3]">
                Quy trình rõ ràng, minh bạch và đảm bảo đúng tiến độ chương trình của quý khách.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "Tiếp Nhận Nhu Cầu",
                  desc: "Xác định quy mô khách mời, không gian trong nhà / ngoài trời và thể loại âm nhạc sự kiện.",
                },
                {
                  step: "02",
                  title: "Tư Vấn Cấu Hình",
                  desc: "Đề xuất cấu hình loa, bàn DJ và thiết bị phụ trợ phù hợp ngân sách và yêu cầu của DJ.",
                },
                {
                  step: "03",
                  title: "Lắp Đặt Sớm",
                  desc: "Đội ngũ kỹ thuật có mặt trước 2 - 4 tiếng để lắp đặt thiết bị và đi dây an toàn, gọn gàng.",
                },
                {
                  step: "04",
                  title: "Soundcheck Kỹ Lưỡng",
                  desc: "Cân chỉnh EQ, loại bỏ hú micro, kiểm tra kết nối với USB của DJ và nghe thử âm lượng phòng.",
                },
                {
                  step: "05",
                  title: "Vận Hành & Thu Hồi",
                  desc: "Kỹ thuật viên túc trực suốt chương trình và nhanh chóng thu hồi thiết bị sau khi kết thúc.",
                },
              ].map((stepItem, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#171A20] border border-[#292D35] flex flex-col justify-between"
                >
                  <div>
                    <div className="text-lg font-black text-[#22C55E] mb-2">{stepItem.step}</div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#F5F6F8] mb-1.5">{stepItem.title}</h3>
                    <p className="text-[11.5px] text-[#A2A8B3] leading-relaxed">{stepItem.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
              Giải Đáp Thắc Mắc
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mt-1 mb-2">
              Câu Hỏi Thường Gặp Về Dịch Vụ Setup Sự Kiện
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Những điều khách hàng thường quan tâm khi thuê âm thanh & setup DJ.
            </p>
          </div>

          <div className="space-y-4">
            {setupFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#101216] border border-[#292D35]"
              >
                <h3 className="text-sm font-bold text-[#F5F6F8] mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs text-[#A2A8B3] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Consultation Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#101216] border border-[#292D35] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mb-3">
              Cần Báo Giá Setup Âm Thanh & DJ Sự Kiện?
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3] max-w-xl mx-auto mb-6">
              Liên hệ ngay để nhận phương án cấu hình tối ưu và khảo sát địa điểm trực tiếp tại Đà Nẵng & Hội An.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:0706067799"
                className="px-6 py-3 rounded-full bg-[#22C55E] text-[#08090B] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22C55E]/20"
              >
                Hotline Khảo Sát (Mr. Vân): 0706 067 799
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[#171A20] border border-[#292D35] text-[#F5F6F8] text-xs sm:text-sm font-bold hover:bg-[#20242D] hover:border-[#3A404B] transition-colors"
              >
                Gửi Yêu Cầu Báo Giá
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
