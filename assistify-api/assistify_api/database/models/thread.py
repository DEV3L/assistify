from typing import Literal

from pydantic import Field

from .base import Base
from .message import Message


class Thread(Base):
    user_id: str

    assistant_id: str
    assistant_name: str
    model: str
    provider: Literal["OpenAI"] = Field(default="OpenAI", alias="provider")
    provider_thread_id: str
    summary: str = Field(default="")

    messages: list[Message] = Field(default_factory=list)

    # tracking
    token_count: int = 0
