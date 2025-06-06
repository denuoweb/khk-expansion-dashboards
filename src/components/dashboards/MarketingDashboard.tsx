import React, { useState } from 'react';
import { Megaphone, Palette, Image, Download, Plus, Eye, Edit } from 'lucide-react';

const MarketingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('branding');

  const brandingGuidelines = {
    primaryColors: ['#1e3a8a', '#3b82f6', '#60a5fa'],
    secondaryColors: ['#f59e0b', '#10b981', '#ef4444'],
    fonts: ['Inter', 'Roboto', 'Open Sans'],
    logoVersions: 5,
    lastUpdated: '2024-01-05'
  };

  const templates = [
    {
      id: 1,
      name: 'University Outreach Email',
      category: 'Email',
      type: 'HTML',
      downloads: 23,
      lastUsed: '2024-01-08',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Colony Recruitment Flyer',
      category: 'Print',
      type: 'PDF',
      downloads: 15,
      lastUsed: '2024-01-06',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Social Media Post Template',
      category: 'Social Media',
      type: 'PSD',
      downloads: 31,
      lastUsed: '2024-01-08',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Event Announcement',
      category: 'Digital',
      type: 'PNG',
      downloads: 18,
      lastUsed: '2024-01-04',
      status: 'Draft'
    }
  ];

  const socialMediaAssets = [
    {
      platform: 'Instagram',
      posts: 24,
      templates: 8,
      engagement: '3.2K',
      lastPost: '2024-01-08'
    },
    {
      platform: 'LinkedIn',
      posts: 15,
      templates: 5,
      engagement: '1.8K',
      lastPost: '2024-01-07'
    },
    {
      platform: 'Facebook',
      posts: 19,
      templates: 6,
      engagement: '2.1K',
      lastPost: '2024-01-06'
    }
  ];

  const recentRequests = [
    {
      requestor: 'Recruitment Coordinator',
      item: 'University Visit Presentation',
      deadline: '2024-01-12',
      status: 'In Progress',
      priority: 'High'
    },
    {
      requestor: 'Chapter Development Officer',
      item: 'Colony Welcome Package Design',
      deadline: '2024-01-15',
      status: 'Pending',
      priority: 'Medium'
    },
    {
      requestor: 'Chair',
      item: 'NEC Report Graphics',
      deadline: '2024-01-20',
      status: 'Not Started',
      priority: 'Medium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Marketing Specialist Dashboard</h2>
        <p className="text-pink-100">Brand management, template creation, and design coordination.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Templates</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Image className="h-8 w-8 text-pink-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Brand Assets</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
            <Palette className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Download className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Megaphone className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'branding', name: 'Brand Guidelines', icon: Palette },
              { id: 'templates', name: 'Templates', icon: Image },
              { id: 'social', name: 'Social Media', icon: Megaphone }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
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
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Brand Guidelines</h3>
                <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Guidelines
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Color Palette */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Primary Colors</h4>
                  <div className="flex space-x-3">
                    {brandingGuidelines.primaryColors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-16 h-16 rounded-lg shadow-md mb-2"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p className="text-xs font-mono text-gray-600">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Colors */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Secondary Colors</h4>
                  <div className="flex space-x-3">
                    {brandingGuidelines.secondaryColors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-16 h-16 rounded-lg shadow-md mb-2"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p className="text-xs font-mono text-gray-600">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Typography</h4>
                  <div className="space-y-3">
                    {brandingGuidelines.fonts.map((font, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span style={{ fontFamily: font }} className="text-lg">{font}</span>
                        <button className="text-pink-600 hover:text-pink-700 text-sm">Download</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logo Versions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Logo Versions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Available versions:</span>
                      <span className="font-medium">{brandingGuidelines.logoVersions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last updated:</span>
                      <span className="text-gray-600">{brandingGuidelines.lastUpdated}</span>
                    </div>
                    <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
                      Download Logo Package
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Design Templates</h3>
                <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.category}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          template.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {template.status}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{template.type}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>Downloads: {template.downloads}</div>
                      <div>Last used: {template.lastUsed}</div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </button>
                      <button className="flex items-center px-3 py-1 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded text-sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </button>
                      <button className="flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Social Media Assets</h3>
                <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Asset
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {socialMediaAssets.map((platform, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">{platform.platform}</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Posts created:</span>
                        <span className="font-medium">{platform.posts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Templates:</span>
                        <span className="font-medium">{platform.templates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engagement:</span>
                        <span className="font-medium">{platform.engagement}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last post:</span>
                        <span className="text-gray-600">{platform.lastPost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Design Requests</h3>
        <div className="space-y-3">
          {recentRequests.map((request, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{request.item}</h4>
                <p className="text-sm text-gray-600">Requested by: {request.requestor}</p>
                <p className="text-sm text-gray-600">Due: {request.deadline}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  request.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.priority}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;