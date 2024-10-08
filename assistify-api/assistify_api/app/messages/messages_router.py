from fastapi import APIRouter, Depends

from assistify_api.app.dependencies.api_dependencies import get_messages_service
from assistify_api.app.messages.messages_service import MessagesService
from assistify_api.database.models.user import User

from ..auth.verify_token import verify_token
from .send_message import SendMessageRequest, SendMessageResponse

router = APIRouter(prefix="/api/messages")


@router.post("/send-message")
@router.post("/send-message/")
def send_message(
    message: SendMessageRequest,
    message_service: MessagesService = Depends(get_messages_service),
    user: User = Depends(verify_token),
) -> SendMessageResponse:
    thread = message_service.get_thread(user, message.thread_id)
    response = message_service.send_message(message.message, thread=thread, user=user)
    return SendMessageResponse(response=response.message, thread_id=str(thread.id))
