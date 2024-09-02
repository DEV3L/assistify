from ai_assistant_manager.assistants.assistant_service import (
    AssistantService,
)
from ai_assistant_manager.chats.chat import Chat
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from ai_assistant_manager.env_variables import ENV_VARIABLES, set_env_variables
from ai_assistant_manager.prompts.prompt import get_prompt
from loguru import logger

from data_exporter import PROMPT_PATH, export_data, print_response

SHOULD_DELETE_ASSISTANT = False

START_MESSAGE = """"""


def main():
    logger.info(f"Starting {ENV_VARIABLES.assistant_name}")

    export_data()

    client = OpenAIClient(build_openai_client())
    service = AssistantService(client, get_prompt(prompt_path=PROMPT_PATH))

    if SHOULD_DELETE_ASSISTANT:
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

    if START_MESSAGE:
        start_response = chat.send_user_message(START_MESSAGE)
        print_response(start_response, service.assistant_name)

    while True:
        user_message = input("\nMessage: ")

        if not user_message:
            print("Invalid user message.")
            continue
        if user_message == "exit":
            break

        chat_response = chat.send_user_message(user_message)
        print_response(chat_response, service.assistant_name)


if __name__ == "__main__":
    try:
        set_env_variables()
        main()
    except Exception as e:
        logger.info(f"Error: {e}")
