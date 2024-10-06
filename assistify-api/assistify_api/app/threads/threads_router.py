from fastapi import APIRouter, Depends

from assistify_api.app.dependencies.api_dependencies import get_threads_service
from assistify_api.app.threads.threads_service import ThreadsService
from assistify_api.database.models.user import User

from ..auth.verify_token import verify_token
from .thread import ThreadResponse

router = APIRouter(prefix="/api/threads")


@router.post("/last-thread")
@router.post("/last-thread/")
def last_thread(
    threads_service: ThreadsService = Depends(get_threads_service),
    user: User = Depends(verify_token),
) -> ThreadResponse | None:
    return threads_service.get_last_thread(user.id)
