from fastapi import Depends, FastAPI

from assistify_api.database.dao.version_dao import VersionDao
from assistify_api.database.models.user import User
from assistify_api.database.models.version import Version

from .assistants.assistants_router import router as assistants_router
from .auth.verify_token import verify_token
from .cors.custom_cors_middleware import CustomCORSMiddleware
from .lifespan import lifespan
from .messages.messages_router import router as messages_router

api = FastAPI(
    lifespan=lifespan,
    title="Assistify API",
    description="API for Assistify",
    summary="API for Assistify",
    version="0.1.0",
)
api.add_middleware(CustomCORSMiddleware)

api.include_router(assistants_router)
api.include_router(messages_router)


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
