from pymongo.database import Database

from assistify_api.database.models.thread import Thread

from .threads_service import ThreadsService


def test_list_threads(mongo_db: Database):
    """
    Test the get_assistants method of AssistantsService.
    """
    service = ThreadsService(mongo_db)
    thread_id = service.upsert(Thread(user_id="user_id", thread_id="thread_id", assistant_id="assistant_id"))

    threads = service.list()

    assert any(thread for thread in threads if str(thread.id) == thread_id)
