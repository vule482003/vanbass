import { Category, Product } from "./types";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "a0000001-0000-4000-8000-000000000001",
    name: "Thiết bị DJ",
    slug: "dj",
    number: "01",
    description: "Bàn DJ All-In-One, DJ Controller, CDJ Player, Mâm đĩa than Turntables chính hãng AlphaTheta & Pioneer DJ.",
  },
  {
    id: "a0000001-0000-4000-8000-000000000002",
    name: "Mixer",
    slug: "mixer",
    number: "02",
    description: "DJ Mixers 2 kênh, 4 kênh, 6 kênh chuẩn club quốc tế và bộ xử lý tín hiệu DSP Marani Pro Audio.",
  },
  {
    id: "a0000001-0000-4000-8000-000000000003",
    name: "Loa & Pro Audio",
    slug: "audio",
    number: "03",
    description: "Loa biểu diễn SonicLink, Loa cột PA JBL, Loa kiểm âm Monitor và củ loa rời B&C Speakers Made in Italy.",
  },
  {
    id: "a0000001-0000-4000-8000-000000000004",
    name: "Hiệu ứng & Máy khói",
    slug: "stage-effects",
    number: "04",
    description: "Máy tạo khói sân khấu, máy khói lạnh, máy khói đứng LED RGBA, quạt gió và dung dịch khói chuẩn Antari Châu Âu.",
  },
  {
    id: "a0000001-0000-4000-8000-000000000005",
    name: "Tai nghe & Phụ kiện",
    slug: "accessories",
    number: "05",
    description: "Tai nghe DJ chuyên nghiệp, micro không dây UHF Sennheiser và cáp tín hiệu Klotz cao cấp Made in Germany.",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  // === CATEGORY 1: THIẾT BỊ DJ (10 sản phẩm) ===
  {
    id: "b0000001-0000-4000-8000-000000000001",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Thiết bị DJ All-in-one AlphaTheta XDJ-AN",
    slug: "alphatheta-xdj-an",
    sku: "XDJ-AN-AT",
    brand: "AlphaTheta",
    description: "Hệ thống DJ all-in-one thế hệ mới từ AlphaTheta tích hợp màn hình cảm ứng 7 inch, hỗ trợ phát nhạc không dây và biểu diễn độc lập không cần máy tính.",
    specifications: {
      "Thương hiệu": "AlphaTheta (Pioneer DJ Corporation)",
      "Màn hình": "7 inch cảm ứng đa điểm HD",
      "Số kênh": "2 kênh độc lập",
      "Cổng kết nối": "USB-A x2, USB-B x1, Master XLR/RCA, Mic XLR",
      "Bảo hành": "Chính hãng 12 tháng tại VanBass Music Center",
    },
    sale_enabled: true,
    sale_price: 37227600,
    rental_enabled: true,
    rental_price: 1200000,
    stock_quantity: 8,
    is_active: true,
    images: [
      { id: "img-01", image_url: "https://cdn.hstatic.net/products/200000465225/gmusic-alphatheta-xdj-an-1_22224c38ede24f9cb9b58dc6cba20e62_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000002",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Đầu phát đa phương tiện DJ AlphaTheta CDJ-1500X",
    slug: "alphatheta-cdj-1500x",
    sku: "CDJ-1500X-AT",
    brand: "AlphaTheta",
    description: "Đầu phát DJ chuyên nghiệp hỗ trợ Pro DJ Link, mâm xoay Full-size 206mm siêu mượt mà và bộ giải mã âm thanh 96kHz/32-bit trung thực.",
    specifications: {
      "Mâm xoay": "Full size 206mm kèm On Jog Display",
      "Bộ giải mã": "DAC 96kHz / 32-bit",
      "Kết nối": "Gigabit Pro DJ Link LAN, USB, Wi-Fi",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 49680000,
    rental_enabled: true,
    rental_price: 1500000,
    stock_quantity: 5,
    is_active: true,
    images: [
      { id: "img-02", image_url: "https://cdn.hstatic.net/products/200000465225/cdj-1500x_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000003",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Đầu phát đa phương tiện DJ AlphaTheta CDJ-3000X",
    slug: "alphatheta-cdj-3000x",
    sku: "CDJ-3000X-AT",
    brand: "AlphaTheta",
    description: "Flagship đầu phát DJ cao cấp nhất thế giới, trang bị vi xử lý MPU đa lõi siêu tốc và màn hình cảm ứng độ phân giải cao 9 inch.",
    specifications: {
      "Màn hình": "9 inch HD Touchscreen độ sáng cao",
      "Bộ vi xử lý": "Dual-Core MPU hiệu năng cao",
      "DAC": "Asahi Kasei 32-bit D/A Converter",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 89910000,
    rental_enabled: true,
    rental_price: 2500000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-03", image_url: "https://cdn.hstatic.net/products/200000465225/cdj-3000_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000004",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Hệ thống DJ All-in-one Pioneer DJ OPUS-QUAD",
    slug: "pioneer-dj-opus-quad",
    sku: "OPUS-QUAD-PDJ",
    brand: "Pioneer DJ",
    description: "Tuyệt tác thiết kế hệ thống DJ all-in-one 4 deck độc lập sang trọng, chất âm thượng hạng 32-bit ESS Technology và phát nhạc Zone Output 2 không gian.",
    specifications: {
      "Số kênh": "4 Deck độc lập",
      "Màn hình": "10.1 inch cảm ứng điện dung",
      "Zone Output": "Phát 2 nguồn nhạc riêng biệt cho 2 khu vực",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 89000000,
    rental_enabled: true,
    rental_price: 2500000,
    stock_quantity: 3,
    is_active: true,
    images: [
      { id: "img-04", image_url: "https://cdn.hstatic.net/products/200000465225/opus-quad_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000005",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Hệ thống DJ All-in-one Pioneer DJ XDJ-XZ",
    slug: "pioneer-dj-xdj-xz",
    sku: "XDJ-XZ-PDJ",
    brand: "Pioneer DJ",
    description: "Hệ thống DJ all-in-one 4 kênh chuẩn Club NXS2 mạnh mẽ, mâm xoay Full-size kèm On Jog Color Display và 14 Beat FX chuyên nghiệp.",
    specifications: {
      "Số kênh": "4 kênh âm thanh",
      "Mâm xoay": "Full size 206mm On Jog Display",
      "Pro DJ Link": "Đồng bộ nhạc với CDJ ngoài",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 74000000,
    rental_enabled: true,
    rental_price: 2200000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-05", image_url: "https://cdn.hstatic.net/products/200000465225/xdj-xz_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000006",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Hệ thống DJ All-in-one Pioneer DJ XDJ-RX3",
    slug: "pioneer-dj-xdj-rx3",
    sku: "XDJ-RX3-PDJ",
    brand: "Pioneer DJ",
    description: "Bàn DJ 2 kênh all-in-one sở hữu màn hình cảm ứng cực lớn 10.1 inch mượt mà, hỗ trợ Touch Preview và Release FX đa dạng.",
    specifications: {
      "Màn hình": "10.1 inch Touch Screen thế hệ mới",
      "Số kênh": "2 kênh độc lập",
      "Hiệu ứng": "14 Beat FX, 6 Sound Color FX",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 58000000,
    rental_enabled: true,
    rental_price: 1800000,
    stock_quantity: 6,
    is_active: true,
    images: [
      { id: "img-06", image_url: "https://cdn.hstatic.net/products/200000465225/xdj-rx3_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000007",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Bàn điều khiển DJ Pioneer DJ DDJ-FLX4",
    slug: "pioneer-dj-ddj-flx4",
    sku: "DDJ-FLX4-PDJ",
    brand: "Pioneer DJ",
    description: "DJ controller 2 kênh phổ biến nhất thế giới cho người mới bắt đầu, tương thích rekordbox và Serato DJ Lite trên iPhone, Android, PC, Mac.",
    specifications: {
      "Số kênh": "2 kênh",
      "Cổng kết nối": "USB-C kép",
      "Tính năng độc quyền": "Smart CFX, Smart Fader",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 12270000,
    rental_enabled: true,
    rental_price: 400000,
    stock_quantity: 15,
    is_active: true,
    images: [
      { id: "img-07", image_url: "https://cdn.hstatic.net/products/200000465225/ddj-flx4_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000008",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Bàn điều khiển DJ 4 kênh Pioneer DJ DDJ-FLX10",
    slug: "pioneer-dj-ddj-flx10",
    sku: "DDJ-FLX10-PDJ",
    brand: "Pioneer DJ",
    description: "Bàn điều khiển DJ 4 kênh chuyên nghiệp tích hợp công nghệ tách giọng hát/trống/nhạc cụ Track Separation thời gian thực và On Jog Display đa chế độ.",
    specifications: {
      "Số kênh": "4 kênh + DMX output điều khiển ánh sáng",
      "Công nghệ": "Track Separation (Vocal, Drums, Inst)",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 45000000,
    rental_enabled: true,
    rental_price: 1400000,
    stock_quantity: 5,
    is_active: true,
    images: [
      { id: "img-08", image_url: "https://cdn.hstatic.net/products/200000465225/ddj-flx10_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000009",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Mâm đĩa than kỹ thuật số & Analog Pioneer DJ PLX-CRSS12",
    slug: "pioneer-dj-plx-crss12",
    sku: "PLX-CRSS12-PDJ",
    brand: "Pioneer DJ",
    description: "Mâm đĩa than Hybrid đột phá đầu tiên trên thế giới cho phép chơi DVS kỹ thuật số mà không cần tay cần (Tonearm/Needle) kết hợp khả năng chơi đĩa nhựa Vinyl analog thuần túy.",
    specifications: {
      "Chế độ": "Digital DVS không kim & Analog Vinyl",
      "Động cơ": "Direct Drive 3 pha siêu mượt",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 39500000,
    rental_enabled: true,
    rental_price: 1200000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-09", image_url: "https://cdn.hstatic.net/products/200000465225/plx-crss12_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000010",
    category_id: "a0000001-0000-4000-8000-000000000001",
    category_name: "Thiết bị DJ",
    category_slug: "dj",
    name: "Mâm đĩa than chuyên nghiệp Pioneer DJ PLX-1000",
    slug: "pioneer-dj-plx-1000",
    sku: "PLX-1000-PDJ",
    brand: "Pioneer DJ",
    description: "Mâm đĩa than analog chuẩn Club với mô-men xoắn khởi động cực cao High-Torque, thiết kế khung kim loại đúc chống rung và cáp RCA mạ vàng tháo rời.",
    specifications: {
      "Mô-men xoắn": "4.5 kg/cm trở lên",
      "Tốc độ quay": "33⅓ rpm, 45 rpm",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 23500000,
    rental_enabled: true,
    rental_price: 700000,
    stock_quantity: 6,
    is_active: true,
    images: [
      { id: "img-10", image_url: "https://cdn.hstatic.net/products/200000465225/plx-1000_large.png", sort_order: 0 }
    ]
  },

  // === CATEGORY 2: MIXER & BÀN TRỘN (10 sản phẩm) ===
  {
    id: "b0000001-0000-4000-8000-000000000011",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bàn trộn âm thanh DJ AlphaTheta DJM-V5",
    slug: "alphatheta-djm-v5",
    sku: "DJM-V5-AT",
    brand: "AlphaTheta",
    description: "Mixer DJ 4 kênh chuyên nghiệp tích hợp bộ xử lý DSP 64-bit cao cấp, 14 Beat FX và bộ lọc Filter độc lập từng kênh âm thanh.",
    specifications: {
      "Số kênh": "4 kênh + 2 kênh Mic",
      "Xử lý tín hiệu": "64-bit DSP",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 67200000,
    rental_enabled: true,
    rental_price: 2000000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-11", image_url: "https://cdn.hstatic.net/products/200000465225/djm-v5_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000012",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bàn trộn âm thanh DJ Pioneer DJ DJM-A9",
    slug: "pioneer-dj-djm-a9",
    sku: "DJM-A9-PDJ",
    brand: "Pioneer DJ",
    description: "Chuẩn mực Mixer 4 kênh cho các Club và Festival hàng đầu toàn cầu, tích hợp ESS Technology 32-bit DAC, Bluetooth và Soundcard kép.",
    specifications: {
      "Số kênh": "4 kênh âm thanh",
      "Bộ giải mã": "ESS Technology 32-bit DAC",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 72000000,
    rental_enabled: true,
    rental_price: 2200000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-12", image_url: "https://cdn.hstatic.net/products/200000465225/djm-a9_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000013",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bàn trộn âm thanh Flagship Pioneer DJ DJM-V10",
    slug: "pioneer-dj-djm-v10",
    sku: "DJM-V10-PDJ",
    brand: "Pioneer DJ",
    description: "Đỉnh cao Mixer DJ 6 kênh chuyên nghiệp, 4-band EQ, bộ nén âm Compressor từng kênh và bộ lọc Filter độc quyền.",
    specifications: {
      "Số kênh": "6 kênh âm thanh",
      "EQ": "4-Band EQ từng kênh",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 95000000,
    rental_enabled: true,
    rental_price: 2800000,
    stock_quantity: 2,
    is_active: true,
    images: [
      { id: "img-13", image_url: "https://cdn.hstatic.net/products/200000465225/djm-v10_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000014",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bàn trộn DJ Battle Scratch Pioneer DJ DJM-S11",
    slug: "pioneer-dj-djm-s11",
    sku: "DJM-S11-PDJ",
    brand: "Pioneer DJ",
    description: "Mixer 2 kênh chuyên dụng cho DJ biểu diễn Scratch và Battle đỉnh cao với màn hình cảm ứng 4.3 inch tùy biến và Magvel Fader Pro.",
    specifications: {
      "Màn hình": "4.3 inch Touch Screen",
      "Crossfader": "Magvel Fader Pro mạ titan",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 53000000,
    rental_enabled: true,
    rental_price: 1600000,
    stock_quantity: 3,
    is_active: true,
    images: [
      { id: "img-14", image_url: "https://cdn.hstatic.net/products/200000465225/djm-s11_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000015",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bàn trộn DJ 2 kênh Pioneer DJ DJM-S7",
    slug: "pioneer-dj-djm-s7",
    sku: "DJM-S7-PDJ",
    brand: "Pioneer DJ",
    description: "Mixer 2 kênh biểu diễn phong cách mở rộng, tích hợp kết nối Bluetooth và tích hợp sẵn chuẩn phần mềm Serato DJ Pro & rekordbox.",
    specifications: {
      "Số kênh": "2 kênh âm thanh + Bluetooth Input",
      "Pads": "16 Performance Pads RGB",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 36000000,
    rental_enabled: true,
    rental_price: 1100000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-15", image_url: "https://cdn.hstatic.net/products/200000465225/djm-s7_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000016",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bàn trộn âm thanh 2 kênh Pioneer DJ DJM-450",
    slug: "pioneer-dj-djm-450",
    sku: "DJM-450-PDJ",
    brand: "Pioneer DJ",
    description: "Mixer 2 kênh nhỏ gọn thừa hưởng bố cục và bộ xử lý 64-bit từ đàn anh DJM-900NXS2 cùng thanh trượt Magvel Fader mượt mà.",
    specifications: {
      "Xử lý tín hiệu": "64-bit DSP",
      "Hiệu ứng": "Sound Color FX & Beat FX",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 18500000,
    rental_enabled: true,
    rental_price: 600000,
    stock_quantity: 5,
    is_active: true,
    images: [
      { id: "img-16", image_url: "https://cdn.hstatic.net/products/200000465225/djm-450_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000017",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bộ xử lý tín hiệu kỹ thuật số Marani Pro Audio DPA260P",
    slug: "marani-pro-audio-dpa260p",
    sku: "DPA260P-MRN",
    brand: "Marani Pro Audio",
    description: "Bộ xử lý DSP kỹ thuật số 2 In 6 Out cho hệ thống âm thanh sân khấu chuyên nghiệp với độ trễ thấp và EQ thông minh.",
    specifications: {
      "Ngõ vào / ra": "2 In / 6 Out XLR",
      "DSP": "24-bit AD/DA, 48kHz",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 14500000,
    rental_enabled: true,
    rental_price: 500000,
    stock_quantity: 6,
    is_active: true,
    images: [
      { id: "img-17", image_url: "https://cdn.hstatic.net/products/200000465225/marani-dpa260p_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000018",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bộ xử lý tín hiệu cao cấp Marani Pro Audio DPA480P",
    slug: "marani-pro-audio-dpa480p",
    sku: "DPA480P-MRN",
    brand: "Marani Pro Audio",
    description: "Hệ thống quản lý loa DSP 4 In 8 Out chất lượng âm thanh cao cấp, hỗ trợ bộ lọc FIR và kết nối điều khiển máy tính qua mạng RS485/USB.",
    specifications: {
      "Ngõ vào / ra": "4 In / 8 Out XLR",
      "Bộ lọc": "Bộ lọc FIR, IIR Crossover",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 22500000,
    rental_enabled: true,
    rental_price: 700000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-18", image_url: "https://cdn.hstatic.net/products/200000465225/marani-dpa480p_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000019",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Cục đẩy công suất tích hợp DSP Marani MDA4-800DM",
    slug: "marani-mda4-800dm",
    sku: "MDA4-800DM-MRN",
    brand: "Marani Pro Audio",
    description: "Main công suất Class D 4 kênh hiệu suất cao 4x800W tích hợp sẵn bộ xử lý DSP đầy đủ tính năng tinh chỉnh loa.",
    specifications: {
      "Công suất": "4 x 800W @ 8 Ohm",
      "Mạch": "Class D PFC Switching",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 38000000,
    rental_enabled: true,
    rental_price: 1200000,
    stock_quantity: 3,
    is_active: true,
    images: [
      { id: "img-19", image_url: "https://cdn.hstatic.net/products/200000465225/marani-mda4-800dm_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000020",
    category_id: "a0000001-0000-4000-8000-000000000002",
    category_name: "Mixer & Bàn trộn",
    category_slug: "mixer",
    name: "Bàn trộn âm thanh kỹ thuật số Behringer X32 Compact",
    slug: "behringer-x32-compact",
    sku: "X32-COMPACT-BHR",
    brand: "Behringer",
    description: "Bàn trộn kỹ thuật số 40 Input, 25 Bus với 16 tiền khuếch đại MIDAS có thể lập trình, 17 Fader động cơ và màn hình màu TFT 7 inch.",
    specifications: {
      "Kênh xử lý": "40 In, 25 Bus",
      "Preamp": "16 Midas Preamp",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 46000000,
    rental_enabled: true,
    rental_price: 1500000,
    stock_quantity: 3,
    is_active: true,
    images: [
      { id: "img-20", image_url: "https://cdn.hstatic.net/products/200000465225/behringer-x32-compact_large.png", sort_order: 0 }
    ]
  },

  // === CATEGORY 3: LOA & PRO AUDIO (10 sản phẩm) ===
  {
    id: "b0000001-0000-4000-8000-000000000021",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Loa di động biểu diễn AlphaTheta WAVE-EIGHT",
    slug: "alphatheta-wave-eight",
    sku: "WAVE-8-AT",
    brand: "AlphaTheta",
    description: "Loa DJ di động công nghệ không dây SonicLink siêu thấp độ trễ, pin sạc 8 giờ, chống nước IPX4 kèm tay kéo vali bánh xe tiện lợi.",
    specifications: {
      "Thời lượng pin": "Lên đến 8 giờ",
      "Công nghệ": "SonicLink độ trễ siêu thấp",
      "Chống nước": "IPX4 ngoài trời",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 26500000,
    rental_enabled: true,
    rental_price: 800000,
    stock_quantity: 8,
    is_active: true,
    images: [
      { id: "img-21", image_url: "https://cdn.hstatic.net/products/200000465225/wave-eight_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000022",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Hệ thống loa Cột PA JBL EON ONE MK2",
    slug: "jbl-eon-one-mk2",
    sku: "EON-ONE-MK2-JBL",
    brand: "JBL",
    description: "Hệ thống loa Column PA tất cả trong một công suất đỉnh 1500W, pin rời 6 giờ, mixer 5 kênh số DSP Lexicon & dbx cao cấp.",
    specifications: {
      "Công suất": "1500W Peak / 400W RMS",
      "SPL tối đa": "123 dB",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 32500000,
    rental_enabled: true,
    rental_price: 1000000,
    stock_quantity: 5,
    is_active: true,
    images: [
      { id: "img-22", image_url: "https://cdn.hstatic.net/products/200000465225/jbl-eon-one-mk2_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000023",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Loa kiểm âm Monitor Pioneer DJ VM-50",
    slug: "pioneer-dj-vm-50",
    sku: "VM-50-PDJ",
    brand: "Pioneer DJ",
    description: "Loa kiểm âm chủ động 5.25 inch công suất 60W Class D với bộ xử lý DSP 4 chế độ EQ tối ưu cho cả làm nhạc studio và chơi DJ.",
    specifications: {
      "Củ loa": "Woofer 5.25 inch sợi Aramid",
      "Công suất": "60W Class D",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 5400000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 12,
    is_active: true,
    images: [
      { id: "img-23", image_url: "https://cdn.hstatic.net/products/200000465225/vm-50_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000024",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Loa kiểm âm Monitor Pioneer DJ VM-70",
    slug: "pioneer-dj-vm-70",
    sku: "VM-70-PDJ",
    brand: "Pioneer DJ",
    description: "Loa kiểm âm 6.5 inch công suất 100W mạnh mẽ với mặt trước bằng nhôm nguyên khối dày 4mm triệt tiêu rung chấn tối đa.",
    specifications: {
      "Củ loa": "Woofer 6.5 inch Aramid",
      "Công suất": "100W Class D",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 7200000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 8,
    is_active: true,
    images: [
      { id: "img-24", image_url: "https://cdn.hstatic.net/products/200000465225/vm-70_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000025",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Loa kiểm âm Monitor Pioneer DJ VM-80",
    slug: "pioneer-dj-vm-80",
    sku: "VM-80-PDJ",
    brand: "Pioneer DJ",
    description: "Phiên bản loa kiểm âm cao cấp nhất dòng VM với củ loa Woofer 8 inch uy lực công suất 120W cho âm trầm sâu lắng và chính xác.",
    specifications: {
      "Củ loa": "Woofer 8 inch, Tweeter 1 inch",
      "Công suất": "120W Class D",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 9100000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 6,
    is_active: true,
    images: [
      { id: "img-25", image_url: "https://cdn.hstatic.net/products/200000465225/vm-80_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000026",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Củ loa Subwoofer rời B&C Speakers 18TBX100 18 Inch",
    slug: "bc-speakers-18tbx100",
    sku: "18TBX100-BC",
    brand: "B&C Speakers",
    description: "Huyền thoại củ loa Sub rời 18 inch chuẩn sân khấu toàn cầu, cuộn dây coil 100mm (4 inch), công suất 2400W Program Made in Italy.",
    specifications: {
      "Đường kính": "18 inch (460 mm)",
      "Công suất": "1200W RMS / 2400W Program",
      "Xuất xứ": "Made in Italy",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 11800000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 10,
    is_active: true,
    images: [
      { id: "img-26", image_url: "https://cdn.hstatic.net/products/200000465225/bc-18tbx100_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000027",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Củ loa Bass rời B&C Speakers 15TBX100 15 Inch",
    slug: "bc-speakers-15tbx100",
    sku: "15TBX100-BC",
    brand: "B&C Speakers",
    description: "Củ loa Bass rời 15 inch công suất 2000W Program chuyên dụng cho thùng loa Sub và Full chuyên nghiệp, cuộn coil 4 inch tản nhiệt nhôm kép.",
    specifications: {
      "Đường kính": "15 inch (380 mm)",
      "Công suất": "1000W RMS / 2000W Program",
      "Xuất xứ": "Made in Italy",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 9600000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 8,
    is_active: true,
    images: [
      { id: "img-27", image_url: "https://cdn.hstatic.net/products/200000465225/bc-15tbx100_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000028",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Củ loa Bass Neodymium B&C Speakers 12NDL76 12 Inch",
    slug: "bc-speakers-12ndl76",
    sku: "12NDL76-BC",
    brand: "B&C Speakers",
    description: "Củ loa 12 inch sử dụng nam châm Neodymium siêu nhẹ và từ lực cực mạnh, công suất 1000W Program lý tưởng cho loa Line Array sân khấu.",
    specifications: {
      "Nam châm": "Neodymium siêu nhẹ",
      "Công suất": "500W RMS / 1000W Program",
      "Xuất xứ": "Made in Italy",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 7800000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 8,
    is_active: true,
    images: [
      { id: "img-28", image_url: "https://cdn.hstatic.net/products/200000465225/bc-12ndl76_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000029",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Củ Treble kèn Titanium B&C Speakers DE900TN Driver",
    slug: "bc-speakers-de900tn",
    sku: "DE900TN-BC",
    brand: "B&C Speakers",
    description: "Củ Treble kèn Driver nén cao cấp màng Titanium cuộn coil 3 inch nam châm Neodymium, dải tần đáp ứng lên đến 18kHz sắc nét.",
    specifications: {
      "Màng loa": "Titanium cao cấp",
      "Công suất": "140W Continuous / 280W Program",
      "Xuất xứ": "Made in Italy",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 6200000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 12,
    is_active: true,
    images: [
      { id: "img-29", image_url: "https://cdn.hstatic.net/products/200000465225/bc-de900tn_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000030",
    category_id: "a0000001-0000-4000-8000-000000000003",
    category_name: "Loa & Pro Audio",
    category_slug: "audio",
    name: "Củ Treble kèn Polyimide B&C Speakers DE250 Driver",
    slug: "bc-speakers-de250",
    sku: "DE250-BC",
    brand: "B&C Speakers",
    description: "Củ Treble kèn 1 inch tiêu chuẩn ngành âm thanh với màng Polyimide cho tiếng Treble mềm mại tự nhiên và độ bền vô địch.",
    specifications: {
      "Họng ra": "1 inch (25 mm)",
      "Công suất": "60W RMS / 120W Program",
      "Xuất xứ": "Made in Italy",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 3400000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 15,
    is_active: true,
    images: [
      { id: "img-30", image_url: "https://cdn.hstatic.net/products/200000465225/bc-de250_large.png", sort_order: 0 }
    ]
  },

  // === CATEGORY 4: HIỆU ỨNG & MÁY KHÓI ANTARI (10 sản phẩm) ===
  {
    id: "b0000001-0000-4000-8000-000000000031",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Máy tạo khói sân khấu Antari Z-1000II 1000W",
    slug: "antari-z-1000ii",
    sku: "Z-1000II-ATR",
    brand: "Antari",
    description: "Máy tạo khói sân khấu 1000W công nghệ ECO giảm tiêu hao điện năng, lưu lượng khói mạnh mẽ kèm remote điều khiển từ xa.",
    specifications: {
      "Công suất": "1000W",
      "Lưu lượng": "10,000 cu.ft/phút",
      "Dung tích bình": "1.7 lít",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 8900000,
    rental_enabled: true,
    rental_price: 350000,
    stock_quantity: 8,
    is_active: true,
    images: [
      { id: "img-31", image_url: "https://cdn.hstatic.net/products/200000465225/antari-z1000ii_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000032",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Máy tạo khói sân khấu Antari Z-1500II 1500W",
    slug: "antari-z-1500ii",
    sku: "Z-1500II-ATR",
    brand: "Antari",
    description: "Máy phun khói sân khấu chuyên nghiệp 1500W công nghệ Unicore, màn hình LCD điều khiển DMX chuẩn sự kiện và bar club.",
    specifications: {
      "Công suất": "1500W",
      "Lưu lượng": "20,000 cu.ft/phút",
      "Dung tích": "6.0 lít",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 16800000,
    rental_enabled: true,
    rental_price: 600000,
    stock_quantity: 6,
    is_active: true,
    images: [
      { id: "img-32", image_url: "https://cdn.hstatic.net/products/200000465225/antari-z1500ii_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000033",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Máy tạo khói công suất khủng Antari Z-3000II 3000W",
    slug: "antari-z-3000ii",
    sku: "Z-3000II-ATR",
    brand: "Antari",
    description: "Cỗ máy tạo khói khổng lồ công suất 3000W chuyên phục vụ các đại nhạc hội ngoài trời, sân vận động và lễ hội âm nhạc quy mô lớn.",
    specifications: {
      "Công suất": "3000W",
      "Lưu lượng": "40,000 cu.ft/phút",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 28500000,
    rental_enabled: true,
    rental_price: 1000000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-33", image_url: "https://cdn.hstatic.net/products/200000465225/antari-z3000ii_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000034",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Máy phun khói đứng LED RGBA Antari M-7 RGBA",
    slug: "antari-m-7-rgba",
    sku: "M-7-RGBA-ATR",
    brand: "Antari",
    description: "Máy phun cột khói đứng thẳng lên trời kết hợp 22 bóng LED RGBA công suất cao tạo hiệu ứng cột lửa CO2 khói rực rỡ nhiều màu sắc.",
    specifications: {
      "Hệ thống LED": "22 x 3W LED RGBA",
      "Công suất phun": "1500W (phun cao 5-8m)",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 22500000,
    rental_enabled: true,
    rental_price: 800000,
    stock_quantity: 5,
    is_active: true,
    images: [
      { id: "img-34", image_url: "https://cdn.hstatic.net/products/200000465225/antari-m7_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000035",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Máy tạo khói lạnh sàn tiệc cưới Antari Ice-101",
    slug: "antari-ice-101",
    sku: "ICE-101-ATR",
    brand: "Antari",
    description: "Máy tạo khói nặng / khói lạnh là đà mặt đất sử dụng đá lạnh thông thường (Ice Cube) tạo hiệu ứng bồng bềnh như mây cho sân khấu tiệc cưới và nhà hát.",
    specifications: {
      "Công suất": "1000W",
      "Ngăn đá": "10 kg đá viên",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 24000000,
    rental_enabled: true,
    rental_price: 900000,
    stock_quantity: 4,
    is_active: true,
    images: [
      { id: "img-35", image_url: "https://cdn.hstatic.net/products/200000465225/antari-ice101_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000036",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Hệ thống tạo khói lạnh công nghiệp Antari DNG-250",
    slug: "antari-dng-250",
    sku: "DNG-250-ATR",
    brand: "Antari",
    description: "Máy tạo khói lạnh công nghiệp tích hợp lốc máy nén làm lạnh gas không cần dùng đá lạnh hay đá khô CO2, hoạt động liên tục không giới hạn thời gian.",
    specifications: {
      "Hệ thống làm lạnh": "Lốc nén làm mát trực tiếp Gas R-404A",
      "Chu kỳ hoạt động": "100% liên tục",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 68000000,
    rental_enabled: true,
    rental_price: 2200000,
    stock_quantity: 2,
    is_active: true,
    images: [
      { id: "img-36", image_url: "https://cdn.hstatic.net/products/200000465225/antari-dng250_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000037",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Máy tạo sương mù mờ Fazer Antari F-1 Fazer",
    slug: "antari-f-1-fazer",
    sku: "F-1-ATR",
    brand: "Antari",
    description: "Máy tạo làn sương mờ mịn màng đều khắp không gian giúp nổi bật các tia đèn Laser và ánh sáng sân khấu mà không làm cay mắt khán giả.",
    specifications: {
      "Công suất": "800W",
      "Quạt gió": "Tích hợp quạt khuếch tán sương mù",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 19200000,
    rental_enabled: true,
    rental_price: 700000,
    stock_quantity: 5,
    is_active: true,
    images: [
      { id: "img-37", image_url: "https://cdn.hstatic.net/products/200000465225/antari-f1_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000038",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Quạt điều hướng gió sân khấu Antari AF-3",
    slug: "antari-af-3",
    sku: "AF-3-ATR",
    brand: "Antari",
    description: "Quạt gió sân khấu chuyên dụng 3 tốc độ điều khiển DMX hoặc cơ học giúp thổi khói, tạo gió hiệu ứng bay tóc nghệ sĩ biểu diễn.",
    specifications: {
      "Tốc độ": "3 mức tùy chỉnh (Low, Mid, High)",
      "Điều khiển": "DMX 512 & Rotary Switch",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 7800000,
    rental_enabled: true,
    rental_price: 300000,
    stock_quantity: 8,
    is_active: true,
    images: [
      { id: "img-38", image_url: "https://cdn.hstatic.net/products/200000465225/antari-af3_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000039",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Dung dịch tạo khói Heavy Fog Antari FLG-5 Can 5L",
    slug: "antari-flg-5",
    sku: "FLG-5-ATR",
    brand: "Antari",
    description: "Dung dịch tạo khói đậm đặc gốc nước tiêu chuẩn Châu Âu, không mùi, không gây kích ứng, không để lại cặn dầu làm hỏng máy phun khói.",
    specifications: {
      "Dung tích": "Can 5 Lít",
      "Độ an toàn": "Chuẩn an toàn Châu Âu CE, RoHS",
      "Xuất xứ": "Made in Taiwan (Antari)",
    },
    sale_enabled: true,
    sale_price: 650000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 40,
    is_active: true,
    images: [
      { id: "img-39", image_url: "https://cdn.hstatic.net/products/200000465225/antari-flg5_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000040",
    category_id: "a0000001-0000-4000-8000-000000000004",
    category_name: "Hiệu ứng & Máy khói",
    category_slug: "stage-effects",
    name: "Dung dịch tạo khói nhanh tan Antari FLC-5 Can 5L",
    slug: "antari-flc-5",
    sku: "FLC-5-ATR",
    brand: "Antari",
    description: "Dung dịch tạo khói siêu nhanh tan chuyên dùng cho máy khói đứng LED hoặc hiệu ứng giả lập khí CO2 tan biến trong vài giây.",
    specifications: {
      "Dung tích": "Can 5 Lít",
      "Đặc tính": "Tan biến siêu tốc sau 5-10 giây",
      "Xuất xứ": "Made in Taiwan (Antari)",
    },
    sale_enabled: true,
    sale_price: 680000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 30,
    is_active: true,
    images: [
      { id: "img-40", image_url: "https://cdn.hstatic.net/products/200000465225/antari-flc5_large.png", sort_order: 0 }
    ]
  },

  // === CATEGORY 5: TAI NGHE & PHỤ KIỆN (10 sản phẩm) ===
  {
    id: "b0000001-0000-4000-8000-000000000041",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Tai nghe DJ không dây SonicLink AlphaTheta HDJ-F10",
    slug: "alphatheta-hdj-f10",
    sku: "HDJ-F10-AT",
    brand: "AlphaTheta",
    description: "Tai nghe DJ chuyên nghiệp đột phá với công nghệ truyền dẫn SonicLink siêu thấp độ trễ, pin 30 giờ và chống ồn chủ động ANC.",
    specifications: {
      "Kết nối": "SonicLink không dây độ trễ siêu thấp, Bluetooth 5.2, Cáp 3.5mm",
      "Pin": "9 giờ (SonicLink) / 30 giờ (Bluetooth)",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 11500000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 10,
    is_active: true,
    images: [
      { id: "img-41", image_url: "https://cdn.hstatic.net/products/200000465225/hdj-f10_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000042",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Tai nghe DJ chuyên nghiệp Pioneer DJ HDJ-X10",
    slug: "pioneer-dj-hdj-x10",
    sku: "HDJ-X10-PDJ",
    brand: "Pioneer DJ",
    description: "Flagship tai nghe DJ chuẩn phòng thu với dải tần siêu rộng 5Hz - 40,000Hz, đạt chuẩn độ bền chống sốc quân đội Mỹ MIL-STD-810G và đệm tai phủ Nano.",
    specifications: {
      "Dải tần": "5 Hz - 40,000 Hz",
      "Màng loa": "50 mm HD driver",
      "Độ bền": "MIL-STD-810G quân đội Mỹ",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 9200000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 8,
    is_active: true,
    images: [
      { id: "img-42", image_url: "https://cdn.hstatic.net/products/200000465225/hdj-x10_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000043",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Tai nghe DJ chuyên nghiệp Pioneer DJ HDJ-X7",
    slug: "pioneer-dj-hdj-x7",
    sku: "HDJ-X7-PDJ",
    brand: "Pioneer DJ",
    description: "Tai nghe DJ biểu diễn sở hữu củ loa 50mm mới phát triển, khả năng tách bạch âm bass và treble tuyệt hảo trong môi trường ồn ào.",
    specifications: {
      "Dải tần": "5 Hz - 30,000 Hz",
      "Màng loa": "50 mm Dome type",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 5800000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 10,
    is_active: true,
    images: [
      { id: "img-43", image_url: "https://cdn.hstatic.net/products/200000465225/hdj-x7_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000044",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Tai nghe DJ chuyên nghiệp Pioneer DJ HDJ-X5",
    slug: "pioneer-dj-hdj-x5",
    sku: "HDJ-X5-PDJ",
    brand: "Pioneer DJ",
    description: "Tai nghe DJ linh hoạt, âm bass chắc khỏe không bị méo tiếng ở mức âm lượng cao, thiết kế gập xoay đa hướng tiện lợi mang đi biểu diễn.",
    specifications: {
      "Màng loa": "40 mm Dome type",
      "Dải tần": "5 Hz - 30,000 Hz",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 3200000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 15,
    is_active: true,
    images: [
      { id: "img-44", image_url: "https://cdn.hstatic.net/products/200000465225/hdj-x5_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000045",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Tai nghe DJ phong cách Pioneer DJ HDJ-CUE1",
    slug: "pioneer-dj-hdj-cue1",
    sku: "HDJ-CUE1-PDJ",
    brand: "Pioneer DJ",
    description: "Tai nghe DJ nhỏ gọn, âm thanh chuẩn mực và thiết kế thời trang cho phép thay đổi màu sắc dây cáp và đệm tai theo cá tính.",
    specifications: {
      "Màng loa": "40 mm",
      "Dải tần": "5 Hz - 30,000 Hz",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 1950000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 20,
    is_active: true,
    images: [
      { id: "img-45", image_url: "https://cdn.hstatic.net/products/200000465225/hdj-cue1_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000046",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Hệ thống micro không dây kỹ thuật số Sennheiser EW-D SKM-S Base Set",
    slug: "sennheiser-ew-d-skm-s",
    sku: "EW-D-SKM-SNH",
    brand: "Sennheiser",
    description: "Hệ thống micro không dây UHF kỹ thuật số thế hệ mới với dải động 134 dB cao nhất thị trường, điều khiển qua app Sennheiser Smart Assist.",
    specifications: {
      "Dải động": "134 dB",
      "Thời lượng pin": "12 giờ",
      "Bảo hành": "Chính hãng 24 tháng",
    },
    sale_enabled: true,
    sale_price: 18900000,
    rental_enabled: true,
    rental_price: 600000,
    stock_quantity: 6,
    is_active: true,
    images: [
      { id: "img-46", image_url: "https://cdn.hstatic.net/products/200000465225/sennheiser-ewd_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000047",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Đầu Capsule micro vocal Sennheiser MMD 945",
    slug: "sennheiser-mmd-945",
    sku: "MMD-945-SNH",
    brand: "Sennheiser",
    description: "Đầu củ micro dynamic Supercardioid cao cấp cho giọng hát dày dặn, âm sắc chi tiết và chống hú rít tuyệt đối trong các sự kiện sân khấu.",
    specifications: {
      "Búp sóng": "Supercardioid",
      "Loại đầu thu": "Dynamic",
      "Bảo hành": "Chính hãng 24 tháng",
    },
    sale_enabled: true,
    sale_price: 6200000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 10,
    is_active: true,
    images: [
      { id: "img-47", image_url: "https://cdn.hstatic.net/products/200000465225/sennheiser-mmd945_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000048",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Micro có dây chuyên nghiệp Sennheiser E835-S",
    slug: "sennheiser-e835-s",
    sku: "E835-S-SNH",
    brand: "Sennheiser",
    description: "Micro dynamic có dây chuyên dụng cho hát live và MC sự kiện, vỏ kim loại đúc chắc chắn tích hợp công tắc gạt On/Off êm ái.",
    specifications: {
      "Búp sóng": "Cardioid",
      "Dải tần": "40 Hz - 16,000 Hz",
      "Bảo hành": "Chính hãng 24 tháng",
    },
    sale_enabled: true,
    sale_price: 2850000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 15,
    is_active: true,
    images: [
      { id: "img-48", image_url: "https://cdn.hstatic.net/products/200000465225/sennheiser-e835s_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000049",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Dây tín hiệu âm thanh cao cấp Klotz Titanium Guitar Cable 6m",
    slug: "klotz-titanium-cable-6m",
    sku: "TI-0600PP-KLZ",
    brand: "Klotz",
    description: "Dây tín hiệu âm thanh Hi-End Made in Germany đầu jack mạ vàng 24K, điện dung cực thấp 75 pF/m cho chất âm thuần khiết không bị suy hao.",
    specifications: {
      "Chiều dài": "6.0 mét",
      "Đầu jack": "Neutrik mạ vàng 24K",
      "Xuất xứ": "Made in Germany",
      "Bảo hành": "Trọn đời sản phẩm",
    },
    sale_enabled: true,
    sale_price: 1850000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 20,
    is_active: true,
    images: [
      { id: "img-49", image_url: "https://cdn.hstatic.net/products/200000465225/klotz-titanium_large.png", sort_order: 0 }
    ]
  },
  {
    id: "b0000001-0000-4000-8000-000000000050",
    category_id: "a0000001-0000-4000-8000-000000000005",
    category_name: "Tai nghe & Phụ kiện",
    category_slug: "accessories",
    name: "Dây micro XLR chuyên dụng Klotz Greyhound 10m",
    slug: "klotz-greyhound-cable-10m",
    sku: "GRH1FP100-KLZ",
    brand: "Klotz",
    description: "Cáp micro XLR đực - cái chất lượng cao chống nhiễu tuyệt đối, vỏ cao su dẻo dai chịu lực giẫm đạp trong các show diễn trực tiếp.",
    specifications: {
      "Chiều dài": "10 mét",
      "Đầu nối": "XLR 3-pin Neutrik",
      "Xuất xứ": "Made in Germany",
      "Bảo hành": "Chính hãng 12 tháng",
    },
    sale_enabled: true,
    sale_price: 850000,
    rental_enabled: false,
    rental_price: 0,
    stock_quantity: 25,
    is_active: true,
    images: [
      { id: "img-50", image_url: "https://cdn.hstatic.net/products/200000465225/klotz-greyhound_large.png", sort_order: 0 }
    ]
  },
];
