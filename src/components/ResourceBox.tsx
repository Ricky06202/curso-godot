import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Code2 } from 'lucide-react';

interface ResourceBoxProps {
  description: string;
  code?: string;
  downloadUrl?: string;
}

export const ResourceBox: React.FC<ResourceBoxProps> = ({ description, code, downloadUrl }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'code' | 'downloads'>('description');

  const tabs = [
    { id: 'description', label: 'Descripción', icon: FileText },
    { id: 'code', label: 'Código GDScript', icon: Code2 },
    { id: 'downloads', label: 'Recursos', icon: Download },
  ];

  return (
    <div className="bg-godot-darker rounded-xl border border-white/10 overflow-hidden min-h-[300px] flex flex-col shadow-xl">
      <div className="flex border-b border-white/10 bg-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all relative ${
              activeTab === tab.id ? 'text-godot-blue bg-godot-blue/5' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-godot-blue"
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'description' && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="prose prose-invert max-w-none"
            >
              <p className="text-white/70 leading-relaxed">{description}</p>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-mono text-sm bg-black/30 rounded-lg p-4 border border-white/5 overflow-x-auto custom-scrollbar"
            >
              <pre className="text-godot-blue/80">
                <code>{code || '# No hay código disponible para esta lección.'}</code>
              </pre>
            </motion.div>
          )}

          {activeTab === 'downloads' && (
            <motion.div
              key="downloads"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-godot-blue/10 flex items-center justify-center mb-4 border border-godot-blue/20">
                <Download className="w-8 h-8 text-godot-blue" />
              </div>
              <h4 className="font-bold mb-2">Proyecto de Godot (.zip)</h4>
              <p className="text-sm text-white/50 mb-6 max-w-xs">Descarga los archivos base y el código final de esta lección para practicar en local.</p>
              <a 
                href={downloadUrl}
                className="px-6 py-3 bg-godot-blue hover:bg-godot-blue/80 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-godot-blue/20"
              >
                <Download className="w-4 h-4" />
                Descargar Recursos
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
