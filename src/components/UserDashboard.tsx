import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { VideoPlayer } from './VideoPlayer';
import { LessonList, Lesson } from './LessonList';
import { ResourceBox } from './ResourceBox';
import { CompletionButton } from './CompletionButton';

export const UserDashboard: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeResources, setActiveResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId] = useState("1"); // TODO: Obtener de la sesión real

  const BASE_URL = 'https://godotapi.rsanjur.com';

  const fetchResources = async (lessonId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/lessons/${lessonId}/resources`);
      if (response.ok) {
        const resources = await response.json();
        console.log(`Recursos para lección ${lessonId}:`, resources);
        setActiveResources(resources);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    if (activeLesson) {
      // Usar solo resources, ya que 'codes' ha sido eliminado del backend
      const initialResources = activeLesson.resources || [];
      
      if (initialResources.length > 0) {
        console.log('Usando recursos pre-cargados:', initialResources);
        setActiveResources(initialResources);
      } else {
        // Si no hay recursos pre-cargados, intentar cargar de la API
        fetchResources(activeLesson.id);
      }
    }
  }, [activeLesson?.id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/course/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('DATOS DEL CURSO:', data);
        const mappedLessons = data.lessons.map((lesson: any) => ({
          ...lesson,
          id: lesson.id.toString(),
          duration: lesson.duration,
          description: lesson.description || "",
          resources: lesson.resources || [],
          completed: data.progress.some((p: any) => p.lessonId === lesson.id && p.completed)
        }));
        setLessons(mappedLessons);

        // Determinar lección activa desde URL o primera no completada
        const urlParams = new URLSearchParams(window.location.search);
        const urlLessonId = urlParams.get('lesson');
        
        const initialLesson = mappedLessons.find((l: any) => l.id === urlLessonId)
                           || mappedLessons.find((l: any) => !l.completed)
                           || mappedLessons[0];
        
        setActiveLesson(initialLesson);
      } else {
        setError("Error al cargar los datos del curso");
      }
    } catch (e) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLessonSelect = (lesson: Lesson) => {
    // Buscar la lección completa en el estado de lecciones para tener todos los datos
    const fullLesson = lessons.find(l => l.id === lesson.id) || lesson;
    setActiveLesson(fullLesson);
    // Actualizar URL sin recargar
    const url = new URL(window.location.href);
    url.searchParams.set('lesson', lesson.id);
    window.history.pushState({}, '', url);
  };

  const handleToggleCompletion = async () => {
    if (!activeLesson) return;
    // El CompletionButton interno ya maneja la llamada a la API,
    // pero necesitamos refrescar los datos locales para actualizar la lista
    // Esperamos un poco para que la API procese el cambio
    setTimeout(fetchData, 500);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-godot-dark items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-godot-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/50 font-medium animate-pulse">Cargando tu progreso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-godot-dark items-center justify-center p-6">
        <div className="glass p-8 rounded-2xl border border-red-500/20 text-center max-w-md">
          <h2 className="text-xl font-bold text-red-500 mb-2">¡Ups! Algo salió mal</h2>
          <p className="text-white/60 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg transition-all text-white">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const progress = lessons.length > 0 
    ? Math.round((lessons.filter(l => l.completed).length / lessons.length) * 100)
    : 0;
  const level = Math.floor(progress / 10) + 1;

  return (
    <div className="min-h-screen bg-godot-dark flex flex-col">
      <Header 
        progress={progress} 
        level={level} 
        username="Ricardo" 
        userEmail="ricardosanjurg@gmail.com"
      />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1600px] mx-auto w-full">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="space-y-4">
            <VideoPlayer 
              videoUrl={activeLesson?.videoUrl || "#"} 
              thumbnail="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" 
            />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{activeLesson?.title}</h1>
                <p className="text-white/50 text-sm mt-1">Módulo: Desarrollo con Godot 4.6</p>
              </div>
              <div onClick={handleToggleCompletion}>
                <CompletionButton 
                  lessonId={activeLesson?.id || ""} 
                  userId={userId} 
                  isCompleted={activeLesson?.completed || false} 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Sobre esta lección</h3>
              <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">
                {activeLesson?.description || `En esta lección titulada "${activeLesson?.title}", profundizaremos en los conceptos clave de Godot para mejorar tu flujo de trabajo.`}
              </p>
            </div>
            <ResourceBox resources={activeResources} />
          </div>
        </div>

        <aside className="lg:col-span-4 h-[calc(100vh-180px)] sticky top-24">
          <LessonList 
            lessons={lessons} 
            activeLessonId={activeLesson?.id} 
            onLessonSelect={handleLessonSelect} 
          />
        </aside>
      </main>
    </div>
  );
};
