import { Module } from '@/data/modules';
import digitalMarketingImg from '@/assets/digital-marketing.jpg';
import socialMediaImg from '@/assets/social-media.jpg';
import analyticsImg from '@/assets/analytics.jpg';
import automationImg from '@/assets/automation.jpg';

interface ModuleContentProps {
  module: Module;
}

export function ModuleContent({ module }: ModuleContentProps) {
  switch (module.id) {
    case 1:
      return <Module1Content />;
    case 2:
      return <Module2Content />;
    case 3:
      return <Module3Content />;
    case 4:
      return <Module4Content />;
    case 5:
      return <Module5Content />;
    case 6:
      return <Module6Content />;
    default:
      return <div className="text-muted-foreground">Contenido no disponible</div>;
  }
}

function Module1Content() {
  return (
    <article className="space-y-6 animate-fade-in">
      <header>
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
          Módulo 01 · Fundamentos
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-black text-foreground">
          Mindset IA y Autoridad
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Antes de hacer anuncios o posts, necesitas pensar como <span className="font-semibold text-foreground">arquitecto de autoridad</span>.
          Este módulo te ayuda a definir quién eres en el mercado y qué señal quieres enviar.
        </p>
      </header>

      <img 
        src={digitalMarketingImg} 
        alt="Digital Marketing" 
        className="w-full h-48 object-cover rounded-2xl"
      />

      <section className="space-y-3">
        <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
          Objetivo del módulo
        </h2>
        <p className="text-sm text-muted-foreground">
          Que seas capaz de describir en una frase clara:
          <span className="font-semibold text-foreground"> a quién ayudas, con qué problema y con qué resultado medible</span>.
          Esa frase será la base de tus mensajes de marketing y de tus prompts de IA.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Mapa mental rápido
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>· Persona sin estrategia → publica cosas sueltas, sin hilo conductor.</li>
            <li>· Marketer clásico → empuja ofertas, pero sin una identidad clara.</li>
            <li>· Arquitecto de autoridad IA → diseña señales que humanos e IAs reconocen como expertise.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Ejercicio práctico
          </h3>
          <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Completa esta frase: "Ayudo a ______ a resolver ______ para lograr ______".</li>
            <li>Escribe 3 problemas concretos que vive hoy tu cliente ideal.</li>
            <li>Escribe 3 resultados medibles que puede obtener contigo.</li>
          </ol>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/30 p-4">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80 mb-2">
          Checklist de mentalidad
        </h3>
        <ul className="text-xs text-foreground/80 space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-success">☑</span> Puedo decir en una frase clara a quién ayudo.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">☑</span> Entiendo que la IA es un amplificador, no un sustituto.
          </li>
        </ul>
      </section>
    </article>
  );
}

function Module2Content() {
  return (
    <article className="space-y-6 animate-fade-in">
      <header>
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
          Módulo 02 · Estrategia
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-black text-foreground">
          Arquitectura GEO Pro
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Diseña tu ecosistema digital para que los motores de búsqueda generativos 
          <span className="font-semibold text-foreground"> (Google SGE, Perplexity, ChatGPT)</span> te reconozcan como autoridad.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
          ¿Qué es GEO?
        </h2>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-accent">Generative Engine Optimization</span> es la evolución del SEO tradicional.
          No solo optimizas para que te encuentren, sino para que las IAs te citen como fuente confiable.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Pilares del GEO
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>· <span className="text-foreground font-medium">Contenido estructurado:</span> Usa headers, listas y datos claros.</li>
            <li>· <span className="text-foreground font-medium">Citas y fuentes:</span> Enlaza a estudios y datos verificables.</li>
            <li>· <span className="text-foreground font-medium">Formato FAQ:</span> Responde preguntas directas.</li>
            <li>· <span className="text-foreground font-medium">Schema markup:</span> Ayuda a las IAs a entender tu contenido.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Ejercicio: Tu mapa GEO
          </h3>
          <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Lista 10 preguntas que tu cliente busca en Google.</li>
            <li>Clasifícalas: informativas, comparativas o transaccionales.</li>
            <li>Crea un documento con la respuesta ideal para cada una.</li>
          </ol>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/30 p-4">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80 mb-2">
          Tu ecosistema mínimo viable
        </h3>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-background/50 border border-border">
            <div className="text-accent font-bold mb-1">Landing</div>
            <div className="text-muted-foreground">Tu página central</div>
          </div>
          <div className="p-3 rounded-xl bg-background/50 border border-border">
            <div className="text-primary font-bold mb-1">Blog/FAQ</div>
            <div className="text-muted-foreground">Contenido indexable</div>
          </div>
          <div className="p-3 rounded-xl bg-background/50 border border-border">
            <div className="text-success font-bold mb-1">Social</div>
            <div className="text-muted-foreground">Señales de autoridad</div>
          </div>
        </div>
      </section>
    </article>
  );
}

