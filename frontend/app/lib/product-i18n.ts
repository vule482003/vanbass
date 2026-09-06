// Dedicated bilingual product dictionary & translation engine
// Provides exact, high-standard English audio product nomenclature

export interface TranslatedProductInfo {
  name: string;
  description?: string;
  specs?: Record<string, string>;
}

export const PRODUCT_TRANSLATIONS: Record<string, { enName: string; enDesc?: string }> = {
  // === CATEGORY 1: THIẾT BỊ DJ ===
  "alphatheta-xdj-an": {
    enName: "AlphaTheta XDJ-AN All-in-One DJ System",
    enDesc: "Next-generation all-in-one DJ system from AlphaTheta featuring a 7-inch multi-touch display, wireless audio streaming, and standalone operation.",
  },
  "alphatheta-cdj-1500x": {
    enName: "AlphaTheta CDJ-1500X Professional DJ Multi Player",
    enDesc: "Professional DJ multi player supporting Pro DJ Link, ultra-smooth 206mm full-size jog wheel, and high-fidelity 96kHz/32-bit audio DAC.",
  },
  "alphatheta-cdj-3000x": {
    enName: "AlphaTheta CDJ-3000X Flagship DJ Multi Player",
    enDesc: "World's flagship high-end DJ player equipped with multi-core MPU processing speed and a 9-inch high-resolution touchscreen.",
  },
  "pioneer-dj-opus-quad": {
    enName: "Pioneer DJ OPUS-QUAD 4-Deck All-in-One DJ System",
    enDesc: "Masterpiece standalone 4-deck DJ system with luxurious fan-shaped design, 32-bit ESS Technology premium sound, and dual-zone audio output.",
  },
  "pioneer-dj-xdj-xz": {
    enName: "Pioneer DJ XDJ-XZ 4-Channel Professional All-in-One DJ System",
    enDesc: "Club-standard 4-channel all-in-one DJ powerhouse with full-size CDJ jog wheels, 14 Beat FX, and 6 Sound Color FX.",
  },
  "pioneer-dj-xdj-rx3": {
    enName: "Pioneer DJ XDJ-RX3 2-Channel Performance All-in-One DJ System",
    enDesc: "2-channel all-in-one DJ powerhouse with a stunning 10.1-inch high-resolution touch display and inherited flagship CDJ-3000 features.",
  },
  "pioneer-dj-ddj-flx4": {
    enName: "Pioneer DJ DDJ-FLX4 2-Channel DJ Controller",
    enDesc: "User-friendly 2-channel DJ controller compatible with rekordbox and Serato DJ Lite, featuring Smart Fader and Smart CFX.",
  },
  "pioneer-dj-ddj-flx10": {
    enName: "Pioneer DJ DDJ-FLX10 4-Channel Performance DJ Controller",
    enDesc: "Advanced 4-channel DJ controller with innovative Track Separation technology for live mashups, On Jog Display, and DMX lighting output.",
  },
  "pioneer-dj-plx-crss12": {
    enName: "Pioneer DJ PLX-CRSS12 Digital-Analog Hybrid Turntable",
    enDesc: "Revolutionary direct-drive turntable supporting tone-arm-free DVS digital control and authentic analog vinyl playback.",
  },
  "pioneer-dj-plx-1000": {
    enName: "Pioneer DJ PLX-1000 Direct Drive Professional Turntable",
    enDesc: "High-torque direct drive analog turntable engineered for club booths and vinyl purists with superior vibration damping and sound quality.",
  },

  // === CATEGORY 2: MIXER ===
  "alphatheta-djm-v5": {
    enName: "AlphaTheta DJM-V5 Professional DJ Mixer",
    enDesc: "Cutting-edge DJ mixer with pristine studio sound, advanced DSP audio algorithms, and seamless multi-device connectivity.",
  },
  "pioneer-dj-djm-a9": {
    enName: "Pioneer DJ DJM-A9 4-Channel Professional DJ Mixer",
    enDesc: "Club-standard 4-channel professional DJ mixer with 32-bit ESS DAC, dual independent headphone outputs, and Bluetooth input.",
  },
  "pioneer-dj-djm-v10": {
    enName: "Pioneer DJ DJM-V10 Flagship 6-Channel DJ Mixer",
    enDesc: "Elite 6-channel flagship DJ mixer with 4-band EQ, comprehensive master isolator, dual compressor on every channel, and studio-grade effects.",
  },
  "pioneer-dj-djm-s11": {
    enName: "Pioneer DJ DJM-S11 Professional 2-Channel Battle DJ Mixer",
    enDesc: "Professional 2-channel battle mixer with 4.3-inch customizable touch screen, MAGVEL FADER PRO, and Touch FX for scratch artists.",
  },
  "pioneer-dj-djm-s7": {
    enName: "Pioneer DJ DJM-S7 2-Channel Battle DJ Mixer",
    enDesc: "2-channel battle mixer packed with large performance pads, Bluetooth audio input, and Loop MIDI control for rekordbox & Serato DJ Pro.",
  },
  "pioneer-dj-djm-450": {
    enName: "Pioneer DJ DJM-450 2-Channel DJ Mixer",
    enDesc: "Inheriting features and design from the DJM-900NXS2, equipped with MAGVEL crossfader, Sound Color FX, and Beat FX.",
  },
  "marani-dpa260p": {
    enName: "Marani Pro Audio DPA260P Digital Speaker Management Processor",
    enDesc: "High-performance 2-in 6-out digital speaker management system with 24-bit AD/DA converters and comprehensive EQ/crossover filtering.",
  },
  "marani-dpa480p": {
    enName: "Marani Pro Audio DPA480P High-End Digital Audio Processor",
    enDesc: "Flagship 4-in 8-out digital audio processor with FIR filtering, dynamic EQ, and ultra-low noise floor for concert sound systems.",
  },
  "marani-mda4-800dm": {
    enName: "Marani MDA4-800DM 4-Channel Power Amplifier with DSP",
    enDesc: "Versatile 4 x 800W Class-D power amplifier with built-in DSP matrix processing, Dante networking, and loudspeaker protection.",
  },
  "behringer-x32-compact": {
    enName: "Behringer X32 Compact 40-Input Digital Mixing Console",
    enDesc: "Compact 40-input, 25-bus digital mixing console with 16 programmable Midas preamps, motorized faders, and USB audio interface.",
  },

  // === CATEGORY 3: LOA & PRO AUDIO ===
  "alphatheta-wave-eight": {
    enName: "AlphaTheta WAVE-EIGHT Portable Wireless DJ Speaker",
    enDesc: "Portable DJ speaker featuring ultra-low latency SonicLink wireless technology, 8-hour battery life, IPX4 waterproof rating, and built-in wheels.",
  },
  "jbl-eon-one-mk2": {
    enName: "JBL EON ONE MK2 All-in-One Column PA System",
    enDesc: "All-in-one battery-powered column PA system delivering 1500W peak output, 5-channel digital mixer with dbx and Lexicon DSP.",
  },
  "pioneer-dj-vm-50": {
    enName: "Pioneer DJ VM-50 5.25\" Active Studio Monitor",
    enDesc: "Active 5.25-inch monitor speaker with Class D amplification, DSP settings for customizable voicing, and Aramid fiber woofer.",
  },
  "pioneer-dj-vm-70": {
    enName: "Pioneer DJ VM-70 6.5\" Active Studio Monitor",
    enDesc: "Powerful 6.5-inch active studio monitor featuring 100W Class D power, solid 4mm aluminum front baffle, and linear DSP voicing.",
  },
  "pioneer-dj-vm-80": {
    enName: "Pioneer DJ VM-80 8\" Active Studio Monitor",
    enDesc: "Top-tier 8-inch active studio monitor delivering 120W robust output, deep punchy bass, and crystal clear high-frequency accuracy.",
  },
  "bc-speakers-18tbx100": {
    enName: "B&C Speakers 18TBX100 18-Inch Subwoofer LF Driver",
    enDesc: "Legendary 18-inch stage subwoofer transducer, 4-inch (100mm) copper voice coil, 2400W Program power, handcrafted in Italy.",
  },
  "bc-speakers-15tbx100": {
    enName: "B&C Speakers 15TBX100 15-Inch LF Woofer Driver",
    enDesc: "Professional 15-inch LF woofer handling 2000W Program power with double silicone spider and ventilated aluminum chassis, Made in Italy.",
  },
  "bc-speakers-12ndl76": {
    enName: "B&C Speakers 12NDL76 12-Inch Neodymium LF Driver",
    enDesc: "Lightweight 12-inch Neodymium LF driver with 1000W Program handling, high sensitivity, and low distortion for compact line array systems.",
  },
  "bc-speakers-de900tn": {
    enName: "B&C Speakers DE900TN 3-Inch Titanium HF Compression Driver",
    enDesc: "Premium 3-inch titanium diaphragm HF compression driver with Neodymium magnet, delivering crisp high frequencies up to 18kHz.",
  },
  "bc-speakers-de250": {
    enName: "B&C Speakers DE250 1-Inch Polyimide HF Compression Driver",
    enDesc: "Industry-standard 1-inch throat compression driver with Polyimide diaphragm for smooth, natural high frequency response and unmatched reliability.",
  },

  // === CATEGORY 4: HIỆU ỨNG & MÁY KHÓI ===
  "antari-z-1000ii": {
    enName: "Antari Z-1000II 1000W Professional Fog Machine",
    enDesc: "1000W stage fog machine featuring ECO thermal control technology, powerful smoke output, and convenient remote control.",
  },
  "antari-z-1500ii": {
    enName: "Antari Z-1500II 1500W DMX Stage Fog Machine",
    enDesc: "Professional 1500W DMX fog machine with Unicore technology and LCD control module, ideal for events, clubs, and production stages.",
  },
  "antari-z-3000ii": {
    enName: "Antari Z-3000II 3000W Heavy-Duty High-Output Fog Machine",
    enDesc: "Heavy-duty 3000W massive output fog generator built for large music festivals, outdoor concerts, and stadium productions.",
  },
  "antari-m-7-rgba": {
    enName: "Antari M-7 RGBA High-Output Vertical Fog Machine",
    enDesc: "High-output vertical fogger equipped with 22 RGBA LEDs, creating stunning simulated CO2 fire column and colored plume effects.",
  },
  "antari-ice-101": {
    enName: "Antari ICE-101 Low-Lying Ice Fog Machine",
    enDesc: "Low-lying ground fog machine using regular ice cubes to create enchanting cloud-like floor effects for weddings and theatrical stages.",
  },
  "antari-dng-250": {
    enName: "Antari DNG-250 Industrial Low Fog Generator",
    enDesc: "Industrial low fog generator with onboard gas compressor cooling, eliminating the need for dry ice or water ice, with 100% continuous duty cycle.",
  },
  "antari-f-1-fazer": {
    enName: "Antari F-1 Fazer High-Performance Stage Faze Machine",
    enDesc: "High-performance faze machine producing smooth, even atmospheric haze to highlight stage lighting and laser beams without irritating audience eyes.",
  },
  "antari-af-3": {
    enName: "Antari AF-3 Professional Stage Effect Wind Fan",
    enDesc: "Professional 3-speed stage wind fan with DMX-512 and rotary control, designed to disperse fog and create dramatic wind effects.",
  },
  "antari-flg-5": {
    enName: "Antari FLG-5 Heavy Fog Fluid (5L Canister)",
    enDesc: "Water-based heavy fog liquid formulated to European CE and RoHS safety standards, odorless, non-toxic, leaving zero oily residue.",
  },
  "antari-flc-5": {
    enName: "Antari FLC-5 Fast Dissipating Fog Fluid (5L Canister)",
    enDesc: "Fast-dissipating fog fluid designed for vertical LED fog machines and simulated CO2 cannon blasts, evaporating within seconds.",
  },

  // === CATEGORY 5: TAI NGHE & PHỤ KIỆN ===
  "alphatheta-hdj-f10": {
    enName: "AlphaTheta HDJ-F10 SonicLink Wireless DJ Headphones",
    enDesc: "Breakthrough professional DJ headphones featuring ultra-low latency SonicLink wireless connectivity, active noise cancellation, and 30h battery.",
  },
  "pioneer-dj-hdj-x10": {
    enName: "Pioneer DJ HDJ-X10 Flagship Professional DJ Headphones",
    enDesc: "Flagship over-ear DJ headphones with 5Hz-40kHz ultra-wide frequency response, US Military MIL-STD-810G shock resistance, and nano coating.",
  },
  "pioneer-dj-hdj-x7": {
    enName: "Pioneer DJ HDJ-X7 Professional DJ Headphones",
    enDesc: "Professional DJ monitoring headphones with newly developed 50mm drivers, delivering pristine bass separation and high-volume clarity.",
  },
  "pioneer-dj-hdj-x5": {
    enName: "Pioneer DJ HDJ-X5 On-Ear DJ Headphones",
    enDesc: "Versatile DJ headphones with punchy bass, distortion-free output at high volumes, and durable swivel mechanism for live performance.",
  },
  "pioneer-dj-hdj-cue1": {
    enName: "Pioneer DJ HDJ-CUE1 Style DJ Headphones",
    enDesc: "Compact entry-level DJ headphones with rich sound quality, sleek styling, and customizable colored cable/pad accessory packs.",
  },
  "sennheiser-ew-d-skm-s": {
    enName: "Sennheiser EW-D SKM-S Digital Wireless Handheld Microphone System",
    enDesc: "Next-generation UHF digital wireless handheld microphone system featuring class-leading 134 dB dynamic range and Smart Assist mobile app control.",
  },
  "sennheiser-mmd-945": {
    enName: "Sennheiser MMD 945 Supercardioid Dynamic Vocal Capsule",
    enDesc: "High-end supercardioid dynamic microphone capsule providing rich vocal presence, maximum feedback rejection, and high sound pressure level handling.",
  },
  "sennheiser-e835-s": {
    enName: "Sennheiser E835-S Professional Cardioid Handheld Vocal Microphone",
    enDesc: "Cardioid dynamic lead vocal stage microphone with silent on/off switch, rugged metal construction, and excellent feedback rejection.",
  },
  "klotz-titanium-cable-6m": {
    enName: "Klotz Titanium 6m Premium Audio & Instrument Cable",
    enDesc: "Audiophile-grade high-end instrument cable made in Germany with 24K gold-plated Neutrik connectors and ultra-low 75 pF/m capacitance.",
  },
  "klotz-greyhound-cable-10m": {
    enName: "Klotz Greyhound 10m Professional XLR Microphone Cable",
    enDesc: "High-grade male-to-female XLR microphone cable with premium noise shielding, durable flexible PVC jacket, and lifetime reliability.",
  },
};

