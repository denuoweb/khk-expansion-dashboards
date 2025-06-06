import React from 'react';
import { LogOut, User, CheckSquare, Settings, Moon, Sun } from 'lucide-react';
import { Role } from '../App';
import { useAppContext } from '../contexts/AppContext';
import NotificationCenter from './shared/NotificationCenter';
import GlobalSearch from './shared/GlobalSearch';
import DataSyncIndicator from './shared/DataSyncIndicator';

interface DashboardLayoutProps {
  role: Role;
  children: React.ReactNode;
  onRoleChange: () => void;
  onTasksClick?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role, children, onRoleChange, onTasksClick }) => {
  const { currentUser, theme, setTheme, setUserSession } = useAppContext();
  const IconComponent = role.icon;

  const handleLogout = () => {
    setUserSession(null);
    onRoleChange();
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Navigation */}
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className={`${role.color} rounded-lg p-2 mr-3`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {role.name} Dashboard
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  KHK Expansion Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <GlobalSearch />
              
              {onTasksClick && (
                <button
                  onClick={onTasksClick}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Tasks
                </button>
              )}
              
              <NotificationCenter />
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                }`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full p-2`}>
                  <User className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="hidden sm:block">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentUser?.name || 'Officer'}
                  </span>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentUser?.email || role.name}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Switch Role</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Data Sync Indicator */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-2`}>
        <div className="max-w-7xl mx-auto">
          <DataSyncIndicator />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;