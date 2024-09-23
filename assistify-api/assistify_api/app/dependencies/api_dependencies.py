from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from fastapi import Depends

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.dao.users_dao import UsersDao
from assistify_api.database.models.assistant import Assistant

from ..messages.messages_service import MessagesService


def get_openai_client() -> OpenAIClient:
    return OpenAIClient(build_openai_client())


def get_messages_service(
    assistants_dao: AssistantsDao = Depends(AssistantsDao),
    threads_dao: ThreadsDao = Depends(ThreadsDao),
    users_dao: UsersDao = Depends(UsersDao),
) -> MessagesService:
    assistants: Assistant = [
        assistant
        for assistant in assistants_dao.find_all(model_class=Assistant)
        if assistant.assistant_id == hardcoded_assistant_id
    ]

    if len(assistants) == 0:
        raise ValueError("Assistant not found")

    return MessagesService(
        Chat(get_openai_client(), assistants[0].assistant_id), assistants[0], assistants_dao, threads_dao, users_dao
    )


# temporary hardcoded assistant id
hardcoded_assistant_id = "asst_0sd6SgqvyDhwZW8wuwdoHFQb"
