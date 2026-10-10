import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

const djCourseFaqs = [
  {
    q: "Người mới bắt đầu chưa có kiến thức nhạc lý có học DJ được không?",
    a: "Hoàn toàn học được. Chương trình dạy học DJ tại V&B Studio được thiết kế trực quan, bắt đầu từ cảm nhận nhịp điệu (BPM, Bar, Beat) và cấu trúc bài nhạc điện tử thực tế. Bạn không cần có nền tảng nhạc lý cổ điển hay biết chơi nhạc cụ trước đó.",
  },
  {
    q: "Học viên có được thực hành trực tiếp trên thiết bị DJ thực tế không?",
    a: "100% thời lượng các buổi học đều là thực hành thực tế. Học viên được trực tiếp thao tác trên các dàn thiết bị tiêu chuẩn Club như Pioneer CDJ-3000, DJM-900NXS2, Pioneer XDJ-RX3 và AlphaTheta Omnis-Duo.",
  },
  {
    q: "Thời gian và lịch học DJ được sắp xếp như thế nào?",
    a: "Lịch học linh hoạt theo hình thức 1 kèm 1 trực tiếp. Học viên có thể chủ động chọn ca học sáng, chiều hoặc tối (từ thứ 2 đến chủ nhật) phù hợp với lịch làm việc và học tập cá nhân.",
  },
  {
    q: "Học viên tại Huế hoặc các tỉnh lân cận có thể tham gia khóa học như thế nào?",
    a: "V&B Studio có cơ sở trực tiếp tại 442 Chi Lăng - TP. Huế. Học viên tại Huế được học trực tiếp trên dàn máy chuẩn Club với giảng viên Mr. Tuấn (0944.498.987) và Mr. Vân (0706.067.799).",
  },
  {
    q: "Học viên có được hỗ trợ kho nhạc và phần mềm Rekordbox không?",
    a: "Có. Học viên được tặng trọn bộ kho nhạc chất lượng cao độc quyền (House, Tech House, Vinahouse, Hip-hop, EDM), hướng dẫn cài đặt và sử dụng bản quyền phần mềm Rekordbox / Serato DJ trọn đời.",
  },
  {
    q: "Địa chỉ 2 cơ sở đào tạo của V&B Studio ở đâu?",
    a: "Cơ sở Đà Nẵng đặt tại 77 Nguyễn Tất Thành, phường Hải Châu, TP. Đà Nẵng. Cơ sở Huế đặt tại 442 Chi Lăng, TP. Huế, Thừa Thiên Huế.",
  },
];

