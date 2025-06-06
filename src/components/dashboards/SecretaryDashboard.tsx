import React, { useState } from 'react';
import { FileText, Calendar, Archive, Download, Plus, Search, X, Save, Trash2, Eye } from 'lucide-react';
import GoogleDriveIntegration from '../shared/GoogleDriveIntegration';
import GoogleCalendarIntegration from '../shared/GoogleCalendarIntegration';

const SecretaryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('minutes');
  const [showMinutesModal, setShowMinutesModal] = useState(false);
  const [showCreateMinutesModal, setShowCreateMinutesModal] = useState(false);
  const [editingMinutes, setEditingMinutes] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [meetingMinutes, setMeetingMinutes] = useState([
    {
      id: 1,
      date: '2024-01-08',
      type: 'Executive Committee',
      attendees: 7,
      duration: '90 min',
      status: 'Approved',
      actionItems: 5,
      agenda: 'KPI Review, Risk Assessment, Budget Planning',
      notes: 'Discussed Q1 expansion targets and resource allocation.',
      secretary: 'Current Secretary',
      driveFileId: 'minutes_exec_20240108'
    },
    {
      id: 2,
      date: '2024-01-05',
      type: 'Full Officer Meeting',
      attendees: 8,
      duration: '120 min',
      status: 'Draft',
      actionItems: 8,
      agenda: 'University Outreach, Marketing Strategy, Colony Updates',
      notes: 'Comprehensive review of all expansion activities.',
      secretary: 'Current Secretary',
      driveFileId: 'minutes_full_20240105'
    },
    {
      id: 3,
      date: '2024-01-03',
      type: 'NEC Report Planning',
      attendees: 4,
      duration: '60 min',
      status: 'Approved',
      actionItems: 3,
      agenda: 'Quarterly Report Preparation, Data Collection',
      notes: 'Prepared materials for NEC quarterly submission.',
      secretary: 'Current Secretary',
      driveFileId: 'minutes_nec_20240103'
    }
  ]);

  const upcomingTasks = [
    { id: 1, task: 'Prepare NEC Quarterly Minutes', due: '2024-01-15', priority: 'High' },
    { id: 2, task: 'Update Officer Handbook', due: '2024-01-20', priority: 'Medium' },
    { id: 3, task: 'Archive Q4 2023 Documents', due: '2024-01-12', priority: 'Medium' },
    { id: 4, task: 'Template Review & Updates', due: '2024-01-25', priority: 'Low' }
  ];

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleCreateMinutes = (minutesData: any) => {
    const newMinutes = {
      ...minutesData,
      id: Date.now(),
      secretary: 'Current Secretary',
      driveFileId: `minutes_${Date.now()}`
    };
    setMeetingMinutes(prev => [newMinutes, ...prev]);
    setShowCreateMinutesModal(false);
    addNotification('Meeting minutes created and saved to Google Drive');
  };

  const handleUpdateMinutes = (minutesData: any) => {
    setMeetingMinutes(prev => prev.map(minutes => 
      minutes.id === editingMinutes.id ? { ...minutes, ...minutesData } : minutes
    ));
    setEditingMinutes(null);
    setShowMinutesModal(false);
    addNotification('Meeting minutes updated in Google Drive');
  };

  const handleDeleteMinutes = (minutesId: number) => {
    setMeetingMinutes(prev => prev.filter(minutes => minutes.id !== minutesId));
    addNotification('Meeting minutes deleted');
  };

  const filteredMinutes = meetingMinutes.filter(minutes =>
    minutes.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    minutes.agenda.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create Minutes Modal
  const CreateMinutesModal = () => {
    const [formData, setFormData] = useState({
      date: '',
      type: '',
      attendees: '',
      duration: '',
      status: 'Draft',
      agenda: '',
      notes: '',
      actionItems: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateMinutes({
        ...formData,
        attendees: parseInt(formData.attendees),
        actionItems: parseInt(formData.actionItems)
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create Meeting Minutes</h2>
            <button
              onClick={() => setShowCreateMinutesModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Executive Committee"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                <input
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => setFormData(prev => ({ ...prev, attendees: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 90 min"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agenda</label>
              <textarea
                value={formData.agenda}
                onChange={(e) => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Items Count</label>
              <input
                type="number"
                value={formData.actionItems}
                onChange={(e) => setFormData(prev => ({ ...prev, actionItems: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateMinutesModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create & Save to Drive
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Minutes Details Modal
  const MinutesDetailsModal = () => {
    if (!editingMinutes) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Meeting Minutes Details</h2>
            <button
              onClick={() => {
                setEditingMinutes(null);
                setShowMinutesModal(false);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Meeting Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Type:</span> {editingMinutes.type}</div>
                  <div><span className="font-medium">Date:</span> {editingMinutes.date}</div>
                  <div><span className="font-medium">Duration:</span> {editingMinutes.duration}</div>
                  <div><span className="font-medium">Attendees:</span> {editingMinutes.attendees}</div>
                  <div><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      editingMinutes.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {editingMinutes.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Action Items</h3>
                <div className="text-2xl font-bold text-purple-600">{editingMinutes.actionItems}</div>
                <p className="text-sm text-gray-600">Items requiring follow-up</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Agenda</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{editingMinutes.agenda}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Meeting Notes</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{editingMinutes.notes}</p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Minutes downloaded from Google Drive')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download from Drive
              </button>
              <button
                onClick={() => addNotification('Minutes approved and synced')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Approve & Sync
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`px-4 py-3 rounded-lg shadow-lg ${
                notification.type === 'success' ? 'bg-green-100 text-green-800' :
                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Secretary Dashboard</h2>
        <p className="text-purple-100">Meeting minutes, data archives, and documentation management with Google Drive integration.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Minutes</p>
              <p className="text-2xl font-bold text-gray-900">{meetingMinutes.length}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drive Files</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <Archive className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Calendar Events</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Actions</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingTasks.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'minutes', name: 'Meeting Minutes', icon: FileText },
              { id: 'documents', name: 'Google Drive', icon: Archive },
              { id: 'calendar', name: 'Calendar Events', icon: Calendar }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'minutes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Meeting Minutes</h3>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search minutes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowCreateMinutesModal(true)}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Minutes
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredMinutes.map((meeting) => (
                  <div key={meeting.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{meeting.type}</h4>
                        <p className="text-sm text-gray-600">{meeting.date} • {meeting.duration}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          meeting.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {meeting.status}
                        </span>
                        <button
                          onClick={() => {
                            setEditingMinutes(meeting);
                            setShowMinutesModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => addNotification('Opening in Google Drive')}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMinutes(meeting.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>Attendees: {meeting.attendees}</div>
                      <div>Action Items: {meeting.actionItems}</div>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{meeting.agenda}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <GoogleDriveIntegration
                folderId="secretary_documents"
                title="Secretary Documents & Archives"
                allowUpload={true}
                allowDelete={true}
                fileTypes={['document', 'spreadsheet', 'pdf']}
              />
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <GoogleCalendarIntegration
                calendarId="meetings"
                title="Meeting Schedule & Events"
                showCreateButton={true}
                maxEvents={15}
              />
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{task.task}</h4>
                <p className="text-sm text-gray-600">Due: {task.due}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                task.priority === 'High' ? 'bg-red-100 text-red-800' :
                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showCreateMinutesModal && <CreateMinutesModal />}
      {showMinutesModal && <MinutesDetailsModal />}
    </div>
  );
};

export default SecretaryDashboard;