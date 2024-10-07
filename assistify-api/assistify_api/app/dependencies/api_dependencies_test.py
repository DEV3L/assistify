from unittest.mock import MagicMock, patch

import pytest

from .api_dependencies import get_messages_service, get_threads_service, hardcoded_assistant_id


@patch("assistify_api.app.dependencies.api_dependencies.build_openai_client")
def test_get_chat_service(mock_build_openai_client: MagicMock):
    mock_assistant = MagicMock(assistant_id=hardcoded_assistant_id)
    mock_assistants_dao = MagicMock()
    mock_assistants_dao.find_all.return_value = [mock_assistant]

    service = get_messages_service(assistants_dao=mock_assistants_dao)
    assert service.chat.client.open_ai == mock_build_openai_client.return_value


def test_get_chat_service_errors_without_assistant():
    mock_assistants_dao = MagicMock()
    mock_assistants_dao.find_all.return_value = []

    with pytest.raises(ValueError, match="Assistant not found"):
        get_messages_service(assistants_dao=mock_assistants_dao)


def test_get_threads_service():
    mock_threads_dao = MagicMock()

    service = get_threads_service(threads_dao=mock_threads_dao)
    assert service.threads_dao == mock_threads_dao
