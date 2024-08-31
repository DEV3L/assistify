from typing import Literal
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from assistify_api.conftest import mock_idinfo

# @pytest.mark.parametrize(
#     "route, verb, expected_status, expected_response",
#     [
#         ("/", "GET", 200, {"message": "Hello Assistify"}),
#         # ("/protected", "GET", 401, None),
#         # ("/send-message", "POST", 401, None),
#         # ("/assistants", "POST", 401, None),
#     ],
# )
# def test_routes_unauthorized(
#     api_with_mocks: tuple[TestClient, MagicMock, MagicMock],
#     route: str,
#     verb: Literal["GET", "POST"],
#     expected_status: int,
#     expected_response: dict,
# ):
#     """
#     Test various routes with unauthorized access.
#     """
#     api_client, _, _ = api_with_mocks

#     if verb == "GET":
#         response = api_client.get(route, headers={"Authorization": "Bearer invalid_token"})
#     else:
#         response = api_client.post(route, headers={"Authorization": "Bearer invalid_token"})

#     assert response.status_code == expected_status
#     if expected_response:
#         assert response.json() == expected_response


# @patch("assistify_api.app.auth.verify_token.id_token")
# def test_protected_route(
#     mock_id_token,
#     api_with_mocks: tuple[TestClient, MagicMock, MagicMock],
# ):
#     api_client, _, _ = api_with_mocks

#     mock_id_token.verify_oauth2_token.return_value = mock_idinfo

#     response = api_client.get("/protected", headers={"Authorization": "Bearer fake_token"})

#     assert response.status_code == 200
#     assert response.json() == {
#         "message": f"Hello {mock_idinfo['name']}, your email is {mock_idinfo['email']}",
#         "latest_version": "The latest database migration version is v001_hello_world",
#     }


@patch("assistify_api.app.auth.verify_token.id_token")
def test_send_message(
    mock_id_token,
    api_with_mocks: tuple[TestClient, MagicMock, MagicMock],
):
    """
    Test the /send-message endpoint with valid authentication and message payload.
    """

    api_client, mock_chat_service, _ = api_with_mocks

    mock_chat_service.send_message.return_value = "What can I do for you?"
    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.post(
        "/send-message", headers={"Authorization": "Bearer fake_token"}, json={"message": "Hello world"}
    )

    assert response.status_code == 200
    assert response.json() == {"response": "What can I do for you?"}


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_assistants(
    mock_id_token,
    api_with_mocks: tuple[TestClient, MagicMock, MagicMock],
):
    """
    Test the /send-message endpoint with valid authentication and message payload.
    """
    api_client, _, mock_openai_client = api_with_mocks

    assistant_name_included = "Justin Beall - Knowledge Bot"
    assistant_name_not_included = "Assistant 2"

    mock_assistant_included = MagicMock(id="1", model="gpt-4o")
    mock_assistant_included.name = assistant_name_included
    mock_assistant_not_included = MagicMock(id="2", model="gpt-4o")
    mock_assistant_not_included.name = assistant_name_not_included
    mock_openai_client.assistants_list.return_value = [
        mock_assistant_included,
        mock_assistant_not_included,
    ]
    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.get("/api/assistants", headers={"Authorization": "Bearer fake_token"})

    assert response.status_code == 200
    assert response.json() == {"assistants": [{"id": "1", "model": "gpt-4o", "name": assistant_name_included}]}
