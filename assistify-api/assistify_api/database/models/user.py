from pydantic import Field

from .base import Base


class User(Base):
    email: str
    image: str = Field(default="")
    name: str

    assistant_ids: list[str] = Field(default_factory=list)

    # tracking
    thread_ids: list[str] = Field(default_factory=list)
    token_count: int = 0
