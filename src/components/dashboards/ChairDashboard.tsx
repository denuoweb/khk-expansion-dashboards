import React from 'react';
import { Users, Target, TrendingUp, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

const ChairDashboard: React.FC = () => {
  const kpiData = [
    { label: 'Universities Contacted', value: 47, target: 50, percentage: 94 },
    { label: 'Positive Response Rate', value: 23, target: 30, percentage: 77 },
    { label: 'Campus Visits Completed', value: 12, target: 15, percentage: 80 },
    { label: 'New Colony Applications', value: 5, target: 8, percentage: 63 },
    { label: 'Colonies Successfully Chartered', value: 2, target: 3, percentage: 67 },
    { label: 'Membership Growth (Quarterly)', value: 156, target: 200, percentage: 78 }
  ];

  const roleProgress = [
    { role: 'Vice-Chair', status: 'On Track', tasks: 8, completed: 6, color: 'green' },
    { role: 'Secretary', status: 'On Track', tasks: 5, completed: 5, color: 'green' },
    { role: 'Marketing Specialist', status: 'Behind', tasks: 12, completed: 8, color: 'yellow' },
    { role: 'Recruitment Coordinator', status: 'On Track', tasks: 15, completed: 12, color: 'green' },
    { role: 'Chapter Development', status: 'At Risk', tasks: 10, completed: 6, color: 'red' },
    { role: 'Compliance Officer', status: 'On Track', tasks: 7, completed: 7, color: 'green' },
    { role: 'Data Analytics Manager', status: 'On Track', tasks: 9, completed: 8, color: 'green' },
  ];

  const upcomingDeadlines = [
    { task: 'NEC Quarterly Report', due: '2024-01-15', priority: 'High' },
    { task: 'University of Michigan Follow-up', due: '2024-01-10', priority: 'Medium' },
    { task: 'Ohio State Colony Charter Review', due: '2024-01-20', priority: 'High' },
    { task: 'Budget Review Meeting', due: '2024-01-12', priority: 'Medium' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Chair!</h2>
        <p className="text-blue-100">Here's an overview of the expansion progress across all officer positions.</p>
      </div>

      {/* KPI Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Key Performance Indicators</h3>
          <Target className="h-6 w-6 text-blue-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
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
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    kpi.percentage >= 90 ? 'bg-green-500' :
                    kpi.percentage >= 70 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${kpi.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Progress Tracking */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Officer Role Progress</h3>
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            {roleProgress.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{role.role}</h4>
                  <p className="text-sm text-gray-600">{role.completed}/{role.tasks} tasks completed</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        role.color === 'green' ? 'bg-green-500' :
                        role.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(role.completed / role.tasks) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    role.color === 'green' ? 'bg-green-100 text-green-800' :
                    role.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {role.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Upcoming Deadlines</h3>
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{deadline.task}</h4>
                  <p className="text-sm text-gray-600">Due: {deadline.due}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    deadline.priority === 'High' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {deadline.priority}
                  </span>
                  {deadline.priority === 'High' ? 
                    <AlertCircle className="h-4 w-4 text-red-500" /> :
                    <CheckCircle className="h-4 w-4 text-yellow-500" />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            <span className="font-medium text-blue-700">Generate NEC Report</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Users className="h-6 w-6 text-green-600 mr-2" />
            <span className="font-medium text-green-700">Schedule Team Meeting</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Target className="h-6 w-6 text-purple-600 mr-2" />
            <span className="font-medium text-purple-700">Review KPI Targets</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
            <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
            <span className="font-medium text-yellow-700">View Issues & Risks</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChairDashboard;