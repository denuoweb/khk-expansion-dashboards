import asyncio
import os
from sqlalchemy.future import select

from .db import AsyncSessionLocal
from .models.user import User
from .routers.auth import get_password_hash

CHAIR_EMAIL = os.getenv("CHAIR_EMAIL", "chair@khk.org")
INITIAL_PASSWORD = os.getenv("CHAIR_PASSWORD")

async def main() -> None:
    if not INITIAL_PASSWORD:
        raise SystemExit("CHAIR_PASSWORD environment variable not set")

    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.role == "chair"))
        chair = result.scalars().first()

        if chair:
            if chair.hashed_password:
                print("Chair already has a password set")
                return
            chair.hashed_password = get_password_hash(INITIAL_PASSWORD)
            await session.commit()
            print("Chair password initialized")
        else:
            chair = User(
                name="Chair",
                email=CHAIR_EMAIL,
                hashed_password=get_password_hash(INITIAL_PASSWORD),
                role="chair",
            )
            session.add(chair)
            await session.commit()
            print("Chair user created with password")

if __name__ == "__main__":
    asyncio.run(main())
