-- ============================================================
-- Certificados Académicos UTAMV
-- Este archivo define la emisión y registro de diplomas académicos
-- con blindaje de unicidad, validez y trazabilidad institucional.
-- ============================================================

-- Tabla principal de certificados emitidos
create table if not exists access_academy.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  user_name text not null,              -- Nombre real del alumno
  course_name text not null,            -- Nombre académico del curso/bootcamp
  certificate_hash text not null unique,-- Firma digital quantum única
  hologram_url text default '/holograms/tamv-hologram.svg',
  issued_at timestamp default now(),    -- Fecha de emisión
  valid_until timestamp,                -- Fecha de expiración (opcional)
  is_valid boolean default true,        -- Estado de validez
  constraint unique_user_certificate unique (user_id, is_valid) -- Blindaje: un certificado válido por usuario
);

-- Registro público de certificados para validación externa
create table if not exists access_academy.certificate_registry (
  certificate_id uuid references access_academy.certificates(id) on delete cascade,
  blockchain_tx text not null unique,   -- Hash de registro en blockchain/notaría digital
  registered_at timestamp default now(),
  primary key (certificate_id)
);

-- ============================================================
-- Índices para reforzar seguridad y consultas rápidas
-- ============================================================

-- Búsqueda rápida por usuario
create index if not exists idx_certificates_user
on access_academy.certificates(user_id);

-- Validación externa por hash quantum
create index if not exists idx_certificates_hash
on access_academy.certificates(certificate_hash);

-- ============================================================
-- Blindaje adicional
-- ============================================================

-- Garantizar que el nombre y curso no sean vacíos
alter table access_academy.certificates
  add constraint chk_user_name_not_empty check (char_length(user_name) > 0),
  add constraint chk_course_name_not_empty check (char_length(course_name) > 0);

-- Garantizar que la fecha de emisión sea siempre menor o igual a la fecha de expiración (si existe)
alter table access_academy.certificates
  add constraint chk_valid_until_after_issue check (valid_until is null or valid_until >= issued_at);
