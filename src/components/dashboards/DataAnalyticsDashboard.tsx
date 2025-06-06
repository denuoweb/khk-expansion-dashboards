import React, { useState } from 'react';
import { BarChart3, TrendingUp, Database, Download, Filter, RefreshCw } from 'lucide-react';

const DataAnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kpi-analytics');

  const kpiAnalytics = [
    {
      metric: 'Universities Contacted',
      current: 47,
      target: 50,
      trend: '+12%',
      status: 'on-track',
      history: [32, 35, 41, 44, 47],
      forecast: [48, 50, 52]
    },
    {
      metric: 'Positive Response Rate',
      current: 48.9,
      target: 60,
      trend: '+8%',
      status: 'behind',
      history: [35, 38, 42, 45, 48.9],
      forecast: [52, 55, 58]
    },
    {
      metric: 'Campus Visits Completed',
      current: 12,
      target: 15,
      trend: '+33%',
      status: 'on-track',
      history: [6, 7, 9, 10, 12],
      forecast: [13, 15, 16]
    },
    {
      metric: 'Colony Success Rate',
      current: 75,
      target: 80,
      trend: '+5%',
      status: 'on-track',
      history: [65, 68, 70, 72, 75],
      forecast: [77, 79, 82]
    }
  ];

  const universityData = [
    {
      name: 'University of Michigan',
      state: 'Michigan',
      enrollment: 47000,
      greekLife: 'Strong',
      engineeringProgram: 'Top 10',
      competitorPresence: 'High',
      potentialScore: 85
    },
    {
      name: 'Ohio State University',
      state: 'Ohio',
      enrollment: 61000,
      greekLife: 'Very Strong',
      engineeringProgram: 'Top 20',
      competitorPresence: 'Medium',
      potentialScore: 92
    },
    {
      name: 'Penn State University',
      state: 'Pennsylvania',
      enrollment: 46000,
      greekLife: 'Strong',
      engineeringProgram: 'Top 15',
      competitorPresence: 'Low',
      potentialScore: 88
    },
    {
      name: 'Georgia Tech',
      state: 'Georgia',
      enrollment: 36000,
      greekLife: 'Moderate',
      engineeringProgram: 'Top 5',
      competitorPresence: 'High',
      potentialScore: 78
    }
  ];

  const dataSourcesStatus = [
    { source: 'IPEDS Database', status: 'Connected', lastSync: '2024-01-08 09:00', records: 4500 },
    { source: 'NPC/IFC Reports', status: 'Connected', lastSync: '2024-01-07 15:30', records: 1200 },
    { source: 'University Websites', status: 'Updating', lastSync: '2024-01-08 12:00', records: 890 },
    { source: 'Internal CRM', status: 'Connected', lastSync: '2024-01-08 14:30', records: 350 }
  ];

  const reportTemplates = [
    { name: 'Weekly KPI Summary', frequency: 'Weekly', lastGenerated: '2024-01-08', recipients: 5 },
    { name: 'Monthly Progress Report', frequency: 'Monthly', lastGenerated: '2024-01-01', recipients: 8 },
    { name: 'University Research Brief', frequency: 'On-demand', lastGenerated: '2024-01-05', recipients: 3 },
    { name: 'Quarterly Analytics Review', frequency: 'Quarterly', lastGenerated: '2023-12-31', recipients: 12 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Data Analytics Dashboard</h2>
        <p className="text-cyan-100">KPI analysis, university research, and data-driven insights for expansion strategy.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Sources</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <Database className="h-8 w-8 text-cyan-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">6.9K</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Universities Analyzed</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <Download className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'kpi-analytics', name: 'KPI Analytics', icon: BarChart3 },
              { id: 'university-research', name: 'University Research', icon: Database },
              { id: 'data-sources', name: 'Data Sources', icon: RefreshCw }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600'
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
          {activeTab === 'kpi-analytics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">KPI Performance Analytics</h3>
                <div className="flex space-x-3">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {kpiAnalytics.map((kpi, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-900">{kpi.metric}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        kpi.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {kpi.status === 'on-track' ? 'On Track' : 'Behind Target'}
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">{kpi.current}</span>
                      <span className="text-sm text-gray-500">/ {kpi.target}</span>
                      <span className="text-sm text-green-600 font-medium">{kpi.trend}</span>
                    </div>

                    {/* Historical trend visualization */}
                    <div className="mb-4">
                      <div className="flex items-end space-x-1 justify-between h-12 mb-2">
                        {kpi.history.map((value, i) => (
                          <div
                            key={i}
                            className="bg-cyan-200 rounded-sm flex-1"
                            style={{ 
                              height: `${(value / Math.max(...kpi.history)) * 100}%`,
                              minHeight: '4px'
                            }}
                          ></div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">Historical Performance (5 periods)</p>
                    </div>

                    {/* Forecast */}
                    <div>
                      <div className="flex items-end space-x-1 justify-between h-8 mb-2">
                        {kpi.forecast.map((value, i) => (
                          <div
                            key={i}
                            className="bg-blue-300 rounded-sm flex-1 opacity-60"
                            style={{ 
                              height: `${(value / Math.max(...kpi.forecast)) * 100}%`,
                              minHeight: '4px'
                            }}
                          ></div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">Forecast (3 periods)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'university-research' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">University Research Database</h3>
                <div className="flex space-x-3">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        University
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrollment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Greek Life
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Engineering
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Competition
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Potential Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {universityData.map((university, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{university.name}</div>
                            <div className="text-sm text-gray-500">{university.state}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {university.enrollment.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            university.greekLife === 'Very Strong' ? 'bg-green-100 text-green-800' :
                            university.greekLife === 'Strong' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {university.greekLife}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {university.engineeringProgram}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            university.competitorPresence === 'Low' ? 'bg-green-100 text-green-800' :
                            university.competitorPresence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {university.competitorPresence}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  university.potentialScore >= 85 ? 'bg-green-500' :
                                  university.potentialScore >= 70 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${university.potentialScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{university.potentialScore}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'data-sources' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Data Sources Management</h3>
                <button className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All Sources
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataSourcesStatus.map((source, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{source.source}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        source.status === 'Connected' ? 'bg-green-100 text-green-800' :
                        source.status === 'Updating' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {source.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Records:</span>
                        <span className="font-medium">{source.records.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Sync:</span>
                        <span className="font-medium">{source.lastSync}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Automated Reports</h4>
                <div className="space-y-3">
                  {reportTemplates.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <h5 className="font-medium text-gray-900">{report.name}</h5>
                        <p className="text-sm text-gray-600">
                          {report.frequency} • Last: {report.lastGenerated} • {report.recipients} recipients
                        </p>
                      </div>
                      <button className="px-3 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded text-sm">
                        Generate Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataAnalyticsDashboard;