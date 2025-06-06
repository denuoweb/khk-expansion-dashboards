import React, { useState } from 'react';
import { UserPlus, Phone, Mail, MapPin, Calendar, Filter, Plus, Search } from 'lucide-react';

const RecruitmentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contacts');

  const universityContacts = [
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
      nextStep: 'Campus visit scheduled'
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
      nextStep: 'Send information packet'
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
      nextStep: 'Schedule phone call'
    }
  ];

  const outreachStats = [
    { metric: 'Universities Contacted', value: 47, target: 50, change: '+3 this week' },
    { metric: 'Positive Responses', value: 23, target: 30, change: '+2 this week' },
    { metric: 'Campus Visits Scheduled', value: 8, target: 12, change: '+1 this week' },
    { metric: 'Follow-ups Pending', value: 15, target: 10, change: '-2 this week' }
  ];

  const prospectingPipeline = [
    { stage: 'Research Phase', count: 12, universities: ['Auburn University', 'Florida State', 'Georgia Tech'] },
    { stage: 'Initial Contact', count: 8, universities: ['USC', 'UCLA', 'Arizona State'] },
    { stage: 'Follow-up', count: 15, universities: ['Texas A&M', 'UT Austin', 'Rice University'] },
    { stage: 'Meeting Scheduled', count: 6, universities: ['Vanderbilt', 'Duke', 'Wake Forest'] },
    { stage: 'Proposal Sent', count: 4, universities: ['Northwestern', 'Wisconsin', 'Minnesota'] }
  ];

  const upcomingTasks = [
    { task: 'Follow up with University of Michigan', due: '2024-01-10', priority: 'High', type: 'Phone Call' },
    { task: 'Send proposal to Ohio State', due: '2024-01-12', priority: 'Medium', type: 'Email' },
    { task: 'Campus visit at Penn State', due: '2024-01-15', priority: 'High', type: 'In-Person' },
    { task: 'Research new prospects in Texas', due: '2024-01-18', priority: 'Low', type: 'Research' }
  ];

  return (
    <div className="space-y-6">
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
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </button>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {universityContacts.map((contact) => (
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
                        <button className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm">
                          Call
                        </button>
                        <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm">
                          Email
                        </button>
                        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm">
                          Update
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
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
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
                        <div key={uniIndex} className="bg-white p-2 rounded text-sm">
                          {uni}
                        </div>
                      ))}
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
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Initial Contact Email</h4>
                  <p className="text-gray-600 text-sm mb-4">Professional introduction and interest inquiry</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm">
                      Use Template
                    </button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Follow-up Email</h4>
                  <p className="text-gray-600 text-sm mb-4">Professional follow-up after initial contact</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm">
                      Use Template
                    </button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Meeting Request</h4>
                  <p className="text-gray-600 text-sm mb-4">Campus visit or video call scheduling</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm">
                      Use Template
                    </button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Thank You Note</h4>
                  <p className="text-gray-600 text-sm mb-4">Post-meeting appreciation and next steps</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm">
                      Use Template
                    </button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm">
                      Edit
                    </button>
                  </div>
                </div>
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
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
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
    </div>
  );
};

export default RecruitmentDashboard;