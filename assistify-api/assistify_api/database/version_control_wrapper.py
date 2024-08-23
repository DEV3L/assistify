from functools import wraps
from typing import Any, Callable, Literal

from loguru import logger

from assistify_api.database.dao.version_dao import VersionDao
from assistify_api.database.models.version import Version
from assistify_api.database.mongodb import MongoDb


def update_version_status(version_dao: VersionDao, version: str, status: Literal["Completed", "Failed"]) -> None:
    """Update the status of a version in the database."""
    version_model = version_dao.find_one(version)
    if not version_model:
        version_model = Version(version=version)
    version_model.status = status
    version_dao.upsert(version_model)


def version_control(version: str) -> Callable:
    """
    Decorator to control the versioning of database migrations.

    Args:
        version (str): The version of the migration.

    Returns:
        Callable: The wrapped function.
    """

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(db: MongoDb, version_dao: VersionDao, *args: Any, **kwargs: Any) -> Any:
            version_model = version_dao.find_one(version)

            if version_model and version_model.status == "Completed":
                logger.info(f"Skipping migration {version} as it has already been completed")
                return

            if not version_model:
                version_model = Version(version=version)
                version_dao.upsert(version_model)

            try:
                result = func(db, version_dao, *args, **kwargs)
                update_version_status(version_dao, version, "Completed")
                return result
            except Exception as e:
                update_version_status(version_dao, version, "Failed")
                raise e

        return wrapper

    return decorator
