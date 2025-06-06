import React, { useState } from 'react';
import { X, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Role } from '../App';

interface AuthenticationModalProps {
  selectedRole: Role;
  onAuthenticate: (success: boolean) => void;
  onClose: () => void;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({ selectedRole, onAuthenticate, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo passwords for each role (in production, this would be handled by a secure backend)
  const rolePasswords: { [key: string]: string } = {
    'chair': 'chair2024',
    'vice-chair': 'vicechair2024',
    'secretary': 'secretary2024',
    'marketing': 'marketing2024',
    'recruitment': 'recruitment2024',
    'chapter-dev': 'chapterdev2024',
    'compliance': 'compliance2024',
    'data-analytics': 'analytics2024'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === rolePasswords[selectedRole.id]) {
      onAuthenticate(true);
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  const IconComponent = selectedRole.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`${selectedRole.color} rounded-lg p-2`}>
              <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sign In</h2>
              <p className="text-sm text-gray-600">{selectedRole.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 touch-manipulation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4">
              <div className="flex items-start space-x-3">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900 text-sm sm:text-base">Role Access</h3>
                  <p className="text-xs sm:text-sm text-blue-700 mt-1">{selectedRole.description}</p>
                </div>
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center touch-manipulation"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation ${
              isLoading || !password
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : `${selectedRole.color} text-white hover:opacity-90`
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Password: {rolePasswords[selectedRole.id]}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationModal;