from fastapi import Depends
from pymongo.database import Database

from .dao import Dao
from ..mongodb import MongoDb


class UsersDao(Dao):
    def __init__(self, db: Database = Depends(MongoDb.instance)):
        super().__init__(db, collection="users")
