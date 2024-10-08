from unittest.mock import patch


from assistify_api.conftest import TestClientWithMocks, mock_idinfo


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_assistant(
    mock_id_token,
    test_client_with_mocks: TestClientWithMocks,
):
    api_client = test_client_with_mocks.api_client

    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.get("/api/assistants", headers={"Authorization": "Bearer fake_token"})
    assistants_response = response.json()["assistants"]
    assistants_id = assistants_response[0]["_id"]

    assert response.status_code == 200
    assert assistants_id is not None

    response = api_client.get(f"/api/assistants/{assistants_id}", headers={"Authorization": "Bearer fake_token"})
    assistant_id = response.json()["_id"]

    assert response.status_code == 200
    assert assistant_id == assistants_id


@patch("assistify_api.app.auth.verify_token.id_token")
def test_get_assistant_not_found(
    mock_id_token,
    test_client_with_mocks: TestClientWithMocks,
):
    api_client = test_client_with_mocks.api_client

    mock_id_token.verify_oauth2_token.return_value = mock_idinfo

    response = api_client.get("/api/assistants/abc", headers={"Authorization": "Bearer fake_token"})

    assert response.status_code == 404
