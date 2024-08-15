from unittest.mock import MagicMock, patch

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from assistify_api.app.dependencies.api_dependencies import get_chat_service

from .api import api

mock_chat_service = MagicMock()


@pytest.fixture
def api_client():
    api.dependency_overrides[get_chat_service] = lambda: mock_chat_service

    with TestClient(api) as api_client:
        yield api_client

    api.dependency_overrides[get_chat_service] = get_chat_service


def test_read_root(api_client: TestClient):
    response = api_client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello Assistify"}


@patch("assistify_api.app.auth.verify_token.id_token")
def test_protected_route(mock_id_token, api_client: FastAPI):
    mock_user_info = {"name": "Test User", "email": "test@example.com", "iss": "accounts.google.com"}
    mock_id_token.verify_oauth2_token.return_value = mock_user_info

    response = api_client.get("/protected", headers={"Authorization": "Bearer fake_token"})

    assert response.status_code == 200
    assert response.json() == {"message": f"Hello {mock_user_info['name']}, your email is {mock_user_info['email']}"}


def test_protected_route_unauthorized(api_client: TestClient):
    response = api_client.get("/protected", headers={"Authorization": "Bearer invalid_token"})

    assert response.status_code == 401


@patch("assistify_api.app.auth.verify_token.id_token")
def test_send_message(mock_id_token, api_client: TestClient):
    """
    Test the /send-message endpoint with valid authentication and message payload.
    """

    mock_chat_service.send_message.return_value = "What can I do for you?"
    mock_user_info = {"name": "Test User", "email": "test@example.com", "iss": "accounts.google.com"}
    mock_id_token.verify_oauth2_token.return_value = mock_user_info

    response = api_client.post(
        "/send-message", headers={"Authorization": "Bearer fake_token"}, json={"message": "Hello world"}
    )

    assert response.status_code == 200
    assert response.json() == {"response": "What can I do for you?"}


def test_send_message_unauthorized(api_client: TestClient):
    """
    Test the /send-message endpoint with invalid authentication.
    """
    response = api_client.post(
        "/send-message", headers={"Authorization": "Bearer invalid_token"}, json={"message": "Hello world"}
    )

    assert response.status_code == 401
