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
      <div className="container mx-auto px-4 py-6 sm:py-12">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mb-2 sm:mb-0 sm:mr-4" />
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">KHK Expansion Platform</h1>
              <p className="text-lg sm:text-xl text-blue-600 font-semibold">Kappa Eta Kappa</p>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Select your officer position to access your personalized dashboard and tools for fraternity expansion efforts.
          </p>
        </div>

        {/* Security Notice - Mobile Optimized */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Lock className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 text-sm sm:text-base">Secure Access Required</h3>
                <p className="text-xs sm:text-sm text-blue-700">Each officer position requires authentication to access sensitive expansion data and tools.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Role Cards - Mobile First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto px-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => handleRoleClick(role)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 active:scale-95"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`${role.color} rounded-lg p-2 sm:p-3 w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {role.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                    {role.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 text-sm">
                    Sign In to Access
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Overview - Mobile Optimized */}
        <div className="text-center mt-8 sm:mt-12 px-4">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Platform Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="bg-blue-100 rounded-lg p-3 sm:p-4 mb-2 sm:mb-3">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Comprehensive Management</h3>
                <p className="text-xs sm:text-sm text-gray-600">All officer roles integrated in one platform</p>
              </div>
              <div>
                <div className="bg-green-100 rounded-lg p-3 sm:p-4 mb-2 sm:mb-3">
                  <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Progress Tracking</h3>
                <p className="text-xs sm:text-sm text-gray-600">Real-time KPI monitoring and reporting</p>
              </div>
              <div>
                <div className="bg-purple-100 rounded-lg p-3 sm:p-4 mb-2 sm:mb-3">
                  <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Secure Access</h3>
                <p className="text-xs sm:text-sm text-gray-600">Role-based authentication and data protection</p>
              </div>
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