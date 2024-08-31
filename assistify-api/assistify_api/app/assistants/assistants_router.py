from fastapi import Depends

from assistify_api.app.api_router import APIRouter
from assistify_api.app.auth.user import User
from assistify_api.app.auth.verify_token import verify_token

from .assistants_service import AssistantsService
from .list_assistants_response import ListAssistantsResponse

router = APIRouter(prefix="/api/assistants")


@router.get("/")
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
