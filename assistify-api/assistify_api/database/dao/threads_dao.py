import pymongo
from fastapi import Depends
from pymongo.database import Database

from ..models.thread import Thread
from ..mongodb import MongoDb
from .dao import Dao


class ThreadsDao(Dao):
    def __init__(self, db: Database = Depends(MongoDb.instance)):
        super().__init__(db, collection="threads")

    def get_last_thread(self, user_id: str) -> Thread | None:
        threads = [thread for thread in self.collection.find({"user_id": user_id}).sort("created", pymongo.DESCENDING)]
        return Thread.model_validate({**threads[0], "id": str(threads[0]["_id"])}, strict=False) if threads else None
