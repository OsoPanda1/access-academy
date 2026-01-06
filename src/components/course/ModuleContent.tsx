import { Module } from '@/data/modules';

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
          <p className="text-[11px] text-muted-foreground/70">
            La IA amplifica lo que ya existe. Si tu mensaje es confuso, la IA amplifica confusión.
            Si es claro, amplifica claridad.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Ejercicio práctico (hazlo ahora)
          </h3>
          <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Completa esta frase: "Ayudo a ______ a resolver ______ para lograr ______".</li>
            <li>Escribe 3 problemas concretos que vive hoy tu cliente ideal (no genéricos).</li>
            <li>Escribe 3 resultados medibles que puede obtener contigo.</li>
          </ol>
          <p className="text-[11px] text-muted-foreground/70">
            Guarda estas frases en tu cuaderno o herramienta de notas. Las usarás en los próximos módulos.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/30 p-4">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80 mb-2">
          Checklist de mentalidad
        </h3>
        <ul className="text-xs text-foreground/80 space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-success">☑</span> Puedo decir en una frase clara a quién ayudo y con qué.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">☑</span> Entiendo que mi objetivo no es publicar más, sino ser referencia clara.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">☑</span> Acepto que la IA es un amplificador, no un sustituto.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">☑</span> Estoy dispuesto a documentar mi experiencia con ejemplos reales.
          </li>
        </ul>
      </section>

      <footer className="pt-4 border-t border-border mt-4">
        <p className="text-[11px] text-muted-foreground">
          Cuando termines este módulo, pasa al Módulo 02: Arquitectura GEO Pro,
          donde verás cómo convertir estas ideas en un mapa de páginas y contenidos.
        </p>
      </footer>
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
            <li>· <span className="text-foreground font-medium">Formato FAQ:</span> Responde preguntas directas de tu audiencia.</li>
            <li>· <span className="text-foreground font-medium">Schema markup:</span> Ayuda a las IAs a entender tu contenido.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
            Ejercicio: Tu mapa GEO
          </h3>
          <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Lista 10 preguntas que tu cliente ideal busca en Google.</li>
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

      <footer className="pt-4 border-t border-border mt-4">
        <p className="text-[11px] text-muted-foreground">
          En el Módulo 03 aplicarás estos conceptos para crear una landing de alta conversión.
        </p>
      </footer>
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
          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">1</span>
            <div>
              <span className="font-medium text-foreground">Hero con promesa clara</span>
              <span className="text-muted-foreground"> - Qué obtendrán y cómo</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">2</span>
            <div>
              <span className="font-medium text-foreground">Problema y agitación</span>
              <span className="text-muted-foreground"> - Identifica su dolor</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">3</span>
            <div>
              <span className="font-medium text-foreground">Tu solución</span>
              <span className="text-muted-foreground"> - Presenta tu metodología</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">4</span>
            <div>
              <span className="font-medium text-foreground">Prueba social</span>
              <span className="text-muted-foreground"> - Testimonios y casos</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">5</span>
            <div>
              <span className="font-medium text-foreground">CTA irresistible</span>
              <span className="text-muted-foreground"> - Acción clara con urgencia</span>
            </div>
          </div>
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
          <li>Identifica 2 objeciones y cómo las respondes.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground/80">
          Herramientas recomendadas
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Figma', 'Webflow', 'Framer', 'Carrd', 'Lovable'].map((tool) => (
            <span key={tool} className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground border border-border">
              {tool}
            </span>
          ))}
        </div>
      </section>

      <footer className="pt-4 border-t border-border mt-4 text-center">
        <p className="text-sm font-semibold text-success">
          🎉 ¡Felicidades! Has completado el curso Master 360.
        </p>
        <p className="text-[11px] text-muted-foreground mt-2">
          Aplica lo aprendido y comparte tus resultados con la comunidad.
        </p>
      </footer>
    </article>
  );
}
