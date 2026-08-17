import sys
import uuid
from decimal import Decimal

if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

from sqlalchemy import text

from app.core.security import hash_password
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.category import Category
from app.models.product import Product
from app.models.slug_redirect import SlugRedirect
from app.models.user import User, UserRole


def seed_database():
    print("Migrating schema & Creating all tables in PostgreSQL...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Schema Migration: Add SEO columns if not exist
        migration_sqls = [
            "ALTER TABLE categories ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);",
            "ALTER TABLE categories ADD COLUMN IF NOT EXISTS meta_description VARCHAR(500);",
            "ALTER TABLE categories ADD COLUMN IF NOT EXISTS meta_keywords VARCHAR(255);",
            "ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);",
            "ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_description VARCHAR(500);",
            "ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_keywords VARCHAR(255);",
            "ALTER TABLE products ADD COLUMN IF NOT EXISTS canonical_url VARCHAR(500);",
        ]
        for sql in migration_sqls:
            db.execute(text(sql))
        db.commit()

        # 1. Seed Users
        admin_user = db.query(User).filter(User.email == "admin@vanbass.vn").first()
        if not admin_user:
            admin_user = User(
                id=uuid.uuid4(),
                email="admin@vanbass.vn",
                password_hash=hash_password("admin123456"),
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(admin_user)
            print("Created default admin user: admin@vanbass.vn")

        customer_user = db.query(User).filter(User.email == "customer@vanbass.vn").first()
        if not customer_user:
            customer_user = User(
                id=uuid.uuid4(),
                email="customer@vanbass.vn",
                password_hash=hash_password("vanbass123"),
                role=UserRole.CUSTOMER,
                is_active=True,
            )
            db.add(customer_user)
            print("Created default customer user: customer@vanbass.vn")

        db.commit()

        # 2. Seed Categories with SEO Metadata
        categories_data = [
            {
                "slug": "dj",
                "name": "Thiết bị DJ",
                "description": "DJ controller, CDJ và hệ thống DJ chuyên nghiệp cho studio và biểu diễn.",
                "meta_title": "Thiết Bị DJ Chính Hãng Đà Nẵng | Pioneer DJ & AlphaTheta - VanBass",
                "meta_description": "Phân phối và cho thuê bàn DJ, DJ Controller, CDJ Pioneer, AlphaTheta chính hãng tại Đà Nẵng. Bảo hành 12 tháng, hỗ trợ kỹ thuật 24/7.",
                "meta_keywords": "thiết bị dj đà nẵng, mua bàn dj, thuê bàn dj đà nẵng, pioneer dj, alphatheta",
            },
            {
                "slug": "mixer",
                "name": "Mixer & Bàn trộn",
                "description": "Mixer DJ 2 kênh, 4 kênh chuẩn club quốc tế và bàn trộn âm thanh phòng thu.",
                "meta_title": "Bàn Trộn Âm Thanh & Mixer DJ Chuyên Nghiệp Đà Nẵng | VanBass",
                "meta_description": "Các dòng mixer DJ 2 kênh, 4 kênh chuẩn club quốc tế như Pioneer DJM-A9, DJM-V5 chính hãng tại Đà Nẵng.",
                "meta_keywords": "mixer dj đà nẵng, bàn trộn âm thanh, djm a9, djm v5, mixer pioneer",
            },
            {
                "slug": "audio",
                "name": "Loa & Âm thanh",
                "description": "Hệ thống loa column di động, loa monitor kiểm âm và dàn loa sân khấu.",
                "meta_title": "Loa Biểu Diễn & Hệ Thống Âm Thanh Sân Khấu Đà Nẵng | VanBass",
                "meta_description": "Cho thuê và bán loa column biểu diễn JBL EON ONE, AlphaTheta WAVE-EIGHT, loa kiểm âm cho sự kiện và phòng thu tại Đà Nẵng.",
                "meta_keywords": "loa dj đà nẵng, thuê loa sự kiện, jbl eon one, alphatheta wave eight",
            },
            {
                "slug": "accessories",
                "name": "Tai nghe & Phụ kiện",
                "description": "Tai nghe DJ không dây SonicLink, cáp tín hiệu, case chống sốc.",
                "meta_title": "Tai Nghe DJ & Phụ Kiện Âm Thanh Cao Cấp Đà Nẵng | VanBass",
                "meta_description": "Tai nghe DJ kiểm âm không dây SonicLink HDJ-F10, cáp tín hiệu cao cấp và case chống sốc bảo vệ thiết bị.",
                "meta_keywords": "tai nghe dj, phụ kiện dj đà nẵng, case dj, cáp tín hiệu âm thanh",
            },
        ]

        cat_map = {}
        for cat_info in categories_data:
            cat = db.query(Category).filter(Category.slug == cat_info["slug"]).first()
            if not cat:
                cat = Category(
                    id=uuid.uuid4(),
                    slug=cat_info["slug"],
                    name=cat_info["name"],
                    description=cat_info["description"],
                    meta_title=cat_info["meta_title"],
                    meta_description=cat_info["meta_description"],
                    meta_keywords=cat_info["meta_keywords"],
                    is_active=True,
                )
                db.add(cat)
                db.flush()
                print(f"Created category: {cat.name}")
            else:
                cat.meta_title = cat_info["meta_title"]
                cat.meta_description = cat_info["meta_description"]
                cat.meta_keywords = cat_info["meta_keywords"]
            cat_map[cat_info["slug"]] = cat.id

        db.commit()

        # 3. Seed 8 Authentic G.Music Products with SEO Metadata
        products_data = [
            {
                "name": "Thiết bị DJ All-in-one AlphaTheta XDJ-AN",
                "slug": "alphatheta-xdj-an",
                "sku": "XDJ-AN-AT",
                "category_slug": "dj",
                "brand": "AlphaTheta",
                "sale_enabled": True,
                "sale_price": Decimal("37227600"),
                "rental_enabled": True,
                "rental_price": Decimal("1200000"),
                "stock_quantity": 8,
                "meta_title": "Bàn DJ AlphaTheta XDJ-AN All-in-One Chính Hãng | Giá Tốt Đà Nẵng",
                "meta_description": "Mua & thuê bàn DJ AlphaTheta XDJ-AN chính hãng tại VanBass Đà Nẵng. Màn hình cảm ứng 7 inch, USB kép, kết nối không dây hiện đại.",
                "meta_keywords": "alphatheta xdj an, bàn dj all in one, thuê xdj an đà nẵng, mua máy dj đà nẵng",
                "canonical_url": "https://vanbass.vn/products/alphatheta-xdj-an",
                "description": "Hệ thống DJ all-in-one thế hệ mới với màn hình cảm ứng 7 inch, hỗ trợ phát nhạc không dây và USB kép.",
                "specifications": {
                    "Màn hình": "7 inch cảm ứng đa điểm",
                    "Số kênh": "2 kênh độc lập",
                    "Cổng kết nối": "USB-A x2, USB-B x1, Master XLR/RCA, Mic XLR",
                    "Tần số đáp ứng": "20 Hz - 20 kHz",
                    "Kích thước / Trọng lượng": "728 x 118 x 469 mm / 9.3 kg",
                    "Bảo hành": "Chính hãng 12 tháng tại VanBass Music Center / G.Music JSC",
                },
            },
            {
                "name": "Đầu phát đa phương tiện DJ AlphaTheta CDJ-1500X",
                "slug": "alphatheta-cdj-1500x",
                "sku": "CDJ-1500X-AT",
                "category_slug": "dj",
                "brand": "AlphaTheta",
                "sale_enabled": True,
                "sale_price": Decimal("49680000"),
                "rental_enabled": True,
                "rental_price": Decimal("1500000"),
                "stock_quantity": 5,
                "meta_title": "Đầu Phát DJ AlphaTheta CDJ-1500X Chuyên Nghiệp | VanBass Đà Nẵng",
                "meta_description": "Đầu phát DJ AlphaTheta CDJ-1500X hỗ trợ Pro DJ Link, mâm xoay Full-size 206mm và bộ giải mã âm thanh 96kHz/32-bit.",
                "meta_keywords": "cdj 1500x, alphatheta cdj 1500x, đầu phát dj, mua cdj đà nẵng",
                "canonical_url": "https://vanbass.vn/products/alphatheta-cdj-1500x",
                "description": "Đầu phát DJ chuyên nghiệp hỗ trợ Pro DJ Link, mâm xoay Full-size siêu mượt và xử lý âm thanh 96kHz/24-bit.",
                "specifications": {
                    "Mâm xoay": "Full size 206mm với màn hình LCD On Jog Display",
                    "Định dạng hỗ trợ": "FLAC, Apple Lossless, WAV, AIFF, MP3, AAC",
                    "Bộ giải mã": "DAC 96kHz / 32-bit",
                    "Bảo hành": "Chính hãng 12 tháng",
                },
            },
            {
                "name": "Đầu phát đa phương tiện DJ AlphaTheta CDJ-3000X",
                "slug": "alphatheta-cdj-3000x",
                "sku": "CDJ-3000X-AT",
                "category_slug": "dj",
                "brand": "AlphaTheta",
                "sale_enabled": True,
                "sale_price": Decimal("89910000"),
                "rental_enabled": True,
                "rental_price": Decimal("2500000"),
                "stock_quantity": 4,
                "meta_title": "Flagship Đầu Phát DJ AlphaTheta CDJ-3000X | VanBass Đà Nẵng",
                "meta_description": "Flagship đầu phát DJ cao cấp nhất thế giới AlphaTheta CDJ-3000X, vi xử lý MPU hiệu năng cao, màn hình cảm ứng 9 inch độ nét cao.",
                "meta_keywords": "cdj 3000x, alphatheta cdj 3000, thuê cdj 3000 đà nẵng",
                "canonical_url": "https://vanbass.vn/products/alphatheta-cdj-3000x",
                "description": "Flagship đầu phát DJ cao cấp nhất thế giới, vi xử lý MPU tiên tiến, màn hình cảm ứng 9 inch độ phân giải cao.",
                "specifications": {
                    "Màn hình": "9 inch HD Touchscreen",
                    "Vi xử lý": "Dual-core MPU hiệu năng cao",
                    "Kết nối": "Gigabit Pro DJ Link, Gigabit LAN",
                    "Bảo hành": "Chính hãng 12 tháng",
                },
            },
            {
                "name": "Bàn trộn âm thanh DJ AlphaTheta DJM-V5",
                "slug": "alphatheta-djm-v5",
                "sku": "DJM-V5-AT",
                "category_slug": "mixer",
                "brand": "AlphaTheta",
                "sale_enabled": True,
                "sale_price": Decimal("67200000"),
                "rental_enabled": True,
                "rental_price": Decimal("2000000"),
                "stock_quantity": 3,
                "meta_title": "Mixer DJ 4 Kênh AlphaTheta DJM-V5 Chính Hãng | VanBass",
                "meta_description": "Mixer DJ 4 kênh chuyên nghiệp AlphaTheta DJM-V5 với bộ xử lý 64-bit DSP, 14 Beat FX và 6 Sound Color FX độc lập.",
                "meta_keywords": "djm v5, mixer alphatheta, mixer 4 kênh dj, thuê mixer dj đà nẵng",
                "canonical_url": "https://vanbass.vn/products/alphatheta-djm-v5",
                "description": "Mixer DJ 4 kênh chuyên nghiệp với mạch giải mã 64-bit cao cấp, bộ lọc Filter độc lập từng kênh và Sound Color FX.",
                "specifications": {
                    "Số kênh": "4 kênh âm thanh + 2 kênh Mic",
                    "Xử lý tín hiệu": "64-bit DSP",
                    "Hiệu ứng": "14 Beat FX, 6 Sound Color FX",
                    "Bảo hành": "Chính hãng 12 tháng",
                },
            },
            {
                "name": "Bàn trộn âm thanh DJ Pioneer DJ DJM-A9",
                "slug": "pioneer-dj-djm-a9",
                "sku": "DJM-A9-PDJ",
                "category_slug": "mixer",
                "brand": "Pioneer DJ",
                "sale_enabled": True,
                "sale_price": Decimal("72000000"),
                "rental_enabled": True,
                "rental_price": Decimal("2200000"),
                "stock_quantity": 3,
                "meta_title": "Mixer Pioneer DJ DJM-A9 Chuẩn Club Quốc Tế | VanBass Đà Nẵng",
                "meta_description": "Bàn trộn âm thanh DJ Pioneer DJM-A9 4 kênh đẳng cấp thế giới, tích hợp ESS Technology 32-bit DAC, Soundcard kép.",
                "meta_keywords": "djm a9, mixer pioneer djm a9, thuê djm a9 đà nẵng",
                "canonical_url": "https://vanbass.vn/products/pioneer-dj-djm-a9",
                "description": "Chuẩn mực Mixer 4 kênh cho các Club và Festival hàng đầu toàn cầu, tích hợp ESS Technology 32-bit DAC.",
                "specifications": {
                    "Số kênh": "4 kênh + Dual USB Soundcard",
                    "Công nghệ": "ESS Technology 32-bit DAC",
                    "Tính năng nổi bật": "Center Lock cho Sound Color FX, Dual Mic với Phantom Power",
                    "Bảo hành": "Chính hãng 12 tháng",
                },
            },
            {
                "name": "Thiết bị điều khiển DJ Pioneer DJ DDJ-FLX4-W (White)",
                "slug": "pioneer-dj-ddj-flx4-w",
                "sku": "DDJ-FLX4-W-PDJ",
                "category_slug": "dj",
                "brand": "Pioneer DJ",
                "sale_enabled": True,
                "sale_price": Decimal("12270000"),
                "rental_enabled": True,
                "rental_price": Decimal("400000"),
                "stock_quantity": 12,
                "meta_title": "Bàn DJ Pioneer DDJ-FLX4-W Trắng Giới Hạn | VanBass Đà Nẵng",
                "meta_description": "Mua & thuê bàn DJ Pioneer DDJ-FLX4 màu trắng chính hãng. Tương thích rekordbox, Serato DJ Lite trên iPhone, iPad, PC, Mac.",
                "meta_keywords": "ddj flx4 trắng, pioneer ddj flx4 white, mua ddj flx4 đà nẵng, thuê bàn dj mini",
                "canonical_url": "https://vanbass.vn/products/pioneer-dj-ddj-flx4-w",
                "description": "DJ Controller 2 kênh phiên bản giới hạn màu Trắng, tương thích rekordbox và Serato DJ Lite trên PC, Mac, iOS, Android.",
                "specifications": {
                    "Tương thích": "rekordbox, Serato DJ Lite",
                    "Kết nối": "USB Type-C kép (nguồn + tín hiệu)",
                    "Màu sắc": "Trắng cao cấp (White Edition)",
                    "Bảo hành": "Chính hãng 12 tháng",
                },
            },
            {
                "name": "Loa di động biểu diễn AlphaTheta WAVE-EIGHT",
                "slug": "alphatheta-wave-eight",
                "sku": "WAVE-8-AT",
                "category_slug": "audio",
                "brand": "AlphaTheta",
                "sale_enabled": True,
                "sale_price": Decimal("26500000"),
                "rental_enabled": True,
                "rental_price": Decimal("800000"),
                "stock_quantity": 6,
                "meta_title": "Loa Di Động Không Dây SonicLink AlphaTheta WAVE-EIGHT | VanBass",
                "meta_description": "Loa DJ di động AlphaTheta WAVE-EIGHT pin 8 giờ, độ trễ siêu thấp SonicLink, chống nước IPX4 cho biểu diễn ngoài trời.",
                "meta_keywords": "wave eight, alphatheta wave eight, loa dj không dây, thuê loa di động đà nẵng",
                "canonical_url": "https://vanbass.vn/products/alphatheta-wave-eight",
                "description": "Loa DJ di động công nghệ không dây SonicLink siêu thấp độ trễ, pin sạc 8 giờ, chống nước IPX4 kèm tay kéo vali.",
                "specifications": {
                    "Thời lượng pin": "Lên đến 8 giờ phát liên tục",
                    "Công nghệ": "SonicLink độ trễ siêu thấp",
                    "Chuẩn chống nước": "IPX4 ngoài trời",
                    "Bảo hành": "Chính hãng 12 tháng",
                },
            },
            {
                "name": "Hệ thống loa Cột PA JBL EON ONE MK2",
                "slug": "jbl-eon-one-mk2",
                "sku": "EON-ONE-MK2-JBL",
                "category_slug": "audio",
                "brand": "JBL",
                "sale_enabled": True,
                "sale_price": Decimal("32500000"),
                "rental_enabled": True,
                "rental_price": Decimal("1000000"),
                "stock_quantity": 4,
                "meta_title": "Loa Cột All-in-One JBL EON ONE MK2 1500W | VanBass Đà Nẵng",
                "meta_description": "Hệ thống loa column PA JBL EON ONE MK2 công suất đỉnh 1500W, pin rời 6 giờ, mixer 5 kênh số DSP Lexicon & dbx cao cấp.",
                "meta_keywords": "jbl eon one mk2, loa cột jbl, thuê loa sự kiện đà nẵng",
                "canonical_url": "https://vanbass.vn/products/jbl-eon-one-mk2",
                "description": "Hệ thống loa Column PA tất cả trong một công suất đỉnh 1500W, pin rời 6 giờ, mixer 5 kênh số DSP Lexicon & dbx.",
                "specifications": {
                    "Công suất": "1500W Peak / 400W RMS",
                    "SPL tối đa": "123 dB",
                    "DSP": "Lexicon Reverb, Chorus, Delay & dbx DriveRack",
                    "Bảo hành": "Chính hãng 12 tháng",
                },
            },
        ]

        for p_data in products_data:
            existing_p = db.query(Product).filter(Product.slug == p_data["slug"]).first()
            category_id = cat_map[p_data["category_slug"]]

            if not existing_p:
                p = Product(
                    id=uuid.uuid4(),
                    category_id=category_id,
                    name=p_data["name"],
                    slug=p_data["slug"],
                    sku=p_data["sku"],
                    brand=p_data["brand"],
                    sale_enabled=p_data["sale_enabled"],
                    sale_price=p_data["sale_price"],
                    rental_enabled=p_data["rental_enabled"],
                    rental_price=p_data["rental_price"],
                    stock_quantity=p_data["stock_quantity"],
                    meta_title=p_data["meta_title"],
                    meta_description=p_data["meta_description"],
                    meta_keywords=p_data["meta_keywords"],
                    canonical_url=p_data["canonical_url"],
                    description=p_data["description"],
                    specifications=p_data["specifications"],
                    is_active=True,
                )
                db.add(p)
                print(f"Created product: {p.name}")
            else:
                existing_p.meta_title = p_data["meta_title"]
                existing_p.meta_description = p_data["meta_description"]
                existing_p.meta_keywords = p_data["meta_keywords"]
                existing_p.canonical_url = p_data["canonical_url"]

        db.commit()
        print("Database migration & seed completed successfully with full SEO attributes!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
