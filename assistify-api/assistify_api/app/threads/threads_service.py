from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.models.thread import Thread

from .thread import ThreadResponse


class ThreadsService:
    def __init__(
        self,
        threads_dao: ThreadsDao,
    ):
        self.threads_dao = threads_dao

    def upsert(self, thread: Thread) -> ThreadResponse:
        thread = self.find_one(self.threads_dao.upsert(thread))
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
