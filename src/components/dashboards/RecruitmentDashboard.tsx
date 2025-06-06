import React, { useState } from 'react';
import { UserPlus, Phone, Mail, MapPin, Calendar, Filter, Plus, Search, X, Save, Edit, Trash2, Eye, Users, TrendingUp, Target, Clock } from 'lucide-react';

const RecruitmentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showOutreachModal, setShowOutreachModal] = useState(false);
  const [showProspectingModal, setShowProspectingModal] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [universityContacts, setUniversityContacts] = useState([
    {
      id: 1,
      university: 'University of Michigan',
      contact: 'Dr. Sarah Johnson',
      position: 'Student Life Director',
      email: 's.johnson@umich.edu',
      phone: '(734) 555-0132',
      lastContact: '2024-01-08',
      status: 'Active',
      interest: 'High',
      nextStep: 'Campus visit scheduled',
      notes: 'Very interested in KHK expansion. Scheduled campus visit for Jan 15. Positive about engineering focus.',
      contactHistory: [
        { date: '2024-01-08', type: 'Email', outcome: 'Positive response' },
        { date: '2024-01-05', type: 'Phone', outcome: 'Initial contact made' }
      ]
    },
    {
      id: 2,
      university: 'Ohio State University',
      contact: 'Mark Rodriguez',
      position: 'Greek Life Coordinator',
      email: 'rodriguez.45@osu.edu',
      phone: '(614) 555-0187',
      lastContact: '2024-01-05',
      status: 'Follow-up',
      interest: 'Medium',
      nextStep: 'Send information packet',
      notes: 'Requested detailed information about KHK programs and requirements. Interested in engineering focus.',
      contactHistory: [
        { date: '2024-01-05', type: 'Email', outcome: 'Information requested' },
        { date: '2024-01-02', type: 'Phone', outcome: 'Left voicemail' }
      ]
    },
    {
      id: 3,
      university: 'Penn State University',
      contact: 'Lisa Chen',
      position: 'Dean of Students',
      email: 'lchen@psu.edu',
      phone: '(814) 555-0234',
      lastContact: '2024-01-03',
      status: 'Contacted',
      interest: 'High',
      nextStep: 'Schedule phone call',
      notes: 'Initial contact made. Positive response, wants to discuss further. Strong engineering program.',
      contactHistory: [
        { date: '2024-01-03', type: 'Email', outcome: 'Positive response' }
      ]
    },
    {
      id: 4,
      university: 'Georgia Tech',
      contact: 'Dr. Michael Thompson',
      position: 'Engineering Dean',
      email: 'm.thompson@gatech.edu',
      phone: '(404) 555-0298',
      lastContact: '2024-01-07',
      status: 'Active',
      interest: 'High',
      nextStep: 'Proposal presentation',
      notes: 'Excellent engineering program alignment. Interested in KHK values and traditions.',
      contactHistory: [
        { date: '2024-01-07', type: 'Meeting', outcome: 'Very positive meeting' },
        { date: '2024-01-04', type: 'Email', outcome: 'Meeting scheduled' }
      ]
    }
  ]);

  const [outreachStats, setOutreachStats] = useState([
    { metric: 'Universities Contacted', value: 47, target: 50, change: '+3 this week', trend: 'up' },
    { metric: 'Positive Responses', value: 23, target: 30, change: '+2 this week', trend: 'up' },
    { metric: 'Campus Visits Scheduled', value: 8, target: 12, change: '+1 this week', trend: 'up' },
    { metric: 'Follow-ups Pending', value: 15, target: 10, change: '-2 this week', trend: 'down' }
  ]);

  const [prospectingPipeline, setProspectingPipeline] = useState([
    { stage: 'Research Phase', count: 12, universities: ['Auburn University', 'Florida State', 'Georgia Tech', 'Clemson University'] },
    { stage: 'Initial Contact', count: 8, universities: ['USC', 'UCLA', 'Arizona State', 'Colorado State'] },
    { stage: 'Follow-up', count: 15, universities: ['Texas A&M', 'UT Austin', 'Rice University', 'Baylor University'] },
    { stage: 'Meeting Scheduled', count: 6, universities: ['Vanderbilt', 'Duke', 'Wake Forest', 'Virginia Tech'] },
    { stage: 'Proposal Sent', count: 4, universities: ['Northwestern', 'Wisconsin', 'Minnesota', 'Iowa State'] }
  ]);

  const [outreachTemplates, setOutreachTemplates] = useState([
    {
      id: 1,
      name: 'Initial Contact Email',
      category: 'Email',
      description: 'Professional introduction and interest inquiry for university partnerships',
      lastUsed: '2024-01-08',
      usage: 23,
      effectiveness: 78
    },
    {
      id: 2,
      name: 'Follow-up Email',
      category: 'Email',
      description: 'Professional follow-up after initial contact with additional information',
      lastUsed: '2024-01-07',
      usage: 18,
      effectiveness: 82
    },
    {
      id: 3,
      name: 'Meeting Request',
      category: 'Email',
      description: 'Campus visit or video call scheduling with agenda outline',
      lastUsed: '2024-01-06',
      usage: 12,
      effectiveness: 85
    },
    {
      id: 4,
      name: 'Thank You Note',
      category: 'Email',
      description: 'Post-meeting appreciation and next steps confirmation',
      lastUsed: '2024-01-05',
      usage: 15,
      effectiveness: 90
    },
    {
      id: 5,
      name: 'Information Packet',
      category: 'Document',
      description: 'Comprehensive KHK information package for universities',
      lastUsed: '2024-01-08',
      usage: 8,
      effectiveness: 88
    }
  ]);

  const upcomingTasks = [
    { id: 1, task: 'Follow up with University of Michigan', due: '2024-01-10', priority: 'High', type: 'Phone Call', contact: 'Dr. Sarah Johnson' },
    { id: 2, task: 'Send proposal to Ohio State', due: '2024-01-12', priority: 'Medium', type: 'Email', contact: 'Mark Rodriguez' },
    { id: 3, task: 'Campus visit at Penn State', due: '2024-01-15', priority: 'High', type: 'In-Person', contact: 'Lisa Chen' },
    { id: 4, task: 'Research new prospects in Texas', due: '2024-01-18', priority: 'Low', type: 'Research', contact: 'N/A' },
    { id: 5, task: 'Presentation at Georgia Tech', due: '2024-01-20', priority: 'High', type: 'Presentation', contact: 'Dr. Michael Thompson' }
  ];

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleAddContact = (contactData: any) => {
    const newContact = {
      ...contactData,
      id: Date.now(),
      lastContact: new Date().toISOString().split('T')[0],
      contactHistory: []
    };
    setUniversityContacts(prev => [newContact, ...prev]);
    setShowAddContactModal(false);
    addNotification('Contact added successfully');
  };

  const handleUpdateContact = (contactData: any) => {
    setUniversityContacts(prev => prev.map(contact => 
      contact.id === editingContact.id ? { ...contact, ...contactData } : contact
    ));
    setEditingContact(null);
    setShowContactModal(false);
    addNotification('Contact updated successfully');
  };

  const handleDeleteContact = (contactId: number) => {
    setUniversityContacts(prev => prev.filter(contact => contact.id !== contactId));
    addNotification('Contact deleted');
  };

  const handleUseTemplate = (templateId: number) => {
    setOutreachTemplates(prev => prev.map(template => 
      template.id === templateId ? { 
        ...template, 
        usage: template.usage + 1,
        lastUsed: new Date().toISOString().split('T')[0]
      } : template
    ));
    addNotification('Template opened for editing');
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

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAddContact(formData);
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
                placeholder="Enter university name..."
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
                  placeholder="Contact person name..."
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
                  placeholder="Job title/position..."
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
                  placeholder="email@university.edu"
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
                  placeholder="(xxx) xxx-xxxx"
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
                placeholder="e.g., Schedule phone call, Send information packet"
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
                Add Contact
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
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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

            {editingContact.contactHistory && editingContact.contactHistory.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Contact History</h3>
                <div className="space-y-2">
                  {editingContact.contactHistory.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900">{entry.type}</span>
                        <span className="text-gray-600 ml-2">• {entry.date}</span>
                      </div>
                      <span className="text-sm text-gray-600">{entry.outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Email sent successfully')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </button>
              <button
                onClick={() => addNotification('Call initiated')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </button>
              <button
                onClick={() => addNotification('Contact updated')}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Outreach Campaign Modal
  const OutreachCampaignModal = () => {
    const [campaignData, setCampaignData] = useState({
      name: '',
      targetUniversities: '',
      template: '',
      startDate: '',
      endDate: '',
      goals: ''
    });

    const handleCreateCampaign = () => {
      addNotification('Outreach campaign created successfully');
      setShowOutreachModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create Outreach Campaign</h2>
            <button
              onClick={() => setShowOutreachModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
              <input
                type="text"
                value={campaignData.name}
                onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter campaign name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Universities</label>
              <textarea
                value={campaignData.targetUniversities}
                onChange={(e) => setCampaignData(prev => ({ ...prev, targetUniversities: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="List target universities or criteria..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Template</label>
              <select
                value={campaignData.template}
                onChange={(e) => setCampaignData(prev => ({ ...prev, template: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select template...</option>
                {outreachTemplates.filter(t => t.category === 'Email').map(template => (
                  <option key={template.id} value={template.name}>{template.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={campaignData.startDate}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={campaignData.endDate}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Goals</label>
              <textarea
                value={campaignData.goals}
                onChange={(e) => setCampaignData(prev => ({ ...prev, goals: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Define specific goals and success metrics..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowOutreachModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Prospecting Guide Modal
  const ProspectingGuideModal = () => {
    const prospectingCriteria = [
      { criterion: 'Engineering Program Strength', weight: 'High', description: 'Top-tier engineering programs with strong alumni networks' },
      { criterion: 'Greek Life Presence', weight: 'Medium', description: 'Active Greek life community with university support' },
      { criterion: 'Student Body Size', weight: 'Medium', description: 'Minimum 15,000 students for sustainable membership' },
      { criterion: 'Geographic Diversity', weight: 'Low', description: 'Strategic geographic expansion opportunities' },
      { criterion: 'University Reputation', weight: 'High', description: 'Academically respected institutions with strong values alignment' }
    ];

    const prospectingSteps = [
      { step: 1, title: 'Initial Research', description: 'Research university demographics, programs, and Greek life policies' },
      { step: 2, title: 'Contact Identification', description: 'Identify key contacts in student life, Greek affairs, and engineering' },
      { step: 3, title: 'Initial Outreach', description: 'Send professional introduction email using approved templates' },
      { step: 4, title: 'Follow-up Strategy', description: 'Systematic follow-up based on response and interest level' },
      { step: 5, title: 'Relationship Building', description: 'Schedule meetings, campus visits, and presentations' },
      { step: 6, title: 'Proposal Development', description: 'Create customized expansion proposal for university' }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Campus Prospecting Methodology Guide</h2>
            <button
              onClick={() => setShowProspectingModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selection Criteria</h3>
                <div className="space-y-4">
                  {prospectingCriteria.map((criteria, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{criteria.criterion}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          criteria.weight === 'High' ? 'bg-red-100 text-red-800' :
                          criteria.weight === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {criteria.weight} Priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{criteria.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prospecting Process</h3>
                <div className="space-y-4">
                  {prospectingSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-700">{step.step}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Communication</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Personalize all outreach communications</li>
                    <li>• Follow up within 48 hours of meetings</li>
                    <li>• Maintain professional tone and branding</li>
                    <li>• Document all interactions in CRM</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Timing</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Contact during academic year (Sept-May)</li>
                    <li>• Avoid finals and break periods</li>
                    <li>• Schedule meetings 2-3 weeks in advance</li>
                    <li>• Follow up weekly for active prospects</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Prospecting guide exported')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Guide
              </button>
              <button
                onClick={() => addNotification('Guide updated successfully')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update Guide
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
        <p className="text-green-100">University contact management and expansion outreach coordination.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {outreachStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">{stat.metric}</p>
              <div className="flex items-center">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
                )}
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className="text-sm text-gray-500">/ {stat.target}</span>
            </div>
            <p className={`text-xs font-medium mt-1 ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowAddContactModal(true)}
            className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Contact
          </button>
          <button
            onClick={() => setShowOutreachModal(true)}
            className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" />
            Create Campaign
          </button>
          <button
            onClick={() => setShowProspectingModal(true)}
            className="flex items-center justify-center p-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Target className="h-5 w-5 mr-2" />
            Prospecting Guide
          </button>
          <button
            onClick={() => addNotification('Analytics report generated')}
            className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            View Analytics
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'contacts', name: 'University Contacts', icon: Phone },
              { id: 'pipeline', name: 'Prospecting Pipeline', icon: MapPin },
              { id: 'templates', name: 'Outreach Templates', icon: Mail }
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
                  onClick={() => addNotification('New prospect added to pipeline')}
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
                      {stage.universities.slice(0, 3).map((uni, uniIndex) => (
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
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Outreach Templates</h3>
                <button
                  onClick={() => addNotification('Template editor opened')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {outreachTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>Used {template.usage} times</span>
                      <span>Last used: {template.lastUsed}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Effectiveness:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${template.effectiveness}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{template.effectiveness}%</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUseTemplate(template.id)}
                        className="flex-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm"
                      >
                        Use Template
                      </button>
                      <button
                        onClick={() => addNotification('Template editor opened')}
                        className="flex-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
                  <span>Contact: {task.contact}</span>
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
      {showOutreachModal && <OutreachCampaignModal />}
      {showProspectingModal && <ProspectingGuideModal />}
    </div>
  );
};

export default RecruitmentDashboard;