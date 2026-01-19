-- ============================================================
-- Banco de Preguntas para Examen Final UTAMV
-- ============================================================

CREATE TABLE IF NOT EXISTS public.exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_option INTEGER NOT NULL CHECK (correct_option >= 0 AND correct_option < 4),
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  topic TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;

-- Política: cualquier usuario autenticado puede leer las preguntas
CREATE POLICY "Authenticated users can read exam questions"
ON public.exam_questions
FOR SELECT
TO authenticated
USING (true);

-- Política: solo admins pueden gestionar preguntas
CREATE POLICY "Admins can manage exam questions"
ON public.exam_questions
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- Registro de Exámenes Completados
-- ============================================================

CREATE TABLE IF NOT EXISTS public.exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Política: usuarios pueden ver sus propios resultados
CREATE POLICY "Users can view their own exam results"
ON public.exam_results
FOR SELECT
USING (auth.uid() = user_id);

-- Política: usuarios pueden insertar sus propios resultados
CREATE POLICY "Users can insert their own exam results"
ON public.exam_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Política: admins pueden ver todos los resultados
CREATE POLICY "Admins can view all exam results"
ON public.exam_results
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- Registro Institucional de Certificados (Blockchain simulado)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.certificate_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id UUID REFERENCES public.certificates(id) ON DELETE CASCADE NOT NULL,
  certificate_hash TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_name TEXT NOT NULL DEFAULT 'Master 360 Elite',
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'valid' CHECK (status IN ('valid', 'revoked', 'expired')),
  UNIQUE(user_id, course_name)
);

-- Habilitar RLS
ALTER TABLE public.certificate_registry ENABLE ROW LEVEL SECURITY;

-- Política: cualquiera puede validar certificados (lectura pública)
CREATE POLICY "Public can validate certificates"
ON public.certificate_registry
FOR SELECT
USING (true);

-- Política: solo el sistema puede insertar registros (via edge function con service role)
CREATE POLICY "Admins can manage certificate registry"
ON public.certificate_registry
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- Insertar preguntas del examen
-- ============================================================

INSERT INTO public.exam_questions (question, options, correct_option, difficulty, topic) VALUES
-- Módulo 1: Mindset IA
('¿Qué significa ser un "arquitecto de autoridad" según el Módulo 1?', 
 ARRAY['Publicar mucho contenido en redes sociales', 'Diseñar una estrategia clara de posicionamiento y mensaje', 'Comprar seguidores para parecer experto', 'Copiar estrategias de la competencia'], 
 1, 'medium', 'Mindset IA'),
('¿Cuál es el rol principal de la IA en marketing según UTAMV?',
 ARRAY['Reemplazar completamente al marketer', 'Amplificar la estrategia existente', 'Crear contenido sin supervisión', 'Reducir costos eliminando empleados'],
 1, 'easy', 'Mindset IA'),
('La frase "Ayudo a X a resolver Y para lograr Z" sirve para:',
 ARRAY['Definir el precio del servicio', 'Clarificar tu propuesta de valor', 'Crear anuncios pagados', 'Optimizar el sitio web'],
 1, 'easy', 'Mindset IA'),

-- Módulo 2: Arquitectura GEO Pro
('¿Qué es GEO en el contexto del marketing digital?',
 ARRAY['Generative Engine Optimization', 'Google Enhanced Optimization', 'General Export Operations', 'Geographic Email Outreach'],
 0, 'medium', 'Arquitectura GEO'),
('¿Cuál es la diferencia principal entre SEO y GEO?',
 ARRAY['SEO es gratis y GEO es de pago', 'SEO optimiza para buscadores tradicionales, GEO para IAs generativas', 'No hay diferencia, son sinónimos', 'GEO solo funciona en redes sociales'],
 1, 'medium', 'Arquitectura GEO'),
('El Schema Markup ayuda a:',
 ARRAY['Mejorar la velocidad del sitio', 'Estructurar datos para que los buscadores entiendan mejor el contenido', 'Crear diseños responsivos', 'Aumentar el tamaño de las imágenes'],
 1, 'hard', 'Arquitectura GEO'),

-- Módulo 3: Landing de Alta Conversión
('¿Cuál es el elemento más importante de una landing page?',
 ARRAY['Muchas animaciones', 'Un llamado a la acción claro', 'Colores brillantes', 'Texto muy largo'],
 1, 'easy', 'Landing Pages'),
('¿Qué significa CTA en marketing digital?',
 ARRAY['Customer Target Analysis', 'Call To Action', 'Content Text Alignment', 'Creative Technology Assets'],
 1, 'easy', 'Landing Pages'),
('¿Cuántos segundos tienes aproximadamente para captar la atención en una landing?',
 ARRAY['60 segundos', '30 segundos', '3-5 segundos', '10 minutos'],
 2, 'medium', 'Landing Pages'),

-- Módulo 4: Email Marketing con IA
('¿Cuál es una buena práctica en email marketing?',
 ARRAY['Enviar correos sin asunto', 'Personalizar el contenido según el destinatario', 'Usar solo mayúsculas', 'Enviar 10 correos diarios'],
 1, 'easy', 'Email Marketing'),
('¿Qué métrica indica cuántos abrieron tu email?',
 ARRAY['Click Rate', 'Open Rate', 'Bounce Rate', 'Conversion Rate'],
 1, 'medium', 'Email Marketing'),
('¿Cómo puede ayudar la IA en email marketing?',
 ARRAY['Enviar spam automáticamente', 'Generar asuntos y contenido personalizado', 'Eliminar suscriptores', 'Reducir la lista de contactos'],
 1, 'medium', 'Email Marketing'),

-- Módulo 5: Automatización de Redes Sociales
('¿Qué herramienta NO es de automatización de redes sociales?',
 ARRAY['Hootsuite', 'Buffer', 'Microsoft Excel', 'Later'],
 2, 'easy', 'Automatización'),
('¿Cuál es el beneficio principal de automatizar redes sociales?',
 ARRAY['Publicar sin pensar en el contenido', 'Mantener consistencia y ahorrar tiempo', 'Evitar interactuar con la audiencia', 'Gastar más en publicidad'],
 1, 'medium', 'Automatización'),
('¿Qué es un "calendario de contenido"?',
 ARRAY['Un calendario físico de pared', 'Una planificación estratégica de publicaciones', 'Una herramienta de análisis', 'Un tipo de anuncio'],
 1, 'easy', 'Automatización'),

-- Módulo 6: Analytics y Métricas
('¿Qué mide el ROI en marketing?',
 ARRAY['Reach Over Internet', 'Return On Investment', 'Rate Of Interaction', 'Revenue Only Index'],
 1, 'medium', 'Analytics'),
('¿Qué herramienta de Google sirve para analizar tráfico web?',
 ARRAY['Google Docs', 'Google Analytics', 'Google Sheets', 'Google Meet'],
 1, 'easy', 'Analytics'),
('¿Qué es una "conversión" en analytics?',
 ARRAY['Cuando un usuario cierra el navegador', 'Cuando un usuario completa una acción deseada', 'Cuando el sitio carga lento', 'Cuando hay un error en la página'],
 1, 'medium', 'Analytics'),
('¿Qué indica una alta tasa de rebote?',
 ARRAY['Los usuarios están muy interesados', 'Los usuarios abandonan rápido sin interactuar', 'El sitio es muy rápido', 'Hay muchas conversiones'],
 1, 'hard', 'Analytics');