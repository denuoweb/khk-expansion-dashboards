import React, { useState } from 'react';
import { ArrowRight, Shield, Lock } from 'lucide-react';
import { Role } from '../App';
import AuthenticationModal from './AuthenticationModal';

interface RoleSelectorProps {
  roles: Role[];
  onRoleSelect: (role: Role) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role);
    setShowAuthModal(true);
  };

  const handleAuthentication = (success: boolean) => {
    if (success && selectedRole) {
      setShowAuthModal(false);
      onRoleSelect(selectedRole);
    }
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">KHK Expansion Platform</h1>
              <p className="text-xl text-blue-600 font-semibold">Kappa Eta Kappa</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your officer position to access your personalized dashboard and tools for fraternity expansion efforts.
          </p>
        </div>

        {/* Security Notice */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-blue-900">Secure Access Required</h3>
                <p className="text-sm text-blue-700">Each officer position requires authentication to access sensitive expansion data and tools.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => handleRoleClick(role)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${role.color} rounded-lg p-3 w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <Lock className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {role.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {role.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Sign In to Access
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-blue-100 rounded-lg p-4 mb-3">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Comprehensive Management</h3>
                <p className="text-sm text-gray-600">All officer roles integrated in one platform</p>
              </div>
              <div>
                <div className="bg-green-100 rounded-lg p-4 mb-3">
                  <ArrowRight className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Progress Tracking</h3>
                <p className="text-sm text-gray-600">Real-time KPI monitoring and reporting</p>
              </div>
              <div>
                <div className="bg-purple-100 rounded-lg p-4 mb-3">
                  <Lock className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Secure Access</h3>
                <p className="text-sm text-gray-600">Role-based authentication and data protection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Information */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-900 mb-3">Demo Access Information</h3>
            <p className="text-sm text-yellow-800 mb-3">
              This is a demonstration platform. Each role has a demo password for testing purposes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-yellow-700">
              <div>• Chair: chair2024</div>
              <div>• Vice-Chair: vicechair2024</div>
              <div>• Secretary: secretary2024</div>
              <div>• Marketing: marketing2024</div>
              <div>• Recruitment: recruitment2024</div>
              <div>• Chapter Dev: chapterdev2024</div>
              <div>• Compliance: compliance2024</div>
              <div>• Data Analytics: analytics2024</div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && selectedRole && (
        <AuthenticationModal
          selectedRole={selectedRole}
          onAuthenticate={handleAuthentication}
          onClose={handleCloseAuth}
        />
      )}
    </div>
  );
};

export default RoleSelector;