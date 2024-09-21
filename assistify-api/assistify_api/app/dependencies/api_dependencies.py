from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client

from assistify_api.services.chat import ChatService


def get_openai_client() -> OpenAIClient:
    return OpenAIClient(build_openai_client())


def get_chat_service() -> ChatService:
    hardcoded_assistant_id = "asst_0sd6SgqvyDhwZW8wuwdoHFQb"
    return ChatService(Chat(get_openai_client(), hardcoded_assistant_id))
