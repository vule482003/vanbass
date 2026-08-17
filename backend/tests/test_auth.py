"""
Test authentication endpoints
Run: uv run pytest tests/test_auth.py -v
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_auth_endpoints_exist():
    """Test that auth endpoints are registered"""
    # List all routes in the app
    routes = [route.path for route in app.routes]
    
    print("\n📍 Available Routes:")
    for route in sorted(routes):
        if "api" in route:
            print(f"   {route}")


def test_register_endpoint():
    """Test user registration endpoint"""
    print("\n📝 Testing: POST /api/auth/register")
    response = client.post("/api/auth/register", json={
        "email": "test@example.com",
        "password": "testpass123",
        "full_name": "Test User"
    })
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")


def test_login_endpoint():
    """Test user login endpoint"""
    print("\n🔐 Testing: POST /api/auth/login")
    response = client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "testpass123"
    })
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Access Token: {data.get('access_token', 'N/A')[:20]}...")
        print(f"Token Type: {data.get('token_type', 'N/A')}")
    else:
        print(f"Response: {response.json()}")


def test_me_endpoint():
    """Test get current user endpoint"""
    print("\n👤 Testing: GET /api/auth/me")
    response = client.get("/api/auth/me")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")


if __name__ == "__main__":
    print("\n🔓 Testing Authentication Endpoints...\n")
    
    test_auth_endpoints_exist()
    
    print("\n" + "="*50)
    test_register_endpoint()
    
    print("\n" + "="*50)
    test_login_endpoint()
    
    print("\n" + "="*50)
    test_me_endpoint()
    
    print("\n✅ Authentication tests completed!")
