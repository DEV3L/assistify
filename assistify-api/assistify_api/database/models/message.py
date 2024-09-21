from typing import Literal

from pydantic import Field

from .base import Base


class Message(Base):
    thread_id: str

    message: str
    status: Literal["Pending", "Complete", "Error"] = Field(default="Pending", alias="status")
    token_count: int
