-- Examen Final Access Academy – UTAMV
-- Tabla de preguntas del examen final
create table if not exists access_academy.final_exam (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  options text[] not null,
  correct_answer text not null
);

-- Resultados del examen final
create table if not exists access_academy.exam_results (
  user_id uuid references auth.users(id),
  score int not null,
  total_questions int not null,
  percentage numeric generated always as (score::numeric / total_questions * 100) stored,
  passed boolean generated always as (percentage >= 80) stored,
  taken_at timestamp default now(),
  primary key (user_id, taken_at)
);

-- Inserción de 20 preguntas de opción múltiple
insert into access_academy.final_exam (question, options, correct_answer) values
('¿Qué significa SEO?', array['Optimización de motores de búsqueda','Publicidad pagada','Diseño gráfico'], 'Optimización de motores de búsqueda'),
('¿Cuál es un ejemplo de metadato?', array['Título de la página','Color de fondo','Fuente tipográfica'], 'Título de la página'),
('¿Qué diferencia al SEO On-Page del Off-Page?', array['On-Page dentro del sitio, Off-Page fuera','On-Page es publicidad, Off-Page diseño','On-Page es pago, Off-Page gratuito'], 'On-Page dentro del sitio, Off-Page fuera'),
('¿Qué significa Geo-targeting?', array['Segmentar audiencias por ubicación','Optimizar velocidad','Diseñar logotipos'], 'Segmentar audiencias por ubicación'),
('¿Qué dato se usa para segmentar geográficamente?', array['IP, GPS y cookies','Color de la página','Fuente tipográfica'], 'IP, GPS y cookies'),
('¿Cómo se integra el Geo-targeting con SEO local?', array['Usando palabras clave con ubicación','Cambiando colores','Agregando animaciones'], 'Usando palabras clave con ubicación'),
('¿Qué es la publicidad digital?', array['Promoción en medios digitales','Diseño de logotipos','Venta física'], 'Promoción en medios digitales'),
('¿Qué elemento NO es parte de un anuncio digital?', array['Título','Imagen','Fuente tipográfica'], 'Fuente tipográfica'),
('¿Cómo ayuda la IA en publicidad?', array['Genera textos optimizados','Cambia colores','Elimina metadatos'], 'Genera textos optimizados'),
('¿Qué herramienta se usa para analizar SEO?', array['Google Search Console','Photoshop','Excel'], 'Google Search Console'),
('¿Qué es un keyword?', array['Palabra clave para buscadores','Nombre de usuario','Etiqueta HTML'], 'Palabra clave para buscadores'),
('¿Qué significa CTR?', array['Click Through Rate','Costo Total Real','Campaña Target Regional'], 'Click Through Rate'),
('¿Qué es SEM?', array['Search Engine Marketing','Social Engagement Media','Sistema de Enlaces Móviles'], 'Search Engine Marketing'),
('¿Qué es una landing page?', array['Página diseñada para convertir','Página de inicio','Página de contacto'], 'Página diseñada para convertir'),
('¿Qué es remarketing?', array['Reimpactar usuarios que ya interactuaron','Crear un logo nuevo','Optimizar velocidad'], 'Reimpactar usuarios que ya interactuaron'),
('¿Qué significa ROI?', array['Retorno de inversión','Registro oficial internacional','Recurso operativo interno'], 'Retorno de inversión'),
('¿Qué es un call to action?', array['Botón o frase que invita a actuar','Nombre de campaña','Etiqueta HTML'], 'Botón o frase que invita a actuar'),
('¿Qué es un sitemap?', array['Mapa del sitio web para buscadores','Mapa geográfico','Mapa conceptual'], 'Mapa del sitio web para buscadores'),
('¿Qué es un backlink?', array['Enlace externo hacia tu sitio','Enlace interno','Etiqueta HTML'], 'Enlace externo hacia tu sitio'),
('¿Qué es la indexación?', array['Proceso de registrar páginas en buscadores','Proceso de diseño gráfico','Proceso de compra'], 'Proceso de registrar páginas en buscadores');
