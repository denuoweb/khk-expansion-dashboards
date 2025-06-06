from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .db import AsyncSessionLocal
from .routers import tasks, auth, users, contacts
from .startup import init_db_and_chair

app = FastAPI(title="KHK Expansion API")


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


@app.on_event("startup")
async def startup() -> None:
    """Initialize the database and chair account on application start."""
    await init_db_and_chair()


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(tasks.router)
app.include_router(contacts.router)


@app.get("/health")
async def health():
    return {"status": "ok"}
