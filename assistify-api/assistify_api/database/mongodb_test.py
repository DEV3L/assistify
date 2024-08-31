from unittest.mock import MagicMock, patch

from assistify_api.env_variables import ENV_VARIABLES

from .mongodb import MongoDb


@patch("assistify_api.database.mongodb.logger")
@patch("assistify_api.database.mongodb.ServerApi")
@patch("assistify_api.database.mongodb.pymongo")
def test_mongodb_instance_only_ever_called_once(
    mock_pymongo: MagicMock, mocker_server_api: MagicMock, mock_logger: MagicMock
) -> None:
    MongoDb.db = None

    result_db = MongoDb.instance()  # First call to instance, should create MongoClient
    MongoDb.instance()  # Second call to instance, should reuse the existing MongoClient

    mock_pymongo.MongoClient.assert_called_with(ENV_VARIABLES.mongodb_uri, server_api=mocker_server_api.return_value)
    assert mock_pymongo.MongoClient.call_count == 1
    assert mock_pymongo.MongoClient.return_value[ENV_VARIABLES.mongodb_db] == result_db
    assert mock_logger.info.called
