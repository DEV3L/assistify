from typing import Literal

from pydantic import Field

from .base import Base


class Version(Base):
    status: Literal["Pending", "Completed", "Failed"] = Field(default="Pending", alias="status")
    version: str
