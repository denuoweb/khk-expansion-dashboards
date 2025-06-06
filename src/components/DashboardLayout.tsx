import React from 'react';
import { LogOut, Bell, Search, User, CheckSquare, Eye } from 'lucide-react';
import { Role } from '../App';

interface DashboardLayoutProps {
  role: Role;
  children: React.ReactNode;
  onRoleChange: () => void;
  onTasksClick?: () => void;
  isViewOnly?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role, children, onRoleChange, onTasksClick, isViewOnly = false }) => {
  const IconComponent = role.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className={`${role.color} rounded-lg p-2 mr-3`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-semibold text-gray-900">{role.name} Dashboard</h1>
                  {isViewOnly && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      View Only
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">KHK Expansion Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isViewOnly}
                />
              </div>
              
              {onTasksClick && (
                <button
                  onClick={onTasksClick}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isViewOnly}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Tasks
                </button>
              )}
              
              <button className="relative p-2 text-gray-400 hover:text-gray-500" disabled={isViewOnly}>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="bg-gray-200 rounded-full p-2">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {isViewOnly ? 'Visitor' : 'Officer'}
                </span>
              </div>
              
              <button
                onClick={onRoleChange}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Switch Role
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* View-Only Banner */}
      {isViewOnly && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-center">
              <Eye className="h-4 w-4 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800 font-medium">
                You are viewing in read-only mode. Contact an administrator for full access.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;