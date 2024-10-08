from unittest.mock import MagicMock, patch

from ai_assistant_manager.chats.chat_response import ChatResponse

from assistify_api.conftest import TestClientWithMocks, mock_idinfo


@patch("assistify_api.app.auth.verify_token.id_token")
def test_send_message(
    mock_id_token,
    test_client_with_mocks: TestClientWithMocks,
):
    api_client = test_client_with_mocks.api_client
    mock_messages_service = test_client_with_mocks.mock_messages_service

    mock_messages_service.get_thread.return_value = MagicMock(id="thread_id")
    mock_messages_service.send_message.return_value = ChatResponse(message="What can I do for you?", token_count=0)
    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.post(
        "/api/messages/send-message",
        headers={"Authorization": "Bearer fake_token"},
        json={"message": "Hello world", "thread_id": "thread_id"},
    )

    assert response.status_code == 200
    assert response.json() == {"response": "What can I do for you?", "thread_id": "thread_id"}
