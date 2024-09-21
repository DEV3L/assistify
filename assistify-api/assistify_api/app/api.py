from fastapi import Depends, FastAPI

from assistify_api.database.dao.version_dao import VersionDao
from assistify_api.database.models.version import Version
from assistify_api.services.chat import ChatService

from .assistants.assistants_router import router as assistants_router
from .auth.user import User
from .auth.verify_token import verify_token
from .chat.send_message import SendMessageRequest, SendMessageResponse
from .cors.custom_cors_middleware import CustomCORSMiddleware
from .dependencies.api_dependencies import get_chat_service
from .lifespan import lifespan

api = FastAPI(
    lifespan=lifespan,
    title="Assistify API",
    description="API for Assistify",
    summary="API for Assistify",
    version="0.1.0",
)
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


@api.get("/protected")
def protected_route(user_info: User = Depends(verify_token), version_dao: VersionDao = Depends(VersionDao)) -> dict:
    versions = version_dao.find_all(model_class=Version)
    latest_version = versions[-1]

    return {
        "message": f"Hello {user_info.name}, your email is {user_info.email}",
        "latest_version": f"The latest database migration version is {latest_version.version}",
    }


@api.post("/send-message")
def send_message(
    message: SendMessageRequest,
    chat_service: ChatService = Depends(get_chat_service),
    user: User = Depends(verify_token),
) -> SendMessageResponse:
    """
    Endpoint to receive a message. Requires authentication.
    """
    thread_id = chat_service.get_or_create_thread(user.email)
    response = chat_service.send_message(message.message, thread_id=thread_id)
    return SendMessageResponse(response=response)
