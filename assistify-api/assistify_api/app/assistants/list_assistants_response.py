from typing import Literal

from pydantic import BaseModel


class AssistantResponse(BaseModel):
    assistant_id: str
    image: str
    model: str
    name: str
    status: Literal["Public", "Market", "Private"]


class ListAssistantsResponse(BaseModel):
    assistants: list[AssistantResponse]
