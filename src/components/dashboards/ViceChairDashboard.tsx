import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, Users, Activity, Plus, Edit, Download, RefreshCw, X, Trash2 } from 'lucide-react';

const ViceChairDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kpi');
  const [showKPIModal, setShowKPIModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showSuccessionModal, setShowSuccessionModal] = useState(false);
  const [showAddRiskModal, setShowAddRiskModal] = useState(false);
  const [editingRisk, setEditingRisk] = useState<any>(null);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [kpiMetrics, setKpiMetrics] = useState([
    { 
      name: 'Universities Contacted', 
      current: 47, 
      target: 50, 
      trend: '+12%',
      status: 'on-track',
      history: [32, 35, 41, 44, 47],
      lastUpdated: '2024-01-08'
    },
    { 
      name: 'Positive Response Rate', 
      current: 23, 
      target: 30, 
      trend: '+8%',
      status: 'behind',
      history: [18, 19, 20, 21, 23],
      lastUpdated: '2024-01-08'
    },
    { 
      name: 'Campus Visits', 
      current: 12, 
      target: 15, 
      trend: '+4%',
      status: 'on-track',
      history: [8, 9, 10, 11, 12],
      lastUpdated: '2024-01-08'
    },
    { 
      name: 'Colony Applications', 
      current: 5, 
      target: 8, 
      trend: '+25%',
      status: 'behind',
      history: [3, 3, 4, 4, 5],
      lastUpdated: '2024-01-08'
    }
  ]);

  const [riskRegister, setRiskRegister] = useState([
    {
      id: '1',
      risk: 'Low University Interest',
      description: 'Limited responses to outreach efforts',
      impact: 'High',
      likelihood: 'Medium',
      mitigation: 'Enhance outreach strategy with personalized approach',
      owner: 'Recruitment Coordinator',
      reviewDate: '2024-01-15',
      status: 'Active',
      createdDate: '2024-01-01'
    },
    {
      id: '2',
      risk: 'Legal Compliance Issues',
      description: 'Non-compliance with university rules',
      impact: 'High',
      likelihood: 'Low',
      mitigation: 'Regular compliance audits and policy reviews',
      owner: 'Compliance Officer',
      reviewDate: '2024-01-20',
      status: 'Monitored',
      createdDate: '2024-01-02'
    },
    {
      id: '3',
      risk: 'Budget Overrun',
      description: 'Exceeding allocated expansion budget',
      impact: 'Medium',
      likelihood: 'Medium',
      mitigation: 'Weekly budget reviews and expense approval process',
      owner: 'Treasurer',
      reviewDate: '2024-01-10',
      status: 'Active',
      createdDate: '2024-01-03'
    }
  ]);

  const [successionPlan, setSuccessionPlan] = useState([
    {
      id: '1',
      role: 'Chair',
      incumbent: 'Current Officer',
      successor: 'Vice-Chair (Ready)',
      backupSuccessor: 'Secretary (Training)',
      readiness: 90,
      trainingPlan: 'Leadership development, NEC protocols',
      timeline: '3 months'
    },
    {
      id: '2',
      role: 'Vice-Chair',
      incumbent: 'Current Officer',
      successor: 'Data Analytics Manager (Ready)',
      backupSuccessor: 'Marketing Specialist (Training)',
      readiness: 75,
      trainingPlan: 'KPI management, risk assessment',
      timeline: '4 months'
    },
    {
      id: '3',
      role: 'Recruitment Coordinator',
      incumbent: 'Current Officer',
      successor: 'Chapter Development Officer (Training)',
      backupSuccessor: 'TBD',
      readiness: 60,
      trainingPlan: 'Outreach strategies, university relations',
      timeline: '6 months'
    }
  ]);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleRefreshKPIs = () => {
    const updatedMetrics = kpiMetrics.map(metric => ({
      ...metric,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
    setKpiMetrics(updatedMetrics);
    addNotification('KPI data refreshed successfully');
  };

  const handleExportKPIs = () => {
    addNotification('KPI report exported to Downloads folder');
  };

  const handleAddRisk = (riskData: any) => {
    const newRisk = {
      ...riskData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0]
    };
    setRiskRegister(prev => [...prev, newRisk]);
    setShowAddRiskModal(false);
    addNotification('New risk added to register');
  };

  const handleUpdateRisk = (riskData: any) => {
    setRiskRegister(prev => prev.map(risk => 
      risk.id === editingRisk.id ? { ...risk, ...riskData } : risk
    ));
    setEditingRisk(null);
    setShowRiskModal(false);
    addNotification('Risk updated successfully');
  };

  const handleDeleteRisk = (riskId: string) => {
    setRiskRegister(prev => prev.filter(risk => risk.id !== riskId));
    addNotification('Risk removed from register');
  };

  const handleUpdateSuccession = (planData: any) => {
    setSuccessionPlan(prev => prev.map(plan => 
      plan.id === planData.id ? { ...plan, ...planData } : plan
    ));
    setShowSuccessionModal(false);
    addNotification('Succession plan updated');
  };

  // KPI Details Modal Component
  const KPIDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">KPI Analytics Dashboard</h2>
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
                onClick={handleRefreshKPIs}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </button>
              <button
                onClick={handleExportKPIs}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {kpiMetrics[0]?.lastUpdated}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpiMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    metric.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {metric.status === 'on-track' ? 'On Track' : 'Behind'}
                  </span>
                </div>
                
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">{metric.current}</span>
                  <span className="text-lg text-gray-500">/ {metric.target}</span>
                  <span className="text-sm text-green-600 font-medium">{metric.trend}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className={`h-3 rounded-full ${
                      metric.status === 'on-track' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(metric.current / metric.target) * 100}%` }}
                  ></div>
                </div>

                {/* Historical trend chart */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Historical Trend</h5>
                  <div className="flex items-end space-x-1 justify-between h-16">
                    {metric.history.map((value, i) => (
                      <div
                        key={i}
                        className="bg-indigo-200 rounded-sm flex-1"
                        style={{ 
                          height: `${(value / Math.max(...metric.history)) * 100}%`,
                          minHeight: '8px'
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5 periods ago</span>
                    <span>Current</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 text-sm">
                    View Details
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                    Set Alert
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Add Risk Modal Component
  const AddRiskModal = () => {
    const [formData, setFormData] = useState({
      risk: '',
      description: '',
      impact: 'Medium',
      likelihood: 'Medium',
      mitigation: '',
      owner: '',
      reviewDate: '',
      status: 'Active'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAddRisk(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add New Risk</h2>
            <button
              onClick={() => setShowAddRiskModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Risk Title</label>
              <input
                type="text"
                value={formData.risk}
                onChange={(e) => setFormData(prev => ({ ...prev, risk: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Impact</label>
                <select
                  value={formData.impact}
                  onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Likelihood</label>
                <select
                  value={formData.likelihood}
                  onChange={(e) => setFormData(prev => ({ ...prev, likelihood: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mitigation Strategy</label>
              <textarea
                value={formData.mitigation}
                onChange={(e) => setFormData(prev => ({ ...prev, mitigation: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
                <input
                  type="text"
                  value={formData.owner}
                  onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Date</label>
                <input
                  type="date"
                  value={formData.reviewDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, reviewDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddRiskModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Risk
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Succession Planning Modal Component
  const SuccessionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Succession Planning Management</h2>
          <button
            onClick={() => setShowSuccessionModal(false)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {successionPlan.map((plan) => (
              <div key={plan.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-900 text-lg">{plan.role}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Readiness:</span>
                    <div className="w-24 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          plan.readiness >= 80 ? 'bg-green-500' : 
                          plan.readiness >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${plan.readiness}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{plan.readiness}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Current:</span>
                    <p className="text-gray-600">{plan.incumbent}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Primary Successor:</span>
                    <p className="text-gray-600">{plan.successor}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Backup:</span>
                    <p className="text-gray-600">{plan.backupSuccessor}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Timeline:</span>
                    <p className="text-gray-600">{plan.timeline}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-medium text-gray-700">Training Plan:</span>
                  <p className="text-gray-600 mt-1">{plan.trainingPlan}</p>
                </div>

                <div className="flex space-x-2">
                  <button className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 text-sm">
                    Update Plan
                  </button>
                  <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm">
                    Schedule Training
                  </button>
                  <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
                    Assessment
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => addNotification('Succession plans exported successfully')}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Activity className="h-4 w-4" />
                    <span>Last updated: 2 hours ago</span>
                  </div>
                  <button
                    onClick={() => setShowKPIModal(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Details
                  </button>
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

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleRefreshKPIs}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                  >
                    Refresh Data
                  </button>
                  <button
                    onClick={handleExportKPIs}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm"
                  >
                    Export Report
                  </button>
                  <button
                    onClick={() => addNotification('KPI alerts configured')}
                    className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm"
                  >
                    Set Alerts
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Risk Register</h3>
                <button
                  onClick={() => setShowAddRiskModal(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Risk
                </button>
              </div>

              <div className="space-y-4">
                {riskRegister.map((risk) => (
                  <div key={risk.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{risk.risk}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          risk.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {risk.status}
                        </span>
                        <button
                          onClick={() => {
                            setEditingRisk(risk);
                            setShowRiskModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRisk(risk.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{risk.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Impact:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          risk.impact === 'High' ? 'bg-red-100 text-red-800' : 
                          risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
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
                <button
                  onClick={() => setShowSuccessionModal(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Plans
                </button>
              </div>

              <div className="space-y-4">
                {successionPlan.map((plan) => (
                  <div key={plan.id} className="bg-gray-50 rounded-lg p-4">
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

      {/* Modals */}
      {showKPIModal && <KPIDetailsModal />}
      {showAddRiskModal && <AddRiskModal />}
      {showSuccessionModal && <SuccessionModal />}
    </div>
  );
};

export default ViceChairDashboard;