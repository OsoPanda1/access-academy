export interface Module {
  id: number;
  title: string;
  category: string;
  desc: string;
  image?: string;
}

export const modules: Module[] = [
  {
    id: 1,
    title: 'Mindset IA y Autoridad',
    category: 'Fundamentos',
    desc: 'Aprende a pensar como arquitecto de autoridad, no solo como creador de contenido.',
  },
  {
    id: 2,
    title: 'Arquitectura GEO Pro',
    category: 'Estrategia',
    desc: 'Diseña tu ecosistema para motores generativos (Google SGE, Perplexity, etc.).',
  },
  {
    id: 3,
    title: 'Landing de Alta Conversión',
    category: 'Ejecución',
    desc: 'Construye una landing que convierta tráfico en clientes.',
  },
  {
    id: 4,
    title: 'Email Marketing con IA',
    category: 'Automatización',
    desc: 'Crea secuencias de email automatizadas que convierten usando IA.',
  },
  {
    id: 5,
    title: 'Automatización de Redes Sociales',
    category: 'Social Media',
    desc: 'Domina las herramientas de automatización para multiplicar tu presencia.',
  },
  {
    id: 6,
    title: 'Analytics y Métricas',
    category: 'Análisis',
    desc: 'Mide, analiza y optimiza cada aspecto de tu estrategia digital.',
  },
];

export const TOTAL_MODULES = modules.length;
