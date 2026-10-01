import concurrent.futures
import html
import json
import os
import re
import sys
import urllib.request
import uuid
from pathlib import Path

# Ensure UTF-8 output on Windows
if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
FRONTEND_IMAGES_DIR = BASE_DIR / "frontend" / "public" / "images" / "products"
BACKEND_IMAGES_DIR = BASE_DIR / "backend" / "static" / "products"

FRONTEND_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
BACKEND_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}

# 36 Categories definition matching gmusic.com.vn
CATEGORIES = [
    {
        "slug": "all-in-one-dj-systems",
        "name": "Hệ Thống DJ All-in-One",
        "description": "Bàn DJ độc lập All-in-One tích hợp màn hình cảm ứng, biểu diễn chuyên nghiệp không cần máy tính.",
    },
    {
        "slug": "dj-controllers",
        "name": "DJ Controllers",
        "description": "Bàn điều khiển DJ kết nối máy tính chuyên nghiệp từ AlphaTheta và Pioneer DJ.",
    },
    {
        "slug": "dj-player",
        "name": "Đầu Phát DJ (Players)",
        "description": "Đầu phát đa phương tiện DJ chuyên nghiệp chuẩn club quốc tế CDJ-3000, CDJ-1500X.",
    },
    {
        "slug": "turntables",
        "name": "Mâm Đĩa Than (Turntables)",
        "description": "Mâm xoay đĩa than vinyl chuyên nghiệp cho DJ scratch và người chơi đĩa than cao cấp.",
    },
    {
        "slug": "dj-mixers",
        "name": "Mixer DJ Chuyên Nghiệp",
        "description": "Bàn trộn âm thanh DJ từ 2 kênh đến 6 kênh cao cấp Pioneer DJM, Euphonia.",
    },
    {
        "slug": "dj-sampler",
        "name": "DJ Sampler & Remix",
        "description": "Thiết bị lấy mẫu âm thanh Sampler và Remix Stations biểu diễn live độc đáo.",
    },
    {
        "slug": "dj-software-interfaces",
        "name": "DJ Software & Audio Interfaces",
        "description": "Hộp giải mã DVS, card âm thanh và phụ kiện phần mềm rekordbox, Serato DJ.",
    },
    {
        "slug": "mixer-ban-tron-am-thanh",
        "name": "Mixer - Bàn Trộn Âm Thanh",
        "description": "Bàn trộn âm thanh sân khấu Analog & Digital chuyên nghiệp Mackie, Behringer, Marani.",
    },
    {
        "slug": "loa-roi",
        "name": "Loa Rời & Củ Treble",
        "description": "Củ loa rời, loa bass rời 2 tấc đến 5 tấc và củ treble B&C Speakers Italy, P.Audio.",
    },
    {
        "slug": "phu-kien-loa-roi",
        "name": "Phụ Kiện Loa Rời",
        "description": "Họng kèn loa treble, màng loa thay thế diaphragm và phụ kiện củ loa rời.",
    },
    {
        "slug": "loa-thung-pro-audio",
        "name": "Loa Thùng & Sân Khấu Pro Audio",
        "description": "Hệ thống loa thùng biểu diễn sân khấu, loa cột PA, loa Line Array và Subwoofer công suất lớn.",
    },
    {
        "slug": "loa-kiem-am",
        "name": "Loa Kiểm Âm (Monitor Speakers)",
        "description": "Loa kiểm âm phòng thu Studio Monitor và loa kiểm âm sân khấu độ chính xác cao.",
    },
    {
        "slug": "amplifier-cong-suat",
        "name": "Amplifier - Cục Đẩy Công Suất",
        "description": "Cục đẩy công suất âm thanh nguồn xung và nguồn xuyến chuyên nghiệp cho hệ thống âm thanh lớn.",
    },
    {
        "slug": "thiet-bi-xu-ly-tin-hieu",
        "name": "Thiết Bị Xử Lý Tín Hiệu (DSP)",
        "description": "Bộ xử lý tín hiệu kỹ thuật số DSP Marani, Crossover, Equalizer, Compressor tối ưu âm thanh.",
    },
    {
        "slug": "may-tao-khoi",
        "name": "Máy Tạo Khói & Sương Sân Khấu",
        "description": "Máy tạo khói sân khấu, máy khói lạnh, máy tạo sương Haze, máy tạo bong bóng Antari Châu Âu.",
    },
    {
        "slug": "dung-dich-tao-khoi",
        "name": "Dung Dịch & Nước Tạo Khói",
        "description": "Nước tạo khói tiêu chuẩn, dung dịch khói nhẹ Haze, nước bong bóng, nước tuyết và tinh dầu tạo hương.",
    },
    {
        "slug": "quat-dieu-huong",
        "name": "Quạt Điều Hướng Sân Khấu",
        "description": "Quạt gió chuyên dụng khuếch tán khói và tạo hiệu ứng gió sân khấu biểu diễn.",
    },
    {
        "slug": "micro-khong-day",
        "name": "Micro Không Dây Chuyên Nghiệp",
        "description": "Hệ thống micro không dây UHF cao cấp Sennheiser EW-D, micro cài áo, micro gài đầu, anten thu sóng.",
    },
    {
        "slug": "micro-co-day",
        "name": "Micro Có Dây & Phòng Thu",
        "description": "Micro có dây dynamic cho ca sĩ, micro thu âm condenser phòng thu, micro nhạc cụ chuyên nghiệp.",
    },
    {
        "slug": "headphones-dj",
        "name": "Tai Nghe DJ & Kiểm Âm",
        "description": "Tai nghe DJ chuyên nghiệp cách âm đỉnh cao AlphaTheta, Sennheiser HD 25, Pioneer DJ.",
    },
    {
        "slug": "day-tin-hieu-day-loa",
        "name": "Dây Tín Hiệu - Dây Loa",
        "description": "Dây cáp tín hiệu âm thanh Klotz AIS Germany, dây loa đồng nguyên chất chống nhiễu tuyệt đối.",
    },
    {
        "slug": "giac-ket-noi",
        "name": "Giắc Kết Nối Âm Thanh",
        "description": "Đầu giắc Canon XLR, jack 6 ly, Speakon Neutrik và RCA mạ vàng chất lượng cao.",
    },
    {
        "slug": "nhac-cu",
        "name": "Nhạc Cụ & Trống Jazz",
        "description": "Nhạc cụ biểu diễn, bộ trống Jazz, trống điện tử, máy tạo nhịp Drum Machine.",
    },
    {
        "slug": "la-cymbal",
        "name": "Lá Cymbal",
        "description": "Lá Cymbal Sabian Canada chính hãng cho dàn trống Jazz chuyên nghiệp.",
    },
    {
        "slug": "phu-kien-nhac-cu",
        "name": "Phụ Kiện Nhạc Cụ",
        "description": "Phụ kiện dùi trống, chân đế, bao đàn, phụ kiện nhạc cụ biểu diễn.",
    },
    {
        "slug": "phu-kien-dj",
        "name": "Phụ Kiện DJ",
        "description": "Bao chống sốc, túi đựng bàn DJ, nắp nhựa mica Decksaver, giá đỡ laptop cho DJ.",
    },
    {
        "slug": "phu-kien",
        "name": "Phụ Kiện Âm Thanh Tổng Hợp",
        "description": "Giá treo loa, tủ rack, module điều khiển, phụ kiện Sennheiser và thiết bị âm thanh tổng hợp.",
    },
    {
        "slug": "hieu-ung-anh-sang-da-quang",
        "name": "Hiệu Ứng Ánh Sáng & UV",
        "description": "Đèn UV tia cực tím dạ quang, sơn phản quang nghệ thuật sân khấu, bar club.",
    },
]

