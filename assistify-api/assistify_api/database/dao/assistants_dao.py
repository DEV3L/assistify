from fastapi import Depends
from pymongo.database import Database

from assistify_api.database.mongodb import MongoDb

from .dao import Dao


class AssistantsDao(Dao):
    def __init__(self, db: Database = Depends(MongoDb.instance)):
        super().__init__(db, collection="assistants")
