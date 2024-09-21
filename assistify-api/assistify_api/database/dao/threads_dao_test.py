from pymongo.database import Database

from ..models.assistant import Assistant
from .assistants_dao import AssistantsDao


def test_inserts_record(mongo_db: Database, default_assistant: Assistant):
    dao = AssistantsDao(mongo_db)

    item_id = dao.upsert(default_assistant)

    # cleanup
    assert dao.delete_one(item_id)

    assert item_id
