import shutil
from pathlib import Path

from ai_assistant_manager.assistants.assistant_service import (
    AssistantService,
)
from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from ai_assistant_manager.env_variables import ENV_VARIABLES, set_env_variables
from loguru import logger

from assistify_product_owner.prompts.prompt import get_prompt
from data_exporter import export_data


def main():
    _clear_bin_directory(f"./{ENV_VARIABLES.bin_dir}")
    logger.info(f"Building {ENV_VARIABLES.assistant_name}")

    export_data()

    client = OpenAIClient(build_openai_client())
    service = AssistantService(client, get_prompt())

    logger.info("Removing existing assistant and category files")
    service.delete_assistant()

    assistant_id = service.get_assistant_id()

    logger.info(f"Assistant ID: {assistant_id}")

    chat = Chat(
        client,
        assistant_id,
        # thread_id="abc",
    )
    chat.start()

    start_message = "Hello, what are we working on today?"
    print(f"\nMessage:\n{start_message}")
    start_response = chat.send_user_message(start_message)
    print(f"\n{service.assistant_name}:\n{start_response}")

    service.delete_assistant()


def _clear_bin_directory(bin_path: str) -> None:
    """
    Remove all files and directories in the specified bin directory.

    Args:
        bin_path (str): The path to the bin directory.
    """
    bin_dir = Path(bin_path)
    if bin_dir.exists() and bin_dir.is_dir():
        shutil.rmtree(bin_dir)
        bin_dir.mkdir()


if __name__ == "__main__":
    try:
        set_env_variables()
        main()
    except Exception as e:
        logger.info(f"Error: {e}")
