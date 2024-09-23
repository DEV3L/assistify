from datetime import UTC, datetime

from bson import ObjectId
from pydantic import BaseModel


class Model(BaseModel):
    created: datetime = datetime.now(UTC)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
