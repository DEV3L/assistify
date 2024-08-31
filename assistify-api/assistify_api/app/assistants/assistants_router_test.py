from unittest.mock import MagicMock, patch

from fastapi.testclient import TestClient

from assistify_api.conftest import mock_idinfo


# @patch("assistify_api.app.auth.verify_token.id_token")
# def test_get_assistants(mock_id_token, api_with_mocks: tuple[TestClient, MagicMock, MagicMock]):
#     """
#     Test the /assistants endpoint with valid authentication.
#     """
#     api_client, _, mock_openai_client = api_with_mocks

#     assistant_name_included = "Justin Beall - Knowledge Bot"
#     assistant_name_not_included = "Assistant 2"

#     mock_assistant_included = MagicMock(id="1", model="gpt-4o")
#     mock_assistant_included.name = assistant_name_included
#     mock_assistant_not_included = MagicMock(id="2", model="gpt-4o")
#     mock_assistant_not_included.name = assistant_name_not_included
#     mock_openai_client.assistants_list.return_value = [
#         mock_assistant_included,
#         mock_assistant_not_included,
#     ]
#     mock_id_token.verify_oauth2_token.return_value = mock_idinfo

#     response = api_client.post("/assistants", headers={"Authorization": "Bearer fake_token"})

#     assert response.status_code == 200
#     assert response.json() == {"assistants": [{"id": "1", "model": "gpt-4o", "name": assistant_name_included}]}
