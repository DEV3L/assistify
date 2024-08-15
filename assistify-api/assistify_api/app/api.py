import random

from fastapi import Depends, FastAPI

from assistify_api.app.chat.send_message import SendMessageRequest, SendMessageResponse
from assistify_api.app.cors.custom_cors_middleware import CustomCORSMiddleware
from assistify_api.app.dependencies.api_dependencies import get_chat_service
from assistify_api.services.chat import ChatService

from .auth.verify_token import verify_token

api = FastAPI()

api.add_middleware(CustomCORSMiddleware)


@api.get("/")
def read_root():
    return {"message": "Hello Assistify"}


@api.get("/random-number")
def read_random_number():
    number = random.randint(1, 100)
    return {"message": f"Your random number is {number}"}


@api.get("/protected")
def protected_route(user_info: dict = Depends(verify_token)):
    return {"message": f"Hello {user_info['name']}, your email is {user_info['email']}"}


@api.post("/send-message")
def send_message(
    message: SendMessageRequest,
    chatService: ChatService = Depends(get_chat_service),
    _: dict = Depends(verify_token),
):
    """
    Endpoint to receive a message. Requires authentication.

    Args:
        message (SendMessageRequest): The send message payload.
        user_info (dict): The authenticated user's information.

    Returns:
        SendMessageResponse: The chatbot's response.
    """
    response = chatService.send_message(message=message.message)

    return SendMessageResponse(response=response)