function Module3Content() {
  return (
    <article className="space-y-6 animate-fade-in">
      <header>
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
          Módulo 03 · Ejecución
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-black text-foreground">
          Landing de Alta Conversión
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Construye una página que convierta visitantes en clientes usando 
          <span className="font-semibold text-foreground"> psicología de persuasión y copywriting estratégico</span>.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
          Anatomía de una landing efectiva
        </h2>
        <div className="space-y-2">
          {[
            { num: 1, title: 'Hero con promesa clara', desc: 'Qué obtendrán y cómo' },
            { num: 2, title: 'Problema y agitación', desc: 'Identifica su dolor' },
            { num: 3, title: 'Tu solución', desc: 'Presenta tu metodología' },
            { num: 4, title: 'Prueba social', desc: 'Testimonios y casos' },
            { num: 5, title: 'CTA irresistible', desc: 'Acción clara con urgencia' },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-3 text-sm">
              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                {item.num}
              </span>
              <div>
                <span className="font-medium text-foreground">{item.title}</span>
                <span className="text-muted-foreground"> - {item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/30 p-4">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80 mb-3">
          Ejercicio final: Tu landing
        </h3>
        <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
          <li>Escribe tu headline principal (máx. 10 palabras).</li>
          <li>Lista 3 beneficios con resultados medibles.</li>
          <li>Escribe tu CTA con verbo de acción + beneficio.</li>
        </ol>
      </section>
    </article>
  );
}

function Module4Content() {
  return (
    <article className="space-y-6 animate-fade-in">
      <header>
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
          Módulo 04 · Automatización
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-black text-foreground">
          Email Marketing con IA
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Crea secuencias de email automatizadas que nutren leads y convierten usando 
          <span className="font-semibold text-foreground"> Inteligencia Artificial para personalización masiva</span>.
        </p>
      </header>

      <img 
        src={automationImg} 
        alt="Email Automation" 
        className="w-full h-48 object-cover rounded-2xl"
      />

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Tipos de secuencias
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>· <span className="text-foreground font-medium">Bienvenida:</span> 3-5 emails introductorios.</li>
            <li>· <span className="text-foreground font-medium">Nurturing:</span> Educar y generar confianza.</li>
            <li>· <span className="text-foreground font-medium">Venta:</span> Secuencia de lanzamiento.</li>
            <li>· <span className="text-foreground font-medium">Re-engagement:</span> Recuperar leads fríos.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Prompts para IA
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>· "Escribe un subject line con curiosidad para [tema]"</li>
            <li>· "Crea un email de bienvenida con historia personal"</li>
            <li>· "Genera 5 variantes de CTA para [oferta]"</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/30 p-4">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80 mb-3">
          Ejercicio: Tu secuencia de bienvenida
        </h3>
        <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
          <li>Define el objetivo de tu secuencia (venta, engagement, cita).</li>
          <li>Escribe el outline de 5 emails con tema principal.</li>
          <li>Usa IA para generar el primer borrador de cada email.</li>
          <li>Personaliza con tu voz y ejemplos reales.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
          Herramientas recomendadas
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Mailchimp', 'ConvertKit', 'ActiveCampaign', 'Beehiiv', 'Resend'].map((tool) => (
            <span key={tool} className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground border border-border">
              {tool}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}

function Module5Content() {
  return (
    <article className="space-y-6 animate-fade-in">
      <header>
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
          Módulo 05 · Social Media
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-black text-foreground">
          Automatización de Redes Sociales
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Multiplica tu presencia en redes sin multiplicar tu tiempo usando 
          <span className="font-semibold text-foreground"> herramientas de automatización inteligente</span>.
        </p>
      </header>

      <img 
        src={socialMediaImg} 
        alt="Social Media Automation" 
        className="w-full h-48 object-cover rounded-2xl"
      />

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Pilares de automatización
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>· <span className="text-foreground font-medium">Programación:</span> Publica en horarios óptimos.</li>
            <li>· <span className="text-foreground font-medium">Repurposing:</span> Un contenido → múltiples formatos.</li>
            <li>· <span className="text-foreground font-medium">Engagement:</span> Respuestas automatizadas inteligentes.</li>
            <li>· <span className="text-foreground font-medium">Analytics:</span> Métricas en tiempo real.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Framework de contenido semanal
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>📚 <span className="text-foreground font-medium">Lunes:</span> Educativo</li>
            <li>💡 <span className="text-foreground font-medium">Miércoles:</span> Tips rápidos</li>
            <li>🎯 <span className="text-foreground font-medium">Viernes:</span> CTA / Oferta</li>
            <li>📖 <span className="text-foreground font-medium">Domingo:</span> Historia personal</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/30 p-4">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80 mb-3">
          Ejercicio: Tu sistema de contenido
        </h3>
        <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
          <li>Elige 3 plataformas principales para tu audiencia.</li>
          <li>Crea un banco de 20 ideas de contenido con IA.</li>
          <li>Programa 2 semanas de contenido en una sola sesión.</li>
          <li>Analiza resultados y ajusta el calendario.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
          Herramientas recomendadas
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Buffer', 'Hootsuite', 'Later', 'Metricool', 'Canva', 'CapCut'].map((tool) => (
            <span key={tool} className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground border border-border">
              {tool}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}

function Module6Content() {
  return (
    <article className="space-y-6 animate-fade-in">
      <header>
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
          Módulo 06 · Análisis
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-black text-foreground">
          Analytics y Métricas
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Mide, analiza y optimiza cada aspecto de tu estrategia digital con 
          <span className="font-semibold text-foreground"> datos accionables y dashboards inteligentes</span>.
        </p>
      </header>

      <img 
        src={analyticsImg} 
        alt="Analytics Dashboard" 
        className="w-full h-48 object-cover rounded-2xl"
      />

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Métricas clave (KPIs)
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>· <span className="text-foreground font-medium">CAC:</span> Costo de adquisición de cliente.</li>
            <li>· <span className="text-foreground font-medium">LTV:</span> Valor de vida del cliente.</li>
            <li>· <span className="text-foreground font-medium">CVR:</span> Tasa de conversión.</li>
            <li>· <span className="text-foreground font-medium">ROAS:</span> Retorno de inversión publicitaria.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            El framework AARRR
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2">
            <li>🎯 <span className="text-foreground font-medium">Acquisition:</span> ¿De dónde vienen?</li>
            <li>✅ <span className="text-foreground font-medium">Activation:</span> ¿Primera acción clave?</li>
            <li>🔄 <span className="text-foreground font-medium">Retention:</span> ¿Vuelven?</li>
            <li>💬 <span className="text-foreground font-medium">Referral:</span> ¿Recomiendan?</li>
            <li>💰 <span className="text-foreground font-medium">Revenue:</span> ¿Cuánto generan?</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/30 p-4">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80 mb-3">
          Ejercicio: Tu dashboard mínimo
        </h3>
        <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
          <li>Define 5 métricas críticas para tu negocio.</li>
          <li>Configura tracking en Google Analytics 4.</li>
          <li>Crea un reporte semanal automatizado.</li>
          <li>Establece metas mensuales para cada KPI.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
          Herramientas recomendadas
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Google Analytics', 'Hotjar', 'Mixpanel', 'Looker Studio', 'Amplitude'].map((tool) => (
            <span key={tool} className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground border border-border">
              {tool}
            </span>
          ))}
        </div>
      </section>

      <footer className="pt-4 border-t border-border mt-4 text-center">
        <p className="text-sm font-semibold text-success">
          🎉 ¡Felicidades! Has completado el curso Master 360 Elite.
        </p>
        <p className="text-[11px] text-muted-foreground mt-2">
          Ahora puedes generar tu certificado de finalización.
        </p>
      </footer>
    </article>
  );
}
