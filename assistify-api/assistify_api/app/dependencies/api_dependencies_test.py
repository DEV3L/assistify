from unittest.mock import Mock, patch

from .api_dependencies import get_chat_service


@patch("assistify_api.app.dependencies.api_dependencies.build_openai_client")
def test_get_chat_service(mock_build_openai_client: Mock):
    """
    Test the get_chat_service function.
    """

    service = get_chat_service()
    assert service.chat.client.open_ai == mock_build_openai_client.return_value
