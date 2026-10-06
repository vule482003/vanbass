import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

const servicesList = [
  {
    id: "01",
    slug: "/ban-dj",
    tag: "Phần Cứng & Bàn DJ",
    title: "Mua Bàn DJ Chính Hãng",
    desc: "Phân phối bàn DJ Pioneer DJ, AlphaTheta New & Like New. Cam kết 100% chính hãng, bảo hành 12 - 24 tháng, tặng USB nhạc Rekordbox và hỗ trợ kỹ thuật trọn đời.",
    features: [
      "Pioneer DJ & AlphaTheta chính hãng",
      "Bảo hành 12 - 24 tháng tận tâm",
      "Trả góp linh hoạt, giao hàng toàn quốc",
      "Setup Rekordbox & phần mềm trọn gói",
    ],
    ctaText: "Xem Danh Mục Bàn DJ",
    image: "/images/products/flx4.png",
    alt: "Mua Bàn DJ Chính Hãng Đà Nẵng - VanBass",
  },
  {
    id: "02",
    slug: "/thue-ban-dj",
    tag: "Dịch Vụ Cho Thuê",
    title: "Thuê Bàn DJ & Thiết Bị Biểu Diễn",
    desc: "Đội ngũ thiết bị cho thuê đa dạng: Pioneer XDJ-RX3, DDJ-FLX4, AlphaTheta Omnis-Duo, XDJ-AZ. Giá thuê từ 400k/ngày, giao lắp và test âm thanh tận nơi 24/7.",
    features: [
      "Thiết bị mới 99%, hoạt động ổn định",
      "Hỗ trợ giao lắp tại Đà Nẵng & Huế",
      "Có cấu hình chạy pin độc lập ngoài trời",
      "Kỹ thuật viên test âm thanh trực tiếp",
    ],
    ctaText: "Xem Bảng Giá Thuê",
    image: "/images/products/rx3.png",
    alt: "Thuê Bàn DJ Thiết Bị Đà Nẵng - VanBass",
  },
  {
    id: "03",
    slug: "/sua-chua-ban-dj",
    tag: "Trung Tâm Kỹ Thuật",
    title: "Sửa Chữa & Bảo Dưỡng Bàn DJ",
    desc: "Dịch vụ kỹ thuật chuyên sâu cho Controller, Mixer, CDJ Pioneer DJ & AlphaTheta. Thay fader, xử lý cảm ứng jogwheel, cân chỉnh nguồn, vệ sinh bảo dưỡng lấy liền trong ngày.",
    features: [
      "100% linh kiện chính hãng (Alps, Pioneer)",
      "Kiểm tra & chuẩn đoán lỗi miễn phí",
      "Bảo hành dịch vụ từ 6 - 12 tháng",
      "Xử lý nhanh lấy liền trong 1 - 3 giờ",
    ],
    ctaText: "Tư Vấn Kỹ Thuật Sửa Chữa",
    image: "/images/repair/dj_repair_hero.jpg",
    alt: "Sửa Chữa Bảo Dưỡng Bàn DJ Đà Nẵng - VanBass",
  },
  {
    id: "04",
    slug: "/dao-tao-dj",
    tag: "Học Viện Nghệ Thuật",
    title: "Đào Tạo DJ Thực Hành",
    desc: "Khóa đào tạo DJ thực tế 1 kèm 1 tại Đà Nẵng. Thực hành trực tiếp trên hệ thống bàn DJ chuẩn Club, làm chủ Beatmatching, EQ Mixing, Transition và biểu diễn sân khấu.",
    features: [
      "Thực hành 100% trên thiết bị thực tế",
      "Lộ trình từ cơ bản đến biểu diễn",
      "Luyện tai nghe và cảm âm bài bản",
      "Hỗ trợ setup Profile & kho nhạc chuyên dụng",
    ],
    ctaText: "Khám Phá Khóa Học DJ",
    image: "/images/services/dj_academy_hero.jpg",
    alt: "Đào Tạo DJ Thực Hành Đà Nẵng - VanBass",
  },
  {
    id: "05",
    slug: "/dao-tao-mc-hype",
    tag: "Kỹ Năng Biểu Diễn",
    title: "Đào Tạo MC / Hype Sự Kiện",
    desc: "Khóa học MC Hype sự kiện, Nightlife & Festival tại Đà Nẵng. Rèn luyện giọng nói sân khấu, kỹ năng tương tác đám đông, khuấy động không khí và phối hợp nhịp nhàng cùng DJ.",
    features: [
      "Kỹ thuật kiểm soát đài từ & hơi thở",
      "Kỹ năng bắt nhịp Drop & xử lý beat",
      "Làm chủ sân khấu & phong thái biểu diễn",
      "Thực hành trực tiếp trong không gian biểu diễn",
    ],
    ctaText: "Khám Phá Khóa MC Hype",
    image: "/images/services/mc_hype_hero.jpg",
    alt: "Đào Tạo MC Hype Sự Kiện Đà Nẵng - VanBass",
  },
  {
    id: "06",
    slug: "/su-kien-setup",
    tag: "Giải Pháp Sự Kiện",
    title: "Setup Âm Thanh & DJ Sự Kiện",
    desc: "Cung cấp trọn gói hệ thống âm thanh biểu diễn, DJ Booth, ánh sáng sân khấu và kỹ thuật viên vận hành cho Pool Party, Beach Festival, Tiệc cưới, Lounge và sự kiện doanh nghiệp.",
    features: [
      "Hệ thống loa biểu diễn công suất cao",
      "DJ Booth chuẩn rider chuyên nghiệp",
      "Kỹ thuật viên soundcheck & túc trực suốt sự kiện",
      "Khảo sát địa điểm & tư vấn cấu hình tận nơi",
    ],
    ctaText: "Yêu Cầu Báo Giá Setup",
    image: "/images/services/event_setup_hero.jpg",
    alt: "Setup Âm Thanh DJ Sự Kiện Đà Nẵng - VanBass",
  },
];

