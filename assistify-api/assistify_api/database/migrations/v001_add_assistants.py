import os

from loguru import logger

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.database.mongodb import MongoDb
from assistify_api.database.version_control_wrapper import version_control

version = os.path.splitext(os.path.basename(__file__))[0]


@version_control(version)
def run(db: MongoDb, *_):
    logger.info(f"Running migration {version}")

    assistant = Assistant(
        assistant_id="asst_0sd6SgqvyDhwZW8wuwdoHFQb",
        image="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p0nj1y1c0frdi728486q.png",
        model="gpt-4o-mini",
        name="Assistify - Concierge",
        status="Public",
    )

    assistants_dao = AssistantsDao(db)
    assistants_dao.upsert(assistant)
