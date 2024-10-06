from unittest.mock import MagicMock, patch

from fastapi.testclient import TestClient

from assistify_api.conftest import mock_idinfo


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_user(
    mock_id_token,
    api_with_mocks: tuple[TestClient, MagicMock, MagicMock, MagicMock],
):
    api_client, _, _, _ = api_with_mocks

    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.get("/api/users", headers={"Authorization": "Bearer fake_token"})
    user_response = response.json()

    assert response.status_code == 200
    assert user_response["email"] == mock_idinfo["email"]
