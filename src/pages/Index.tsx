import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function Index() {
  const { profile, saveProfile, isAuthenticated } = useUserProfile();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.username || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    saveProfile({
      username: name.trim(),
      email: email.trim()
    });

    navigate('/curso');
  };

  return (
    <div className="min-h-screen bg-radial-dark flex items-center justify-center px-4">
      <main className="max-w-md w-full glass-card rounded-3xl p-8 shadow-2xl glow-primary animate-fade-in">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border border-primary/40 mb-3">
            <span className="text-lg font-black text-primary italic">U</span>
          </div>
          <h1 className="text-xl font-black tracking-[0.25em] uppercase text-foreground">
            UTAMV 360
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            Acceso exclusivo al entrenamiento <span className="font-semibold text-primary">Master 360 Elite</span>.
          </p>
        </header>

        <section className="space-y-4 text-sm text-muted-foreground">
          <p>
            Si estás viendo esta pantalla, significa que ya realizaste el pago y tienes acceso a la versión en desarrollo del curso.
          </p>
          <p className="text-xs text-muted-foreground/70">
            Tus avances se guardarán en este navegador usando almacenamiento local.
            Si borras los datos de navegación, tu progreso se reinicia.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="access-name"
              className="block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
            >
              NOMBRE O ALIAS
            </label>
            <input
              id="access-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="Como quieres aparecer en el curso"
            />
          </div>

          <div>
            <label
              htmlFor="access-email"
              className="block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
            >
              CORREO (OPCIONAL)
            </label>
            <input
              id="access-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="ejemplo@tu-proyecto.com"
            />
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Solo se usa para personalizar tu experiencia. No se envía a ningún servidor en esta versión.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-black tracking-[0.3em] uppercase rounded-full py-3 mt-4 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            {isAuthenticated ? 'CONTINUAR AL CURSO' : 'ENTRAR AL CURSO'}
          </button>
        </form>

        <footer className="mt-6 text-[10px] text-center text-muted-foreground/70">
          UTAMV Protocol · Curso Master 360 Elite · Versión demo local
        </footer>
      </main>
    </div>
  );
}
