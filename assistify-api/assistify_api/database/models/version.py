from typing import Literal
from uuid import UUID

from pydantic import Field

from .base import Base


class Version(Base):
    id: UUID = Field(None, alias="_id")
    version: str
    status: Literal["Pending", "Completed", "Failed"] = Field(default="Pending", alias="status")
