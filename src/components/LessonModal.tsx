import React, { useState } from 'react';
import { X, Save, Video, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lesson: any) => void;
  initialData?: any;
}

export const LessonModal: React.FC<LessonModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    videoUrl: '',
    order: 1
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-godot-darker border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Video className="w-5 h-5 text-godot-blue" />
            {initialData ? 'Editar Lección' : 'Nueva Lección'}
          </h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form className="p-6 space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Título de la Lección</label>
            <input 
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-godot-blue/50 transition-all"
              placeholder="Ej: Introducción a GDScript"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">URL del Video (YouTube/S3)</label>
            <div className="relative">
              <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                className="w-full bg-godot-dark border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-godot-blue/50 transition-all"
                placeholder="https://..."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Orden de Visualización</label>
            <input 
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
              className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-godot-blue/50 transition-all"
              min="1"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-godot-blue hover:bg-godot-blue/80 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-godot-blue/20"
            >
              <Save className="w-4 h-4" />
              {initialData ? 'Guardar Cambios' : 'Crear Lección'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
