from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .db import AsyncSessionLocal
from .routers import tasks, auth, users

app = FastAPI(title="KHK Expansion API")

async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)

@app.get("/health")
async def health():
    return {"status": "ok"}
