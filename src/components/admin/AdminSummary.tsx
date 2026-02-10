import React from 'react';
import { Users, CheckCircle, Clock, Video, TrendingUp } from 'lucide-react';

interface Student {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  progress?: number;
  joinedDate?: string;
}

interface AdminSummaryProps {
  studentsCount: number;
  lessonsCount: number;
  completionRate?: number;
  students: Student[];
  lessons: any[];
}

export const AdminSummary: React.FC<AdminSummaryProps> = ({ studentsCount, lessonsCount, completionRate, students, lessons }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white">Estado del Curso</h1>
        <p className="text-white/50 mt-1">Visión general del rendimiento y participación.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Usuarios" value={studentsCount.toString()} icon={Users} trend={`+${studentsCount}`} color="blue" />
        <StatCard title="Completado" value={`${completionRate || 0}%`} icon={CheckCircle} color="green" />
        <StatCard title="Tiempo Promedio" value="42min" icon={Clock} color="purple" />
        <StatCard title="Lecciones" value={lessonsCount.toString()} icon={Video} color="godot" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-godot-green" />
            Usuarios Recientes
          </h3>
          <div className="space-y-4">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.username} className="w-10 h-10 rounded-full border border-white/10" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-godot-blue/20 flex items-center justify-center text-godot-blue text-xs font-bold uppercase">
                    {student.username.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{student.username}</p>
                  <p className="text-[10px] text-white/30">{student.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold mb-4">Lecciones más populares</h3>
          <div className="space-y-4">
            {lessons.slice(0, 4).map((lesson) => (
              <div key={lesson.id} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>{lesson.title}</span>
                  <span className="text-white/50">85% vistas</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-godot-blue rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => {
  const colors: any = {
    blue: 'text-blue-400 bg-blue-400/10',
    green: 'text-godot-green bg-godot-green/10',
    purple: 'text-purple-400 bg-purple-400/10',
    godot: 'text-godot-blue bg-godot-blue/10',
  };
  return (
    <div className="glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[color] || colors.godot} group-hover:scale-110 transition-transform`}><Icon className="w-6 h-6" /></div>
        {trend && <span className="text-[10px] font-bold text-godot-green bg-godot-green/10 px-2 py-1 rounded-full">{trend}</span>}
      </div>
      <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{title}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  );
};
