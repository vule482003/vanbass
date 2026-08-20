"""
Test health check endpoints
Run: uv run pytest tests/test_health.py -v
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_health_check():
    """Test basic health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["service"] == "vanbass-api"
    print("✅ Health check PASSED")


def test_health_check_response_format():
    """Test health check response format"""
    response = client.get("/health")
    data = response.json()
    assert "status" in data
    assert "service" in data
    print("✅ Health check response format PASSED")


def test_database_health_check():
    """Test database health check endpoint"""
    response = client.get("/health/db")
    assert response.status_code == 200
    assert "status" in response.json()
    assert "database" in response.json()
    print("✅ Database health check PASSED")


if __name__ == "__main__":
    print("\n🧪 Testing API Endpoints...\n")
    
    # Test 1: Basic health check
    print("Test 1: GET /health")
    response = client.get("/health")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    print()
    
    # Test 2: Database health check  
    print("Test 2: GET /health/db")
    response = client.get("/health/db")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    print()
    
    print("✅ All tests completed!")
