import enum
from sqlalchemy import Column, Integer, String, Date
from ..db import Base

class InterestLevel(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class Status(str, enum.Enum):
    CONTACTED = "Contacted"
    FOLLOW_UP = "Follow-up"
    ACTIVE = "Active"
    INACTIVE = "Inactive"

class UniversityContact(Base):
    __tablename__ = "university_contacts"

    id = Column(Integer, primary_key=True, index=True)
    university = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    position = Column(String)
    email = Column(String)
    phone = Column(String)
    last_contact = Column(Date)
    status = Column(String)
    interest = Column(String)
    next_step = Column(String)
    notes = Column(String)
    drive_file_id = Column(String)
    calendar_event_id = Column(String)
