import React from 'react';
import { Plus, Search, GripVertical, Edit2, Trash2, FileText } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  order: number;
  videoUrl: string;
}

interface AdminLessonsProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (lesson: Lesson) => void;
  onAdd: () => void;
  onReorder?: (reorderedLessons: { id: number; order: number }[]) => void;
  onManageResources?: (lesson: Lesson) => void;
}

export const AdminLessons: React.FC<AdminLessonsProps> = ({ lessons, onEdit, onDelete, onAdd, onManageResources, onReorder }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredLessons = lessons
    .filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.order - b.order);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Lecciones</h1>
          <p className="text-white/50 mt-1">Crea, edita y organiza el contenido del curso.</p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-godot-blue hover:bg-godot-blue/80 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-godot-blue/20"
        >
          <Plus className="w-5 h-5" />
          Nueva Lección
        </button>
      </header>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Buscar lección..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-godot-dark border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-godot-blue/50" 
            />
          </div>
          <div className="text-xs text-white/40">
            Total: <span className="text-white font-bold">{filteredLessons.length}</span> lecciones
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4">Orden</th>
              <th className="px-6 py-4">Título</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-white/20 group-hover:text-white/40 cursor-grab" />
                    <span className="font-mono text-godot-blue">#{lesson.order}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{lesson.title}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onManageResources?.(lesson)} 
                      title="Gestionar Recursos"
                      className="p-2 hover:bg-white/10 text-white/40 hover:text-white rounded-lg transition-all"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(lesson)} title="Editar" className="p-2 hover:bg-godot-blue/20 hover:text-godot-blue rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(lesson)} title="Eliminar" className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredLessons.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-white/20 italic text-sm">
                  No se encontraron lecciones
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
