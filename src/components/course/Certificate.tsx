import { useRef } from 'react';
import { Award, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Certificate as CertificateType } from '@/hooks/useCertificate';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CertificateProps {
  certificate: CertificateType;
}

export function Certificate({ certificate }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Simple print-based download
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Certificado TAMV Master 360',
          text: `He completado el curso Master 360 Elite de TAMV. Certificado: ${certificate.certificate_number}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-primary/30 shadow-2xl shadow-primary/10 print:shadow-none"
      >
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-2">
              CERTIFICADO DE FINALIZACIÓN
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-foreground">
              Master 360 Elite
            </h1>
          </div>

          <div className="py-6 border-y border-border/30">
            <p className="text-sm text-muted-foreground mb-2">
              Este certificado se otorga a
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-accent">
              {certificate.full_name}
            </h2>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Por haber completado exitosamente todos los módulos del programa 
              <span className="text-foreground font-semibold"> UTAMV Master 360 Elite</span>, 
              demostrando competencia en Marketing Digital con Inteligencia Artificial.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Fecha de emisión</p>
              <p className="text-sm font-semibold text-foreground">
                {format(new Date(certificate.issued_at), "d 'de' MMMM, yyyy", { locale: es })}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Número de certificado</p>
              <p className="text-sm font-mono font-semibold text-primary">
                {certificate.certificate_number}
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <div className="text-center">
              <div className="w-32 border-t-2 border-primary/50 mx-auto mb-2" />
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
                TAMV ONLINE 2026
              </p>
              <p className="text-[10px] text-muted-foreground/60">
                Somos LATAM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center print:hidden">
        <Button onClick={handleDownload} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Descargar PDF
        </Button>
        {navigator.share && (
          <Button onClick={handleShare} variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Compartir
          </Button>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground print:hidden">
        Este certificado verifica que has completado satisfactoriamente el curso Master 360 Elite.
      </p>
    </div>
  );
}