# Accurate Mapping from gmusic product_type to category slug
TYPE_MAP = {
    "ALL-IN-ONE DJ SYSTEMS": "all-in-one-dj-systems",
    "DJ CONTROLLERS": "dj-controllers",
    "DJ PLAYERS": "dj-player",
    "TURNTABLES": "turntables",
    "DJ MIXERS": "dj-mixers",
    "MIXER DJ": "dj-mixers",
    "DJ SAMPLER": "dj-sampler",
    "REMIX STATIONS": "dj-sampler",
    "DJ SOFTWARE & INTERFACES": "dj-software-interfaces",
    "MIXER ANALOG": "mixer-ban-tron-am-thanh",
    "MIXER DIGITAL": "mixer-ban-tron-am-thanh",
    "MIXER KÈM CÔNG SUẤT": "mixer-ban-tron-am-thanh",
    "CỦ TREBLE": "loa-roi",
    "HỌNG LOA TREBLE": "phu-kien-loa-roi",
    "LOA RỜI 2 TẤC": "loa-roi",
    "LOA RỜI 2 TẤC RƯỠI": "loa-roi",
    "LOA RỜI 3 TẤC": "loa-roi",
    "LOA RỜI 4 TẤC": "loa-roi",
    "LOA RỜI 5 TẤC": "loa-roi",
    "Phụ Kiện Loa Rời": "phu-kien-loa-roi",
    "LOA ACTIVE": "loa-thung-pro-audio",
    "LOA CỘT": "loa-thung-pro-audio",
    "LOA PASSIVE": "loa-thung-pro-audio",
    "LOA SUB": "loa-thung-pro-audio",
    "LOA SUB LINE ARRAY": "loa-thung-pro-audio",
    "LOA SUB ĐÔI": "loa-thung-pro-audio",
    "LOA THÙNG": "loa-thung-pro-audio",
    "LOA THÙNG LINE ARRAY": "loa-thung-pro-audio",
    "LOA THÙNG PASSIVE": "loa-thung-pro-audio",
    "Loa công cộng": "loa-thung-pro-audio",
    "LOA MONITOR": "loa-kiem-am",
    "MONITOR SPEAKERS": "loa-kiem-am",
    "AMPLIFIER": "amplifier-cong-suat",
    "AMPLIFIER NGUỒN XUNG": "amplifier-cong-suat",
    "AMPLIFIER NGUỒN XUYẾN": "amplifier-cong-suat",
    "BỘ XỬ LÍ TÍN HIỆU": "thiet-bi-xu-ly-tin-hieu",
    "DIGITAL METERS UNIT": "thiet-bi-xu-ly-tin-hieu",
    "DIGITAL PATCHING UNIT": "thiet-bi-xu-ly-tin-hieu",
    "MULTI EFFECTS": "thiet-bi-xu-ly-tin-hieu",
    "PROCESSORS": "thiet-bi-xu-ly-tin-hieu",
    "THIẾT BỊ XỬ LÝ TÍN HIỆU": "thiet-bi-xu-ly-tin-hieu",
    "MÁY KHUẾCH TÁN HƯƠNG": "may-tao-khoi",
    "MÁY KHÓI": "may-tao-khoi",
    "MÁY TẠO BONG BÓNG": "may-tao-khoi",
    "MÁY TẠO HAZE": "may-tao-khoi",
    "MÁY TẠO KHÓI": "may-tao-khoi",
    "MÁY TẠO KHÓI DI ĐỘNG": "may-tao-khoi",
    "MÁY TẠO SƯƠNG KHÓI": "may-tao-khoi",
    "NƯỚC HAZE": "dung-dich-tao-khoi",
    "NƯỚC KHÓI": "dung-dich-tao-khoi",
    "NƯỚC TUYẾT": "dung-dich-tao-khoi",
    "TINH DẦU HIỆU ỨNG": "dung-dich-tao-khoi",
    "QUẠT HIỆU ỨNG": "quat-dieu-huong",
    "MICRO CÀI ÁO KHÔNG DÂY": "micro-khong-day",
    "MICRO CẦM TAY KHÔNG DÂY": "micro-khong-day",
    "MICRO KHÔNG DÂY": "micro-khong-day",
    "MICRO KHÔNG DÂY GÀI ĐẦU": "micro-khong-day",
    "Micro không dây": "micro-khong-day",
    "ANTEN": "micro-khong-day",
    "ANTEN VÀ BỘ CHIA KHÔNG DÂY": "micro-khong-day",
    "MICRO CÓ DÂY": "micro-co-day",
    "MICRO NHẠC CỤ": "micro-co-day",
    "MICRO PHÒNG THU": "micro-co-day",
    "MICRO THU ÂM": "micro-co-day",
    "MICRO ĐỂ BÀN": "micro-co-day",
    "HEADPHONES": "headphones-dj",
    "DÂY LOA": "day-tin-hieu-day-loa",
    "DÂY TÍN HIỆU": "day-tin-hieu-day-loa",
    "NHẠC CỤ": "nhac-cu",
    "DRUM MACHINE": "nhac-cu",
    "Phụ kiện nhạc cụ": "phu-kien-nhac-cu",
    "Phụ kiện Sennheiser": "phu-kien",
    "PHỤ KIỆN ĐIỀU KHIỂN": "phu-kien",
    "REMOTE/ĐIỀU KHIỂN": "phu-kien",
    "GIÁ TREO": "phu-kien",
    "ACCESSORIES": "phu-kien",
    "CARD KẾT NỐI": "phu-kien",
    "RECORDING PRODUCTS": "dj-software-interfaces",
    "MUSIC PRODUCTION": "dj-software-interfaces",
}


