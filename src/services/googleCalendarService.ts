interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus: 'needsAction' | 'declined' | 'tentative' | 'accepted';
  }>;
  location?: string;
  conferenceData?: {
    createRequest?: {
      requestId: string;
      conferenceSolutionKey: {
        type: 'hangoutsMeet';
      };
    };
  };
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: 'email' | 'popup';
      minutes: number;
    }>;
  };
}

interface Calendar {
  id: string;
  summary: string;
  description?: string;
  primary?: boolean;
  accessRole: string;
}

class GoogleCalendarService {
  private baseUrl: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
  private isInitialized = false;
  private accessToken: string | null = null;
  private authToken: string | null = null;

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private buildHeaders(extra: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = { ...extra };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  async initialize(): Promise<boolean> {
    try {
      // In a real implementation, this would handle Google OAuth
      this.isInitialized = true;
      this.accessToken = 'demo_calendar_token';
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Calendar:', error);
      return false;
    }
  }

  async getCalendars(): Promise<Calendar[]> {
    const res = await fetch(`${this.baseUrl}/calendar/calendars`, {
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch calendars');
    }
    return res.json();
  }

  async getEvents(
    calendarId = 'primary',
    _timeMin?: string,
    _timeMax?: string,
  ): Promise<CalendarEvent[]> {
    void _timeMin;
    void _timeMax;
    const url = new URL(`${this.baseUrl}/calendar/events`);
    url.searchParams.set('calendar_id', calendarId);
    const res = await fetch(url.toString(), {
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }
    return res.json();
  }

  async createEvent(calendarId: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const url = new URL(`${this.baseUrl}/calendar/events`);
    url.searchParams.set('calendar_id', calendarId);
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: this.buildHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      throw new Error('Failed to create event');
    }
    return res.json();
  }

  async updateEvent(
    calendarId: string,
    eventId: string,
    updates: Partial<CalendarEvent>,
  ): Promise<CalendarEvent> {
    const url = new URL(`${this.baseUrl}/calendar/events/${eventId}`);
    url.searchParams.set('calendar_id', calendarId);
    const res = await fetch(url.toString(), {
      method: 'PUT',
      headers: this.buildHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      throw new Error('Failed to update event');
    }
    return res.json();
  }

  async deleteEvent(calendarId: string, eventId: string): Promise<boolean> {
    const url = new URL(`${this.baseUrl}/calendar/events/${eventId}`);
    url.searchParams.set('calendar_id', calendarId);
    const res = await fetch(url.toString(), {
      method: 'DELETE',
      headers: this.buildHeaders(),
    });
    return res.ok;
  }

  async createMeetingLink(eventId: string): Promise<string> {
    const res = await fetch(
      `${this.baseUrl}/calendar/events/${eventId}/meeting-link`,
      {
        method: 'POST',
        headers: this.buildHeaders(),
      },
    );
    if (!res.ok) {
      throw new Error('Failed to create meeting link');
    }
    const data: { link: string } = await res.json();
    return data.link;
  }

  formatEventDateTime(dateTime: string, timeZone: string): string {
    return new Date(dateTime).toLocaleString('en-US', {
      timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  isConnected(): boolean {
    return this.isInitialized && this.accessToken !== null;
  }
}

export const googleCalendarService = new GoogleCalendarService();
export type { CalendarEvent, Calendar };

