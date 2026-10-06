import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

const mcFaqs = [
  {
    q: "MC Hype khác gì so với MC truyền thống?",
    a: "MC truyền thống tập trung vào dẫn dắt nội dung kịch bản, lễ nghi. Trong khi đó, MC Hype (Hype Man) là người trực tiếp khuấy động năng lượng đám đông, tương tác với khán giả trên nền nhạc của DJ, tạo điểm nhấn tại các đoạn Build-up / Drop và giữ lửa cho không khí sự kiện, Nightlife hoặc Festival.",
  },
  {
    q: "Người có giọng nói yếu hoặc chưa tự tin trước đám đông có học được không?",
    a: "Có. Khóa học có các bài tập chuyên sâu về nén hơi bụng, mở khẩu hình, kiểm soát cao độ và kỹ thuật sử dụng Micro sân khấu. Giảng viên sẽ chỉnh sửa từng phát âm và hướng dẫn các kỹ thuật tương tác tâm lý đám đông từ đơn giản đến nâng cao.",
  },
  {
    q: "Học viên có được thực hành phối hợp trực tiếp cùng DJ không?",
    a: "Có. Điểm đặc biệt tại VanBass là môi trường tích hợp cả DJ và MC. Học viên được trực tiếp đứng trên sân khấu Studio, cầm mic và phối hợp ăn ý theo từng nhịp drop bài nhạc của DJ thực tế.",
  },
  {
    q: "Thời lượng và địa điểm học như thế nào?",
    a: "Khóa học được tổ chức linh hoạt theo buổi tối hoặc cuối tuần tại Studio VanBass Music Center, số 77 Nguyễn Tất Thành, Quận Thanh Khê, TP. Đà Nẵng.",
  },
];

