import uuid
from datetime import UTC, datetime

from pymongo.database import Database

from assistify_api.database.models.version import Version


class VersionDao:
    """
    Data Access Object for the Version model.
    Handles interactions with the version collection in the database.
    """

    def __init__(self, db: Database):
        """
        Initialize the VersionDao with a database connection.

        Args:
            db (Database): The database connection.
        """
        self.version_collection = db["version"]

    def upsert(self, version: Version) -> str:
        """
        Insert or update a version document in the database.

        Args:
            version (Version): The version model to upsert.

        Returns:
            str: The ID of the upserted document.
        """
        values = {
            **version.model_dump(by_alias=True),
            "updated": datetime.now(UTC),
            "_id": str(version.id if version.id else uuid.uuid4()),
        }
        query = {"_id": values["_id"]}
        result = self.version_collection.replace_one(query, values, upsert=True)
        return str(result.upserted_id or values["_id"])

    def find_one(self, version: str) -> Version:
        """
        Find a version document by its version string.

        Args:
            version (str): The version string to search for.

        Returns:
            Version: The found version model or None if not found.
        """
        query = {"version": version}
        result = self.version_collection.find_one(query)
        if result is None:
            return None

        version_model = Version.model_validate(result)
        return version_model

    def delete_one(self, version: str) -> int:
        """
        Delete a version document by its version string.

        Args:
            version (str): The version string to delete.

        Returns:
            int: The number of documents deleted.
        """
        query = {"version": version}
        return self.version_collection.delete_one(query).deleted_count
