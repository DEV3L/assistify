from ..models.assistant import Assistant
from .dao import Dao


def test_inserts_record(default_assistant: Assistant, dao: Dao):
    item_id = dao.upsert(default_assistant)

    assert item_id


def test_find_all(default_assistant: Assistant, dao: Dao):
    dao.upsert(default_assistant)

    result = dao.find_all(model_class=Assistant)

    assert len(result) >= 1


def test_does_find_record(default_assistant: Assistant, dao: Dao):
    item_id = dao.upsert(default_assistant)

    result_assistant = dao.find_one(item_id, model_class=Assistant)

    assert item_id == str(result_assistant.id)


def test_does_not_find_record(dao: Dao):
    result = dao.find_one("abc", model_class=Assistant)

    assert result is None


def test_delete_no_record(dao: Dao):
    deleted_count = dao.delete_one("abc")
    assert deleted_count == 0


def test_deletes_record(default_assistant: Assistant, dao: Dao):
    item_id = dao.upsert(default_assistant)

    deleted_count = dao.delete_one(item_id)

    assert deleted_count == 1
