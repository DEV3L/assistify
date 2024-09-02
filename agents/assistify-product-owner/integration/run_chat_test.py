import os

import pytest
from ai_assistant_manager.chats.chat import Chat
from loguru import logger

RUN_INTEGRATION = bool(os.getenv("RUN_INTEGRATION", "true"))
TESTS_NUMBER_OF_CHOICES = int(os.getenv("TESTS_NUMBER_OF_CHOICES", "1"))


@pytest.mark.skipif(not RUN_INTEGRATION, reason="openai integration")
@pytest.mark.parametrize("execution_number", range(TESTS_NUMBER_OF_CHOICES))
@pytest.mark.integration
def test_chat_find_done_story(chat: Chat, trello_data: dict, execution_number: int):
    logger.info(f"Test chat find done story: {execution_number + 1}")
    done_titles = [card["title"] for card in trello_data["done"]]

    response = chat.send_user_message("What is the title of a story that is done?")
    found_titles = [title for title in done_titles if title in response.message]

    logger.info(f"Response: {response}")
    logger.info(f"Found Titles: {found_titles}")

    assert any(found_titles)


@pytest.mark.skipif(not RUN_INTEGRATION, reason="openai integration")
@pytest.mark.parametrize("execution_number", range(TESTS_NUMBER_OF_CHOICES))
@pytest.mark.integration
def test_chat_knows_assistify_product_name(chat: Chat, execution_number: int):
    logger.info(f"Test chat knows assistify product name: {execution_number + 1}")

    response = chat.send_user_message("What is the product you work on?")

    logger.info(f"Response: {response}")

    assert "assistify" in response.message.lower()
