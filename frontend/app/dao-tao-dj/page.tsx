import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

const courseFaqs = [
  {
    q: "Người mới bắt đầu chưa có kiến thức nhạc lý có học được DJ không?",
    a: "Hoàn toàn học được. Chương trình đào tạo tại VanBass được thiết kế bắt đầu từ nền tảng cảm âm, nhận diện nhịp điệu (BPM, Bar, Beat) và cấu trúc bài nhạc một cách trực quan, giúp người mới nhanh chóng làm quen mà không yêu cầu nền tảng nhạc lý học thuật phức tạp.",
  },
  {
    q: "Học viên có được thực hành trực tiếp trên thiết bị thực tế không?",
    a: "100% thời lượng các buổi học tại VanBass đều là thực hành trực tiếp trên các dòng bàn DJ chuyên nghiệp như Pioneer DDJ-FLX4, Pioneer XDJ-RX3, AlphaTheta Omnis-Duo và hệ thống CDJ/Mixer tiêu chuẩn.",
  },
  {
    q: "Thời gian và lịch học DJ được sắp xếp như thế nào?",
    a: "Lịch học linh hoạt theo hình thức 1 kèm 1 hoặc nhóm nhỏ, được sắp xếp phù hợp với thời gian rảnh của học viên (ca sáng, chiều hoặc tối các ngày trong tuần).",
  },
  {
    q: "Học viên có được hỗ trợ kho nhạc và phần mềm quản lý bài hát không?",
    a: "Học viên được hướng dẫn cài đặt phần mềm Rekordbox / Serato DJ, cách xuất file nhạc USB chuẩn Club và nhận trọn bộ kho nhạc phân loại theo các thể loại phổ biến (EDM, House, Tech House, Vinahouse, Hip-hop).",
  },
  {
    q: "Địa điểm học DJ tại Đà Nẵng ở đâu?",
    a: "Các buổi học thực hành diễn ra trực tiếp tại Showroom & Studio VanBass Music Center, số 77 Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê, TP. Đà Nẵng.",
  },
];

