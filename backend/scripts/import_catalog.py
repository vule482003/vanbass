import argparse
import html
import json
import re
import sys
from decimal import Decimal
from pathlib import Path
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.category import Category
from app.models.product import Product
from app.models.product_image import ProductImage

SOURCE_API = "https://vanbassmusiccenter.com/wp-json/wp/v2/product"
SOURCE_BASE = "https://vanbassmusiccenter.com"
CATEGORY_MAP = {
    "thiet-bi-dj": "dj",
    "mixer": "mixer",
    "loa": "audio",
    "dj-headphones": "accessories",
    "phu-kien-dj": "accessories",
}
CATEGORY_URLS = {
    "dj": "https://vanbassmusiccenter.com/danh-muc/thiet-bi-dj/",
    "mixer": "https://vanbassmusiccenter.com/danh-muc/mixer/",
    "audio": "https://vanbassmusiccenter.com/danh-muc/loa/",
    "accessories": "https://vanbassmusiccenter.com/danh-muc/dj-headphones/",
}


def fetch_json(url: str) -> object:
    request = Request(url, headers={"User-Agent": "VanBassCatalogImporter/1.0"})
    with urlopen(request, timeout=30) as response:
        return json.load(response)


def fetch_text(url: str) -> str:
    request = Request(url, headers={"User-Agent": "VanBassCatalogImporter/1.0"})
    with urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="replace")


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", html.unescape(value))
    return re.sub(r"\s+", " ", value).strip()


def extract_price(page_html: str) -> Decimal | None:
    match = re.search(
        r"woocommerce-Price-amount[^>]*>.*?currencySymbol[^>]*>.*?</span>\s*([0-9][0-9.]*)",
        page_html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if not match:
        return None

    value = match.group(1).replace(".", "").replace(",", "")
    return Decimal(value) if value.isdigit() else None


def fetch_category_slugs() -> dict[str, str]:
    category_slugs: dict[str, str] = {}
    for category_slug, category_url in CATEGORY_URLS.items():
        page_html = fetch_text(category_url)
        for source_slug in re.findall(r"/san-pham/([^/]+)/", page_html):
            category_slugs[source_slug] = category_slug
    return category_slugs


def source_category(product: dict, category_slugs: dict[str, str]) -> str:
    for class_name in product.get("class_list", []):
        if class_name.startswith("product_cat-"):
            category_slug = CATEGORY_MAP.get(class_name.removeprefix("product_cat-"))
            if category_slug:
                return category_slug

    name = product.get("title", {}).get("rendered", "").lower()
    if any(
        keyword in name
        for keyword in ("dj", "xdj", "cdj", "opus", "omnis", "controller")
    ):
        return "dj"
    if "mixer" in name or "euphonia" in name:
        return "mixer"
    if "loa" in name or "pioneer dm-40" in name:
        return "audio"
    if "tai nghe" in name or "hdj-" in name or "dây âm thanh" in name:
        return "accessories"

    source_slug = product["link"].rstrip("/").rsplit("/", 1)[-1]
    if source_slug in category_slugs:
        return category_slugs[source_slug]

    embedded_terms = product.get("_embedded", {}).get("wp:term", [])
    for terms in embedded_terms:
        for term in terms:
            if term.get("taxonomy") == "product_cat":
                category_slug = CATEGORY_MAP.get(term.get("slug"))
                if category_slug:
                    return category_slug
    return "dj"


def source_image(product: dict, page_html: str) -> str | None:
    media = product.get("_embedded", {}).get("wp:featuredmedia", [])
    if media and media[0].get("source_url"):
        return media[0]["source_url"]

    match = re.search(r'<img[^>]+src=["\']([^"\']+)', page_html, re.IGNORECASE)
    return html.unescape(match.group(1)) if match else None


def build_product(product: dict, category_slugs: dict[str, str]) -> dict:
    page_html = fetch_text(product["link"])
    name = clean_text(product["title"]["rendered"])
    description = clean_text(product.get("excerpt", {}).get("rendered", ""))
    price = extract_price(page_html)
    slug = product["slug"]

    return {
        "source_id": product["id"],
        "name": name[:255],
        "slug": slug[:255],
        "sku": f"VBC-{product['id']}",
        "category_slug": source_category(product, category_slugs),
        "brand": "Pioneer DJ" if "pioneer" in name.lower() else None,
        "description": description or name,
        "sale_enabled": price is not None,
        "sale_price": price,
        "rental_enabled": False,
        "rental_price": None,
        "stock_quantity": 0,
        "image": source_image(product, page_html),
        "canonical_url": f"{SOURCE_BASE}/san-pham/{slug}/",
    }


def sync_catalog(products: list[dict], apply_changes: bool) -> None:
    db = SessionLocal()
    try:
        categories = {
            category.slug: category.id
            for category in db.scalars(select(Category)).all()
        }
        source_slugs = {product["slug"] for product in products}

        for product_data in products:
            category_id = categories.get(product_data["category_slug"], categories["dj"])
            product = db.scalar(select(Product).where(Product.slug == product_data["slug"]))
            if product is None:
                product = Product(slug=product_data["slug"])
                db.add(product)

            for field in (
                "name",
                "sku",
                "brand",
                "description",
                "sale_enabled",
                "sale_price",
                "rental_enabled",
                "rental_price",
                "stock_quantity",
            ):
                setattr(product, field, product_data[field])
            product.category_id = category_id
            product.meta_title = product_data["name"]
            product.meta_description = product_data["description"][:500]
            product.meta_keywords = f"{product_data['name'].lower()}, vanbass"
            product.canonical_url = product_data["canonical_url"]
            product.is_active = True
            db.flush()

            image = db.scalar(
                select(ProductImage).where(ProductImage.product_id == product.id)
            )
            if product_data["image"]:
                if image is None:
                    image = ProductImage(product_id=product.id, sort_order=0)
                    db.add(image)
                image.image_url = product_data["image"]
                image.alt_text = product_data["name"]

        for product in db.scalars(select(Product)).all():
            if product.slug not in source_slugs:
                product.is_active = False

        if apply_changes:
            db.commit()
            print(f"Applied catalog sync: {len(products)} products")
        else:
            db.rollback()
            print(f"Dry run: would sync {len(products)} products")
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Import products from VanBass website")
    parser.add_argument("--apply", action="store_true", help="Write changes to database")
    args = parser.parse_args()

    payload = fetch_json(f"{SOURCE_API}?per_page=100&_embed=wp:featuredmedia,wp:term")
    category_slugs = fetch_category_slugs()
    products = [build_product(product, category_slugs) for product in payload]
    sync_catalog(products, apply_changes=args.apply)


if __name__ == "__main__":
    main()