import pytest
from httpx import AsyncClient

from . import api


@pytest.mark.asyncio
async def test_read_root():
    async with AsyncClient(app=api, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