// Map of Vietnamese common prefixes to English audio terminology
const VIETNAMESE_PREFIX_RULES: Array<{ pattern: RegExp; replace: string }> = [
  { pattern: /^Bàn trộn DJ 2 kênh\s+/i, replace: "2-Channel DJ Mixer " },
  { pattern: /^Bàn trộn âm thanh 2 kênh\s+/i, replace: "2-Channel Audio Mixer " },
  { pattern: /^Bàn trộn DJ Battle Scratch\s+/i, replace: "Battle Scratch DJ Mixer " },
  { pattern: /^Bàn trộn âm thanh Flagship\s+/i, replace: "Flagship Audio Mixer " },
  { pattern: /^Bàn trộn âm thanh DJ\s+/i, replace: "DJ Audio Mixer " },
  { pattern: /^Bàn trộn âm thanh kỹ thuật số\s+/i, replace: "Digital Mixing Console " },
  { pattern: /^Bàn trộn âm thanh\s+/i, replace: "Audio Mixer " },
  { pattern: /^Mixer âm thanh DJ\s+/i, replace: "DJ Audio Mixer " },
  { pattern: /^Mixer âm thanh\s+/i, replace: "Audio Mixer " },
  { pattern: /^Bàn điều khiển DJ 4 kênh\s+/i, replace: "4-Channel DJ Controller " },
  { pattern: /^Bàn điều khiển DJ\s+/i, replace: "DJ Controller " },
  { pattern: /^Thiết bị DJ All-in-one\s+/i, replace: "All-in-One DJ System " },
  { pattern: /^Hệ thống DJ All-in-one\s+/i, replace: "All-in-One DJ System " },
  { pattern: /^Đầu phát đa phương tiện DJ\s+/i, replace: "DJ Multi Player " },
  { pattern: /^Mâm đĩa than kỹ thuật số & Analog\s+/i, replace: "Digital & Analog Hybrid Turntable " },
  { pattern: /^Mâm đĩa than chuyên nghiệp\s+/i, replace: "Professional Turntable " },
  { pattern: /^Mâm đĩa than\s+/i, replace: "Turntable " },
  { pattern: /^Bộ xử lý tín hiệu kỹ thuật số\s+/i, replace: "Digital Audio Processor " },
  { pattern: /^Bộ xử lý tín hiệu cao cấp\s+/i, replace: "High-End Audio Processor " },
  { pattern: /^Bộ xử lý tín hiệu\s+/i, replace: "Audio Processor " },
  { pattern: /^Cục đẩy công suất tích hợp DSP\s+/i, replace: "DSP Power Amplifier " },
  { pattern: /^Cục đẩy công suất\s+/i, replace: "Power Amplifier " },
  { pattern: /^Loa di động biểu diễn\s+/i, replace: "Portable Performance Speaker " },
  { pattern: /^Hệ thống loa Cột PA\s+/i, replace: "Column PA Speaker System " },
  { pattern: /^Loa kiểm âm Monitor\s+/i, replace: "Active Studio Monitor " },
  { pattern: /^Loa kiểm âm\s+/i, replace: "Studio Monitor " },
  { pattern: /^Củ loa Subwoofer rời\s+/i, replace: "Subwoofer LF Driver " },
  { pattern: /^Củ loa Bass rời\s+/i, replace: "LF Woofer Driver " },
  { pattern: /^Củ loa Bass Neodymium\s+/i, replace: "Neodymium LF Driver " },
  { pattern: /^Củ Treble kèn Titanium\s+/i, replace: "Titanium HF Driver " },
  { pattern: /^Củ Treble kèn Polyimide\s+/i, replace: "Polyimide HF Driver " },
  { pattern: /^Máy tạo khói sân khấu\s+/i, replace: "Stage Fog Machine " },
  { pattern: /^Máy tạo khói công suất khủng\s+/i, replace: "High-Output Fog Machine " },
  { pattern: /^Máy phun khói đứng LED RGBA\s+/i, replace: "LED RGBA Vertical Fog Machine " },
  { pattern: /^Máy tạo khói lạnh sàn tiệc cưới\s+/i, replace: "Low-Lying Ice Fog Machine " },
  { pattern: /^Hệ thống tạo khói lạnh công nghiệp\s+/i, replace: "Industrial Low Fog System " },
  { pattern: /^Máy tạo sương mù mờ Fazer\s+/i, replace: "Stage Fazer Machine " },
  { pattern: /^Quạt điều hướng gió sân khấu\s+/i, replace: "Stage Wind Fan " },
  { pattern: /^Dung dịch tạo khói Heavy Fog\s+/i, replace: "Heavy Fog Fluid " },
  { pattern: /^Dung dịch tạo khói nhanh tan\s+/i, replace: "Fast Dissipating Fog Fluid " },
  { pattern: /^Dung dịch tạo khói\s+/i, replace: "Fog Fluid " },
  { pattern: /^Tai nghe DJ không dây SonicLink\s+/i, replace: "SonicLink Wireless DJ Headphones " },
  { pattern: /^Tai nghe DJ chuyên nghiệp\s+/i, replace: "Professional DJ Headphones " },
  { pattern: /^Tai nghe DJ phong cách\s+/i, replace: "Style DJ Headphones " },
  { pattern: /^Tai nghe DJ\s+/i, replace: "DJ Headphones " },
  { pattern: /^Hệ thống micro không dây kỹ thuật số\s+/i, replace: "Digital Wireless Microphone System " },
  { pattern: /^Hệ thống micro không dây\s+/i, replace: "Wireless Microphone System " },
  { pattern: /^Đầu Capsule micro vocal\s+/i, replace: "Vocal Microphone Capsule " },
  { pattern: /^Micro có dây chuyên nghiệp\s+/i, replace: "Professional Wired Microphone " },
  { pattern: /^Dây tín hiệu âm thanh cao cấp\s+/i, replace: "Premium Audio Cable " },
  { pattern: /^Dây micro XLR chuyên dụng\s+/i, replace: "Professional XLR Microphone Cable " },
];

