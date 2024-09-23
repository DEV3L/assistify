from unittest.mock import MagicMock

from ai_assistant_manager.chats.chat import ChatResponse

from .messages_service import MessagesService


def test_message_service():
    mock_chat = MagicMock()
    mock_chat.send_user_message.return_value = ChatResponse(message="Hello, how can I help you?", token_count=10)
    service = MessagesService(
        chat=mock_chat,
        assistant=MagicMock(),
        assistants_dao=MagicMock(),
        threads_dao=MagicMock(),
    )

    message = "Hello"
    thread = MagicMock(token_count=0)

    result = service.send_message(message=message, thread=thread)

    assert result.message == "Hello, how can I help you?"
    mock_chat.send_user_message.assert_called_once_with(message=message)
    assert mock_chat.thread_id == thread.provider_thread_id
