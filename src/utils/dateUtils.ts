export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const target = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - target.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
  
  return formatDate(date);
};

export const isOverdue = (dueDate: string | Date): boolean => {
  return new Date(dueDate) < new Date();
};

export const getDaysUntilDue = (dueDate: string | Date): number => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffInTime = due.getTime() - now.getTime();
  return Math.ceil(diffInTime / (1000 * 3600 * 24));
};