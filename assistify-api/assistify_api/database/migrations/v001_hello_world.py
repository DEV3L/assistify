import os

from loguru import logger

from assistify_api.database.version_control_wrapper import version_control

version = os.path.splitext(os.path.basename(__file__))[0]


@version_control(version)
def run(*_):
    logger.info(f"Running migration {version}")
