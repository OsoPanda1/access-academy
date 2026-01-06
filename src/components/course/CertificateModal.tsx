import { useState, useEffect } from 'react';
import { Award, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Certificate } from './Certificate';
import { useCertificate } from '@/hooks/useCertificate';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { toast } from 'sonner';

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CertificateModal({ open, onOpenChange }: CertificateModalProps) {
  const { certificate, isLoading, isGenerating, generateCertificate, hasCertificate } = useCertificate();
  const { isAllModulesCompleted } = useCourseProgress();
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (open && !hasCertificate && isAllModulesCompleted()) {
      setShowCelebration(true);
    }
  }, [open, hasCertificate, isAllModulesCompleted]);

  const handleGenerate = async () => {
    const { error } = await generateCertificate();
    if (error) {
      toast.error('Error al generar el certificado. Intenta de nuevo.');
    } else {
      toast.success('¡Certificado generado exitosamente!');
      setShowCelebration(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            {hasCertificate ? 'Tu Certificado' : 'Certificado de Finalización'}
          </DialogTitle>
          <DialogDescription>
            {hasCertificate 
              ? 'Aquí está tu certificado del curso Master 360 Elite.'
              : 'Has completado todos los módulos. ¡Genera tu certificado!'
            }
          </DialogDescription>
        </DialogHeader>

        {hasCertificate && certificate ? (
          <Certificate certificate={certificate} />
        ) : showCelebration ? (
          <div className="text-center py-8 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
                <Award className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-primary/20 animate-ping" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                🎉 ¡Felicidades!
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Has completado exitosamente todos los módulos del curso Master 360 Elite. 
                Estás listo para generar tu certificado oficial.
              </p>
            </div>

            <Button 
              onClick={handleGenerate} 
              size="lg" 
              className="gap-2"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  Generar Certificado
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Completa todos los módulos del curso para obtener tu certificado.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
