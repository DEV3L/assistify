import pytest
from fastapi import FastAPI
from starlette.testclient import TestClient

from .custom_cors_middleware import CustomCORSMiddleware

app = FastAPI()


@app.get("/")
async def read_main():
    return {"msg": "Hello World"}


# Add the custom middleware to the app
app.add_middleware(CustomCORSMiddleware)

client = TestClient(app)


@pytest.mark.parametrize(
    "origin",
    [
        "https://assistify.example.vercel.app",
        "https://assistify-ui.vercel.app",
        "https://assistify-ui-ci.vercel.app",
        "https://assistify-api.fly.dev",
        "https://assistify-api-ci.fly.dev",
        "http://localhost:3000",
    ],
    ids=["assistify_example", "assistify_ui", "assistify_ui_ci", "assistify_api", "assistify_api_ci", "localhost:3000"],
)
def test_cors_allowed_origin(origin: str):
    response = client.get("/", headers={"origin": origin})
    assert response.status_code == 200
    assert response.headers["Access-Control-Allow-Origin"] == origin
    assert response.headers["Access-Control-Allow-Credentials"] == "true"
    assert response.headers["Access-Control-Allow-Methods"] == "*"
    assert response.headers["Access-Control-Allow-Headers"] == "*"


def test_cors_disallowed_origin():
    response = client.get("/", headers={"origin": "https://notallowed.example.com"})
    assert response.status_code == 200
    assert "Access-Control-Allow-Origin" not in response.headers
    assert "Access-Control-Allow-Credentials" not in response.headers
    assert "Access-Control-Allow-Methods" not in response.headers
    assert "Access-Control-Allow-Headers" not in response.headers


def test_cors_preflight():
    response = client.options(
        "/protected",
        headers={
            "origin": "https://assistify-ui-ci.vercel.app",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "authorization",
        },
    )
    assert response.status_code == 200
    assert response.headers["Access-Control-Allow-Origin"] == "https://assistify-ui-ci.vercel.app"
    assert response.headers["Access-Control-Allow-Credentials"] == "true"
    assert response.headers["Access-Control-Allow-Methods"] == "GET, POST, OPTIONS"
    assert response.headers["Access-Control-Allow-Headers"] == "authorization, content-type"
