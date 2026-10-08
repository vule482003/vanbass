import json
import sys
import uuid
from decimal import Decimal
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

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
from app.models.product_image import ProductImage
from app.models.user import User, UserRole

BASE_DIR = Path(__file__).resolve().parent
CATALOG_JSON_PATH = BASE_DIR / "gmusic_catalog.json"
CATEGORIES_JSON_PATH = BASE_DIR / "gmusic_categories.json"


def seed_database():
    print("Migrating schema & Creating all tables in PostgreSQL...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
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
            try:
                db.execute(text(sql))
            except Exception:
                pass
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

        # 2. Seed Categories from JSON
        with open(CATEGORIES_JSON_PATH, encoding="utf-8") as f:
            categories_data = json.load(f)

        cat_map = {}
        for cat_info in categories_data:
            cat = db.query(Category).filter(Category.slug == cat_info["slug"]).first()
            if not cat:
                cat = Category(
                    id=uuid.UUID(cat_info.get("id")) if cat_info.get("id") else uuid.uuid4(),
                    slug=cat_info["slug"],
                    name=cat_info["name"],
                    description=cat_info.get("description"),
                    meta_title=f"{cat_info['name']} Chính Hãng | VanBass Music Center",
                    meta_description=cat_info.get("description"),
                    is_active=True,
                )
                db.add(cat)
                db.flush()
                print(f"Created category: {cat.name} ({cat.slug})")
            else:
                cat.name = cat_info["name"]
                cat.description = cat_info.get("description")
            cat_map[cat_info["slug"]] = cat.id

        db.commit()

        # 3. Seed 735 Products from JSON
        with open(CATALOG_JSON_PATH, encoding="utf-8") as f:
            products_data = json.load(f)

        print(f"Seeding {len(products_data)} products into PostgreSQL...")
        for p_data in products_data:
            cat_slug = p_data.get("category_slug")
            category_id = cat_map.get(cat_slug)
            if not category_id:
                category_id = list(cat_map.values())[0]

            sale_price = Decimal(str(p_data["sale_price"])) if p_data["sale_price"] else None
            sale_enabled = bool(p_data["sale_enabled"] and sale_price and sale_price > 0)

            prod_id = uuid.UUID(p_data["id"]) if p_data.get("id") else uuid.uuid4()
            existing_p = db.query(Product).filter(
                (Product.slug == p_data["slug"]) | (Product.id == prod_id)
            ).first()

            if not existing_p:
                p = Product(
                    id=prod_id,
                    category_id=category_id,
                    name=p_data["name"][:255],
                    slug=p_data["slug"][:255],
                    sku=p_data["sku"][:100],
                    brand=p_data.get("brand"),
                    sale_enabled=sale_enabled,
                    sale_price=sale_price,
                    rental_enabled=False,
                    rental_price=None,
                    stock_quantity=int(p_data.get("stock_quantity") or 5),
                    description=p_data.get("description"),
                    meta_title=p_data.get("meta_title", "")[:255],
                    meta_description=p_data.get("meta_description", "")[:500],
                    canonical_url=f"https://vanbass.vn/products/{p_data['slug']}",
                    is_active=True,
                )
                db.add(p)
                db.flush()

                p_img = ProductImage(
                    id=uuid.uuid4(),
                    product_id=p.id,
                    image_url=p_data.get("image_url", "/images/placeholder.jpg"),
                    alt_text=p_data["name"][:255],
                    sort_order=0,
                )
                db.add(p_img)
            else:
                existing_p.category_id = category_id
                existing_p.name = p_data["name"][:255]
                existing_p.sku = p_data["sku"][:100]
                existing_p.brand = p_data.get("brand")
                existing_p.sale_enabled = sale_enabled
                existing_p.sale_price = sale_price
                existing_p.rental_enabled = False
                existing_p.rental_price = None
                existing_p.stock_quantity = int(p_data.get("stock_quantity") or 5)
                existing_p.description = p_data.get("description")
                existing_p.meta_title = p_data.get("meta_title", "")[:255]
                existing_p.meta_description = p_data.get("meta_description", "")[:500]

                existing_img = db.query(ProductImage).filter(ProductImage.product_id == existing_p.id).first()
                if not existing_img:
                    p_img = ProductImage(
                        id=uuid.uuid4(),
                        product_id=existing_p.id,
                        image_url=p_data.get("image_url", "/images/placeholder.jpg"),
                        alt_text=p_data["name"][:255],
                        sort_order=0,
                    )
                    db.add(p_img)
                else:
                    existing_img.image_url = p_data.get("image_url", "/images/placeholder.jpg")
                    existing_img.alt_text = p_data["name"][:255]

        db.commit()
        print("\n=======================================================")
        print(f"SUCCESS: Seeded {len(categories_data)} Categories and {len(products_data)} Products!")
        print("=======================================================\n")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
