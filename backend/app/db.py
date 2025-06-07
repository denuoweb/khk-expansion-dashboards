"""Database configuration for the FastAPI backend.

This module exposes the SQLAlchemy asynchronous engine, session maker,
and declarative base used by the application. The ``AsyncSessionLocal``
context manager yields database sessions and ``Base`` is used for model
declarations in ``backend/app/models``.
"""

import os
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not set")

# Ensure Neon connections use SSL using the `ssl` parameter
if "sslmode=require" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("sslmode=require", "ssl=require")

if "ssl=" not in DATABASE_URL:
    suffix = "&" if "?" in DATABASE_URL else "?"
    DATABASE_URL = f"{DATABASE_URL}{suffix}ssl=require"

engine: AsyncEngine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

Base = declarative_base()
