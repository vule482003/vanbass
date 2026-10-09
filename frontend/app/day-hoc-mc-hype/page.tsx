import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

const mcCourseFaqs = [
  {
    q: "MC Hype (Hype Man) khác gì so với MC truyền thống?",
    a: "MC truyền thống tập trung vào dẫn dắt nội dung kịch bản, lời chào và nghi thức chương trình. Trong khi đó, MC Hype (Hype Man) là linh hồn khuấy động năng lượng khán giả, tương tác trực tiếp trên nền nhạc DJ, tạo điểm nhấn cao trào tại các đoạn Build-up / Drop và giữ lửa cho không khí sự kiện Nightlife, Pool Party, Bar Club hoặc Festival âm nhạc.",
  },
  {
    q: "Người có giọng nói yếu hoặc chưa tự tin trước đám đông có học được không?",
    a: "Hoàn toàn học được. Khóa học có các bài tập chuyên sâu về nén hơi bụng, mở khẩu hình, kiểm soát cao độ và kỹ thuật điều tiết âm lượng Micro sân khấu. Giảng viên sẽ chỉnh sửa từng phát âm, hướng dẫn kỹ năng giải phóng hình thể và tâm lý tương tác đám đông từ đơn giản đến nâng cao.",
  },
  {
    q: "Học viên có được thực hành phối hợp trực tiếp cùng DJ không?",
    a: "Có. Điểm đặc biệt tại VanBass là môi trường tích hợp cả DJ và MC. Học viên được trực tiếp đứng trên sân khấu Studio, cầm micro chuyên nghiệp và phối hợp ăn ý theo từng nhịp drop bài nhạc của DJ thực tế trong suốt các buổi học.",
  },
  {
    q: "Thời lượng và lịch học MC Hype tại Đà Nẵng & Huế được tổ chức như thế nào?",
    a: "Khóa học được tổ chức linh hoạt theo ca tối hoặc cuối tuần tại Studio VanBass Music Center, số 77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng. Đối với học viên tại Huế và ngoại tỉnh (V&B Studio / Showroom Huế — 442 Chi Lăng, TP. Huế), trung tâm hỗ trợ sắp xếp lịch học 1 kèm 1 linh hoạt theo thời gian biểu thực tế.",
  },
  {
    q: "Sau khóa học, học viên có cơ hội đi diễn thực tế không?",
    a: "Học viên đạt chuẩn đầu ra sẽ được hỗ trợ ghi hình Clip Profile sân khấu chuyên nghiệp và có cơ hội tham gia thực chiến tại các sự kiện âm nhạc, tiệc ngoài trời, Lounge do hệ sinh thái VanBass Event tổ chức.",
  },
];

