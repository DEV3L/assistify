from ai_assistant_manager.clients.openai_api import OpenAIClient
from fastapi import Depends

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.models.assistant import Assistant

from ..dependencies.api_dependencies import get_openai_client
from .list_assistants_response import AssistantResponse, ListAssistantsResponse


class AssistantsService:
    def __init__(
        self,
        open_ai_client: OpenAIClient = Depends(get_openai_client),
        assistants_dao: AssistantsDao = Depends(AssistantsDao),
    ):
        self.open_ai_client = open_ai_client
        self.assistants_dao = assistants_dao

    def get_assistants(self) -> ListAssistantsResponse:
        assistants = self.assistants_dao.find_all(model_class=Assistant)

        return ListAssistantsResponse(
            assistants=[
                AssistantResponse(
                    assistant_id=assistant.assistant_id,
                    image=assistant.image,
                    model=assistant.model,
                    name=assistant.name,
                    status=assistant.status,
                )
                for assistant in assistants
            ]
        )
