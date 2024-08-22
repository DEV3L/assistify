import ssl

import pymongo
from loguru import logger
from pymongo.database import Database

from assistify_api.env_variables import ENV_VARIABLES


class MongoDb:
    db = None  # Holds the database instance to ensure a singleton pattern

    @classmethod
    def instance(cls, *, force: bool = False, mongodb_uri: str = None) -> Database:
        """
        Returns a singleton instance of the MongoDB database connection.

        Args:
            force (bool): If True, forces a new connection to be created.
            mongodb_uri (str): Optional MongoDB URI to use for the connection.

        Returns:
            Database: The MongoDB database instance.
        """
        if force or cls.db is None:
            logger.info("Connecting to MongoDb")
            # Use the provided URI or fallback to the environment variable
            mongodb_uri = mongodb_uri or ENV_VARIABLES.mongodb_uri
            # logger.info(f"MongoDB URI: {mongodb_uri}")

            client = pymongo.MongoClient(mongodb_uri)  # Create a new MongoClient
            # ssl=True,ssl_cert_reqs=ssl.CERT_NONE
            # ssl_cert_reqs='CERT_NONE'  # Use 'CERT_REQUIRED' in production with proper certificates

            cls.db = client[ENV_VARIABLES.mongodb_db]  # Get the database instance

        return cls.db  # Return the database instance
