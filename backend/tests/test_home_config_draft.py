import uuid

from fastapi.testclient import TestClient
from sqlalchemy import delete, select

from app.core.security import create_access_token, hash_password
from app.db.session import SessionLocal
from app.main import app
from app.models.home_config import HomeConfig
from app.models.user import User, UserRole

client = TestClient(app)


def test_home_config_draft_and_publish_flow():
    db = SessionLocal()
    try:
        # Reset home_configs for clean test run
        db.execute(delete(HomeConfig))
        db.commit()

        admin = db.execute(
            select(User).where(User.email == "admin_home_config_test@test.local")
        ).scalar_one_or_none()
        if not admin:
            admin = User(
                email="admin_home_config_test@test.local",
                password_hash=hash_password("adminpass123"),
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)

        admin_token = create_access_token(str(admin.id))
        admin_headers = {"Authorization": f"Bearer {admin_token}"}

        # 1. Public GET /api/home-config
        pub_res = client.get("/api/home-config")
        assert pub_res.status_code == 200
        pub_data = pub_res.json()
        assert "data" in pub_data

        # 2. Unauthorized GET /api/home-config/draft -> 401
        unauth_res = client.get("/api/home-config/draft")
        assert unauth_res.status_code == 401

        # 3. Authorized GET /api/home-config/draft -> 200
        draft_res = client.get("/api/home-config/draft", headers=admin_headers)
        assert draft_res.status_code == 200
        draft_json = draft_res.json()
        assert "data" in draft_json

        # 4. Update draft via PUT /api/home-config/draft with dynamic test fields
        unique_headline = f"Test Draft Headline {uuid.uuid4().hex[:6]}"
        unique_stage_img = f"/images/rental/stage_{uuid.uuid4().hex[:6]}.jpg"
        unique_brand = f"VANBASS TEST {uuid.uuid4().hex[:4]}"
        modified_data = dict(draft_json["data"])
        modified_data["intro"]["headline_top"] = unique_headline
        modified_data["rental"]["stage_image"] = unique_stage_img
        modified_data["rental"]["spec_setup_label"] = "SETUP HỎA TỐC"
        modified_data["header"]["brand_title"] = unique_brand

        put_res = client.put(
            "/api/home-config/draft",
            json={"data": modified_data},
            headers=admin_headers,
        )
        assert put_res.status_code == 200
        put_json = put_res.json()["data"]
        assert put_json["intro"]["headline_top"] == unique_headline
        assert put_json["rental"]["stage_image"] == unique_stage_img
        assert put_json["rental"]["spec_setup_label"] == "SETUP HỎA TỐC"
        assert put_json["header"]["brand_title"] == unique_brand

        # 5. Verify public config is NOT affected yet
        pub_check = client.get("/api/home-config")
        assert pub_check.status_code == 200
        assert pub_check.json()["data"]["intro"]["headline_top"] != unique_headline
        assert pub_check.json()["data"]["rental"]["stage_image"] != unique_stage_img

        # 6. Publish via POST /api/home-config/publish
        pub_action = client.post(
            "/api/home-config/publish",
            json={"data": modified_data},
            headers=admin_headers,
        )
        assert pub_action.status_code == 200
        assert pub_action.json()["data"]["intro"]["headline_top"] == unique_headline
        assert pub_action.json()["data"]["rental"]["stage_image"] == unique_stage_img
        assert pub_action.json()["data"]["header"]["brand_title"] == unique_brand

        # 7. Verify public config IS now updated
        pub_final = client.get("/api/home-config")
        assert pub_final.status_code == 200
        assert pub_final.json()["data"]["intro"]["headline_top"] == unique_headline
        assert pub_final.json()["data"]["rental"]["stage_image"] == unique_stage_img
        assert pub_final.json()["data"]["header"]["brand_title"] == unique_brand

    finally:
        db.close()
