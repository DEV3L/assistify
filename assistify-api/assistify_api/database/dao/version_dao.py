import uuid
from datetime import UTC, datetime

from pymongo.database import Database

from assistify_api.database.models.version import Version


class VersionDao:
    def __init__(self, db: Database):
        self.version_collection = db["version"]

    def upsert(self, version: Version) -> str:
        values = {
            **version.model_dump(by_alias=True),
            "updated": datetime.now(UTC),
            "_id": str(version.id if version.id else uuid.uuid4()),
        }
        query = {"_id": values["_id"]}
        result = self.version_collection.replace_one(query, values, upsert=True)
        return str(result.upserted_id or values["_id"])

    def find_one(self, version: str) -> Version:
        query = {"version": version}
        result = self.version_collection.find_one(query)
        if result is None:
            return None

        version_model = Version.model_validate(result)
        return version_model

    def delete_one(self, version: str) -> int:
        query = {"version": version}
        return self.version_collection.delete_one(query).deleted_count
