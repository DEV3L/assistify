from .assistants_service import AssistantsService


def test_get_assistants(assistants_service: AssistantsService):
    assistants_response = assistants_service.get_assistants()

    assert assistants_response.assistants[0].name == "Assistify - Concierge"
