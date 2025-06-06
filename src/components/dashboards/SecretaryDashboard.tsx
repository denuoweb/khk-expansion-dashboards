import React, { useState } from 'react';
import { FileText, Calendar, Archive, Download, Plus, Search, Filter, X, Save, Edit, Trash2, Eye, Upload, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const SecretaryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('minutes');
  const [showMinutesModal, setShowMinutesModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showCreateMinutesModal, setShowCreateMinutesModal] = useState(false);
  const [showNECReportModal, setShowNECReportModal] = useState(false);
  const [showHandbookModal, setShowHandbookModal] = useState(false);
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
      notes: 'Discussed Q1 expansion targets and resource allocation. Approved new university outreach strategy. Risk assessment for Ohio State completed.',
      secretary: 'Current Secretary',
      attendeeList: ['Chair', 'Vice-Chair', 'Secretary', 'Marketing Specialist', 'Recruitment Coordinator', 'Chapter Development', 'Compliance Officer']
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
      notes: 'Comprehensive review of all expansion activities. Marketing templates approved. Three new university contacts established.',
      secretary: 'Current Secretary',
      attendeeList: ['Chair', 'Vice-Chair', 'Secretary', 'Marketing Specialist', 'Recruitment Coordinator', 'Chapter Development', 'Compliance Officer', 'Data Analytics Manager']
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
      notes: 'Prepared materials for NEC quarterly submission. Data collection protocols established.',
      secretary: 'Current Secretary',
      attendeeList: ['Chair', 'Vice-Chair', 'Secretary', 'Data Analytics Manager']
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Meeting Minutes Template',
      category: 'Documentation',
      lastUpdated: '2024-01-01',
      downloads: 23,
      type: 'DOCX',
      description: 'Standard template for recording meeting minutes with agenda items and action tracking',
      size: '45 KB',
      version: '2.1'
    },
    {
      id: 2,
      name: 'Quarterly Report Template',
      category: 'Reporting',
      lastUpdated: '2023-12-28',
      downloads: 15,
      type: 'DOCX',
      description: 'Comprehensive template for NEC quarterly reports including KPI metrics',
      size: '78 KB',
      version: '1.8'
    },
    {
      id: 3,
      name: 'Action Item Tracker',
      category: 'Project Management',
      lastUpdated: '2024-01-05',
      downloads: 31,
      type: 'XLSX',
      description: 'Spreadsheet for tracking action items, deadlines, and completion status',
      size: '32 KB',
      version: '3.2'
    },
    {
      id: 4,
      name: 'Officer Contact List',
      category: 'Reference',
      lastUpdated: '2024-01-08',
      downloads: 8,
      type: 'PDF',
      description: 'Current officer contact information and emergency contacts',
      size: '156 KB',
      version: '1.5'
    },
    {
      id: 5,
      name: 'Onboarding Handbook',
      category: 'Training',
      lastUpdated: '2024-01-06',
      downloads: 12,
      type: 'PDF',
      description: 'Comprehensive guide for new officers including procedures and protocols',
      size: '2.1 MB',
      version: '4.0'
    }
  ]);

  const [dataArchives, setDataArchives] = useState([
    {
      id: 1,
      category: 'Meeting Records',
      items: 45,
      sizeGB: 2.3,
      lastBackup: '2024-01-08',
      status: 'Current',
      description: 'All meeting minutes, agendas, and related documents from 2023-2024',
      retention: '7 years'
    },
    {
      id: 2,
      category: 'Officer Reports',
      items: 128,
      sizeGB: 5.7,
      lastBackup: '2024-01-08',
      status: 'Current',
      description: 'Monthly and quarterly officer reports, KPI data, and progress tracking',
      retention: '5 years'
    },
    {
      id: 3,
      category: 'University Correspondence',
      items: 89,
      sizeGB: 3.2,
      lastBackup: '2024-01-07',
      status: 'Current',
      description: 'Email correspondence, meeting notes, and contact records with universities',
      retention: '3 years'
    },
    {
      id: 4,
      category: 'Templates & Guidelines',
      items: 32,
      sizeGB: 1.1,
      lastBackup: '2024-01-08',
      status: 'Current',
      description: 'Document templates, procedural guidelines, and training materials',
      retention: 'Permanent'
    },
    {
      id: 5,
      category: 'Financial Records',
      items: 67,
      sizeGB: 1.8,
      lastBackup: '2024-01-08',
      status: 'Current',
      description: 'Budget documents, expense reports, and financial correspondence',
      retention: '7 years'
    }
  ]);

  const upcomingTasks = [
    { id: 1, task: 'Prepare NEC Quarterly Minutes', due: '2024-01-15', priority: 'High', status: 'In Progress' },
    { id: 2, task: 'Update Officer Handbook', due: '2024-01-20', priority: 'Medium', status: 'Not Started' },
    { id: 3, task: 'Archive Q4 2023 Documents', due: '2024-01-12', priority: 'Medium', status: 'In Progress' },
    { id: 4, task: 'Template Review & Updates', due: '2024-01-25', priority: 'Low', status: 'Not Started' },
    { id: 5, task: 'Backup Verification', due: '2024-01-18', priority: 'High', status: 'Not Started' }
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
      attendeeList: minutesData.attendeeList || []
    };
    setMeetingMinutes(prev => [newMinutes, ...prev]);
    setShowCreateMinutesModal(false);
    addNotification('Meeting minutes created successfully');
  };

  const handleUpdateMinutes = (minutesData: any) => {
    setMeetingMinutes(prev => prev.map(minutes => 
      minutes.id === editingMinutes.id ? { ...minutes, ...minutesData } : minutes
    ));
    setEditingMinutes(null);
    setShowMinutesModal(false);
    addNotification('Meeting minutes updated successfully');
  };

  const handleDeleteMinutes = (minutesId: number) => {
    setMeetingMinutes(prev => prev.filter(minutes => minutes.id !== minutesId));
    addNotification('Meeting minutes deleted');
  };

  const handleDownloadTemplate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTemplates(prev => prev.map(t => 
        t.id === templateId ? { ...t, downloads: t.downloads + 1 } : t
      ));
      addNotification(`Downloaded ${template.name}`);
    }
  };

  const handleCreateBackup = (archiveId: number) => {
    setDataArchives(prev => prev.map(archive => 
      archive.id === archiveId ? { ...archive, lastBackup: new Date().toISOString().split('T')[0] } : archive
    ));
    addNotification('Backup created successfully');
  };

  const handleUpdateTaskStatus = (taskId: number, newStatus: string) => {
    setUpcomingTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    addNotification(`Task status updated to ${newStatus}`);
  };

  const filteredMinutes = meetingMinutes.filter(minutes =>
    minutes.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    minutes.agenda.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
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
      actionItems: '',
      attendeeList: [] as string[]
    });

    const officerPositions = [
      'Chair', 'Vice-Chair', 'Secretary', 'Marketing Specialist', 
      'Recruitment Coordinator', 'Chapter Development', 'Compliance Officer', 'Data Analytics Manager'
    ];

    const handleAttendeeToggle = (position: string) => {
      setFormData(prev => ({
        ...prev,
        attendeeList: prev.attendeeList.includes(position)
          ? prev.attendeeList.filter(p => p !== position)
          : [...prev.attendeeList, position]
      }));
    };

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
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Executive Committee">Executive Committee</option>
                  <option value="Full Officer Meeting">Full Officer Meeting</option>
                  <option value="NEC Report Planning">NEC Report Planning</option>
                  <option value="Emergency Meeting">Emergency Meeting</option>
                  <option value="Training Session">Training Session</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Approved">Approved</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {officerPositions.map(position => (
                  <label key={position} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.attendeeList.includes(position)}
                      onChange={() => handleAttendeeToggle(position)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">{position}</span>
                  </label>
                ))}
              </div>
              <input
                type="number"
                value={formData.attendees}
                onChange={(e) => setFormData(prev => ({ ...prev, attendees: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Total number of attendees"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agenda</label>
              <textarea
                value={formData.agenda}
                onChange={(e) => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Meeting agenda items..."
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
                placeholder="Detailed meeting notes and discussions..."
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
                placeholder="Number of action items"
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
                Create Minutes
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
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Meeting Information</h3>
                <div className="space-y-3 text-sm">
                  <div><span className="font-medium">Type:</span> {editingMinutes.type}</div>
                  <div><span className="font-medium">Date:</span> {editingMinutes.date}</div>
                  <div><span className="font-medium">Duration:</span> {editingMinutes.duration}</div>
                  <div><span className="font-medium">Attendees:</span> {editingMinutes.attendees}</div>
                  <div><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      editingMinutes.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                      editingMinutes.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {editingMinutes.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Action Items</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">{editingMinutes.actionItems}</div>
                <p className="text-sm text-gray-600">Items requiring follow-up</p>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Attendee List</h4>
                  <div className="flex flex-wrap gap-1">
                    {editingMinutes.attendeeList?.map((attendee: string, index: number) => (
                      <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>
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
                onClick={() => addNotification('Minutes downloaded successfully')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button
                onClick={() => {
                  handleUpdateMinutes({ ...editingMinutes, status: 'Approved' });
                  addNotification('Minutes approved successfully');
                }}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </button>
              <button
                onClick={() => addNotification('Minutes sent for review')}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Send for Review
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NEC Report Generator Modal
  const NECReportModal = () => {
    const [reportData, setReportData] = useState({
      quarter: 'Q1 2024',
      executiveSummary: '',
      kpiHighlights: '',
      challenges: '',
      recommendations: '',
      includeMinutes: true,
      includeKPIData: true,
      includeRiskAssessment: true
    });

    const handleGenerateReport = () => {
      addNotification('NEC Quarterly Report generated successfully');
      setShowNECReportModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Generate NEC Quarterly Report</h2>
            <button
              onClick={() => setShowNECReportModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Quarter</label>
              <select
                value={reportData.quarter}
                onChange={(e) => setReportData(prev => ({ ...prev, quarter: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="Q1 2024">Q1 2024</option>
                <option value="Q4 2023">Q4 2023</option>
                <option value="Q3 2023">Q3 2023</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Executive Summary</label>
              <textarea
                value={reportData.executiveSummary}
                onChange={(e) => setReportData(prev => ({ ...prev, executiveSummary: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="High-level overview of expansion progress and key achievements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">KPI Highlights</label>
              <textarea
                value={reportData.kpiHighlights}
                onChange={(e) => setReportData(prev => ({ ...prev, kpiHighlights: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Key performance indicators and metrics achievements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Challenges & Issues</label>
              <textarea
                value={reportData.challenges}
                onChange={(e) => setReportData(prev => ({ ...prev, challenges: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Challenges faced and mitigation strategies..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations</label>
              <textarea
                value={reportData.recommendations}
                onChange={(e) => setReportData(prev => ({ ...prev, recommendations: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Recommendations for NEC consideration and support..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Include Attachments</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportData.includeMinutes}
                    onChange={(e) => setReportData(prev => ({ ...prev, includeMinutes: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">Meeting Minutes Summary</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportData.includeKPIData}
                    onChange={(e) => setReportData(prev => ({ ...prev, includeKPIData: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">KPI Data and Charts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={reportData.includeRiskAssessment}
                    onChange={(e) => setReportData(prev => ({ ...prev, includeRiskAssessment: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm">Risk Assessment Summary</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowNECReportModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => addNotification('Report preview generated')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Preview Report
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Officer Handbook Modal
  const HandbookModal = () => {
    const [handbookSections, setHandbookSections] = useState([
      { id: 1, title: 'KHK History and Mission', status: 'Complete', lastUpdated: '2024-01-01' },
      { id: 2, title: 'Officer Responsibilities', status: 'Complete', lastUpdated: '2024-01-05' },
      { id: 3, title: 'Committee Workflows', status: 'In Progress', lastUpdated: '2024-01-08' },
      { id: 4, title: 'Documentation Standards', status: 'Complete', lastUpdated: '2023-12-28' },
      { id: 5, title: 'NEC Communication Protocol', status: 'Needs Update', lastUpdated: '2023-11-15' },
      { id: 6, title: 'Emergency Procedures', status: 'Complete', lastUpdated: '2024-01-03' }
    ]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Officer Handbook Management</h2>
            <button
              onClick={() => setShowHandbookModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Handbook Sections</h3>
                <button
                  onClick={() => addNotification('New section added to handbook')}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </button>
              </div>

              <div className="space-y-3">
                {handbookSections.map(section => (
                  <div key={section.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{section.title}</h4>
                      <p className="text-sm text-gray-600">Last updated: {section.lastUpdated}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        section.status === 'Complete' ? 'bg-green-100 text-green-800' :
                        section.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {section.status}
                      </span>
                      <button
                        onClick={() => addNotification(`Editing ${section.title}`)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Handbook exported successfully')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Handbook
              </button>
              <button
                onClick={() => addNotification('Handbook published to officer portal')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Publish Updates
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
        <p className="text-purple-100">Meeting minutes, data archives, and documentation management.</p>
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
              <p className="text-sm font-medium text-gray-600">Active Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
            </div>
            <Archive className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Archives</p>
              <p className="text-2xl font-bold text-gray-900">12.3 GB</p>
            </div>
            <Archive className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Actions</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingTasks.filter(t => t.status !== 'Complete').length}</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowNECReportModal(true)}
            className="flex items-center justify-center p-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Generate NEC Report
          </button>
          <button
            onClick={() => setShowCreateMinutesModal(true)}
            className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Meeting Minutes
          </button>
          <button
            onClick={() => setShowHandbookModal(true)}
            className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Edit className="h-5 w-5 mr-2" />
            Update Handbook
          </button>
          <button
            onClick={() => addNotification('Full system backup initiated')}
            className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            <Archive className="h-5 w-5 mr-2" />
            Create Backup
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'minutes', name: 'Meeting Minutes', icon: FileText },
              { id: 'templates', name: 'Templates', icon: Archive },
              { id: 'archives', name: 'Data Archives', icon: Archive }
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
                          meeting.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          meeting.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
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

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Templates & Documents</h3>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    onClick={() => addNotification('Template upload feature opened')}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Template
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.category}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{template.type}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{template.description}</p>
                    <div className="text-sm text-gray-600 mb-3">
                      <p>Version: {template.version} • Updated: {template.lastUpdated}</p>
                      <p>Downloads: {template.downloads} • Size: {template.size}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownloadTemplate(template.id)}
                        className="flex items-center text-purple-600 hover:text-purple-700 text-sm"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      <button
                        onClick={() => addNotification('Template preview opened')}
                        className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => addNotification('Template editor opened')}
                        className="flex items-center text-green-600 hover:text-green-700 text-sm"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'archives' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Data Archives</h3>
                <button
                  onClick={() => addNotification('Full backup initiated')}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Create Full Backup
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataArchives.map((archive) => (
                  <div key={archive.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{archive.category}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        archive.status === 'Current' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {archive.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{archive.description}</p>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Items:</span>
                        <span className="font-medium">{archive.items}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="font-medium">{archive.sizeGB} GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Backup:</span>
                        <span className="font-medium">{archive.lastBackup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retention:</span>
                        <span className="font-medium">{archive.retention}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCreateBackup(archive.id)}
                        className="flex-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm"
                      >
                        Backup Now
                      </button>
                      <button
                        onClick={() => addNotification('Archive accessed')}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                      >
                        Access
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
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{task.task}</h4>
                <p className="text-sm text-gray-600">Due: {task.due}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                  className={`text-xs px-2 py-1 rounded-full border-0 ${
                    task.status === 'Complete' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showCreateMinutesModal && <CreateMinutesModal />}
      {showMinutesModal && <MinutesDetailsModal />}
      {showNECReportModal && <NECReportModal />}
      {showHandbookModal && <HandbookModal />}
    </div>
  );
};

export default SecretaryDashboard;