// Dictionary of specifications keys
export const SPEC_KEY_TRANSLATIONS: Record<string, string> = {
  "Thương hiệu": "Brand",
  "Màn hình": "Display",
  "Số kênh": "Channels",
  "Cổng kết nối": "Connectivity",
  "Bảo hành": "Warranty",
  "Mâm xoay": "Jog Wheel",
  "Bộ giải mã": "Audio DAC",
  "Kết nối": "Connectivity",
  "Bộ vi xử lý": "Processor",
  "Công suất": "Power Output",
  "SPL tối đa": "Max SPL",
  "Thời lượng pin": "Battery Life",
  "Công nghệ": "Technology",
  "Chống nước": "Water Resistance",
  "Củ loa": "Drivers",
  "Đường kính": "Diameter",
  "Xuất xứ": "Origin",
  "Lưu lượng": "Output Volume",
  "Dung tích bình": "Tank Capacity",
  "Dung tích": "Capacity",
  "Hệ thống LED": "LED System",
  "Công suất phun": "Fog Output",
  "Ngăn đá": "Ice Chamber",
  "Hệ thống làm lạnh": "Cooling System",
  "Chu kỳ hoạt động": "Duty Cycle",
  "Quạt gió": "Fan",
  "Tốc độ": "Speed",
  "Điều khiển": "Control",
  "Độ an toàn": "Safety Certification",
  "Đặc tính": "Features",
  "Pin": "Battery",
  "Dải tần": "Frequency Response",
  "Màng loa": "Diaphragm / Driver",
  "Độ bền": "Durability",
  "Dải động": "Dynamic Range",
  "Búp sóng": "Polar Pattern",
  "Loại đầu thu": "Transducer Type",
  "Chiều dài": "Length",
  "Đầu jack": "Connectors",
  "Đầu nối": "Connectors",
  "Họng ra": "Throat Diameter",
  "Zone Output": "Zone Output",
  "DAC": "DAC",
  "Nam châm": "Magnet Type",
};

