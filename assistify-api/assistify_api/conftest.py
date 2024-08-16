from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient

from assistify_api.app.api import api
from assistify_api.app.dependencies.api_dependencies import get_chat_service, get_openai_client

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
    mock_chat_service = MagicMock()
    mock_openai_client = MagicMock()

    api.dependency_overrides[get_chat_service] = lambda: mock_chat_service
    api.dependency_overrides[get_openai_client] = lambda: mock_openai_client

    with TestClient(api) as api_client:
        yield api_client, mock_chat_service, mock_openai_client

    api.dependency_overrides[get_chat_service] = get_chat_service
    api.dependency_overrides[get_openai_client] = get_openai_client