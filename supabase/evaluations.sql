-- Evaluaciones por tema
create table if not exists access_academy.evaluations (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references access_academy.lessons(id),
  question text not null,
  options text[] not null,
  correct_answer text not null,
  points int default 1
);

-- Resultados de evaluaciones por usuario
create table if not exists access_academy.user_evaluations (
  user_id uuid references auth.users(id),
  evaluation_id uuid references access_academy.evaluations(id),
  answer text,
  is_correct boolean,
  scored_points int default 0,
  answered_at timestamp default now(),
  primary key (user_id, evaluation_id)
);

-- Preguntas Lección 1: SEO
insert into access_academy.evaluations (lesson_id, question, options, correct_answer, points) values
('UUID_LECCION1','¿Qué significa SEO?',array['Optimización de motores de búsqueda','Publicidad pagada','Diseño gráfico'],'Optimización de motores de búsqueda',1),
('UUID_LECCION1','¿Cuál es un ejemplo de metadato en SEO?',array['Título de la página','Color de fondo','Fuente tipográfica'],'Título de la página',1),
('UUID_LECCION1','¿Qué diferencia al SEO On-Page del Off-Page?',array['On-Page se aplica dentro del sitio, Off-Page fuera del sitio','On-Page es publicidad, Off-Page es diseño','On-Page es pago, Off-Page gratuito'],'On-Page se aplica dentro del sitio, Off-Page fuera del sitio',1);

-- Preguntas Lección 2: Geo-targeting
insert into access_academy.evaluations (lesson_id, question, options, correct_answer, points) values
('UUID_LECCION2','¿Qué significa Geo-targeting?',array['Segmentar audiencias por ubicación geográfica','Optimizar velocidad de carga','Diseñar logotipos'],'Segmentar audiencias por ubicación geográfica',1),
('UUID_LECCION2','¿Qué dato se usa para segmentar geográficamente?',array['IP, GPS y cookies','Color de la página','Fuente tipográfica'],'IP, GPS y cookies',1),
('UUID_LECCION2','¿Cómo se integra el Geo-targeting con SEO local?',array['Usando palabras clave con ubicación','Cambiando colores del sitio','Agregando animaciones'],'Usando palabras clave con ubicación',1);

-- Preguntas Lección 3: Publicidad con IA
insert into access_academy.evaluations (lesson_id, question, options, correct_answer, points) values
('UUID_LECCION3','¿Qué es la publicidad digital?',array['Promoción en medios digitales','Diseño de logotipos','Venta de productos físicos'],'Promoción en medios digitales',1),
('UUID_LECCION3','¿Qué elemento NO es parte de un anuncio digital?',array['Título','Imagen','Fuente tipográfica'],'Fuente tipográfica',1),
('UUID_LECCION3','¿Cómo ayuda la IA en publicidad?',array['Genera textos y ejemplos optimizados','Cambia colores del sitio','Elimina metadatos'],'Genera textos y ejemplos optimizados',1);
