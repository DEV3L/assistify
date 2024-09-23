import uuid

from ai_assistant_manager.chats.chat import Chat

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.dao.users_dao import UsersDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.database.models.message import Message
from assistify_api.database.models.thread import Thread
from assistify_api.database.models.user import User


class MessagesService:
    def __init__(
        self,
        chat: Chat,
        assistant: Assistant,
        assistants_dao: AssistantsDao,
        threads_dao: ThreadsDao,
        users_dao: UsersDao,
    ):
        self.chat = chat
        self.assistant = assistant
        self.assistants_dao = assistants_dao
        self.threads_dao = threads_dao
        self.users_dao = users_dao

    def send_message(self, message: str, *, thread: Thread, user: User):
        self.chat.thread_id = thread.provider_thread_id
        self.chat.start()

        response = self.chat.send_user_message(message=message)

        user_message = Message(
            id=str(uuid.uuid4()),
            thread_id=str(thread.id),
            message=message,
            role="user",
            status="Complete",
            token_count=0,
        )
        assistant_response = Message(
            id=str(uuid.uuid4()),
            thread_id=str(thread.id),
            message=response.message,
            role="assistant",
            status="Complete",
            token_count=response.token_count,
        )

        thread.messages.append(user_message)
        thread.messages.append(assistant_response)
        thread.token_count = thread.token_count + response.token_count
        self.threads_dao.upsert(thread)

        self.assistant.token_count = self.assistant.token_count + response.token_count
        self.assistants_dao.upsert(self.assistant)

        user.token_count = user.token_count + response.token_count
        self.users_dao.upsert(user)

        return response

    def get_or_create_thread(self, user: User, thread_id: str = None) -> Thread:
        if not thread_id:
            return self._create_thread(user)

        threads = self.threads_dao.find_all(model_class=Thread)  # will be user threads
        return [thread for thread in threads if str(thread.id) == thread_id][0]

    def get_messages(self, thread_id: str) -> list[str]:
        return self.chat.list_messages(thread_id=thread_id)

    def _create_thread(self, user: User) -> Thread:
        provider_thread_id = self.chat.create_thread()

        thread_id = self.threads_dao.upsert(
            Thread(
                assistant_id=str(self.assistant.id),
                assistant_name=self.assistant.name,
                model=self.assistant.model,
                provider_thread_id=provider_thread_id,
                user_id=user.email,
            )
        )

        self.assistant.thread_ids.append(thread_id)
        self.assistants_dao.upsert(self.assistant)

        user.thread_ids.append(thread_id)
        self.users_dao.upsert(user)

        return self.threads_dao.find_one(thread_id, model_class=Thread)
