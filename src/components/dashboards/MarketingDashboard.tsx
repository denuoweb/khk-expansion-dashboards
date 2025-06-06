import React, { useState } from 'react';
import { Megaphone, Palette, Image, Download, Plus, Eye, Edit, X, Save, Upload, Share2, Trash2, Calendar } from 'lucide-react';
import GoogleDriveIntegration from '../shared/GoogleDriveIntegration';
import GoogleCalendarIntegration from '../shared/GoogleCalendarIntegration';

const MarketingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [brandingGuidelines, setBrandingGuidelines] = useState({
    primaryColors: ['#1e3a8a', '#3b82f6', '#60a5fa'],
    secondaryColors: ['#f59e0b', '#10b981', '#ef4444'],
    fonts: ['Inter', 'Roboto', 'Open Sans'],
    logoVersions: 5,
    lastUpdated: '2024-01-05',
    driveFolder: 'brand_guidelines_folder'
  });

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'University Outreach Email',
      category: 'Email',
      type: 'HTML',
      downloads: 23,
      lastUsed: '2024-01-08',
      status: 'Active',
      description: 'Professional email template for initial university contact',
      size: '45 KB',
      driveFileId: 'template_email_outreach'
    },
    {
      id: 2,
      name: 'Colony Recruitment Flyer',
      category: 'Print',
      type: 'PDF',
      downloads: 15,
      lastUsed: '2024-01-06',
      status: 'Active',
      description: 'Print-ready flyer for colony recruitment events',
      size: '2.3 MB',
      driveFileId: 'template_flyer_recruitment'
    },
    {
      id: 3,
      name: 'Social Media Post Template',
      category: 'Social Media',
      type: 'PSD',
      downloads: 31,
      lastUsed: '2024-01-08',
      status: 'Active',
      description: 'Instagram and Facebook post template with brand elements',
      size: '8.7 MB',
      driveFileId: 'template_social_post'
    },
    {
      id: 4,
      name: 'Event Announcement',
      category: 'Digital',
      type: 'PNG',
      downloads: 18,
      lastUsed: '2024-01-04',
      status: 'Draft',
      description: 'Digital announcement template for events and meetings',
      size: '1.2 MB',
      driveFileId: 'template_event_announcement'
    }
  ]);

  const [socialMediaAssets, setSocialMediaAssets] = useState([
    {
      id: 1,
      platform: 'Instagram',
      posts: 24,
      templates: 8,
      engagement: '3.2K',
      lastPost: '2024-01-08',
      followers: '1.2K',
      driveFolder: 'instagram_assets'
    },
    {
      id: 2,
      platform: 'LinkedIn',
      posts: 15,
      templates: 5,
      engagement: '1.8K',
      lastPost: '2024-01-07',
      followers: '890',
      driveFolder: 'linkedin_assets'
    },
    {
      id: 3,
      platform: 'Facebook',
      posts: 19,
      templates: 6,
      engagement: '2.1K',
      lastPost: '2024-01-06',
      followers: '1.5K',
      driveFolder: 'facebook_assets'
    }
  ]);

  const [marketingCampaigns, setMarketingCampaigns] = useState([
    {
      id: 1,
      name: 'Spring 2024 University Outreach',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      budget: 5000,
      spent: 1250,
      leads: 47,
      conversions: 12,
      driveFolder: 'spring_2024_campaign'
    },
    {
      id: 2,
      name: 'Social Media Awareness Campaign',
      status: 'Planning',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      budget: 3000,
      spent: 0,
      leads: 0,
      conversions: 0,
      driveFolder: 'social_awareness_campaign'
    }
  ]);

  const [recentRequests, setRecentRequests] = useState([
    {
      id: 1,
      requestor: 'Recruitment Coordinator',
      item: 'University Visit Presentation',
      deadline: '2024-01-12',
      status: 'In Progress',
      priority: 'High',
      driveFileId: 'request_presentation_visit'
    },
    {
      id: 2,
      requestor: 'Chapter Development Officer',
      item: 'Colony Welcome Package Design',
      deadline: '2024-01-15',
      status: 'Pending',
      priority: 'Medium',
      driveFileId: 'request_welcome_package'
    },
    {
      id: 3,
      requestor: 'Chair',
      item: 'NEC Report Graphics',
      deadline: '2024-01-20',
      status: 'Not Started',
      priority: 'Medium',
      driveFileId: 'request_nec_graphics'
    }
  ]);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleDownloadTemplate = (templateId: number) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId ? { ...template, downloads: template.downloads + 1, lastUsed: new Date().toISOString().split('T')[0] } : template
    ));
    addNotification('Template downloaded from Google Drive');
  };

  const handleCreateTemplate = (templateData: any) => {
    const newTemplate = {
      ...templateData,
      id: Date.now(),
      downloads: 0,
      lastUsed: new Date().toISOString().split('T')[0],
      status: 'Active',
      driveFileId: `template_${Date.now()}`
    };
    setTemplates(prev => [newTemplate, ...prev]);
    setShowCreateTemplateModal(false);
    addNotification('Template created and uploaded to Google Drive');
  };

  const handleUpdateRequest = (requestId: number, newStatus: string) => {
    setRecentRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
    addNotification(`Request status updated to ${newStatus} and synced to Drive`);
  };

  const handleDeleteTemplate = (templateId: number) => {
    setTemplates(prev => prev.filter(template => template.id !== templateId));
    addNotification('Template deleted from Google Drive');
  };

  const handleUpdateBranding = () => {
    setBrandingGuidelines(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
    setShowBrandModal(false);
    addNotification('Brand guidelines updated and synced to Google Drive');
  };

  // Campaign Planning Modal
  const CampaignPlanningModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      startDate: '',
      endDate: '',
      budget: '',
      description: '',
      platforms: [] as string[]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newCampaign = {
        id: Date.now(),
        ...formData,
        budget: parseInt(formData.budget),
        status: 'Planning',
        spent: 0,
        leads: 0,
        conversions: 0,
        driveFolder: `campaign_${Date.now()}`
      };
      setMarketingCampaigns(prev => [newCampaign, ...prev]);
      setShowCampaignModal(false);
      addNotification('Marketing campaign created with Google Drive folder');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Plan Marketing Campaign</h2>
            <button
              onClick={() => setShowCampaignModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCampaignModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Create Campaign & Drive Folder
              </button>
            </div>
          </form>
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
      <div className="bg-gradient-to-r from-pink-600 to-rose-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Marketing Specialist Dashboard</h2>
        <p className="text-pink-100">Brand management, template creation, and design coordination with Google Drive integration.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Templates</p>
              <p className="text-2xl font-bold text-gray-900">{templates.filter(t => t.status === 'Active').length}</p>
            </div>
            <Image className="h-8 w-8 text-pink-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drive Assets</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
            </div>
            <Palette className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{templates.reduce((sum, t) => sum + t.downloads, 0)}</p>
            </div>
            <Download className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{marketingCampaigns.filter(c => c.status === 'Active').length}</p>
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
              { id: 'templates', name: 'Templates & Assets', icon: Image },
              { id: 'campaigns', name: 'Campaign Planning', icon: Megaphone },
              { id: 'calendar', name: 'Marketing Calendar', icon: Calendar }
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
                <button
                  onClick={() => addNotification('Opening brand guidelines in Google Drive')}
                  className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit in Drive
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
                        <button
                          onClick={() => addNotification(`${font} font downloaded from Drive`)}
                          className="text-pink-600 hover:text-pink-700 text-sm"
                        >
                          Download
                        </button>
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
                    <button
                      onClick={() => addNotification('Logo package downloaded from Google Drive')}
                      className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                    >
                      Download from Drive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <GoogleDriveIntegration
                folderId="marketing_templates"
                title="Marketing Templates & Assets"
                allowUpload={true}
                allowDelete={true}
                fileTypes={['image', 'document', 'presentation']}
              />
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Marketing Campaigns</h3>
                <button
                  onClick={() => setShowCampaignModal(true)}
                  className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Plan Campaign
                </button>
              </div>

              <div className="space-y-4">
                {marketingCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                        <p className="text-gray-600">{campaign.startDate} - {campaign.endDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
                        <button
                          onClick={() => addNotification('Opening campaign folder in Google Drive')}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>Budget: ${campaign.budget.toLocaleString()}</div>
                      <div>Spent: ${campaign.spent.toLocaleString()}</div>
                      <div>Leads: {campaign.leads}</div>
                      <div>Conversions: {campaign.conversions}</div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <GoogleCalendarIntegration
                calendarId="marketing"
                title="Marketing Calendar & Events"
                showCreateButton={true}
                maxEvents={12}
              />
            </div>
          )}
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Design Requests</h3>
        <div className="space-y-3">
          {recentRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
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
                <button
                  onClick={() => addNotification('Opening request file in Google Drive')}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Archive className="h-4 w-4" />
                </button>
                <select
                  value={request.status}
                  onChange={(e) => handleUpdateRequest(request.id, e.target.value)}
                  className={`text-xs px-2 py-1 rounded-full border-0 ${
                    request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showCampaignModal && <CampaignPlanningModal />}
    </div>
  );
};

export default MarketingDashboard;