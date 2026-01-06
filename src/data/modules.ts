export interface Module {
  id: number;
  title: string;
  category: string;
  desc: string;
}

export const modules: Module[] = [
  {
    id: 1,
    title: 'Mindset IA y Autoridad',
    category: 'Fundamentos',
    desc: 'Aprende a pensar como arquitecto de autoridad, no solo como creador de contenido.'
  },
  {
    id: 2,
    title: 'Arquitectura GEO Pro',
    category: 'Estrategia',
    desc: 'Diseña tu ecosistema para motores generativos (Google SGE, Perplexity, etc.).'
  },
  {
    id: 3,
    title: 'Landing de Alta Conversión',
    category: 'Ejecución',
    desc: 'Construye una landing que convierta tráfico en clientes.'
  }
];
