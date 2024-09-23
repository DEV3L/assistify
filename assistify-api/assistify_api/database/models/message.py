from typing import Literal

from pydantic import Field

from .model import Model


class Message(Model):
    thread_id: str

    message: str
    role: Literal["user", "assistant"]
    status: Literal["Pending", "Complete", "Error"] = Field(default="Pending", alias="status")
    token_count: int
