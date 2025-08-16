"""Endpoints providing a mock Google Calendar API."""

from datetime import datetime, timedelta
from typing import Dict, List
from uuid import uuid4

from fastapi import APIRouter, HTTPException

from ..schemas.google_calendar import (
    Calendar,
    CalendarEvent,
    EventCreate,
    EventUpdate,
    MeetingLinkResponse,
)

router = APIRouter(prefix="/calendar", tags=["calendar"])

# Demo calendars
calendars: List[Calendar] = [
    Calendar(
        id="primary",
        summary="KHK Expansion Calendar",
        description="Main calendar for expansion activities",
        primary=True,
        accessRole="owner",
    ),
    Calendar(
        id="meetings",
        summary="Officer Meetings",
        description="Executive and committee meetings",
        accessRole="writer",
    ),
    Calendar(
        id="deadlines",
        summary="Project Deadlines",
        description="Important deadlines and milestones",
        accessRole="writer",
    ),
]

# In-memory event storage keyed by calendar id
_events: Dict[str, List[CalendarEvent]] = {
    "primary": [],
    "meetings": [],
    "deadlines": [],
}


def _generate_event_id() -> str:
    """Create a unique identifier for events."""

    return f"event_{uuid4().hex}"


@router.get("/calendars", response_model=List[Calendar])
async def list_calendars() -> List[Calendar]:
    """Return available calendars."""

    return calendars


@router.get("/events", response_model=List[CalendarEvent])
async def list_events(calendar_id: str = "primary") -> List[CalendarEvent]:
    """List events for a calendar."""

    return _events.get(calendar_id, [])


@router.post("/events", response_model=CalendarEvent)
async def create_event(
    data: EventCreate, calendar_id: str = "primary"
) -> CalendarEvent:
    """Create a new calendar event."""

    event_id = _generate_event_id()
    now = datetime.utcnow()
    start = data.start or {
        "dateTime": now.isoformat(),
        "timeZone": "UTC",
    }
    end = data.end or {
        "dateTime": (now + timedelta(hours=1)).isoformat(),
        "timeZone": "UTC",
    }
    event = CalendarEvent(
        id=event_id,
        summary=data.summary or "New Event",
        description=data.description,
        start=start,
        end=end,
        attendees=data.attendees,
        location=data.location,
        conferenceData=data.conference_data,
        reminders=data.reminders,
    )
    _events.setdefault(calendar_id, []).append(event)
    return event


@router.put("/events/{event_id}", response_model=CalendarEvent)
async def update_event(
    event_id: str, data: EventUpdate, calendar_id: str = "primary"
) -> CalendarEvent:
    """Update an existing event."""

    events = _events.get(calendar_id, [])
    for idx, ev in enumerate(events):
        if ev.id == event_id:
            updated = ev.copy(update=data.dict(exclude_unset=True, by_alias=False))
            events[idx] = updated
            return updated
    raise HTTPException(status_code=404, detail="Event not found")


@router.delete("/events/{event_id}", status_code=204)
async def delete_event(event_id: str, calendar_id: str = "primary") -> None:
    """Delete an event from a calendar."""

    events = _events.get(calendar_id, [])
    for idx, ev in enumerate(events):
        if ev.id == event_id:
            del events[idx]
            return None
    raise HTTPException(status_code=404, detail="Event not found")


@router.post("/events/{event_id}/meeting-link", response_model=MeetingLinkResponse)
async def create_meeting_link(event_id: str) -> MeetingLinkResponse:
    """Generate a mock meeting link for an event."""

    link = f"https://meet.google.com/demo-meeting-{event_id}"
    return MeetingLinkResponse(link=link)
