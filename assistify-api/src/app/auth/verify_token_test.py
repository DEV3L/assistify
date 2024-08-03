from unittest.mock import patch

import pytest
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from .verify_token import verify_token


@pytest.fixture
def mock_credentials():
    return HTTPAuthorizationCredentials(scheme="Bearer", credentials="fake_token")


def test_verify_token_valid(mock_credentials):
    mock_idinfo = {"iss": "accounts.google.com", "sub": "123456789", "email": "test@example.com"}

    with patch("google.oauth2.id_token.verify_oauth2_token", return_value=mock_idinfo):
        result = verify_token(mock_credentials)
        assert result == mock_idinfo


def test_verify_token_invalid_issuer(mock_credentials):
    mock_idinfo = {"iss": "invalid.issuer.com", "sub": "123456789", "email": "test@example.com"}

    with patch("google.oauth2.id_token.verify_oauth2_token", return_value=mock_idinfo):
        with pytest.raises(HTTPException) as exc_info:
            verify_token(mock_credentials)
        assert exc_info.value.status_code == 401
        assert exc_info.value.detail == "Invalid authentication credentials"


@pytest.mark.asyncio
def test_verify_token_value_error(mock_credentials):
    with patch("google.oauth2.id_token.verify_oauth2_token", side_effect=ValueError("Invalid token")):
        with pytest.raises(HTTPException) as exc_info:
            verify_token(mock_credentials)
        assert exc_info.value.status_code == 401
        assert exc_info.value.detail == "Invalid authentication credentials"
