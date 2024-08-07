import random

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.app.cors.custom_coors_middleware import CustomCORSMiddleware

from .auth.verify_token import verify_token

api = FastAPI()

api.add_middleware(CustomCORSMiddleware)
api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api.get("/")
def read_root():
    return {"message": "Hello Assistify"}


@api.get("/random-number")
def read_random_number():
    number = random.randint(1, 100)
    return {"message": f"Your random number is {number}"}


@api.get("/protected")
def protected_route(user_info: dict = Depends(verify_token)):
    return {"message": f"Hello {user_info['name']}, your email is {user_info['email']}"}
