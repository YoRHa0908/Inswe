-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard → your project → SQL Editor

-- Profiles table
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  first_name text default '',
  last_name text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Addresses table
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  email text not null references profiles(email) on delete cascade,
  first_name text default '',
  last_name text default '',
  address text default '',
  apartment text default '',
  city text default '',
  postcode text default '',
  country text default 'United Kingdom',
  is_default boolean default false,
  created_at timestamptz default now()
);

-- Index for fast lookups by email
create index if not exists idx_addresses_email on addresses(email);

-- Row Level Security (allow all for now — tighten with auth later)
alter table profiles enable row level security;
alter table addresses enable row level security;

create policy "Allow all on profiles" on profiles for all using (true) with check (true);
create policy "Allow all on addresses" on addresses for all using (true) with check (true);
