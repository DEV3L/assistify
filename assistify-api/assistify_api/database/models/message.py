from datetime import datetime
from typing import Literal, Optional
from uuid import UUID

from pydantic import Field

from .base import Base


class Message(Base):
    id: UUID = Field(None, alias="_id")
    user_id: str
    thread_id: str
    assistant_name: str
    assistant_id: str
    provider: Literal["OpenAI"] = Field(default="OpenAI", alias="provider")
    status: Literal["Pending", "Complete", "Error"] = Field(default="Pending", alias="status")
    model: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    token_count: Optional[int] = None
