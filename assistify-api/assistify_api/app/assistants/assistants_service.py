from ai_assistant_manager.clients.openai_api import OpenAIClient
from fastapi import Depends
from pymongo.database import Database

from assistify_api.app.dependencies.api_dependencies import get_mongo_db, get_openai_client
from assistify_api.database.dao.assistants_dao import AssistantsDao

from .list_assistants_response import AssistantResponse, ListAssistantsResponse


class AssistantsService:
    """
    Service to handle operations related to assistants.

    Attributes:
        open_ai_client (OpenAIClient): The OpenAI API client.
        mongo_db (Database): The MongoDB database.
    """

    def __init__(
        self, open_ai_client: OpenAIClient = Depends(get_openai_client), mongo_db: Database = Depends(get_mongo_db)
    ):
        """
        Initializes the AssistantsService with an OpenAI client.

        Args:
            open_ai_client (OpenAIClient): The OpenAI API client.
            mongo_db (Database): The MongoDB database.
        """
        self.open_ai_client = open_ai_client
        self.mongo_db = mongo_db

    def get_assistants(self) -> ListAssistantsResponse:
        """
        Retrieves a list of assistants filtered by a whitelist.

        Returns:
            ListAssistantsResponse: A response object containing the list of assistants.
        """

        assistant_dao = AssistantsDao(self.mongo_db)
        assistants = assistant_dao.find_all()

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
