from datetime import date
from typing import Optional
from pydantic import BaseModel, Field

class ConfigBase:
    from_attributes = True
    populate_by_name = True

class UniversityContactBase(BaseModel):
    university: str
    contact: str
    position: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    last_contact: Optional[date] = Field(None, alias="lastContact")
    status: Optional[str] = None
    interest: Optional[str] = None
    next_step: Optional[str] = Field(None, alias="nextStep")
    notes: Optional[str] = None
    drive_file_id: Optional[str] = Field(None, alias="driveFileId")
    calendar_event_id: Optional[str] = Field(None, alias="calendarEventId")

    class Config(ConfigBase):
        pass

class UniversityContactCreate(UniversityContactBase):
    pass

class UniversityContactUpdate(BaseModel):
    university: Optional[str] = None
    contact: Optional[str] = None
    position: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    last_contact: Optional[date] = Field(None, alias="lastContact")
    status: Optional[str] = None
    interest: Optional[str] = None
    next_step: Optional[str] = Field(None, alias="nextStep")
    notes: Optional[str] = None
    drive_file_id: Optional[str] = Field(None, alias="driveFileId")
    calendar_event_id: Optional[str] = Field(None, alias="calendarEventId")

    class Config(ConfigBase):
        pass

class UniversityContactInDB(UniversityContactBase):
    id: int

    class Config(ConfigBase):
        pass

class UniversityContactResponse(UniversityContactInDB):
    pass
