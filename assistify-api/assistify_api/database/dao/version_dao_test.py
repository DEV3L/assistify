from pymongo.database import Database

from assistify_api.database.dao.version_dao import VersionDao
from assistify_api.database.models.version import Version

default_version = "v001_data_init"
default_version_dict = {"version": default_version}


def test_version_dao_inserts_record(mongo_db: Database):
    """
    Test that a version record is inserted into the database.
    """
    version_model = _build_version_model()
    version_dao = VersionDao(mongo_db)

    version_id = version_dao.upsert(version_model)

    # cleanup
    assert version_dao.delete_one(version_model.version)

    assert version_id


def test_version_does_not_find_record(mongo_db: Database):
    """
    Test that a non-existent version record is not found in the database.
    """
    version_dao = VersionDao(mongo_db)
    result = version_dao.find_one(default_version)

    assert result is None


def test_version_does_find_record(mongo_db: Database):
    """
    Test that an existing version record is found in the database.
    """
    version = _build_version_model()
    version_dao = VersionDao(mongo_db)

    expected_version_id = version_dao.upsert(version)

    result_version = version_dao.find_one(default_version)

    # cleanup
    assert version_dao.delete_one(default_version)

    assert expected_version_id == str(result_version.id)


def test_version_dao_delete_no_record(mongo_db: Database):
    """
    Test that deleting a non-existent version record returns a count of 0.
    """
    version_dao = VersionDao(mongo_db)
    deleted_count = version_dao.delete_one(default_version)
    assert deleted_count == 0


def test_version_dao_deletes_record(mongo_db: Database):
    """
    Test that an existing version record is deleted from the database.
    """
    version = _build_version_model()
    version_dao = VersionDao(mongo_db)
    version_dao.upsert(version)

    deleted_count = version_dao.delete_one(default_version)

    assert deleted_count == 1


def _build_version_model() -> Version:
    """
    Helper function to build a Version model instance.
    """
    version_model = Version(**default_version_dict)
    return version_model
