import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

const djCourseFaqs = [
  {
    q: "Người mới bắt đầu chưa có kiến thức nhạc lý có học DJ được không?",
    a: "Hoàn toàn học được. Chương trình dạy học DJ tại VanBass được thiết kế trực quan, bắt đầu từ cảm nhận nhịp điệu (BPM, Bar, Beat) và cấu trúc bài nhạc điện tử thực tế. Bạn không cần có nền tảng nhạc lý cổ điển hay biết chơi nhạc cụ trước đó.",
  },
  {
    q: "Học viên có được thực hành trực tiếp trên thiết bị DJ thực tế không?",
    a: "100% thời lượng các buổi học đều là thực hành thực tế. Học viên được trực tiếp thao tác trên các dòng bàn DJ tiêu chuẩn Club như Pioneer DDJ-FLX4, Pioneer XDJ-RX3, AlphaTheta Omnis-Duo và hệ thống All-In-One cao cấp.",
  },
  {
    q: "Thời gian và lịch học DJ được sắp xếp như thế nào?",
    a: "Lịch học linh hoạt theo hình thức 1 kèm 1 hoặc nhóm nhỏ 2 người. Học viên có thể chủ động chọn ca học sáng, chiều hoặc tối (từ thứ 2 đến chủ nhật) phù hợp với lịch làm việc và học tập cá nhân.",
  },
  {
    q: "Học viên tại Huế hoặc các tỉnh lân cận có thể tham gia khóa học như thế nào?",
    a: "Lịch học linh hoạt 1 kèm 1, hỗ trợ sắp xếp ca học tập trung theo thời gian biểu của học viên tại Huế và ngoại tỉnh. Học viên được hỗ trợ phòng tập luyện thực tế và hỗ trợ online về kho nhạc, kỹ thuật phần mềm trọn đời.",
  },
  {
    q: "Học viên có được hỗ trợ kho nhạc và phần mềm Rekordbox không?",
    a: "Có. Học viên được hướng dẫn chi tiết cách cài đặt, kích hoạt bản quyền và sử dụng phần mềm Rekordbox / Serato DJ, cách chuẩn bị USB nhạc chuẩn Club và nhận trọn bộ kho nhạc chất lượng cao (EDM, House, Tech House, Vinahouse, Hip-hop, Afrobeats) được chọn lọc kỹ lưỡng.",
  },
  {
    q: "Địa điểm học DJ thực tế ở đâu?",
    a: "Các buổi học thực hành diễn ra trực tiếp tại Showroom & Studio VanBass Music Center, số 77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng (V&B Studio / Showroom Huế — 442 Chi Lăng, TP. Huế).",
  },
];

