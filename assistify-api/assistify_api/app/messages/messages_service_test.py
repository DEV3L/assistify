from unittest.mock import MagicMock

from ai_assistant_manager.chats.chat import ChatResponse

from assistify_api.database.models.thread import Thread

from .messages_service import MessagesService


def test_message_service():
    mock_chat = MagicMock()
    mock_chat.send_user_message.return_value = ChatResponse(message="Hello, how can I help you?", token_count=10)
    user = MagicMock()

    service = MessagesService(
        chat=mock_chat,
        assistant=MagicMock(),
        assistants_dao=MagicMock(),
        threads_dao=MagicMock(),
        users_dao=MagicMock(),
    )

    message = "Hello"
    thread = MagicMock(token_count=0)

    result = service.send_message(message=message, thread=thread, user=user)

    assert result.message == "Hello, how can I help you?"
    mock_chat.send_user_message.assert_called_once_with(message=message)
    assert mock_chat.thread_id == thread.provider_thread_id


def test_get_thread_does_not_find_thread():
    mock_chat = MagicMock()
    mock_assistant = MagicMock(id="abc", model="gpt-4o")
    user = MagicMock(email="user@example.com")

    service = MessagesService(
        chat=mock_chat,
        assistant=mock_assistant,
        assistants_dao=MagicMock(),
        threads_dao=MagicMock(find_all=MagicMock(return_value=[])),
        users_dao=MagicMock(),
    )

    thread = service.get_thread(user=user, thread_id="new_thread_id")

    assert thread is None


def test_get_thread_finds_existing_thread():
    mock_chat = MagicMock()
    user = MagicMock(email="user@example.com")

    service = MessagesService(
        chat=mock_chat,
        assistant=MagicMock(),
        assistants_dao=MagicMock(),
        threads_dao=MagicMock(),
        users_dao=MagicMock(),
    )

    existing_thread_id = "existing_thread_id"
    existing_thread = Thread(
        user_id=user.email,
        assistant_id="assistant_id",
        assistant_name="assistant name",
        model="gpt-4o",
        provider_thread_id="provider_thread_id",
    )
    existing_thread.id = existing_thread_id
    service.threads_dao.find_all.return_value = [existing_thread]

    found_thread = service.get_thread(user=user, thread_id=existing_thread_id)

    assert found_thread == existing_thread


def test_get_messages():
    mock_chat = MagicMock()
    mock_chat.list_messages.return_value = ["Message 1", "Message 2"]
    service = MessagesService(
        chat=mock_chat,
        assistant=MagicMock(),
        assistants_dao=MagicMock(),
        threads_dao=MagicMock(),
        users_dao=MagicMock(),
    )

    messages = service.get_messages(thread_id="some_thread_id")

    assert messages == ["Message 1", "Message 2"]
    mock_chat.list_messages.assert_called_once_with(thread_id="some_thread_id")
