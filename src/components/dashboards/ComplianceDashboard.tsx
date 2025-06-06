import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Calendar, Users, Plus, Edit, X, Save, Eye, Download, Upload, TrendingUp, Clock } from 'lucide-react';

const ComplianceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('risk-assessment');
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showAddRiskModal, setShowAddRiskModal] = useState(false);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [editingRisk, setEditingRisk] = useState<any>(null);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [riskAssessments, setRiskAssessments] = useState([
    {
      id: '1',
      university: 'University of Michigan',
      riskLevel: 'Low',
      lastReview: '2024-01-05',
      nextReview: '2024-04-05',
      issues: 0,
      compliance: 95,
      reviewer: 'Compliance Officer',
      riskScore: 15,
      mitigationPlan: 'Regular monitoring and compliance checks'
    },
    {
      id: '2',
      university: 'Ohio State University',
      riskLevel: 'Medium',
      lastReview: '2024-01-03',
      nextReview: '2024-03-03',
      issues: 2,
      compliance: 82,
      reviewer: 'Compliance Officer',
      riskScore: 45,
      mitigationPlan: 'Enhanced training and policy review'
    },
    {
      id: '3',
      university: 'Penn State University',
      riskLevel: 'High',
      lastReview: '2023-12-28',
      nextReview: '2024-01-28',
      issues: 5,
      compliance: 65,
      reviewer: 'External Consultant',
      riskScore: 75,
      mitigationPlan: 'Immediate intervention and corrective action plan'
    },
    {
      id: '4',
      university: 'Georgia Tech',
      riskLevel: 'Low',
      lastReview: '2024-01-06',
      nextReview: '2024-04-06',
      issues: 1,
      compliance: 92,
      reviewer: 'Compliance Officer',
      riskScore: 20,
      mitigationPlan: 'Standard monitoring procedures'
    }
  ]);

  const [policyReviews, setPolicyReviews] = useState([
    {
      id: 1,
      policy: 'Anti-Hazing Policy',
      university: 'University of Michigan',
      status: 'Current',
      lastUpdate: '2023-08-15',
      nextReview: '2024-08-15',
      compliance: 'Full',
      version: '2.1',
      approvedBy: 'University Administration'
    },
    {
      id: 2,
      policy: 'Title IX Requirements',
      university: 'Ohio State University',
      status: 'Under Review',
      lastUpdate: '2023-09-20',
      nextReview: '2024-01-20',
      compliance: 'Partial',
      version: '1.8',
      approvedBy: 'Pending'
    },
    {
      id: 3,
      policy: 'Insurance Coverage',
      university: 'Penn State University',
      status: 'Expired',
      lastUpdate: '2023-06-30',
      nextReview: '2024-01-15',
      compliance: 'Non-Compliant',
      version: '1.5',
      approvedBy: 'Insurance Provider'
    },
    {
      id: 4,
      policy: 'Student Organization Rules',
      university: 'University of Michigan',
      status: 'Current',
      lastUpdate: '2023-10-10',
      nextReview: '2024-10-10',
      compliance: 'Full',
      version: '3.2',
      approvedBy: 'Student Affairs'
    },
    {
      id: 5,
      policy: 'Risk Management Protocol',
      university: 'Georgia Tech',
      status: 'Current',
      lastUpdate: '2023-11-15',
      nextReview: '2024-05-15',
      compliance: 'Full',
      version: '2.0',
      approvedBy: 'Risk Management Office'
    }
  ]);

  const [complianceAudits, setComplianceAudits] = useState([
    {
      id: 1,
      date: '2024-01-08',
      type: 'Risk Assessment',
      scope: 'All Active Colonies',
      findings: 3,
      status: 'Completed',
      priority: 'Medium',
      auditor: 'Internal Team',
      duration: '2 weeks'
    },
    {
      id: 2,
      date: '2024-01-05',
      type: 'Policy Review',
      scope: 'University of Michigan',
      findings: 0,
      status: 'Completed',
      priority: 'Low',
      auditor: 'Compliance Officer',
      duration: '1 week'
    },
    {
      id: 3,
      date: '2024-01-15',
      type: 'Insurance Verification',
      scope: 'All Locations',
      findings: 1,
      status: 'Scheduled',
      priority: 'High',
      auditor: 'External Consultant',
      duration: '3 days'
    },
    {
      id: 4,
      date: '2024-01-20',
      type: 'Training Compliance',
      scope: 'Officer Training Programs',
      findings: 0,
      status: 'Scheduled',
      priority: 'Medium',
      auditor: 'Training Coordinator',
      duration: '1 week'
    }
  ]);

  const complianceMetrics = [
    { metric: 'Overall Compliance Rate', value: 81, target: 95, status: 'needs-improvement', trend: '+3%' },
    { metric: 'Policies Up to Date', value: 75, target: 100, status: 'needs-improvement', trend: '+5%' },
    { metric: 'Risk Assessments Current', value: 67, target: 100, status: 'critical', trend: '-2%' },
    { metric: 'Insurance Coverage', value: 100, target: 100, status: 'good', trend: '0%' }
  ];

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleAddRisk = (riskData: any) => {
    const newRisk = {
      ...riskData,
      id: Date.now().toString(),
      lastReview: new Date().toISOString().split('T')[0],
      reviewer: 'Compliance Officer'
    };
    setRiskAssessments(prev => [...prev, newRisk]);
    setShowAddRiskModal(false);
    addNotification('Risk assessment added successfully');
  };

  const handleUpdateRisk = (riskId: string, updates: any) => {
    setRiskAssessments(prev => prev.map(risk => 
      risk.id === riskId ? { ...risk, ...updates } : risk
    ));
    addNotification('Risk assessment updated');
  };

  const handleDeleteRisk = (riskId: string) => {
    setRiskAssessments(prev => prev.filter(risk => risk.id !== riskId));
    addNotification('Risk assessment deleted');
  };

  const handleUpdatePolicy = (policyId: number, updates: any) => {
    setPolicyReviews(prev => prev.map(policy => 
      policy.id === policyId ? { ...policy, ...updates } : policy
    ));
    addNotification('Policy updated successfully');
  };

  // Add Risk Modal
  const AddRiskModal = () => {
    const [formData, setFormData] = useState({
      university: '',
      riskLevel: 'Medium',
      issues: '',
      compliance: '',
      nextReview: '',
      riskScore: '',
      mitigationPlan: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAddRisk({
        ...formData,
        issues: parseInt(formData.issues),
        compliance: parseInt(formData.compliance),
        riskScore: parseInt(formData.riskScore)
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add Risk Assessment</h2>
            <button
              onClick={() => setShowAddRiskModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Enter university name..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, riskLevel: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.riskScore}
                  onChange={(e) => setFormData(prev => ({ ...prev, riskScore: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Outstanding Issues</label>
                <input
                  type="number"
                  min="0"
                  value={formData.issues}
                  onChange={(e) => setFormData(prev => ({ ...prev, issues: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.compliance}
                  onChange={(e) => setFormData(prev => ({ ...prev, compliance: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Next Review Date</label>
              <input
                type="date"
                value={formData.nextReview}
                onChange={(e) => setFormData(prev => ({ ...prev, nextReview: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mitigation Plan</label>
              <textarea
                value={formData.mitigationPlan}
                onChange={(e) => setFormData(prev => ({ ...prev, mitigationPlan: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Describe mitigation strategies..."
                required
              />
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
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Add Assessment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Compliance Dashboard Modal
  const ComplianceDashboardModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Comprehensive Compliance Dashboard</h2>
            <button
              onClick={() => setShowComplianceModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {complianceMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                    {metric.status === 'good' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className={`h-5 w-5 ${
                        metric.status === 'critical' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                    )}
                  </div>
                  <div className="flex items-baseline space-x-2 mb-2">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}%</p>
                    <span className="text-sm text-gray-500">/ {metric.target}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.status === 'good' ? 'bg-green-500' :
                          metric.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${(metric.value / metric.target) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${
                      metric.trend.startsWith('+') ? 'text-green-600' : 
                      metric.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-900">Low Risk</span>
                    <span className="text-green-700">{riskAssessments.filter(r => r.riskLevel === 'Low').length} universities</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-yellow-900">Medium Risk</span>
                    <span className="text-yellow-700">{riskAssessments.filter(r => r.riskLevel === 'Medium').length} universities</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-900">High Risk</span>
                    <span className="text-red-700">{riskAssessments.filter(r => r.riskLevel === 'High').length} universities</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Status Overview</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-900">Current Policies</span>
                    <span className="text-green-700">{policyReviews.filter(p => p.status === 'Current').length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-yellow-900">Under Review</span>
                    <span className="text-yellow-700">{policyReviews.filter(p => p.status === 'Under Review').length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-900">Expired/Non-Compliant</span>
                    <span className="text-red-700">{policyReviews.filter(p => p.status === 'Expired').length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Compliance report generated')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Report
              </button>
              <button
                onClick={() => addNotification('Compliance data exported')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Audit Management Modal
  const AuditManagementModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Audit Management System</h2>
            <button
              onClick={() => setShowAuditModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Audit Schedule</h3>
                <button
                  onClick={() => addNotification('New audit scheduled')}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Audit
                </button>
              </div>

              <div className="space-y-4">
                {complianceAudits.map((audit) => (
                  <div key={audit.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{audit.type}</h4>
                        <p className="text-gray-600">Scope: {audit.scope}</p>
                        <p className="text-gray-600">Auditor: {audit.auditor}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          audit.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {audit.status}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          audit.priority === 'High' ? 'bg-red-100 text-red-800' :
                          audit.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {audit.priority}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>Date: {audit.date}</div>
                      <div>Duration: {audit.duration}</div>
                      <div>Findings: {audit.findings}</div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => addNotification('Audit details viewed')}
                        className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => addNotification('Audit report generated')}
                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                      >
                        Generate Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{complianceAudits.length}</div>
                  <div className="text-sm text-gray-600">Total Audits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{complianceAudits.filter(a => a.status === 'Completed').length}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{complianceAudits.filter(a => a.status === 'Scheduled').length}</div>
                  <div className="text-sm text-gray-600">Scheduled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{complianceAudits.reduce((sum, a) => sum + a.findings, 0)}</div>
                  <div className="text-sm text-gray-600">Total Findings</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Audit calendar exported')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Calendar
              </button>
              <button
                onClick={() => addNotification('Audit summary generated')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Generate Summary
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
      <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Compliance Officer Dashboard</h2>
        <p className="text-red-100">Risk assessment, policy compliance, and regulatory oversight management.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {complianceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
              {metric.status === 'good' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className={`h-5 w-5 ${
                  metric.status === 'critical' ? 'text-red-500' : 'text-yellow-500'
                }`} />
              )}
            </div>
            <div className="flex items-baseline space-x-2 mb-2">
              <p className="text-2xl font-bold text-gray-900">{metric.value}%</p>
              <span className="text-sm text-gray-500">/ {metric.target}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric.status === 'good' ? 'bg-green-500' :
                    metric.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${(metric.value / metric.target) * 100}%` }}
                ></div>
              </div>
              <span className={`text-xs font-medium ${
                metric.trend.startsWith('+') ? 'text-green-600' : 
                metric.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowAddRiskModal(true)}
            className="flex items-center justify-center p-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Risk Assessment
          </button>
          <button
            onClick={() => setShowAuditModal(true)}
            className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Schedule Audit
          </button>
          <button
            onClick={() => setShowComplianceModal(true)}
            className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Compliance Dashboard
          </button>
          <button
            onClick={() => addNotification('Policy review initiated')}
            className="flex items-center justify-center p-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Policy Review
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'risk-assessment', name: 'Risk Assessment', icon: AlertTriangle },
              { id: 'policy-review', name: 'Policy Review', icon: FileText },
              { id: 'audits', name: 'Compliance Audits', icon: Shield }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
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
          {activeTab === 'risk-assessment' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Risk Assessment Overview</h3>
                <button 
                  onClick={() => setShowAddRiskModal(true)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  New Assessment
                </button>
              </div>

              <div className="space-y-4">
                {riskAssessments.map((assessment) => (
                  <div key={assessment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{assessment.university}</h4>
                        <p className="text-gray-600">Reviewed by: {assessment.reviewer}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          assessment.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                          assessment.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {assessment.riskLevel} Risk
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {assessment.compliance}% Compliant
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Last Review:</span>
                        <p>{assessment.lastReview}</p>
                      </div>
                      <div>
                        <span className="font-medium">Next Review:</span>
                        <p>{assessment.nextReview}</p>
                      </div>
                      <div>
                        <span className="font-medium">Risk Score:</span>
                        <p className="font-medium">{assessment.riskScore}/100</p>
                      </div>
                      <div>
                        <span className="font-medium">Outstanding Issues:</span>
                        <p className={assessment.issues > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                          {assessment.issues}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="font-medium text-gray-700">Mitigation Plan:</span>
                      <p className="text-gray-600 mt-1">{assessment.mitigationPlan}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                        <div 
                          className={`h-2 rounded-full ${
                            assessment.compliance >= 90 ? 'bg-green-500' :
                            assessment.compliance >= 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${assessment.compliance}%` }}
                        ></div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => addNotification('Risk report generated')}
                          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                        >
                          View Report
                        </button>
                        <button 
                          onClick={() => addNotification('Risk assessment updated')}
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'policy-review' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">University Policy Review</h3>
                <button 
                  onClick={() => addNotification('New policy added')}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Add Policy
                </button>
              </div>

              <div className="space-y-4">
                {policyReviews.map((policy) => (
                  <div key={policy.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{policy.policy}</h4>
                        <p className="text-gray-600">{policy.university}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          policy.status === 'Current' ? 'bg-green-100 text-green-800' :
                          policy.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {policy.status}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          policy.compliance === 'Full' ? 'bg-green-100 text-green-800' :
                          policy.compliance === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {policy.compliance}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Version:</span>
                        <p>{policy.version}</p>
                      </div>
                      <div>
                        <span className="font-medium">Last Update:</span>
                        <p>{policy.lastUpdate}</p>
                      </div>
                      <div>
                        <span className="font-medium">Next Review:</span>
                        <p>{policy.nextReview}</p>
                      </div>
                      <div>
                        <span className="font-medium">Approved By:</span>
                        <p>{policy.approvedBy}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => addNotification('Policy document viewed')}
                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                      >
                        View Document
                      </button>
                      <button 
                        onClick={() => addNotification('Policy updated')}
                        className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => addNotification('Review scheduled')}
                        className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm"
                      >
                        Schedule Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audits' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Compliance Audits</h3>
                <button 
                  onClick={() => setShowAuditModal(true)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Audits
                </button>
              </div>

              <div className="space-y-4">
                {complianceAudits.map((audit) => (
                  <div key={audit.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{audit.type}</h4>
                        <p className="text-gray-600">Scope: {audit.scope}</p>
                        <p className="text-gray-600">Auditor: {audit.auditor}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          audit.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {audit.status}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          audit.priority === 'High' ? 'bg-red-100 text-red-800' :
                          audit.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {audit.priority}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>Date: {audit.date}</div>
                      <div>Duration: {audit.duration}</div>
                      <div>Findings: {audit.findings}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        {audit.findings > 0 ? 
                          `${audit.findings} findings identified` : 
                          'No issues found'
                        }
                      </p>
                      <button 
                        onClick={() => addNotification('Audit details viewed')}
                        className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Priority Action Items</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <h4 className="font-medium text-red-900">Update Penn State Insurance Coverage</h4>
                <p className="text-sm text-red-700">Critical compliance issue - immediate action required</p>
              </div>
            </div>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Critical</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-yellow-500" />
              <div>
                <h4 className="font-medium text-yellow-900">Complete Title IX Review for Ohio State</h4>
                <p className="text-sm text-yellow-700">Policy review deadline approaching</p>
              </div>
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Medium</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-medium text-blue-900">Schedule Q1 Risk Assessment Reviews</h4>
                <p className="text-sm text-blue-700">Quarterly reviews due for all active colonies</p>
              </div>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Low</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddRiskModal && <AddRiskModal />}
      {showComplianceModal && <ComplianceDashboardModal />}
      {showAuditModal && <AuditManagementModal />}
    </div>
  );
};

export default ComplianceDashboard;