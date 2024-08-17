from ai_trello_extract.clients.trello_client import get_trello_client
from ai_trello_extract.env_variables import ENV_VARIABLES, set_env_variables
from ai_trello_extract.orchestrators.orchestration_service import OrchestrationService
from ai_trello_extract.services.trello_service import TrelloService
from loguru import logger


def main():
    orchestration_service = OrchestrationService(
        TrelloService(get_trello_client(ENV_VARIABLES.trello_api_key, ENV_VARIABLES.trello_api_token))
    )

    try:
        markdown_directory_name = orchestration_service.write_board_markdown_to_directory(
            ENV_VARIABLES.trello_board_name, "./data"
        )
        logger.info(f"Markdown directory written to {markdown_directory_name}")
    except RuntimeError as e:
        logger.error(e)


if __name__ == "__main__":
    set_env_variables()
    main()
