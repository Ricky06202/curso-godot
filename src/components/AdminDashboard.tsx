import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminSummary } from './admin/AdminSummary';
import { AdminLessons } from './admin/AdminLessons';
import { AdminStudents } from './admin/AdminStudents';
import { AdminSettings } from './admin/AdminSettings';
import { EditModal, DeleteModal } from './admin/AdminModals';

interface Lesson {
  id: number;
  title: string;
  order: number;
  videoUrl: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  joinedDate: string;
  avatar?: string;
}

interface AdminDashboardProps {
  initialLessons: Lesson[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialLessons }) => {
  const [activeSection, setActiveSection] = useState('lecciones');
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [students] = useState<Student[]>([
    { id: '1', name: 'Juan Doe', email: 'juan@example.com', progress: 85, joinedDate: '2024-01-15' },
    { id: '2', name: 'Maria Garcia', email: 'maria@example.com', progress: 40, joinedDate: '2024-02-01' },
    { id: '3', name: 'Ricardo Sanjur', email: 'ricardo@example.com', progress: 100, joinedDate: '2023-12-10' },
  ]);

  const [editingItem, setEditingItem] = useState<any>(null);
  const [deletingItem, setDeletingItem] = useState<any>(null);

  const handleDelete = () => {
    if (!deletingItem) return;
    
    if (deletingItem.title) {
      setLessons(lessons.filter(l => l.id !== deletingItem.id));
    }
    
    setDeletingItem(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'resumen':
        return <AdminSummary studentsCount={students.length} lessonsCount={lessons.length} students={students} lessons={lessons} />;
      case 'lecciones':
        return <AdminLessons lessons={lessons} onEdit={setEditingItem} onDelete={setDeletingItem} />;
      case 'estudiantes':
        return <AdminStudents students={students} onEdit={setEditingItem} onDelete={setDeletingItem} />;
      case 'configuracion':
        return <AdminSettings />;
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

      <EditModal item={editingItem} onClose={() => setEditingItem(null)} />
      <DeleteModal item={deletingItem} onClose={() => setDeletingItem(null)} onConfirm={handleDelete} />
    </div>
  );
};
