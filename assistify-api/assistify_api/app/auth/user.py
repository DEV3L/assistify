from pydantic import BaseModel


class User(BaseModel):
    email: str
    name_family: str
    name_given: str
    name: str
    picture: str
