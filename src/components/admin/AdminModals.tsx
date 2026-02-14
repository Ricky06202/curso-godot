import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash, FileText, Download, X, Code2, Pencil, Trash2 } from 'lucide-react';

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
    
    // Obtener minutos y segundos por separado
    const mins = Number(formData.get('duration_mins')) || 0;
    const secs = Number(formData.get('duration_secs')) || 0;
    const totalSeconds = (mins * 60) + secs;

    const data = {
      title: formData.get('title'),
      videoUrl: formData.get('videoUrl'),
      description: formData.get('description'),
      duration: totalSeconds,
      order: Number(formData.get('order')) || 1
    };
    onSave(data);
  };

  // Obtener minutos y segundos para los inputs
  const getDurationParts = (totalSeconds: number) => {
    const mins = Math.floor((totalSeconds || 0) / 60);
    const secs = (totalSeconds || 0) % 60;
    return { mins, secs };
  };

  const durationParts = getDurationParts(item.duration);

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase block">Duración</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input 
                      name="duration_mins"
                      type="number" 
                      defaultValue={item.id === 'new' ? 5 : durationParts.mins} 
                      min="0"
                      required
                      className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none transition-all pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-bold">MIN</span>
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      name="duration_secs"
                      type="number" 
                      defaultValue={item.id === 'new' ? 0 : durationParts.secs} 
                      min="0"
                      max="59"
                      required
                      className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none transition-all pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-bold">SEG</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase block">Orden</label>
                <input 
                  name="order"
                  type="number" 
                  defaultValue={item.order || 1} 
                  required
                  className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none transition-all"
                />
              </div>
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
  onUpdate: (id: number, data: any) => void;
  onDelete: (id: number) => void;
  resources: any[];
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ lesson, onClose, onAdd, onUpdate, onDelete, resources }) => {
  const [editingResource, setEditingResource] = React.useState<any>(null);

  if (!lesson) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get('title'),
      description: formData.get('content'),
      type: 'code'
    };

    if (editingResource) {
      onUpdate(editingResource.id, data);
      setEditingResource(null);
    } else {
      onAdd(data);
    }
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-godot-darker border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div>
            <h3 className="text-xl font-bold">Código de la Lección</h3>
            <p className="text-xs text-white/40 mt-1">{lesson.title}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white"><X className="w-6 h-6" /></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {/* Formulario para añadir/editar */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider">
              {editingResource ? 'Editar Código' : 'Añadir Nuevo Código'}
            </h4>
            <div className="space-y-4">
              <input 
                name="title"
                placeholder="Título del script (ej: Movimiento del Jugador)" 
                required
                defaultValue={editingResource?.title || ''}
                key={editingResource ? `edit-title-${editingResource.id}` : 'add-title'}
                className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none transition-all"
              />
              <textarea 
                name="content"
                placeholder="Pega tu código GDScript aquí..." 
                required
                defaultValue={editingResource?.description || ''}
                key={editingResource ? `edit-desc-${editingResource.id}` : 'add-desc'}
                rows={8}
                className="w-full bg-godot-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-godot-blue outline-none transition-all font-mono text-sm"
              />
            </div>
            <div className="flex gap-3">
              <button 
                type="submit" 
                className="flex-1 bg-godot-blue hover:bg-godot-blue/80 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-godot-blue/20"
              >
                {editingResource ? 'Guardar Cambios' : 'Anexar Código'}
              </button>
              {editingResource && (
                <button 
                  type="button"
                  onClick={() => setEditingResource(null)}
                  className="px-6 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {/* Listado de códigos */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider">Códigos Anexados</h4>
            <div className="grid gap-3">
              {resources.length === 0 ? (
                <div className="text-center py-8 text-white/20 border-2 border-dashed border-white/5 rounded-2xl">
                  No hay códigos anexados a esta lección
                </div>
              ) : (
                resources.map((res) => (
                  <div key={res.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 group">
                    <div className="flex items-center gap-3">
                      <Code2 className="w-5 h-5 text-godot-blue" />
                      <div>
                        <span className="text-white font-medium block">{res.title}</span>
                        <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{res.type}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingResource(res)}
                        className="p-2 text-white/20 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(res.id)}
                        className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
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
