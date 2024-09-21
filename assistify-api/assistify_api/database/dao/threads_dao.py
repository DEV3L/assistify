from fastapi import Depends
from pymongo.database import Database

from ..mongodb import MongoDb
from .dao import Dao


class ThreadsDao(Dao):
    def __init__(self, db: Database = Depends(MongoDb.instance)):
        super().__init__(db, collection="threads")
