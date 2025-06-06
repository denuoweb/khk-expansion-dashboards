import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Video, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { googleCalendarService, CalendarEvent } from '../../services/googleCalendarService';
import { useAppContext } from '../../contexts/AppContext';

interface GoogleCalendarIntegrationProps {
  calendarId?: string;
  showCreateButton?: boolean;
  maxEvents?: number;
  title?: string;
  compact?: boolean;
}

const GoogleCalendarIntegration: React.FC<GoogleCalendarIntegrationProps> = ({
  calendarId = 'primary',
  showCreateButton = true,
  maxEvents = 10,
  title = 'Upcoming Events',
  compact = false
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { addNotification } = useAppContext();

  useEffect(() => {
    loadEvents();
  }, [calendarId]);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      if (!googleCalendarService.isConnected()) {
        await googleCalendarService.initialize();
      }
      
      const timeMin = new Date().toISOString();
      const timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
      
      const calendarEvents = await googleCalendarService.getEvents(calendarId, timeMin, timeMax);
      setEvents(calendarEvents.slice(0, maxEvents));
    } catch (error) {
      console.error('Failed to load events:', error);
      addNotification({
        title: 'Error Loading Events',
        message: 'Failed to load events from Google Calendar',
        type: 'error',
        priority: 'medium',
        category: 'system'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (eventData: Partial<CalendarEvent>) => {
    try {
      await googleCalendarService.createEvent(calendarId, eventData);
      addNotification({
        title: 'Event Created',
        message: 'Event has been added to your calendar',
        type: 'success',
        priority: 'medium',
        category: 'system'
      });
      await loadEvents();
      setShowCreateModal(false);
    } catch (error) {
      addNotification({
        title: 'Failed to Create Event',
        message: 'Could not create the calendar event',
        type: 'error',
        priority: 'medium',
        category: 'system'
      });
    }
  };

  const getEventTypeColor = (summary: string) => {
    if (summary.toLowerCase().includes('meeting')) return 'bg-blue-100 text-blue-800';
    if (summary.toLowerCase().includes('visit')) return 'bg-green-100 text-green-800';
    if (summary.toLowerCase().includes('deadline') || summary.toLowerCase().includes('due')) return 'bg-red-100 text-red-800';
    if (summary.toLowerCase().includes('training')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatEventTime = (event: CalendarEvent) => {
    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);
    const isAllDay = start.getHours() === 0 && start.getMinutes() === 0 && 
                     end.getHours() === 23 && end.getMinutes() === 59;
    
    if (isAllDay) {
      return start.toLocaleDateString();
    }
    
    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    const dateFormat: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString()} ${start.toLocaleTimeString([], timeFormat)} - ${end.toLocaleTimeString([], timeFormat)}`;
    }
    
    return `${start.toLocaleDateString([], dateFormat)} - ${end.toLocaleDateString([], dateFormat)}`;
  };

  const CreateEventModal = () => {
    const [formData, setFormData] = useState({
      summary: '',
      description: '',
      start: '',
      end: '',
      location: '',
      attendees: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const eventData: Partial<CalendarEvent> = {
        summary: formData.summary,
        description: formData.description,
        start: {
          dateTime: formData.start,
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: formData.end,
          timeZone: 'America/New_York'
        },
        location: formData.location,
        attendees: formData.attendees.split(',').map(email => ({
          email: email.trim(),
          responseStatus: 'needsAction' as const
        })).filter(attendee => attendee.email)
      };

      handleCreateEvent(eventData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Create Calendar Event</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                <input
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => setFormData(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                <input
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => setFormData(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Meeting room, address, or online"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendees (comma-separated emails)</label>
              <input
                type="text"
                value={formData.attendees}
                onChange={(e) => setFormData(prev => ({ ...prev, attendees: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="email1@example.com, email2@example.com"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            {showCreateButton && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </button>
            )}
            <button
              onClick={loadEvents}
              disabled={isLoading}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm touch-manipulation"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900 truncate">{event.summary}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.summary)}`}>
                        {event.summary.toLowerCase().includes('meeting') ? 'Meeting' :
                         event.summary.toLowerCase().includes('visit') ? 'Visit' :
                         event.summary.toLowerCase().includes('deadline') ? 'Deadline' :
                         'Event'}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{formatEventTime(event)}</span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      )}
                      
                      {event.conferenceData && (
                        <div className="flex items-center space-x-2">
                          <Video className="h-3 w-3" />
                          <span className="text-blue-600">Google Meet</span>
                        </div>
                      )}
                    </div>
                    
                    {event.description && !compact && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{event.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-3">
                    <button
                      onClick={() => window.open(`https://calendar.google.com/calendar/event?eid=${event.id}`, '_blank')}
                      className="p-1 text-gray-400 hover:text-blue-600 rounded touch-manipulation"
                      title="Open in Google Calendar"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showCreateModal && <CreateEventModal />}
    </div>
  );
};

export default GoogleCalendarIntegration;