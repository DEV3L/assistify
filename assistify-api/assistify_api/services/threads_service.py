from fastapi import Depends
from pymongo.database import Database

from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.models.thread import Thread
from assistify_api.database.mongodb import MongoDb


class ThreadsService:
    def __init__(self, mongo_db: Database = Depends(MongoDb.instance)):
        self.dao = ThreadsDao(mongo_db)

    def upsert(self, thread: Thread):
        return self.dao.upsert(thread)

    def list(self):
        return self.dao.find_all(model_class=Thread)
