create table pageviews (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references sites(id) on delete cascade,
  visited_at timestamptz default now(),
  path text default '/',
  referrer text,
  user_agent text,
  country text
);

create index pageviews_site_id_visited_at
  on pageviews(site_id, visited_at desc);

alter table pageviews enable row level security;

create policy "Pageview kaydı herkese açık" on pageviews
  for insert with check (true);

create policy "Pageview sadece sahip okur" on pageviews
  for select using (
    site_id in (
      select id from sites where user_id = auth.uid()
    )
  );
