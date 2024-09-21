from pymongo.database import Database

from ..dao.version_dao import VersionDao
from ..models.version import Version


def test_version_dao_inserts_record(mongo_db: Database):
    version_dao = VersionDao(mongo_db)

    version_id = version_dao.upsert(Version(version="v001_data_init"))

    # cleanup
    assert version_dao.delete_one(version_id)

    assert version_id
