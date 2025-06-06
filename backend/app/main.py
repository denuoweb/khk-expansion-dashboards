from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .db import AsyncSessionLocal

app = FastAPI()

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/health")
async def health():
    return {"status": "ok"}
