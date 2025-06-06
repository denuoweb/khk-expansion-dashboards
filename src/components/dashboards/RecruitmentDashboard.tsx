import React, { useState, useEffect } from 'react';
import { UserPlus, Phone, Mail, MapPin, Calendar, Plus, Search, X, Trash2, Eye, Archive } from 'lucide-react';
import GoogleDriveIntegration from '../shared/GoogleDriveIntegration';
import GoogleCalendarIntegration from '../shared/GoogleCalendarIntegration';
import { UniversityContact } from '../../types/UniversityContact';
import { contactService } from '../../services/contactService';

const RecruitmentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [universityContacts, setUniversityContacts] = useState<UniversityContact[]>([]);

  useEffect(() => {
    contactService
      .list()
      .then(setUniversityContacts)
      .catch((err) => console.error('Failed to load contacts', err));
  }, []);

  const [outreachStats, setOutreachStats] = useState([
    { metric: 'Universities Contacted', value: 47, target: 50, change: '+3 this week' },
    { metric: 'Positive Responses', value: 23, target: 30, change: '+2 this week' },
    { metric: 'Campus Visits Scheduled', value: 8, target: 12, change: '+1 this week' },
    { metric: 'Follow-ups Pending', value: 15, target: 10, change: '-2 this week' }
  ]);

  const [prospectingPipeline, setProspectingPipeline] = useState([
    { stage: 'Research Phase', count: 12, universities: ['Auburn University', 'Florida State', 'Georgia Tech'] },
    { stage: 'Initial Contact', count: 8, universities: ['USC', 'UCLA', 'Arizona State'] },
    { stage: 'Follow-up', count: 15, universities: ['Texas A&M', 'UT Austin', 'Rice University'] },
    { stage: 'Meeting Scheduled', count: 6, universities: ['Vanderbilt', 'Duke', 'Wake Forest'] },
    { stage: 'Proposal Sent', count: 4, universities: ['Northwestern', 'Wisconsin', 'Minnesota'] }
  ]);

  const [outreachTemplates, setOutreachTemplates] = useState([
    {
      id: 1,
      name: 'Initial Contact Email',
      category: 'Email',
      description: 'Professional introduction and interest inquiry',
      lastUsed: '2024-01-08',
      usage: 23,
      driveFileId: 'template_initial_contact'
    },
    {
      id: 2,
      name: 'Follow-up Email',
      category: 'Email',
      description: 'Professional follow-up after initial contact',
      lastUsed: '2024-01-07',
      usage: 18,
      driveFileId: 'template_followup'
    },
    {
      id: 3,
      name: 'Meeting Request',
      category: 'Email',
      description: 'Campus visit or video call scheduling',
      lastUsed: '2024-01-06',
      usage: 12,
      driveFileId: 'template_meeting_request'
    },
    {
      id: 4,
      name: 'Thank You Note',
      category: 'Email',
      description: 'Post-meeting appreciation and next steps',
      lastUsed: '2024-01-05',
      usage: 15,
      driveFileId: 'template_thank_you'
    }
  ]);

  const upcomingTasks = [
    { id: 1, task: 'Follow up with University of Michigan', due: '2024-01-10', priority: 'High', type: 'Phone Call' },
    { id: 2, task: 'Send proposal to Ohio State', due: '2024-01-12', priority: 'Medium', type: 'Email' },
    { id: 3, task: 'Campus visit at Penn State', due: '2024-01-15', priority: 'High', type: 'In-Person' },
    { id: 4, task: 'Research new prospects in Texas', due: '2024-01-18', priority: 'Low', type: 'Research' }
  ];

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleAddContact = async (contactData: any) => {
    try {
      const created = await contactService.create(contactData);
      setUniversityContacts(prev => [created, ...prev]);
      setShowAddContactModal(false);
      addNotification('Contact added');
    } catch (error) {
      console.error('Failed to add contact', error);
      addNotification('Failed to add contact', 'warning');
    }
  };

  const handleUpdateContact = async (contactData: any) => {
    if (!editingContact) return;
    try {
      const updated = await contactService.update(editingContact.id, contactData);
      setUniversityContacts(prev => prev.map(contact =>
        contact.id === editingContact.id ? updated : contact
      ));
      setEditingContact(null);
      setShowContactModal(false);
      addNotification('Contact updated');
    } catch (error) {
      console.error('Failed to update contact', error);
      addNotification('Failed to update contact', 'warning');
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    try {
      await contactService.delete(contactId);
      setUniversityContacts(prev => prev.filter(contact => contact.id !== contactId));
      addNotification('Contact deleted');
    } catch (error) {
      console.error('Failed to delete contact', error);
      addNotification('Failed to delete contact', 'warning');
    }
  };

  const handleUseTemplate = (templateId: number) => {
    setOutreachTemplates(prev => prev.map(template => 
      template.id === templateId ? { 
        ...template, 
        usage: template.usage + 1,
        lastUsed: new Date().toISOString().split('T')[0]
      } : template
    ));
    addNotification('Template opened from Google Drive');
  };

  const handleScheduleMeeting = (contactId: number) => {
    addNotification('Meeting scheduled and added to Google Calendar');
  };

  const filteredContacts = universityContacts.filter(contact => {
    const matchesSearch = contact.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Add Contact Modal
  const AddContactModal = () => {
    const [formData, setFormData] = useState({
      university: '',
      contact: '',
      position: '',
      email: '',
      phone: '',
      status: 'Contacted',
      interest: 'Medium',
      nextStep: '',
      notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await handleAddContact(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add New Contact</h2>
            <button
              onClick={() => setShowAddContactModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">University Name</label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest Level</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Next Step</label>
              <input
                type="text"
                value={formData.nextStep}
                onChange={(e) => setFormData(prev => ({ ...prev, nextStep: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Schedule phone call"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Additional notes about this contact..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddContactModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add to Drive
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Contact Details Modal
  const ContactDetailsModal = () => {
    if (!editingContact) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Contact Details</h2>
            <button
              onClick={() => {
                setEditingContact(null);
                setShowContactModal(false);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">University:</span>
                    <p className="text-gray-900">{editingContact.university}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Contact:</span>
                    <p className="text-gray-900">{editingContact.contact}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Position:</span>
                    <p className="text-gray-900">{editingContact.position}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email:</span>
                    <p className="text-blue-600">{editingContact.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Phone:</span>
                    <p className="text-gray-900">{editingContact.phone}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Status & Progress</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      editingContact.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                      editingContact.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {editingContact.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Interest Level:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      editingContact.interest === 'High' ? 'bg-green-100 text-green-800' :
                      editingContact.interest === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {editingContact.interest}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Last Contact:</span>
                    <p className="text-gray-900">{editingContact.lastContact}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Next Step:</span>
                    <p className="text-blue-700 font-medium">{editingContact.nextStep}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{editingContact.notes}</p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Email sent successfully')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </button>
              <button
                onClick={() => handleScheduleMeeting(editingContact.id)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </button>
              <button
                onClick={() => addNotification('Contact file opened in Google Drive')}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Archive className="h-4 w-4 mr-2" />
                View in Drive
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Recruitment & Outreach Dashboard</h2>
        <p className="text-green-100">University contact management and expansion outreach coordination with Google Drive and Calendar integration.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {outreachStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">{stat.metric}</p>
              <UserPlus className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className="text-sm text-gray-500">/ {stat.target}</span>
            </div>
            <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'contacts', name: 'University Contacts', icon: Phone },
              { id: 'pipeline', name: 'Prospecting Pipeline', icon: MapPin },
              { id: 'templates', name: 'Outreach Templates', icon: Mail },
              { id: 'calendar', name: 'Visit Calendar', icon: Calendar }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
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
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">University Contact Log</h3>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <button
                    onClick={() => setShowAddContactModal(true)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{contact.university}</h4>
                        <p className="text-gray-600">{contact.contact} • {contact.position}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          contact.interest === 'High' ? 'bg-green-100 text-green-800' :
                          contact.interest === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {contact.interest} Interest
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          contact.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                          contact.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {contact.status}
                        </span>
                        <button
                          onClick={() => {
                            setEditingContact(contact);
                            setShowContactModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => addNotification('Contact file opened in Google Drive')}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {contact.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {contact.phone}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Last: {contact.lastContact}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-blue-700">Next: {contact.nextStep}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addNotification('Call initiated')}
                          className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm"
                        >
                          Call
                        </button>
                        <button
                          onClick={() => addNotification('Email opened')}
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                        >
                          Email
                        </button>
                        <button
                          onClick={() => handleScheduleMeeting(contact.id)}
                          className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-sm"
                        >
                          Schedule
                        </button>
                        <button
                          onClick={() => {
                            setEditingContact(contact);
                            setShowContactModal(true);
                          }}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Prospecting Pipeline</h3>
                <button
                  onClick={() => addNotification('New prospect added to pipeline and Drive')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prospect
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {prospectingPipeline.map((stage, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                      <div className="text-2xl font-bold text-green-600 mt-2">{stage.count}</div>
                    </div>
                    <div className="space-y-2">
                      {stage.universities.map((uni, uniIndex) => (
                        <div key={uniIndex} className="bg-white p-2 rounded text-sm hover:bg-green-50 cursor-pointer">
                          {uni}
                        </div>
                      ))}
                      {stage.count > 3 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{stage.count - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <GoogleDriveIntegration
                folderId="recruitment_templates"
                title="Outreach Templates & Documents"
                allowUpload={true}
                allowDelete={true}
                fileTypes={['document', 'presentation', 'pdf']}
              />
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <GoogleCalendarIntegration
                calendarId="recruitment"
                title="Campus Visits & Meetings"
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
            <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{task.task}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span>Due: {task.due}</span>
                  <span>Type: {task.type}</span>
                </div>
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
      {showAddContactModal && <AddContactModal />}
      {showContactModal && <ContactDetailsModal />}
    </div>
  );
};

export default RecruitmentDashboard;