from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.auth.transport import requests
from google.oauth2 import id_token

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.dao.users_dao import UsersDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.database.models.user import User
from assistify_api.env_variables import ENV_VARIABLES

GOOGLE_CLIENT_ID = ENV_VARIABLES.google_client_id

security = HTTPBearer()

CONCIERGE_ASSISTANT_NAME = "Assistify - Concierge"


def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    users_dao: UsersDao = Depends(UsersDao),
    assistants_dao: AssistantsDao = Depends(AssistantsDao),
):
    token = credentials.credentials
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Wrong issuer.")
        return build_user_from_idinfo(idinfo, users_dao, assistants_dao)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def build_user_from_idinfo(idinfo: dict, users_dao: UsersDao, assistants_dao: AssistantsDao) -> User:
    user = users_dao.find_one_by({"email": idinfo["email"]}, model_class=User)

    if user is None:
        assistant = assistants_dao.find_one_by({"name": CONCIERGE_ASSISTANT_NAME}, model_class=Assistant)

        user = User(
            email=idinfo["email"],
            image=idinfo["picture"],
            name=idinfo["name"],
            assistant_ids=[str(assistant.id)] if assistant else [],
        )
        user = users_dao.find_one(users_dao.upsert(user), model_class=User)

    return user
