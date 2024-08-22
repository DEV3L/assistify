import os
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass
class EnvVariables:
    """
    Data class to store environment variables.
    """

    google_client_id: str
    mongodb_db: str
    mongodb_uri: str


def set_env_variables(env_file_path: str | None = None):
    """
    Load environment variables from a .env file and set them in the global ENV_VARIABLES instance.

    Args:
        env_file_path (str | None): Path to the .env file. If None, defaults to the .env file in the current directory.
    """
    global ENV_VARIABLES

    if env_file_path and not os.path.isfile(env_file_path):
        raise FileNotFoundError(f"The specified .env file does not exist: {env_file_path}")

    # Load environment variables from the specified .env file, overriding existing variables
    load_dotenv(env_file_path, override=True)

    # Set the environment variables in the global ENV_VARIABLES instance
    ENV_VARIABLES.google_client_id = os.getenv("GOOGLE_CLIENT_ID", "${GOOGLE_CLIENT_ID}")
    ENV_VARIABLES.mongodb_db = os.getenv("MONGODB_DB", "${MONGODB_DB}")
    ENV_VARIABLES.mongodb_uri = os.getenv("MONGODB_URI", "${MONGODB_URI}")


# Initialize the global ENV_VARIABLES instance with default values or values from the environment
ENV_VARIABLES = EnvVariables(
    google_client_id=os.getenv("GOOGLE_CLIENT_ID", "${GOOGLE_CLIENT_ID}"),
    mongodb_db=os.getenv("MONGODB_DB", "${MONGODB_DB}"),
    mongodb_uri=os.getenv("MONGODB_URI", "${MONGODB_URI}"),
)
