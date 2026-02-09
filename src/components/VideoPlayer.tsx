import React, { useState } from 'react';
import { Maximize, Minimize, Play, Pause, Volume2, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, thumbnail }) => {
  const [isCineMode, setIsCineMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative transition-all duration-500 ease-in-out ${isCineMode ? 'fixed inset-0 z-[100] bg-black flex items-center justify-center' : 'w-full aspect-video rounded-xl overflow-hidden bg-godot-darker border border-white/10 shadow-2xl'}`}>
      
      {/* Fake Video Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        {!isPlaying && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(true)}
            className="w-20 h-20 rounded-full bg-godot-blue/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(71,140,191,0.5)] z-10"
          >
            <Play className="w-8 h-8 fill-current" />
          </motion.button>
        )}
        
        {thumbnail && !isPlaying && (
          <img src={thumbnail} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer">
          <div className="h-full bg-godot-blue w-1/3" />
        </div>
        
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <Volume2 className="w-5 h-5 opacity-70" />
            <span className="text-xs font-mono">01:45 / 05:00</span>
          </div>

          <div className="flex items-center gap-4">
            <Settings className="w-5 h-5 opacity-70" />
            <button 
              onClick={() => setIsCineMode(!isCineMode)}
              className="hover:text-godot-blue transition-colors"
              title="Modo Cine"
            >
              {isCineMode ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isCineMode && (
        <button 
          onClick={() => setIsCineMode(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
        >
          <Minimize className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};
