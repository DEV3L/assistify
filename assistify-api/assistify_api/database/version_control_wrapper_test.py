from unittest.mock import MagicMock

import pytest

from assistify_api.database.dao.version_dao import VersionDao
from assistify_api.database.models.version import Version
from assistify_api.database.mongodb import MongoDb
from assistify_api.database.version_control_wrapper import update_version_status, version_control


def test_update_version_status_creates_new_version():
    """
    Test that update_version_status creates a new version entry when none exists.
    """
    version_dao = MagicMock(spec=VersionDao)
    version_dao.find_one.return_value = None

    update_version_status(version_dao, "1.0.0", "Completed")

    version_dao.upsert.assert_called_once()
    assert version_dao.upsert.call_args[0][0].version == "1.0.0"
    assert version_dao.upsert.call_args[0][0].status == "Completed"


def test_update_version_status_updates_existing_version():
    """
    Test that update_version_status updates the status of an existing version entry.
    """
    version = Version(version="1.0.0", status="Pending")
    version_dao = MagicMock(spec=VersionDao)
    version_dao.find_one.return_value = version

    update_version_status(version_dao, "1.0.0", "Completed")

    version_dao.upsert.assert_called_once()
    assert version_dao.upsert.call_args[0][0].status == "Completed"


def test_version_control_decorator_skips_completed_migration():
    """
    Test that the version_control decorator skips the migration if the version is already completed.
    """
    version_dao = MagicMock(spec=VersionDao)
    version_dao.find_one.return_value = Version(version="1.0.0", status="Completed")
    db = MagicMock(spec=MongoDb)

    @version_control("1.0.0")
    def mock_migration(*_):
        return "Migration Executed"

    result = mock_migration(db, version_dao)

    assert result is None
    version_dao.upsert.assert_not_called()


def test_version_control_decorator_executes_and_updates_status():
    """
    Test that the version_control decorator executes the migration and updates the status to completed.
    """
    version_dao = MagicMock(spec=VersionDao)
    version_dao.find_one.return_value = None
    db = MagicMock(spec=MongoDb)

    @version_control("1.0.0")
    def mock_migration(*_):
        return "Migration Executed"

    result = mock_migration(db, version_dao)

    assert result == "Migration Executed"
    assert version_dao.upsert.call_count == 2
    assert version_dao.upsert.call_args_list[1][0][0].status == "Completed"


def test_version_control_decorator_handles_exception_and_updates_status():
    """
    Test that the version_control decorator handles exceptions during migration and updates the status to failed.
    """
    version_dao = MagicMock(spec=VersionDao)
    version_dao.find_one.return_value = None
    db = MagicMock(spec=MongoDb)

    @version_control("1.0.0")
    def mock_migration(*_):
        raise Exception("Migration Failed")

    with pytest.raises(Exception, match="Migration Failed"):
        mock_migration(db, version_dao)

    assert version_dao.upsert.call_count == 2
    assert version_dao.upsert.call_args_list[1][0][0].status == "Failed"
