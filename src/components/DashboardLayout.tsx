import React, { useState } from 'react';
import { LogOut, User, CheckSquare, Moon, Sun, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const IconComponent = role.icon;

  const handleLogout = () => {
    setUserSession(null);
    onRoleChange();
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Navigation */}
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Left side - Logo and Title */}
            <div className="flex items-center min-w-0 flex-1">
              <div className={`${role.color} rounded-lg p-1.5 sm:p-2 mr-2 sm:mr-3 flex-shrink-0`}>
                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className={`text-base sm:text-xl font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {role.name}
                </h1>
                <p className={`text-xs sm:text-sm hidden sm:block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  KHK Expansion Platform
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
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
                  <User className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <div className="hidden xl:block">
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
                Switch Role
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <NotificationCenter />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="px-4 py-3 space-y-3">
              {/* Mobile Search */}
              <div className="w-full">
                <GlobalSearch />
              </div>
              
              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {onTasksClick && (
                  <button
                    onClick={() => {
                      onTasksClick();
                      closeMobileMenu();
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <CheckSquare className="h-4 w-4 mr-3" />
                    Tasks
                  </button>
                )}
                
                <button
                  onClick={toggleTheme}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4 mr-3" /> : <Moon className="h-4 w-4 mr-3" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                
                <div className={`flex items-center px-3 py-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full p-2 mr-3`}>
                    <User className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium block">
                      {currentUser?.name || 'Officer'}
                    </span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {currentUser?.email || role.name}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Switch Role
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Data Sync Indicator - Hidden on mobile */}
      <div className={`hidden sm:block ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-2`}>
        <div className="max-w-7xl mx-auto">
          <DataSyncIndicator />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;