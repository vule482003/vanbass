from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field


class HeroPanelLeft(BaseModel):
    tag: str = "01 / HARDWARE & AUDIO"
    title: str = "THIẾT BỊ DJ"
    desc: str = "Phân phối chính hãng Pioneer DJ, AlphaTheta, Mixer & Loa kiểm âm cao cấp."
    link: str = "/products"
    button_text: str = "Khám phá thiết bị"
    bg_image: str = "/images/hero/hero_hardware.jpg"


class HeroPanelCenter(BaseModel):
    badge: str = "THIẾT BỊ DJ CHÍNH HÃNG"
    headline: str = "HỆ THỐNG ÂM THANH & CHO THUÊ DJ"
    desc: str = "Giải pháp thiết bị biểu diễn sân khấu, party, club & sự kiện hàng đầu miền Trung."
    link: str = "/products"
    button_text: str = "THUÊ THIẾT BỊ NGAY"
    bg_image: str = "/images/hero/hero_performance.jpg"


class HeroPanelRight(BaseModel):
    tag: str = "03 / SHOWROOM & STUDIO"
    title: str = "TRẢI NGHIỆM"
    desc: str = "Nghe thử âm thanh trực tiếp tại Showroom Đà Nẵng & hỗ trợ kỹ thuật 24/7."
    link: str = "/contact"
    button_text: str = "Ghé thăm showroom"
    bg_image: str = "/images/hero/hero_showroom.jpg"


class IntroStat(BaseModel):
    value: str
    label: str


class IntroSectionConfig(BaseModel):
    kicker: str = "VANBASS MUSIC CENTER • ĐÀ NẴNG"
    headline_top: str = "Thiết bị chuẩn chất."
    headline_bottom: str = "Âm thanh đỉnh cao."
    desc: str = "VanBass Music Center là điểm đến uy tín hàng đầu tại Đà Nẵng để tìm kiếm, trải nghiệm thực tế và thuê các dòng bàn DJ, mixer, loa biểu diễn và hệ thống âm thanh chuyên nghiệp từ Pioneer DJ, AlphaTheta, Allen & Heath."
    stats: list[IntroStat] = Field(
        default_factory=lambda: [
            IntroStat(value="100%", label="Chính Hãng"),
            IntroStat(value="24/7", label="Hỗ Trợ Kỹ Thuật"),
            IntroStat(value="#1", label="Đà Nẵng & Miền Trung"),
        ]
    )
    button_text: str = "Tìm hiểu về VanBass"
    button_link: str = "/about"


class RentalSectionConfig(BaseModel):
    kicker: str = "CHO THUÊ THIẾT BỊ"
    headline_top: str = "Cần thiết bị DJ"
    headline_bottom: str = "cho sự kiện?"
    desc: str = "Tìm kiếm thiết bị phù hợp cho party, event, wedding, bar, studio hoặc các chương trình biểu diễn tại Đà Nẵng."
    features: list[str] = Field(
        default_factory=lambda: [
            "Thiết bị DJ và âm thanh đa dạng",
            "Hỗ trợ lựa chọn thiết bị phù hợp",
            "Tư vấn nhu cầu thuê theo sự kiện",
        ]
    )
    button_text: str = "Xem thiết bị cho thuê"
    button_link: str = "/products"


class LocalCtaConfig(BaseModel):
    kicker: str = "SHOWROOM & TRẢI NGHIỆM THỰC TẾ"
    headline_top: str = "Trải nghiệm thiết bị DJ"
    headline_bottom: str = "ngay tại Showroom Đà Nẵng."
    desc: str = "Ghé thăm không gian trải nghiệm thực tế các dòng máy DJ mới nhất, nhận tư vấn chuyên sâu và giải pháp âm thanh sự kiện tối ưu."
    primary_btn_text: str = "Khám phá sản phẩm"
    primary_btn_link: str = "/products"
    secondary_btn_text: str = "Liên hệ tư vấn / Showroom"
    secondary_btn_link: str = "/contact"


class CategoriesHighlightConfig(BaseModel):
    kicker: str = "DANH MỤC SẢN PHẨM"
    title: str = "Khám phá theo danh mục"
    button_text: str = "Xem toàn bộ"
    button_link: str = "/products"


class FloatingContactsConfig(BaseModel):
    enabled: bool = True
    hotline: str = "0706067799"
    hotline_display: str = "0706.067.799"
    zalo_link: str = "https://zalo.me/0706067799"
    messenger_link: str = "https://www.facebook.com/vanbassmusiccenterdanangvietnam?locale=vi_VN"
    maps_link: str = "https://www.google.com/maps?cid=3481175637981139835"


class VisibilityConfig(BaseModel):
    show_marquee: bool = True
    show_hero: bool = True
    show_products: bool = True
    show_categories: bool = True
    show_rental: bool = True
    show_intro: bool = True
    show_cta: bool = True
    show_floating_contact: bool = True


class HomeData(BaseModel):
    marquee_items: list[str] = Field(
        default_factory=lambda: [
            "⚡ PIONEER DJ OFFICIAL DISTRIBUTOR",
            "ALPHATHETA",
            "ALLEN & HEATH",
            "DENON DJ",
            "🎧 SHOWROOM TEST MÁY ĐÀ NẴNG",
            "⚡ HỖ TRỢ KỸ THUẬT 24/7",
            "GIAO HÀNG HỎA TỐC",
            "🔥 CHO THUÊ THIẾT BỊ SỰ KIỆN 24/7",
        ]
    )
    hero_left: HeroPanelLeft = Field(default_factory=HeroPanelLeft)
    hero_center: HeroPanelCenter = Field(default_factory=HeroPanelCenter)
    hero_right: HeroPanelRight = Field(default_factory=HeroPanelRight)
    categories_highlight: CategoriesHighlightConfig = Field(default_factory=CategoriesHighlightConfig)
    intro: IntroSectionConfig = Field(default_factory=IntroSectionConfig)
    rental: RentalSectionConfig = Field(default_factory=RentalSectionConfig)
    local_cta: LocalCtaConfig = Field(default_factory=LocalCtaConfig)
    floating_contacts: FloatingContactsConfig = Field(default_factory=FloatingContactsConfig)
    visibility: VisibilityConfig = Field(default_factory=VisibilityConfig)


class HomeConfigUpdate(BaseModel):
    data: HomeData


class HomeConfigResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID | None = None
    data: HomeData
    updated_at: datetime | None = None
