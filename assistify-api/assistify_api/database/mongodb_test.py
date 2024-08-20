from unittest.mock import patch

from assistify_api.database.mongodb import MongoDb
from assistify_api.env_variables import ENV_VARIABLES


@patch("assistify_api.database.mongodb.logger")
@patch("assistify_api.database.mongodb.pymongo")
def test_mongodb_instance_only_ever_called_once(mock_pymongo, mock_logger):
    MongoDb.db = None

    result_db = MongoDb.instance()
    MongoDb.instance()

    mock_pymongo.MongoClient.assert_called_with(ENV_VARIABLES.mongodb_uri)
    assert 1 == mock_pymongo.MongoClient.call_count
    assert mock_pymongo.MongoClient.return_value[ENV_VARIABLES.mongodb_db] == result_db
    assert mock_logger.info.called
