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

export interface HeaderConfig {
  brand_title: string;
  brand_subtitle: string;
  nav_home: string;
  nav_rental: string;
  nav_products: string;
  nav_about: string;
  nav_contact: string;
  search_placeholder: string;
}

export interface RentalSectionConfig {
  kicker: string;
  headline_top: string;
  headline_bottom: string;
  desc: string;
  features: string[];
  button_text: string;
  button_link: string;
  stage_image?: string;
  spec_setup_label?: string;
  spec_setup_value?: string;
  spec_equipment_label?: string;
  spec_equipment_value?: string;
  spec_support_label?: string;
  spec_support_value?: string;
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
  maps_link_hue?: string;
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
  header: HeaderConfig;
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
  header: {
    brand_title: "VANBASS",
    brand_subtitle: "MUSIC CENTER",
    nav_home: "TRANG CHỦ",
    nav_rental: "THUÊ BÀN DJ",
    nav_products: "SẢN PHẨM",
    nav_about: "VỀ VANBASS",
    nav_contact: "LIÊN HỆ",
    search_placeholder: "Tìm kiếm thiết bị DJ, mixer, loa...",
  },
  marquee_items: [
    "PIONEER DJ OFFICIAL DISTRIBUTOR",
    "ALPHATHETA",
    "ALLEN & HEATH",
    "DENON DJ",
    "SHOWROOM TEST MÁY ĐÀ NẴNG",
    "HỖ TRỢ KỸ THUẬT 24/7",
    "GIAO HÀNG HỎA TỐC",
    "CHO THUÊ THIẾT BỊ SỰ KIỆN 24/7",
  ],
  hero_left: {
    tag: "THIẾT BỊ",
    title: "THIẾT BỊ DJ",
    desc: "Phân phối chính hãng Pioneer DJ, AlphaTheta, Mixer & Loa kiểm âm cao cấp.",
    link: "/products",
    button_text: "Khám phá",
    bg_image: "/images/hero/hero_hardware.jpg",
  },
  hero_center: {
    badge: "DỊCH VỤ",
    headline: "CHO THUÊ SỰ KIỆN",
    desc: "Giải pháp thiết bị biểu diễn sân khấu, party, club & sự kiện hàng đầu miền Trung.",
    link: "/products?mode=rental",
    button_text: "Bảng giá thuê",
    bg_image: "/images/hero/hero_performance.jpg",
  },
  hero_right: {
    tag: "SHOWROOM",
    title: "TRẢI NGHIỆM",
    desc: "Nghe thử âm thanh trực tiếp tại Showroom Đà Nẵng & hỗ trợ kỹ thuật 24/7.",
    link: "/contact",
    button_text: "Ghé thăm",
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
    button_link: "/products?mode=rental",
    stage_image: "/images/rental/rental_stage_setup.jpg",
    spec_setup_label: "THỜI GIAN SETUP",
    spec_setup_value: "Giao và lắp đặt trong 2 giờ",
    spec_equipment_label: "THIẾT BỊ",
    spec_equipment_value: "100% Pioneer DJ nguyên bản",
    spec_support_label: "HỖ TRỢ",
    spec_support_value: "Kỹ thuật viên sound-man 24/7",
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
    maps_link_hue: "https://www.google.com/maps/place/V%26B+STUDIO+(Training+DJ+Pioneer)/@16.4946002,107.5903409,17z/data=!3m1!4b1!4m6!3m5!1s0x3141a10047a15223:0x298a389a412fb2d1!8m2!3d16.4946002!4d107.5903409!16s%2Fg%2F11m6bydlgc?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D",
  },
  visibility: {
    show_marquee: true,
    show_hero: true,
    show_products: true,
    show_categories: true,
    show_rental: true,
    show_intro: true,
    show_cta: false,
    show_floating_contact: true,
  },
};

// postMessage Protocol Types between Admin CMS and /editor-preview iframe
export type EditorIframeToCmsMessage =
  | { type: "VANBASS_EDITOR_READY" }
  | {
      type: "VANBASS_ELEMENT_SELECTED";
      elementId: string;
      label?: string;
      fieldType?: "text" | "textarea" | "image";
      currentVal?: string;
    }
  | {
      type: "VANBASS_ELEMENT_HOVERED";
      elementId: string | null;
      label?: string;
    }
  | {
      type: "VANBASS_EDITOR_ERROR";
      error: string;
    }
  | {
      type: "VANBASS_SELECT_SECTION";
      section: string;
    };

export type EditorCmsToIframeMessage =
  | { type: "VANBASS_LOAD_STATE"; data: HomeData }
  | { type: "VANBASS_LIVE_CONFIG"; data: HomeData }
  | {
      type: "VANBASS_UPDATE_ELEMENT";
      elementId: string;
      value: string;
    }
  | { type: "VANBASS_RESET"; data?: HomeData }
  | { type: "VANBASS_SCROLL_TO"; section: string };

