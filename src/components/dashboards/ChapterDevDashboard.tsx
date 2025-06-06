import React, { useState } from 'react';
import { Shield, Users, Calendar, BookOpen, Award, Clock, Plus, Edit, Eye, X, Save, Target, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

const ChapterDevDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colonies');
  const [showColonyModal, setShowColonyModal] = useState(false);
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [editingColony, setEditingColony] = useState<any>(null);
  const [notifications, setNotifications] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning'}>>([]);

  const [colonies, setColonies] = useState([
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
      phase: 'Integration',
      ritualProgress: 85,
      complianceScore: 92
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
      phase: 'Development',
      ritualProgress: 60,
      complianceScore: 78
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
      phase: 'Formation',
      ritualProgress: 25,
      complianceScore: 65
    },
    {
      id: 4,
      name: 'Georgia Tech Colony',
      founded: '2023-09-12',
      members: 22,
      mentor: 'Brother Robert Kim',
      status: 'Active',
      progress: 90,
      nextMilestone: 'Charter Ceremony',
      dueDate: '2024-03-01',
      phase: 'Pre-Charter',
      ritualProgress: 95,
      complianceScore: 96
    }
  ]);

  const [mentorshipProgram, setMentorshipProgram] = useState([
    {
      mentor: 'Brother James Wilson',
      colonies: 2,
      experience: '5 years',
      specialization: 'Ritual & Traditions',
      availability: 'Weekly calls',
      rating: 4.9,
      activeColonies: ['University of Michigan', 'Purdue University']
    },
    {
      mentor: 'Brother Michael Chen',
      colonies: 1,
      experience: '3 years',
      specialization: 'Leadership Development',
      availability: 'Bi-weekly calls',
      rating: 4.8,
      activeColonies: ['Ohio State University']
    },
    {
      mentor: 'Brother David Martinez',
      colonies: 1,
      experience: '4 years',
      specialization: 'Operations & Finance',
      availability: 'Weekly calls',
      rating: 4.7,
      activeColonies: ['Penn State University']
    },
    {
      mentor: 'Brother Robert Kim',
      colonies: 1,
      experience: '6 years',
      specialization: 'Charter Preparation',
      availability: 'Weekly calls',
      rating: 4.9,
      activeColonies: ['Georgia Tech']
    }
  ]);

  const [integrationTimeline, setIntegrationTimeline] = useState([
    { 
      stage: 'Interest Group Formation', 
      duration: '1-2 months', 
      description: 'Gather interested students, establish leadership structure',
      requirements: ['Minimum 8 members', 'Officer elections', 'University recognition'],
      completion: 100
    },
    { 
      stage: 'Constitution & Bylaws', 
      duration: '2-3 weeks', 
      description: 'Adopt KHK constitution and develop local bylaws',
      requirements: ['Constitution adoption', 'Local bylaws', 'University approval'],
      completion: 85
    },
    { 
      stage: 'Officer Training', 
      duration: '1 month', 
      description: 'Train officers in KHK procedures and leadership',
      requirements: ['Officer certification', 'Leadership workshop', 'Mentor assignment'],
      completion: 70
    },
    { 
      stage: 'Ritual Training', 
      duration: '2-3 months', 
      description: 'Learn and practice fraternal rituals and traditions',
      requirements: ['Ritual certification', 'Practice sessions', 'Mentor approval'],
      completion: 60
    },
    { 
      stage: 'Community Integration', 
      duration: '3-6 months', 
      description: 'Establish campus presence and community relationships',
      requirements: ['Campus events', 'Service projects', 'Alumni connections'],
      completion: 45
    },
    { 
      stage: 'Charter Application', 
      duration: '1 month', 
      description: 'Submit formal charter application to NEC',
      requirements: ['Application submission', 'Documentation', 'Recommendations'],
      completion: 30
    },
    { 
      stage: 'Charter Review', 
      duration: '2-3 months', 
      description: 'NEC review process and site visit',
      requirements: ['NEC review', 'Site visit', 'Final approval'],
      completion: 15
    },
    { 
      stage: 'Installation', 
      duration: '1 day', 
      description: 'Official charter ceremony and installation',
      requirements: ['Charter ceremony', 'Installation ritual', 'Celebration'],
      completion: 0
    }
  ]);

  const upcomingEvents = [
    { 
      id: 1,
      event: 'Michigan Colony Officer Training', 
      date: '2024-01-12', 
      type: 'Training', 
      priority: 'High',
      attendees: 7,
      location: 'Virtual'
    },
    { 
      id: 2,
      event: 'Ohio State Ritual Practice', 
      date: '2024-01-15', 
      type: 'Ritual', 
      priority: 'Medium',
      attendees: 12,
      location: 'Campus'
    },
    { 
      id: 3,
      event: 'Penn State Constitution Meeting', 
      date: '2024-01-18', 
      type: 'Meeting', 
      priority: 'High',
      attendees: 8,
      location: 'Campus'
    },
    { 
      id: 4,
      event: 'Regional Colony Conference Call', 
      date: '2024-01-20', 
      type: 'Conference', 
      priority: 'Medium',
      attendees: 25,
      location: 'Virtual'
    },
    { 
      id: 5,
      event: 'Georgia Tech Charter Preparation', 
      date: '2024-01-25', 
      type: 'Charter', 
      priority: 'High',
      attendees: 22,
      location: 'Campus'
    }
  ];

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleUpdateColony = (colonyId: number, updates: any) => {
    setColonies(prev => prev.map(colony => 
      colony.id === colonyId ? { ...colony, ...updates } : colony
    ));
    addNotification('Colony updated successfully');
  };

  const handleAddColony = (colonyData: any) => {
    const newColony = {
      ...colonyData,
      id: Date.now(),
      founded: new Date().toISOString().split('T')[0],
      progress: 0,
      ritualProgress: 0,
      complianceScore: 50
    };
    setColonies(prev => [newColony, ...prev]);
    addNotification('New colony added successfully');
  };

  // Colony Details Modal
  const ColonyDetailsModal = () => {
    if (!editingColony) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Colony Management</h2>
            <button
              onClick={() => {
                setEditingColony(null);
                setShowColonyModal(false);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Colony Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <p className="text-gray-900">{editingColony.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Founded:</span>
                    <p className="text-gray-900">{editingColony.founded}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Members:</span>
                    <p className="text-gray-900">{editingColony.members}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Mentor:</span>
                    <p className="text-gray-900">{editingColony.mentor}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Phase:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      editingColony.phase === 'Pre-Charter' ? 'bg-green-100 text-green-800' :
                      editingColony.phase === 'Integration' ? 'bg-blue-100 text-blue-800' :
                      editingColony.phase === 'Development' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {editingColony.phase}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Progress Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                      <span className="text-sm font-medium text-gray-900">{editingColony.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{ width: `${editingColony.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Ritual Training</span>
                      <span className="text-sm font-medium text-gray-900">{editingColony.ritualProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-purple-500 h-3 rounded-full"
                        style={{ width: `${editingColony.ritualProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Compliance Score</span>
                      <span className="text-sm font-medium text-gray-900">{editingColony.complianceScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          editingColony.complianceScore >= 90 ? 'bg-green-500' :
                          editingColony.complianceScore >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${editingColony.complianceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Next Milestone</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-blue-900">{editingColony.nextMilestone}</h4>
                    <p className="text-blue-700">Due: {editingColony.dueDate}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Colony report generated')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Generate Report
              </button>
              <button
                onClick={() => addNotification('Training session scheduled')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Training
              </button>
              <button
                onClick={() => addNotification('Colony updated successfully')}
                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Update Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Mentorship Framework Modal
  const MentorshipFrameworkModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Mentorship Framework Management</h2>
            <button
              onClick={() => setShowMentorshipModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Mentors</h3>
                <div className="space-y-4">
                  {mentorshipProgram.map((mentor, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900">{mentor.mentor}</h4>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{mentor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-3">
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

                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-700">Active Colonies:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {mentor.activeColonies.map((colony, i) => (
                            <span key={i} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                              {colony}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => addNotification(`Contact sent to ${mentor.mentor}`)}
                          className="flex-1 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm"
                        >
                          Contact
                        </button>
                        <button
                          onClick={() => addNotification('Mentor profile updated')}
                          className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentorship Guidelines</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Mentor Responsibilities</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Weekly check-ins with assigned colonies</li>
                      <li>• Ritual training and certification</li>
                      <li>• Leadership development guidance</li>
                      <li>• Progress reporting to Chapter Development</li>
                      <li>• Emergency support and consultation</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Training Requirements</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• KHK Mentor Certification Program</li>
                      <li>• Annual mentor training workshop</li>
                      <li>• Specialized skill development</li>
                      <li>• Peer mentoring sessions</li>
                      <li>• Continuous education credits</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Success Metrics</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Colony progression milestones</li>
                      <li>• Member satisfaction scores</li>
                      <li>• Charter success rate</li>
                      <li>• Mentor feedback ratings</li>
                      <li>• Time to charter completion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => addNotification('New mentor recruitment initiated')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Recruit Mentor
              </button>
              <button
                onClick={() => addNotification('Mentorship framework exported')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Framework
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Integration Timeline Modal
  const IntegrationTimelineModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Integration Timeline Management</h2>
            <button
              onClick={() => setShowIntegrationModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {integrationTimeline.map((stage, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        stage.completion === 100 ? 'bg-green-100' :
                        stage.completion > 0 ? 'bg-yellow-100' :
                        'bg-gray-100'
                      }`}>
                        {stage.completion === 100 ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : stage.completion > 0 ? (
                          <Clock className="h-6 w-6 text-yellow-600" />
                        ) : (
                          <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{stage.stage}</h4>
                          <p className="text-gray-600">{stage.duration}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">{stage.completion}%</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${
                                stage.completion === 100 ? 'bg-green-500' :
                                stage.completion > 0 ? 'bg-yellow-500' :
                                'bg-gray-300'
                              }`}
                              style={{ width: `${stage.completion}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{stage.description}</p>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Requirements:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {stage.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-700">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => addNotification('Timeline customized successfully')}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Customize Timeline
              </button>
              <button
                onClick={() => addNotification('Timeline exported successfully')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Timeline
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Training Program Modal
  const TrainingProgramModal = () => {
    const trainingModules = [
      { 
        module: 'KHK History & Values', 
        duration: '2 hours', 
        completion: 95, 
        participants: 45,
        description: 'Comprehensive overview of fraternity history, mission, and core values'
      },
      { 
        module: 'Leadership Development', 
        duration: '4 hours', 
        completion: 78, 
        participants: 38,
        description: 'Leadership skills, team building, and officer responsibilities'
      },
      { 
        module: 'Ritual & Traditions', 
        duration: '6 hours', 
        completion: 65, 
        participants: 42,
        description: 'Sacred rituals, ceremonies, and fraternal traditions'
      },
      { 
        module: 'Risk Management', 
        duration: '3 hours', 
        completion: 82, 
        participants: 40,
        description: 'Safety protocols, liability awareness, and emergency procedures'
      },
      { 
        module: 'University Relations', 
        duration: '2 hours', 
        completion: 70, 
        participants: 35,
        description: 'Campus policies, Greek life regulations, and administrative relations'
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Training Program Management</h2>
            <button
              onClick={() => setShowTrainingModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Modules</h3>
              <div className="space-y-4">
                {trainingModules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{module.module}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900">{module.completion}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${module.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Duration: {module.duration}</div>
                      <div>Participants: {module.participants}</div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => addNotification(`${module.module} session scheduled`)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                      >
                        Schedule Session
                      </button>
                      <button
                        onClick={() => addNotification(`${module.module} materials accessed`)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                      >
                        View Materials
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Calendar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Upcoming Sessions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-sm">Leadership Workshop</span>
                      <span className="text-xs text-gray-600">Jan 15</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-sm">Ritual Training</span>
                      <span className="text-xs text-gray-600">Jan 18</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span className="text-sm">Risk Management</span>
                      <span className="text-xs text-gray-600">Jan 22</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Training Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Participants:</span>
                      <span className="font-medium">58</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion Rate:</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Score:</span>
                      <span className="font-medium">87%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => addNotification('New training module created')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Module
              </button>
              <button
                onClick={() => addNotification('Training report generated')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Report
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
      <div className="bg-gradient-to-r from-yellow-600 to-orange-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Chapter Development Dashboard</h2>
        <p className="text-yellow-100">Colony mentorship, integration timeline management, and tradition guidance.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Colonies</p>
              <p className="text-2xl font-bold text-gray-900">{colonies.length}</p>
            </div>
            <Shield className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{colonies.reduce((sum, c) => sum + c.members, 0)}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Mentors</p>
              <p className="text-2xl font-bold text-gray-900">{mentorshipProgram.length}</p>
            </div>
            <Award className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(colonies.reduce((sum, c) => sum + c.progress, 0) / colonies.length)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => addNotification('New colony form opened')}
            className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Colony
          </button>
          <button
            onClick={() => setShowTrainingModal(true)}
            className="flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Training Program
          </button>
          <button
            onClick={() => setShowMentorshipModal(true)}
            className="flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Users className="h-5 w-5 mr-2" />
            Mentor Assignment
          </button>
          <button
            onClick={() => setShowIntegrationModal(true)}
            className="flex items-center justify-center p-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Integration Timeline
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'colonies', name: 'Colony Management', icon: Shield },
              { id: 'mentorship', name: 'Mentorship Program', icon: Users },
              { id: 'timeline', name: 'Integration Timeline', icon: Calendar }
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
                  onClick={() => addNotification('New colony form opened')}
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
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          colony.status === 'Active' ? 'bg-green-100 text-green-800' :
                          colony.status === 'Development' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {colony.status}
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {colony.phase}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
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

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Ritual Training</span>
                          <span className="text-sm font-medium text-gray-900">{colony.ritualProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-purple-500 h-3 rounded-full"
                            style={{ width: `${colony.ritualProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Compliance</span>
                          <span className="text-sm font-medium text-gray-900">{colony.complianceScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              colony.complianceScore >= 90 ? 'bg-green-500' :
                              colony.complianceScore >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${colony.complianceScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Next: {colony.nextMilestone}</p>
                        <p className="text-sm text-gray-600">Due: {colony.dueDate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setEditingColony(colony);
                            setShowColonyModal(true);
                          }}
                          className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => addNotification(`Contact sent to ${colony.mentor}`)}
                          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                        >
                          Contact
                        </button>
                        <button 
                          onClick={() => addNotification('Colony progress updated')}
                          className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm"
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

          {activeTab === 'mentorship' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Mentorship Framework</h3>
                <button 
                  onClick={() => setShowMentorshipModal(true)}
                  className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Framework
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
                  onClick={() => setShowIntegrationModal(true)}
                  className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full Timeline
                </button>
              </div>

              <div className="space-y-4">
                {integrationTimeline.slice(0, 5).map((stage, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stage.completion === 100 ? 'bg-green-100' :
                        stage.completion > 0 ? 'bg-yellow-100' :
                        'bg-gray-100'
                      }`}>
                        {stage.completion === 100 ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                        <span className="text-sm text-gray-500">{stage.duration}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{stage.description}</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              stage.completion === 100 ? 'bg-green-500' :
                              stage.completion > 0 ? 'bg-yellow-500' :
                              'bg-gray-300'
                            }`}
                            style={{ width: `${stage.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{stage.completion}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events & Milestones</h3>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'Training' ? 'bg-blue-500' :
                  event.type === 'Ritual' ? 'bg-purple-500' :
                  event.type === 'Meeting' ? 'bg-green-500' :
                  event.type === 'Charter' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">{event.event}</h4>
                  <p className="text-sm text-gray-600">{event.date} • {event.type} • {event.attendees} attendees • {event.location}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                event.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showColonyModal && <ColonyDetailsModal />}
      {showMentorshipModal && <MentorshipFrameworkModal />}
      {showIntegrationModal && <IntegrationTimelineModal />}
      {showTrainingModal && <TrainingProgramModal />}
    </div>
  );
};

export default ChapterDevDashboard;