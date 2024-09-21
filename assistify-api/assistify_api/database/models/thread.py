from typing import Optional
from uuid import UUID

from pydantic import Field

from .base import Base


class Thread(Base):
    id: UUID = Field(None, alias="_id")
    user_id: str
    thread_id: str
    assistant_id: str
    token_count: Optional[int] = None