export default function DayHocDjPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${baseUrl}/day-hoc-dj#course`,
        name: "Khóa Dạy Học DJ Thực Hành 1 Kèm 1 Tại Đà Nẵng & Huế",
        description:
          "Khóa đào tạo dạy học DJ thực hành 1 kèm 1 trên thiết bị Pioneer DJ & AlphaTheta tại Đà Nẵng & hỗ trợ học viên tại Huế: Beatmatching, EQ Mixing, Transitions, Loop & FX, quản lý Rekordbox và kỹ năng biểu diễn sân khấu chuyên nghiệp.",
        provider: {
          "@type": "Organization",
          name: "VanBass Music Center",
          url: baseUrl,
        },
      },
      {
        "@type": "Service",
        "@id": `${baseUrl}/day-hoc-dj#service`,
        name: "Dạy Học DJ Thực Hành Chuyên Nghiệp",
        serviceType: "Đào tạo kỹ năng DJ & Âm nhạc điện tử",
        provider: {
          "@type": "LocalBusiness",
          name: "VanBass Music Center",
          telephone: ["+84905614566", "+84944498987", "+84706067799"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng",
            addressLocality: "phường Hải Châu, Đà Nẵng",
            addressRegion: "Đà Nẵng",
            addressCountry: "VN",
          },
          url: `${baseUrl}/day-hoc-dj`,
        },
        areaServed: [
          { "@type": "City", name: "Đà Nẵng" },
          { "@type": "City", name: "Huế" },
          { "@type": "AdministrativeArea", name: "Miền Trung" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/day-hoc-dj#breadcrumb`,
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
            name: "Dạy Học DJ",
            item: `${baseUrl}/day-hoc-dj`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/day-hoc-dj#faq`,
        mainEntity: djCourseFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
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
            <span className="text-[#F5F6F8] font-semibold">Dạy Học DJ</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] text-xs font-bold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                VanBass DJ Academy • Đà Nẵng & Huế
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F6F8] tracking-tight leading-tight mb-4">
                Dạy Học DJ Thực Hành Tại Đà Nẵng & Huế
              </h1>
              <p className="text-sm sm:text-base text-[#A2A8B3] leading-relaxed mb-6">
                Chương trình đào tạo DJ thực tế 1 kèm 1, tập trung rèn luyện đôi tai cảm âm, kỹ năng beatmatch thủ công không phụ thuộc nút Sync, phối hợp EQ & Effect điêu luyện và tư duy xây dựng Set nhạc chuyên nghiệp trên các dòng bàn DJ Pioneer DJ & AlphaTheta tiêu chuẩn Club.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:0905614566"
                  className="px-6 py-3 rounded-full bg-[#22C55E] text-[#08090B] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22C55E]/20"
                >
                  Tư Vấn Khóa Học (Mr. Tuyến): 0905 614 566
                </a>
                <Link
                  href="/dich-vu"
                  className="px-6 py-3 rounded-full bg-[#171A20] border border-[#292D35] text-[#F5F6F8] text-xs sm:text-sm font-bold hover:bg-[#20242D] hover:border-[#3A404B] transition-colors"
                >
                  Xem Hệ Sinh Thái Dịch Vụ
                </Link>
              </div>
            </div>

            {/* Visual Photography Box */}
            <div className="lg:col-span-5">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#292D35] shadow-2xl bg-[#101216]">
                <Image
                  src="/images/services/dj_academy_hero.jpg"
                  alt="Không gian đào tạo và dạy học DJ thực hành tại VanBass Music Center Đà Nẵng"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-xs text-[#A2A8B3]">
                  <span className="font-bold text-[#22C55E]">Thực Hành Trực Tiếp:</span> 100% thời lượng trên Pioneer DJ & AlphaTheta.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Đối tượng học viên */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
              Đối Tượng Phù Hợp
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mt-1 mb-2">
              Khóa Học DJ Tại VanBass Dành Cho Ai?
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Thiết kế lộ trình cá nhân hóa dựa trên mục tiêu và khả năng của từng học viên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#22C55E] mb-2 uppercase">01 • Người Mới Bắt Đầu</div>
                <h3 className="text-base font-bold text-[#F5F6F8] mb-2">Người Yêu Thích Âm Nhạc Điện Tử</h3>
                <p className="text-xs text-[#A2A8B3] leading-relaxed">
                  Chưa từng tiếp xúc với bàn DJ, chưa có kiến thức nhạc lý. Bạn muốn học để thỏa mãn đam mê, tự chơi nhạc tại gia, tiệc bạn bè hoặc bắt đầu hành trình âm nhạc bài bản.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#38bdf8] mb-2 uppercase">02 • Định Hướng Nghề Nghiệp</div>
                <h3 className="text-base font-bold text-[#F5F6F8] mb-2">Theo Đuổi Nghề DJ Chuyên Nghiệp</h3>
                <p className="text-xs text-[#A2A8B3] leading-relaxed">
                  Muốn làm việc tại các Lounge, Bar, Club, Beach Bar, sự kiện đám cưới hoặc Pool Party tại Đà Nẵng, Huế, Hội An và các tỉnh miền Trung.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#a78bfa] mb-2 uppercase">03 • Nâng Cấp Kỹ Năng</div>
                <h3 className="text-base font-bold text-[#F5F6F8] mb-2">DJ Đang Hoạt Động Cần Nâng Cao</h3>
                <p className="text-xs text-[#A2A8B3] leading-relaxed">
                  Đã biết đánh cơ bản nhưng muốn hoàn thiện kỹ năng Mixing mượt mà, kỹ thuật Hot Cue / Roll / Slip Mode nâng cao và tư duy sắp xếp Set nhạc cuốn hút.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Comprehensive Course Modules */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
              Khung Chương Trình
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mt-1 mb-2">
              Lộ Trình Học DJ Từ Cơ Bản Đến Nâng Cao
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              6 module kiến thức và kỹ năng thực chiến được đúc kết từ kinh nghiệm biểu diễn thực tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "Module 01",
                title: "Cảm Âm & Cấu Trúc Bản Nhạc",
                desc: "Hiểu sâu về BPM, Nhịp (Beat), Ô nhịp (Bar), Câu nhạc (Phrase) và cấu trúc Intro, Build-up, Drop, Outro của từng dòng nhạc điện tử.",
              },
              {
                step: "Module 02",
                title: "Beatmatching & Cueing Bằng Tai",
                desc: "Luyện đôi tai cảm nhận tốc độ nhạc, kỹ năng Cueing chính xác và đồng bộ tempo hoàn toàn bằng Pitch Fader không phụ thuộc nút Sync.",
              },
              {
                step: "Module 03",
                title: "EQ Mixing & Kỹ Thuật Chuyển Bài",
                desc: "Làm chủ 3 dải âm Low, Mid, High, kiểm soát gain / headroom và thực hành các kỹ thuật Transition cơ bản đến nâng cao (Cut, Fade, Swap Bass).",
              },
              {
                step: "Module 04",
                title: "Hiệu Ứng Âm Thanh (FX) & Performance",
                desc: "Khai thác Beat FX, Sound Color FX, Loop, Roll, Slip Mode và Hot Cue để tạo điểm nhấn cao trào, ngẫu hứng cho bài nhạc.",
              },
              {
                step: "Module 05",
                title: "Quản Lý Thư Viện Nhạc Rekordbox",
                desc: "Thiết lập phần mềm Rekordbox, phân loại Playlist theo Genre / Energy, đặt Memory Cue và xuất file USB chuẩn thi đấu biểu diễn.",
              },
              {
                step: "Module 06",
                title: "Xây Dựng Mixtape & Biểu Diễn Sân Khấu",
                desc: "Tư duy điều phối năng lượng đám đông, chuẩn bị Set nhạc 60-90 phút hoàn chỉnh, xử lý sự cố sân khấu và ghi âm Mixtape cá nhân.",
              },
            ].map((module, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#22C55E] mb-2 uppercase tracking-wider">
                    {module.step}
                  </div>
                  <h3 className="text-base font-bold text-[#F5F6F8] mb-2">{module.title}</h3>
                  <p className="text-xs text-[#A2A8B3] leading-relaxed">{module.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Không gian & Thiết bị thực hành */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#101216] border border-[#292D35] rounded-2xl p-6 sm:p-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                Trang Thiết Bị
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F6F8] mt-1 mb-4">
                Học Trên Hệ Thống Bàn DJ Chuẩn Club
              </h2>
              <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed mb-8">
                VanBass đầu tư phòng Studio tiêu chuẩn với dàn bàn DJ thế hệ mới nhất của Pioneer DJ & AlphaTheta, giúp học viên làm quen với trang thiết bị thực tế trước khi biểu diễn ngoài đời.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left">
                <div className="p-4 rounded-xl bg-[#171A20] border border-[#292D35]">
                  <div className="text-xs font-bold text-[#F5F6F8] mb-1">Pioneer DDJ-FLX4</div>
                  <div className="text-[11px] text-[#747C89]">Dòng Controller quốc dân cho người mới bắt đầu.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#171A20] border border-[#292D35]">
                  <div className="text-xs font-bold text-[#F5F6F8] mb-1">Pioneer XDJ-RX3</div>
                  <div className="text-[11px] text-[#747C89]">Hệ thống All-In-One chuẩn sự kiện và Lounge Bar.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#171A20] border border-[#292D35]">
                  <div className="text-xs font-bold text-[#F5F6F8] mb-1">AlphaTheta Omnis-Duo</div>
                  <div className="text-[11px] text-[#747C89]">Thiết bị di động không dây chơi tiệc ngoài trời.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#171A20] border border-[#292D35]">
                  <div className="text-xs font-bold text-[#F5F6F8] mb-1">AlphaTheta XDJ-AZ</div>
                  <div className="text-[11px] text-[#747C89]">Flagship 4 kênh cao cấp nhất thế hệ mới.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local SEO Section: Đà Nẵng & Huế */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
              Khu Vực Phục Vụ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mt-1 mb-2">
              Khu Vực Đào Tạo Và Hỗ Trợ Học Viên
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Hệ thống cơ sở và chính sách hỗ trợ học viên tại Đà Nẵng, Huế và miền Trung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cơ sở Đà Nẵng */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  <span className="text-xs font-extrabold text-[#22C55E] uppercase tracking-wider">Trung Tâm Đào Tạo Trực Tiếp</span>
                </div>
                <h3 className="text-xl font-bold text-[#F5F6F8] mb-3">Studio Học DJ Tại Đà Nẵng</h3>
                <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed mb-4">
                  Phòng học cách âm tiêu chuẩn, trang bị đầy đủ máy lạnh, dàn loa kiểm âm sân khấu và dàn bàn DJ Pioneer chuyên nghiệp. Học viên tại Đà Nẵng có thể đăng ký lịch học linh hoạt theo từng ngày trong tuần.
                </p>
                <ul className="space-y-2 text-xs text-[#A2A8B3] mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Địa chỉ: 77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Lịch học: 1 kèm 1 ca sáng, chiều, tối
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Hỗ trợ giờ tập luyện miễn phí ngoài giờ học
                  </li>
                </ul>
              </div>
              <a
                href="tel:0905614566"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#171A20] border border-[#292D35] text-xs font-bold text-[#22C55E] hover:bg-[#20242D] hover:border-[#3A404B] transition-colors"
              >
                Liên Hệ Studio Đà Nẵng (Mr. Tuyến): 0905 614 566
              </a>
            </div>

            {/* Hỗ trợ Huế & Miền Trung */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                  <span className="text-xs font-extrabold text-[#38bdf8] uppercase tracking-wider">Hỗ Trợ Học Viên Khu Vực Huế</span>
                </div>
                <h3 className="text-xl font-bold text-[#F5F6F8] mb-3">Chính Sách Học Viên Tại Huế & Miền Trung</h3>
                <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed mb-4">
                  Dành cho học viên đam mê DJ tại Huế, Hội An, Quảng Nam và các tỉnh lân cận. Lịch học linh hoạt 1 kèm 1, hỗ trợ sắp xếp ca học tập trung theo thời gian biểu của học viên tại Huế và ngoại tỉnh, kèm hỗ trợ kỹ thuật và kho nhạc online trọn đời.
                </p>
                <ul className="space-y-2 text-xs text-[#A2A8B3] mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-[#38bdf8]">✓</span> V&B Studio / Showroom Huế — 442 Chi Lăng, TP. Huế
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#38bdf8]">✓</span> Lịch học 1 kèm 1 linh hoạt, thuận tiện sắp xếp thời gian
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#38bdf8]">✓</span> Ưu đãi đặc biệt khi thuê hoặc mua bàn DJ để tập luyện tại nhà
                  </li>
                </ul>
              </div>
              <a
                href="tel:0944498987"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#171A20] border border-[#292D35] text-xs font-bold text-[#38bdf8] hover:bg-[#20242D] hover:border-[#3A404B] transition-colors"
              >
                Tư Vấn Học Viên Huế (Mr. Tuấn): 0944 498 987
              </a>
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
              Câu Hỏi Thường Gặp Về Khóa Dạy Học DJ
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Những thắc mắc phổ biến của học viên khi bắt đầu tham gia lớp học DJ tại Đà Nẵng & Huế.
            </p>
          </div>

          <div className="space-y-4">
            {djCourseFaqs.map((faq, idx) => (
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
              Đăng Ký Tư Vấn & Trải Nghiệm Thử Bàn DJ
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3] max-w-xl mx-auto mb-6">
              Liên hệ ngay để nhận thông tin chi tiết về học phí, sắp xếp lịch học thử và trải nghiệm trực tiếp không gian Studio tại VanBass.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:0706067799"
                className="px-6 py-3 rounded-full bg-[#22C55E] text-[#08090B] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22C55E]/20"
              >
                Hotline (Mr. Vân): 0706 067 799
              </a>
              <Link
                href="/thue-ban-dj"
                className="px-6 py-3 rounded-full bg-[#171A20] border border-[#292D35] text-[#F5F6F8] text-xs sm:text-sm font-bold hover:bg-[#20242D] hover:border-[#3A404B] transition-colors"
              >
                Xem Bảng Giá Thuê Bàn DJ Tập Luyện
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
