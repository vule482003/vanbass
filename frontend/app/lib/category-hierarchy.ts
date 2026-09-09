// Hierarchical category structure (2-tier Parent-Child taxonomy)
// Modeled after professional pro-audio ecommerce standards (like GMusic)

export interface SubcategoryMeta {
  slug: string;
  nameVi: string;
  nameEn: string;
}

export interface CategoryGroup {
  id: string;
  nameVi: string;
  nameEn: string;
  subcategories: SubcategoryMeta[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "dj",
    nameVi: "Thiết Bị DJ",
    nameEn: "DJ Equipment",
    subcategories: [
      { slug: "all-in-one-dj-systems", nameVi: "Hệ Thống DJ All-in-One", nameEn: "All-in-One DJ Systems" },
      { slug: "dj-controllers", nameVi: "DJ Controllers", nameEn: "DJ Controllers" },
      { slug: "dj-player", nameVi: "Đầu Phát DJ (Players)", nameEn: "DJ Players & CDJs" },
      { slug: "turntables", nameVi: "Mâm Đĩa Than (Turntables)", nameEn: "DJ Turntables" },
      { slug: "dj-mixers", nameVi: "Mixer DJ Chuyên Nghiệp", nameEn: "DJ Mixers" },
      { slug: "dj-sampler", nameVi: "DJ Sampler & Remix", nameEn: "DJ Samplers & Remix" },
      { slug: "dj-software-interfaces", nameVi: "DJ Software & Audio Interfaces", nameEn: "DJ Software & Interfaces" },
      { slug: "headphones-dj", nameVi: "Tai Nghe DJ & Kiểm Âm", nameEn: "DJ & Studio Headphones" },
      { slug: "loa-kiem-am", nameVi: "Loa Kiểm Âm (Monitor Speakers)", nameEn: "Studio Monitor Speakers" },
      { slug: "phu-kien-dj", nameVi: "Phụ Kiện DJ", nameEn: "DJ Accessories" },
    ],
  },
  {
    id: "audio",
    nameVi: "Thiết Bị Âm Thanh Pro",
    nameEn: "Pro Audio Systems",
    subcategories: [
      { slug: "loa-thung-pro-audio", nameVi: "Loa Thùng & Sân Khấu Pro Audio", nameEn: "Pro Audio Loudspeakers" },
      { slug: "loa-roi", nameVi: "Loa Rời & Củ Treble", nameEn: "Raw Drivers & Tweeters" },
      { slug: "mixer-ban-tron-am-thanh", nameVi: "Mixer - Bàn Trộn Âm Thanh", nameEn: "Audio Mixing Consoles" },
      { slug: "amplifier-cong-suat", nameVi: "Amplifier - Cục Đẩy Công Suất", nameEn: "Power Amplifiers" },
      { slug: "thiet-bi-xu-ly-tin-hieu", nameVi: "Thiết Bị Xử Lý Tín Hiệu (DSP)", nameEn: "Digital Signal Processors (DSP)" },
      { slug: "micro-khong-day", nameVi: "Micro Không Dây Chuyên Nghiệp", nameEn: "Wireless Microphones" },
      { slug: "micro-co-day", nameVi: "Micro Có Dây & Phòng Thu", nameEn: "Wired Studio Microphones" },
      { slug: "day-tin-hieu-day-loa", nameVi: "Dây Tín Hiệu - Dây Loa", nameEn: "Audio & Speaker Cables" },
      { slug: "giac-ket-noi", nameVi: "Giắc Kết Nối Âm Thanh", nameEn: "Audio Connectors" },
    ],
  },
  {
    id: "effects",
    nameVi: "Máy Khói & Ánh Sáng",
    nameEn: "Stage Effects & FX",
    subcategories: [
      { slug: "may-tao-khoi", nameVi: "Máy Tạo Khói & Sương Sân Khấu", nameEn: "Stage Fog & Haze Machines" },
      { slug: "dung-dich-tao-khoi", nameVi: "Dung Dịch & Nước Tạo Khói", nameEn: "Fog Fluids & Liquids" },
      { slug: "quat-dieu-huong", nameVi: "Quạt Điều Hướng Sân Khấu", nameEn: "Stage Directional Fans" },
      { slug: "hieu-ung-anh-sang-da-quang", nameVi: "Hiệu Ứng Ánh Sáng & UV", nameEn: "Lighting & UV Effects" },
    ],
  },
  {
    id: "accessories",
    nameVi: "Nhạc Cụ & Phụ Kiện",
    nameEn: "Instruments & Accessories",
    subcategories: [
      { slug: "nhac-cu", nameVi: "Nhạc Cụ & Trống Jazz", nameEn: "Musical Instruments & Drums" },
      { slug: "la-cymbal", nameVi: "Lá Cymbal", nameEn: "Cymbals" },
      { slug: "phu-kien-nhac-cu", nameVi: "Phụ Kiện Nhạc Cụ", nameEn: "Instrument Accessories" },
      { slug: "phu-kien", nameVi: "Phụ Kiện Âm Thanh Tổng Hợp", nameEn: "General Audio Accessories" },
      { slug: "phu-kien-loa-roi", nameVi: "Phụ Kiện Loa Rời & Jack Cắm", nameEn: "Speaker Hardware & Adapters" },
    ],
  },
];

const LEGACY_SLUG_MAP: Record<string, string> = {
  "dj": "dj",
  "audio": "audio",
  "mixer": "audio",
  "stage-effects": "effects",
  "accessories": "accessories",
};

/**
 * Find parent category group by a subcategory slug (or legacy slug)
 */
export function getParentGroupBySubSlug(slug: string): CategoryGroup | undefined {
  const direct = CATEGORY_GROUPS.find((group) =>
    group.subcategories.some((sub) => sub.slug === slug)
  );
  if (direct) return direct;
  const legacyGroupId = LEGACY_SLUG_MAP[slug];
  if (legacyGroupId) {
    return CATEGORY_GROUPS.find((g) => g.id === legacyGroupId);
  }
  return undefined;
}

/**
 * Get translated subcategory name
 */
export function getSubcategoryDisplayName(slug: string, lang: string = "vi"): string {
  for (const group of CATEGORY_GROUPS) {
    const sub = group.subcategories.find((s) => s.slug === slug);
    if (sub) {
      return lang === "en" ? sub.nameEn : sub.nameVi;
    }
  }
  if (slug === "dj") return lang === "en" ? "DJ Equipment" : "Thiết Bị DJ";
  if (slug === "audio") return lang === "en" ? "Pro Audio" : "Thiết Bị Âm Thanh Pro";
  if (slug === "mixer") return lang === "en" ? "Audio Mixers" : "Mixer & Bàn Trộn";
  if (slug === "stage-effects") return lang === "en" ? "Stage Effects" : "Hiệu Ứng & Máy Khói";
  if (slug === "accessories") return lang === "en" ? "Accessories" : "Phụ Kiện Âm Thanh";

  return slug;
}

