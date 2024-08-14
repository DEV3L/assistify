from ai_assistant_manager.assistants.assistant_service import (
    AssistantService,
)
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from ai_assistant_manager.env_variables import ENV_VARIABLES
from loguru import logger

from data_exporter import export_data
from src.prompts.prompt import get_prompt


def main():
    logger.info(f"Building {ENV_VARIABLES.assistant_name}")

    export_data()

    client = OpenAIClient(build_openai_client())
    service = AssistantService(client, get_prompt())

    logger.info("Removing existing assistant and category files")
    service.delete_assistant()

    assistant_id = service.get_assistant_id()

    logger.info(f"Assistant ID: {assistant_id}")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        logger.info(f"Error: {e}")
