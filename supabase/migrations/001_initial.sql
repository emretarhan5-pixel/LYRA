create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  avatar_url text,
  plan text default 'free', -- 'free' | 'starter' | 'pro' | 'agency'
  created_at timestamptz default now()
);

create table sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  slug text unique not null,        -- subdomain: slug.lyra.app
  template_id text not null,        -- 'dental' | 'psychologist' | 'clinic' | 'dietitian'
  content jsonb default '{}',       -- şablon içeriği
  is_published boolean default false,
  custom_domain text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references sites(id) on delete cascade,
  form_type text not null,          -- 'contact' | 'appointment'
  full_name text,
  phone text,
  email text,
  message text,
  status text default 'new',        -- 'new' | 'contacted' | 'appointed' | 'closed'
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table sites enable row level security;
alter table leads enable row level security;

create policy "Kendi profilini gör" on profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Kendi sitelerini gör" on sites
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Kendi lead'lerini gör" on leads
  for all
  using (
    site_id in (select id from sites where user_id = auth.uid())
  )
  with check (
    site_id in (select id from sites where user_id = auth.uid())
  );
