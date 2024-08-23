from typing import Literal
from uuid import UUID

from bson import ObjectId
from pydantic import BaseModel, Field


class Version(BaseModel):
    id: UUID = Field(None, alias="_id")
    version: str
    status: Literal["Pending", "Completed", "Failed"] = Field(default="Pending", alias="status")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
