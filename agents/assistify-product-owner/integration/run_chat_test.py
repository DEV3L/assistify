import os

import pytest
from ai_assistant_manager.assistants.assistant_service import (
    AssistantService,
)
from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from ai_assistant_manager.env_variables import set_env_variables
from loguru import logger

from assistify_product_owner.prompts.prompt import get_prompt

# from src.exporters.amazon.amazon_products_exporter import AmazonProductsExporter

RUN_INTEGRATION = bool(os.getenv("RUN_INTEGRATION"))
TESTS_NUMBER_OF_CHOICES = int(os.getenv("TESTS_NUMBER_OF_CHOICES", "1"))


TEST_MESSAGE = "Can you list the titles of the stories that are done from the trello board?"

set_env_variables()

# Extract current trello data to compare answer


@pytest.fixture(scope="session", name="chat")
def chat_session():
    client = OpenAIClient(build_openai_client())
    service = AssistantService(client, get_prompt())
    assistant_id = service.get_assistant_id()

    logger.info(f"Assistant ID: {assistant_id}")

    return Chat(
        client,
        assistant_id,
    )


@pytest.fixture(scope="session", name="trello_data")
def amazon_data():
    trello = "Trello Data"
    return trello


@pytest.mark.skipif(not RUN_INTEGRATION, reason="openai integration")
@pytest.mark.parametrize("execution_number", range(TESTS_NUMBER_OF_CHOICES))
@pytest.mark.integration
def test_chat_find_compatible_ram(chat: Chat, trello_data: str, execution_number: int):
    logger.info(f"Test chat find compatible ram execution number: {execution_number + 1}")

    chat.thread_id = None
    chat.start()

    logger.info(f"Sending chat message: {TEST_MESSAGE}")
    start_response = chat.send_user_message(TEST_MESSAGE)
    logger.info(f"\n{start_response}")

    # Determine if the response has the titles of the stories that are done from the trello board


def extract_asin_from_response(response: str) -> list[str]:
    asin_lines = [line.strip().split(" ")[-1] for line in response.split("\n") if "ASIN" in line.upper()]

    if not asin_lines:
        assert False, f"No ASINs found in response: {response}"

    return asin_lines
