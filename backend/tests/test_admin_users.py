from fastapi.testclient import TestClient
from sqlalchemy import select

from app.core.security import create_access_token, hash_password
from app.db.session import SessionLocal
from app.main import app
from app.models.user import User, UserRole

client = TestClient(app)


def test_admin_user_management_rules():
    db = SessionLocal()
    try:
        # 1. Setup admin user
        admin = db.execute(
            select(User).where(User.email == "admin_test_perm@test.local")
        ).scalar_one_or_none()
        if not admin:
            admin = User(
                email="admin_test_perm@test.local",
                password_hash=hash_password("adminpass123"),
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)

        # 2. Setup customer user
        customer = db.execute(
            select(User).where(User.email == "cust_test_perm@test.local")
        ).scalar_one_or_none()
        if not customer:
            customer = User(
                email="cust_test_perm@test.local",
                password_hash=hash_password("custpass123"),
                role=UserRole.CUSTOMER,
                is_active=True,
            )
            db.add(customer)
            db.commit()
            db.refresh(customer)

        admin_token = create_access_token(str(admin.id))

        # 3. GET /api/admin/users should exclude customer by default
        res = client.get(
            "/api/admin/users", headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert res.status_code == 200
        data = res.json()
        roles_returned = {item["role"] for item in data["items"]}
        assert "customer" not in roles_returned
        emails_returned = {item["email"] for item in data["items"]}
        assert "cust_test_perm@test.local" not in emails_returned

        # 4. Attempt self-lock via PATCH
        patch_res = client.patch(
            f"/api/admin/users/{admin.id}",
            json={"is_active": False},
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        assert patch_res.status_code == 400
        assert "Không thể tự khóa hoặc xóa chính mình" in patch_res.json()["detail"]

        # 5. Attempt self-delete via DELETE
        del_res = client.delete(
            f"/api/admin/users/{admin.id}",
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        assert del_res.status_code == 400
        assert "Không thể tự khóa hoặc xóa chính mình" in del_res.json()["detail"]

        # 6. Create staff user
        create_res = client.post(
            "/api/admin/users",
            json={
                "email": "staff_created_test@test.local",
                "full_name": "Nguyen Van Staff",
                "phone": "0911223344",
                "password": "staffpassword123",
                "role": "staff",
            },
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        if create_res.status_code == 201:
            staff_data = create_res.json()
            assert staff_data["role"] == "staff"
            # Cleanup created staff
            created_staff = db.get(User, staff_data["id"])
            if created_staff:
                db.delete(created_staff)
                db.commit()

    finally:
        db.close()
