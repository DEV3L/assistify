import pytest
from ai_assistant_manager.assistants.assistant_service import (
    AssistantService,
)
from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from ai_assistant_manager.env_variables import set_env_variables as set_env_variables_ai
from ai_assistant_manager.prompts.prompt import get_prompt
from ai_trello_extract.clients.trello_client import get_trello_client
from ai_trello_extract.env_variables import ENV_VARIABLES
from ai_trello_extract.env_variables import set_env_variables as set_env_variables_trello
from ai_trello_extract.orchestrators.orchestration_service import OrchestrationService
from ai_trello_extract.services.trello_service import TrelloService
from loguru import logger

from data_exporter import PROMPT_PATH

# Set environment variables for AI and Trello services
set_env_variables_ai()
set_env_variables_trello()


@pytest.fixture(scope="function")
def chat() -> Chat:
    """
    Fixture to create a Chat session for each test function.

    Returns:
        Chat: An instance of the Chat class initialized with an OpenAI client and assistant ID.
    """
    client = OpenAIClient(build_openai_client())
    service = AssistantService(client, get_prompt(prompt_path=PROMPT_PATH))
    assistant_id = service.get_assistant_id()

    logger.info(f"Assistant ID: {assistant_id}")

    chat = Chat(
        client,
        assistant_id,
    )
    chat.start()
    return chat


@pytest.fixture(scope="session", name="trello_data")
def trello_data() -> dict:
    """
    Fixture to fetch Trello board data once per test session.

    Returns:
        dict: JSON data of the Trello board.
    """
    orchestration_service = OrchestrationService(
        TrelloService(get_trello_client(ENV_VARIABLES.trello_api_key, ENV_VARIABLES.trello_api_token))
    )

    return orchestration_service.get_board_json(ENV_VARIABLES.trello_board_name)
