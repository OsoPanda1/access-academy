import { useNavigate } from 'react-router-dom';
import { ArrowRight, Award, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import heroImage from '@/assets/hero-tamv.jpg';
import digitalMarketingImg from '@/assets/digital-marketing.jpg';

export default function Index() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate('/curso');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <img 
            src={heroImage} 
            alt="TAMV 2026" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-wider text-primary uppercase">
                Curso Premium 2026
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              Master 360 Elite
              <span className="block text-primary">Marketing Digital con IA</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Construye tu autoridad de marca usando Inteligencia Artificial de forma estratégica. 
              6 módulos prácticos para dominar el marketing digital moderno.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button onClick={handleCTA} size="lg" className="gap-2 text-base">
                {isLoading ? 'Cargando...' : isAuthenticated ? 'Ir al curso' : 'Comenzar ahora'}
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver contenido
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-foreground">6</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Módulos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">∞</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Acceso</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">🎓</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Certificado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              Lo que aprenderás
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un programa completo diseñado para llevarte de cero a experto en marketing digital con IA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Mindset IA', desc: 'Piensa como arquitecto de autoridad digital' },
              { icon: '🎯', title: 'GEO Pro', desc: 'Optimización para motores generativos' },
              { icon: '🚀', title: 'Landing Pages', desc: 'Páginas que convierten visitantes en clientes' },
              { icon: '📧', title: 'Email Marketing', desc: 'Secuencias automatizadas con IA' },
              { icon: '📱', title: 'Redes Sociales', desc: 'Automatización y multiplicación de presencia' },
              { icon: '📊', title: 'Analytics', desc: 'Métricas y optimización basada en datos' },
            ].map((feature, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                ¿Por qué este curso?
              </h2>
              <ul className="space-y-4">
                {[
                  'Contenido actualizado 2026 con las últimas estrategias de IA',
                  'Ejercicios prácticos para aplicar en tu negocio real',
                  'Certificado de finalización para tu portafolio',
                  'Acceso de por vida al contenido y actualizaciones',
                  'Comunidad exclusiva de emprendedores digitales',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src={digitalMarketingImg} 
                alt="Digital Marketing" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 flex items-center gap-3">
                <Award className="w-10 h-10 text-primary" />
                <div>
                  <div className="font-bold text-foreground">Certificado</div>
                  <div className="text-xs text-muted-foreground">Al completar el curso</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            ¿Listo para transformar tu marketing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a cientos de emprendedores que ya están construyendo su autoridad digital con IA.
          </p>
          <Button onClick={handleCTA} size="lg" className="gap-2 text-base">
            <BookOpen className="w-5 h-5" />
            {isAuthenticated ? 'Continuar aprendiendo' : 'Acceder al curso'}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-black italic text-primary-foreground">
              U
            </div>
            <span className="font-bold text-foreground">UTAMV 360</span>
          </div>
          <p className="text-xs text-muted-foreground">
            TAMV Online 2026 · Somos LATAM · Master 360 Elite
          </p>
        </div>
      </footer>
    </div>
  );
}
