import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { CourseNavbar } from '@/components/course/CourseNavbar';
import { ModuleList } from '@/components/course/ModuleList';
import { ModuleViewer } from '@/components/course/ModuleViewer';
import { useAuth } from '@/hooks/useAuth';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Module } from '@/data/modules';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-tamv.jpg';

export default function Course() {
  const { isAuthenticated, isLoading, hasPaid, isAdmin, profile } = useAuth();
  const { markModuleCompleted } = useCourseProgress();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
    markModuleCompleted(module.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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

  // Check if user has access (paid or admin)
  const hasAccess = hasPaid || isAdmin;

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 -z-10">
          <img 
            src={heroImage} 
            alt="TAMV" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>

        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
              <Lock className="w-10 h-10 text-muted-foreground" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Acceso Restringido
              </h1>
              <p className="text-muted-foreground">
                Hola <span className="text-foreground font-medium">{profile?.full_name || 'estudiante'}</span>, 
                tu cuenta aún no tiene acceso al curso. 
                Contacta al administrador para activar tu suscripción.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                Volver al inicio
              </Button>
              <p className="text-xs text-muted-foreground">
                ¿Ya realizaste el pago? El acceso se activa en menos de 24 horas.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
