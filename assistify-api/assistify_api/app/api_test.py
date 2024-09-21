from typing import Literal
from unittest.mock import MagicMock, patch

import pytest
from ai_assistant_manager.chats.chat_response import ChatResponse
from fastapi.testclient import TestClient

from assistify_api.conftest import mock_idinfo


@pytest.mark.parametrize(
    "route, verb, expected_status, expected_response",
    [
        ("/", "GET", 200, {"message": "Hello Assistify"}),
        ("/protected", "GET", 401, None),
        ("/send-message", "POST", 401, None),
        ("/api/assistants", "GET", 401, None),
    ],
)
def test_routes_unauthorized(
    api_with_mocks: tuple[TestClient, MagicMock, MagicMock],
    route: str,
    verb: Literal["GET", "POST"],
    expected_status: int,
    expected_response: dict,
):
    """
    Test various routes with unauthorized access.
    """
    api_client, _, _ = api_with_mocks

    if verb == "GET":
        response = api_client.get(route, headers={"Authorization": "Bearer invalid_token"})
    else:
        response = api_client.post(route, headers={"Authorization": "Bearer invalid_token"})

    assert response.status_code == expected_status
    if expected_response:
        assert response.json() == expected_response


@patch("assistify_api.app.auth.verify_token.id_token")
def test_protected_route(
    mock_id_token,
    api_with_mocks: tuple[TestClient, MagicMock, MagicMock, MagicMock],
):
    api_client, _, _ = api_with_mocks

    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.get("/protected", headers={"Authorization": "Bearer fake_token"})

    assert response.status_code == 200
    assert response.json() == {
        "message": f"Hello {mock_idinfo['name']}, your email is {mock_idinfo['email']}",
        "latest_version": "The latest database migration version is v001_add_assistants",
    }


@patch("assistify_api.app.auth.verify_token.id_token")
def test_send_message(
    mock_id_token,
    api_with_mocks: tuple[TestClient, MagicMock, MagicMock, MagicMock],
):
    api_client, mock_chat_service, _ = api_with_mocks

    mock_chat_service.send_message.return_value = ChatResponse(message="What can I do for you?", token_count=0)
    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.post(
        "/send-message", headers={"Authorization": "Bearer fake_token"}, json={"message": "Hello world"}
    )

    assert response.status_code == 200
    assert response.json() == {"response": "What can I do for you?"}
