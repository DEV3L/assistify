from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.auth.transport import requests
from google.oauth2 import id_token

from assistify_api.env_variables import ENV_VARIABLES

from .user import User

GOOGLE_CLIENT_ID = ENV_VARIABLES.google_client_id

security = HTTPBearer()


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Wrong issuer.")
        return build_user_from_idinfo(idinfo)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def build_user_from_idinfo(idinfo: dict) -> User:
    return User(
        email=idinfo["email"],
        name=idinfo["name"],
        name_given=idinfo["given_name"],
        name_family=idinfo["family_name"],
        picture=idinfo["picture"],
    )
