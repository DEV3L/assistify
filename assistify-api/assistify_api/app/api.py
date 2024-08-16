import random

from ai_assistant_manager.clients.openai_api import OpenAIClient
from fastapi import Depends, FastAPI

from assistify_api.app.assistants.available_assistants import assistants_whitelist
from assistify_api.app.assistants.list_assistants_response import AssistantsResponse, ListAssistantsResponse
from assistify_api.app.auth.user import User
from assistify_api.app.chat.send_message import SendMessageRequest, SendMessageResponse
from assistify_api.app.cors.custom_cors_middleware import CustomCORSMiddleware
from assistify_api.app.dependencies.api_dependencies import get_chat_service, get_openai_client
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
def protected_route(user_info: User = Depends(verify_token)):
    return {"message": f"Hello {user_info.name}, your email is {user_info.email}"}


@api.post("/send-message")
def send_message(
    message: SendMessageRequest,
    chat_service: ChatService = Depends(get_chat_service),
    _: User = Depends(verify_token),
):
    """
    Endpoint to receive a message. Requires authentication.

    Args:
        message (SendMessageRequest): The send message payload.
        user_info (User): The authenticated user's information.

    Returns:
        SendMessageResponse: The chatbot's response.
    """
    response = chat_service.send_message(message=message.message)

    return SendMessageResponse(response=response)


@api.get("/assistants")
def get_assistants(
    open_ai_client: OpenAIClient = Depends(get_openai_client),
    _: User = Depends(verify_token),
):
    response = open_ai_client.assistants_list()
    return ListAssistantsResponse(
        assistants=[
            AssistantsResponse(id=assistant.id, model=assistant.model, name=assistant.name)
            for assistant in response
            if assistant.name in assistants_whitelist
        ]
    )
