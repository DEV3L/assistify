from pymongo.database import Database

from .dao import Dao


class AssistantsDao(Dao):
    def __init__(self, db: Database):
        super().__init__(db, collection="assistants")
