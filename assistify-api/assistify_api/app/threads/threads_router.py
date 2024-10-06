from fastapi import APIRouter, Depends

from assistify_api.database.models.thread import Thread
from assistify_api.database.models.user import User

from ..auth.verify_token import verify_token
from ..dependencies.api_dependencies import get_messages_service, get_threads_service
from ..messages.messages_service import MessagesService
from .thread import ThreadResponse
from .threads_service import ThreadsService

router = APIRouter(prefix="/api/threads")


@router.post("/last-thread")
@router.post("/last-thread/")
def last_thread(
    messages_service: MessagesService = Depends(get_messages_service),
    threads_service: ThreadsService = Depends(get_threads_service),
    user: User = Depends(verify_token),
) -> ThreadResponse:
    last_thread = threads_service.get_last_thread(str(user.email))

    if not last_thread:
        last_thread = threads_service.find_one(
            threads_service.upsert(
                Thread(
                    user_id=str(user.email),
                    assistant_id=messages_service.assistant.assistant_id,
                    assistant_name=messages_service.assistant.assistant_name,
                    model=messages_service.assistant.model,
                    provider_thread_id=messages_service.chat.thread_id,
                )
            )
        )

    return last_thread
