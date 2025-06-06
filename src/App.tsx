import React, { useState } from 'react';
import { Users, Target, FileText, Megaphone, UserPlus, Shield, BarChart3, Settings } from 'lucide-react';
import { AppProvider } from './contexts/AppContext';
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
}

const roles: Role[] = [
  {
    id: 'chair',
    name: 'Chair',
    icon: Users,
    color: 'bg-blue-600',
    description: 'Overview of all positions and progress tracking'
  },
  {
    id: 'vice-chair',
    name: 'Vice-Chair',
    icon: Target,
    color: 'bg-indigo-600',
    description: 'KPI tracking and trajectory maintenance'
  },
  {
    id: 'secretary',
    name: 'Secretary',
    icon: FileText,
    color: 'bg-purple-600',
    description: 'Minutes and data archives management'
  },
  {
    id: 'marketing',
    name: 'Marketing Specialist',
    icon: Megaphone,
    color: 'bg-pink-600',
    description: 'Branding guidelines and template creation'
  },
  {
    id: 'recruitment',
    name: 'Recruitment & Outreach',
    icon: UserPlus,
    color: 'bg-green-600',
    description: 'University contacts and outreach coordination'
  },
  {
    id: 'chapter-dev',
    name: 'Chapter Development',
    icon: Shield,
    color: 'bg-yellow-600',
    description: 'Colony mentorship and integration'
  },
  {
    id: 'compliance',
    name: 'Compliance Officer',
    icon: Shield,
    color: 'bg-red-600',
    description: 'Risk assessment and compliance monitoring'
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics Manager',
    icon: BarChart3,
    color: 'bg-cyan-600',
    description: 'KPI statistics and university research'
  }
];

type ViewMode = 'dashboard' | 'tasks';

function App() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');

  const renderDashboard = () => {
    if (!selectedRole) return null;

    switch (selectedRole.id) {
      case 'chair':
        return <ChairDashboard />;
      case 'vice-chair':
        return <ViceChairDashboard />;
      case 'secretary':
        return <SecretaryDashboard />;
      case 'marketing':
        return <MarketingDashboard />;
      case 'recruitment':
        return <RecruitmentDashboard />;
      case 'chapter-dev':
        return <ChapterDevDashboard />;
      case 'compliance':
        return <ComplianceDashboard />;
      case 'data-analytics':
        return <DataAnalyticsDashboard />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (viewMode === 'tasks') {
      return <TaskBoard roles={roles} currentRole={selectedRole!} />;
    }
    return renderDashboard();
  };

  if (!selectedRole) {
    return (
      <AppProvider>
        <RoleSelector roles={roles} onRoleSelect={setSelectedRole} />
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <DashboardLayout 
        role={selectedRole} 
        onRoleChange={() => {
          setSelectedRole(null);
          setViewMode('dashboard');
        }}
        onTasksClick={() => setViewMode(viewMode === 'tasks' ? 'dashboard' : 'tasks')}
      >
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}

export default App;