import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, X, Save, Trash2, ChevronUp } from 'lucide-react';

export const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem('godot_quick_note');
    if (savedNote) setNote(savedNote);
  }, []);

  const saveNote = () => {
    localStorage.setItem('godot_quick_note', note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearNote = () => {
    if (confirm('¿Borrar nota?')) {
      localStorage.removeItem('godot_quick_note');
      setNote('');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-72 bg-godot-darker border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-godot-blue" />
                <span className="text-sm font-bold">Notas Rápidas</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escribe algo importante..."
                className="w-full h-40 bg-black/20 border border-white/5 rounded-xl p-3 text-sm focus:outline-none focus:border-godot-blue/50 transition-colors resize-none custom-scrollbar"
              />
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={saveNote}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-godot-blue hover:bg-godot-blue/80 rounded-lg text-xs font-bold transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saved ? '¡Guardado!' : 'Guardar'}
                </button>
                <button
                  onClick={clearNote}
                  className="px-3 py-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-lg text-xs transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all ${
          isOpen ? 'bg-white text-godot-dark' : 'bg-godot-blue text-white'
        }`}
      >
        {isOpen ? <ChevronUp className="w-6 h-6 rotate-180" /> : <StickyNote className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};
