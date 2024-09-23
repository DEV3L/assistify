from pymongo.database import Database

from ..dao.version_dao import VersionDao
from ..models.version import Version


def test_dao_inserts_record(mongo_db: Database):
    dao = VersionDao(mongo_db)

    item_id = dao.upsert(Version(version="v001_data_init"))

    # cleanup
    assert dao.delete_one(item_id)

    assert item_id
