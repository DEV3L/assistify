from ai_assistant_manager.chats.chat import Chat

from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.models.thread import Thread


class ChatService:
    def __init__(self, chat: Chat, threads_dao: ThreadsDao):
        self.chat = chat
        self.threads_dao = threads_dao

    def send_message(self, message: str, thread_id: str | None = None):
        self.chat.thread_id = thread_id if thread_id else self.chat.thread_id
        self.chat.start()
        return self.chat.send_user_message(message=message)

    def get_or_create_thread(self, user_id: str, thread_id: str = None) -> str:
        if not thread_id:
            thread_id = self.chat.create_thread()
            self.threads_dao.upsert(Thread(assistant_id=self.chat.assistant_id, thread_id=thread_id, user_id=user_id))
            self.send_message("Hello", thread_id=thread_id)
            return thread_id

        threads = self.chat.list_threads(user_id=user_id)
        return [thread for thread in threads if thread.id == thread_id][0].id

    def get_messages(self, thread_id: str) -> list[str]:
        return self.chat.list_messages(thread_id=thread_id)
