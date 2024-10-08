from pydantic import BaseModel


class SendMessageRequest(BaseModel):
    message: str
    thread_id: str


class SendMessageResponse(BaseModel):
    response: str
    thread_id: str
