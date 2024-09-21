from uuid import UUID

from pydantic import Field

from .base import Base


class Thread(Base):
    assistant_id: str
    id: UUID = Field(None, alias="_id")
    thread_id: str
    token_count: int = 0
    user_id: str
