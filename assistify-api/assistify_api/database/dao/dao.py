import uuid
from datetime import UTC, datetime
from typing import Generic, TypeVar

from pymongo.database import Database

from ..models.base import Base

T = TypeVar("T", bound="Base")


class Dao(Generic[T]):
    def __init__(self, db: Database, *, collection: str):
        self.collection = db[collection]

    def upsert(self, item: T) -> str:
        values = {
            **item.model_dump(by_alias=True),
            "updated": datetime.now(UTC),
            "_id": str(item.id if item.id else uuid.uuid4()),
        }
        query = {"_id": values["_id"]}
        result = self.collection.replace_one(query, values, upsert=True)
        return str(result.upserted_id or values["_id"])

    def find_all(self, *, model_class: T) -> list[T]:
        results = self.collection.find()
        return [model_class.model_validate(result) for result in results]

    def find_one(self, item_id: str, *, model_class: T) -> T:
        query = {"_id": item_id}
        result = self.collection.find_one(query)
        if result is None:
            return None

        return model_class.model_validate(result)

    def delete_one(self, item_id: str) -> int:
        query = {"_id": item_id}
        return self.collection.delete_one(query).deleted_count
