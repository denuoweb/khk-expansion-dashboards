import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { Role } from '../App';

interface RoleSelectorProps {
  roles: Role[];
  onRoleSelect: (role: Role) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, onRoleSelect }) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => onRoleSelect(role)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className={`${role.color} rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {role.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {role.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Access Dashboard
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
                  <Shield className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Compliance Ready</h3>
                <p className="text-sm text-gray-600">Risk assessment and university policy compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;