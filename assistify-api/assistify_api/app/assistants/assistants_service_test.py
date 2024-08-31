from unittest.mock import MagicMock

from .assistants_service import AssistantsService
from .list_assistants_response import AssistantsResponse, ListAssistantsResponse


def test_get_assistants(assistants_service: AssistantsService):
    """
    Test the get_assistants method of AssistantsService.
    """
    mock_openai_client = assistants_service.open_ai_client

    assistant_name_included = "Justin Beall - Knowledge Bot"
    assistant_name_not_included = "Assistant 2"

    mock_assistant_included = MagicMock(id="1", model="gpt-4o")
    mock_assistant_included.name = assistant_name_included
    mock_assistant_not_included = MagicMock(id="2", model="gpt-4o")
    mock_assistant_not_included.name = assistant_name_not_included
    mock_openai_client.assistants_list.return_value = [
        mock_assistant_included,
        mock_assistant_not_included,
    ]

    response = assistants_service.get_assistants()

    expected_response = ListAssistantsResponse(
        assistants=[AssistantsResponse(id="1", model="gpt-4o", name=assistant_name_included)]
    )

    assert response == expected_response
    mock_openai_client.assistants_list.assert_called_once()
