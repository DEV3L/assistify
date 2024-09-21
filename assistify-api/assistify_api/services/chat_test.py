from unittest.mock import Mock

from .chat import ChatService


def test_chat_service():
    mock_chat = Mock()
    mock_chat.send_user_message.return_value = "Hello, how can I help you?"
    service = ChatService(chat=mock_chat, assistant=Mock(), threads_dao=Mock(), assistants_dao=Mock())

    message = "Hello"
    thread = Mock()

    result = service.send_message(message=message, thread=thread)

    assert result == "Hello, how can I help you?"
    mock_chat.send_user_message.assert_called_once_with(message=message)
    assert mock_chat.thread_id == thread.provider_thread_id
