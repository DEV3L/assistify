from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client

from assistify_api.services.chat import ChatService


def get_openai_client() -> OpenAIClient:
    """
    Provides an instance of the OpenAI API client.

    Returns:
        An instance of OpenAIClient.
    """
    return OpenAIClient(build_openai_client())


def get_chat_service() -> ChatService:
    """
    Provides an instance of ChatService.

    Returns:
        An instance of ChatService.
    """
    knowledge_bot_assistant_id = "asst_XWLIxFEE3nQUwqTGqOH9sUfY"
    return ChatService(Chat(get_openai_client(), knowledge_bot_assistant_id))
