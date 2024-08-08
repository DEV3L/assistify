import re

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


# Custom CORS middleware to handle dynamic origins
class CustomCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        origin = request.headers.get("origin")
        if origin and re.match(r"https://assistify.*\.(vercel\.app|fly\.dev)|http://localhost:3000", origin):
            response = await call_next(request)
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "*"
            response.headers["Access-Control-Allow-Headers"] = "*"
            return response
        return await call_next(request)
