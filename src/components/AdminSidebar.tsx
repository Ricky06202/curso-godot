import React from 'react';
import { LayoutDashboard, Video, Users, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminSidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Resumen', active: true },
    { icon: Video, label: 'Lecciones', active: false },
    { icon: Users, label: 'Estudiantes', active: false },
    { icon: Settings, label: 'Configuración', active: false },
  ];

  return (
    <div className="w-64 h-screen bg-godot-darker border-r border-white/10 flex flex-col p-4">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 bg-godot-blue rounded-lg flex items-center justify-center shadow-lg shadow-godot-blue/20">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-sm">Godot Admin</h2>
          <p className="text-[10px] text-godot-blue font-bold uppercase tracking-tighter">Panel de Control</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              item.active 
                ? 'bg-godot-blue/10 text-godot-blue border border-godot-blue/20' 
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="pt-4 border-t border-white/10">
        <a 
          href="/dashboard"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:bg-red-500/10 hover:text-red-500 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Salir al Curso
        </a>
      </div>
    </div>
  );
};
