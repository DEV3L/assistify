from assistify_api.database.models.assistant import Assistant

from .assistants_service import AssistantsService


def test_get_assistants(assistants_service: AssistantsService):
    assistant = Assistant(
        assistant_id="abc",
        model="gpt-4o-mini",
        name="test",
    )
    assistants_service.assistants_dao.find_all.return_value = [assistant]

    assistants_response = assistants_service.get_assistants()

    assert assistants_response.assistants[0].assistant_id == assistant.assistant_id
