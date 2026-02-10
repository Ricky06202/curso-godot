import React from 'react';
import { Search, BarChart3, X, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Student {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  progress?: number;
  joinedDate?: string;
}

interface AdminStudentsProps {
  students: Student[];
  onViewProgress?: (student: Student) => void;
}

export const AdminStudents: React.FC<AdminStudentsProps> = ({ students, onViewProgress }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">Estudiantes</h1>
        <p className="text-white/50 mt-1">Monitorea a los usuarios registrados en la plataforma.</p>
      </header>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="text" placeholder="Buscar estudiante..." className="w-full bg-godot-dark border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-godot-blue/50" />
          </div>
          <div className="text-xs text-white/40">
            Total: <span className="text-white font-bold">{students.length}</span> usuarios
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4">Estudiante</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.username} className="w-8 h-8 rounded-full border border-white/10" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-godot-blue/20 flex items-center justify-center text-godot-blue text-[10px] font-bold">
                        {student.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{student.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white/60">{student.email}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewProgress?.(student)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-godot-blue/20 text-white/40 hover:text-godot-blue rounded-lg transition-all text-[10px] font-bold uppercase tracking-wider"
                    >
                      <BarChart3 className="w-3 h-3" />
                      Ver Progreso
                    </button>
                    <span className="text-[10px] font-mono text-white/10 ml-2">{student.id}</span>
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

interface ProgressModalProps {
  student: Student | null;
  progress: any[];
  onClose: () => void;
}

export const UserProgressModal: React.FC<ProgressModalProps> = ({ student, progress, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-godot-darker border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-godot-blue/20 flex items-center justify-center text-godot-blue text-sm font-bold">
              {student.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold">Progreso de Usuario</h3>
              <p className="text-xs text-white/40">{student.username}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white"><X className="w-6 h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Lecciones Completadas</h4>
            {progress.length === 0 ? (
              <div className="p-8 text-center border border-white/5 rounded-xl bg-white/2">
                <p className="text-sm text-white/20">Este usuario aún no ha completado ninguna lección.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {progress.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-godot-green" />
                    <span className="text-sm">{item.lesson_title || `Lección ID: ${item.lesson_id}`}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-white/5 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/40">Total completado:</span>
            <span className="text-lg font-bold text-godot-blue">{progress.length} lecciones</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
