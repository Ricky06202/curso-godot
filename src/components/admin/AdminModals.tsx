import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash } from 'lucide-react';

interface EditModalProps {
  item: any;
  onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-godot-darker border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-bold">Editar {item.title ? 'Lección' : 'Estudiante'}</h3>
          <button onClick={onClose} className="text-white/30 hover:text-white"><Plus className="w-6 h-6 rotate-45" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Nombre / Título</label>
            <input 
              type="text" 
              defaultValue={item.title || item.name} 
              className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none transition-all"
            />
          </div>
          {item.videoUrl && (
            <div>
              <label className="text-xs font-bold text-white/40 uppercase mb-2 block">URL del Video</label>
              <input type="text" defaultValue={item.videoUrl} className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none" />
            </div>
          )}
          {item.email && (
            <div>
              <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Email</label>
              <input type="text" defaultValue={item.email} className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none" />
            </div>
          )}
        </div>
        <div className="p-6 bg-white/5 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 rounded-xl text-white/50 hover:bg-white/5 font-bold transition-all">Cancelar</button>
          <button className="px-6 py-2 rounded-xl bg-godot-blue text-white font-bold shadow-lg shadow-godot-blue/20">Guardar Cambios</button>
        </div>
      </motion.div>
    </div>
  );
};

interface DeleteModalProps {
  item: any;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ item, onClose, onConfirm }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-godot-darker border border-red-500/20 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">¿Estás seguro?</h3>
          <p className="text-white/50 mb-8">
            Estás a punto de eliminar <strong>{item.title || item.name}</strong>. 
            Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/20 transition-all"
            >
              Sí, Eliminar
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