export default function DichVuPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/dich-vu#webpage`,
        url: `${baseUrl}/dich-vu`,
        name: "Hệ Thống Dịch Vụ DJ, Đào Tạo & Âm Thanh Sự Kiện - VanBass",
        description:
          "Trung tâm dịch vụ VanBass: Mua bán & cho thuê bàn DJ, sửa chữa bảo dưỡng thiết bị âm thanh, đào tạo DJ thực hành, MC Hype và setup sự kiện tại Đà Nẵng.",
        breadcrumb: {
          "@id": `${baseUrl}/dich-vu#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/dich-vu#breadcrumb`,
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
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#organization`,
        name: "VanBass Music Center",
        url: baseUrl,
        telephone: "+84706067799",
        address: {
          "@type": "PostalAddress",
          streetAddress: "77 Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê",
          addressLocality: "Đà Nẵng",
          addressRegion: "Đà Nẵng",
          addressCountry: "VN",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f5] flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Header />

      <main className="flex-1 pt-28 pb-20">
        {/* Breadcrumb Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#71717a]">
            <Link href="/" className="hover:text-[#22c55e] transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-[#e4e4e7] font-semibold">Dịch vụ</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181920] border border-[#272a33] text-[#22c55e] text-xs font-bold tracking-wider uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            Hệ Sinh Thái Dịch Vụ VanBass
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffffff] tracking-tight max-w-3xl mx-auto leading-tight mb-4">
            Dịch Vụ DJ, Đào Tạo & Âm Thanh Sự Kiện Tại Đà Nẵng
          </h1>
          <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
            VanBass Music Center cung cấp giải pháp toàn diện về thiết bị DJ chính hãng, dịch vụ kỹ thuật sửa chữa lấy liền, đào tạo kỹ năng biểu diễn thực hành và vận hành âm thanh sự kiện chuyên nghiệp tại Đà Nẵng & Miền Trung.
          </p>
        </section>

        {/* 6 Core Service Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col bg-[#121318] border border-[#23252f] rounded-2xl overflow-hidden hover:border-[#22c55e]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-48 sm:h-52 w-full bg-[#0d0e12] overflow-hidden flex items-center justify-center p-4 border-b border-[#1f2128]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-[#000000]/70 backdrop-blur-md border border-[#ffffff]/10 text-[11px] font-bold text-[#22c55e] uppercase tracking-wider">
                      {service.id} • {service.tag}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#ffffff] mb-2 group-hover:text-[#22c55e] transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-4">
                      {service.desc}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-1.5 mb-6 text-xs text-[#d4d4d8]">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={service.slug}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#1a1b22] border border-[#2a2d38] text-xs font-bold text-[#ffffff] hover:bg-[#22c55e] hover:text-[#000000] hover:border-[#22c55e] transition-all group/btn"
                  >
                    <span>{service.ctaText}</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Navigator: "Bạn đang cần dịch vụ nào?" */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#111217] border border-[#23252f] rounded-2xl p-6 sm:p-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#ffffff] mb-2">
                Bạn Đang Cần Dịch Vụ Nào?
              </h2>
              <p className="text-xs sm:text-sm text-[#a1a1aa]">
                Chọn đúng nhu cầu để chuyển thẳng đến chuyên trang tư vấn & cấu hình thiết bị phù hợp.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Mua Bàn DJ", sub: "Pioneer, AlphaTheta", href: "/ban-dj" },
                { label: "Thuê Bàn DJ", sub: "Từ 400k/ngày", href: "/thue-ban-dj" },
                { label: "Sửa Chữa DJ", sub: "Lấy liền trong ngày", href: "/sua-chua-ban-dj" },
                { label: "Học DJ", sub: "Thực hành 1 kèm 1", href: "/dao-tao-dj" },
                { label: "Học MC Hype", sub: "Làm chủ sân khấu", href: "/dao-tao-mc-hype" },
                { label: "Setup Sự Kiện", sub: "Âm thanh trọn gói", href: "/su-kien-setup" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#171820] border border-[#262833] hover:border-[#22c55e] hover:bg-[#1a1d27] transition-all text-center group"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#e4e4e7] group-hover:text-[#22c55e] transition-colors mb-1">
                    {item.label}
                  </span>
                  <span className="text-[10.5px] text-[#71717a]">{item.sub}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why VanBass Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#22c55e] uppercase tracking-wider">
              Cam Kết Dịch Vụ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] mt-1 mb-2">
              Tại Sao Lựa Chọn VanBass Music Center?
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa]">
              Được xây dựng trên nền tảng kỹ thuật âm thanh vững chắc và đam mê văn hóa âm nhạc điện tử.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "100% Thiết Bị Thực Tế",
                desc: "Hệ thống bàn DJ, Mixer và Loa chính hãng từ Pioneer DJ, AlphaTheta, B&C Speakers sẵn sàng test trực tiếp.",
              },
              {
                title: "Kỹ Thuật Chuyên Nghiệp",
                desc: "Đội ngũ am hiểu sâu về mạch phần cứng, giao thức âm thanh và phần mềm biểu diễn chuyên dụng Rekordbox / Serato.",
              },
              {
                title: "Hỗ Trợ & Túc Trực 24/7",
                desc: "Sẵn sàng hỗ trợ soundcheck, giao nhận thiết bị tận nơi và xử lý sự cố kỹ thuật khẩn cấp cho các sự kiện.",
              },
              {
                title: "Hậu Mãi & Bảo Hành Rõ Ràng",
                desc: "Chính sách bảo hành minh bạch, phiếu bảo hành và tem điện tử xác thực cho từng dịch vụ và sản phẩm.",
              },
            ].map((col, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#121318] border border-[#23252f] flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-xs font-bold text-[#22c55e] mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-[#ffffff] mb-2">{col.title}</h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">{col.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Consultation Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#13141a] via-[#1a1b24] to-[#13141a] border border-[#2b2e3b] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] mb-3">
              Cần Tư Vấn Thiết Bị Hoặc Giải Pháp Sự Kiện?
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto mb-6">
              Liên hệ ngay với chuyên viên kỹ thuật VanBass để được giải đáp cấu hình, kiểm tra thiết bị hoặc nhận báo giá tối ưu nhất.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:0706067799"
                className="px-6 py-3 rounded-full bg-[#22c55e] text-[#000000] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22c55e]/20"
              >
                Hotline / Zalo: 0706 067 799
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[#181920] border border-[#373a47] text-[#ffffff] text-xs sm:text-sm font-bold hover:bg-[#232530] transition-colors"
              >
                Gửi Yêu Cầu Liên Hệ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
