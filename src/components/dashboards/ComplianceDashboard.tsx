import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText, Calendar, Users } from 'lucide-react';

const ComplianceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('risk-assessment');

  const riskAssessments = [
    {
      id: 1,
      university: 'University of Michigan',
      riskLevel: 'Low',
      lastReview: '2024-01-05',
      nextReview: '2024-04-05',
      issues: 0,
      compliance: 95,
      reviewer: 'Compliance Officer'
    },
    {
      id: 2,
      university: 'Ohio State University',
      riskLevel: 'Medium',
      lastReview: '2024-01-03',
      nextReview: '2024-03-03',
      issues: 2,
      compliance: 82,
      reviewer: 'Compliance Officer'
    },
    {
      id: 3,
      university: 'Penn State University',
      riskLevel: 'High',
      lastReview: '2023-12-28',
      nextReview: '2024-01-28',
      issues: 5,
      compliance: 65,
      reviewer: 'External Consultant'
    }
  ];

  const policyReviews = [
    {
      policy: 'Anti-Hazing Policy',
      university: 'University of Michigan',
      status: 'Current',
      lastUpdate: '2023-08-15',
      nextReview: '2024-08-15',
      compliance: 'Full'
    },
    {
      policy: 'Title IX Requirements',
      university: 'Ohio State University',
      status: 'Under Review',
      lastUpdate: '2023-09-20',
      nextReview: '2024-01-20',
      compliance: 'Partial'
    },
    {
      policy: 'Insurance Coverage',
      university: 'Penn State University',
      status: 'Expired',
      lastUpdate: '2023-06-30',
      nextReview: '2024-01-15',
      compliance: 'Non-Compliant'
    },
    {
      policy: 'Student Organization Rules',
      university: 'University of Michigan',
      status: 'Current',
      lastUpdate: '2023-10-10',
      nextReview: '2024-10-10',
      compliance: 'Full'
    }
  ];

  const complianceAudits = [
    {
      date: '2024-01-08',
      type: 'Risk Assessment',
      scope: 'All Active Colonies',
      findings: 3,
      status: 'Completed',
      priority: 'Medium'
    },
    {
      date: '2024-01-05',
      type: 'Policy Review',
      scope: 'University of Michigan',
      findings: 0,
      status: 'Completed',
      priority: 'Low'
    },
    {
      date: '2024-01-15',
      type: 'Insurance Verification',
      scope: 'All Locations',
      findings: 1,
      status: 'Scheduled',
      priority: 'High'
    }
  ];

  const complianceMetrics = [
    { metric: 'Overall Compliance Rate', value: 81, target: 95, status: 'needs-improvement' },
    { metric: 'Policies Up to Date', value: 75, target: 100, status: 'needs-improvement' },
    { metric: 'Risk Assessments Current', value: 67, target: 100, status: 'critical' },
    { metric: 'Insurance Coverage', value: 100, target: 100, status: 'good' }
  ];

  return (
    <div className="space-y-6">
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
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-gray-900">{metric.value}%</p>
              <span className="text-sm text-gray-500">/ {metric.target}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${
                  metric.status === 'good' ? 'bg-green-500' :
                  metric.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${(metric.value / metric.target) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
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
                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Last Review:</span>
                        <p>{assessment.lastReview}</p>
                      </div>
                      <div>
                        <span className="font-medium">Next Review:</span>
                        <p>{assessment.nextReview}</p>
                      </div>
                      <div>
                        <span className="font-medium">Outstanding Issues:</span>
                        <p className={assessment.issues > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                          {assessment.issues}
                        </p>
                      </div>
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
                        <button className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm">
                          View Report
                        </button>
                        <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm">
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
                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Policy
                </button>
              </div>

              <div className="space-y-4">
                {policyReviews.map((policy, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Last Update:</span>
                        <p>{policy.lastUpdate}</p>
                      </div>
                      <div>
                        <span className="font-medium">Next Review:</span>
                        <p>{policy.nextReview}</p>
                      </div>
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
                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Audit
                </button>
              </div>

              <div className="space-y-4">
                {complianceAudits.map((audit, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{audit.type}</h4>
                        <p className="text-gray-600">Scope: {audit.scope}</p>
                        <p className="text-gray-600">Date: {audit.date}</p>
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

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        {audit.findings > 0 ? 
                          `${audit.findings} findings identified` : 
                          'No issues found'
                        }
                      </p>
                      <button className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm">
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
        </div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;