import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseNavbar } from '@/components/course/CourseNavbar';
import { ModuleList } from '@/components/course/ModuleList';
import { ModuleViewer } from '@/components/course/ModuleViewer';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Module } from '@/data/modules';

export default function Course() {
  const { isAuthenticated, isLoading } = useUserProfile();
  const { markModuleCompleted } = useCourseProgress();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
    markModuleCompleted(module.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-radial-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-lg font-black text-primary italic">U</span>
          </div>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-radial-dark">
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-black -z-10" />
      
      <CourseNavbar />

      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-8 pb-16">
        <header className="mb-10 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
            Ruta de Autoridad IA · Master 360
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Esta plataforma te guía paso a paso para construir autoridad de marca usando
            Inteligencia Artificial de forma estratégica. Cada módulo incluye explicación,
            ejercicios y checklist para aplicar en tu proyecto real.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <ModuleList
              selectedModuleId={selectedModule?.id ?? null}
              onSelectModule={handleSelectModule}
            />
          </div>

          <section className="md:col-span-2">
            <ModuleViewer module={selectedModule} />
          </section>
        </section>
      </main>
    </div>
  );
}
