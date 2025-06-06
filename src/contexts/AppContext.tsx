import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserSession } from '../types/User';
import { Notification } from '../types/Notification';
import { Task } from '../types/Task';
import { authService } from '../services/authService';
import { taskService } from '../services/taskService';

interface AppContextType {
  // User & Authentication
  currentUser: User | null;
  userSession: UserSession | null;
  setUserSession: (session: UserSession | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  unreadCount: number;
  
  // Global State
  globalTasks: Task[];
  setGlobalTasks: (tasks: Task[]) => void;
  
  // Theme & Preferences
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Cross-dashboard data sharing
  sharedData: Record<string, unknown>;
  updateSharedData: (key: string, value: unknown) => void;
  
  // Real-time updates
  lastDataSync: string;
  triggerDataSync: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    const stored = localStorage.getItem('khk-session');
    return stored ? JSON.parse(stored) : null;
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [globalTasks, setGlobalTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sharedData, setSharedData] = useState<Record<string, unknown>>({});
  const [lastDataSync, setLastDataSync] = useState<string>(new Date().toISOString());

  // Initialize user from session
  useEffect(() => {
    if (userSession) {
      setCurrentUser(userSession.user);
      taskService.setAuthToken(userSession.token);
      localStorage.setItem('khk-session', JSON.stringify(userSession));
    } else {
      setCurrentUser(null);
      taskService.setAuthToken(null);
      localStorage.removeItem('khk-session');
    }
  }, [userSession]);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('khk-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedNotifications = localStorage.getItem('khk-notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Failed to load saved notifications:', error);
      }
    }
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('khk-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('khk-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only latest 50
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const login = async (email: string, password: string) => {
    try {
      const session = await authService.login(email, password);
      setUserSession(session);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = () => {
    setUserSession(null);
  };

  const updateSharedData = (key: string, value: unknown) => {
    setSharedData(prev => ({ ...prev, [key]: value }));
  };

  const triggerDataSync = () => {
    setLastDataSync(new Date().toISOString());
    // In a real app, this would trigger API calls to sync data
    addNotification({
      title: 'Data Synchronized',
      message: 'All dashboard data has been updated with the latest information.',
      type: 'success',
      priority: 'low',
      category: 'system'
    });
  };

  const value: AppContextType = {
    currentUser,
    userSession,
    setUserSession,
    login,
    logout,
    notifications,
    addNotification,
    markNotificationRead,
    clearNotifications,
    unreadCount,
    globalTasks,
    setGlobalTasks,
    theme,
    setTheme,
    sharedData,
    updateSharedData,
    lastDataSync,
    triggerDataSync
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};