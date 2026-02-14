import React from 'react';
import { CheckCircle2, Circle, PlayCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  duration: string;
  completed: boolean;
  isLocked?: boolean;
  resources?: any[];
}

interface LessonListProps {
  lessons: Lesson[];
  activeLessonId?: string;
  onLessonSelect: (lesson: Lesson) => void;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, activeLessonId, onLessonSelect }) => {
  const totalSeconds = lessons.reduce((acc, lesson) => {
    return acc + (Number(lesson.duration) || 0);
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const durationText = hours > 0 
    ? `${hours}h ${minutes}m total`
    : `${minutes}m total`;

  const formatLessonDuration = (seconds: number | string) => {
    const total = Number(seconds) || 0;
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-godot-darker rounded-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-white/5">
        <h3 className="font-bold text-sm uppercase tracking-widest text-godot-blue">Contenido del Curso</h3>
        <p className="text-[10px] text-white/50 mt-1">{lessons.length} Lecciones • {durationText}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {lessons.map((lesson, index) => {
          const isActive = lesson.id === activeLessonId;
          
          return (
            <motion.button
              key={lesson.id}
              whileHover={{ x: 4 }}
              onClick={() => !lesson.isLocked && onLessonSelect(lesson)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left group ${
                isActive 
                  ? 'bg-godot-blue/20 border border-godot-blue/30' 
                  : 'hover:bg-white/5 border border-transparent'
              } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex-shrink-0 relative">
                {lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-godot-green" />
                ) : isActive ? (
                  <PlayCircle className="w-5 h-5 text-godot-blue animate-pulse" />
                ) : lesson.isLocked ? (
                  <Lock className="w-5 h-5 text-white/30" />
                ) : (
                  <Circle className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" />
                )}
                
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-godot-blue rounded-r-full"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isActive ? 'text-godot-blue' : 'text-white/80'}`}>
                  <span className="text-[10px] text-white/30 mr-2 font-mono">{(index + 1).toString().padStart(2, '0')}</span>
                  {lesson.title}
                </p>
                <p className="text-[10px] text-white/40 mt-0.5">{formatLessonDuration(lesson.duration)}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
