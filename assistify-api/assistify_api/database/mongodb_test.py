from unittest.mock import patch

from assistify_api.database.mongodb import MongoDb
from assistify_api.env_variables import ENV_VARIABLES


@patch("assistify_api.database.mongodb.logger")
@patch("assistify_api.database.mongodb.pymongo")
def test_mongodb_instance_only_ever_called_once(mock_pymongo: patch, mock_logger: patch) -> None:
    """
    Test that MongoDb.instance() only creates a MongoClient once and reuses it thereafter.

    Args:
        mock_pymongo (patch): Mocked pymongo module.
        mock_logger (patch): Mocked logger module.
    """
    MongoDb.db = None  # Reset the MongoDb instance

    result_db = MongoDb.instance()  # First call to instance, should create MongoClient
    MongoDb.instance()  # Second call to instance, should reuse the existing MongoClient

    # Ensure MongoClient is called with the correct URI
    mock_pymongo.MongoClient.assert_called_with(ENV_VARIABLES.mongodb_uri)
    # Ensure MongoClient is only called once
    assert 1 == mock_pymongo.MongoClient.call_count
    # Ensure the returned database is correct
    assert mock_pymongo.MongoClient.return_value[ENV_VARIABLES.mongodb_db] == result_db
    # Ensure logger.info was called
    assert mock_logger.info.called
