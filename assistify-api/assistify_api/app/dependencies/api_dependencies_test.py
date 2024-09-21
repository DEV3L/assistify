from unittest.mock import Mock, patch

import pytest

from .api_dependencies import get_chat_service, hardcoded_assistant_id


@patch("assistify_api.app.dependencies.api_dependencies.build_openai_client")
def test_get_chat_service(mock_build_openai_client: Mock):
    mock_assistant = Mock(assistant_id=hardcoded_assistant_id)
    mock_assistants_dao = Mock()
    mock_assistants_dao.find_all.return_value = [mock_assistant]

    service = get_chat_service(assistants_dao=mock_assistants_dao)
    assert service.chat.client.open_ai == mock_build_openai_client.return_value


def test_get_chat_service_errors_without_assistant():
    mock_assistants_dao = Mock()
    mock_assistants_dao.find_all.return_value = []

    with pytest.raises(ValueError, match="Assistant not found"):
        get_chat_service(assistants_dao=mock_assistants_dao)
