-- =============================================
-- DeepTutors: Complete Database Schema v3
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =============================================

-- ══════════════════════════════════════
-- UTILITY: Auto-update updated_at trigger
-- ══════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ── 1. Profiles ──
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'tutor', 'admin')),
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  country_code TEXT DEFAULT '+91',
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
  profile_complete BOOLEAN DEFAULT false,
  free_demos_remaining INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
-- Tutors can view student profiles for assigned leads (needed for chat/messages)
CREATE POLICY "Tutors can view assigned student profiles" ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM leads
      WHERE leads.assigned_tutor_id = auth.uid()
        AND leads.student_id = profiles.id
    )
  );
-- Students can view assigned tutor profiles
CREATE POLICY "Students can view assigned tutor profiles" ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM leads
      WHERE leads.student_id = auth.uid()
        AND leads.assigned_tutor_id = profiles.id
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_verified ON profiles(verified);


-- ── 2. Demo Leads / Enquiries ──
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  class_mode TEXT NOT NULL CHECK (class_mode IN ('online', 'offline')),
  classes_per_month INTEGER,
  plan_type TEXT,
  special_request TEXT,
  address TEXT,
  city TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'demo_done', 'converted', 'closed')),
  assigned_tutor_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own leads" ON leads FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can insert leads" ON leads FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Tutors can view open leads" ON leads FOR SELECT
  USING (status = 'open' OR assigned_tutor_id = auth.uid());
CREATE POLICY "Admins full access leads" ON leads FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_student_id ON leads(student_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_tutor_id ON leads(assigned_tutor_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);


-- ── 3. Lead Applications (Tutors apply for leads) ──
CREATE TABLE IF NOT EXISTS lead_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  tutor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lead_id, tutor_id)
);

ALTER TABLE lead_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can view own applications" ON lead_applications FOR SELECT USING (auth.uid() = tutor_id);
CREATE POLICY "Tutors can insert applications" ON lead_applications FOR INSERT WITH CHECK (auth.uid() = tutor_id);
CREATE POLICY "Students can view applications for own leads" ON lead_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM leads
      WHERE leads.id = lead_applications.lead_id
        AND leads.student_id = auth.uid()
    )
  );
CREATE POLICY "Admins full access applications" ON lead_applications FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lead_applications_lead_id ON lead_applications(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_applications_tutor_id ON lead_applications(tutor_id);
CREATE INDEX IF NOT EXISTS idx_lead_applications_status ON lead_applications(status);


-- ── 4. Sessions (Classes / Schedule) ──
CREATE TABLE IF NOT EXISTS sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  tutor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can view own sessions" ON sessions FOR SELECT USING (auth.uid() = tutor_id);
CREATE POLICY "Students can view own sessions" ON sessions FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Tutors can update own sessions" ON sessions FOR UPDATE USING (auth.uid() = tutor_id);
CREATE POLICY "Admins full access sessions" ON sessions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_tutor_id ON sessions(tutor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_student_id ON sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled_at ON sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);


-- ── 5. Payments ──
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id),
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'INR',
  payment_method TEXT,
  transaction_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  screenshot_url TEXT,
  notes TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own payments" ON payments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can insert payments" ON payments FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Admins full access payments" ON payments FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);


-- ── 6. Tutor Payouts ──
CREATE TABLE IF NOT EXISTS tutor_payouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tutor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payout_method TEXT DEFAULT 'bank_transfer' CHECK (payout_method IN ('bank_transfer', 'upi', 'other')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  reference_id TEXT,
  notes TEXT,
  processed_by UUID REFERENCES profiles(id),
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE tutor_payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutors can view own payouts" ON tutor_payouts FOR SELECT USING (auth.uid() = tutor_id);
CREATE POLICY "Admins full access payouts" ON tutor_payouts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tutor_payouts_tutor_id ON tutor_payouts(tutor_id);
CREATE INDEX IF NOT EXISTS idx_tutor_payouts_status ON tutor_payouts(status);


-- ── 7. Reviews ──
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, reviewer_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reviews about them" ON reviews FOR SELECT
  USING (auth.uid() = reviewer_id OR auth.uid() = reviewee_id);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Admins full access reviews" ON reviews FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_session_id ON reviews(session_id);


-- ── 8. Messages ──
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  receiver_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can mark messages as read" ON messages FOR UPDATE
  USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id);
CREATE POLICY "Admins can view all messages" ON messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes
CREATE INDEX IF NOT EXISTS idx_messages_lead_id ON messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);


-- ── 9. Notifications ──
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('lead_assigned', 'application_update', 'payment_verified', 'session_reminder', 'new_message', 'verification_approved', 'payout_completed', 'general')),
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can insert notifications" ON notifications FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
-- Allow system/service-role to insert notifications (for triggers)
CREATE POLICY "Service role can insert notifications" ON notifications FOR INSERT
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
