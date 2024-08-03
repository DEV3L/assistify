from unittest.mock import patch

from fastapi.testclient import TestClient

from .api import api

client = TestClient(api)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello Assistify"}


@patch("src.app.auth.verify_token.id_token")
def test_protected_route(mock_id_token):
    mock_user_info = {"name": "Test User", "email": "test@example.com", "iss": "accounts.google.com"}
    mock_id_token.verify_oauth2_token.return_value = mock_user_info

    response = client.get("/protected", headers={"Authorization": "Bearer fake_token"})

    assert response.status_code == 200
    assert response.json() == {"message": f"Hello {mock_user_info['name']}, your email is {mock_user_info['email']}"}


def test_protected_route_unauthorized():
    response = client.get("/protected", headers={"Authorization": "Bearer invalid_token"})

    assert response.status_code == 401
