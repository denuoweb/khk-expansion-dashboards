"""Pydantic models for Google Calendar operations."""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class ConfigBase:
    """Shared configuration for calendar schemas."""

    populate_by_name = True
    from_attributes = True


class Calendar(BaseModel):
    """Represents a calendar available to the user."""

    id: str
    summary: str
    description: Optional[str] = None
    primary: Optional[bool] = None
    access_role: str = Field(..., alias="accessRole")

    class Config(ConfigBase):
        pass


class CalendarEvent(BaseModel):
    """Represents an event in a Google Calendar."""

    id: str
    summary: str
    description: Optional[str] = None
    start: Dict[str, str]
    end: Dict[str, str]
    attendees: Optional[List[Dict[str, Any]]] = None
    location: Optional[str] = None
    conference_data: Optional[Dict[str, Any]] = Field(None, alias="conferenceData")
    reminders: Optional[Dict[str, Any]] = None

    class Config(ConfigBase):
        pass


class EventCreate(BaseModel):
    """Data required to create a calendar event."""

    summary: Optional[str] = None
    description: Optional[str] = None
    start: Optional[Dict[str, str]] = None
    end: Optional[Dict[str, str]] = None
    attendees: Optional[List[Dict[str, Any]]] = None
    location: Optional[str] = None
    conference_data: Optional[Dict[str, Any]] = Field(None, alias="conferenceData")
    reminders: Optional[Dict[str, Any]] = None

    class Config(ConfigBase):
        pass


class EventUpdate(EventCreate):
    """Data allowed when updating an event."""

    pass


class MeetingLinkResponse(BaseModel):
    """Response model for meeting link creation."""

    link: str
