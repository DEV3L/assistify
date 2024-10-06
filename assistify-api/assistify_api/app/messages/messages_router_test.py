from unittest.mock import MagicMock, patch

from ai_assistant_manager.chats.chat_response import ChatResponse
from fastapi.testclient import TestClient

from assistify_api.conftest import mock_idinfo


@patch("assistify_api.app.auth.verify_token.id_token")
def test_send_message(
    mock_id_token,
    api_with_mocks: tuple[TestClient, MagicMock, MagicMock, MagicMock],
):
    api_client, mock_chat_service, _, _ = api_with_mocks

    mock_chat_service.get_or_create_thread.return_value = MagicMock(id="thread_id")
    mock_chat_service.send_message.return_value = ChatResponse(message="What can I do for you?", token_count=0)
    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.post(
        "/api/messages/send-message", headers={"Authorization": "Bearer fake_token"}, json={"message": "Hello world"}
    )

    assert response.status_code == 200
    assert response.json() == {"response": "What can I do for you?", "thread_id": "thread_id"}
