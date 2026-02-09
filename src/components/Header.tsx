import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, User, ShieldCheck, LogOut } from 'lucide-react';

interface HeaderProps {
  progress: number; // 0 to 100
  level: number;
  username?: string;
  avatarUrl?: string;
  userEmail?: string;
}

export const Header: React.FC<HeaderProps> = ({ progress, level, username, avatarUrl, userEmail }) => {
  const isAdmin = userEmail === "ricardosanjurg@gmail.com";
  const API_URL = 'https://godotapi.rsanjur.com';

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/10 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <a href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/favicon.svg" alt="Godot Logo" className="w-8 h-8" />
          <span className="font-bold text-lg hidden md:block">Godot Masterclass</span>
        </a>
        
        {/* RPG Level Badge */}
        <div className="flex items-center gap-2 bg-godot-darker px-3 py-1 rounded-full border border-godot-blue/30">
          <Trophy className="w-4 h-4 text-godot-green" />
          <span className="text-xs font-bold text-godot-blue">LVL {level}</span>
        </div>

        {/* Admin Link (Only for admin) */}
        {isAdmin && (
          <a 
            href="/admin" 
            className="flex items-center gap-2 bg-godot-blue/10 hover:bg-godot-blue/20 text-godot-blue px-3 py-1 rounded-full border border-godot-blue/30 transition-all ml-2"
            title="Panel de Administración"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Admin</span>
          </a>
        )}
      </div>

      {/* RPG Progress Bar */}
      <div className="flex-1 max-w-md mx-8 hidden sm:block">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Progreso del Curso</span>
          <span className="text-[10px] font-bold text-godot-green">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-godot-darker rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-godot-blue to-godot-green relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium leading-none">{username || 'Estudiante'}</p>
          <p className="text-[10px] text-white/50 mt-1 uppercase tracking-tighter">Godot Developer</p>
        </div>
        
        <div className="group relative">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-godot-blue/50 p-0.5 bg-godot-darker cursor-pointer">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-[10px]" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-godot-blue/20">
                <User className="w-6 h-6 text-godot-blue" />
              </div>
            )}
          </div>

          {/* Logout Dropdown/Tooltip */}
          <div className="absolute right-0 top-full pt-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-1 group-hover:translate-y-0 z-50">
            <div className="bg-godot-darker border border-white/10 rounded-xl shadow-2xl p-2 min-w-[150px] relative">
              {/* Invisible bridge to prevent losing hover */}
              <div className="absolute -top-3 left-0 w-full h-3" />
              <a 
                href={`${API_URL}/api/auth/logout`}
                className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