export default function DaoTaoMcHypePage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${baseUrl}/dao-tao-mc-hype#course`,
        name: "Khóa Đào Tạo MC / Hype Sự Kiện Chuyên Nghiệp Đà Nẵng",
        description:
          "Chương trình đào tạo MC Hype sự kiện, Nightlife & Festival tại Đà Nẵng: Kỹ thuật giọng nói, phong thái sân khấu, bắt nhịp nhạc và phối hợp ăn ý cùng DJ.",
        provider: {
          "@type": "Organization",
          name: "VanBass Music Center",
          url: baseUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/dao-tao-mc-hype#breadcrumb`,
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
            name: "Đào tạo MC Hype sự kiện",
            item: `${baseUrl}/dao-tao-mc-hype`,
          },
        ],
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
            <Link href="/dich-vu" className="hover:text-[#22c55e] transition-colors">
              Dịch vụ
            </Link>
            <span>/</span>
            <span className="text-[#e4e4e7] font-semibold">Đào tạo MC / Hype Sự Kiện</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181920] border border-[#272a33] text-[#22c55e] text-xs font-bold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                VanBass Academy • Biểu Diễn Sân Khấu
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffffff] tracking-tight leading-tight mb-4">
                Đào Tạo MC / Hype Sự Kiện Tại Đà Nẵng
              </h1>
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed mb-6">
                Rèn luyện giọng nói nội lực, kỹ thuật cầm mic chuyên nghiệp, phong thái tự tin trên sân khấu và kỹ năng khuấy động đám đông trên nền nhạc DJ tại các sự kiện Nightlife, Pool Party và Festival âm nhạc.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:0706067799"
                  className="px-6 py-3 rounded-full bg-[#22c55e] text-[#000000] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22c55e]/20"
                >
                  Tư Vấn Khóa Học: 0706 067 799
                </a>
                <Link
                  href="/dich-vu"
                  className="px-6 py-3 rounded-full bg-[#181920] border border-[#373a47] text-[#ffffff] text-xs sm:text-sm font-bold hover:bg-[#232530] transition-colors"
                >
                  Xem Hệ Sinh Thái Dịch Vụ
                </Link>
              </div>
            </div>

            {/* Visual Photography Placeholder */}
            <div className="lg:col-span-5">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#272a34] shadow-2xl bg-[#111217]">
                <Image
                  src="/images/services/mc_hype_hero.jpg"
                  alt="Không gian thực hành sân khấu và đào tạo MC Hype tại VanBass Đà Nẵng"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#000000]/75 backdrop-blur-md border border-[#ffffff]/10 text-xs text-[#d4d4d8]">
                  <span className="font-bold text-[#22c55e]">Thực Hành Thực Tế:</span> Luyện giọng và tương tác sân khấu cùng DJ.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Skill Modules */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#22c55e] uppercase tracking-wider">
              Kỹ Năng Đào Tạo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] mt-1 mb-2">
              Các Kỹ Năng Cốt Lõi Của MC Hype
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa]">
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
                title: "Kỹ Thuật Giọng Nói & Nén Hơi",
                desc: "Luyện giọng nói dày, nội lực, không bị hụt hơi, không rè tiếng và kỹ thuật điều tiết âm lượng micro hợp lý.",
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
                className="p-6 rounded-2xl bg-[#121318] border border-[#23252f] flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-xs font-bold text-[#22c55e] mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#ffffff] mb-2">{skill.title}</h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practice Environment */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#111217] border border-[#23252f] rounded-2xl p-6 sm:p-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-bold text-[#22c55e] uppercase tracking-wider">
                Môi Trường Thực Hành
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff] mt-1 mb-4">
                Không Gian Studio Chuẩn Biểu Diễn
              </h2>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-8">
                Học viên được thực hành với micro sân khấu Shure / Sennheiser chuyên dụng, hệ thống loa biểu diễn công suất thực và âm nhạc sống động từ các DJ thực hành cùng lớp.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-xl bg-[#171820] border border-[#262833]">
                  <div className="text-xs font-bold text-[#ffffff] mb-1">Micro Chuyên Dụng</div>
                  <div className="text-[11px] text-[#71717a]">Thiết bị micro không dây cao cấp chuẩn sân khấu sự kiện.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#171820] border border-[#262833]">
                  <div className="text-xs font-bold text-[#ffffff] mb-1">Âm Thanh Sân Khấu</div>
                  <div className="text-[11px] text-[#71717a]">Hệ thống loa biểu diễn chân thực, kiểm soát phản hồi âm thanh.</div>
                </div>
                <div className="p-4 rounded-xl bg-[#171820] border border-[#262833]">
                  <div className="text-xs font-bold text-[#ffffff] mb-1">Thực Chiến DJ-MC</div>
                  <div className="text-[11px] text-[#71717a]">Mô phỏng chân thực set diễn Nightlife / Festival âm nhạc.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#22c55e] uppercase tracking-wider">
              Giải Đáp Thắc Mắc
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] mt-1 mb-2">
              Câu Hỏi Thường Gặp Về Khóa MC Hype
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa]">
              Những điều cần biết khi bắt đầu theo đuổi nghề MC Hype sự kiện.
            </p>
          </div>

          <div className="space-y-4">
            {mcFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#121318] border border-[#23252f]"
              >
                <h3 className="text-sm font-bold text-[#ffffff] mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Consultation Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#13141a] via-[#1a1b24] to-[#13141a] border border-[#2b2e3b] p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] mb-3">
              Đăng Ký Tư Vấn Khóa Đào Tạo MC Hype
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto mb-6">
              Liên hệ ngay để nhận thông tin lịch học, kiểm tra chất giọng và nhận lộ trình rèn luyện phù hợp nhất.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:0706067799"
                className="px-6 py-3 rounded-full bg-[#22c55e] text-[#000000] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22c55e]/20"
              >
                Hotline Tư Vấn: 0706 067 799
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-[#181920] border border-[#373a47] text-[#ffffff] text-xs sm:text-sm font-bold hover:bg-[#232530] transition-colors"
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
