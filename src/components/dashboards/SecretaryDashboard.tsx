import React, { useState } from 'react';
import { FileText, Calendar, Archive, Download, Plus, Search, Filter } from 'lucide-react';

const SecretaryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('minutes');

  const meetingMinutes = [
    {
      id: 1,
      date: '2024-01-08',
      type: 'Executive Committee',
      attendees: 7,
      duration: '90 min',
      status: 'Approved',
      actionItems: 5
    },
    {
      id: 2,
      date: '2024-01-05',
      type: 'Full Officer Meeting',
      attendees: 8,
      duration: '120 min',
      status: 'Draft',
      actionItems: 8
    },
    {
      id: 3,
      date: '2024-01-03',
      type: 'NEC Report Planning',
      attendees: 4,
      duration: '60 min',
      status: 'Approved',
      actionItems: 3
    }
  ];

  const templates = [
    {
      name: 'Meeting Minutes Template',
      category: 'Documentation',
      lastUpdated: '2024-01-01',
      downloads: 23,
      type: 'DOCX'
    },
    {
      name: 'Quarterly Report Template',
      category: 'Reporting',
      lastUpdated: '2023-12-28',
      downloads: 15,
      type: 'DOCX'
    },
    {
      name: 'Action Item Tracker',
      category: 'Project Management',
      lastUpdated: '2024-01-05',
      downloads: 31,
      type: 'XLSX'
    },
    {
      name: 'Officer Contact List',
      category: 'Reference',
      lastUpdated: '2024-01-08',
      downloads: 8,
      type: 'PDF'
    }
  ];

  const dataArchives = [
    {
      category: 'Meeting Records',
      items: 45,
      sizeGB: 2.3,
      lastBackup: '2024-01-08',
      status: 'Current'
    },
    {
      category: 'Officer Reports',
      items: 128,
      sizeGB: 5.7,
      lastBackup: '2024-01-08',
      status: 'Current'
    },
    {
      category: 'University Correspondence',
      items: 89,
      sizeGB: 3.2,
      lastBackup: '2024-01-07',
      status: 'Current'
    },
    {
      category: 'Templates & Guidelines',
      items: 32,
      sizeGB: 1.1,
      lastBackup: '2024-01-08',
      status: 'Current'
    }
  ];

  const upcomingTasks = [
    { task: 'Prepare NEC Quarterly Minutes', due: '2024-01-15', priority: 'High' },
    { task: 'Update Officer Handbook', due: '2024-01-20', priority: 'Medium' },
    { task: 'Archive Q4 2023 Documents', due: '2024-01-12', priority: 'Medium' },
    { task: 'Template Review & Updates', due: '2024-01-25', priority: 'Low' }
  ];

  return (
    <div className="space-y-6">
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
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Templates</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
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
              <p className="text-2xl font-bold text-gray-900">8</p>
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
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </button>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    New Minutes
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {meetingMinutes.map((meeting) => (
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
                        <button className="text-gray-400 hover:text-gray-600">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Attendees: {meeting.attendees}</div>
                      <div>Action Items: {meeting.actionItems}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Templates & Documents</h3>
                <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.category}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{template.type}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <p>Last updated: {template.lastUpdated}</p>
                      <p>Downloads: {template.downloads}</p>
                    </div>
                    <button className="flex items-center text-purple-600 hover:text-purple-700">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'archives' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Data Archives</h3>
                <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  <Archive className="h-4 w-4 mr-2" />
                  Create Backup
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataArchives.map((archive, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{archive.category}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        archive.status === 'Current' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {archive.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
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
          {upcomingTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
    </div>
  );
};

export default SecretaryDashboard;