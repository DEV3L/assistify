from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from assistify_api.conftest import mock_idinfo

from .verify_token import build_user_from_idinfo, verify_token


@pytest.fixture
def mock_credentials():
    return HTTPAuthorizationCredentials(scheme="Bearer", credentials="fake_token")


def test_verify_token_valid(mock_credentials: HTTPAuthorizationCredentials):
    with patch("google.oauth2.id_token.verify_oauth2_token", return_value=mock_idinfo):
        mock_users_dao = MagicMock()
        mock_users_dao.find_by.return_value = None

        result = verify_token(mock_credentials, mock_users_dao)
        assert result == build_user_from_idinfo(mock_idinfo, mock_users_dao)


def test_verify_token_invalid_issuer(mock_credentials: HTTPAuthorizationCredentials):
    mock_invalid_idinfo = {**mock_idinfo, "iss": "invalid.issuer.com"}

    with patch("google.oauth2.id_token.verify_oauth2_token", return_value=mock_invalid_idinfo):
        with pytest.raises(HTTPException) as exc_info:
            verify_token(mock_credentials)
        assert exc_info.value.status_code == 401
        assert exc_info.value.detail == "Invalid authentication credentials"


def test_verify_token_value_error(mock_credentials: HTTPAuthorizationCredentials):
    with patch("google.oauth2.id_token.verify_oauth2_token", side_effect=ValueError("Invalid token")):
        with pytest.raises(HTTPException) as exc_info:
            verify_token(mock_credentials)
        assert exc_info.value.status_code == 401
        assert exc_info.value.detail == "Invalid authentication credentials"
