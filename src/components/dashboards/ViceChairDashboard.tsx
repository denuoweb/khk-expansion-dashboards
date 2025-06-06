import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, Users, Activity, Calendar } from 'lucide-react';

const ViceChairDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kpi');

  const kpiMetrics = [
    { 
      name: 'Universities Contacted', 
      current: 47, 
      target: 50, 
      trend: '+12%',
      status: 'on-track',
      history: [32, 35, 41, 44, 47]
    },
    { 
      name: 'Positive Response Rate', 
      current: 23, 
      target: 30, 
      trend: '+8%',
      status: 'behind',
      history: [18, 19, 20, 21, 23]
    },
    { 
      name: 'Campus Visits', 
      current: 12, 
      target: 15, 
      trend: '+4%',
      status: 'on-track',
      history: [8, 9, 10, 11, 12]
    },
    { 
      name: 'Colony Applications', 
      current: 5, 
      target: 8, 
      trend: '+25%',
      status: 'behind',
      history: [3, 3, 4, 4, 5]
    }
  ];

  const riskRegister = [
    {
      risk: 'Low University Interest',
      description: 'Limited responses to outreach efforts',
      impact: 'High',
      likelihood: 'Medium',
      mitigation: 'Enhance outreach strategy with personalized approach',
      owner: 'Recruitment Coordinator',
      reviewDate: '2024-01-15',
      status: 'Active'
    },
    {
      risk: 'Legal Compliance Issues',
      description: 'Non-compliance with university rules',
      impact: 'High',
      likelihood: 'Low',
      mitigation: 'Regular compliance audits and policy reviews',
      owner: 'Compliance Officer',
      reviewDate: '2024-01-20',
      status: 'Monitored'
    },
    {
      risk: 'Budget Overrun',
      description: 'Exceeding allocated expansion budget',
      impact: 'Medium',
      likelihood: 'Medium',
      mitigation: 'Weekly budget reviews and expense approval process',
      owner: 'Treasurer',
      reviewDate: '2024-01-10',
      status: 'Active'
    }
  ];

  const successionPlan = [
    {
      role: 'Chair',
      incumbent: 'Current Officer',
      successor: 'Vice-Chair (Ready)',
      backupSuccessor: 'Secretary (Training)',
      readiness: 90
    },
    {
      role: 'Vice-Chair',
      incumbent: 'Current Officer',
      successor: 'Data Analytics Manager (Ready)',
      backupSuccessor: 'Marketing Specialist (Training)',
      readiness: 75
    },
    {
      role: 'Recruitment Coordinator',
      incumbent: 'Current Officer',
      successor: 'Chapter Development Officer (Training)',
      backupSuccessor: 'TBD',
      readiness: 60
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Vice-Chair Dashboard</h2>
        <p className="text-indigo-100">KPI tracking, risk management, and succession planning oversight.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'kpi', name: 'KPI Tracking', icon: Target },
              { id: 'risk', name: 'Risk Register', icon: AlertTriangle },
              { id: 'succession', name: 'Succession Planning', icon: Users }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
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
          {activeTab === 'kpi' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">KPI Dashboard</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Activity className="h-4 w-4" />
                  <span>Last updated: 2 hours ago</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {kpiMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{metric.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        metric.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {metric.status === 'on-track' ? 'On Track' : 'Behind'}
                      </span>
                    </div>
                    
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{metric.current}</span>
                      <span className="text-sm text-gray-500">/ {metric.target}</span>
                      <span className="text-sm text-green-600 font-medium">{metric.trend}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.status === 'on-track' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${(metric.current / metric.target) * 100}%` }}
                      ></div>
                    </div>

                    {/* Mini trend chart */}
                    <div className="flex items-end space-x-1 justify-between h-8">
                      {metric.history.map((value, i) => (
                        <div
                          key={i}
                          className="bg-indigo-200 rounded-sm flex-1"
                          style={{ 
                            height: `${(value / Math.max(...metric.history)) * 100}%`,
                            minHeight: '4px'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Risk Register</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Add New Risk
                </button>
              </div>

              <div className="space-y-4">
                {riskRegister.map((risk, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{risk.risk}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        risk.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {risk.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{risk.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Impact:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          risk.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {risk.impact}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Likelihood:</span>
                        <span className="ml-2 text-gray-600">{risk.likelihood}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Owner:</span>
                        <span className="ml-2 text-gray-600">{risk.owner}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Review:</span>
                        <span className="ml-2 text-gray-600">{risk.reviewDate}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-900">Mitigation: </span>
                      <span className="text-blue-800">{risk.mitigation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'succession' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Succession Planning</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Update Plans
                </button>
              </div>

              <div className="space-y-4">
                {successionPlan.map((plan, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-900">{plan.role}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Readiness:</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              plan.readiness >= 80 ? 'bg-green-500' : 
                              plan.readiness >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${plan.readiness}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{plan.readiness}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Current:</span>
                        <p className="text-gray-600">{plan.incumbent}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Primary Successor:</span>
                        <p className="text-gray-600">{plan.successor}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Backup Successor:</span>
                        <p className="text-gray-600">{plan.backupSuccessor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViceChairDashboard;