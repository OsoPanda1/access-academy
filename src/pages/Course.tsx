import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CreditCard, Loader2 } from 'lucide-react';
import { CourseNavbar } from '@/components/course/CourseNavbar';
import { ModuleList } from '@/components/course/ModuleList';
import { ModuleViewer } from '@/components/course/ModuleViewer';
import ExamModal from '@/components/course/ExamModal';
import { CertificateModal } from '@/components/course/CertificateModal';
import { useAuth } from '@/hooks/useAuth';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useCertificate } from '@/hooks/useCertificate';
import { Module, modules } from '@/data/modules';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-tamv.jpg';

export default function Course() {
  const { isAuthenticated, isLoading, hasPaid, isAdmin, profile, refreshProfile } = useAuth();
  const { completedModules, markModuleCompleted, getProgressPercentage } = useCourseProgress();
  const { certificate, hasCertificate, generateCertificate, isGenerating } = useCertificate();
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [examPassed, setExamPassed] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
    markModuleCompleted(module.id);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Error al iniciar el pago. Intenta de nuevo.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleExamPassed = () => {
    setExamPassed(true);
    toast.success('¡Felicidades! Has aprobado el examen final.');
  };

  const handleGenerateCertificate = async () => {
    const result = await generateCertificate();
    if (result.error) {
      toast.error('Error al generar el certificado');
    } else {
      toast.success('¡Certificado generado exitosamente!');
      setShowCertificate(true);
    }
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
  const progressPercent = getProgressPercentage();
  const allModulesCompleted = progressPercent === 100;

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
                Desbloquea el Curso
              </h1>
              <p className="text-muted-foreground mb-4">
                Hola <span className="text-foreground font-medium">{profile?.full_name || 'estudiante'}</span>, 
                obtén acceso completo al Master 360 Elite y transforma tu marketing digital.
              </p>
              
              <div className="glass-card rounded-2xl p-6 mb-6 text-left">
                <div className="text-3xl font-black text-primary mb-2">$97 USD</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ 6 módulos completos</li>
                  <li>✓ Ejercicios prácticos</li>
                  <li>✓ Certificado oficial UTAMV</li>
                  <li>✓ Acceso de por vida</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full gap-2"
                size="lg"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pagar con Stripe
                  </>
                )}
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="ghost"
                className="w-full"
              >
                Volver al inicio
              </Button>
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

        {/* Exam & Certificate Section */}
        {allModulesCompleted && (
          <div className="mb-8 glass-card rounded-2xl p-6 border-primary/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">
                  🎉 ¡Has completado todos los módulos!
                </h2>
                <p className="text-sm text-muted-foreground">
                  {hasCertificate 
                    ? 'Ya tienes tu certificado. ¡Felicidades!' 
                    : examPassed 
                      ? 'Aprobaste el examen. Genera tu certificado ahora.'
                      : 'Realiza el examen final para obtener tu certificado.'}
                </p>
              </div>
              <div className="flex gap-3">
                {!examPassed && !hasCertificate && (
                  <Button onClick={() => setShowExam(true)}>
                    Realizar Examen
                  </Button>
                )}
                {(examPassed || hasCertificate) && !hasCertificate && (
                  <Button 
                    onClick={handleGenerateCertificate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      'Generar Certificado'
                    )}
                  </Button>
                )}
                {hasCertificate && (
                  <Button onClick={() => setShowCertificate(true)}>
                    Ver Certificado
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

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

      {/* Exam Modal */}
      <ExamModal 
        isOpen={showExam} 
        onClose={() => setShowExam(false)}
        onPassed={handleExamPassed}
      />

      {/* Certificate Modal */}
      <CertificateModal
        open={showCertificate}
        onOpenChange={setShowCertificate}
      />
    </div>
  );
}
