-- --------------------------------------------------------------------------
-- 1. EXTENSIONS & SETUP
-- --------------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- --------------------------------------------------------------------------
-- 2. ENUMS
-- --------------------------------------------------------------------------
create type user_role as enum ('student', 'tutor', 'admin');
create type assignment_status as enum ('pending', 'negotiating', 'active', 'completed', 'cancelled');
create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');

-- --------------------------------------------------------------------------
-- 3. TABLES
-- --------------------------------------------------------------------------

-- Table: users (Extended Profiles securely linked to auth.users)
create table public.users (
  id uuid references auth.users not null primary key,
  role user_role default 'student',
  full_name text not null,
  phone text,
  country_code text default 'IN',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.users enable row level security;

-- Table: students (Specific metadata for Students)
create table public.students (
  id uuid references public.users(id) on delete cascade not null primary key,
  dob date,
  parent_approved boolean default true,
  curriculum text,
  target_exam text
);
alter table public.students enable row level security;

-- Table: tutors (Specific metadata for Tutors)
create table public.tutors (
  id uuid references public.users(id) on delete cascade not null primary key,
  subjects text[] default '{}',
  verified boolean default false,
  rating numeric(3,2) default 0.00,
  student_count integer default 0,
  bio text
);
alter table public.tutors enable row level security;

-- Table: assignments (The Mapping between Student & Tutor)
create table public.assignments (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.students(id) on delete cascade,
  tutor_id uuid references public.tutors(id) on delete cascade,
  status assignment_status default 'pending',
  agreed_hourly_price numeric(10,2),
  currency varchar(3) default 'INR',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.assignments enable row level security;

-- Table: class_packages (Financial Agreements)
create table public.class_packages (
  id uuid default uuid_generate_v4() primary key,
  assignment_id uuid references public.assignments(id) on delete cascade,
  total_classes integer not null,
  classes_remaining integer not null,
  amount_paid numeric(10,2) not null,
  payment_status payment_status default 'pending',
  stripe_pi_id text,
  razorpay_order_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.class_packages enable row level security;

-- --------------------------------------------------------------------------
-- 4. RLS POLICIES (Basic scaffolding)
-- --------------------------------------------------------------------------

-- Example Policy: Users can view their own profile
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

-- Example Policy: Tutors can view assignments where they are the assigned tutor
create policy "Tutors can view assigned students" on public.assignments
  for select using (auth.uid() = tutor_id);

-- Example Policy: Students can view assignments where they are the assigned student
create policy "Students can view assigned tutors" on public.assignments
  for select using (auth.uid() = student_id);

-- Note: In a production environment, write policies to allow Admin reads/updates overriding UUID checks.
