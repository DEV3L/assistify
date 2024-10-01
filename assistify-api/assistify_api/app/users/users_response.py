from typing import Literal

from pydantic import BaseModel

from assistify_api.database.models.base import Base


class UserMessage(Base):
    message: str
    role: Literal["user", "assistant"]
    status: Literal["Pending", "Complete", "Error"]
    token_count: int


class UserThread(Base):
    id: str
    assistant_name: str
    model: str
    provider_thread_id: str
    provider: Literal["OpenAI"]
    summary: str

    messages: list[UserMessage]

    token_count: int


class UserAssistant(Base):
    id: str
    image: str
    model: str
    name: str
    provider: Literal["OpenAI"]
    status: Literal["Public", "Market", "Private"]
    summary_full: str
    summary_short: str

    token_count: int


class UserResponse(Base):
    id: str
    email: str
    image: str
    name: str

    assistants: list[UserAssistant]
    threads: list[UserThread]

    token_count: int = 0


class UsersResponse(BaseModel):
    users: list[UserResponse]
