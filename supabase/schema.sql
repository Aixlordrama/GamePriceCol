-- Supabase schema for historical video game price tracking

create table if not exists price_history (
  id uuid primary key default uuid_generate_v4(),
  game_name text not null,
  retailer text not null,
  price numeric not null,
  stock_status boolean not null,
  url text not null,
  scraped_at timestamptz not null default now()
);

create index if not exists idx_price_history_game_retailer_date on price_history (game_name, retailer, scraped_at desc);
