"""User registration and profile endpoints.

This router exposes a registration endpoint for new users and an endpoint to
retrieve the currently authenticated user using dependencies from the auth
router.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..db import AsyncSessionLocal
from ..models.user import User
from ..routers.auth import get_password_hash, get_current_user
from ..schemas.user import UserCreate, UserResponse

router = APIRouter(prefix="/users", tags=["users"])


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == user.email))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=get_password_hash(user.password),
        role=user.role,
        permissions=user.permissions,
        avatar=user.avatar,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


@router.get("/me", response_model=UserResponse)
async def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user
