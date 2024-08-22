import os

from loguru import logger

from assistify_api.database.dao.version_dao import VersionDao
from assistify_api.database.models.version import Version
from assistify_api.database.mongodb import MongoDb

version = os.path.splitext(os.path.basename(__file__))[0]


def run():
    mongo_db = MongoDb.instance()
    version_dao = VersionDao(mongo_db)

    if version_dao.find_one(version):
        logger.info(f"Skipping migration {version} as it has already been run")
        return

    logger.info(f"Running migration {version}")

    version_model = Version(version=version)
    version_dao.upsert(version_model)
