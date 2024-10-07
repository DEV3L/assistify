from assistify_api.conftest import default_user_id
from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.models.thread import Thread
from assistify_api.database.mongodb import MongoDb

from .threads_service import ThreadsService


def test_get_last_thread(mongo_db: MongoDb, default_thread: Thread):
    service = ThreadsService(
        threads_dao=ThreadsDao(mongo_db),
    )

    thread_id = service.upsert(Thread(**{**default_thread.model_dump(), "id": str(default_thread.id)}))

    result = service.get_last_thread(default_user_id)

    assert result.id == thread_id


def test_find_one(mongo_db: MongoDb):
    service = ThreadsService(
        threads_dao=ThreadsDao(mongo_db),
    )

    thread_id = service.upsert(
        Thread(
            user_id="user_id",
            assistant_id="assistant_id",
            assistant_name="assistant_name",
            model="model",
            provider_thread_id="provider_thread_id",
        )
    )

    thread = service.find_one(thread_id)

    assert thread.id == thread_id


def test_list_threads(mongo_db: MongoDb):
    service = ThreadsService(
        threads_dao=ThreadsDao(mongo_db),
    )

    thread_id = service.upsert(
        Thread(
            user_id="user_id",
            assistant_id="assistant_id",
            assistant_name="assistant_name",
            model="model",
            provider_thread_id="provider_thread_id",
        )
    )

    threads = service.list()

    assert any(thread for thread in threads if str(thread.id) == thread_id)
