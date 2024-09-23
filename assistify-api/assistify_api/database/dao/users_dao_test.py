from pymongo.database import Database

from ..models.user import User
from .users_dao import UsersDao


def test_dao_inserts_record(mongo_db: Database):
    dao = UsersDao(mongo_db)

    item_id = dao.upsert(User(email="test@test.com", name="test"))

    # cleanup
    assert dao.delete_one(item_id)

    assert item_id
