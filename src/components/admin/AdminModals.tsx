import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash, FileText, Download, X } from 'lucide-react';

interface EditModalProps {
  item: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ item, onClose, onSave }) => {
  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get('title'),
      videoUrl: formData.get('videoUrl'),
      description: formData.get('description'),
      order: Number(formData.get('order')) || 1
    };
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-godot-darker border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-bold">{item.id === 'new' ? 'Nueva Lección' : 'Editar Lección'}</h3>
            <button type="button" onClick={onClose} className="text-white/30 hover:text-white"><X className="w-6 h-6" /></button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Título de la Lección</label>
              <input 
                name="title"
                type="text" 
                defaultValue={item.title} 
                required
                className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-white/40 uppercase mb-2 block">URL del Video</label>
              <input 
                name="videoUrl"
                type="text" 
                defaultValue={item.videoUrl} 
                required
                className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Descripción (Sobre esta lección)</label>
              <textarea 
                name="description"
                defaultValue={item.description} 
                required
                rows={3}
                className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-white/40 uppercase mb-2 block">Orden</label>
              <input 
                name="order"
                type="number" 
                defaultValue={item.order || 1} 
                required
                className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none"
              />
            </div>
          </div>
          <div className="p-6 bg-white/5 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-xl text-white/50 hover:bg-white/5 font-bold transition-all">Cancelar</button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-godot-blue text-white font-bold shadow-lg shadow-godot-blue/20">
              {item.id === 'new' ? 'Crear Lección' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

interface ResourcesModalProps {
  lesson: any;
  onClose: () => void;
  onAdd: (data: any) => void;
  onDelete: (id: number) => void;
  resources: any[];
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ lesson, onClose, onAdd, onDelete, resources }) => {
  if (!lesson) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get('title'),
      url: formData.get('url'),
      type: formData.get('type')
    };
    onAdd(data);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-godot-darker border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div>
            <h3 className="text-xl font-bold">Recursos de la Lección</h3>
            <p className="text-xs text-white/40 mt-1">{lesson.title}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white"><X className="w-6 h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* List of resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Recursos Actuales</h4>
            {resources.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-2xl">
                <FileText className="w-8 h-8 text-white/10 mx-auto mb-2" />
                <p className="text-sm text-white/20">No hay recursos asociados a esta lección.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {resources.map((res) => (
                  <div key={res.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                    <div className="p-2 rounded-lg bg-godot-blue/20 text-godot-blue">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{res.title}</p>
                      <p className="text-[10px] text-white/30 font-mono truncate max-w-[300px]">{res.url}</p>
                    </div>
                    <button 
                      onClick={() => onDelete(res.id)}
                      className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add new resource */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Añadir Nuevo Recurso</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input 
                  name="title"
                  placeholder="Título del recurso (ej: Código Fuente)"
                  required
                  className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-godot-blue outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <input 
                  name="url"
                  placeholder="URL del archivo"
                  required
                  className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-godot-blue outline-none transition-all"
                />
              </div>
              <div>
                <select 
                  name="type"
                  className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-godot-blue outline-none appearance-none"
                >
                  <option value="link">Enlace Externo</option>
                  <option value="pdf">Documento PDF</option>
                  <option value="zip">Archivo ZIP</option>
                  <option value="code">Código Fuente</option>
                </select>
              </div>
              <button 
                type="submit"
                className="bg-godot-blue hover:bg-godot-blue/80 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Añadir Recurso
              </button>
            </form>
          </div>
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
          <h3 className="text-2xl font-bold mb-2">¿Eliminar Lección?</h3>
          <p className="text-white/50 mb-8">
            Estás a punto de eliminar la lección <strong>{item.title}</strong>. 
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
