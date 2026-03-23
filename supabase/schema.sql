-- SnapLedger Database Schema
-- Run this in your Supabase SQL editor

-- Users profile (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  plan text default 'free' check (plan in ('free', 'pro', 'business')),
  documents_this_month integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Documents
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  file_name text not null,
  original_url text,
  status text default 'processed' check (status in ('pending', 'processing', 'processed', 'failed')),
  vendor text,
  doc_date date,
  subtotal numeric(12,2),
  tax numeric(12,2),
  total numeric(12,2),
  currency text default 'USD',
  category text,
  payment_terms text,
  line_items jsonb default '[]'::jsonb,
  confidence numeric(3,2),
  extracted_data jsonb,
  created_at timestamptz default now()
);

alter table public.documents enable row level security;

create policy "Users can view own documents"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can insert own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Users can update own documents"
  on public.documents for update
  using (auth.uid() = user_id);

create index idx_documents_user_id on public.documents(user_id);
create index idx_documents_created_at on public.documents(created_at desc);

-- Subscriptions
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text default 'free' check (plan in ('free', 'pro', 'business')),
  status text default 'active' check (status in ('active', 'canceled', 'past_due', 'trialing')),
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- API Keys
create table if not exists public.api_keys (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  key_hash text not null unique,
  name text not null,
  prefix text not null,
  last_used timestamptz,
  created_at timestamptz default now()
);

alter table public.api_keys enable row level security;

create policy "Users can view own API keys"
  on public.api_keys for select
  using (auth.uid() = user_id);

create policy "Users can insert own API keys"
  on public.api_keys for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own API keys"
  on public.api_keys for delete
  using (auth.uid() = user_id);

create index idx_api_keys_hash on public.api_keys(key_hash);
