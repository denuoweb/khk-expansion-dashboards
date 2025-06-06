import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Flag, Users, MoreVertical, Edit, Trash2, ArrowRight } from 'lucide-react';
import { Task, TaskStatus } from '../../types/Task';
import { Role } from '../../App';

interface TaskCardProps {
  task: Task;
  roles: Role[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, roles, onStatusChange, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  const getAssignedRoles = () => {
    return task.assignedPositions.map(positionId => 
      roles.find(role => role.id === positionId)
    ).filter(Boolean);
  };

  const getNextStatus = (): TaskStatus | null => {
    switch (task.status) {
      case 'todo': return 'in-progress';
      case 'in-progress': return 'done';
      default: return null;
    }
  };

  const getNextStatusLabel = () => {
    switch (task.status) {
      case 'todo': return 'Start Task';
      case 'in-progress': return 'Mark Complete';
      default: return null;
    }
  };

  const assignedRoles = getAssignedRoles();
  const nextStatus = getNextStatus();
  const nextStatusLabel = getNextStatusLabel();

  return (
    <div className={`bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
      isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'
    }`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-semibold text-gray-900 flex-1 pr-2">{task.title}</h4>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="h-3 w-3 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Priority and Status */}
        <div className="flex items-center space-x-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
            <Flag className="h-3 w-3 inline mr-1" />
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
            {task.status === 'todo' ? 'To Do' : 
             task.status === 'in-progress' ? 'In Progress' : 'Done'}
          </span>
        </div>

        {/* Assigned Positions */}
        {assignedRoles.length > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            <Users className="h-4 w-4 text-gray-500" />
            <div className="flex flex-wrap gap-1">
              {assignedRoles.map(role => {
                const IconComponent = role!.icon;
                return (
                  <div
                    key={role!.id}
                    className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full text-white ${role!.color}`}
                  >
                    <IconComponent className="h-3 w-3" />
                    <span>{role!.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div className={`flex items-center space-x-1 text-sm mb-3 ${
            isOverdue ? 'text-red-600' : 'text-gray-600'
          }`}>
            <Calendar className="h-4 w-4" />
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            {isOverdue && <span className="text-red-600 font-medium">(Overdue)</span>}
          </div>
        )}

        {/* Description Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 mb-3"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span>{isExpanded ? 'Hide' : 'Show'} Description</span>
        </button>

        {/* Expandable Description */}
        {isExpanded && (
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
            
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {task.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {nextStatus && nextStatusLabel && (
          <button
            onClick={() => onStatusChange(task.id, nextStatus)}
            className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              nextStatus === 'in-progress' 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <span>{nextStatusLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;