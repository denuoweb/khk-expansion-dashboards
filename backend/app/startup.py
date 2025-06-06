"""Database initialization utilities used on application startup."""

import os
from sqlalchemy.future import select

from .db import engine, Base, AsyncSessionLocal
from .models.user import User
from .routers.auth import get_password_hash


async def init_db_and_chair() -> None:
    """Create database tables and ensure a chair user exists."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    initial_password = os.getenv("CHAIR_PASSWORD")
    chair_email = os.getenv("CHAIR_EMAIL", "chair@khk.org")

    if not initial_password:
        print("CHAIR_PASSWORD not set; skipping chair initialization")
        return

    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.role == "chair"))
        chair = result.scalars().first()

        if chair:
            if not chair.hashed_password:
                chair.hashed_password = get_password_hash(initial_password)
                await session.commit()
                print("Chair password initialized")
        else:
            chair = User(
                name="Chair",
                email=chair_email,
                hashed_password=get_password_hash(initial_password),
                role="chair",
            )
            session.add(chair)
            await session.commit()
            print("Chair user created with password")
