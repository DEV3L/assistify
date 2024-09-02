from unittest.mock import MagicMock
from uuid import uuid4

import pytest
from pymongo.database import Database

from assistify_api.database.models.assistant import Assistant

from .assistants_dao import AssistantsDao


def test_assistant_dao_inserts_record(mongo_db: Database, default_assistant: Assistant):
    """
    Test that a assistant record is inserted into the database.
    """
    assistant_dao = AssistantsDao(mongo_db)

    assistant_id = assistant_dao.upsert(default_assistant)

    # cleanup
    assert assistant_dao.delete_one(default_assistant.name)

    assert assistant_id


def test_find_all():
    """
    Test that the find_all method retrieves all assistant documents from the database.
    """
    mock_db = MagicMock()
    mock_collection = MagicMock()
    mock_db.__getitem__.return_value = mock_collection

    sample_data = [default_assistant_dict, {**default_assistant_dict, "name": "v002_add_assistants"}]
    mock_collection.find.return_value = sample_data

    result = AssistantsDao(mock_db).find_all()

    assert len(result) == 2
    assert result[0].name == "v001_data_init"
    assert result[1].name == "v002_add_assistants"


def test_assistant_does_find_record(mongo_db: Database, default_assistant: Assistant):
    """
    Test that an existing assistant record is found in the database.
    """
    assistant_dao = AssistantsDao(mongo_db)

    expected_assistant_id = assistant_dao.upsert(default_assistant)

    result_assistant = assistant_dao.find_one(default_assistant.name)

    # cleanup
    assert assistant_dao.delete_one(default_assistant.name)

    assert expected_assistant_id == str(result_assistant.id)


def test_assistant_does_not_find_record(mongo_db: Database, default_assistant: Assistant):
    """
    Test that a non-existent assistant record is not found in the database.
    """
    assistant_dao = AssistantsDao(mongo_db)
    result = assistant_dao.find_one(default_assistant.name)

    assert result is None


def test_assistant_dao_delete_no_record(mongo_db: Database, default_assistant: Assistant):
    """
    Test that deleting a non-existent assistant record returns a count of 0.
    """
    assistant_dao = AssistantsDao(mongo_db)
    deleted_count = assistant_dao.delete_one(default_assistant.name)
    assert deleted_count == 0


def test_assistant_dao_deletes_record(mongo_db: Database, default_assistant: Assistant):
    """
    Test that an existing assistant record is deleted from the database.
    """
    assistant_dao = AssistantsDao(mongo_db)
    assistant_dao.upsert(default_assistant)

    deleted_count = assistant_dao.delete_one(default_assistant.name)

    assert deleted_count == 1


default_assistant_dict = {
    "name": "v001_data_init",
    "assistant_id": "default_id",
    "model": "gpt-4o",
    "status": "Private",
    "image": "",
}


@pytest.fixture
def default_assistant() -> Assistant:
    """
    Fixture to provide a default Assistant model instance.
    """
    return Assistant(id=uuid4(), **default_assistant_dict)
