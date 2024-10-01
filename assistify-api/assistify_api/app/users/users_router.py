from fastapi import APIRouter, Depends

from assistify_api.database.models.user import User

from ..auth.verify_token import verify_token
from .users_response import UserResponse
from .users_service import UsersService

router = APIRouter(prefix="/api/users")


@router.get("/")
@router.get("")
def get_user(
    users_service: UsersService = Depends(UsersService),
    user: User = Depends(verify_token),
) -> UserResponse:
    return users_service.get_user(str(user.id))
