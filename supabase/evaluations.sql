-- Preguntas de evaluación por tema
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
