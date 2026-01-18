-- Certificados emitidos
create table if not exists access_academy.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  certificate_hash text not null, -- Firma digital quantum
  hologram_url text default '/holograms/tamv-hologram.svg',
  issued_at timestamp default now(),
  valid_until timestamp,
  is_valid boolean default true
);

-- Registro público de certificados (para validación externa)
create table if not exists access_academy.certificate_registry (
  certificate_id uuid references access_academy.certificates(id),
  blockchain_tx text, -- hash de registro en blockchain/notaría digital
  registered_at timestamp default now(),
  primary key (certificate_id)
);
