from contextlib import asynccontextmanager

from fastapi import FastAPI
from loguru import logger

from assistify_api.database.handle_migrations import run_migrations
from assistify_api.env_variables import ENV_VARIABLES, set_env_variables


@asynccontextmanager
async def lifespan(_: FastAPI):
    """
    Lifespan event handler to run initialization and cleanup tasks.
    """
    logger.info("Starting up the API...")

    set_env_variables(ENV_VARIABLES.env_file_path)
    run_migrations("assistify_api/database/migrations")

    yield

    logger.info("Shutting down the API...")
