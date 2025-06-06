from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func

from ..db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    permissions = Column(JSON, default=list)
    avatar = Column(String, nullable=True)
    last_login = Column(DateTime(timezone=True), server_default=func.now())
