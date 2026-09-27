import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    """
    Test the health check endpoint.
    Ensures the basic API configuration is routing correctly.
    """
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_lot_validation():
    """
    Test that the create lot endpoint properly validates weight_kg.
    A negative weight should trigger a 422 Validation Error.
    """
    payload = {
        "collector_id": "123e4567-e89b-12d3-a456-426614174000",
        "category": "E-WASTE",
        "weight_kg": -5.0 # Invalid negative weight
    }
    response = client.post("/api/v1/lots", json=payload)
    assert response.status_code == 422
    assert "weight_kg" in response.text
