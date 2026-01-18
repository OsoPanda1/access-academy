-- Preguntas del examen final
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
