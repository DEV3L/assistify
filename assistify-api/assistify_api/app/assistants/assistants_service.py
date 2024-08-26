from ai_assistant_manager.clients.openai_api import OpenAIClient
from fastapi import Depends

from assistify_api.app.dependencies.api_dependencies import get_openai_client

from .available_assistants import assistants_whitelist
from .list_assistants_response import AssistantsResponse, ListAssistantsResponse


class AssistantsService:
    """
    Service to handle operations related to assistants.

    Attributes:
        open_ai_client (OpenAIClient): The OpenAI API client.
    """

    def __init__(self, open_ai_client: OpenAIClient = Depends(get_openai_client)):
        """
        Initializes the AssistantsService with an OpenAI client.

        Args:
            open_ai_client (OpenAIClient): The OpenAI API client.
        """
        self.open_ai_client = open_ai_client

    def get_assistants(self) -> ListAssistantsResponse:
        """
        Retrieves a list of assistants filtered by a whitelist.

        Returns:
            ListAssistantsResponse: A response object containing the list of assistants.
        """
        response = self.open_ai_client.assistants_list()
        return ListAssistantsResponse(
            assistants=[
                AssistantsResponse(id=assistant.id, model=assistant.model, name=assistant.name)
                for assistant in response
                if assistant.name in assistants_whitelist  # Only include assistants in the whitelist
            ]
        )
