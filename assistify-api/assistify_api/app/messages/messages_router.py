from fastapi import APIRouter, Depends

from assistify_api.app.dependencies.api_dependencies import get_messages_service
from assistify_api.app.messages.messages_service import MessagesService

from ..auth.user import User
from ..auth.verify_token import verify_token
from .send_message import SendMessageRequest, SendMessageResponse

router = APIRouter(prefix="/api/messages")


@router.post("/send-message")
@router.post("/send-message/")
def send_message(
    message: SendMessageRequest,
    chat_service: MessagesService = Depends(get_messages_service),
    user: User = Depends(verify_token),
) -> SendMessageResponse:
    """
    Endpoint to receive a message. Requires authentication.
    """
    thread = chat_service.get_or_create_thread(user.email)
    response = chat_service.send_message(message.message, thread=thread)
    return SendMessageResponse(response=response.message)
