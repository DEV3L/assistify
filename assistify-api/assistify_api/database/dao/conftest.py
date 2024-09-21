from uuid import uuid4

import pytest
from pymongo.database import Database

from ..models.assistant import Assistant
from .dao import Dao

default_assistant_dict = {
    "name": "v001_data_init",
    "assistant_id": "default_id",
    "model": "gpt-4o",
    "status": "Private",
    "image": "",
}

dao_collection = "dao-test"


@pytest.fixture
def default_assistant() -> Assistant:
    """
    Fixture to provide a default Assistant model instance.
    """
    return Assistant(id=uuid4(), **default_assistant_dict)


@pytest.fixture
def dao(mongo_db: Database) -> Dao:
    """
    Fixture to provide a default Assistant model instance.
    """
    return Dao(mongo_db, collection=dao_collection)
