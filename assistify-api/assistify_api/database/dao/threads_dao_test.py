from pymongo.database import Database

from assistify_api.conftest import default_user_id

from ..models.thread import Thread
from .threads_dao import ThreadsDao


def test_inserts_record(mongo_db: Database, default_thread: Thread):
    dao = ThreadsDao(mongo_db)

    item_id = dao.upsert(default_thread)

    assert item_id


def test_get_last_thread(mongo_db: Database, default_thread: Thread):
    dao = ThreadsDao(mongo_db)

    first_thread_id = dao.upsert(default_thread)
    dao.upsert(default_thread)

    last_thread = dao.get_last_thread(default_user_id)

    assert str(last_thread.id) == first_thread_id
