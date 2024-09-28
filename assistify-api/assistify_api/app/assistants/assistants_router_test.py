from unittest.mock import MagicMock, patch

from fastapi.testclient import TestClient

from assistify_api.conftest import mock_idinfo


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_assistants(mock_id_token, api_with_mocks: tuple[TestClient, MagicMock, MagicMock]):
    """
    Test the /assistants endpoint with valid authentication.
    """
    api_client, _, _ = api_with_mocks

    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.get("/api/assistants", headers={"Authorization": "Bearer fake_token"})
    assistants_response = response.json()["assistants"]

    assert response.status_code == 200
    assert assistants_response[0]["assistant_id"] is not None
