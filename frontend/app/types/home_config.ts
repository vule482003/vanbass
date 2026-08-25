export interface HeroPanelLeft {
  tag: string;
  title: string;
  desc: string;
  link: string;
  button_text: string;
  bg_image: string;
}

export interface HeroPanelCenter {
  badge: string;
  headline: string;
  desc: string;
  link: string;
  button_text: string;
  bg_image: string;
}

export interface HeroPanelRight {
  tag: string;
  title: string;
  desc: string;
  link: string;
  button_text: string;
  bg_image: string;
}

export interface IntroStat {
  value: string;
  label: string;
}

export interface IntroSectionConfig {
  kicker: string;
  headline_top: string;
  headline_bottom: string;
  desc: string;
  stats: IntroStat[];
  button_text: string;
  button_link: string;
}

export interface RentalSectionConfig {
  kicker: string;
  headline_top: string;
  headline_bottom: string;
  desc: string;
  features: string[];
  button_text: string;
  button_link: string;
}

export interface LocalCtaConfig {
  kicker: string;
  headline_top: string;
  headline_bottom: string;
  desc: string;
  primary_btn_text: string;
  primary_btn_link: string;
  secondary_btn_text: string;
  secondary_btn_link: string;
}

export interface CategoriesHighlightConfig {
  kicker: string;
  title: string;
  button_text: string;
  button_link: string;
}

export interface FloatingContactsConfig {
  enabled: boolean;
  hotline: string;
  hotline_display: string;
  zalo_link: string;
  messenger_link: string;
  maps_link: string;
}

export interface VisibilityConfig {
  show_marquee: boolean;
  show_hero: boolean;
  show_products: boolean;
  show_categories: boolean;
  show_rental: boolean;
  show_intro: boolean;
  show_cta: boolean;
  show_floating_contact: boolean;
}

export interface HomeData {
  marquee_items: string[];
  hero_left: HeroPanelLeft;
  hero_center: HeroPanelCenter;
  hero_right: HeroPanelRight;
  categories_highlight: CategoriesHighlightConfig;
  intro: IntroSectionConfig;
  rental: RentalSectionConfig;
  local_cta: LocalCtaConfig;
  floating_contacts: FloatingContactsConfig;
  visibility: VisibilityConfig;
}

export interface HomeConfigResponse {
  id: string | null;
  data: HomeData;
  updated_at: string | null;
}

export const DEFAULT_HOME_DATA: HomeData = {
  marquee_items: [
    "⚡ PIONEER DJ OFFICIAL DISTRIBUTOR",
    "ALPHATHETA",
    "ALLEN & HEATH",
    "DENON DJ",
    "🎧 SHOWROOM TEST MÁY ĐÀ NẴNG",
    "⚡ HỖ TRỢ KỸ THUẬT 24/7",
    "GIAO HÀNG HỎA TỐC",
    "🔥 CHO THUÊ THIẾT BỊ SỰ KIỆN 24/7",
  ],
  hero_left: {
    tag: "01 / HARDWARE & AUDIO",
    title: "THIẾT BỊ DJ",
    desc: "Phân phối chính hãng Pioneer DJ, AlphaTheta, Mixer & Loa kiểm âm cao cấp.",
    link: "/products",
    button_text: "Khám phá thiết bị",
    bg_image: "/images/hero/hero_hardware.jpg",
  },
  hero_center: {
    badge: "THIẾT BỊ DJ CHÍNH HÃNG",
    headline: "HỆ THỐNG ÂM THANH & CHO THUÊ DJ",
    desc: "Giải pháp thiết bị biểu diễn sân khấu, party, club & sự kiện hàng đầu miền Trung.",
    link: "/products",
    button_text: "THUÊ THIẾT BỊ NGAY",
    bg_image: "/images/hero/hero_performance.jpg",
  },
  hero_right: {
    tag: "03 / SHOWROOM & STUDIO",
    title: "TRẢI NGHIỆM",
    desc: "Nghe thử âm thanh trực tiếp tại Showroom Đà Nẵng & hỗ trợ kỹ thuật 24/7.",
    link: "/contact",
    button_text: "Ghé thăm showroom",
    bg_image: "/images/hero/hero_showroom.jpg",
  },
  categories_highlight: {
    kicker: "DANH MỤC SẢN PHẨM",
    title: "Khám phá theo danh mục",
    button_text: "Xem toàn bộ",
    button_link: "/products",
  },
  intro: {
    kicker: "VANBASS MUSIC CENTER • ĐÀ NẴNG",
    headline_top: "Thiết bị chuẩn chất.",
    headline_bottom: "Âm thanh đỉnh cao.",
    desc: "VanBass Music Center là điểm đến uy tín hàng đầu tại Đà Nẵng để tìm kiếm, trải nghiệm thực tế và thuê các dòng bàn DJ, mixer, loa biểu diễn và hệ thống âm thanh chuyên nghiệp từ Pioneer DJ, AlphaTheta, Allen & Heath.",
    stats: [
      { value: "100%", label: "Chính Hãng" },
      { value: "24/7", label: "Hỗ Trợ Kỹ Thuật" },
      { value: "#1", label: "Đà Nẵng & Miền Trung" },
    ],
    button_text: "Tìm hiểu về VanBass",
    button_link: "/about",
  },
  rental: {
    kicker: "CHO THUÊ THIẾT BỊ",
    headline_top: "Cần thiết bị DJ",
    headline_bottom: "cho sự kiện?",
    desc: "Tìm kiếm thiết bị phù hợp cho party, event, wedding, bar, studio hoặc các chương trình biểu diễn tại Đà Nẵng.",
    features: [
      "Thiết bị DJ và âm thanh đa dạng",
      "Hỗ trợ lựa chọn thiết bị phù hợp",
      "Tư vấn nhu cầu thuê theo sự kiện",
    ],
    button_text: "Xem thiết bị cho thuê",
    button_link: "/products",
  },
  local_cta: {
    kicker: "SHOWROOM & TRẢI NGHIỆM THỰC TẾ",
    headline_top: "Trải nghiệm thiết bị DJ",
    headline_bottom: "ngay tại Showroom Đà Nẵng.",
    desc: "Ghé thăm không gian trải nghiệm thực tế các dòng máy DJ mới nhất, nhận tư vấn chuyên sâu và giải pháp âm thanh sự kiện tối ưu.",
    primary_btn_text: "Khám phá sản phẩm",
    primary_btn_link: "/products",
    secondary_btn_text: "Liên hệ tư vấn / Showroom",
    secondary_btn_link: "/contact",
  },
  floating_contacts: {
    enabled: true,
    hotline: "0706067799",
    hotline_display: "0706.067.799",
    zalo_link: "https://zalo.me/0706067799",
    messenger_link: "https://www.facebook.com/vanbassmusiccenterdanangvietnam?locale=vi_VN",
    maps_link: "https://www.google.com/maps?cid=3481175637981139835",
  },
  visibility: {
    show_marquee: true,
    show_hero: true,
    show_products: true,
    show_categories: true,
    show_rental: true,
    show_intro: true,
    show_cta: true,
    show_floating_contact: true,
  },
};
