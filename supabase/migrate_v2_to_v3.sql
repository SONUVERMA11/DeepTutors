-- =============================================
-- DeepTutors: Migration from Schema v2 → v3
-- Run this in Supabase SQL Editor if you already have v2 tables.
-- This is SAFE to run — all statements use IF NOT EXISTS / IF EXISTS checks.
-- =============================================

-- ══════════════════════════════════════
-- UTILITY: Auto-update trigger function
-- ══════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ══════════════════════════════════════
-- 1. PROFILES: Add missing columns
-- ══════════════════════════════════════

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Auto-update trigger
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- New RLS policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Tutors can view assigned student profiles' AND tablename = 'profiles') THEN
    CREATE POLICY "Tutors can view assigned student profiles" ON profiles FOR SELECT
      USING (EXISTS (SELECT 1 FROM leads WHERE leads.assigned_tutor_id = auth.uid() AND leads.student_id = profiles.id));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Students can view assigned tutor profiles' AND tablename = 'profiles') THEN
    CREATE POLICY "Students can view assigned tutor profiles" ON profiles FOR SELECT
      USING (EXISTS (SELECT 1 FROM leads WHERE leads.student_id = auth.uid() AND leads.assigned_tutor_id = profiles.id));
  END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_verified ON profiles(verified);


-- ══════════════════════════════════════
-- 2. LEADS: Add indexes
-- ══════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_leads_student_id ON leads(student_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_tutor_id ON leads(assigned_tutor_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);


-- ══════════════════════════════════════
-- 3. LEAD APPLICATIONS: New policy + indexes
-- ══════════════════════════════════════

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Students can view applications for own leads' AND tablename = 'lead_applications') THEN
    CREATE POLICY "Students can view applications for own leads" ON lead_applications FOR SELECT
      USING (EXISTS (SELECT 1 FROM leads WHERE leads.id = lead_applications.lead_id AND leads.student_id = auth.uid()));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_lead_applications_lead_id ON lead_applications(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_applications_tutor_id ON lead_applications(tutor_id);
CREATE INDEX IF NOT EXISTS idx_lead_applications_status ON lead_applications(status);


-- ══════════════════════════════════════
-- 4. SESSIONS (NEW TABLE)
-- ══════════════════════════════════════

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

DROP TRIGGER IF EXISTS sessions_updated_at ON sessions;
CREATE TRIGGER sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Tutors can view own sessions' AND tablename = 'sessions') THEN
    CREATE POLICY "Tutors can view own sessions" ON sessions FOR SELECT USING (auth.uid() = tutor_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Students can view own sessions' AND tablename = 'sessions') THEN
    CREATE POLICY "Students can view own sessions" ON sessions FOR SELECT USING (auth.uid() = student_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Tutors can update own sessions' AND tablename = 'sessions') THEN
    CREATE POLICY "Tutors can update own sessions" ON sessions FOR UPDATE USING (auth.uid() = tutor_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins full access sessions' AND tablename = 'sessions') THEN
    CREATE POLICY "Admins full access sessions" ON sessions FOR ALL
      USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_sessions_tutor_id ON sessions(tutor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_student_id ON sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled_at ON sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);


-- ══════════════════════════════════════
-- 5. PAYMENTS: Add new columns
-- ══════════════════════════════════════

ALTER TABLE payments ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_method TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS transaction_id TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES profiles(id);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);


-- ══════════════════════════════════════
-- 6. TUTOR PAYOUTS (NEW TABLE)
-- ══════════════════════════════════════

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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Tutors can view own payouts' AND tablename = 'tutor_payouts') THEN
    CREATE POLICY "Tutors can view own payouts" ON tutor_payouts FOR SELECT USING (auth.uid() = tutor_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins full access payouts' AND tablename = 'tutor_payouts') THEN
    CREATE POLICY "Admins full access payouts" ON tutor_payouts FOR ALL
      USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_tutor_payouts_tutor_id ON tutor_payouts(tutor_id);
CREATE INDEX IF NOT EXISTS idx_tutor_payouts_status ON tutor_payouts(status);


-- ══════════════════════════════════════
-- 7. REVIEWS (NEW TABLE)
-- ══════════════════════════════════════

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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view reviews about them' AND tablename = 'reviews') THEN
    CREATE POLICY "Users can view reviews about them" ON reviews FOR SELECT
      USING (auth.uid() = reviewer_id OR auth.uid() = reviewee_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own reviews' AND tablename = 'reviews') THEN
    CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT
      WITH CHECK (auth.uid() = reviewer_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins full access reviews' AND tablename = 'reviews') THEN
    CREATE POLICY "Admins full access reviews" ON reviews FOR ALL
      USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_session_id ON reviews(session_id);


-- ══════════════════════════════════════
-- 8. MESSAGES: New policy + indexes
-- ══════════════════════════════════════

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can mark messages as read' AND tablename = 'messages') THEN
    CREATE POLICY "Users can mark messages as read" ON messages FOR UPDATE
      USING (auth.uid() = receiver_id)
      WITH CHECK (auth.uid() = receiver_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_messages_lead_id ON messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read);


-- ══════════════════════════════════════
-- 9. NOTIFICATIONS (NEW TABLE)
-- ══════════════════════════════════════

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

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own notifications' AND tablename = 'notifications') THEN
    CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own notifications' AND tablename = 'notifications') THEN
    CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can insert notifications' AND tablename = 'notifications') THEN
    CREATE POLICY "Admins can insert notifications" ON notifications FOR INSERT
      WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role can insert notifications' AND tablename = 'notifications') THEN
    CREATE POLICY "Service role can insert notifications" ON notifications FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);


-- ══════════════════════════════════════
-- ✅ Migration complete!
-- ══════════════════════════════════════
