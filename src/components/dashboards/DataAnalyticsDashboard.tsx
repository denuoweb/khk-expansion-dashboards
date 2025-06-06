import React, { useState } from 'react';
import { BarChart3, TrendingUp, Database, Download, Filter, RefreshCw, Plus, Eye, X, Search } from 'lucide-react';

const DataAnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kpi-analytics');
  const [showKPIModal, setShowKPIModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [showDataSourceModal, setShowDataSourceModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [kpiAnalytics, setKpiAnalytics] = useState([
    {
      metric: 'Universities Contacted',
      current: 47,
      target: 50,
      trend: '+12%',
      status: 'on-track',
      history: [32, 35, 41, 44, 47],
      forecast: [48, 50, 52],
      lastUpdated: '2024-01-08'
    },
    {
      metric: 'Positive Response Rate',
      current: 48.9,
      target: 60,
      trend: '+8%',
      status: 'behind',
      history: [35, 38, 42, 45, 48.9],
      forecast: [52, 55, 58],
      lastUpdated: '2024-01-08'
    },
    {
      metric: 'Campus Visits Completed',
      current: 12,
      target: 15,
      trend: '+33%',
      status: 'on-track',
      history: [6, 7, 9, 10, 12],
      forecast: [13, 15, 16],
      lastUpdated: '2024-01-08'
    },
    {
      metric: 'Colony Success Rate',
      current: 75,
      target: 80,
      trend: '+5%',
      status: 'on-track',
      history: [65, 68, 70, 72, 75],
      forecast: [77, 79, 82],
      lastUpdated: '2024-01-08'
    }
  ]);

  const [universityData, setUniversityData] = useState([
    {
      id: 1,
      name: 'University of Michigan',
      state: 'Michigan',
      enrollment: 47000,
      greekLife: 'Strong',
      engineeringProgram: 'Top 10',
      competitorPresence: 'High',
      potentialScore: 85,
      contactStatus: 'Active',
      lastContact: '2024-01-08'
    },
    {
      id: 2,
      name: 'Ohio State University',
      state: 'Ohio',
      enrollment: 61000,
      greekLife: 'Very Strong',
      engineeringProgram: 'Top 20',
      competitorPresence: 'Medium',
      potentialScore: 92,
      contactStatus: 'Follow-up',
      lastContact: '2024-01-05'
    },
    {
      id: 3,
      name: 'Penn State University',
      state: 'Pennsylvania',
      enrollment: 46000,
      greekLife: 'Strong',
      engineeringProgram: 'Top 15',
      competitorPresence: 'Low',
      potentialScore: 88,
      contactStatus: 'Contacted',
      lastContact: '2024-01-03'
    },
    {
      id: 4,
      name: 'Georgia Tech',
      state: 'Georgia',
      enrollment: 36000,
      greekLife: 'Moderate',
      engineeringProgram: 'Top 5',
      competitorPresence: 'High',
      potentialScore: 78,
      contactStatus: 'Research',
      lastContact: '2024-01-07'
    },
    {
      id: 5,
      name: 'Purdue University',
      state: 'Indiana',
      enrollment: 45000,
      greekLife: 'Strong',
      engineeringProgram: 'Top 10',
      competitorPresence: 'Medium',
      potentialScore: 89,
      contactStatus: 'Active',
      lastContact: '2024-01-06'
    }
  ]);

  const [dataSourcesStatus, setDataSourcesStatus] = useState([
    { 
      id: 1,
      source: 'IPEDS Database', 
      status: 'Connected', 
      lastSync: '2024-01-08 09:00', 
      records: 4500,
      reliability: 98,
      updateFrequency: 'Daily'
    },
    { 
      id: 2,
      source: 'NPC/IFC Reports', 
      status: 'Connected', 
      lastSync: '2024-01-07 15:30', 
      records: 1200,
      reliability: 95,
      updateFrequency: 'Weekly'
    },
    { 
      id: 3,
      source: 'University Websites', 
      status: 'Updating', 
      lastSync: '2024-01-08 12:00', 
      records: 890,
      reliability: 87,
      updateFrequency: 'Daily'
    },
    { 
      id: 4,
      source: 'Internal CRM', 
      status: 'Connected', 
      lastSync: '2024-01-08 14:30', 
      records: 350,
      reliability: 99,
      updateFrequency: 'Real-time'
    },
    { 
      id: 5,
      source: 'Social Media APIs', 
      status: 'Connected', 
      lastSync: '2024-01-08 16:00', 
      records: 2100,
      reliability: 92,
      updateFrequency: 'Hourly'
    }
  ]);

  const [reportTemplates, setReportTemplates] = useState([
    { 
      id: 1,
      name: 'Weekly KPI Summary', 
      frequency: 'Weekly', 
      lastGenerated: '2024-01-08', 
      recipients: 5,
      format: 'PDF',
      automation: true
    },
    { 
      id: 2,
      name: 'Monthly Progress Report', 
      frequency: 'Monthly', 
      lastGenerated: '2024-01-01', 
      recipients: 8,
      format: 'Excel',
      automation: true
    },
    { 
      id: 3,
      name: 'University Research Brief', 
      frequency: 'On-demand', 
      lastGenerated: '2024-01-05', 
      recipients: 3,
      format: 'PDF',
      automation: false
    },
    { 
      id: 4,
      name: 'Quarterly Analytics Review', 
      frequency: 'Quarterly', 
      lastGenerated: '2023-12-31', 
      recipients: 12,
      format: 'PowerPoint',
      automation: true
    },
    { 
      id: 5,
      name: 'Risk Assessment Data', 
      frequency: 'Bi-weekly', 
      lastGenerated: '2024-01-07', 
      recipients: 6,
      format: 'Excel',
      automation: true
    }
  ]);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleRefreshData = () => {
    setKpiAnalytics(prev => prev.map(kpi => ({
      ...kpi,
      lastUpdated: new Date().toISOString().split('T')[0]
    })));
    addNotification('All data sources refreshed successfully');
  };

  const handleExportData = (format: string) => {
    addNotification(`Data exported in ${format} format`);
  };

  const handleGenerateReport = (reportId: number) => {
    setReportTemplates(prev => prev.map(report => 
      report.id === reportId ? { 
        ...report, 
        lastGenerated: new Date().toISOString().split('T')[0]
      } : report
    ));
    addNotification('Report generated successfully');
  };

  // KPI Analytics Modal
  const KPIAnalyticsModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Advanced KPI Analytics</h2>
            <button
              onClick={() => setShowKPIModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleRefreshData}
                  className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </button>
                <button
                  onClick={() => handleExportData('Excel')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </button>
                <button
                  onClick={() => handleExportData('PDF')}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {kpiAnalytics[0]?.lastUpdated}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kpiAnalytics.map((kpi, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-gray-900">{kpi.metric}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      kpi.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {kpi.status === 'on-track' ? 'On Track' : 'Behind Target'}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-3xl font-bold text-gray-900">{kpi.current}</span>
                    <span className="text-lg text-gray-500">/ {kpi.target}</span>
                    <span className="text-sm text-green-600 font-medium">{kpi.trend}</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className={`h-3 rounded-full ${
                        kpi.status === 'on-track' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(kpi.current / kpi.target) * 100}%` }}
                    ></div>
                  </div>

                  {/* Historical trend chart */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Historical Trend (5 periods)</h5>
                    <div className="flex items-end space-x-1 justify-between h-16">
                      {kpi.history.map((value, i) => (
                        <div
                          key={i}
                          className="bg-cyan-200 rounded-sm flex-1"
                          style={{ 
                            height: `${(value / Math.max(...kpi.history)) * 100}%`,
                            minHeight: '8px'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Forecast */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Forecast (3 periods)</h5>
                    <div className="flex items-end space-x-1 justify-between h-12">
                      {kpi.forecast.map((value, i) => (
                        <div
                          key={i}
                          className="bg-blue-300 rounded-sm flex-1 opacity-60"
                          style={{ 
                            height: `${(value / Math.max(...kpi.forecast)) * 100}%`,
                            minHeight: '6px'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => addNotification(`${kpi.metric} details viewed`)}
                      className="flex-1 px-3 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 text-sm"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => addNotification(`Alert set for ${kpi.metric}`)}
                      className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Set Alert
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Predictive Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Projected Q1 Performance</h4>
                  <p className="text-2xl font-bold text-blue-600">87%</p>
                  <p className="text-sm text-gray-600">Target achievement rate</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Risk Factors</h4>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-gray-600">Potential roadblocks identified</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Optimization Score</h4>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-sm text-gray-600">Process efficiency rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // University Research Modal
  const UniversityResearchModal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterState, setFilterState] = useState('all');

    const filteredUniversities = universityData.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = filterState === 'all' || uni.state === filterState;
      return matchesSearch && matchesState;
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">University Research Database</h2>
            <button
              onClick={() => setShowUniversityModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search universities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All States</option>
                  <option value="Michigan">Michigan</option>
                  <option value="Ohio">Ohio</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Indiana">Indiana</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => addNotification('University data refreshed')}
                  className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </button>
                <button
                  onClick={() => handleExportData('CSV')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUniversities.map((university) => (
                    <tr key={university.id} className="hover:bg-gray-50">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          university.contactStatus === 'Active' ? 'bg-blue-100 text-blue-800' :
                          university.contactStatus === 'Follow-up' ? 'bg-yellow-100 text-yellow-800' :
                          university.contactStatus === 'Contacted' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {university.contactStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Data Sources Modal
  const DataSourcesModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Data Sources Management</h2>
            <button
              onClick={() => setShowDataSourceModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Active Data Sources</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => addNotification('All data sources synchronized')}
                  className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All Sources
                </button>
                <button
                  onClick={() => addNotification('New data source configuration opened')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Source
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {dataSourcesStatus.map((source) => (
                <div key={source.id} className="border border-gray-200 rounded-lg p-4">
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
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Records:</span>
                      <span className="font-medium">{source.records.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reliability:</span>
                      <span className="font-medium">{source.reliability}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Update Frequency:</span>
                      <span className="font-medium">{source.updateFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Sync:</span>
                      <span className="font-medium">{source.lastSync}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addNotification(`${source.source} synchronized`)}
                      className="flex-1 px-3 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 text-sm"
                    >
                      Sync Now
                    </button>
                    <button
                      onClick={() => addNotification(`${source.source} configuration opened`)}
                      className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Data Quality Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">94.8%</div>
                  <div className="text-sm text-gray-600">Overall Reliability</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8.9K</div>
                  <div className="text-sm text-gray-600">Total Records</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-gray-600">Active Sources</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">99.2%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Report Management Modal
  const ReportManagementModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Report Management System</h2>
            <button
              onClick={() => setShowReportModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Automated Reports</h3>
              <button
                onClick={() => addNotification('New report template created')}
                className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {reportTemplates.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{report.frequency}</span>
                      <span>Last: {report.lastGenerated}</span>
                      <span>{report.recipients} recipients</span>
                      <span>{report.format}</span>
                      {report.automation && (
                        <span className="text-green-600 font-medium">Automated</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleGenerateReport(report.id)}
                      className="px-3 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded text-sm"
                    >
                      Generate Now
                    </button>
                    <button
                      onClick={() => addNotification(`${report.name} configuration opened`)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-4">Report Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Total Reports Generated:</span>
                    <span className="font-medium text-blue-900">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Automated Reports:</span>
                    <span className="font-medium text-blue-900">{reportTemplates.filter(r => r.automation).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Total Recipients:</span>
                    <span className="font-medium text-blue-900">{reportTemplates.reduce((sum, r) => sum + r.recipients, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Success Rate:</span>
                    <span className="font-medium text-blue-900">98.5%</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => addNotification('Executive summary generated')}
                    className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    Generate Executive Summary
                  </button>
                  <button
                    onClick={() => addNotification('KPI dashboard exported')}
                    className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    Export KPI Dashboard
                  </button>
                  <button
                    onClick={() => addNotification('University analysis report created')}
                    className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                  >
                    University Analysis Report
                  </button>
                  <button
                    onClick={() => addNotification('Custom report builder opened')}
                    className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                  >
                    Custom Report Builder
                  </button>
                </div>
              </div>
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
              <p className="text-2xl font-bold text-gray-900">{dataSourcesStatus.length}</p>
            </div>
            <Database className="h-8 w-8 text-cyan-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{(dataSourcesStatus.reduce((sum, s) => sum + s.records, 0) / 1000).toFixed(1)}K</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Universities Analyzed</p>
              <p className="text-2xl font-bold text-gray-900">{universityData.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900">{reportTemplates.length}</p>
            </div>
            <Download className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowKPIModal(true)}
            className="flex items-center justify-center p-4 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            KPI Analytics
          </button>
          <button
            onClick={() => setShowUniversityModal(true)}
            className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Database className="h-5 w-5 mr-2" />
            University Research
          </button>
          <button
            onClick={() => setShowDataSourceModal(true)}
            className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Data Sources
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center justify-center p-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Generate Reports
          </button>
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
                  <button 
                    onClick={() => addNotification('KPI filters applied')}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button 
                    onClick={() => setShowKPIModal(true)}
                    className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Advanced Analytics
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
                  <button 
                    onClick={() => addNotification('Advanced filters applied')}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filter
                  </button>
                  <button 
                    onClick={() => setShowUniversityModal(true)}
                    className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Database
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
                    {universityData.slice(0, 4).map((university) => (
                      <tr key={university.id} className="hover:bg-gray-50">
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
                <button 
                  onClick={() => setShowDataSourceModal(true)}
                  className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Manage Sources
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataSourcesStatus.slice(0, 4).map((source) => (
                  <div key={source.id} className="border border-gray-200 rounded-lg p-4">
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
                        <span>Reliability:</span>
                        <span className="font-medium">{source.reliability}%</span>
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
                  {reportTemplates.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-white rounded border">
                      <div>
                        <h5 className="font-medium text-gray-900">{report.name}</h5>
                        <p className="text-sm text-gray-600">
                          {report.frequency} • Last: {report.lastGenerated} • {report.recipients} recipients
                        </p>
                      </div>
                      <button 
                        onClick={() => handleGenerateReport(report.id)}
                        className="px-3 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded text-sm"
                      >
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

      {/* Modals */}
      {showKPIModal && <KPIAnalyticsModal />}
      {showUniversityModal && <UniversityResearchModal />}
      {showDataSourceModal && <DataSourcesModal />}
      {showReportModal && <ReportManagementModal />}
    </div>
  );
};

export default DataAnalyticsDashboard;