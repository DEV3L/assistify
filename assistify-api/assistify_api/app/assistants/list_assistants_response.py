from typing import Literal

from pydantic import BaseModel

from assistify_api.database.models.base import Base


class AssistantResponse(Base):
    assistant_id: str
    image: str

    model: str
    name: str
    provider: Literal["OpenAI"]
    status: Literal["Public", "Market", "Private"]
    summary_full: str
    summary_short: str

    thread_ids: list[str]
    token_count: int


class ListAssistantsResponse(BaseModel):
    assistants: list[AssistantResponse]
