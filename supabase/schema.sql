-- Run this in the Supabase SQL editor for a new project.
-- Row Level Security is enabled with no public policies, so these tables
-- are writable only via the service role key (used server-side in
-- /src/lib/submissions.ts) — never exposed to the browser.

create table if not exists question_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  country text not null,
  profession text not null,
  subject text not null,
  question text not null,
  attachment_urls text[] default '{}',
  keep_private boolean default false,
  status text not null default 'new' check (status in ('new','answered','archived')),
  consent_at timestamptz not null
);
alter table question_submissions enable row level security;

create table if not exists consultancy_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  country text not null,
  role text,
  areas_of_interest text[] not null default '{}',
  description text not null,
  preferred_contact text,
  status text not null default 'new' check (status in ('new','in_conversation','closed'))
);
alter table consultancy_inquiries enable row level security;

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','answered','archived'))
);
alter table contact_messages enable row level security;

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  source text
);
alter table newsletter_subscribers enable row level security;
