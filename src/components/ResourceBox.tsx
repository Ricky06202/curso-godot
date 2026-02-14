import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description?: string;
  content?: string;
  code?: string;
  type: string;
}

interface ResourceBoxProps {
  resources: Resource[];
}

export const ResourceBox: React.FC<ResourceBoxProps> = ({ resources }) => {
  const [copiedId, setCopiedId] = React.useState<number | null>(null);

  const handleCopy = (id: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-godot-darker rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-xl">
      <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
        <Code2 className="w-5 h-5 text-godot-blue" />
        <h3 className="font-bold text-white">Código GDScript</h3>
      </div>

      <div className="p-6 space-y-6">
        {resources.length > 0 ? (
          resources.map((res) => {
            const displayContent = res.description || res.content || res.code || '';
            return (
              <div key={res.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider">{res.title}</h4>
                  <button
                    onClick={() => handleCopy(res.id, displayContent)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/5"
                  >
                    {copiedId === res.id ? (
                      <>
                        <Check className="w-3 h-3 text-godot-green" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copiar
                      </>
                    )}
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-godot-blue/5 rounded-xl blur-sm group-hover:bg-godot-blue/10 transition-all" />
                  <div className="relative font-mono text-[11px] bg-black/40 rounded-xl p-5 border border-white/5 overflow-x-auto custom-scrollbar max-h-[400px]">
                    <pre className="text-godot-blue/90 leading-relaxed whitespace-pre-wrap">
                      <code>{displayContent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
            <Code2 className="w-10 h-10 text-white/5 mx-auto mb-3" />
            <p className="text-sm text-white/20 italic">No hay fragmentos de código para esta lección.</p>
          </div>
        )}
      </div>
    </div>
  );
};
