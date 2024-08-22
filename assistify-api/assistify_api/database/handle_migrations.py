import importlib.util
import os
from typing import Callable

from assistify_api.env_variables import set_env_variables


def _load_migration(file_path: str, module_name: str) -> Callable:
    """Dynamically load a migration module and return its run function."""
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return getattr(module, "run")


def _get_migration_files(migrations_dir: str) -> list[(str, str)]:
    """Return a sorted list of migration file paths in the specified directory."""
    return sorted(
        (os.path.join(migrations_dir, filename), os.path.splitext(os.path.basename(filename))[0])
        for filename in os.listdir(migrations_dir)
        if filename.endswith(".py") and filename != "__init__.py"
    )


def _run_migration(file_information: (str, str)) -> None:
    """Load and execute a single migration script."""
    file_path, module_name = file_information
    _load_migration(file_path, module_name)()


def run_migrations(migrations_dir: str) -> None:
    """Load and execute all migration scripts in the specified directory."""
    migration_files = _get_migration_files(migrations_dir)
    list(map(_run_migration, migration_files))


if __name__ == "__main__":
    set_env_variables()
    run_migrations("assistify_api/database/migrations")
