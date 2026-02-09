import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompletionButtonProps {
  lessonId: string;
  userId: string;
  isCompleted: boolean;
  onComplete?: () => void;
}

export const CompletionButton: React.FC<CompletionButtonProps> = ({ lessonId, userId, isCompleted, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);

  const handleComplete = async () => {
    if (completed || loading) return;

    setLoading(true);
    const API_URL = 'https://godotapi.rsanjur.com';
    
    try {
      // API call to the real backend
      const response = await fetch(`${API_URL}/api/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, lessonId })
      });

      if (response.ok) {
        setCompleted(true);
        
        // Trigger Confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#478cbf', '#94db74', '#ffffff'] });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#478cbf', '#94db74', '#ffffff'] });
        }, 250);

        if (onComplete) onComplete();
      }
    } catch (error) {
      console.error('Error marking as complete:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: completed ? 1 : 1.02 }}
      whileTap={{ scale: completed ? 1 : 0.98 }}
      onClick={handleComplete}
      disabled={completed || loading}
      className={`relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all shadow-xl ${
        completed 
          ? 'bg-godot-green/20 text-godot-green border-2 border-godot-green/50 cursor-default' 
          : 'bg-godot-green text-godot-dark hover:shadow-godot-green/20 cursor-pointer'
      }`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : completed ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <CheckCircle className="w-5 h-5" />
      )}
      
      <span>{completed ? 'Lección Completada' : 'Marcar como Completada'}</span>

      {!completed && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      )}
    </motion.button>
  );
};
