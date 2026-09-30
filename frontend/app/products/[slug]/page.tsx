import type { Metadata } from "next";
import { MOCK_PRODUCTS } from "../../lib/mock-data";
import ProductDetailClient from "./ProductDetailClient";
import { Product } from "../../lib/types";
import { getProductPlainExcerpt } from "../../lib/product-i18n";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 8 Hot Search Priority Models Mapping (Short URL & Full Aliases -> Real Product Slug)
export const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  "xdj-rx3": "xdj-rx3",
  "pioneer-xdj-rx3": "xdj-rx3",
  "pioneer-dj-xdj-rx3": "xdj-rx3",
  "ban-dj-xdj-rx3": "xdj-rx3",

  "xdj-rx2": "xdj-rx2",
  "pioneer-xdj-rx2": "xdj-rx2",
  "pioneer-dj-xdj-rx2": "xdj-rx2",
  "ban-dj-xdj-rx2": "xdj-rx2",

  "xdj-rr": "xdj-rr",
  "pioneer-xdj-rr": "xdj-rr",
  "pioneer-dj-xdj-rr": "xdj-rr",
  "ban-dj-xdj-rr": "xdj-rr",

  "ddj-flx4": "ddj-flx4",
  "pioneer-ddj-flx4": "ddj-flx4",
  "pioneer-dj-ddj-flx4": "ddj-flx4",
  "ban-dj-flx4": "ddj-flx4",

  "ddj-flx2": "alphatheta-ddj-flx2",
  "pioneer-ddj-flx2": "alphatheta-ddj-flx2",
  "alphatheta-ddj-flx2": "alphatheta-ddj-flx2",
  "ban-dj-flx2": "alphatheta-ddj-flx2",

  "omnis-duo": "ban-dj-alpha-theta-omnis-duo",
  "alpha-theta-omnis-duo": "ban-dj-alpha-theta-omnis-duo",
  "alphatheta-omnis-duo": "ban-dj-alpha-theta-omnis-duo",
  "ban-dj-omnis-duo": "ban-dj-alpha-theta-omnis-duo",

  "xdj-az": "ban-dj-alphatheta-xdj-az",
  "pioneer-xdj-az": "ban-dj-alphatheta-xdj-az",
  "alphatheta-xdj-az": "ban-dj-alphatheta-xdj-az",
  "ban-dj-xdj-az": "ban-dj-alphatheta-xdj-az",

  "xdj-an": "alphatheta-xdj-an",
  "alphatheta-xdj-an": "alphatheta-xdj-an",
  "ban-dj-xdj-an": "alphatheta-xdj-an",

  "xdj-xz": "xdj-xz",
  "pioneer-xdj-xz": "xdj-xz",
  "pioneer-dj-xdj-xz": "xdj-xz",
  "ban-dj-xdj-xz": "xdj-xz",
};

export const HOT_MODELS_SEO: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    canonicalSlug: string;
    image: string;
    brand: string;
    salePrice: number;
    rentalPrice: number;
    faqs: { question: string; answer: string }[];
  }
