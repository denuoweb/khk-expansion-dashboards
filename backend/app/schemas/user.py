"""Pydantic models representing user data."""

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field


class ConfigBase:
    from_attributes = True
    populate_by_name = True


class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str
    permissions: List[str] = []
    avatar: Optional[str] = None

    class Config(ConfigBase):
        pass


class UserCreate(UserBase):
    password: str


class UserInDB(UserBase):
    id: int
    hashed_password: str
    last_login: Optional[datetime] = Field(default=None, alias="lastLogin")

    class Config(ConfigBase):
        pass


class UserResponse(UserBase):
    id: int
    last_login: Optional[datetime] = Field(default=None, alias="lastLogin")

    class Config(ConfigBase):
        pass
