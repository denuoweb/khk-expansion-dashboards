import React, { useState } from 'react';
import { Users, Target, FileText, Megaphone, UserPlus, Shield, BarChart3, Settings, Eye } from 'lucide-react';
import RoleSelector from './components/RoleSelector';
import DashboardLayout from './components/DashboardLayout';
import TaskBoard from './components/TaskManagement/TaskBoard';
import ChairDashboard from './components/dashboards/ChairDashboard';
import ViceChairDashboard from './components/dashboards/ViceChairDashboard';
import SecretaryDashboard from './components/dashboards/SecretaryDashboard';
import MarketingDashboard from './components/dashboards/MarketingDashboard';
import RecruitmentDashboard from './components/dashboards/RecruitmentDashboard';
import ChapterDevDashboard from './components/dashboards/ChapterDevDashboard';
import ComplianceDashboard from './components/dashboards/ComplianceDashboard';
import DataAnalyticsDashboard from './components/dashboards/DataAnalyticsDashboard';

export interface Role {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  permissions?: 'full' | 'view-only';
}

export interface UserAssignment {
  roleId: string;
  name: string;
  email: string;
  assignedDate: string;
  status: 'active' | 'pending' | 'inactive';
}

const roles: Role[] = [
  {
    id: 'chair',
    name: 'Chair',
    icon: Users,
    color: 'bg-blue-600',
    description: 'Overview of all positions and progress tracking',
    permissions: 'full'
  },
  {
    id: 'vice-chair',
    name: 'Vice-Chair',
    icon: Target,
    color: 'bg-indigo-600',
    description: 'KPI tracking and trajectory maintenance',
    permissions: 'full'
  },
  {
    id: 'secretary',
    name: 'Secretary',
    icon: FileText,
    color: 'bg-purple-600',
    description: 'Minutes and data archives management',
    permissions: 'full'
  },
  {
    id: 'marketing',
    name: 'Marketing Specialist',
    icon: Megaphone,
    color: 'bg-pink-600',
    description: 'Branding guidelines and template creation',
    permissions: 'full'
  },
  {
    id: 'recruitment',
    name: 'Recruitment & Outreach',
    icon: UserPlus,
    color: 'bg-green-600',
    description: 'University contacts and outreach coordination',
    permissions: 'full'
  },
  {
    id: 'chapter-dev',
    name: 'Chapter Development',
    icon: Shield,
    color: 'bg-yellow-600',
    description: 'Colony mentorship and integration',
    permissions: 'full'
  },
  {
    id: 'compliance',
    name: 'Compliance Officer',
    icon: Shield,
    color: 'bg-red-600',
    description: 'Risk assessment and compliance monitoring',
    permissions: 'full'
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics Manager',
    icon: BarChart3,
    color: 'bg-cyan-600',
    description: 'KPI statistics and university research',
    permissions: 'full'
  },
  {
    id: 'visitor',
    name: 'Visitor',
    icon: Eye,
    color: 'bg-gray-600',
    description: 'View-only access to dashboards and reports',
    permissions: 'view-only'
  }
];

type ViewMode = 'dashboard' | 'tasks';

function App() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [userAssignments, setUserAssignments] = useState<UserAssignment[]>([
    {
      roleId: 'chair',
      name: 'John Smith',
      email: 'j.smith@khk.org',
      assignedDate: '2024-01-01',
      status: 'active'
    },
    {
      roleId: 'vice-chair',
      name: 'Sarah Johnson',
      email: 's.johnson@khk.org',
      assignedDate: '2024-01-01',
      status: 'active'
    }
  ]);

  const renderDashboard = () => {
    if (!selectedRole) return null;

    const dashboardProps = {
      userAssignments,
      setUserAssignments,
      roles,
      isViewOnly: selectedRole.permissions === 'view-only'
    };

    switch (selectedRole.id) {
      case 'chair':
        return <ChairDashboard {...dashboardProps} />;
      case 'vice-chair':
        return <ViceChairDashboard {...dashboardProps} />;
      case 'secretary':
        return <SecretaryDashboard {...dashboardProps} />;
      case 'marketing':
        return <MarketingDashboard {...dashboardProps} />;
      case 'recruitment':
        return <RecruitmentDashboard {...dashboardProps} />;
      case 'chapter-dev':
        return <ChapterDevDashboard {...dashboardProps} />;
      case 'compliance':
        return <ComplianceDashboard {...dashboardProps} />;
      case 'data-analytics':
        return <DataAnalyticsDashboard {...dashboardProps} />;
      case 'visitor':
        return <ChairDashboard {...dashboardProps} />; // Visitors see Chair dashboard in read-only mode
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (viewMode === 'tasks') {
      return <TaskBoard roles={roles} currentRole={selectedRole!} isViewOnly={selectedRole?.permissions === 'view-only'} />;
    }
    return renderDashboard();
  };

  if (!selectedRole) {
    return <RoleSelector roles={roles} onRoleSelect={setSelectedRole} />;
  }

  return (
    <DashboardLayout 
      role={selectedRole} 
      onRoleChange={() => {
        setSelectedRole(null);
        setViewMode('dashboard');
      }}
      onTasksClick={() => setViewMode(viewMode === 'tasks' ? 'dashboard' : 'tasks')}
      isViewOnly={selectedRole.permissions === 'view-only'}
    >
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;