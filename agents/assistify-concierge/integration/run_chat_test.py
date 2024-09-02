import os

import pytest
from ai_assistant_manager.chats.chat import Chat
from loguru import logger

RUN_INTEGRATION = bool(os.getenv("RUN_INTEGRATION", "true"))
TESTS_NUMBER_OF_CHOICES = int(os.getenv("TESTS_NUMBER_OF_CHOICES", "1"))


@pytest.mark.skipif(not RUN_INTEGRATION, reason="openai integration")
@pytest.mark.parametrize("execution_number", range(TESTS_NUMBER_OF_CHOICES))
@pytest.mark.integration
def test_chat_knows_assistify_product_name(chat: Chat, execution_number: int):
    logger.info(f"Test Assistify Concierge knows assistify product name: {execution_number + 1}")

    response = chat.send_user_message("What is the product you help with?")

    logger.info(f"Response: {response}")

    assert "assistify" in response.message.lower()
