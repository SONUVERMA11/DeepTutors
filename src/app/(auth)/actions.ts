"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// ── Google OAuth ──
export async function signInWithGoogle(role: string = "student") {
  const supabase = await createClient();
  const headerStore = await headers();
  
  const host = headerStore.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/callback?role=${role}`,
    },
  });

  if (error) {
    console.error("Google Auth Error:", error.message);
    return { error: error.message };
  }

  if (data.url) {
    return redirect(data.url);
  }

  return { error: "Could not generate Google login URL." };
}

// ── Email + Password Sign In ──
export async function signInWithEmail(formData: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { error: error.message };
  }

  // Check profile role in DB
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const role = profile?.role || data?.user?.user_metadata?.role || "student";
  
  if (role === "tutor") redirect("/tutor/dashboard");
  else if (role === "admin") redirect("/admin/dashboard");
  else redirect("/student/dashboard");
}

// ── Student Registration ──
export async function signUpStudent(formData: {
  name: string;
  email: string;
  password: string;
  age: string;
  grade: string;
  curriculum: string;
  subjects: string;
  phone: string;
  parentEmail: string;
}) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: { full_name: formData.name, role: "student" },
    },
  });

  if (authError) return { error: authError.message };
  if (!authData.user) return { error: "Failed to create user account." };

  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    role: "student",
    full_name: formData.name,
    phone: formData.phone,
    age: parseInt(formData.age, 10) || null,
    grade: formData.grade,
    curriculum: formData.curriculum,
    subjects: formData.subjects ? formData.subjects.split(",").map((s) => s.trim()) : [],
    parent_email: formData.parentEmail || null,
    profile_complete: true,
    free_demos_remaining: 3,
  });

  if (profileError) {
    console.error("Profile insert error:", profileError);
    return { error: "Account created, but profile save failed." };
  }

  const age = parseInt(formData.age, 10);
  if (age < 18 && formData.parentEmail) redirect("/parent-consent/pending");
  redirect("/student/dashboard");
}

// ── Tutor Registration ──
export async function signUpTutor(formData: {
  name: string;
  email: string;
  password: string;
  phone: string;
  highestDegree: string;
  subjects: string[];
  experience: string;
}) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: { full_name: formData.name, role: "tutor" },
    },
  });

  if (authError) return { error: authError.message };
  if (!authData.user) return { error: "Failed to create user account." };

  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    role: "tutor",
    full_name: formData.name,
    phone: formData.phone,
    highest_degree: formData.highestDegree,
    subjects: formData.subjects,
    experience: formData.experience,
    verified: false,
    profile_complete: true,
  });

  if (profileError) {
    console.error("Profile insert error:", profileError);
    return { error: "Account created, but profile save failed." };
  }

  redirect("/tutor/dashboard");
}

// ── File Upload ──
export async function uploadDocument(file: FormData, bucket: string, path: string) {
  const supabase = await createClient();
  const fileBlob = file.get("file") as File;
  if (!fileBlob) return { error: "No file provided", url: null };

  const { data, error } = await supabase.storage.from(bucket).upload(path, fileBlob, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) return { error: error.message, url: null };

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return { error: null, url: publicUrl.publicUrl };
}

// ── Get User Profile ──
export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  // Extract name from ALL possible Google metadata fields
  const meta = user.user_metadata || {};
  const identityData = user.identities?.[0]?.identity_data || {};
  
  const googleName = 
    meta.full_name || 
    meta.name || 
    identityData.full_name || 
    identityData.name ||
    (meta.given_name && meta.family_name ? `${meta.given_name} ${meta.family_name}` : null) ||
    (identityData.given_name && identityData.family_name ? `${identityData.given_name} ${identityData.family_name}` : null) ||
    meta.given_name || 
    identityData.given_name ||
    null;
    
  const googleAvatar = meta.avatar_url || meta.picture || identityData.avatar_url || identityData.picture;
  
  // Debug: log everything
  console.log("[getUserProfile] DB name:", profile.full_name, "| Google name:", googleName, "| meta:", JSON.stringify(meta), "| identity:", JSON.stringify(identityData));
  
  // Detect placeholder names that should be replaced
  const placeholders = ["User", "Student", "Tutor", "Admin", ""];
  const dbName = profile.full_name || "";
  const isPlaceholder = placeholders.includes(dbName) || dbName === user.email?.split("@")[0];
  
  let resolvedName = dbName;
  if (isPlaceholder && googleName) {
    resolvedName = googleName;
    // Also auto-fix in the DB so it's permanent
    await supabase.from("profiles").update({ full_name: googleName }).eq("id", user.id);
  } else if (isPlaceholder) {
    // No Google name available — use email prefix instead of "Student"
    resolvedName = user.email?.split("@")[0] || "User";
    await supabase.from("profiles").update({ full_name: resolvedName }).eq("id", user.id);
  }

  return {
    ...profile,
    email: user.email,
    full_name: resolvedName,
    avatar_url: profile.avatar_url || googleAvatar || null,
  };
}

// ── Update Profile ──
export async function updateProfile(updates: Record<string, any>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  return { success: !error, error: error?.message };
}

// ══════════════════════════════════════
// LEADS / DEMO REQUESTS
// ══════════════════════════════════════

export async function createLead(leadData: {
  subject: string;
  class_mode: string;
  classes_per_month?: number;
  plan_type?: string;
  special_request?: string;
  address?: string;
  city?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data, error } = await supabase.from("leads").insert({
    student_id: user.id,
    ...leadData,
  }).select().single();

  if (!error) {
    // Decrement free demos
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("free_demos_remaining")
      .eq("id", user.id)
      .single();
    
    if (currentProfile) {
      await supabase.from("profiles").update({
        free_demos_remaining: Math.max(0, (currentProfile.free_demos_remaining || 0) - 1),
      }).eq("id", user.id);
    }
  }

  return { success: !error, error: error?.message, data };
}

export async function getStudentLeads() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("leads")
    .select("*")
    .eq("student_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function getOpenLeads() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("*, profiles!leads_student_id_fkey(full_name, grade, curriculum)")
    .eq("status", "open")
    .order("created_at", { ascending: false });

  return data || [];
}

export async function getAllLeads() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("*, profiles!leads_student_id_fkey(full_name, grade, curriculum, phone)")
    .order("created_at", { ascending: false });

  return data || [];
}

// ══════════════════════════════════════
// LEAD APPLICATIONS (Tutors apply)
// ══════════════════════════════════════

export async function applyForLead(leadId: string, message: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("lead_applications").insert({
    lead_id: leadId,
    tutor_id: user.id,
    message,
  });

  return { success: !error, error: error?.message };
}

export async function getTutorApplications() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("lead_applications")
    .select("*, leads(subject, class_mode, city, status)")
    .eq("tutor_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function getLeadApplications(leadId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lead_applications")
    .select("*, profiles!lead_applications_tutor_id_fkey(full_name, experience, subjects, verified)")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  return data || [];
}

// ── Admin: Assign tutor to lead ──
export async function assignTutorToLead(leadId: string, tutorId: string) {
  const supabase = await createClient();

  // Update lead status
  const { error: e1 } = await supabase
    .from("leads")
    .update({ status: "assigned", assigned_tutor_id: tutorId })
    .eq("id", leadId);

  // Update application status
  const { error: e2 } = await supabase
    .from("lead_applications")
    .update({ status: "accepted" })
    .eq("lead_id", leadId)
    .eq("tutor_id", tutorId);

  // Reject other applications
  await supabase
    .from("lead_applications")
    .update({ status: "rejected" })
    .eq("lead_id", leadId)
    .neq("tutor_id", tutorId);

  return { success: !e1 && !e2 };
}

// ══════════════════════════════════════
// PAYMENTS
// ══════════════════════════════════════

export async function getStudentPayments() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("payments")
    .select("*, leads(subject)")
    .eq("student_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function getAllPayments() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("*, profiles!payments_student_id_fkey(full_name), leads(subject)")
    .order("created_at", { ascending: false });

  return data || [];
}

// ══════════════════════════════════════
// MESSAGES
// ══════════════════════════════════════

export async function getConversations() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // Get leads where user is involved
  const { data: leads } = await supabase
    .from("leads")
    .select("id, subject, student_id, assigned_tutor_id, profiles!leads_student_id_fkey(full_name)")
    .or(`student_id.eq.${user.id},assigned_tutor_id.eq.${user.id}`)
    .eq("status", "assigned");

  return leads || [];
}

export async function getMessages(leadId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*, profiles!messages_sender_id_fkey(full_name)")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: true });

  return data || [];
}

export async function sendMessage(leadId: string, receiverId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("messages").insert({
    lead_id: leadId,
    sender_id: user.id,
    receiver_id: receiverId,
    content,
  });

  return { success: !error, error: error?.message };
}

export async function getUnreadCount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { count } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("receiver_id", user.id)
    .eq("read", false);

  return count || 0;
}

// ══════════════════════════════════════
// ADMIN
// ══════════════════════════════════════

export async function getPendingTutors() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "tutor")
    .eq("verified", false)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function approveTutor(tutorId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ verified: true }).eq("id", tutorId);
  return { success: !error, error: error?.message };
}

export async function getAdminStats() {
  const supabase = await createClient();
  
  const [tutors, students, leads, payments] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "tutor"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("*", { count: "exact", head: true }).eq("status", "verified"),
  ]);

  return {
    totalTutors: tutors.count || 0,
    totalStudents: students.count || 0,
    totalLeads: leads.count || 0,
    totalPayments: payments.count || 0,
  };
}

// ── Sign Out ──
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
