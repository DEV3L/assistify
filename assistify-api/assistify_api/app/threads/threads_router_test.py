from unittest.mock import MagicMock, patch

from assistify_api.app.threads.thread import ThreadResponse
from assistify_api.conftest import TestClientWithMocks, mock_idinfo
from assistify_api.database.models.thread import Thread


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_last_thread(
    mock_id_token,
    test_client_with_mocks: TestClientWithMocks,
    default_thread: Thread,
):
    api_client = test_client_with_mocks.api_client
    mock_threads_service = test_client_with_mocks.mock_threads_service

    thread_response = {**default_thread.model_dump(), "id": str(default_thread.id), "is_welcome_thread": False}
    mock_threads_service.get_last_thread.return_value = ThreadResponse(**thread_response)
    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.post("/api/threads/last-thread", headers={"Authorization": "Bearer fake_token"})

    assert response.status_code == 200
    assert response.json()["id"] == str(default_thread.id)


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_last_thread_returns_new_thread_if_none_found(
    mock_id_token,
    test_client_with_mocks: TestClientWithMocks,
    default_thread: Thread,
):
    api_client = test_client_with_mocks.api_client
    mock_messages_service = test_client_with_mocks.mock_messages_service
    mock_threads_service = test_client_with_mocks.mock_threads_service

    hardcoded_assistant_id = "assistant_id"
    mock_assistant = MagicMock(assistant_id=hardcoded_assistant_id, model="model")
    mock_assistant.name = "assistant_name"

    mock_id_token.verify_oauth2_token.return_value = mock_idinfo
    mock_threads_service.get_last_thread.return_value = None
    mock_threads_service.upsert.return_value = ThreadResponse(
        **{**default_thread.model_dump(), "id": str(default_thread.id), "is_welcome_thread": True}
    )
    mock_messages_service.assistant = mock_assistant
    mock_messages_service.chat.create_thread.return_value = "provider_thread_id"

    response = api_client.post("/api/threads/last-thread", headers={"Authorization": "Bearer fake_token"})

    assert response.status_code == 200
    assert response.json()["id"] is not None
    assert response.json()["is_welcome_thread"] is True


@patch("assistify_api.app.auth.verify_token.id_token")
def test_new_thread(
    mock_id_token,
    test_client_with_mocks: TestClientWithMocks,
    default_thread: Thread,
):
    api_client = test_client_with_mocks.api_client
    mock_messages_service = test_client_with_mocks.mock_messages_service
    mock_threads_service = test_client_with_mocks.mock_threads_service

    mock_messages_service.chat.create_thread.return_value = default_thread.provider_thread_id

    thread_response = {**default_thread.model_dump(), "id": str(default_thread.id), "is_welcome_thread": False}
    mock_threads_service.upsert.return_value = ThreadResponse(**thread_response)
    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.post(
        "/api/threads",
        json={
            "assistant_id": default_thread.assistant_id,
            "assistant_name": default_thread.assistant_name,
            "model": default_thread.model,
            "provider": "OpenAI",
        },
        headers={"Authorization": "Bearer fake_token"},
    )

    assert response.status_code == 200
    assert response.json()["assistant_id"] == default_thread.assistant_id
    assert response.json()["provider_thread_id"] == default_thread.provider_thread_id
    assert response.json()["is_welcome_thread"] is False
