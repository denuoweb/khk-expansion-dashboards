import React, { useState } from 'react';
import { Shield, Users, Calendar, BookOpen, Award, Clock, Archive, Video } from 'lucide-react';
import GoogleDriveIntegration from '../shared/GoogleDriveIntegration';
import GoogleCalendarIntegration from '../shared/GoogleCalendarIntegration';

const ChapterDevDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colonies');
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const colonies = [
    {
      id: 1,
      name: 'University of Michigan Colony',
      founded: '2023-10-15',
      members: 18,
      mentor: 'Brother James Wilson',
      status: 'Active',
      progress: 75,
      nextMilestone: 'Charter Application',
      dueDate: '2024-02-15',
      driveFolder: 'umich_colony_docs',
      calendarId: 'umich_colony_events'
    },
    {
      id: 2,
      name: 'Ohio State Colony',
      founded: '2023-11-20',
      members: 12,
      mentor: 'Brother Michael Chen',
      status: 'Development',
      progress: 45,
      nextMilestone: 'Officer Training',
      dueDate: '2024-01-30',
      driveFolder: 'osu_colony_docs',
      calendarId: 'osu_colony_events'
    },
    {
      id: 3,
      name: 'Penn State Interest Group',
      founded: '2024-01-05',
      members: 8,
      mentor: 'Brother David Martinez',
      status: 'New',
      progress: 20,
      nextMilestone: 'Constitution Adoption',
      dueDate: '2024-01-25',
      driveFolder: 'psu_colony_docs',
      calendarId: 'psu_colony_events'
    }
  ];

  const mentorshipProgram = [
    {
      mentor: 'Brother James Wilson',
      colonies: 2,
      experience: '5 years',
      specialization: 'Ritual & Traditions',
      availability: 'Weekly calls',
      rating: 4.9,
      driveFolder: 'mentor_wilson_resources'
    },
    {
      mentor: 'Brother Michael Chen',
      colonies: 1,
      experience: '3 years',
      specialization: 'Leadership Development',
      availability: 'Bi-weekly calls',
      rating: 4.8,
      driveFolder: 'mentor_chen_resources'
    },
    {
      mentor: 'Brother David Martinez',
      colonies: 1,
      experience: '4 years',
      specialization: 'Operations & Finance',
      availability: 'Weekly calls',
      rating: 4.7,
      driveFolder: 'mentor_martinez_resources'
    }
  ];

  const integrationTimeline = [
    { 
      stage: 'Interest Group Formation', 
      duration: '1-2 months', 
      description: 'Gather interested students, establish leadership',
      documents: ['Interest Group Charter', 'Leadership Roster', 'Meeting Schedule'],
      driveFolder: 'stage_1_formation'
    },
    { 
      stage: 'Constitution & Bylaws', 
      duration: '2-3 weeks', 
      description: 'Adopt KHK constitution and local bylaws',
      documents: ['Constitution Template', 'Bylaws Template', 'Adoption Forms'],
      driveFolder: 'stage_2_constitution'
    },
    { 
      stage: 'Officer Training', 
      duration: '1 month', 
      description: 'Train officers in KHK procedures and traditions',
      documents: ['Officer Handbook', 'Training Materials', 'Certification Forms'],
      driveFolder: 'stage_3_training'
    },
    { 
      stage: 'Ritual Training', 
      duration: '2-3 months', 
      description: 'Learn and practice fraternal rituals',
      documents: ['Ritual Guide', 'Practice Schedule', 'Assessment Forms'],
      driveFolder: 'stage_4_ritual'
    },
    { 
      stage: 'Community Integration', 
      duration: '3-6 months', 
      description: 'Establish campus presence and relationships',
      documents: ['Community Plan', 'Event Calendar', 'Partnership Agreements'],
      driveFolder: 'stage_5_community'
    },
    { 
      stage: 'Charter Application', 
      duration: '1 month', 
      description: 'Submit formal charter application to NEC',
      documents: ['Charter Application', 'Supporting Documents', 'Review Checklist'],
      driveFolder: 'stage_6_charter'
    },
    { 
      stage: 'Charter Review', 
      duration: '2-3 months', 
      description: 'NEC review and site visit',
      documents: ['Review Schedule', 'Site Visit Prep', 'Evaluation Forms'],
      driveFolder: 'stage_7_review'
    },
    { 
      stage: 'Installation', 
      duration: '1 day', 
      description: 'Official charter ceremony and installation',
      documents: ['Installation Guide', 'Ceremony Materials', 'Certificate Templates'],
      driveFolder: 'stage_8_installation'
    }
  ];

  const upcomingEvents = [
    { 
      event: 'Michigan Colony Officer Training', 
      date: '2024-01-12', 
      type: 'Training', 
      priority: 'High',
      calendarEventId: 'training_umich_20240112'
    },
    { 
      event: 'Ohio State Ritual Practice', 
      date: '2024-01-15', 
      type: 'Ritual', 
      priority: 'Medium',
      calendarEventId: 'ritual_osu_20240115'
    },
    { 
      event: 'Penn State Constitution Meeting', 
      date: '2024-01-18', 
      type: 'Meeting', 
      priority: 'High',
      calendarEventId: 'constitution_psu_20240118'
    },
    { 
      event: 'Regional Colony Conference Call', 
      date: '2024-01-20', 
      type: 'Conference', 
      priority: 'Medium',
      calendarEventId: 'conference_regional_20240120'
    }
  ];

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleOpenColonyDrive = (colonyId: number) => {
    const colony = colonies.find(c => c.id === colonyId);
    if (colony) {
      addNotification(`Opening ${colony.name} documents in Google Drive`);
    }
  };

  const handleScheduleEvent = (colonyId: number) => {
    const colony = colonies.find(c => c.id === colonyId);
    if (colony) {
      addNotification(`Event scheduled for ${colony.name} and added to Google Calendar`);
    }
  };

  const handleAccessMentorResources = (mentorName: string) => {
    addNotification(`Opening ${mentorName}'s resources in Google Drive`);
  };

  const handleOpenStageDocuments = (stage: string) => {
    addNotification(`Opening ${stage} documents in Google Drive`);
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
      <div className="bg-gradient-to-r from-yellow-600 to-orange-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Chapter Development Dashboard</h2>
        <p className="text-yellow-100">Colony mentorship, integration timeline management, and tradition guidance with Google Drive and Calendar integration.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Colonies</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Shield className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">38</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Mentors</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Award className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Drive Documents</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Archive className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'colonies', name: 'Colony Management', icon: Shield },
              { id: 'mentorship', name: 'Mentorship Program', icon: Users },
              { id: 'timeline', name: 'Integration Timeline', icon: Calendar },
              { id: 'resources', name: 'Training Resources', icon: BookOpen },
              { id: 'events', name: 'Event Calendar', icon: Calendar }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-yellow-600'
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
          {activeTab === 'colonies' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Colony Overview</h3>
                <button 
                  onClick={() => addNotification('New colony folder created in Google Drive')}
                  className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Add Colony
                </button>
              </div>

              <div className="space-y-4">
                {colonies.map((colony) => (
                  <div key={colony.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{colony.name}</h4>
                        <p className="text-gray-600">Founded: {colony.founded} • {colony.members} members</p>
                        <p className="text-gray-600">Mentor: {colony.mentor}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        colony.status === 'Active' ? 'bg-green-100 text-green-800' :
                        colony.status === 'Development' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {colony.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Integration Progress</span>
                        <span className="text-sm font-medium text-gray-900">{colony.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            colony.progress >= 70 ? 'bg-green-500' :
                            colony.progress >= 40 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${colony.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Next: {colony.nextMilestone}</p>
                        <p className="text-sm text-gray-600">Due: {colony.dueDate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleOpenColonyDrive(colony.id)}
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                        >
                          <Archive className="h-3 w-3 inline mr-1" />
                          Drive
                        </button>
                        <button 
                          onClick={() => handleScheduleEvent(colony.id)}
                          className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm"
                        >
                          <Calendar className="h-3 w-3 inline mr-1" />
                          Schedule
                        </button>
                        <button 
                          onClick={() => addNotification(`Starting video call with ${colony.name}`)}
                          className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-sm"
                        >
                          <Video className="h-3 w-3 inline mr-1" />
                          Meet
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mentorship' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Mentorship Framework</h3>
                <button 
                  onClick={() => addNotification('Mentor assignment updated in Google Drive')}
                  className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Assign Mentor
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mentorshipProgram.map((mentor, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{mentor.mentor}</h4>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Colonies:</span>
                        <span className="font-medium">{mentor.colonies}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-medium">{mentor.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Specialization:</span>
                        <span className="font-medium">{mentor.specialization}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Availability:</span>
                        <span className="font-medium">{mentor.availability}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button 
                        onClick={() => handleAccessMentorResources(mentor.mentor)}
                        className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                      >
                        <Archive className="h-3 w-3 inline mr-1" />
                        Resources
                      </button>
                      <button 
                        onClick={() => addNotification(`Scheduling call with ${mentor.mentor}`)}
                        className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm"
                      >
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Schedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Integration Timeline</h3>
                <button 
                  onClick={() => addNotification('Timeline template saved to Google Drive')}
                  className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Customize Timeline
                </button>
              </div>

              <div className="space-y-4">
                {integrationTimeline.map((stage, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-yellow-700">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                        <span className="text-sm text-gray-500">{stage.duration}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{stage.description}</p>
                      
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Required Documents:</h5>
                        <div className="flex flex-wrap gap-1">
                          {stage.documents.map((doc, docIndex) => (
                            <span key={docIndex} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => handleOpenStageDocuments(stage.stage)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Archive className="h-3 w-3 mr-1" />
                        Access Documents in Drive
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <GoogleDriveIntegration
                folderId="chapter_development_resources"
                title="Training Resources & Materials"
                allowUpload={true}
                allowDelete={true}
                fileTypes={['document', 'presentation', 'video', 'pdf']}
              />
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              <GoogleCalendarIntegration
                calendarId="chapter_development"
                title="Colony Events & Training Schedule"
                showCreateButton={true}
                maxEvents={20}
              />
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events & Milestones</h3>
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'Training' ? 'bg-blue-500' :
                  event.type === 'Ritual' ? 'bg-purple-500' :
                  event.type === 'Meeting' ? 'bg-green-500' :
                  'bg-yellow-500'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{event.event}</h4>
                  <p className="text-sm text-gray-600">{event.date} • {event.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.priority}
                </span>
                <button 
                  onClick={() => addNotification('Event opened in Google Calendar')}
                  className="p-1 text-gray-400 hover:text-blue-600"
                >
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterDevDashboard;