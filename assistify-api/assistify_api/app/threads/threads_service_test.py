from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.dao.users_dao import UsersDao
from assistify_api.database.models.thread import Thread
from assistify_api.database.mongodb import MongoDb

from .threads_service import ThreadsService


def test_get_last_thread(mongo_db: MongoDb, default_thread: Thread):
    users_dao = UsersDao(mongo_db)
    assistants_dao = AssistantsDao(mongo_db)

    service = ThreadsService(
        threads_dao=ThreadsDao(mongo_db),
        assistants_dao=assistants_dao,
        users_dao=users_dao,
    )

    thread_response = service.upsert(
        Thread(
            **{
                **default_thread.model_dump(),
                "id": str(default_thread.id),
            }
        )
    )

    result = service.get_last_thread(thread_response.user_id)

    assert result.id == thread_response.id


def test_find_one(mongo_db: MongoDb, default_thread: Thread):
    users_dao = UsersDao(mongo_db)
    assistants_dao = AssistantsDao(mongo_db)

    service = ThreadsService(
        threads_dao=ThreadsDao(mongo_db),
        assistants_dao=assistants_dao,
        users_dao=users_dao,
    )

    thread_response = service.upsert(default_thread)

    thread = service.find_one(thread_response.id)

    assert thread.id == thread_response.id


def test_list_threads(mongo_db: MongoDb, default_thread: Thread):
    users_dao = UsersDao(mongo_db)
    assistants_dao = AssistantsDao(mongo_db)

    service = ThreadsService(
        threads_dao=ThreadsDao(mongo_db),
        assistants_dao=assistants_dao,
        users_dao=users_dao,
    )

    thread_response = service.upsert(default_thread)

    threads = service.list()

    assert any(thread for thread in threads if str(thread.id) == thread_response.id)
