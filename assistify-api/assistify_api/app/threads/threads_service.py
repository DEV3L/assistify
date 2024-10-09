from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.dao.users_dao import UsersDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.database.models.thread import Thread
from assistify_api.database.models.user import User

from .thread import ThreadResponse


class ThreadsService:
    def __init__(
        self,
        threads_dao: ThreadsDao,
        assistants_dao: AssistantsDao,
        users_dao: UsersDao,
    ):
        self.threads_dao = threads_dao
        self.assistants_dao = assistants_dao
        self.users_dao = users_dao

    def upsert(self, thread: Thread) -> ThreadResponse:
        assistant = self.assistants_dao.find_one(item_id=thread.assistant_id, model_class=Assistant)
        user = self.users_dao.find_one_by(query={"email": thread.user_id}, model_class=User)

        thread = self.find_one(self.threads_dao.upsert(thread))

        assistant.thread_ids = list(set(assistant.thread_ids + [str(thread.id)]))
        self.assistants_dao.upsert(assistant)

        user.thread_ids = list(set(user.thread_ids + [str(thread.id)]))
        self.users_dao.upsert(user)

        return ThreadResponse(**{**thread.model_dump(), "id": str(thread.id), "is_welcome_thread": False})

    def find_one(self, thread_id: str) -> ThreadResponse | None:
        thread = self.threads_dao.find_one(item_id=thread_id, model_class=Thread)
        return (
            ThreadResponse(**{**thread.model_dump(), "id": str(thread.id), "is_welcome_thread": False})
            if thread
            else None
        )

    def list(self):
        return self.threads_dao.find_all(model_class=Thread)

    def get_last_thread(self, user_id: str) -> ThreadResponse | None:
        last_thread = self.threads_dao.get_last_thread(user_id)

        return (
            ThreadResponse(**{**last_thread.model_dump(), "id": str(last_thread.id), "is_welcome_thread": False})
            if last_thread
            else None
        )