def clean_html_to_text(html_text: str) -> str:
    if not html_text:
        return ""
    text = re.sub(r"<[^>]+>", " ", html.unescape(html_text))
    text = re.sub(r"\s+", " ", text).strip()
    return text


def download_file(src_url: str, frontend_dest: Path, backend_dest: Path) -> bool:
    """Download image to both frontend and backend locations."""
    if frontend_dest.exists() and frontend_dest.stat().st_size > 0:
        if not (backend_dest.exists() and backend_dest.stat().st_size > 0):
            try:
                backend_dest.write_bytes(frontend_dest.read_bytes())
            except Exception:
                pass
        return True

    try:
        req = urllib.request.Request(src_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()

        if len(data) > 0:
            frontend_dest.write_bytes(data)
            try:
                backend_dest.write_bytes(data)
            except Exception:
                pass
            return True
    except Exception as e:
        print(f"  [ERROR] Downloading {src_url}: {e}")
    return False


def fetch_all_gmusic_products() -> list[dict]:
    """Fetch raw product list from gmusic collection pagination."""
    all_products = []
    print("Fetching product list from gmusic.com.vn...")
    for page in range(1, 16):
        url = f"https://gmusic.com.vn/collections/all/products.json?limit=50&page={page}"
        req = urllib.request.Request(url, headers=HEADERS)
        try:
            with urllib.request.urlopen(req, timeout=15) as r:
                data = json.loads(r.read().decode("utf-8"))
                prods = data.get("products", [])
                if not prods:
                    break
                all_products.extend(prods)
                print(f"  Page {page:2d}: fetched {len(prods)} products (Total so far: {len(all_products)})")
        except Exception as e:
            print(f"  [ERROR] Page {page}: {e}")

    print(f"Done fetching! Total products collected: {len(all_products)}")
    return all_products


def process_and_download():
    raw_products = fetch_all_gmusic_products()

    cat_by_slug = {c["slug"]: c for c in CATEGORIES}

    download_tasks = []
    processed_products = []
    used_skus = set()

    for idx, p in enumerate(raw_products):
        handle = p.get("handle", f"prod-{p['id']}").strip()
        title = p.get("title", "").strip()
        vendor = p.get("vendor", "").strip() or None
        ptype = p.get("product_type", "").strip()
        body_html = p.get("body_html", "") or ""
        plain_desc = clean_html_to_text(body_html)

        cat_slug = TYPE_MAP.get(ptype, "thiet-bi-dj")
        if cat_slug not in cat_by_slug:
            cat_slug = "all-in-one-dj-systems"

        variants = p.get("variants", [])
        v0 = variants[0] if variants else {}
        raw_price = float(v0.get("price") or 0)
        sale_enabled = raw_price > 0
        sale_price = int(raw_price) if sale_enabled else None

        raw_sku = (v0.get("sku") or "").strip()
        if not raw_sku or raw_sku in used_skus:
            sku = f"VB-{p['id']}"
        else:
            sku = raw_sku
        used_skus.add(sku)

        images = p.get("images", [])
        src_url = images[0].get("src") if images else None
        if src_url:
            if src_url.startswith("//"):
                src_url = "https:" + src_url
            
            clean_url = src_url.split("?")[0]
            ext = os.path.splitext(clean_url)[1].lower()
            if ext not in [".png", ".jpg", ".jpeg", ".webp"]:
                ext = ".jpg"

            filename = f"{handle}{ext}"
            frontend_path = FRONTEND_IMAGES_DIR / filename
            backend_path = BACKEND_IMAGES_DIR / filename
            local_image_url = f"/images/products/{filename}"

            download_tasks.append((src_url, frontend_path, backend_path, handle))
        else:
            local_image_url = "/images/placeholder.jpg"

        prod_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"vanbass.vn/product/{p['id']}"))

        processed_products.append({
            "id": prod_uuid,
            "source_id": p["id"],
            "name": title,
            "slug": handle,
            "sku": sku,
            "category_slug": cat_slug,
            "brand": vendor,
            "description": body_html or title,
            "plain_description": plain_desc[:500] if plain_desc else title,
            "sale_enabled": sale_enabled,
            "sale_price": sale_price,
            "rental_enabled": False,
            "rental_price": None,
            "stock_quantity": int(v0.get("inventory_quantity") or 5),
            "is_active": True,
            "image_url": local_image_url,
            "meta_title": f"{title} | VanBass Music Center",
            "meta_description": (plain_desc[:160] + "...") if len(plain_desc) > 160 else plain_desc,
        })

    print(f"\nStarting parallel download for {len(download_tasks)} product images...")
    success_count = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = {
            executor.submit(download_file, task[0], task[1], task[2]): task[3]
            for task in download_tasks
        }
        for future in concurrent.futures.as_completed(futures):
            handle = futures[future]
            try:
                if future.result():
                    success_count += 1
                    if success_count % 50 == 0 or success_count == len(download_tasks):
                        print(f"  Downloaded: {success_count}/{len(download_tasks)} images...")
            except Exception as e:
                print(f"  [ERROR] Failed image for {handle}: {e}")

    print(f"\nImage download finished: {success_count}/{len(download_tasks)} images saved!")

    catalog_json_path = BASE_DIR / "backend" / "scripts" / "gmusic_catalog.json"
    categories_json_path = BASE_DIR / "backend" / "scripts" / "gmusic_categories.json"

    with open(catalog_json_path, "w", encoding="utf-8") as f:
        json.dump(processed_products, f, ensure_ascii=False, indent=2)

    with open(categories_json_path, "w", encoding="utf-8") as f:
        json.dump(CATEGORIES, f, ensure_ascii=False, indent=2)

    print(f"Catalog saved to {catalog_json_path} ({len(processed_products)} items)")
    print(f"Categories saved to {categories_json_path} ({len(CATEGORIES)} categories)")
    return processed_products, CATEGORIES


if __name__ == "__main__":
    process_and_download()