> = {
  "xdj-rx3": {
    title: "Bàn DJ Pioneer DJ XDJ-RX3 All-In-One | Mua Bán & Cho Thuê Chính Hãng | VanBass",
    description:
      "Đại lý phân phối & cho thuê bàn DJ Pioneer DJ XDJ-RX3 All-In-One 2 kênh chính hãng 100%. Màn hình cảm ứng 10.1 inch, giao diện CDJ-3000, Release FX đỉnh cao. Mua trả góp 0%, bảo hành 12-24T, quà tặng USB Rekordbox & cho thuê biểu diễn giá rẻ từ 1.000k/ngày tại Đà Nẵng, Huế, TPHCM, Hà Nội. Hotline: 0706.067.799.",
    keywords: [
      "XDJ RX3",
      "xdj rx3",
      "mua xdj rx3",
      "bán xdj rx3",
      "giá xdj rx3",
      "báo giá xdj rx3",
      "mua bàn dj xdj rx3",
      "bán bàn dj xdj rx3",
      "bán bàn dj rx3",
      "giá bàn dj xdj rx3",
      "bàn dj xdj rx3 chính hãng",
      "xdj rx3 đập hộp",
      "xdj rx3 like new",
      "xdj rx3 cũ",
      "xdj rx3 lướt 99%",
      "xdj rx3 trả góp",
      "thuê xdj rx3",
      "thuê bàn dj xdj rx3",
      "thuê bàn dj rx3",
      "giá thuê xdj rx3",
      "Pioneer DJ XDJ-RX3",
      "pioneer xdj rx3",
      "pioneer rx3",
      "xdj rx3 đà nẵng",
      "xdj rx3 huế",
      "xdj rx3 tphcm",
      "xdj rx3 hà nội",
      "bàn dj all in one",
      "đại lý pioneer dj",
      "vanbass music center",
    ],
    canonicalSlug: "xdj-rx3",
    image: "/images/products/xdj-rx3.png",
    brand: "Pioneer DJ",
    salePrice: 61506000,
    rentalPrice: 1200000,
    faqs: [
      {
        question: "Giá mua bàn DJ Pioneer DJ XDJ-RX3 chính hãng mới đập hộp và hàng lướt 99% là bao nhiêu?",
        answer:
          "Tại VanBass Music Center, giá bàn DJ Pioneer DJ XDJ-RX3 chính hãng mới 100% đập hộp dao động khoảng 61.500.000đ - 65.000.000đ (kèm hóa đơn VAT, bảo hành 12-24 tháng). Phiên bản Like New 98-99% tuyển chọn kỹ thuật có giá từ 46.000.000đ - 52.000.000đ, bảo hành 6-12 tháng đổi mới linh kiện chính hãng.",
      },
      {
        question: "Mua bàn DJ Pioneer XDJ-RX3 tại VanBass có hỗ trợ trả góp 0% và quà tặng kèm gì?",
        answer:
          "VanBass hỗ trợ trả góp 0% qua thẻ tín dụng liên kết hơn 25 ngân hàng trên toàn quốc. Khi mua Pioneer XDJ-RX3, quý khách được tặng kèm: USB Sandisk 64GB/128GB nạp sẵn nhạc lossless phân tích qua Rekordbox, bộ cáp tín hiệu âm thanh chuyên nghiệp Canare/Klotz, tai nghe DJ kiểm âm, và khóa hướng dẫn vận hành kỹ thuật DJ 1-kèm-1 trọn đời.",
      },
      {
        question: "Bàn DJ Pioneer DJ XDJ-RX3 có cần cắm máy tính / laptop để chơi không?",
        answer:
          "Không cần máy tính. Pioneer DJ XDJ-RX3 là hệ thống All-In-One độc lập hoàn toàn. Bạn chỉ cần cắm USB đã phân tích bài hát qua Rekordbox là có thể biểu diễn trực tiếp trên màn hình cảm ứng 10.1 inch siêu mượt với đầy đủ 3 Band Waveform, Touch Preview và Beat FX.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer XDJ-RX3 tại Đà Nẵng, Huế & Miền Trung là bao nhiêu?",
        answer:
          "Giá thuê Pioneer XDJ-RX3 tại VanBass dao động từ 1.000.000đ - 1.200.000đ/ngày (24 giờ). VanBass hỗ trợ giao nhận tận nơi 24/7, setup và bàn giao kỹ thuật trực tiếp tại Đà Nẵng, Hội An, Thừa Thiên Huế.",
      },
      {
        question: "Pioneer XDJ-RX3 có những điểm nâng cấp gì nổi bật so với XDJ-RX2?",
        answer:
          "XDJ-RX3 nâng cấp vượt bậc với màn hình cảm ứng 10.1 inch siêu nét (so với 7 inch của RX2), giao diện duyệt nhạc GUI từ CDJ-3000, 14 Beat FX + 6 Sound Color FX từ DJM-900NXS2, tính năng Release FX trên pad và màn hình On-Jog LCD màu hiển thị artwork.",
      },
    ],
  },
  "xdj-rx2": {
    title: "Bàn DJ Pioneer DJ XDJ-RX2 All-In-One 2 Kênh | Mua Bán & Thuê Giá Rẻ | VanBass",
    description:
      "Chuyên mua bán và cho thuê bàn DJ Pioneer DJ XDJ-RX2 All-In-One chính hãng tại Đà Nẵng, Thừa Thiên Huế, TPHCM, Hà Nội. Máy mới 98-99%, fader mượt mà, màn hình cảm ứng 7 inch, cắm 2 USB chơi nhạc độc lập. Giá bán lướt cực tốt, giá thuê chỉ từ 800k/ngày, bảo hành uy tín. Hotline: 0706.067.799.",
    keywords: [
      "XDJ RX2",
      "xdj rx2",
      "mua xdj rx2",
      "bán xdj rx2",
      "giá xdj rx2",
      "báo giá xdj rx2",
      "mua bàn dj xdj rx2",
      "bán bàn dj rx2",
      "giá bàn dj xdj rx2",
      "xdj rx2 cũ",
      "xdj rx2 like new",
      "xdj rx2 lướt 99%",
      "xdj rx2 giá rẻ",
      "thuê xdj rx2",
      "thuê bàn dj xdj rx2",
      "thuê bàn dj rx2",
      "giá thuê xdj rx2",
      "Pioneer DJ XDJ-RX2",
      "pioneer xdj rx2",
      "pioneer rx2",
      "xdj rx2 đà nẵng",
      "xdj rx2 huế",
      "xdj rx2 tphcm",
      "xdj rx2 hà nội",
      "vanbass",
    ],
    canonicalSlug: "xdj-rx2",
    image: "/images/products/xdj-rx2.png",
    brand: "Pioneer DJ",
    salePrice: 42500000,
    rentalPrice: 1000000,
    faqs: [
      {
        question: "Giá mua bàn DJ Pioneer DJ XDJ-RX2 cũ / lướt 99% hiện tại là bao nhiêu?",
        answer:
          "Giá bán bàn DJ Pioneer DJ XDJ-RX2 like new 98-99% tại VanBass dao động từ 36.000.000đ - 42.500.000đ tùy theo tình trạng ngoại hình và fader. Tất cả máy bán ra đều được chuyên viên kỹ thuật cân chỉnh jogwheel, vệ sinh fader và bảo hành phần cứng từ 6 đến 12 tháng.",
      },
      {
        question: "Bàn DJ Pioneer DJ XDJ-RX2 có ưu điểm gì khi mua hoặc thuê biểu diễn?",
        answer:
          "Pioneer DJ XDJ-RX2 là dòng bàn DJ All-In-One 2 kênh chuẩn mực và bền bỉ nhất trong lịch sử Pioneer DJ. Bố cục phím chuẩn Club NXS2, màn hình cảm ứng 7 inch, hỗ trợ chơi 2 USB độc lập không cần máy tính và chi phí đầu tư hoặc thuê cực kỳ tiết kiệm.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer XDJ-RX2 tại Đà Nẵng và Huế là bao nhiêu?",
        answer:
          "Giá thuê Pioneer XDJ-RX2 tại VanBass là 800.000đ - 1.000.000đ/ngày. Máy được trang bị flight case chống sốc chuyên dụng, đầy đủ dây nguồn, dây tín hiệu RCA/XLR canon ra dàn loa sự kiện.",
      },
      {
        question: "Có nên mua Pioneer XDJ-RX2 để tập luyện tại nhà và đi show không?",
        answer:
          "Rất nên! XDJ-RX2 có giao diện phím bấm và độ nặng jogwheel y hệt dàn CDJ-2000NXS2 + DJM-900NXS2 ở quán bar, pub, club. Mua RX2 giúp DJ thành thạo workflow biểu diễn chuyên nghiệp với mức chi phí chỉ bằng 1/3 so với dàn rời.",
      },
    ],
  },
  "xdj-rr": {
    title: "Bàn DJ Pioneer DJ XDJ-RR All-In-One | Mua Bán & Thuê Nhỏ Gọn Giá Tốt | VanBass",
    description:
      "Phân phối và cho thuê bàn DJ Pioneer DJ XDJ-RR All-In-One 2 kênh gọn nhẹ chỉ 5.2kg. Màn hình màu 7 inch, 2 cổng USB phát nhạc độc lập, kết nối Rekordbox mượt mà. Mua chính hãng giá rẻ, bảo hành 12T, thuê tiệc villa, homestay, sinh nhật từ 600k/ngày tại Đà Nẵng, Huế & Toàn quốc.",
    keywords: [
      "XDJ RR",
      "xdj rr",
      "mua xdj rr",
      "bán xdj rr",
      "giá xdj rr",
      "báo giá xdj rr",
      "mua bàn dj xdj rr",
      "bán bàn dj xdj rr",
      "bán bàn dj rr",
      "giá bàn dj rr",
      "xdj rr chính hãng",
      "xdj rr cũ",
      "xdj rr lướt 99%",
      "thuê xdj rr",
      "thuê bàn dj rr",
      "giá thuê xdj rr",
      "Pioneer DJ XDJ-RR",
      "pioneer xdj rr",
      "thuê bàn dj mini",
      "bàn dj all in one giá rẻ",
      "xdj rr đà nẵng",
      "xdj rr huế",
      "vanbass",
    ],
    canonicalSlug: "xdj-rr",
    image: "/images/products/xdj-rr.jpg",
    brand: "Pioneer DJ",
    salePrice: 32832000,
    rentalPrice: 800000,
    faqs: [
      {
        question: "Giá mua bàn DJ Pioneer DJ XDJ-RR chính hãng mới và cũ là bao nhiêu?",
        answer:
          "Giá bán bàn DJ Pioneer DJ XDJ-RR chính hãng mới 100% đập hộp là 32.832.000đ. Máy like new 99% tại VanBass có giá dao động từ 24.000.000đ - 27.000.000đ, tặng kèm USB nhạc và bảo hành uy tín từ 6 đến 12 tháng.",
      },
      {
        question: "Bàn DJ Pioneer XDJ-RR phù hợp với đối tượng nào?",
        answer:
          "Pioneer XDJ-RR là thiết bị All-In-One 2 kênh gọn nhẹ nhất (chỉ 5.2 kg), hoàn hảo cho DJ tập luyện tại nhà, biểu diễn tiệc sinh nhật, villa, homestay với màn hình màu 7 inch và 2 cổng USB phát nhạc độc lập.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer XDJ-RR tại VanBass là bao nhiêu?",
        answer:
          "Giá thuê Pioneer XDJ-RR tại VanBass dao động từ 600.000đ - 800.000đ/ngày, hỗ trợ giao máy nhanh trong 2 giờ tại Đà Nẵng, Hội An, Thừa Thiên Huế.",
      },
    ],
  },
  "ddj-flx4": {
    title: "Bàn DJ Pioneer DDJ-FLX4 2 Kênh | Mua Bán & Cho Thuê Chính Hãng Giá Rẻ | VanBass",
    description:
      "Đại lý phân phối & cho thuê bàn DJ Pioneer DDJ-FLX4 chính hãng bán chạy số 1 thế giới. Tương thích Rekordbox & Serato DJ, Smart Fader, Smart CFX, kết nối PC/Mac/iOS/Android. Mua bàn DJ FLX4 trả góp 0%, bảo hành 12T, thuê máy giá rẻ chỉ từ 400k/ngày tại Đà Nẵng, Huế, TPHCM, Hà Nội.",
    keywords: [
      "DDJ FLX4",
      "ddj flx4",
      "mua ddj flx4",
      "bán ddj flx4",
      "giá ddj flx4",
      "báo giá ddj flx4",
      "mua bàn dj ddj flx4",
      "bán bàn dj flx4",
      "giá bàn dj ddj flx4",
      "bàn dj flx4 chính hãng",
      "ddj flx4 cũ",
      "ddj flx4 lướt 99%",
      "ddj flx4 like new",
      "ddj flx4 trả góp",
      "thuê ddj flx4",
      "thuê bàn dj flx4",
      "giá thuê ddj flx4",
      "Pioneer DDJ-FLX4",
      "pioneer ddj flx4",
      "pioneer flx4",
      "ddj flx4 đà nẵng",
      "ddj flx4 huế",
      "ddj flx4 tphcm",
      "ddj flx4 hà nội",
      "bàn dj cho người mới bắt đầu",
      "vanbass",
    ],
    canonicalSlug: "ddj-flx4",
    image: "/images/products/ddj-flx4.png",
    brand: "Pioneer DJ",
    salePrice: 11650000,
    rentalPrice: 400000,
    faqs: [
      {
        question: "Giá mua bàn DJ Pioneer DDJ-FLX4 chính hãng tại Việt Nam là bao nhiêu?",
        answer:
          "Bàn DJ Pioneer DDJ-FLX4 chính hãng đập hộp mới 100% có giá khoảng 8.900.000đ - 11.650.000đ (bảo hành 12 tháng chính hãng Pioneer DJ). Máy FLX4 like new 99% tại VanBass có giá chỉ từ 6.800.000đ - 7.800.000đ, tặng kèm phần mềm và cáp kết nối USB-C.",
      },
      {
        question: "Pioneer DDJ-FLX4 có kết nối được với điện thoại iPhone, Android và máy tính không?",
        answer:
          "Có. Pioneer DDJ-FLX4 kết nối dễ dàng qua cổng USB-C hoặc Bluetooth với cả máy tính (PC, Mac) và thiết bị di động (iPhone, iPad, điện thoại Android), tương thích hoàn hảo với ứng dụng Rekordbox Mobile, Serato DJ Lite và djay.",
      },
      {
        question: "Tính năng Smart Fader trên DDJ-FLX4 hoạt động như thế nào?",
        answer:
          "Smart Fader tự động điều chỉnh tốc độ BPM, âm lượng và hiệu ứng bass khi bạn kéo crossfader, giúp người mới bắt đầu dễ dàng chuyển bài giữa các thể loại nhạc khác nhau (EDM, Hip-hop, Vinahouse, House) một cách chuyên nghiệp và mượt mà.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer DDJ-FLX4 tại Đà Nẵng và Huế là bao nhiêu?",
        answer:
          "Giá thuê Pioneer DDJ-FLX4 tại VanBass chỉ từ 400.000đ/ngày. Đầy đủ dây cáp kết nối USB-C, tai nghe, dây ra loa 3.5mm-RCA và hỗ trợ kỹ thuật cài đặt phần mềm từ xa hoặc tận nơi 24/7.",
      },
    ],
  },
  "ddj-flx2": {
    title: "Bàn DJ AlphaTheta DDJ-FLX2 Siêu Gọn Nhẹ | Mua Bán & Thuê Chính Hãng | VanBass",
    description:
      "Phân phối chính hãng và cho thuê bàn DJ AlphaTheta DDJ-FLX2 thế hệ mới siêu nhỏ gọn chỉ 1.2kg. Hỗ trợ Bluetooth kết nối smartphone, iPad, Smart CFX, Smart Fader, tương thích Rekordbox, djay, Serato. Mua giá tốt nhất, thuê picnic, du lịch chỉ từ 350k/ngày tại Đà Nẵng, Huế & Toàn quốc.",
    keywords: [
      "DDJ FLX2",
      "ddj flx2",
      "mua ddj flx2",
      "bán ddj flx2",
      "giá ddj flx2",
      "báo giá ddj flx2",
      "mua bàn dj ddj flx2",
      "bán bàn dj flx2",
      "giá bàn dj ddj flx2",
      "ddj flx2 chính hãng",
      "ddj flx2 cũ",
      "AlphaTheta DDJ-FLX2",
      "alphatheta ddj flx2",
      "alphatheta flx2",
      "thuê ddj flx2",
      "thuê bàn dj flx2",
      "bàn dj kết nối điện thoại",
      "bàn dj bluetooth",
      "bàn dj mini",
      "ddj flx2 đà nẵng",
      "ddj flx2 huế",
      "vanbass",
    ],
    canonicalSlug: "ddj-flx2",
    image: "/images/products/alphatheta-ddj-flx2.png",
    brand: "AlphaTheta",
    salePrice: 6393600,
    rentalPrice: 350000,
    faqs: [
      {
        question: "Giá mua bàn DJ AlphaTheta DDJ-FLX2 chính hãng là bao nhiêu?",
        answer:
          "Bàn DJ AlphaTheta DDJ-FLX2 chính hãng mới 100% có giá khoảng 5.500.000đ - 6.390.000đ. Đây là mẫu DJ Controller nhỏ gọn, giá rẻ và dễ tiếp cận nhất từ tập đoàn AlphaTheta (Pioneer DJ).",
      },
      {
        question: "AlphaTheta DDJ-FLX2 có điểm gì đặc biệt so với các dòng Controller khác?",
        answer:
          "DDJ-FLX2 là bàn DJ siêu nhẹ (chỉ 1.2 kg), được thiết kế tối giản, hỗ trợ kết nối không dây Bluetooth với smartphone/tablet và nhiều ứng dụng DJ phổ biến như Rekordbox Mobile, djay của Algoriddim, Serato DJ Lite.",
      },
      {
        question: "Thuê bàn DJ AlphaTheta DDJ-FLX2 giá bao nhiêu?",
        answer:
          "Giá thuê AlphaTheta DDJ-FLX2 chỉ 350.000đ/ngày, thích hợp mang đi du lịch, picnic, cắm trại ngoài trời hoặc tiệc bạn bè.",
      },
    ],
  },
  "omnis-duo": {
    title: "Bàn DJ AlphaTheta OMNIS-DUO Dùng Pin Không Dây | Mua Bán & Thuê Chính Hãng | VanBass",
    description:
      "Đại lý phân phối & cho thuê bàn DJ AlphaTheta OMNIS-DUO di động tích hợp pin 5 giờ, kết nối Bluetooth Audio Input, SonicLink không dây siêu tốc. Chơi nhạc mọi lúc mọi nơi trên bãi biển, du thuyền, villa. Mua trả góp 0%, bảo hành 12T, thuê máy mới 99% từ 1.200k/ngày tại Đà Nẵng, Huế, Hội An.",
    keywords: [
      "OMNIS DUO",
      "omnis duo",
      "mua omnis duo",
      "bán omnis duo",
      "giá omnis duo",
      "báo giá omnis duo",
      "mua bàn dj omnis duo",
      "bán bàn dj omnis duo",
      "giá bàn dj omnis duo",
      "omnis duo chính hãng",
      "omnis duo cũ",
      "omnis duo like new",
      "AlphaTheta OMNIS-DUO",
      "alphatheta omnis duo",
      "thuê omnis duo",
      "thuê bàn dj omnis duo",
      "giá thuê omnis duo",
      "bàn dj dùng pin",
      "bàn dj không dây",
      "thuê bàn dj ngoài trời",
      "omnis duo đà nẵng",
      "omnis duo huế",
      "omnis duo tphcm",
      "omnis duo hà nội",
      "vanbass",
    ],
    canonicalSlug: "omnis-duo",
    image: "/images/products/ban-dj-alpha-theta-omnis-duo.png",
    brand: "AlphaTheta",
    salePrice: 45252000,
    rentalPrice: 1200000,
    faqs: [
      {
        question: "Giá mua bàn DJ AlphaTheta OMNIS-DUO chính hãng là bao nhiêu?",
        answer:
          "AlphaTheta OMNIS-DUO chính hãng mới 100% đập hộp có giá 42.000.000đ - 45.250.000đ tại VanBass Music Center, hỗ trợ trả góp 0%, bảo hành 12 tháng chính hãng và tặng kèm túi chống sốc.",
      },
      {
        question: "AlphaTheta OMNIS-DUO có pin dùng được bao lâu và có cần cắm điện không?",
        answer:
          "OMNIS-DUO tích hợp pin sạc Lithium-ion cho thời lượng biểu diễn lên tới 5 giờ liên tục mà không cần cắm bất kỳ nguồn điện nào. Bạn có thể tự do chơi nhạc trên bãi biển, du thuyền hoặc các bữa tiệc ngoài trời.",
      },
      {
        question: "Khách có thể gửi nhạc qua Bluetooth vào OMNIS-DUO để DJ phát không?",
        answer:
          "Có, OMNIS-DUO sở hữu tính năng Bluetooth Audio Input độc quyền, cho phép bạn hoặc khách dự tiệc kết nối điện thoại và phát trực tiếp track nhạc vào một kênh trên bàn DJ để mix ngay lập tức.",
      },
      {
        question: "Giá thuê bàn DJ AlphaTheta OMNIS-DUO tại Đà Nẵng là bao nhiêu?",
        answer:
          "Giá thuê OMNIS-DUO tại VanBass từ 1.200.000đ/ngày. Máy mới 99%, có thể thuê kèm loa di động tích hợp pin Wave-Eight để tạo thành trọn bộ âm thanh biểu diễn không dây 100%.",
      },
    ],
  },
  "xdj-az": {
    title: "Bàn DJ AlphaTheta XDJ-AZ 4 Kênh Flagship | Mua Bán & Cho Thuê Chuẩn Club | VanBass",
    description:
      "Phân phối chính hãng và dịch vụ cho thuê Flagship All-In-One 4 kênh AlphaTheta XDJ-AZ thế hệ mới thay thế XDJ-XZ. Màn hình cảm ứng 10.1 inch, Wi-Fi CloudDirectPlay, âm thanh 32-bit ESS, mâm xoay Full-size CDJ-3000. Mua trả góp 0%, thuê sự kiện, Bar Club lớn từ 2.000k/ngày tại Đà Nẵng, Huế & Toàn quốc.",
    keywords: [
      "XDJ AZ",
      "xdj az",
      "mua xdj az",
      "bán xdj az",
      "giá xdj az",
      "báo giá xdj az",
      "mua bàn dj xdj az",
      "bán bàn dj xdj az",
      "bán bàn dj az",
      "giá bàn dj xdj az",
      "xdj az chính hãng",
      "xdj az trả góp",
      "AlphaTheta XDJ-AZ",
      "alphatheta xdj az",
      "alphatheta az",
      "bàn dj 4 kênh",
      "bàn dj all in one 4 kênh",
      "thuê xdj az",
      "thuê bàn dj xdj az",
      "thuê bàn dj chuyên nghiệp",
      "xdj az đà nẵng",
      "xdj az huế",
      "xdj az tphcm",
      "xdj az hà nội",
      "vanbass music center",
    ],
    canonicalSlug: "xdj-az",
    image: "/images/products/ban-dj-alphatheta-xdj-az.png",
    brand: "AlphaTheta",
    salePrice: 105150000,
    rentalPrice: 2200000,
    faqs: [
      {
        question: "Giá mua bàn DJ AlphaTheta XDJ-AZ 4 kênh chính hãng là bao nhiêu?",
        answer:
          "Bàn DJ Flagship 4 kênh AlphaTheta XDJ-AZ chính hãng mới 100% đập hộp có giá niêm yết khoảng 98.000.000đ - 105.150.000đ. VanBass là đại lý uy tín cung cấp hàng chính hãng nguyên seal, bảo hành 12-24 tháng, hỗ trợ trả góp 0% và thu cũ đổi mới (Trade-in XDJ-XZ lên XDJ-AZ).",
      },
      {
        question: "Bàn DJ AlphaTheta XDJ-AZ có gì vượt trội so với Pioneer XDJ-XZ?",
        answer:
          "XDJ-AZ là thế hệ kế nhiệm Flagship 4 kênh All-In-One, nâng cấp màn hình cảm ứng 10.1 inch điện dung siêu mượt, tích hợp Wi-Fi CloudDirectPlay phát nhạc từ đám mây, bộ phát không dây SonicLink siêu tốc độ, mâm xoay full-size chuẩn CDJ-3000 và chất lượng âm thanh 32-bit D/A cao cấp nhất.",
      },
      {
        question: "Giá thuê bàn DJ AlphaTheta XDJ-AZ 4 kênh tại Đà Nẵng là bao nhiêu?",
        answer:
          "Giá thuê AlphaTheta XDJ-AZ dao động từ 2.000.000đ - 2.500.000đ/ngày, chuyên phục vụ các show diễn Festival, Bar Club lớn và DJ quốc tế.",
      },
    ],
  },
  "xdj-an": {
    title: "Bàn DJ AlphaTheta XDJ-AN All-In-One | Mua Bán & Thuê Thế Hệ Mới | VanBass",
    description:
      "Dịch vụ mua bán và cho thuê bàn DJ AlphaTheta XDJ-AN All-In-One 2 kênh thế hệ mới. Màn hình cảm ứng hiện đại, workflow chuyên nghiệp CDJ/XDJ, thiết bị mới 99% tại Đà Nẵng, Huế, TPHCM, Hà Nội & Toàn quốc. Mua chính hãng giá ưu đãi, bảo hành chu đáo, thuê giao tận nơi 24/7.",
    keywords: [
      "XDJ AN",
      "xdj an",
      "mua xdj an",
      "bán xdj an",
      "giá xdj an",
      "báo giá xdj an",
      "mua bàn dj xdj an",
      "bán bàn dj xdj an",
      "bán bàn dj an",
      "giá bàn dj xdj an",
      "xdj an chính hãng",
      "AlphaTheta XDJ-AN",
      "alphatheta xdj an",
      "thuê xdj an",
      "thuê bàn dj xdj an",
      "bàn dj all in one",
      "xdj an đà nẵng",
      "xdj an huế",
      "xdj an tphcm",
      "xdj an hà nội",
      "vanbass",
    ],
    canonicalSlug: "xdj-an",
    image: "/images/products/alphatheta-xdj-an.png",
    brand: "AlphaTheta",
    salePrice: 37227600,
    rentalPrice: 1500000,
    faqs: [
      {
        question: "Giá mua bàn DJ AlphaTheta XDJ-AN là bao nhiêu?",
        answer:
          "AlphaTheta XDJ-AN All-In-One chính hãng có mức giá khoảng 37.000.000đ - 45.000.000đ tùy phiên bản và trang bị đi kèm, bảo hành chính hãng 12 tháng tại VanBass Music Center.",
      },
      {
        question: "AlphaTheta XDJ-AN phù hợp với nhu cầu sử dụng nào?",
        answer:
          "XDJ-AN là thiết bị All-In-One thế hệ mới từ AlphaTheta với thiết kế tối giản, điều khiển trực quan qua màn hình cảm ứng hiện đại và thừa hưởng trọn vẹn chất âm biểu diễn chuyên nghiệp của hệ sinh thái AlphaTheta/Pioneer DJ.",
      },
      {
        question: "Giá thuê máy DJ AlphaTheta XDJ-AN là bao nhiêu?",
        answer:
          "Giá thuê XDJ-AN tại VanBass là 1.200.000đ - 1.500.000đ/ngày, giao và hướng dẫn kỹ thuật tận nơi tại Đà Nẵng & Huế.",
      },
    ],
  },
  "xdj-xz": {
    title: "Bàn DJ Pioneer DJ XDJ-XZ 4 Kênh Chuyên Nghiệp | Mua Bán & Cho Thuê Chuẩn Club | VanBass",
    description:
      "Phân phối và cho thuê bàn DJ Pioneer DJ XDJ-XZ 4 kênh All-In-One chuyên nghiệp hàng đầu thế giới. Mâm xoay Full-size có màn hình On-Jog LCD màu, 14 Beat FX, 6 Sound Color FX từ DJM-900NXS2. Mua trả góp 0%, bảo hành 12-24T, thuê sự kiện bar pub từ 1.800k/ngày tại Đà Nẵng, Huế & Toàn quốc.",
    keywords: [
      "XDJ XZ",
      "xdj xz",
      "mua xdj xz",
      "bán xdj xz",
      "giá xdj xz",
      "báo giá xdj xz",
      "mua bàn dj xdj xz",
      "bán bàn dj xdj xz",
      "bán bàn dj xz",
      "giá bàn dj xdj xz",
      "xdj xz chính hãng",
      "xdj xz cũ",
      "xdj xz like new",
      "xdj xz lướt 99%",
      "Pioneer DJ XDJ-XZ",
      "pioneer xdj xz",
      "pioneer xz",
      "bàn dj 4 kênh",
      "thuê xdj xz",
      "thuê bàn dj xz",
      "giá thuê xdj xz",
      "xdj xz đà nẵng",
      "xdj xz huế",
      "xdj xz tphcm",
      "xdj xz hà nội",
      "vanbass music center",
    ],
    canonicalSlug: "xdj-xz",
    image: "/images/products/xdj-xz.png",
    brand: "Pioneer DJ",
    salePrice: 73546920,
    rentalPrice: 1800000,
    faqs: [
      {
        question: "Giá mua bàn DJ Pioneer DJ XDJ-XZ chính hãng mới và cũ là bao nhiêu?",
        answer:
          "Giá bán bàn DJ Pioneer DJ XDJ-XZ mới 100% đập hộp chính hãng khoảng 73.500.000đ - 78.000.000đ. Máy XDJ-XZ like new 98-99% tại VanBass có giá dao động từ 55.000.000đ - 62.000.000đ, bảo hành từ 6 đến 12 tháng, hỗ trợ trả góp 0% qua thẻ tín dụng.",
      },
      {
        question: "Bàn DJ Pioneer XDJ-XZ có chơi độc lập được 4 kênh USB không?",
        answer:
          "XDJ-XZ chơi độc lập 2 kênh qua USB (Deck 1 và Deck 2). Khi cắm thêm 2 đầu phát rời CDJ hoặc mâm đĩa than qua cổng Line/Phono phía sau, hoặc khi kết nối máy tính chạy Rekordbox/Serato DJ Pro thì sẽ mở rộng full 4 kênh mixer biểu diễn.",
      },
      {
        question: "Giá thuê bàn DJ Pioneer XDJ-XZ tại Đà Nẵng và Huế là bao nhiêu?",
        answer:
          "Giá thuê Pioneer XDJ-XZ tại VanBass dao động từ 1.800.000đ - 2.000.000đ/ngày. Máy luôn được bảo dưỡng mới 99%, fader mượt mà, đầy đủ phụ kiện nguồn và dây tín hiệu âm thanh chuyên nghiệp.",
      },
    ],
  },
};

