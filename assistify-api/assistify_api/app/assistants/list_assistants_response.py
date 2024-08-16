from pydantic import BaseModel


class AssistantsResponse(BaseModel):
    id: str
    model: str
    name: str


class ListAssistantsResponse(BaseModel):
    assistants: list[AssistantsResponse]
