from ai_assistant_manager.chats.chat import Chat

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.models.thread import Thread
from assistify_api.database.models.user import Assistant


class ChatService:
    def __init__(self, chat: Chat, assistant: Assistant, threads_dao: ThreadsDao, assistants_dao: AssistantsDao):
        self.chat = chat
        self.assistant = assistant
        self.threads_dao = threads_dao
        self.assistants_dao = assistants_dao

    def send_message(self, message: str, *, thread: Thread):
        self.chat.thread_id = thread.provider_thread_id
        self.chat.start()

        return self.chat.send_user_message(message=message)

    def get_or_create_thread(self, user_id: str, thread_id: str = None) -> Thread:
        if not thread_id:
            return self._create_thread(user_id)

        threads = self.threads_dao.find_all()  # will be user threads
        return [thread for thread in threads if thread.id == thread_id][0]

    def get_messages(self, thread_id: str) -> list[str]:
        return self.chat.list_messages(thread_id=thread_id)

    def _create_thread(self, user_id: str) -> Thread:
        provider_thread_id = self.chat.create_thread()

        thread_id = self.threads_dao.upsert(
            Thread(
                assistant_id=str(self.assistant.id),
                assistant_name=self.assistant.name,
                model=self.assistant.model,
                provider_thread_id=provider_thread_id,
                user_id=user_id,
            )
        )

        self.assistant.thread_ids.append(thread_id)
        self.assistants_dao.upsert(self.assistant)

        return self.threads_dao.find_one(thread_id, model_class=Thread)
