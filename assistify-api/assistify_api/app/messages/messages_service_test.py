from unittest.mock import MagicMock

from ai_assistant_manager.chats.chat import ChatResponse

from assistify_api.database.models.thread import Thread

from .messages_service import MessagesService


def test_message_service():
    mock_chat = MagicMock()
    mock_chat.send_user_message.return_value = ChatResponse(message="Hello, how can I help you?", token_count=10)
    service = MessagesService(
        chat=mock_chat,
        assistant=MagicMock(),
        assistants_dao=MagicMock(),
        threads_dao=MagicMock(),
        users_dao=MagicMock(),
    )

    message = "Hello"
    thread = MagicMock(token_count=0)
    user = MagicMock()

    result = service.send_message(message=message, thread=thread, user=user)

    assert result.message == "Hello, how can I help you?"
    mock_chat.send_user_message.assert_called_once_with(message=message)
    assert mock_chat.thread_id == thread.provider_thread_id


def test_get_or_create_thread_creates_new_thread():
    expected_provider_thread_id = "new_provider_thread_id"
    mock_chat = MagicMock()
    mock_chat.create_thread.return_value = expected_provider_thread_id
    mock_assistant = MagicMock(id="abc", model="gpt-4o")
    mock_assistant.name = "assistant name"

    service = MessagesService(
        chat=mock_chat,
        assistant=mock_assistant,
        assistants_dao=MagicMock(),
        threads_dao=MagicMock(
            find_one=MagicMock(return_value=MagicMock(provider_thread_id=expected_provider_thread_id))
        ),
        users_dao=MagicMock(),
    )

    user = MagicMock(email="user@example.com")
    service.threads_dao.find_all.return_value = []

    new_thread = service.get_or_create_thread(user=user)

    assert new_thread.provider_thread_id == expected_provider_thread_id
    service.threads_dao.upsert.assert_called_once()
    service.assistants_dao.upsert.assert_called_once()
    service.users_dao.upsert.assert_called_once()


def test_get_or_create_thread_finds_existing_thread():
    mock_chat = MagicMock()
    service = MessagesService(
        chat=mock_chat,
        assistant=MagicMock(),
        assistants_dao=MagicMock(),
        threads_dao=MagicMock(),
        users_dao=MagicMock(),
    )

    existing_thread = Thread(
        user_id="user_id",
        assistant_id="assistant_id",
        assistant_name="assistant name",
        model="gpt-4o",
        provider_thread_id="provider_thread_id",
    )
    existing_thread.id = "existing_thread_id"
    service.threads_dao.find_all.return_value = [existing_thread]

    found_thread = service.get_or_create_thread(user=MagicMock(), thread_id="existing_thread_id")

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
