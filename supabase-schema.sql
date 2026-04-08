-- =============================================
-- DeepTutors: Profiles Table Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =============================================

-- Create the profiles table linked to Supabase Auth
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'tutor', 'admin')),
  full_name TEXT NOT NULL,
  phone TEXT,
  age INTEGER,
  grade TEXT,
  curriculum TEXT,
  subjects TEXT[],
  parent_email TEXT,
  highest_degree TEXT,
  experience TEXT,
  degree_doc_url TEXT,
  gov_id_url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile (during registration)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Admin can view all profiles (optional — for admin dashboard)
-- Uncomment this if you need admin access:
-- CREATE POLICY "Admins can view all profiles"
--   ON profiles FOR SELECT
--   USING (
--     EXISTS (
--       SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
--     )
--   );

-- =============================================
-- Supabase Storage: Create bucket for tutor documents
-- Run this in the Supabase Dashboard:
-- Storage → New Bucket → Name: "tutor-docs" → Public: false
-- =============================================
