from unittest.mock import patch


from assistify_api.conftest import TestClientWithMocks, mock_idinfo


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_user(mock_id_token, test_client_with_mocks: TestClientWithMocks):
    api_client = test_client_with_mocks.api_client

    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.get("/api/users", headers={"Authorization": "Bearer fake_token"})
    user_response = response.json()

    assert response.status_code == 200
    assert user_response["email"] == mock_idinfo["email"]
