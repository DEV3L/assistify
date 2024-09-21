from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from fastapi import Depends

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.services.chat import ChatService


def get_openai_client() -> OpenAIClient:
    return OpenAIClient(build_openai_client())


def get_chat_service(
    threads_dao: ThreadsDao = Depends(ThreadsDao), assistants_dao: AssistantsDao = Depends(AssistantsDao)
) -> ChatService:
    assistants: Assistant = [
        assistant
        for assistant in assistants_dao.find_all(model_class=Assistant)
        if assistant.assistant_id == hardcoded_assistant_id
    ]

    if not assistants:
        raise ValueError("Assistant not found")

    return ChatService(
        Chat(get_openai_client(), assistants[0].assistant_id), assistants[0], threads_dao, assistants_dao
    )


# temporary hardcoded assistant id
hardcoded_assistant_id = "asst_0sd6SgqvyDhwZW8wuwdoHFQb"
