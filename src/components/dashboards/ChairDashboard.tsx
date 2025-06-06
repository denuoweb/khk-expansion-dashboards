import React, { useState, useEffect } from 'react';
import { Users, Target, TrendingUp, AlertCircle, CheckCircle, Calendar, Plus, Filter, Download, Bell, ArrowUp, ArrowDown, Eye, Edit, Trash2, MoreVertical, X, FileText, Clock, Send, UserPlus, Settings } from 'lucide-react';

// Modal Components
const NECReportModal: React.FC<{ isOpen: boolean; onClose: () => void; onGenerate: (data: any) => void }> = ({ isOpen, onClose, onGenerate }) => {
  const [reportData, setReportData] = useState({
    period: 'Q1 2024',
    includeKPIs: true,
    includeFinancials: true,
    includeRisks: true,
    includeRecommendations: true,
    format: 'PDF'
  });

  if (!isOpen) return null;

  const handleGenerate = () => {
    onGenerate(reportData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Generate NEC Report</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
            <select 
              value={reportData.period}
              onChange={(e) => setReportData(prev => ({ ...prev, period: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Q1 2024">Q1 2024</option>
              <option value="Q4 2023">Q4 2023</option>
              <option value="Annual 2023">Annual 2023</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Include Sections</label>
            <div className="space-y-2">
              {[
                { key: 'includeKPIs', label: 'KPI Metrics' },
                { key: 'includeFinancials', label: 'Financial Summary' },
                { key: 'includeRisks', label: 'Risk Assessment' },
                { key: 'includeRecommendations', label: 'Recommendations' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportData[key as keyof typeof reportData] as boolean}
                    onChange={(e) => setReportData(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select 
              value={reportData.format}
              onChange={(e) => setReportData(prev => ({ ...prev, format: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="PowerPoint">PowerPoint</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={handleGenerate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

const TeamMeetingModal: React.FC<{ isOpen: boolean; onClose: () => void; onSchedule: (data: any) => void }> = ({ isOpen, onClose, onSchedule }) => {
  const [meetingData, setMeetingData] = useState({
    title: 'Weekly Officer Meeting',
    date: '',
    time: '14:00',
    duration: '90',
    attendees: [] as string[],
    agenda: '',
    location: 'Conference Room A'
  });

  const officers = [
    'Vice-Chair', 'Secretary', 'Marketing Specialist', 'Recruitment Coordinator',
    'Chapter Development', 'Compliance Officer', 'Data Analytics Manager'
  ];

  if (!isOpen) return null;

  const handleSchedule = () => {
    onSchedule(meetingData);
    onClose();
  };

  const toggleAttendee = (officer: string) => {
    setMeetingData(prev => ({
      ...prev,
      attendees: prev.attendees.includes(officer)
        ? prev.attendees.filter(a => a !== officer)
        : [...prev.attendees, officer]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Schedule Team Meeting</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Title</label>
            <input
              type="text"
              value={meetingData.title}
              onChange={(e) => setMeetingData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={meetingData.date}
                onChange={(e) => setMeetingData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={meetingData.time}
                onChange={(e) => setMeetingData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
            <select 
              value={meetingData.duration}
              onChange={(e) => setMeetingData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {officers.map(officer => (
                <label key={officer} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={meetingData.attendees.includes(officer)}
                    onChange={() => toggleAttendee(officer)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{officer}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={meetingData.location}
              onChange={(e) => setMeetingData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Agenda</label>
            <textarea
              value={meetingData.agenda}
              onChange={(e) => setMeetingData(prev => ({ ...prev, agenda: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Meeting agenda items..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={handleSchedule} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

const KPITargetsModal: React.FC<{ isOpen: boolean; onClose: () => void; onUpdate: (data: any) => void; currentKPIs: any[] }> = ({ isOpen, onClose, onUpdate, currentKPIs }) => {
  const [targets, setTargets] = useState(
    currentKPIs.map(kpi => ({ label: kpi.label, target: kpi.target, notes: '' }))
  );

  if (!isOpen) return null;

  const handleUpdate = () => {
    onUpdate(targets);
    onClose();
  };

  const updateTarget = (index: number, field: string, value: any) => {
    setTargets(prev => prev.map((target, i) => 
      i === index ? { ...target, [field]: value } : target
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Review KPI Targets</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {targets.map((target, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{target.label}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                  <input
                    type="number"
                    value={target.target}
                    onChange={(e) => updateTarget(index, 'target', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <input
                    type="text"
                    value={target.notes}
                    onChange={(e) => updateTarget(index, 'notes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Adjustment notes..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Update Targets
          </button>
        </div>
      </div>
    </div>
  );
};

const IssuesRisksModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'issues' | 'risks'>('issues');

  const issues = [
    { id: 1, title: 'Penn State Compliance Delay', severity: 'High', status: 'Open', assignee: 'Compliance Officer', description: 'University policy review taking longer than expected' },
    { id: 2, title: 'Marketing Template Approval', severity: 'Medium', status: 'In Progress', assignee: 'Marketing Specialist', description: 'Brand guidelines need final approval from NEC' },
    { id: 3, title: 'Ohio State Contact Unresponsive', severity: 'Medium', status: 'Open', assignee: 'Recruitment Coordinator', description: 'Primary contact has not responded to follow-up emails' }
  ];

  const risks = [
    { id: 1, title: 'Budget Overrun Risk', probability: 'Medium', impact: 'High', mitigation: 'Weekly budget reviews implemented', owner: 'Treasurer' },
    { id: 2, title: 'University Policy Changes', probability: 'Low', impact: 'High', mitigation: 'Regular policy monitoring and compliance audits', owner: 'Compliance Officer' },
    { id: 3, title: 'Key Personnel Departure', probability: 'Low', impact: 'Medium', mitigation: 'Succession planning and cross-training', owner: 'Vice-Chair' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Issues & Risks Management</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'issues', name: 'Current Issues', count: issues.length },
              { id: 'risks', name: 'Risk Register', count: risks.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'issues' | 'risks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.name}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{tab.count}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'issues' && (
            <div className="space-y-4">
              {issues.map(issue => (
                <div key={issue.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{issue.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        issue.severity === 'High' ? 'bg-red-100 text-red-800' :
                        issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.severity}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        issue.status === 'Open' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
                  <p className="text-sm text-gray-500">Assigned to: {issue.assignee}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-4">
              {risks.map(risk => (
                <div key={risk.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{risk.title}</h4>
                    <div className="flex space-x-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {risk.probability} Probability
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                        {risk.impact} Impact
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Mitigation: {risk.mitigation}</p>
                  <p className="text-sm text-gray-500">Owner: {risk.owner}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            Add New Issue
          </button>
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckInModal: React.FC<{ isOpen: boolean; onClose: () => void; onSchedule: (data: any) => void }> = ({ isOpen, onClose, onSchedule }) => {
  const [checkInData, setCheckInData] = useState({
    officer: '',
    type: 'weekly',
    date: '',
    time: '10:00',
    topics: [] as string[],
    notes: ''
  });

  const officers = [
    'Vice-Chair', 'Secretary', 'Marketing Specialist', 'Recruitment Coordinator',
    'Chapter Development', 'Compliance Officer', 'Data Analytics Manager'
  ];

  const topicOptions = [
    'KPI Review', 'Task Progress', 'Challenges & Blockers', 'Resource Needs',
    'Upcoming Deadlines', 'Strategic Planning', 'Team Coordination'
  ];

  if (!isOpen) return null;

  const handleSchedule = () => {
    onSchedule(checkInData);
    onClose();
  };

  const toggleTopic = (topic: string) => {
    setCheckInData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Schedule Check-in</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Officer</label>
            <select 
              value={checkInData.officer}
              onChange={(e) => setCheckInData(prev => ({ ...prev, officer: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Officer</option>
              {officers.map(officer => (
                <option key={officer} value={officer}>{officer}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Type</label>
            <select 
              value={checkInData.type}
              onChange={(e) => setCheckInData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="weekly">Weekly Check-in</option>
              <option value="monthly">Monthly Review</option>
              <option value="quarterly">Quarterly Assessment</option>
              <option value="ad-hoc">Ad-hoc Discussion</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={checkInData.date}
                onChange={(e) => setCheckInData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={checkInData.time}
                onChange={(e) => setCheckInData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discussion Topics</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {topicOptions.map(topic => (
                <label key={topic} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checkInData.topics.includes(topic)}
                    onChange={() => toggleTopic(topic)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{topic}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={checkInData.notes}
              onChange={(e) => setCheckInData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Additional notes or specific items to discuss..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={handleSchedule} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Schedule Check-in
          </button>
        </div>
      </div>
    </div>
  );
};

const AddDeadlineModal: React.FC<{ isOpen: boolean; onClose: () => void; onAdd: (data: any) => void }> = ({ isOpen, onClose, onAdd }) => {
  const [deadlineData, setDeadlineData] = useState({
    task: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    category: 'General',
    assignedTo: '',
    status: 'Not Started'
  });

  const officers = [
    'Vice-Chair', 'Secretary', 'Marketing Specialist', 'Recruitment Coordinator',
    'Chapter Development', 'Compliance Officer', 'Data Analytics Manager', 'Treasurer'
  ];

  const categories = [
    'Reporting', 'Outreach', 'Development', 'Administration', 'Compliance', 'Marketing', 'Analytics'
  ];

  if (!isOpen) return null;

  const handleAdd = () => {
    onAdd({
      ...deadlineData,
      id: Date.now(),
      completion: 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Deadline</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
            <input
              type="text"
              value={deadlineData.task}
              onChange={(e) => setDeadlineData(prev => ({ ...prev, task: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={deadlineData.description}
              onChange={(e) => setDeadlineData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Task description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={deadlineData.dueDate}
                onChange={(e) => setDeadlineData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select 
                value={deadlineData.priority}
                onChange={(e) => setDeadlineData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={deadlineData.category}
                onChange={(e) => setDeadlineData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
              <select 
                value={deadlineData.assignedTo}
                onChange={(e) => setDeadlineData(prev => ({ ...prev, assignedTo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Officer</option>
                {officers.map(officer => (
                  <option key={officer} value={officer}>{officer}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Deadline
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateReportModal: React.FC<{ isOpen: boolean; onClose: () => void; onCreate: (data: any) => void }> = ({ isOpen, onClose, onCreate }) => {
  const [reportData, setReportData] = useState({
    name: '',
    type: 'Executive',
    frequency: 'Monthly',
    recipients: [] as string[],
    sections: [] as string[],
    format: 'PDF'
  });

  const recipientOptions = [
    'NEC', 'Officers', 'Alumni Board', 'Regional Directors', 'Colony Leaders'
  ];

  const sectionOptions = [
    'Executive Summary', 'KPI Metrics', 'Financial Summary', 'Risk Assessment',
    'Officer Reports', 'University Updates', 'Recommendations', 'Action Items'
  ];

  if (!isOpen) return null;

  const handleCreate = () => {
    onCreate({
      ...reportData,
      id: Date.now(),
      lastGenerated: 'Never',
      status: 'Draft'
    });
    onClose();
  };

  const toggleRecipient = (recipient: string) => {
    setReportData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(recipient)
        ? prev.recipients.filter(r => r !== recipient)
        : [...prev.recipients, recipient]
    }));
  };

  const toggleSection = (section: string) => {
    setReportData(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Report</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
            <input
              type="text"
              value={reportData.name}
              onChange={(e) => setReportData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter report name..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select 
                value={reportData.type}
                onChange={(e) => setReportData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Executive">Executive</option>
                <option value="Analytics">Analytics</option>
                <option value="Strategic">Strategic</option>
                <option value="Operational">Operational</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <select 
                value={reportData.frequency}
                onChange={(e) => setReportData(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="On-demand">On-demand</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {recipientOptions.map(recipient => (
                <label key={recipient} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportData.recipients.includes(recipient)}
                    onChange={() => toggleRecipient(recipient)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{recipient}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Sections</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {sectionOptions.map(section => (
                <label key={section} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={reportData.sections.includes(section)}
                    onChange={() => toggleSection(section)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{section}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select 
              value={reportData.format}
              onChange={(e) => setReportData(prev => ({ ...prev, format: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="PowerPoint">PowerPoint</option>
              <option value="Word">Word</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
};

const ChairDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'kpi' | 'roles' | 'deadlines' | 'reports'>('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [showNotifications, setShowNotifications] = useState(false);

  // Modal states
  const [showNECReportModal, setShowNECReportModal] = useState(false);
  const [showTeamMeetingModal, setShowTeamMeetingModal] = useState(false);
  const [showKPITargetsModal, setShowKPITargetsModal] = useState(false);
  const [showIssuesRisksModal, setShowIssuesRisksModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showAddDeadlineModal, setShowAddDeadlineModal] = useState(false);
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);

  // Enhanced KPI data with historical tracking
  const [kpiData, setKpiData] = useState([
    { 
      label: 'Universities Contacted', 
      value: 47, 
      target: 50, 
      percentage: 94,
      trend: '+12%',
      history: [32, 35, 41, 44, 47],
      forecast: [48, 50, 52],
      status: 'on-track'
    },
    { 
      label: 'Positive Response Rate', 
      value: 23, 
      target: 30, 
      percentage: 77,
      trend: '+8%',
      history: [18, 19, 20, 21, 23],
      forecast: [25, 27, 30],
      status: 'behind'
    },
    { 
      label: 'Campus Visits Completed', 
      value: 12, 
      target: 15, 
      percentage: 80,
      trend: '+33%',
      history: [6, 7, 9, 10, 12],
      forecast: [13, 15, 16],
      status: 'on-track'
    },
    { 
      label: 'New Colony Applications', 
      value: 5, 
      target: 8, 
      percentage: 63,
      trend: '+25%',
      history: [3, 3, 4, 4, 5],
      forecast: [6, 7, 8],
      status: 'behind'
    },
    { 
      label: 'Colonies Successfully Chartered', 
      value: 2, 
      target: 3, 
      percentage: 67,
      trend: '+100%',
      history: [0, 1, 1, 1, 2],
      forecast: [2, 3, 3],
      status: 'on-track'
    },
    { 
      label: 'Membership Growth (Quarterly)', 
      value: 156, 
      target: 200, 
      percentage: 78,
      trend: '+15%',
      history: [120, 125, 135, 145, 156],
      forecast: [165, 180, 200],
      status: 'on-track'
    }
  ]);

  // Enhanced role progress with detailed metrics
  const [roleProgress, setRoleProgress] = useState([
    { 
      role: 'Vice-Chair', 
      status: 'On Track', 
      tasks: 8, 
      completed: 6, 
      color: 'green',
      lastUpdate: '2024-01-08',
      keyMetrics: ['KPI Tracking: 95%', 'Risk Management: Active'],
      upcomingDeadlines: 2
    },
    { 
      role: 'Secretary', 
      status: 'On Track', 
      tasks: 5, 
      completed: 5, 
      color: 'green',
      lastUpdate: '2024-01-08',
      keyMetrics: ['Documentation: 100%', 'Archive Status: Current'],
      upcomingDeadlines: 1
    },
    { 
      role: 'Marketing Specialist', 
      status: 'Behind', 
      tasks: 12, 
      completed: 8, 
      color: 'yellow',
      lastUpdate: '2024-01-07',
      keyMetrics: ['Templates: 67%', 'Brand Compliance: 90%'],
      upcomingDeadlines: 3
    },
    { 
      role: 'Recruitment Coordinator', 
      status: 'On Track', 
      tasks: 15, 
      completed: 12, 
      color: 'green',
      lastUpdate: '2024-01-08',
      keyMetrics: ['Outreach: 80%', 'Response Rate: 48%'],
      upcomingDeadlines: 2
    },
    { 
      role: 'Chapter Development', 
      status: 'At Risk', 
      tasks: 10, 
      completed: 6, 
      color: 'red',
      lastUpdate: '2024-01-06',
      keyMetrics: ['Colony Support: 60%', 'Integration: 45%'],
      upcomingDeadlines: 4
    },
    { 
      role: 'Compliance Officer', 
      status: 'On Track', 
      tasks: 7, 
      completed: 7, 
      color: 'green',
      lastUpdate: '2024-01-08',
      keyMetrics: ['Risk Assessment: 100%', 'Policy Review: Current'],
      upcomingDeadlines: 1
    },
    { 
      role: 'Data Analytics Manager', 
      status: 'On Track', 
      tasks: 9, 
      completed: 8, 
      color: 'green',
      lastUpdate: '2024-01-08',
      keyMetrics: ['Data Quality: 95%', 'Reporting: Active'],
      upcomingDeadlines: 1
    }
  ]);

  // Enhanced deadlines with categories and actions
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    { 
      id: 1,
      task: 'NEC Quarterly Report', 
      due: '2024-01-15', 
      priority: 'High',
      category: 'Reporting',
      assignedTo: 'Secretary',
      status: 'In Progress',
      completion: 75,
      description: 'Comprehensive quarterly progress report for National Executive Committee'
    },
    { 
      id: 2,
      task: 'University of Michigan Follow-up', 
      due: '2024-01-10', 
      priority: 'Medium',
      category: 'Outreach',
      assignedTo: 'Recruitment Coordinator',
      status: 'Pending',
      completion: 0,
      description: 'Follow-up meeting with University of Michigan administration'
    },
    { 
      id: 3,
      task: 'Ohio State Colony Charter Review', 
      due: '2024-01-20', 
      priority: 'High',
      category: 'Development',
      assignedTo: 'Chapter Development',
      status: 'Not Started',
      completion: 0,
      description: 'Review and finalize charter application for Ohio State colony'
    },
    { 
      id: 4,
      task: 'Budget Review Meeting', 
      due: '2024-01-12', 
      priority: 'Medium',
      category: 'Administration',
      assignedTo: 'Treasurer',
      status: 'Scheduled',
      completion: 25,
      description: 'Monthly budget review and expense analysis'
    }
  ]);

  // Notifications system
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'urgent', message: 'Penn State compliance issue requires immediate attention', time: '5 min ago' },
    { id: 2, type: 'info', message: 'New university inquiry from Georgia Tech', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Ohio State colony milestone achieved', time: '2 hours ago' },
    { id: 4, type: 'warning', message: 'Marketing template deadline approaching', time: '4 hours ago' }
  ]);

  // Reports data
  const [reports, setReports] = useState([
    { 
      id: 1,
      name: 'Weekly Executive Summary',
      type: 'Executive',
      lastGenerated: '2024-01-08',
      frequency: 'Weekly',
      recipients: ['NEC', 'Officers'],
      status: 'Current'
    },
    { 
      id: 2,
      name: 'Monthly KPI Dashboard',
      type: 'Analytics',
      lastGenerated: '2024-01-01',
      frequency: 'Monthly',
      recipients: ['All Officers'],
      status: 'Due'
    },
    { 
      id: 3,
      name: 'Quarterly Expansion Report',
      type: 'Strategic',
      lastGenerated: '2023-12-31',
      frequency: 'Quarterly',
      recipients: ['NEC', 'Alumni Board'],
      status: 'In Progress'
    }
  ]);

  const handleKpiUpdate = (index: number, newValue: number) => {
    setKpiData(prev => prev.map((kpi, i) => 
      i === index ? { 
        ...kpi, 
        value: newValue, 
        percentage: Math.round((newValue / kpi.target) * 100) 
      } : kpi
    ));
  };

  const handleDeadlineStatusUpdate = (id: number, newStatus: string) => {
    setUpcomingDeadlines(prev => prev.map(deadline => 
      deadline.id === id ? { ...deadline, status: newStatus } : deadline
    ));
  };

  const generateReport = (reportId: number) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { 
        ...report, 
        lastGenerated: new Date().toISOString().split('T')[0],
        status: 'Current'
      } : report
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'text-green-600 bg-green-100';
      case 'Behind': return 'text-yellow-600 bg-yellow-100';
      case 'At Risk': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Modal handlers
  const handleGenerateNECReport = (data: any) => {
    console.log('Generating NEC Report:', data);
    // Add notification
    setNotifications(prev => [{
      id: Date.now(),
      type: 'success',
      message: `NEC Report for ${data.period} generated successfully`,
      time: 'Just now'
    }, ...prev]);
  };

  const handleScheduleTeamMeeting = (data: any) => {
    console.log('Scheduling Team Meeting:', data);
    setNotifications(prev => [{
      id: Date.now(),
      type: 'info',
      message: `Team meeting "${data.title}" scheduled for ${data.date}`,
      time: 'Just now'
    }, ...prev]);
  };

  const handleUpdateKPITargets = (data: any) => {
    console.log('Updating KPI Targets:', data);
    setNotifications(prev => [{
      id: Date.now(),
      type: 'success',
      message: 'KPI targets updated successfully',
      time: 'Just now'
    }, ...prev]);
  };

  const handleScheduleCheckIn = (data: any) => {
    console.log('Scheduling Check-in:', data);
    setNotifications(prev => [{
      id: Date.now(),
      type: 'info',
      message: `Check-in scheduled with ${data.officer} for ${data.date}`,
      time: 'Just now'
    }, ...prev]);
  };

  const handleAddDeadline = (data: any) => {
    console.log('Adding Deadline:', data);
    setUpcomingDeadlines(prev => [...prev, data]);
    setNotifications(prev => [{
      id: Date.now(),
      type: 'info',
      message: `New deadline "${data.task}" added`,
      time: 'Just now'
    }, ...prev]);
  };

  const handleCreateReport = (data: any) => {
    console.log('Creating Report:', data);
    setReports(prev => [...prev, data]);
    setNotifications(prev => [{
      id: Date.now(),
      type: 'success',
      message: `Report template "${data.name}" created`,
      time: 'Just now'
    }, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Notifications */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Chair!</h2>
            <p className="text-blue-100">Comprehensive overview of expansion progress across all officer positions.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl border border-gray-200 w-80 z-10">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                        <div className="flex items-start space-x-2">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'urgent' ? 'bg-red-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as 'week' | 'month' | 'quarter')}
              className="bg-blue-500 text-white border border-blue-400 rounded-lg px-3 py-2 text-sm"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: Target },
              { id: 'kpi', name: 'KPI Details', icon: TrendingUp },
              { id: 'roles', name: 'Role Management', icon: Users },
              { id: 'deadlines', name: 'Deadlines', icon: Calendar },
              { id: 'reports', name: 'Reports', icon: Download }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeView === tab.id
                      ? 'border-blue-500 text-blue-600'
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
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* KPI Overview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpiData.slice(0, 6).map((kpi, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium text-gray-700">{kpi.label}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        kpi.percentage >= 90 ? 'bg-green-100 text-green-800' :
                        kpi.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {kpi.percentage}%
                      </span>
                    </div>
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                      <span className="text-sm text-gray-500">/ {kpi.target}</span>
                      <span className="text-sm text-green-600 font-medium">{kpi.trend}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          kpi.percentage >= 90 ? 'bg-green-500' :
                          kpi.percentage >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${kpi.percentage}%` }}
                      ></div>
                    </div>
                    {/* Mini trend chart */}
                    <div className="flex items-end space-x-1 justify-between h-6">
                      {kpi.history.map((value, i) => (
                        <div
                          key={i}
                          className="bg-blue-200 rounded-sm flex-1"
                          style={{ 
                            height: `${(value / Math.max(...kpi.history)) * 100}%`,
                            minHeight: '4px'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Status Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Critical Items</h3>
                  <div className="space-y-2">
                    {upcomingDeadlines.filter(d => d.priority === 'High').slice(0, 3).map(deadline => (
                      <div key={deadline.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                        <span className="text-sm text-red-900">{deadline.task}</span>
                        <span className="text-xs text-red-600">{deadline.due}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Recent Achievements</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-900">Ohio State colony milestone reached</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-900">Q4 documentation completed</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-900">New university partnership established</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'kpi' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Detailed KPI Analysis</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowCheckInModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Check-in
                  </button>
                  <button 
                    onClick={() => setShowAddDeadlineModal(true)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deadline
                  </button>
                  <button 
                    onClick={() => setShowCreateReportModal(true)}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Create Report
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {kpiData.map((kpi, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{kpi.label}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-3xl font-bold text-gray-900">{kpi.value}</span>
                          <span className="text-gray-500">/ {kpi.target}</span>
                          <span className={`flex items-center text-sm font-medium ${
                            kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {kpi.trend.startsWith('+') ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                            {kpi.trend}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          kpi.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {kpi.status === 'on-track' ? 'On Track' : 'Behind Target'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Historical Performance</h5>
                        <div className="flex items-end space-x-2 justify-between h-20 bg-gray-50 rounded p-3">
                          {kpi.history.map((value, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div
                                className="bg-blue-500 rounded-sm w-8"
                                style={{ 
                                  height: `${(value / Math.max(...kpi.history)) * 60}px`,
                                  minHeight: '8px'
                                }}
                              ></div>
                              <span className="text-xs text-gray-600 mt-1">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Forecast</h5>
                        <div className="flex items-end space-x-2 justify-between h-20 bg-gray-50 rounded p-3">
                          {kpi.forecast.map((value, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div
                                className="bg-green-400 rounded-sm w-8 opacity-70"
                                style={{ 
                                  height: `${(value / Math.max(...kpi.forecast)) * 60}px`,
                                  minHeight: '8px'
                                }}
                              ></div>
                              <span className="text-xs text-gray-600 mt-1">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            kpi.percentage >= 90 ? 'bg-green-500' :
                            kpi.percentage >= 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${kpi.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>0</span>
                        <span>{kpi.percentage}% Complete</span>
                        <span>{kpi.target}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'roles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Officer Role Management</h3>
                <button 
                  onClick={() => setShowCheckInModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Check-in
                </button>
              </div>

              <div className="space-y-4">
                {roleProgress.map((role, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{role.role}</h4>
                        <p className="text-sm text-gray-600">Last updated: {role.lastUpdate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(role.status)}`}>
                          {role.status}
                        </span>
                        <div className="relative">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Task Progress</h5>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  role.color === 'green' ? 'bg-green-500' :
                                  role.color === 'yellow' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${(role.completed / role.tasks) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {role.completed}/{role.tasks} tasks completed
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Key Metrics</h5>
                        <div className="space-y-1">
                          {role.keyMetrics.map((metric, i) => (
                            <p key={i} className="text-sm text-gray-600">{metric}</p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Upcoming Deadlines</h5>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {role.upcomingDeadlines} deadline{role.upcomingDeadlines !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <button className="flex items-center px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </button>
                      <button className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded">
                        <Edit className="h-3 w-3 mr-1" />
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'deadlines' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Deadline Management</h3>
                <div className="flex space-x-2">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button 
                    onClick={() => setShowAddDeadlineModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deadline
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{deadline.task}</h4>
                        <p className="text-gray-600 mt-1">{deadline.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(deadline.priority)}`}>
                          {deadline.priority}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {deadline.category}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Due Date:</span>
                        <p className="text-sm text-gray-900">{deadline.due}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Assigned To:</span>
                        <p className="text-sm text-gray-900">{deadline.assignedTo}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <p className="text-sm text-gray-900">{deadline.status}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Completion:</span>
                        <p className="text-sm text-gray-900">{deadline.completion}%</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            deadline.completion >= 75 ? 'bg-green-500' :
                            deadline.completion >= 50 ? 'bg-yellow-500' :
                            deadline.completion >= 25 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${deadline.completion}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <select
                        value={deadline.status}
                        onChange={(e) => handleDeadlineStatusUpdate(deadline.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button className="flex items-center px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded">
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'reports' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Report Management</h3>
                <button 
                  onClick={() => setShowCreateReportModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Report
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {reports.map((report) => (
                  <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-900">{report.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        report.status === 'Current' ? 'bg-green-100 text-green-800' :
                        report.status === 'Due' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{report.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span className="font-medium">{report.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Generated:</span>
                        <span className="font-medium">{report.lastGenerated}</span>
                      </div>
                      <div>
                        <span>Recipients:</span>
                        <div className="mt-1">
                          {report.recipients.map((recipient, i) => (
                            <span key={i} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1">
                              {recipient}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => generateReport(report.id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Generate
                      </button>
                      <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm">
                        <Edit className="h-3 w-3 mr-1" />
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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowNECReportModal(true)}
            className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
          >
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-blue-700">Generate NEC Report</span>
          </button>
          <button 
            onClick={() => setShowTeamMeetingModal(true)}
            className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
          >
            <Users className="h-6 w-6 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-green-700">Schedule Team Meeting</span>
          </button>
          <button 
            onClick={() => setShowKPITargetsModal(true)}
            className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
          >
            <Target className="h-6 w-6 text-purple-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-purple-700">Review KPI Targets</span>
          </button>
          <button 
            onClick={() => setShowIssuesRisksModal(true)}
            className="flex items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors group"
          >
            <AlertCircle className="h-6 w-6 text-yellow-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-yellow-700">View Issues & Risks</span>
          </button>
        </div>
      </div>

      {/* All Modals */}
      <NECReportModal 
        isOpen={showNECReportModal} 
        onClose={() => setShowNECReportModal(false)} 
        onGenerate={handleGenerateNECReport}
      />
      <TeamMeetingModal 
        isOpen={showTeamMeetingModal} 
        onClose={() => setShowTeamMeetingModal(false)} 
        onSchedule={handleScheduleTeamMeeting}
      />
      <KPITargetsModal 
        isOpen={showKPITargetsModal} 
        onClose={() => setShowKPITargetsModal(false)} 
        onUpdate={handleUpdateKPITargets}
        currentKPIs={kpiData}
      />
      <IssuesRisksModal 
        isOpen={showIssuesRisksModal} 
        onClose={() => setShowIssuesRisksModal(false)} 
      />
      <CheckInModal 
        isOpen={showCheckInModal} 
        onClose={() => setShowCheckInModal(false)} 
        onSchedule={handleScheduleCheckIn}
      />
      <AddDeadlineModal 
        isOpen={showAddDeadlineModal} 
        onClose={() => setShowAddDeadlineModal(false)} 
        onAdd={handleAddDeadline}
      />
      <CreateReportModal 
        isOpen={showCreateReportModal} 
        onClose={() => setShowCreateReportModal(false)} 
        onCreate={handleCreateReport}
      />
    </div>
  );
};

export default ChairDashboard;