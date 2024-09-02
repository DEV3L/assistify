from fastapi import APIRouter, Depends, HTTPException, Path

from assistify_api.app.auth.user import User
from assistify_api.app.auth.verify_token import verify_token

from .assistants_service import AssistantsService
from .list_assistants_response import AssistantResponse, ListAssistantsResponse

router = APIRouter(prefix="/api/assistants")


@router.get("/")
@router.get("")
def get_assistants(
    assistants_service: AssistantsService = Depends(AssistantsService),
    _: User = Depends(verify_token),
) -> ListAssistantsResponse:
    """
    Endpoint to retrieve a list of assistants.

    Args:
        assistants_service (AssistantsService): The service to handle assistant-related operations.
        _ (User): The authenticated user, verified by the token.

    Returns:
        ListAssistantsResponse: A response object containing the list of assistants.
    """
    return assistants_service.get_assistants()


@router.get("/{assistant_id}")
@router.get("/{assistant_id}/")
def get_assistant(
    assistant_id: int = Path(..., description="The ID of the assistant to retrieve"),
    assistants_service: AssistantsService = Depends(AssistantsService),
    _: User = Depends(verify_token),
) -> AssistantResponse:
    """
    Endpoint to retrieve a specific assistant by ID.

    Args:
        assistant_id (int): The ID of the assistant to retrieve.
        assistants_service (AssistantsService): The service to handle assistant-related operations.
        _ (User): The authenticated user, verified by the token.

    Returns:
        AssistantResponse: A response object containing the assistant details.

    Raises:
        HTTPException: If no assistant with the given ID is found.
    """
    assistants = assistants_service.get_assistants().assistants
    for assistant in assistants:
        if assistant.id == assistant_id:
            return assistant
    raise HTTPException(status_code=404, detail="Assistant not found")
