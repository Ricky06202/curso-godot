import React from 'react';
import { Search, Mail, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  joinedDate: string;
  avatar?: string;
}

interface AdminStudentsProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export const AdminStudents: React.FC<AdminStudentsProps> = ({ students, onEdit, onDelete }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">Estudiantes</h1>
        <p className="text-white/50 mt-1">Monitorea el progreso y actividad de tus alumnos.</p>
      </header>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="text" placeholder="Buscar estudiante..." className="w-full bg-godot-dark border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-godot-blue/50" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4">Estudiante</th>
              <th className="px-6 py-4">Progreso</th>
              <th className="px-6 py-4">Fecha de Ingreso</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-godot-blue/20 flex items-center justify-center text-godot-blue text-[10px] font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-[10px] text-white/30">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full max-w-[100px] space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-white/50">{student.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-godot-green rounded-full" style={{ width: `${student.progress}%` }} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-white/50">{student.joinedDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEdit(student)} className="p-2 hover:bg-godot-blue/20 hover:text-godot-blue rounded-lg transition-all"><Mail className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(student)} className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
