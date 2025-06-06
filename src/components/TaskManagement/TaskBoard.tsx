import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar, Users, AlertCircle, CheckCircle, Clock, Eye } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Task, TaskStatus, TaskPriority } from '../../types/Task';
import { Role } from '../../App';

interface TaskBoardProps {
  roles: Role[];
  currentRole: Role;
  isViewOnly?: boolean;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ roles, currentRole, isViewOnly = false }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Update University Contact Database',
      description: 'Review and update contact information for all target universities. Verify email addresses and phone numbers for key personnel.',
      status: 'todo',
      priority: 'high',
      assignedPositions: ['recruitment'],
      dueDate: '2024-01-15',
      createdBy: 'chair',
      createdAt: '2024-01-08',
      tags: ['outreach', 'database']
    },
    {
      id: '2',
      title: 'Create Q1 Marketing Templates',
      description: 'Design new email templates for spring recruitment campaign. Include university-specific customization options and brand compliance guidelines.',
      status: 'in-progress',
      priority: 'medium',
      assignedPositions: ['marketing', 'recruitment'],
      dueDate: '2024-01-20',
      createdBy: 'chair',
      createdAt: '2024-01-05',
      tags: ['marketing', 'templates']
    },
    {
      id: '3',
      title: 'Conduct Risk Assessment for Ohio State',
      description: 'Complete comprehensive risk assessment for Ohio State University expansion. Review university policies, Greek life regulations, and potential compliance issues.',
      status: 'in-progress',
      priority: 'high',
      assignedPositions: ['compliance', 'chapter-dev'],
      dueDate: '2024-01-12',
      createdBy: 'vice-chair',
      createdAt: '2024-01-03',
      tags: ['compliance', 'risk-assessment']
    },
    {
      id: '4',
      title: 'Prepare NEC Quarterly Report',
      description: 'Compile quarterly progress report for National Executive Committee. Include KPI metrics, financial summary, and expansion milestones.',
      status: 'todo',
      priority: 'high',
      assignedPositions: ['secretary', 'data-analytics'],
      dueDate: '2024-01-25',
      createdBy: 'chair',
      createdAt: '2024-01-08',
      tags: ['reporting', 'nec']
    },
    {
      id: '5',
      title: 'Archive Q4 Meeting Minutes',
      description: 'Organize and archive all Q4 2023 meeting minutes and related documents. Ensure proper categorization and backup procedures.',
      status: 'done',
      priority: 'low',
      assignedPositions: ['secretary'],
      dueDate: '2024-01-10',
      createdBy: 'secretary',
      createdAt: '2024-01-01',
      tags: ['documentation', 'archive']
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');
  const [filterPosition, setFilterPosition] = useState<string>('all');

  const columns: { status: TaskStatus; title: string; icon: React.ComponentType<any>; color: string }[] = [
    { status: 'todo', title: 'To Do', icon: Clock, color: 'text-gray-600' },
    { status: 'in-progress', title: 'In Progress', icon: AlertCircle, color: 'text-blue-600' },
    { status: 'done', title: 'Done', icon: CheckCircle, color: 'text-green-600' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesPosition = filterPosition === 'all' || task.assignedPositions.includes(filterPosition);
    
    return matchesSearch && matchesPriority && matchesPosition;
  });

  const getTasksByStatus = (status: TaskStatus) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'createdBy'>) => {
    if (isViewOnly) return;
    
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: currentRole.id
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'createdBy'>) => {
    if (isViewOnly || !editingTask) return;
    
    const updatedTask: Task = {
      ...editingTask,
      ...taskData
    };
    
    setTasks(tasks.map(task => task.id === editingTask.id ? updatedTask : task));
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    if (isViewOnly) return;
    
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleEditTask = (task: Task) => {
    if (isViewOnly) return;
    
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (isViewOnly) return;
    
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTaskStats = () => {
    const total = filteredTasks.length;
    const completed = filteredTasks.filter(task => task.status === 'done').length;
    const inProgress = filteredTasks.filter(task => task.status === 'in-progress').length;
    const overdue = filteredTasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'
    ).length;

    return { total, completed, inProgress, overdue };
  };

  const stats = getTaskStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Task Management</h2>
            <p className="text-slate-100">Coordinate tasks across all officer positions and track expansion progress.</p>
          </div>
          {isViewOnly && (
            <div className="flex items-center space-x-2 bg-slate-500 bg-opacity-50 rounded-lg px-3 py-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm">View Only</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-slate-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </div>
            <Calendar className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as TaskPriority | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <option value="all">All Positions</option>
              {roles.filter(role => role.id !== 'visitor').map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          {!isViewOnly && (
            <button
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </button>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(column => {
          const IconComponent = column.icon;
          const columnTasks = getTasksByStatus(column.status);
          
          return (
            <div key={column.status} className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`h-5 w-5 ${column.color}`} />
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
              </div>
              
              <div className="p-4 space-y-3 min-h-[400px]">
                {columnTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    roles={roles}
                    onStatusChange={handleStatusChange}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    isViewOnly={isViewOnly}
                  />
                ))}
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No tasks in this column</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Modal */}
      {isModalOpen && !isViewOnly && (
        <TaskModal
          task={editingTask}
          roles={roles}
          onSave={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskBoard;