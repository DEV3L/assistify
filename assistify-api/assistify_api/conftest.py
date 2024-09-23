from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from pymongo.database import Database

from .app.api import api
from .app.assistants.assistants_service import AssistantsService
from .app.dependencies.api_dependencies import get_messages_service, get_openai_client
from .database.handle_migrations import run_migrations
from .database.mongodb import MongoDb
from .env_variables import set_env_variables

mock_idinfo = {
    "iss": "accounts.google.com",
    "sub": "123456789",
    "email": "test@example.com",
    "name": "test name",
    "given_name": "test given name",
    "family_name": "test family name",
    "picture": "test picture",
}


@pytest.fixture
def api_with_mocks():
    """
    Fixture to provide a TestClient instance with mocked dependencies for the API.

    Mocks the chat service and OpenAI client dependencies, sets environment variables
    from a test-specific .env file, and yields a TestClient instance along with the mocks.

    Yields:
        Tuple[TestClient, MagicMock, MagicMock]: The TestClient instance, mock chat service, and mock OpenAI client.
    """
    mock_chat_service = MagicMock()
    mock_openai_client = MagicMock()

    api.dependency_overrides[get_messages_service] = lambda: mock_chat_service
    api.dependency_overrides[get_openai_client] = lambda: mock_openai_client

    set_env_variables(".env.test")

    with TestClient(api) as api_client:
        yield api_client, mock_chat_service, mock_openai_client

    api.dependency_overrides[get_messages_service] = get_messages_service
    api.dependency_overrides[get_openai_client] = get_openai_client


@pytest.fixture
def mongo_db() -> Database:
    """
    Fixture to provide a fresh MongoDB instance for testing.

    Sets environment variables from a test-specific .env file, forces a new MongoDB instance,
    drops all collections to start fresh, runs migrations, and returns the database instance.

    Returns:
        Database: The MongoDB instance.
    """
    set_env_variables(".env.test")

    _mongo_db = MongoDb.instance(force=True)

    # Drop all collections to start fresh
    [_mongo_db.drop_collection(collection_name) for collection_name in _mongo_db.list_collection_names()]

    run_migrations("assistify_api/database/migrations")
    return _mongo_db


@pytest.fixture
def mock_openai_client():
    return MagicMock()


@pytest.fixture
def assistants_service(
    mock_openai_client,
):
    return AssistantsService(open_ai_client=mock_openai_client, assistants_dao=MagicMock())
