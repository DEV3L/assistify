import random

from fastapi import Depends, FastAPI
from pymongo.database import Database

from assistify_api.app.assistants.assistants_router import router as assistants_router
from assistify_api.database.dao.version_dao import VersionDao
from assistify_api.database.mongodb import MongoDb
from assistify_api.services.chat import ChatService

from .auth.user import User
from .auth.verify_token import verify_token
from .chat.send_message import SendMessageRequest, SendMessageResponse
from .cors.custom_cors_middleware import CustomCORSMiddleware
from .dependencies.api_dependencies import get_chat_service
from .lifespan import lifespan

api = FastAPI(lifespan=lifespan)
api.add_middleware(CustomCORSMiddleware)

api.include_router(assistants_router)


@api.get("/")
def read_root() -> dict:
    """
    Root endpoint.

    Returns:
        dict: A welcome message.
    """
    return {"message": "Hello Assistify"}


@api.get("/random-number")
def read_random_number() -> dict:
    """
    Endpoint to get a random number.

    Returns:
        dict: A message containing a random number between 1 and 100.
    """
    number = random.randint(1, 100)
    return {"message": f"Your random number is {number}"}


@api.get("/protected")
def protected_route(user_info: User = Depends(verify_token), db: Database = Depends(MongoDb.instance)) -> dict:
    """
    Protected endpoint that requires authentication.

    Args:
        user_info (User): The authenticated user's information.

    Returns:
        dict: A message containing the user's name and email.
    """
    version_dao = VersionDao(db)
    versions = version_dao.find_all()
    latest_version = versions[-1]

    return {
        "message": f"Hello {user_info.name}, your email is {user_info.email}",
        "latest_version": f"The latest database migration version is {latest_version.version}",
    }


@api.post("/send-message")
def send_message(
    message: SendMessageRequest,
    chat_service: ChatService = Depends(get_chat_service),
    _: User = Depends(verify_token),
) -> SendMessageResponse:
    """
    Endpoint to receive a message. Requires authentication.

    Args:
        message (SendMessageRequest): The send message payload.
        chat_service (ChatService): The chat service dependency.
        _ (User): The authenticated user's information.

    Returns:
        SendMessageResponse: The chatbot's response.
    """
    response = chat_service.send_message(message=message.message)

    return SendMessageResponse(response=response)
