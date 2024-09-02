from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from pymongo.database import Database

from assistify_api.database.mongodb import MongoDb
from assistify_api.services.chat import ChatService


def get_mongo_db() -> Database:
    """
    Provides an instance of the MongoDB client.

    Returns:
        An instance of MongoDB.
    """

    return MongoDb.instance()


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
    hardcoded_assistant_id = "asst_0sd6SgqvyDhwZW8wuwdoHFQb"
    return ChatService(Chat(get_openai_client(), hardcoded_assistant_id))
