import React from 'react';
import { RefreshCw, Wifi, WifiOff, CheckCircle } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const DataSyncIndicator: React.FC = () => {
  const { lastDataSync, triggerDataSync } = useAppContext();
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate sync
    triggerDataSync();
    setIsSyncing(false);
  };

  const formatLastSync = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <div className="flex items-center space-x-1">
        {isOnline ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        <span className={isOnline ? 'text-green-600' : 'text-red-600'}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
      
      <div className="h-4 w-px bg-gray-300" />
      
      <div className="flex items-center space-x-1">
        {isSyncing ? (
          <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
        ) : (
          <CheckCircle className="h-4 w-4 text-green-500" />
        )}
        <span>Last sync: {formatLastSync(lastDataSync)}</span>
      </div>
      
      <button
        onClick={handleSync}
        disabled={isSyncing || !isOnline}
        className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        {isSyncing ? 'Syncing...' : 'Sync'}
      </button>
    </div>
  );
};

export default DataSyncIndicator;