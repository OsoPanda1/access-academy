-- Tabla de lecciones del curso
create table if not exists access_academy.lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  ai_prompt text,
  metadata jsonb,
  created_at timestamp default now()
);

-- Progreso de usuario en cada lección
create table if not exists access_academy.user_lessons (
  user_id uuid references auth.users(id),
  lesson_id uuid references access_academy.lessons(id),
  completed boolean default false,
  completed_at timestamp,
  primary key (user_id, lesson_id)
);
