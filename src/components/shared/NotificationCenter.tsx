import React, { useState } from 'react';
import { Bell, X, Check, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { Notification } from '../../types/Notification';

const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead, clearNotifications, unreadCount } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.read
  );

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />;
      default: return <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      default: return 'border-l-blue-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg touch-manipulation"
      >
        <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 sm:max-h-96 overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-1 sm:space-x-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full touch-manipulation ${
                      filter === 'all' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full touch-manipulation ${
                      filter === 'unread' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Unread ({unreadCount})
                  </button>
                </div>
                
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-xs sm:text-sm text-red-600 hover:text-red-700 touch-manipulation"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-64 sm:max-h-80 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 sm:p-8 text-center text-gray-500">
                  <Bell className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'bg-blue-50' : ''
                      } touch-manipulation`}
                      onClick={() => markNotificationRead(notification.id)}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              notification.category === 'system' ? 'bg-gray-100 text-gray-600' :
                              notification.category === 'task' ? 'bg-blue-100 text-blue-600' :
                              notification.category === 'compliance' ? 'bg-red-100 text-red-600' :
                              notification.category === 'kpi' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              {notification.category}
                            </span>
                          </div>
                          {notification.actionUrl && notification.actionText && (
                            <button className="text-xs text-blue-600 hover:text-blue-700 mt-2 touch-manipulation">
                              {notification.actionText}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;