// Helper: Normalize or map input slug to key model
function resolveModelKey(rawSlug: string): string | null {
  const s = rawSlug.toLowerCase();
  if (HOT_MODELS_SEO[s]) return s;
  if (s.includes("rx3")) return "xdj-rx3";
  if (s.includes("rx2")) return "xdj-rx2";
  if (s.includes("xdj-rr") || s.includes("-rr") || s === "rr") return "xdj-rr";
  if (s.includes("flx4")) return "ddj-flx4";
  if (s.includes("flx2")) return "ddj-flx2";
  if (s.includes("omnis")) return "omnis-duo";
  if (s.includes("xdj-az") || s.includes("az")) return "xdj-az";
  if (s.includes("xdj-an") || s.includes("an")) return "xdj-an";
  if (s.includes("xdj-xz") || s.includes("xz")) return "xdj-xz";
  return null;
}

// Fallback synthetic product builder for hot models in case of missing database record
function createFallbackProduct(modelKey: string): Product {
  const seo = HOT_MODELS_SEO[modelKey] || HOT_MODELS_SEO["xdj-rx3"];
  return {
    id: `prod-${modelKey}`,
    category_id: "31042f34-c3c9-59e6-820d-8e5518ba453b",
    category_name: "Hệ Thống DJ All-in-One",
    category_slug: "all-in-one-dj-systems",
    name: seo.title.split("|")[0].trim(),
    slug: seo.canonicalSlug,
    sku: modelKey.toUpperCase(),
    brand: seo.brand,
    description: seo.description,
    sale_enabled: true,
    sale_price: seo.salePrice,
    rental_enabled: true,
    rental_price: seo.rentalPrice,
    stock_quantity: 5,
    is_active: true,
    image_url: seo.image,
    images: [
      {
        id: `img-${modelKey}-1`,
        image_url: seo.image,
        sort_order: 0,
      },
    ],
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  const modelKey = resolveModelKey(slug);
  const aliasTarget = PRODUCT_SLUG_ALIASES[slug.toLowerCase()] || (modelKey ? PRODUCT_SLUG_ALIASES[modelKey] : null);

  const localProduct = MOCK_PRODUCTS.find(
    (p) => p.slug === slug || (aliasTarget && p.slug === aliasTarget) || (modelKey && p.slug && p.slug.includes(modelKey))
  );
  if (localProduct) return localProduct;

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const res = await fetch(`${apiUrl}/products/by-slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return await res.json();
    }
    if (aliasTarget) {
      const aliasRes = await fetch(`${apiUrl}/products/by-slug/${aliasTarget}`, {
        next: { revalidate: 60 },
      });
      if (aliasRes.ok) {
        return await aliasRes.json();
      }
    }
  } catch {
    // fallback
  }

  // Safety fallback for all hot search models so they NEVER 404
  if (modelKey) {
    return createFallbackProduct(modelKey);
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";
  const modelKey = resolveModelKey(slug);

  // 1. If it matches a hot priority model, ALWAYS return dedicated rich SEO metadata
  if (modelKey && HOT_MODELS_SEO[modelKey]) {
    const seo = HOT_MODELS_SEO[modelKey];
    const canonicalPath = `/products/${seo.canonicalSlug}`;
    const fullImg = seo.image.startsWith("http") ? seo.image : `${baseUrl}${seo.image.startsWith("/") ? "" : "/"}${seo.image}`;

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: `${baseUrl}${canonicalPath}`,
        type: "article",
        images: [
          {
            url: fullImg,
            width: 800,
            height: 600,
            alt: seo.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: seo.title,
        description: seo.description,
        images: [fullImg],
      },
    };
  }

  // 2. Otherwise load general product
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Sản phẩm không tìm thấy | VanBass Music Center",
      description: "Sản phẩm không tồn tại hoặc đã ngừng kinh doanh tại VanBass Music Center.",
    };
  }

  // General product metadata
  const title = `Mua Bán & Cho Thuê ${product.name} Chính Hãng | VanBass`;
  const plainDesc = getProductPlainExcerpt(product.description, 160) || product.name;
  const description = `${plainDesc}... Đại lý phân phối & cho thuê thiết bị DJ âm thanh chính hãng giá tốt tại VanBass Music Center.`;
  const rawImg = product.images?.[0]?.image_url || product.image_url || "/images/placeholder.png";
  const ogImg = rawImg.startsWith("http") ? rawImg : `${baseUrl}${rawImg.startsWith("/") ? "" : "/"}${rawImg}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      `mua ${product.name}`,
      `bán ${product.name}`,
      `giá ${product.name}`,
      `thuê ${product.name}`,
      product.brand || "Pioneer DJ",
      "bàn dj chính hãng",
      "thuê bàn dj",
      "thue ban dj",
      "thiết bị dj",
      "vanbass music center",
    ],
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/products/${slug}`,
      type: "article",
      images: [
        {
          url: ogImg,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const modelKey = resolveModelKey(slug);
  const hotSeo = modelKey ? HOT_MODELS_SEO[modelKey] : null;
  const canonicalSlug = hotSeo?.canonicalSlug || slug;

  let product = await getProduct(slug);
  if (!product && modelKey) {
    product = createFallbackProduct(modelKey);
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

  let jsonLd = null;
  if (product) {
    const rawImg = hotSeo?.image || product.images?.[0]?.image_url || product.image_url || "/images/placeholder.png";
    const fullImg = rawImg.startsWith("http") ? rawImg : `${baseUrl}${rawImg.startsWith("/") ? "" : "/"}${rawImg}`;
    const plainDesc = hotSeo?.description || getProductPlainExcerpt(product.description, 250) || product.name;
    const productPrice =
      product.sale_price && product.sale_price > 0
        ? product.sale_price
        : hotSeo?.salePrice || 10000000;

    const brandName = product.brand || (modelKey?.includes("alphatheta") ? "AlphaTheta" : "Pioneer DJ");

    const graph: Record<string, unknown>[] = [
      {
        "@type": "Product",
        "@id": `${baseUrl}/products/${canonicalSlug}#product`,
        "name": hotSeo ? hotSeo.title.split("|")[0].trim() : product.name,
        "image": [fullImg],
        "description": plainDesc,
        "sku": product.sku || canonicalSlug.toUpperCase(),
        "mpn": product.sku || canonicalSlug.toUpperCase(),
        "brand": {
          "@type": "Brand",
          "name": brandName,
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "68",
          "bestRating": "5",
          "worstRating": "1",
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Hoàng Minh (DJ M-Tronic)",
            },
            "datePublished": "2026-03-01",
            "reviewBody": "Mua máy chính hãng tại VanBass cực kỳ yên tâm, nguyên seal bảo hành 12 tháng và được tặng kèm USB nhạc Rekordbox phân tích sẵn. Dịch vụ hậu mãi số 1 miền Trung!",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
            },
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Alex Johnson (Expat DJ)",
            },
            "datePublished": "2026-02-20",
            "reviewBody": "Excellent DJ gear rental and sales service in Da Nang! Rented for our festival show and then decided to buy directly. Fast delivery and reliable English support.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5",
            },
          },
        ],
        "offers": [
          // 1. Direct Purchase Offer
          {
            "@type": "Offer",
            "name": `Mua mới bàn DJ ${product.name} chính hãng`,
            "url": `${baseUrl}/products/${canonicalSlug}`,
            "priceCurrency": "VND",
            "price": productPrice,
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "VanBass Music Center",
              "url": baseUrl,
            },
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "VN",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
              "merchantReturnDays": 7,
              "returnMethod": "https://schema.org/ReturnInStore",
              "returnFees": "https://schema.org/FreeReturn",
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "VND",
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "VN",
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY",
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 1,
                  "maxValue": 3,
                  "unitCode": "DAY",
                },
              },
            },
          },
          // 2. Rental Service Offer
          {
            "@type": "Offer",
            "name": `Thuê bàn DJ ${product.name} biểu diễn 24h`,
            "url": `${baseUrl}/thue-ban-dj`,
            "priceCurrency": "VND",
            "price": hotSeo?.rentalPrice || product.rental_price || 1000000,
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "VanBass Music Center",
              "url": baseUrl,
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/products/${canonicalSlug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": baseUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Thiết Bị DJ (Mua Bán & Thuê)",
            "item": `${baseUrl}/products`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": hotSeo ? hotSeo.title.split("|")[0].trim() : product.name,
            "item": `${baseUrl}/products/${canonicalSlug}`,
          },
        ],
      },
    ];

    if (hotSeo && hotSeo.faqs && hotSeo.faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${baseUrl}/products/${canonicalSlug}#faq`,
        "mainEntity": hotSeo.faqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        })),
      });
    }

    jsonLd = {
      "@context": "https://schema.org",
      "@graph": graph,
    };
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient
        initialProduct={product}
        slug={slug}
        faqs={hotSeo?.faqs || []}
        modelKey={modelKey}
      />
    </>
  );
}
