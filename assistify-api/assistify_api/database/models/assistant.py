from typing import Literal
from uuid import UUID

from bson import ObjectId
from pydantic import BaseModel, Field


class Assistant(BaseModel):
    id: UUID = Field(None, alias="_id")
    name: str
    assistant_id: str  # ID from OpenAI or other service
    model: str  # e.g., gpt-4o
    status: Literal["Public", "Market", "Private"] = Field(default="Private", alias="status")
    image: str = Field(default="")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