/**
 * Get the translated product name based on language
 */
export function getTranslatedProductName(
  productOrSlugOrName: { slug?: string; name?: string } | string,
  lang: string = "vi"
): string {
  if (lang !== "en") {
    if (typeof productOrSlugOrName === "string") return productOrSlugOrName;
    return productOrSlugOrName.name || "";
  }

  // If object has slug
  let slug = "";
  let originalName = "";
  if (typeof productOrSlugOrName === "string") {
    originalName = productOrSlugOrName;
    // Check if passed string is a slug
    if (PRODUCT_TRANSLATIONS[productOrSlugOrName]) {
      return PRODUCT_TRANSLATIONS[productOrSlugOrName].enName;
    }
  } else {
    slug = productOrSlugOrName.slug || "";
    originalName = productOrSlugOrName.name || "";
  }

  // 1. Direct slug match
  if (slug && PRODUCT_TRANSLATIONS[slug]) {
    return PRODUCT_TRANSLATIONS[slug].enName;
  }

  // 2. Lookup by matching original name in translations table
  for (const [key, item] of Object.entries(PRODUCT_TRANSLATIONS)) {
    if (key === originalName.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
      return item.enName;
    }
  }

  // 3. Fallback rule-based prefix translation
  if (originalName) {
    let translated = originalName;
    for (const rule of VIETNAMESE_PREFIX_RULES) {
      if (rule.pattern.test(translated)) {
        translated = translated.replace(rule.pattern, rule.replace);
        return translated.trim();
      }
    }
    return originalName;
  }

  return "";
}

