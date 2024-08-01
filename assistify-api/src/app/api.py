import random

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://assistify-wine.vercel.app/"],
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