export default function DayHocDjPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${baseUrl}/day-hoc-dj#course`,
        name: "Khóa Dạy Học DJ Thực Hành 1 Kèm 1 Tại Đà Nẵng & Huế - V&B Studio",
        description:
          "Học viện DJ V&B Studio đào tạo DJ thực chiến 1 kèm 1 trên Pioneer CDJ-3000 & DJM-900 tại Đà Nẵng (77 Nguyễn Tất Thành) và Huế (442 Chi Lăng): Beatmatching, EQ Mixing, Transitions, Loop & FX, quản lý Rekordbox và kỹ năng biểu diễn sân khấu chuyên nghiệp.",
        provider: {
          "@type": "Organization",
          name: "V&B Studio Professional DJ Academy (VanBass Music Center)",
          url: baseUrl,
        },
      },
      {
        "@type": "Service",
        "@id": `${baseUrl}/day-hoc-dj#service`,
        name: "Dạy Học DJ Thực Hành Chuyên Nghiệp 1 Kèm 1",
        serviceType: "Đào tạo kỹ năng DJ & Âm nhạc điện tử",
        provider: {
          "@type": "LocalBusiness",
          name: "V&B Studio DJ Academy",
          telephone: ["+84935015424", "+84706067799", "+84944498987"],
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "77 Nguyễn Tất Thành, phường Hải Châu",
              addressLocality: "Hải Châu",
              addressRegion: "Đà Nẵng",
              addressCountry: "VN",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "442 Chi Lăng",
              addressLocality: "TP. Huế",
              addressRegion: "Thừa Thiên Huế",
              addressCountry: "VN",
            },
          ],
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
    <div className="min-h-screen bg-[#08090B] text-[#F5F6F8] flex flex-col font-sans selection:bg-[#22C55E]/30 selection:text-[#F5F6F8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Header />

      <main className="flex-1 pt-20 sm:pt-24 pb-20">
        {/* Breadcrumb Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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

        {/* 1. HERO BANNER SECTION (FULL SCREEN WIDESCREEN - KHÔNG ĐÓNG KHUNG) */}
        <section className="w-full relative bg-[#08090B] mb-16 sm:mb-20">
          {/* Full Screen Banner Container */}
          <div className="w-full relative bg-[#08090B] flex items-center justify-center overflow-hidden border-b border-[#292D35]">
            <div className="w-full max-w-[2000px] relative flex justify-center">
              <Image
                src="/images/academy/hero_banner_optimal.png"
                alt="Khóa Học DJ Toàn Diện - V&B Studio Professional DJ Academy"
                width={1920}
                height={1080}
                priority
                unoptimized
                sizes="100vw"
                className="w-full h-auto max-h-[85vh] 2xl:max-h-[90vh] object-contain object-center"
              />
            </div>
          </div>
        </section>

        {/* 2. SECTION 2 - GALLERY ẢNH HỌC VIÊN THỰC CHIẾN TẠI V&B STUDIO */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] text-xs font-bold tracking-wider uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                Student Gallery • V&B Studio
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] tracking-tight">
                Học Viên V&B Studio Thực Chiến
              </h2>
              <p className="text-xs sm:text-sm text-[#A2A8B3] mt-2 max-w-2xl leading-relaxed">
                Khoảnh khắc thực tế từ các buổi đào tạo 1 kèm 1 và luyện tập biểu diễn trên dàn máy chuẩn Club tại Studio.
              </p>
            </div>
            <div>
              <a
                href="#courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171A20] border border-[#292D35] hover:border-[#22C55E]/50 text-xs sm:text-sm font-bold text-[#F5F6F8] hover:text-[#22C55E] transition-all"
              >
                <span>Xem 3 Khóa Học</span>
                <span className="text-xs">↓</span>
              </a>
            </div>
          </div>

          {/* Artistic Mosaic Gallery - Nhiều kích cỡ dọc, ngang, to, nhỏ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[220px]">
            {/* Block 1: To ngang (2x2) + Dọc (1x2) + 2 Nhỏ ngang (1x1) */}
            <div className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_coaching_1on1.jpg"
                alt="Giảng viên hướng dẫn 1 kèm 1 thực chiến trên dàn Pioneer DJ"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-xs font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Đào tạo 1 kèm 1 thực chiến
              </div>
            </div>

            <div className="col-span-1 row-span-2 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_vertical_1.jpg"
                alt="Học viên luyện tập độc lập trên bàn DJ chuyên nghiệp"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Thực hành độc lập
              </div>
            </div>

            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_female_duo.jpg"
                alt="Học viên nữ trải nghiệm và đam mê âm nhạc"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Học viên nữ & Trải nghiệm
              </div>
            </div>

            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_turntable_scratch.jpg"
                alt="Kỹ thuật Turntable & Scratch mâm đĩa than"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Turntable & Scratch
              </div>
            </div>

            {/* Block 2: Dọc (1x2) + To ngang nhóm (2x2) + 2 Nhỏ ngang (1x1) */}
            <div className="col-span-1 row-span-2 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_vertical_2.jpg"
                alt="Học viên nữ tự tin bên dàn thiết bị DJ"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Làm chủ thiết bị
              </div>
            </div>

            <div className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_graduation_group.jpg"
                alt="Cộng đồng học viên và giảng viên tại V&B Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-xs font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Cộng đồng V&B Studio
              </div>
            </div>

            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_dj_shades.jpg"
                alt="Định hình cá tính và phong cách DJ"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Phong cách biểu diễn
              </div>
            </div>

            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_lesson_notes.jpg"
                alt="Phân tích cấu trúc bài hát và xây dựng setlist"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Cấu trúc & Flow nhạc
              </div>
            </div>

            {/* Block 3: Dọc trái (1x2) + 2 Nhỏ giữa (1x1) + Dọc phải (1x2) + 2 Nhỏ tiếp theo */}
            <div className="col-span-1 row-span-2 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_vertical_3.jpg"
                alt="Cầm tay chỉ việc từng thao tác kỹ thuật"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Cầm tay chỉ việc
              </div>
            </div>

            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_expat_duo.jpg"
                alt="Học viên quốc tế theo học tại V&B Studio"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Học viên quốc tế
              </div>
            </div>

            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_white_sweater.jpg"
                alt="Nụ cười và năng lượng tích cực tại lớp học"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Năng lượng tích cực
              </div>
            </div>

            <div className="col-span-1 row-span-2 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_vertical_4.jpg"
                alt="Học viên tập trung phối nhạc và cảm âm"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Kỹ năng cảm âm
              </div>
            </div>

            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_mixing_young.jpg"
                alt="Học viên thực hành mixing chuyên sâu"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Thực chiến mixing
              </div>
            </div>

            <div className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-[#292D35] bg-[#101216] hover:border-[#22C55E]/60 transition-all duration-300">
              <Image
                src="/images/students/student_mixing_pro.jpg"
                alt="Phối nhạc trên dàn âm thanh Club thực tế"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#08090B]/80 backdrop-blur-md border border-[#292D35] text-[11px] font-semibold text-[#F5F6F8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Âm thanh chuẩn Club
              </div>
            </div>
          </div>
        </section>

        {/* 3. SECTION 3 - HỆ THỐNG 3 KHÓA HỌC CHUYÊN SÂU */}
        <section id="courses" className="py-16 sm:py-20 bg-[#0B0D11] border-y border-[#292D35] mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] text-xs font-bold tracking-wider uppercase mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Chương Trình Đào Tạo Chuẩn Quốc Tế
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F6F8] tracking-tight">
                  Hệ Thống 3 Khóa Học DJ Chuyên Sâu
                </h2>
                <p className="text-xs sm:text-sm text-[#A2A8B3] mt-2 max-w-2xl leading-relaxed">
                  Được thiết kế từ bài bản đến chuyên nghiệp, cam kết học viên tự tin đứng sau bàn DJ và làm chủ mọi thiết bị.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs font-bold text-[#22C55E] self-start md:self-auto">
                <span>✓</span>
                <span>Tặng 100% tài liệu & bộ nhạc DJ độc quyền</span>
              </div>
            </div>

            {/* 3 Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* KHÓA 1: CƠ BẢN */}
              <div className="flex flex-col rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-all overflow-hidden">
                <div className="relative w-full aspect-[4/3] bg-[#171A20]">
                  <Image
                    src="/images/academy/course_basic.jpg"
                    alt="Khoá DJ Cơ Bản - Build Your Foundation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#171A20] border border-[#292D35] text-[#A2A8B3]">
                      Module 01
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8]">
                      Người Mới Bắt Đầu
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#F5F6F8]">Khoá DJ Cơ Bản</h3>
                  <div className="text-xs font-bold text-[#22C55E] uppercase tracking-wider mt-1 mb-3">
                    Build Your Foundation
                  </div>
                  <p className="text-xs text-[#A2A8B3] leading-relaxed mb-5 min-h-[36px]">
                    Dành cho người mới bắt đầu và muốn xây dựng nền tảng DJ bài bản, đúng kỹ thuật ngay từ những ngày đầu.
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-[#292D35] mb-6 flex-1 text-xs text-[#D1D5DB]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Làm quen với DJ Controller, CDJ & Mixer chuyên nghiệp</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Nắm vững Beatmatching, Phrasing & Mixing cơ bản bằng tai</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Làm quen với Serato / Rekordbox và quản lý thư viện nhạc</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Học cách lựa chọn bài, tính BPM & xây dựng Flow cho set nhạc</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Thực hành liên tục trên thiết bị DJ chuẩn club</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Hoàn thiện mixset cá nhân và định hình phong cách riêng</span>
                    </li>
                  </ul>

                  <div className="p-3.5 rounded-xl bg-[#14171E] border border-[#292D35] mb-6">
                    <div className="text-[10px] font-extrabold text-[#FACC15] uppercase tracking-wider mb-1">
                      Mục Tiêu Đầu Ra
                    </div>
                    <div className="text-xs text-[#F5F6F8] leading-relaxed">
                      Từ một người chưa biết DJ → Tự tin đứng sau bàn DJ và thực hiện trọn vẹn một set nhạc hoàn chỉnh.
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#292D35] flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <span className="text-[11px] text-[#747C89] block">Thời lượng</span>
                      <strong className="text-xs text-[#F5F6F8]">12 - 16 Buổi (1 Kèm 1)</strong>
                    </div>
                    <a
                      href="tel:0935015424"
                      className="px-4 py-2 rounded-xl bg-[#171A20] hover:bg-[#22C55E] hover:text-[#08090B] border border-[#292D35] hover:border-[#22C55E] text-xs font-bold text-[#F5F6F8] transition-all"
                    >
                      Đăng Ký Khóa 01
                    </a>
                  </div>
                </div>
              </div>

              {/* KHÓA 2: NÂNG CAO (HIGHLIGHTED) */}
              <div className="flex flex-col rounded-2xl bg-[#101216] border-2 border-[#22C55E] shadow-xl shadow-[#22C55E]/10 relative overflow-hidden">
                <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-[#22C55E] text-[#08090B] text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  Phổ Biến Nhất
                </div>
                <div className="relative w-full aspect-[4/3] bg-[#171A20]">
                  <Image
                    src="/images/academy/course_advanced.jpg"
                    alt="Khoá DJ Nâng Cao - Level Up Your Skills"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#171A20] border border-[#292D35] text-[#A2A8B3]">
                      Module 02
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                      All-in-One Toàn Diện
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#F5F6F8]">Khoá DJ Nâng Cao</h3>
                  <div className="text-xs font-bold text-[#22C55E] uppercase tracking-wider mt-1 mb-3">
                    Level Up Your Skills
                  </div>
                  <p className="text-xs text-[#A2A8B3] leading-relaxed mb-5 min-h-[36px]">
                    Dành cho học viên đã có nền tảng DJ hoặc đã hoàn thành Khoá Cơ Bản, muốn nâng tầm kỹ năng biểu diễn thực tế.
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-[#292D35] mb-6 flex-1 text-xs text-[#D1D5DB]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Lộ trình All-in-One: Nền tảng → Kỹ thuật → Biểu diễn</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Kết hợp lý thuyết + thực hành liên tục trên thiết bị chuẩn Club</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Định hướng 1:1 theo mục tiêu và gu âm nhạc của từng học viên</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Phát triển kỹ năng Mixing, Performance & DJ Set Building</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Thực hành và trải nghiệm môi trường biểu diễn thực tế</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Đồng hành xây dựng hình ảnh cá nhân & định hướng nghề</span>
                    </li>
                  </ul>

                  <div className="p-3.5 rounded-xl bg-[#14171E] border border-[#22C55E]/30 mb-6">
                    <div className="text-[10px] font-extrabold text-[#22C55E] uppercase tracking-wider mb-1">
                      Mục Tiêu Đầu Ra
                    </div>
                    <div className="text-xs text-[#F5F6F8] leading-relaxed">
                      Xây dựng trọn vẹn nền tảng kỹ năng - tư duy - hình ảnh để sẵn sàng bước vào môi trường DJ chuyên nghiệp.
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#292D35] flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <span className="text-[11px] text-[#747C89] block">Thời lượng</span>
                      <strong className="text-xs text-[#F5F6F8]">20 - 24 Buổi (1 Kèm 1)</strong>
                    </div>
                    <a
                      href="tel:0935015424"
                      className="px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#4ade80] text-[#08090B] text-xs font-extrabold transition-all shadow-md shadow-[#22C55E]/20"
                    >
                      Đăng Ký Khóa 02
                    </a>
                  </div>
                </div>
              </div>

              {/* KHÓA 3: TOÀN DIỆN */}
              <div className="flex flex-col rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-all overflow-hidden">
                <div className="relative w-full aspect-[4/3] bg-[#171A20]">
                  <Image
                    src="/images/academy/course_comprehensive.jpg"
                    alt="Khoá DJ Toàn Diện - Become The DJ"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#171A20] border border-[#292D35] text-[#A2A8B3]">
                      Module 03
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FACC15]/10 border border-[#FACC15]/30 text-[#FACC15]">
                      Chuyên Gia Biểu Diễn
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#F5F6F8]">Khoá DJ Toàn Diện</h3>
                  <div className="text-xs font-bold text-[#22C55E] uppercase tracking-wider mt-1 mb-3">
                    Become The DJ
                  </div>
                  <p className="text-xs text-[#A2A8B3] leading-relaxed mb-5 min-h-[36px]">
                    Lộ trình đào tạo toàn diện dành cho những ai muốn theo đuổi con đường DJ một cách nghiêm túc và đẳng cấp.
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-[#292D35] mb-6 flex-1 text-xs text-[#D1D5DB]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Nâng cao Mixing Technique & Musicality chuyên sâu</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Phát triển tư duy xử lý và xây dựng DJ Set đỉnh cao</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Thành thạo Mixing đa thể loại, biến thiên BPM & Acapella</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Kỹ thuật Creative Mixing & Advanced Transitions</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Làm chủ CDJ-3000 / DJM-A9 / DJ Controller theo chuẩn Club</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#22C55E] font-bold">✓</span>
                      <span>Cập nhật kỹ thuật biểu diễn và xu hướng DJ hiện đại</span>
                    </li>
                  </ul>

                  <div className="p-3.5 rounded-xl bg-[#14171E] border border-[#292D35] mb-6">
                    <div className="text-[10px] font-extrabold text-[#FACC15] uppercase tracking-wider mb-1">
                      Mục Tiêu Đầu Ra
                    </div>
                    <div className="text-xs text-[#F5F6F8] leading-relaxed">
                      Không chỉ &quot;mix được nhạc&quot;, mà biết xây dựng một set có cá tính, có câu chuyện và mang đậm dấu ấn riêng.
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#292D35] flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <span className="text-[11px] text-[#747C89] block">Thời lượng</span>
                      <strong className="text-xs text-[#F5F6F8]">Toàn diện không giới hạn</strong>
                    </div>
                    <a
                      href="tel:0935015424"
                      className="px-4 py-2 rounded-xl bg-[#171A20] hover:bg-[#22C55E] hover:text-[#08090B] border border-[#292D35] hover:border-[#22C55E] text-xs font-bold text-[#F5F6F8] transition-all"
                    >
                      Đăng Ký Khóa 03
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECTION 4 - THÔNG TIN CƠ SỞ & GIẢNG VIÊN TRỰC TIẾP */}
        <section id="campuses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] text-xs font-bold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              Studio & Mentors
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] tracking-tight">
              Hệ Thống Cơ Sở & Giảng Viên Trực Tiếp
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3] mt-2 max-w-2xl leading-relaxed">
              Học viên được thực hành tại 2 studio chuyên nghiệp ở Đà Nẵng và Huế dưới sự hướng dẫn trực tiếp 1 kèm 1 từ đội ngũ DJ giàu kinh nghiệm sân khấu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Cột 1: 2 Cơ Sở (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Cơ sở Đà Nẵng */}
              <div className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    <span className="text-[11px] font-bold text-[#22C55E] uppercase tracking-wider">
                      Cơ Sở Đà Nẵng
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F6F8] mb-2">
                    VanBass Studio Đà Nẵng
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-[#D1D5DB] mb-4">
                    <span className="text-[#22C55E]">📍</span>
                    <span><strong>77 Nguyễn Tất Thành</strong>, phường Hải Châu, TP. Đà Nẵng</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-[#A2A8B3]">
                    <span className="px-2.5 py-1 rounded bg-[#171A20] border border-[#292D35]">Dàn CDJ-3000</span>
                    <span className="px-2.5 py-1 rounded bg-[#171A20] border border-[#292D35]">DJM-900NXS2</span>
                    <span className="px-2.5 py-1 rounded bg-[#171A20] border border-[#292D35]">Phòng tập âm học</span>
                    <span className="px-2.5 py-1 rounded bg-[#171A20] border border-[#292D35]">Máy lạnh 24/7</span>
                  </div>
                </div>
              </div>

              {/* Cơ sở Huế */}
              <div className="p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                    <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                      Cơ Sở Thừa Thiên Huế
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F6F8] mb-2">
                    V&B Studio Huế
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-[#D1D5DB] mb-4">
                    <span className="text-[#38BDF8]">📍</span>
                    <span><strong>442 Chi Lăng</strong>, TP. Huế, Thừa Thiên Huế</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-[#A2A8B3]">
                    <span className="px-2.5 py-1 rounded bg-[#171A20] border border-[#292D35]">Standalone XDJ</span>
                    <span className="px-2.5 py-1 rounded bg-[#171A20] border border-[#292D35]">Loa Pro Audio</span>
                    <span className="px-2.5 py-1 rounded bg-[#171A20] border border-[#292D35]">Ánh sáng studio</span>
                    <span className="px-2.5 py-1 rounded bg-[#171A20] border border-[#292D35]">Lịch học linh hoạt</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột 2: Đội Ngũ Giảng Viên (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#101216] border border-[#292D35] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] text-xs font-bold tracking-wider uppercase mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Direct Mentorship
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F6F8] tracking-tight mb-2">
                  Đội Ngũ Giảng Viên Trực Tiếp Hướng Dẫn
                </h3>
                <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed mb-6">
                  Cam kết kèm 1:1, cầm tay chỉ việc, theo sát lộ trình và sự tiến bộ của từng học viên cho đến khi tự tin biểu diễn sân khấu.
                </p>

                {/* 3 Giảng Viên Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Mr. Chung */}
                  <div className="p-4 rounded-xl bg-[#0E1014] border border-[#292D35] hover:border-[#22C55E]/50 transition-all text-center">
                    <div className="w-12 h-12 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                      MC
                    </div>
                    <div className="text-sm font-bold text-[#F5F6F8]">Mr. Chung</div>
                    <div className="text-[11px] text-[#747C89] mt-1 mb-3 min-h-[32px] leading-tight">
                      Mixing & Club Performance
                    </div>
                    <a
                      href="tel:0935015424"
                      className="inline-block px-3 py-1 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold hover:bg-[#22C55E] hover:text-[#08090B] transition-colors"
                    >
                      0935.015.424
                    </a>
                  </div>

                  {/* Mr. Vân */}
                  <div className="p-4 rounded-xl bg-[#0E1014] border border-[#292D35] hover:border-[#22C55E]/50 transition-all text-center">
                    <div className="w-12 h-12 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                      MV
                    </div>
                    <div className="text-sm font-bold text-[#F5F6F8]">Mr. Vân</div>
                    <div className="text-[11px] text-[#747C89] mt-1 mb-3 min-h-[32px] leading-tight">
                      Beatmatch & Sound Structure
                    </div>
                    <a
                      href="tel:0706067799"
                      className="inline-block px-3 py-1 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold hover:bg-[#22C55E] hover:text-[#08090B] transition-colors"
                    >
                      0706.067.799
                    </a>
                  </div>

                  {/* Mr. Tuấn */}
                  <div className="p-4 rounded-xl bg-[#0E1014] border border-[#292D35] hover:border-[#22C55E]/50 transition-all text-center">
                    <div className="w-12 h-12 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                      MT
                    </div>
                    <div className="text-sm font-bold text-[#F5F6F8]">Mr. Tuấn</div>
                    <div className="text-[11px] text-[#747C89] mt-1 mb-3 min-h-[32px] leading-tight">
                      Creative DJ & Stage Presence
                    </div>
                    <a
                      href="tel:0944498987"
                      className="inline-block px-3 py-1 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold hover:bg-[#22C55E] hover:text-[#08090B] transition-colors"
                    >
                      0944.498.987
                    </a>
                  </div>
                </div>
              </div>

              {/* Consultation Sub-banner */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#13171F] to-[#171D26] border border-[#292D35] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#F5F6F8]">
                    Bạn chưa biết nên bắt đầu từ khóa học nào?
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#A2A8B3] mt-0.5">
                    Liên hệ ngay với giảng viên để được xếp lịch test trình độ và học thử 1 buổi miễn phí.
                  </div>
                </div>
                <a
                  href="tel:0935015424"
                  className="px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#4ade80] text-[#08090B] text-xs font-extrabold transition-colors flex-shrink-0"
                >
                  Liên Hệ Xếp Lịch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ SECTION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
              Giải Đáp Thắc Mắc
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F6F8] mt-1 mb-2">
              Câu Hỏi Thường Gặp Về Khóa Học DJ
            </h2>
            <p className="text-xs sm:text-sm text-[#A2A8B3]">
              Những thắc mắc phổ biến của học viên khi bắt đầu tham gia lớp học DJ tại Đà Nẵng & Huế.
            </p>
          </div>

          <div className="space-y-4">
            {djCourseFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#101216] border border-[#292D35] hover:border-[#3A404B] transition-colors"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#F5F6F8] mb-2 flex items-start gap-2">
                  <span className="text-[#22C55E] font-extrabold">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. BOTTOM CTA CONSULTATION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-b from-[#101216] to-[#0A0C0F] border border-[#292D35] p-8 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.08),_transparent_70%)]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-[#171A20] border border-[#292D35] text-[#22C55E] text-xs font-bold tracking-wider uppercase mb-4">
                V&B Studio Professional DJ Academy
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F6F8] mb-4 tracking-tight">
                Bắt Đầu Hành Trình Âm Nhạc DJ Của Bạn Ngay Hôm Nay
              </h2>
              <p className="text-xs sm:text-sm text-[#A2A8B3] leading-relaxed mb-8">
                Đặt lịch hẹn ghé thăm studio, trải nghiệm dàn thiết bị Pioneer CDJ-3000 thực tế và nhận tư vấn định hướng lộ trình học 1 kèm 1 tối ưu nhất.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:0935015424"
                  className="px-6 py-3.5 rounded-full bg-[#22C55E] text-[#08090B] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-all shadow-lg shadow-[#22C55E]/20"
                >
                  Tư Vấn Trực Tiếp (Mr. Chung): 0935.015.424
                </a>
                <Link
                  href="/thue-ban-dj"
                  className="px-6 py-3.5 rounded-full bg-[#171A20] border border-[#292D35] text-[#F5F6F8] text-xs sm:text-sm font-bold hover:bg-[#20242D] hover:border-[#3A404B] transition-colors"
                >
                  Thuê Bàn DJ Tập Luyện Tại Nhà
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