/**
 * Get the translated product description based on language
 */
export function getTranslatedProductDesc(
  productOrSlugOrDesc: { slug?: string; description?: string } | string,
  lang: string = "vi"
): string {
  if (lang !== "en") {
    if (typeof productOrSlugOrDesc === "string") return productOrSlugOrDesc;
    return productOrSlugOrDesc.description || "";
  }

  let slug = "";
  let originalDesc = "";
  if (typeof productOrSlugOrDesc === "string") {
    if (PRODUCT_TRANSLATIONS[productOrSlugOrDesc]?.enDesc) {
      return PRODUCT_TRANSLATIONS[productOrSlugOrDesc].enDesc!;
    }
    originalDesc = productOrSlugOrDesc;
  } else {
    slug = productOrSlugOrDesc.slug || "";
    originalDesc = productOrSlugOrDesc.description || "";
  }

  if (slug && PRODUCT_TRANSLATIONS[slug]?.enDesc) {
    return PRODUCT_TRANSLATIONS[slug].enDesc!;
  }

  return originalDesc || "Authentic professional DJ & audio equipment at VanBass Music Center Da Nang.";
}

/**
 * Translate specification key
 */
export function getTranslatedSpecKey(key: string, lang: string = "vi"): string {
  if (lang !== "en") return key;
  return SPEC_KEY_TRANSLATIONS[key] || key;
}
