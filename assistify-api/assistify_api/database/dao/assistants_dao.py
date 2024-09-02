import uuid
from datetime import UTC, datetime

from pymongo.database import Database

from assistify_api.database.models.assistant import Assistant


class AssistantsDao:
    """
    Data Access Object for the Assistant model.
    Handles interactions with the assistant collection in the database.
    """

    def __init__(self, db: Database):
        """
        Initialize the AssistantDao with a database connection.

        Args:
            db (Database): The database connection.
        """
        self.assistant_collection = db["assistants"]

    def upsert(self, assistant: Assistant) -> str:
        """
        Insert or update a assistant document in the database.

        Args:
            assistant (Assistant): The assistant model to upsert.

        Returns:
            str: The ID of the upserted document.
        """
        values = {
            **assistant.model_dump(by_alias=True),
            "updated": datetime.now(UTC),
            "_id": str(assistant.id if assistant.id else uuid.uuid4()),
        }
        query = {"_id": values["_id"]}
        result = self.assistant_collection.replace_one(query, values, upsert=True)
        return str(result.upserted_id or values["_id"])

    def find_all(self) -> list[Assistant]:
        """
        Find all assistant documents in the database.

        Returns:
            list[Assistant]: A list of all assistant models.
        """
        results = self.assistant_collection.find()
        return [Assistant.model_validate(result) for result in results]

    def find_one(self, name: str) -> Assistant:
        """
        Find a assistant document by its assistant string.

        Args:
            name (str): The assistant to search for.

        Returns:
            Assistant: The found assistant model or None if not found.
        """
        query = {"name": name}
        result = self.assistant_collection.find_one(query)
        if result is None:
            return None

        return Assistant.model_validate(result)

    def delete_one(self, name: str) -> int:
        """
        Delete a assistant document by its name.

        Args:
            name (str): The assistant name to delete.

        Returns:
            int: The number of documents deleted.
        """
        query = {"name": name}
        return self.assistant_collection.delete_one(query).deleted_count