export default function DaoTaoDjPage() {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${baseUrl}/dao-tao-dj#course`,
        name: "Khóa Đào Tạo DJ Thực Hành Chuyên Sâu Tại Đà Nẵng",
        description:
          "Chương trình đào tạo DJ thực hành 1 kèm 1 trên thiết bị Pioneer DJ & AlphaTheta tại Đà Nẵng: Beatmatching, EQ Mixing, Transitions, quản lý thư viện Rekordbox và kỹ năng biểu diễn sân khấu.",
        provider: {
          "@type": "Organization",
          name: "VanBass Music Center",
          url: baseUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/dao-tao-dj#breadcrumb`,
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
            name: "Đào tạo DJ thực hành",
            item: `${baseUrl}/dao-tao-dj`,
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
            <span className="text-[#e4e4e7] font-semibold">Đào tạo DJ thực hành</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181920] border border-[#272a33] text-[#22c55e] text-xs font-bold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                VanBass DJ Academy • Đà Nẵng
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffffff] tracking-tight leading-tight mb-4">
                Đào Tạo DJ Thực Hành Tại Đà Nẵng
              </h1>
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed mb-6">
                Chương trình học DJ thực tế 1 kèm 1, tập trung rèn luyện đôi tai cảm âm, kỹ năng beatmatch thủ công, phối hợp EQ & Effect và tư duy xây dựng Set nhạc chuyên nghiệp trên các dòng bàn DJ Pioneer DJ & AlphaTheta tiêu chuẩn.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:0706067799"
                  className="px-6 py-3 rounded-full bg-[#22c55e] text-[#000000] text-xs sm:text-sm font-extrabold hover:bg-[#4ade80] transition-colors shadow-lg shadow-[#22c55e]/20"
                >
                  Tư Vấn Lộ Trình: 0706 067 799
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
                  src="/images/services/dj_academy_hero.jpg"
                  alt="Không gian phòng tập và đào tạo DJ thực hành tại VanBass Đà Nẵng"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#000000]/75 backdrop-blur-md border border-[#ffffff]/10 text-xs text-[#d4d4d8]">
                  <span className="font-bold text-[#22c55e]">Studio Thực Hành:</span> Hệ thống bàn DJ Pioneer DJ & AlphaTheta chuẩn Club.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Modules */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#22c55e] uppercase tracking-wider">
              Lộ Trình Đào Tạo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] mt-1 mb-2">
              Lộ Trình Học DJ Từ Cơ Bản Đến Biểu Diễn
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa]">
              Học viên được tiếp cận từng bước có hệ thống, không học vẹt mà làm chủ hoàn toàn thiết bị và bản nhạc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "Giai Đoạn 1",
                title: "Cảm Âm & Cấu Trúc Nhạc",
                items: [
                  "Nhận diện nhịp điệu (BPM, Phách, Khuông nhạc)",
                  "Cấu trúc bản nhạc (Intro, Verse, Build-up, Drop, Outro)",
                  "Kỹ thuật nghe và nhận diện Key tone bản nhạc",
                  "Luyện tai nghe độc lập trên Headphone DJ",
                ],
              },
              {
                step: "Giai Đoạn 2",
                title: "Làm Chủ Thiết Bị & Beatmatching",
                items: [
                  "Vận hành Jogwheel, Pitch Fader, CUE & PLAY",
                  "Kỹ thuật Beatmatching bằng tai không dùng Sync",
                  "Kiểm soát Gain, Volume Fader và Master Output",
                  "Làm quen giao diện Rekordbox / Serato DJ",
                ],
              },
              {
                step: "Giai Đoạn 3",
                title: "EQ Mixing & Transitions Mượt Mà",
                items: [
                  "Kỹ thuật phối trộn EQ 3-Band (High, Mid, Low)",
                  "Ứng dụng Sound Color FX & Beat FX chuẩn xác",
                  "Kỹ thuật chuyển bài đa dạng theo từng dòng nhạc",
                  "Xử lý chuyển đổi tempo và thể loại nhạc",
                ],
              },
              {
                step: "Giai Đoạn 4",
                title: "Xây Dựng Set Nhạc & Biểu Diễn",
                items: [
                  "Tư duy biên soạn Playlist & phân loại năng lượng",
                  "Kỹ năng đọc sàn và tương tác tâm lý đám đông",
                  "Chuẩn bị USB Rekordbox & xử lý tình huống phát sinh",
                  "Thực hành biểu diễn hoàn chỉnh một Mini Set",
                ],
              },
            ].map((module, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121318] border border-[#23252f] flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-bold text-[#22c55e] uppercase tracking-wider mb-2">
                    {module.step}
                  </div>
                  <h3 className="text-base font-bold text-[#ffffff] mb-4">
                    {module.title}
                  </h3>
                  <ul className="space-y-2 text-xs text-[#a1a1aa]">
                    {module.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practice Equipment Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="bg-[#111217] border border-[#23252f] rounded-2xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-[#22c55e] uppercase tracking-wider">
                  Trang Thiết Bị Thực Hành
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff] mt-1 mb-4">
                  Thực Hành Trực Tiếp Trên Thiết Bị Tiêu Chuẩn
                </h2>
                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-6">
                  Tại VanBass, học viên được tiếp cận với các dòng thiết bị phổ biến nhất trên thị trường hiện nay từ Pioneer DJ và AlphaTheta. Điều này đảm bảo học viên tự tin biểu diễn tại bất kỳ Club, Lounge, Bar hay Event nào sau khi hoàn thành khóa học.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Pioneer XDJ-RX3", role: "Hệ thống All-in-One 2 kênh chuẩn biểu diễn" },
                    { name: "Pioneer DDJ-FLX4", role: "Controller phổ thông tối ưu luyện tập" },
                    { name: "AlphaTheta OMNIS-DUO", role: "Thiết bị di động chạy pin cao cấp" },
                    { name: "AlphaTheta XDJ-AZ", role: "Hệ thống 4 kênh Flagship thế hệ mới" },
                  ].map((eq, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#171820] border border-[#262833]">
                      <div className="text-xs font-bold text-[#ffffff] mb-0.5">{eq.name}</div>
                      <div className="text-[11px] text-[#71717a]">{eq.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="p-5 rounded-xl bg-[#171820] border border-[#272a36]">
                  <h4 className="text-sm font-bold text-[#ffffff] mb-1">Hình Thức Học</h4>
                  <p className="text-xs text-[#a1a1aa]">
                    1 Kèm 1 trực tiếp với chuyên viên kỹ thuật / DJ giàu kinh nghiệm thực chiến.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#171820] border border-[#272a36]">
                  <h4 className="text-sm font-bold text-[#ffffff] mb-1">Thời Lượng Thực Hành</h4>
                  <p className="text-xs text-[#a1a1aa]">
                    100% thời gian trên bàn DJ, không lý thuyết suông.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#171820] border border-[#272a36]">
                  <h4 className="text-sm font-bold text-[#ffffff] mb-1">Hỗ Trợ Sau Khóa Học</h4>
                  <p className="text-xs text-[#a1a1aa]">
                    Học viên được sử dụng Studio tập luyện định kỳ và hỗ trợ tư vấn cấu hình khi mua hoặc thuê thiết bị tại VanBass.
                  </p>
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
              Câu Hỏi Thường Gặp Về Khóa Học DJ
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa]">
              Những thông tin cơ bản học viên thường quan tâm trước khi đăng ký.
            </p>
          </div>

          <div className="space-y-4">
            {courseFaqs.map((faq, idx) => (
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
              Đăng Ký Tư Vấn Khóa Học DJ Thực Hành
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-xl mx-auto mb-6">
              Ghé thăm trực tiếp Showroom VanBass để trải nghiệm thiết bị và trao đổi lộ trình học phù hợp với nhu cầu của bạn.
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
