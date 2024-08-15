from pydantic import BaseModel


class SendMessageRequest(BaseModel):
    message: str


class SendMessageResponse(BaseModel):
    response: str
