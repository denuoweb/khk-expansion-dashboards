import React, { useState } from 'react';
import { Megaphone, Palette, Image, Download, Plus, Eye, Edit, X, Save, Upload, Share2, Trash2, Star, Users, Calendar, TrendingUp } from 'lucide-react';

const MarketingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('branding');
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [brandingGuidelines, setBrandingGuidelines] = useState({
    primaryColors: ['#1e3a8a', '#3b82f6', '#60a5fa'],
    secondaryColors: ['#f59e0b', '#10b981', '#ef4444'],
    fonts: ['Inter', 'Roboto', 'Open Sans'],
    logoVersions: 5,
    lastUpdated: '2024-01-05',
    brandAssets: 67,
    complianceScore: 94
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
      rating: 4.8,
      usage: 'High'
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
      rating: 4.6,
      usage: 'Medium'
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
      rating: 4.9,
      usage: 'High'
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
      rating: 4.3,
      usage: 'Low'
    },
    {
      id: 5,
      name: 'Presentation Template',
      category: 'Presentation',
      type: 'PPTX',
      downloads: 12,
      lastUsed: '2024-01-07',
      status: 'Active',
      description: 'Professional presentation template for university meetings',
      size: '5.4 MB',
      rating: 4.7,
      usage: 'Medium'
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
      growthRate: '+12%'
    },
    {
      id: 2,
      platform: 'LinkedIn',
      posts: 15,
      templates: 5,
      engagement: '1.8K',
      lastPost: '2024-01-07',
      followers: '890',
      growthRate: '+8%'
    },
    {
      id: 3,
      platform: 'Facebook',
      posts: 19,
      templates: 6,
      engagement: '2.1K',
      lastPost: '2024-01-06',
      followers: '1.5K',
      growthRate: '+15%'
    },
    {
      id: 4,
      platform: 'Twitter',
      posts: 32,
      templates: 4,
      engagement: '980',
      lastPost: '2024-01-08',
      followers: '650',
      growthRate: '+5%'
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
      description: 'Professional presentation for Ohio State University visit'
    },
    {
      id: 2,
      requestor: 'Chapter Development Officer',
      item: 'Colony Welcome Package Design',
      deadline: '2024-01-15',
      status: 'Pending',
      priority: 'Medium',
      description: 'Welcome materials for new colony members'
    },
    {
      id: 3,
      requestor: 'Chair',
      item: 'NEC Report Graphics',
      deadline: '2024-01-20',
      status: 'Not Started',
      priority: 'Medium',
      description: 'Charts and infographics for quarterly NEC report'
    },
    {
      id: 4,
      requestor: 'Compliance Officer',
      item: 'Risk Assessment Infographic',
      deadline: '2024-01-18',
      status: 'In Progress',
      priority: 'High',
      description: 'Visual representation of risk mitigation strategies'
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Spring 2024 Recruitment',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      platforms: ['Instagram', 'LinkedIn', 'Facebook'],
      reach: '15.2K',
      engagement: '8.4%'
    },
    {
      id: 2,
      name: 'University Outreach Campaign',
      status: 'Planning',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      platforms: ['LinkedIn', 'Email'],
      reach: '0',
      engagement: '0%'
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
    addNotification('Template downloaded successfully');
  };

  const handleCreateTemplate = (templateData: any) => {
    const newTemplate = {
      ...templateData,
      id: Date.now(),
      downloads: 0,
      lastUsed: new Date().toISOString().split('T')[0],
      status: 'Active',
      rating: 0,
      usage: 'Low'
    };
    setTemplates(prev => [newTemplate, ...prev]);
    setShowCreateTemplateModal(false);
    addNotification('Template created successfully');
  };

  const handleUpdateRequest = (requestId: number, newStatus: string) => {
    setRecentRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
    addNotification(`Request status updated to ${newStatus}`);
  };

  const handleDeleteTemplate = (templateId: number) => {
    setTemplates(prev => prev.filter(template => template.id !== templateId));
    addNotification('Template deleted successfully');
  };

  const handleUpdateBranding = () => {
    setBrandingGuidelines(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
    setShowBrandModal(false);
    addNotification('Brand guidelines updated successfully');
  };

  // Brand Guidelines Modal
  const BrandGuidelinesModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Brand Guidelines Management</h2>
          <button
            onClick={() => setShowBrandModal(false)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Color Management */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Primary Colors</h4>
                  <div className="flex space-x-3">
                    {brandingGuidelines.primaryColors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-20 h-20 rounded-lg shadow-md mb-2 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p className="text-xs font-mono text-gray-600">{color}</p>
                        <button 
                          onClick={() => addNotification(`Color ${color} copied to clipboard`)}
                          className="text-xs text-pink-600 hover:text-pink-700 mt-1"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Secondary Colors</h4>
                  <div className="flex space-x-3">
                    {brandingGuidelines.secondaryColors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-20 h-20 rounded-lg shadow-md mb-2 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                        ></div>
                        <p className="text-xs font-mono text-gray-600">{color}</p>
                        <button 
                          onClick={() => addNotification(`Color ${color} copied to clipboard`)}
                          className="text-xs text-pink-600 hover:text-pink-700 mt-1"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Typography and Logo */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography & Assets</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Typography</h4>
                  <div className="space-y-3">
                    {brandingGuidelines.fonts.map((font, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span style={{ fontFamily: font }} className="text-lg">{font}</span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => addNotification(`${font} font specifications copied`)}
                            className="text-pink-600 hover:text-pink-700 text-sm"
                          >
                            Copy CSS
                          </button>
                          <button 
                            onClick={() => addNotification(`${font} font downloaded`)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Logo Assets</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Available versions:</span>
                      <span className="font-medium">{brandingGuidelines.logoVersions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last updated:</span>
                      <span className="text-gray-600">{brandingGuidelines.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Compliance score:</span>
                      <span className="font-medium text-green-600">{brandingGuidelines.complianceScore}%</span>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => addNotification('Logo package downloaded')}
                        className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                      >
                        Download Package
                      </button>
                      <button 
                        onClick={() => addNotification('Logo upload interface opened')}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                      >
                        Upload New
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Usage Guidelines</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Minimum logo size:</span>
                      <span className="font-medium">24px height</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clear space:</span>
                      <span className="font-medium">2x logo height</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved formats:</span>
                      <span className="font-medium">PNG, SVG, PDF</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={() => addNotification('Brand guidelines exported')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Export Guidelines
            </button>
            <button
              onClick={handleUpdateBranding}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Create Template Modal
  const CreateTemplateModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: 'Email',
      type: 'HTML',
      description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleCreateTemplate(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create New Template</h2>
            <button
              onClick={() => setShowCreateTemplateModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Enter template name..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Email">Email</option>
                  <option value="Print">Print</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Digital">Digital</option>
                  <option value="Presentation">Presentation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="HTML">HTML</option>
                  <option value="PDF">PDF</option>
                  <option value="PSD">PSD</option>
                  <option value="PNG">PNG</option>
                  <option value="JPG">JPG</option>
                  <option value="PPTX">PPTX</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Describe the template's purpose and usage..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateTemplateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Create Template
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Campaign Management Modal
  const CampaignModal = () => {
    const [campaignData, setCampaignData] = useState({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      platforms: [] as string[],
      budget: '',
      objectives: ''
    });

    const availablePlatforms = ['Instagram', 'LinkedIn', 'Facebook', 'Twitter', 'Email'];

    const handlePlatformToggle = (platform: string) => {
      setCampaignData(prev => ({
        ...prev,
        platforms: prev.platforms.includes(platform)
          ? prev.platforms.filter(p => p !== platform)
          : [...prev.platforms, platform]
      }));
    };

    const handleCreateCampaign = () => {
      const newCampaign = {
        id: Date.now(),
        name: campaignData.name,
        status: 'Planning',
        startDate: campaignData.startDate,
        endDate: campaignData.endDate,
        platforms: campaignData.platforms,
        reach: '0',
        engagement: '0%'
      };
      setCampaigns(prev => [...prev, newCampaign]);
      addNotification('Campaign created successfully');
      setShowCampaignModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create Marketing Campaign</h2>
            <button
              onClick={() => setShowCampaignModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
              <input
                type="text"
                value={campaignData.name}
                onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Enter campaign name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={campaignData.description}
                onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Describe the campaign goals and strategy..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={campaignData.startDate}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={campaignData.endDate}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Target Platforms</label>
              <div className="grid grid-cols-3 gap-2">
                {availablePlatforms.map(platform => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handlePlatformToggle(platform)}
                    className={`p-3 rounded-lg border transition-colors ${
                      campaignData.platforms.includes(platform)
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <input
                type="text"
                value={campaignData.budget}
                onChange={(e) => setCampaignData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Enter campaign budget..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objectives</label>
              <textarea
                value={campaignData.objectives}
                onChange={(e) => setCampaignData(prev => ({ ...prev, objectives: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Define specific, measurable objectives..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setShowCampaignModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Analytics Modal
  const AnalyticsModal = () => {
    const analyticsData = {
      totalReach: '45.2K',
      avgEngagement: '7.8%',
      topPerformingPost: 'University Spotlight: Michigan',
      bestPerformingPlatform: 'LinkedIn',
      weeklyGrowth: '+12%',
      contentTypes: [
        { type: 'University Features', performance: 92 },
        { type: 'Officer Spotlights', performance: 78 },
        { type: 'Event Announcements', performance: 85 },
        { type: 'Educational Content', performance: 71 }
      ]
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Social Media Analytics</h2>
            <button
              onClick={() => setShowAnalyticsModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Reach</p>
                    <p className="text-2xl font-bold text-blue-900">{analyticsData.totalReach}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Avg. Engagement</p>
                    <p className="text-2xl font-bold text-green-900">{analyticsData.avgEngagement}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Weekly Growth</p>
                    <p className="text-2xl font-bold text-purple-900">{analyticsData.weeklyGrowth}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-pink-600">Top Platform</p>
                    <p className="text-lg font-bold text-pink-900">{analyticsData.bestPerformingPlatform}</p>
                  </div>
                  <Star className="h-8 w-8 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
                <div className="space-y-4">
                  {socialMediaAssets.map(platform => (
                    <div key={platform.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{platform.platform}</h4>
                        <span className="text-sm text-green-600 font-medium">{platform.growthRate}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Followers:</span>
                          <p className="font-medium">{platform.followers}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Engagement:</span>
                          <p className="font-medium">{platform.engagement}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Posts:</span>
                          <p className="font-medium">{platform.posts}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
                <div className="space-y-4">
                  {analyticsData.contentTypes.map((content, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{content.type}</h4>
                        <span className="text-sm font-medium">{content.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: `${content.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Top Performing Post</h4>
                  <p className="text-blue-800">{analyticsData.topPerformingPost}</p>
                  <p className="text-sm text-blue-600 mt-1">2.3K engagements • 15.2K reach</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Analytics report exported')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Report
              </button>
              <button
                onClick={() => addNotification('Analytics dashboard refreshed')}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Refresh Data
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
              <p className="text-2xl font-bold text-gray-900">{templates.filter(t => t.status === 'Active').length}</p>
            </div>
            <Image className="h-8 w-8 text-pink-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Brand Assets</p>
              <p className="text-2xl font-bold text-gray-900">{brandingGuidelines.brandAssets}</p>
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
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">{recentRequests.filter(r => r.status !== 'Completed').length}</p>
            </div>
            <Megaphone className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowBrandModal(true)}
            className="flex items-center justify-center p-4 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
          >
            <Palette className="h-5 w-5 mr-2" />
            Manage Brand
          </button>
          <button
            onClick={() => setShowCreateTemplateModal(true)}
            className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Template
          </button>
          <button
            onClick={() => setShowCampaignModal(true)}
            className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Megaphone className="h-5 w-5 mr-2" />
            New Campaign
          </button>
          <button
            onClick={() => setShowAnalyticsModal(true)}
            className="flex items-center justify-center p-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            View Analytics
          </button>
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
                <button
                  onClick={() => setShowBrandModal(true)}
                  className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Guidelines
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
                          className="w-16 h-16 rounded-lg shadow-md mb-2 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => addNotification(`Color ${color} copied to clipboard`)}
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
                          className="w-16 h-16 rounded-lg shadow-md mb-2 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => addNotification(`Color ${color} copied to clipboard`)}
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
                          onClick={() => addNotification(`${font} font downloaded`)}
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
                  <h4 className="font-semibold text-gray-900 mb-4">Logo Assets</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Available versions:</span>
                      <span className="font-medium">{brandingGuidelines.logoVersions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last updated:</span>
                      <span className="text-gray-600">{brandingGuidelines.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Compliance score:</span>
                      <span className="font-medium text-green-600">{brandingGuidelines.complianceScore}%</span>
                    </div>
                    <button
                      onClick={() => addNotification('Logo package downloaded')}
                      className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                    >
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
                <button
                  onClick={() => setShowCreateTemplateModal(true)}
                  className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
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
                    
                    <p className="text-sm text-gray-700 mb-3">{template.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>Downloads: {template.downloads}</div>
                      <div>Last used: {template.lastUsed}</div>
                      <div>Size: {template.size}</div>
                      <div className="flex items-center">
                        Rating: 
                        <div className="flex items-center ml-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="ml-1">{template.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => addNotification('Template preview opened')}
                        className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleDownloadTemplate(template.id)}
                        className="flex items-center px-3 py-1 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded text-sm"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </button>
                      <button
                        onClick={() => addNotification('Template shared successfully')}
                        className="flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="flex items-center px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
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
                <h3 className="text-xl font-semibold text-gray-900">Social Media Management</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAnalyticsModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </button>
                  <button
                    onClick={() => setShowCampaignModal(true)}
                    className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {socialMediaAssets.map((platform) => (
                  <div key={platform.id} className="bg-gray-50 rounded-lg p-4">
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
                        <span>Followers:</span>
                        <span className="font-medium">{platform.followers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth:</span>
                        <span className="font-medium text-green-600">{platform.growthRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last post:</span>
                        <span className="text-gray-600">{platform.lastPost}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => addNotification(`${platform.platform} post created`)}
                        className="flex-1 px-3 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 text-sm"
                      >
                        Create Post
                      </button>
                      <button
                        onClick={() => addNotification(`${platform.platform} analytics viewed`)}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                      >
                        Analytics
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Campaigns */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Active Campaigns</h4>
                <div className="space-y-3">
                  {campaigns.map(campaign => (
                    <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-medium text-gray-900">{campaign.name}</h5>
                          <p className="text-sm text-gray-600">{campaign.startDate} - {campaign.endDate}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Platforms: {campaign.platforms.join(', ')}</span>
                        <span>Reach: {campaign.reach}</span>
                        <span>Engagement: {campaign.engagement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                <p className="text-sm text-gray-500 mt-1">{request.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  request.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.priority}
                </span>
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
      {showBrandModal && <BrandGuidelinesModal />}
      {showCreateTemplateModal && <CreateTemplateModal />}
      {showCampaignModal && <CampaignModal />}
      {showAnalyticsModal && <AnalyticsModal />}
    </div>
  );
};

export default MarketingDashboard;