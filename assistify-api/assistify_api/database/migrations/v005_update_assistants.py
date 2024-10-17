import os

from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from ai_assistant_manager.env_variables import set_env_variables
from loguru import logger

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.database.mongodb import MongoDb
from assistify_api.database.version_control_wrapper import version_control

version = os.path.splitext(os.path.basename(__file__))[0]


@version_control(version)
def run(db: MongoDb, *_):
    logger.info(f"Running migration {version}")

    set_env_variables()
    client = OpenAIClient(build_openai_client())
    openai_assistants = [assistant for assistant in client.assistants_list() if assistant.name]

    assistants_dao = AssistantsDao(db)
    db_assistants = assistants_dao.find_all(model_class=Assistant)

    assistants_to_be_updated = [
        (db_assistant, openai_assistant)
        for db_assistant in db_assistants
        for openai_assistant in openai_assistants
        if db_assistant.name == openai_assistant.name and db_assistant.assistant_id != openai_assistant.id
    ]

    for db_assistant, openai_assistant in assistants_to_be_updated:
        db_assistant.assistant_id = openai_assistant.id
        assistants_dao.upsert(db_assistant)

    logger.info(f"Migration {version} completed successfully")
