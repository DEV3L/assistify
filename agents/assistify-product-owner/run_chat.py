from ai_assistant_manager.assistants.assistant_service import (
    RETRIEVAL_TOOLS,
    AssistantService,
)
from ai_assistant_manager.chats.chat import Chat, RequiresActionException
from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from ai_assistant_manager.env_variables import ENV_VARIABLES, set_env_variables
from ai_assistant_manager.prompts.prompt import get_prompt
from ai_assistant_manager.tools.tools import get_tools
from ai_trello_extract.clients.trello_client import get_trello_client
from ai_trello_extract.env_variables import ENV_VARIABLES as TRELLO_ENV_VARIABLES
from ai_trello_extract.env_variables import set_env_variables as set_trello_env_variables
from ai_trello_extract.orchestrators.orchestration_service import OrchestrationService
from ai_trello_extract.services.trello_service import TrelloService
from loguru import logger

from data_exporter import PROMPT_PATH, TOOLS_PATH, export_data, print_response

SHOULD_DELETE_ASSISTANT = False

START_MESSAGE = """"""

def main():
    logger.info(f"Starting {ENV_VARIABLES.assistant_name}")

    orchestration_service = OrchestrationService(
        TrelloService(get_trello_client(TRELLO_ENV_VARIABLES.trello_api_key, TRELLO_ENV_VARIABLES.trello_api_token))
    )

    export_data()

    tools_from_file = get_tools(tools_path=TOOLS_PATH)
    tools_from_file.extend(RETRIEVAL_TOOLS)

    client = OpenAIClient(build_openai_client())
    service = AssistantService(client, get_prompt(prompt_path=PROMPT_PATH), tools=tools_from_file)

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

        try:
            chat_response = chat.send_user_message(user_message)
        except RequiresActionException as e:
            logger.info(f"\n{service.assistant_name}:\nTOOL_CALL: {e.data}")
            orchestration_service.add_card_to_board(
                TRELLO_ENV_VARIABLES.trello_board_name,
                e.data.arguments["title"],
                e.data.arguments["description"],
                e.data.arguments["labels"],
            )
            chat_response = chat.submit_tool_outputs(
                e.data.run_id, e.data.tool_call_id, "It was added to the backlog with id 123"
            )

        print_response(chat_response, service.assistant_name)


if __name__ == "__main__":
    try:
        set_env_variables()
        set_trello_env_variables()
        main()
    except Exception as e:
        logger.info(f"Error: {e}")
