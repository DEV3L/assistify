from unittest.mock import MagicMock

from .chat import ChatService


def test_chat_service():
    mock_chat = MagicMock()
    mock_chat.send_user_message.return_value = "Hello, how can I help you?"
    service = ChatService(chat=mock_chat, assistant=MagicMock(), threads_dao=MagicMock(), assistants_dao=MagicMock())

    message = "Hello"
    thread = MagicMock()

    result = service.send_message(message=message, thread=thread)

    assert result == "Hello, how can I help you?"
    mock_chat.send_user_message.assert_called_once_with(message=message)
    assert mock_chat.thread_id == thread.provider_thread_id
