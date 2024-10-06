from unittest.mock import MagicMock, patch

from fastapi.testclient import TestClient

from assistify_api.app.threads.thread import ThreadResponse
from assistify_api.conftest import mock_idinfo
from assistify_api.database.models.thread import Thread


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_last_thread(
    mock_id_token,
    api_with_mocks: tuple[TestClient, MagicMock, MagicMock, MagicMock],
    default_thread: Thread,
):
    api_client, _, mock_threads_service, _ = api_with_mocks

    thread_response = {**default_thread.model_dump(), "id": str(default_thread.id)}
    mock_threads_service.get_last_thread.return_value = ThreadResponse(**thread_response)
    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.post("/api/threads/last-thread", headers={"Authorization": "Bearer fake_token"})

    assert response.status_code == 200
    assert response.json()["id"] == str(default_thread.id)
