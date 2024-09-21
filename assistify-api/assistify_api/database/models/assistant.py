from datetime import UTC, datetime
from typing import Literal
from uuid import UUID

from pydantic import Field

from .base import Base


class Assistant(Base):
    assistant_id: str  # ID from OpenAI or other service
    created: datetime = datetime.now(UTC)
    id: UUID = Field(None, alias="_id")
    image: str = Field(default="")
    is_available: bool = True
    model: str  # e.g., gpt-4o
    name: str
    provider: Literal["OpenAI"] = Field(default="OpenAI", alias="provider")
    status: Literal["Public", "Market", "Private"] = Field(default="Private", alias="status")
