from pymongo.database import Database

from ..models.assistant import Assistant
from .assistants_dao import AssistantsDao


def test_dao_inserts_record(mongo_db: Database, default_assistant: Assistant):
    """
    Test that a assistant record is inserted into the database.
    """
    dao = AssistantsDao(mongo_db)

    assistant_id = dao.upsert(default_assistant)

    assert assistant_id
