import pymongo
from loguru import logger
from pymongo.database import Database

from assistify_api.env_variables import ENV_VARIABLES


class MongoDb:
    db = None

    @classmethod
    def instance(cls, *, force: bool = False, mongodb_uri: str = None) -> Database:
        if force or not cls.db:
            logger.info("Connecting to MongoDb")
            mongodb_uri = mongodb_uri or ENV_VARIABLES.mongodb_uri
            mongodb_db = ENV_VARIABLES.mongodb_db
            client = pymongo.MongoClient(mongodb_uri)
            cls.db = client[mongodb_db]

        return cls.db
