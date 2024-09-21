from functools import wraps
from typing import Any, Callable, Literal

from loguru import logger

from .dao.version_dao import VersionDao
from .models.version import Version
from .mongodb import MongoDb


def update_version_status(version_dao: VersionDao, version: Version, status: Literal["Completed", "Failed"]) -> None:
    version_model = version_dao.find_one(str(version.id), model_class=Version)
    if not version_model:
        version_model = Version(version=version.version)
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
            versions: list[Version] = version_dao.find_all(model_class=Version)
            version_model = next(
                (version_model for version_model in versions if version_model.version == version), None
            )
            if version_model and version_model.status == "Completed":
                logger.info(f"Skipping migration {version} as it has already been completed")
                return

            if not version_model:
                version_model = version_dao.find_one(version_dao.upsert(Version(version=version)), model_class=Version)

            try:
                result = func(db, version_dao, *args, **kwargs)
                update_version_status(version_dao, version_model, "Completed")
                return result
            except Exception as e:
                update_version_status(version_dao, version_model, "Failed")
                raise e

        return wrapper

    return decorator