export default function DayHocMcHypePage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${baseUrl}/day-hoc-mc-hype#course`,
        name: "Khóa Dạy Học MC / Hype Sự Kiện Thực Chiến Tại Đà Nẵng & Huế",
        description:
          "Khóa đào tạo dạy học MC Hype sự kiện, Nightlife & Festival tại Đà Nẵng & Huế: Kỹ thuật giọng nói sân khấu, phong thái tự tin, bắt nhịp drop và phối hợp ăn ý cùng DJ chuyên nghiệp.",
        provider: {
          "@type": "Organization",
          name: "VanBass Music Center",
          url: baseUrl,
        },
      },
      {
        "@type": "Service",
        "@id": `${baseUrl}/day-hoc-mc-hype#service`,
        name: "Dạy Học MC / Hype Sự Kiện & Nightlife",
        serviceType: "Đào tạo kỹ năng dẫn chương trình & biểu diễn sân khấu",
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
          url: `${baseUrl}/day-hoc-mc-hype`,
        },
        areaServed: [
          { "@type": "City", name: "Đà Nẵng" },
          { "@type": "City", name: "Huế" },
          { "@type": "AdministrativeArea", name: "Miền Trung" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/day-hoc-mc-hype#breadcrumb`,
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
            name: "Dạy Học MC / Hype",
            item: `${baseUrl}/day-hoc-mc-hype`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/day-hoc-mc-hype#faq`,
        mainEntity: mcCourseFaqs.map((faq) => ({
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
            <span className="text-[#F5F6F8] font-semibold">Dạy Học MC / Hype</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] text-xs font-bold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                VanBass Academy • Đà Nẵng & Huế
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F6F8] tracking-tight leading-tight mb-4">
                Dạy Học MC / Hype Sự Kiện Tại Đà Nẵng & Huế
              </h1>
              <p className="text-sm sm:text-base text-[#A2A8B3] leading-relaxed mb-6">
                Rèn luyện giọng nói nội lực, kỹ thuật cầm mic chuyên nghiệp, phong thái tự tin trên sân khấu và kỹ năng khuấy động đám đông trên nền nhạc DJ tại các sự kiện Nightlife, Pool Party, Tiệc cưới và Festival âm nhạc tại Đà Nẵng & Huế.
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
                  src="/images/services/mc_hype_hero.jpg"
                  alt="Không gian thực hành sân khấu và dạy học MC Hype tại VanBass Đà Nẵng và Huế"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-xs text-[#A2A8B3]">
                  <span className="font-bold text-[#22C55E]">Thực Hành Thực Tế:</span> Luyện giọng và tương tác sân khấu cùng DJ.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Đối tượng học viên */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
              Đối Tượng Học Viên
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mt-1 mb-2">
              Khóa Học MC / Hype Phù Hợp Với Ai?
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Dành cho mọi cá nhân đam mê biểu diễn sân khấu và muốn phát triển nghề nghiệp sự kiện.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#22C55E] mb-2 uppercase">01 • Người Chưa Có Kinh Nghiệm</div>
                <h3 className="text-base font-bold text-[#F5F6F8] mb-2">Người Muốn Giải Phóng Bản Thân</h3>
                <p className="text-xs text-[#A2A8B3] leading-relaxed">
                  Còn e ngại khi đứng trước đám đông, giọng nói yếu, hụt hơi. Bạn muốn rèn luyện phong thái tự tin, khẩu hình chuẩn và làm chủ cảm xúc trước mọi khán phòng.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#38bdf8] mb-2 uppercase">02 • Định Hướng Nghề MC Hype</div>
                <h3 className="text-base font-bold text-[#F5F6F8] mb-2">Trở Thành MC Nightlife Chuyên Nghiệp</h3>
                <p className="text-xs text-[#A2A8B3] leading-relaxed">
                  Muốn làm việc tại các Bar, Club, Lounge, Pool Party, Countdown và Festival âm nhạc tại Đà Nẵng, Huế, Hội An với mức thu nhập hấp dẫn.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#a78bfa] mb-2 uppercase">03 • DJ Muốn Kiêm MC</div>
                <h3 className="text-base font-bold text-[#F5F6F8] mb-2">DJ Muốn Nâng Cao Kỹ Năng Mic</h3>
                <p className="text-xs text-[#A2A8B3] leading-relaxed">
                  DJ muốn tự cầm mic tương tác với khán giả trong set diễn của mình, tăng giá trị booking và làm cho buổi biểu diễn trở nên bùng nổ hơn.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Skill Modules */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
              Kỹ Năng Đào Tạo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mt-1 mb-2">
              Các Kỹ Năng Cốt Lõi Của MC Hype
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Hệ thống kỹ năng thực chiến được đúc kết từ môi trường sự kiện thực tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Làm Chủ Sân Khấu & Phong Thái",
                desc: "Xây dựng ngôn ngữ cơ thể, ánh mắt, cách di chuyển và tạo sức hút tự nhiên trước đám đông hàng trăm khán giả.",
              },
              {
                title: "Kỹ Thuật Giọng Nói & Nén Hơi Bụng",
                desc: "Luyện giọng nói dày, nội lực, không bị hụt hơi, không rè tiếng và kỹ thuật điều tiết khoảng cách micro hợp lý.",
              },
              {
                title: "Kỹ Năng Bắt Nhịp & Cảm Nhạc",
                desc: "Nhận diện cấu trúc bài hát của DJ, biết chính xác điểm rơi (Drop), điểm nghỉ để cất tiếng Hype đúng thời điểm.",
              },
              {
                title: "Tương Tác & Khuấy Động Khán Giả",
                desc: "Các câu Call-and-Response kinh điển, cách dẫn dắt trò chơi năng lượng và tạo làn sóng tương tác tập thể.",
              },
              {
                title: "Phối Hợp Ăn Ý Cùng DJ",
                desc: "Tạo sự kết nối nhịp nhàng giữa âm nhạc và lời dẫn, tôn vinh set nhạc của DJ và nâng tầm trải nghiệm sự kiện.",
              },
              {
                title: "Xử Lý Tình Huống Sân Khấu",
                desc: "Kỹ năng phản xạ nhanh khi có sự cố kỹ thuật, thay đổi kịch bản bất ngờ hoặc điều phối lại cảm xúc khán phòng.",
              },
            ].map((skill, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-xs font-bold text-[#22C55E] mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#F5F6F8] mb-2">{skill.title}</h3>
                  <p className="text-xs text-[#A2A8B3] leading-relaxed">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practice Environment */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#101216] border border-[#292D35] rounded-2xl p-6 sm:p-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                Môi Trường Thực Hành
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F6F8] mt-1 mb-4">
                Không Gian Studio Chuẩn Biểu Diễn
              </h2>
              <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed mb-8">
                Học viên được thực hành với micro sân khấu Shure / Sennheiser chuyên dụng, hệ thống loa biểu diễn công suất thực và âm nhạc sống động từ các DJ thực hành cùng lớp.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-xl bg-[#171A20] border border-[#292D35]">
                  <div className="text-xs font-bold text-[#F5F6F8] mb-1">Micro Chuyên Dụng</div>
                  <div className="text-[11px] text-[#747C89]">Thiết bị micro không dây cao cấp chuẩn sân khấu sự kiện.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#171A20] border border-[#292D35]">
                  <div className="text-xs font-bold text-[#F5F6F8] mb-1">Âm Thanh Sân Khấu</div>
                  <div className="text-[11px] text-[#747C89]">Hệ thống loa biểu diễn chân thực, kiểm soát phản hồi âm thanh.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#171A20] border border-[#292D35]">
                  <div className="text-xs font-bold text-[#F5F6F8] mb-1">Thực Chiến DJ-MC</div>
                  <div className="text-[11px] text-[#747C89]">Mô phỏng chân thực set diễn Nightlife / Festival âm nhạc.</div>
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
              Hệ thống cơ sở Studio và chính sách hỗ trợ học viên tại Đà Nẵng & Huế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cơ sở Đà Nẵng */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  <span className="text-xs font-extrabold text-[#22C55E] uppercase tracking-wider">Studio Đào Tạo Trực Tiếp</span>
                </div>
                <h3 className="text-xl font-bold text-[#F5F6F8] mb-3">Lớp Học MC Hype Tại Đà Nẵng</h3>
                <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed mb-4">
                  Phòng Studio hiện đại trang bị dàn âm thanh biểu diễn, micro sân khấu và sân khấu mô phỏng. Giảng viên trực tiếp kèm cặp, chỉnh sửa phát âm và ngôn ngữ cơ thể từng buổi.
                </p>
                <ul className="space-y-2 text-xs text-[#A2A8B3] mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Địa chỉ: 77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Lịch học: Ca tối và cuối tuần linh hoạt
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#22C55E]">✓</span> Thực hành kết hợp cùng DJ trực tiếp tại lớp
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
                <h3 className="text-xl font-bold text-[#F5F6F8] mb-3">Học Viên Tại Huế & Miền Trung</h3>
                <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed mb-4">
                  Dành cho học viên đam mê biểu diễn sự kiện tại Huế, Hội An, Quảng Nam và các tỉnh lân cận. Lịch học linh hoạt 1 kèm 1, hỗ trợ sắp xếp ca học tập trung theo thời gian biểu của học viên tại Huế và ngoại tỉnh, kèm bài tập rèn luyện giọng nói và tương tác online.
                </p>
                <ul className="space-y-2 text-xs text-[#A2A8B3] mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-[#38bdf8]">✓</span> V&B Studio / Showroom Huế — 442 Chi Lăng, TP. Huế
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#38bdf8]">✓</span> Lịch học 1 kèm 1 linh hoạt, thuận tiện sắp xếp thời gian
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#38bdf8]">✓</span> Hỗ trợ kết nối cơ hội diễn tại các sự kiện miền Trung
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
              Câu Hỏi Thường Gặp Về Khóa Dạy Học MC Hype
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Những điều cần biết khi bắt đầu theo đuổi nghề MC Hype sự kiện tại Đà Nẵng & Huế.
            </p>
          </div>

          <div className="space-y-4">
            {mcCourseFaqs.map((faq, idx) => (
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
              Đăng Ký Tư Vấn & Kiểm Tra Chất Giọng
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3] max-w-xl mx-auto mb-6">
              Liên hệ ngay để nhận thông tin lịch học, kiểm tra chất giọng và nhận lộ trình rèn luyện phù hợp nhất.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:0706067799"
                className="px-6 py-3 rounded-full bg-[#22C55E] text-[#08090B] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22C55E]/20"
              >
                Hotline (Mr. Vân): 0706 067 799
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[#171A20] border border-[#292D35] text-[#F5F6F8] text-xs sm:text-sm font-bold hover:bg-[#20242D] hover:border-[#3A404B] transition-colors"
              >
                Gửi Tin Nhắn Đăng Ký
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
