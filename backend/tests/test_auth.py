"""
Test authentication endpoints
Run: uv run pytest tests/test_auth.py -v
"""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_auth_endpoints_exist():
    """Test that auth endpoints are registered"""
    routes = [route.path for route in app.routes if hasattr(route, "path")]
    api_routes = [r for r in routes if "api" in r or "auth" in r]
    assert len(api_routes) > 0


def test_register_endpoint():
    """Test user registration endpoint schema validation"""
    response = client.post(
        "/api/auth/register",
        json={
            "email": "invalid-email-format",
            "password": "123",
            "full_name": "Test User",
        },
    )
    # Should reject invalid email/password format with 422
    assert response.status_code == 422


def test_login_endpoint():
    """Test user login endpoint with missing credentials"""
    response = client.post(
        "/api/auth/login",
        json={"email": "nonexistent@example.com", "password": "wrongpassword"},
    )
    # Should return 401 or 400 for bad credentials
    assert response.status_code in [400, 401]


def test_me_endpoint_unauthorized():
    """Test get current user endpoint without token"""
    response = client.get("/api/auth/me")
    assert response.status_code == 401
