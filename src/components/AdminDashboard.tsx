import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminSummary } from './admin/AdminSummary';
import { AdminLessons } from './admin/AdminLessons';
import { AdminStudents, UserProgressModal } from './admin/AdminStudents';
import { AdminSettings } from './admin/AdminSettings';
import { EditModal, DeleteModal, ResourcesModal } from './admin/AdminModals';

interface Lesson {
  id: number;
  title: string;
  order: number;
  videoUrl: string;
}

interface Student {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  progress?: number;
  joinedDate?: string;
}

interface AdminDashboardProps {
  initialLessons: Lesson[];
  initialUsers?: Student[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialLessons, initialUsers = [] }) => {
  const [activeSection, setActiveSection] = useState('lecciones');
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [students, setStudents] = useState<Student[]>(initialUsers);
  const [globalStats, setGlobalStats] = useState<any>(null);
  const [config, setConfig] = useState<any>({});

  const [editingItem, setEditingItem] = useState<any>(null);
  const [deletingItem, setDeletingItem] = useState<any>(null);
  const [managingResourcesLesson, setManagingResourcesLesson] = useState<any>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [viewingStudentProgress, setViewingStudentProgress] = useState<Student | null>(null);
  const [studentProgress, setStudentProgress] = useState<any[]>([]);

  const BASE_URL = import.meta.env.PUBLIC_API_URL || 'https://godotapi.rsanjur.com';
  const API_URL = `${BASE_URL}/api/lessons`;
  const USERS_API_URL = `${BASE_URL}/api/users`;
  const STATS_API_URL = `${BASE_URL}/api/stats/global`;
  const CONFIG_API_URL = `${BASE_URL}/api/config`;

  const fetchResources = async (lessonId: number) => {
    try {
      const response = await fetch(`${API_URL}/${lessonId}/resources`);
      if (response.ok) {
        setResources(await response.json());
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    if (managingResourcesLesson) {
      fetchResources(managingResourcesLesson.id);
    }
  }, [managingResourcesLesson]);

  const handleAddResource = async (data: any) => {
    if (!managingResourcesLesson) return;
    try {
      const response = await fetch(`${API_URL}/${managingResourcesLesson.id}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        fetchResources(managingResourcesLesson.id);
      }
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const handleDeleteResource = async (resourceId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/resources/${resourceId}`, {
        method: 'DELETE',
      });
      if (response.ok && managingResourcesLesson) {
        fetchResources(managingResourcesLesson.id);
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const fetchStudentProgress = async (studentId: string) => {
    try {
      const response = await fetch(`${USERS_API_URL}/${studentId}/progress`);
      if (response.ok) {
        setStudentProgress(await response.json());
      }
    } catch (error) {
      console.error('Error fetching student progress:', error);
    }
  };

  useEffect(() => {
    if (viewingStudentProgress) {
      fetchStudentProgress(viewingStudentProgress.id);
    }
  }, [viewingStudentProgress]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, statsRes, configRes] = await Promise.all([
          fetch(USERS_API_URL),
          fetch(STATS_API_URL),
          fetch(CONFIG_API_URL)
        ]);

        if (usersRes.ok) setStudents(await usersRes.json());
        if (statsRes.ok) setGlobalStats(await statsRes.json());
        if (configRes.ok) {
          const configData = await configRes.json();
          setConfig(configData);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateConfig = async (updatedConfig: any) => {
    try {
      const response = await fetch(CONFIG_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig),
      });
      if (response.ok) {
        // Refresh config
        const newConfig = await response.json();
        setConfig(newConfig);
      }
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  const handleReorderLessons = async (reorderedLessons: { id: number; order: number }[]) => {
    try {
      const response = await fetch(`${API_URL}/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reorderedLessons),
      });
      if (response.ok) {
        // Refresh lessons
        const updatedLessons = await response.json();
        setLessons(updatedLessons);
      }
    } catch (error) {
      console.error('Error reordering lessons:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editingItem.id === 'new') {
        // Crear : POST /api/lessons
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const newLesson = await response.json();
          setLessons([...lessons, newLesson]);
        }
      } else {
        // Editar : PUT /api/lessons/:id
        const response = await fetch(`${API_URL}/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const updatedLesson = await response.json();
          setLessons(lessons.map(l => l.id === editingItem.id ? updatedLesson : l));
        }
      }
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    
    try {
      // Eliminar : DELETE /api/lessons/:id
      const response = await fetch(`${API_URL}/${deletingItem.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setLessons(lessons.filter(l => l.id !== deletingItem.id));
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
    
    setDeletingItem(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'resumen':
        return (
          <AdminSummary 
            studentsCount={globalStats?.totalUsers || students.length} 
            lessonsCount={globalStats?.totalLessons || lessons.length} 
            completionRate={globalStats?.completionRate}
            students={students} 
            lessons={lessons} 
          />
        );
      case 'lecciones':
        return (
          <AdminLessons 
            lessons={lessons} 
            onEdit={setEditingItem} 
            onDelete={setDeletingItem} 
            onAdd={() => setEditingItem({ id: 'new', title: '', videoUrl: '', order: lessons.length + 1 })}
            onReorder={handleReorderLessons}
            onManageResources={setManagingResourcesLesson}
          />
        );
      case 'estudiantes':
        return <AdminStudents students={students} onViewProgress={setViewingStudentProgress} />;
      case 'configuracion':
        return <AdminSettings config={config} onUpdateConfig={handleUpdateConfig} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-godot-dark relative text-white">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>

      <EditModal item={editingItem} onClose={() => setEditingItem(null)} onSave={handleSave} />
      <DeleteModal item={deletingItem} onClose={() => setDeletingItem(null)} onConfirm={handleDelete} />
      <ResourcesModal 
        lesson={managingResourcesLesson} 
        resources={resources}
        onClose={() => setManagingResourcesLesson(null)} 
        onAdd={handleAddResource}
        onDelete={handleDeleteResource}
      />
      <UserProgressModal 
        student={viewingStudentProgress}
        progress={studentProgress}
        onClose={() => setViewingStudentProgress(null)}
      />
    </div>
  );
};
