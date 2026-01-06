import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Button } from '@/components/ui/button';
import { CertificateModal } from './CertificateModal';

export function CourseNavbar() {
  const { profile, isAdmin, signOut } = useAuth();
  const { getProgressPercentage, isAllModulesCompleted } = useCourseProgress();
  const navigate = useNavigate();
  const progressPercent = getProgressPercentage();
  const [showCertificate, setShowCertificate] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 px-6 md:px-10 py-4 flex items-center justify-between bg-background/80 border-b border-border backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-black italic text-primary-foreground">
            U
          </div>
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              UTAMV · CURSO
            </div>
            <div className="text-sm font-bold text-foreground">
              Master 360 Elite
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Progress bar - hidden on mobile */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="text-[9px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
              PROGRESO
            </span>
            <div className="w-48 h-2 rounded-full progress-bar-track overflow-hidden">
              <div
                className="h-full progress-bar-fill transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              {progressPercent}% COMPLETADO
            </span>
          </div>

          {/* Certificate button */}
          {isAllModulesCompleted() && (
            <Button
              onClick={() => setShowCertificate(true)}
              variant="outline"
              size="sm"
              className="gap-2 text-xs"
            >
              <Award className="w-3 h-3" />
              <span className="hidden sm:inline">Certificado</span>
            </Button>
          )}

          {/* Admin link */}
          {isAdmin && (
            <Button
              onClick={() => navigate('/admin')}
              variant="ghost"
              size="sm"
              className="gap-2 text-xs"
            >
              <Settings className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          )}

          {/* User info */}
          <div className="text-right">
            <div className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">
              {profile?.full_name?.toUpperCase() || 'ESTUDIANTE'}
            </div>
            <button
              onClick={handleLogout}
              className="mt-1 text-[10px] text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1 ml-auto"
            >
              <LogOut className="w-3 h-3" />
              Salir
            </button>
          </div>
        </div>
      </nav>

      <CertificateModal 
        open={showCertificate} 
        onOpenChange={setShowCertificate} 
      />
    </>
  );
}
