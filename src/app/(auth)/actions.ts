"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// ── Google OAuth ──
export async function signInWithGoogle() {
  const supabase = await createClient();
  const headerStore = await headers();
  const origin = headerStore.get("origin") || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }

  return { error: "Something went wrong" };
}

// ── Email + Password Sign In ──
export async function signInWithEmail(formData: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { error: error.message };
  }

  // The middleware will pick up the session and route to the correct dashboard
  redirect("/student/dashboard");
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

  // 1. Create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.name,
        role: "student",
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Failed to create user account." };
  }

  // 2. Insert profile data
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
  });

  if (profileError) {
    console.error("Profile insert error:", profileError);
    return { error: "Account created, but profile save failed. Please contact support." };
  }

  // 3. Check if under 18 — redirect to parent consent
  const age = parseInt(formData.age, 10);
  if (age < 18 && formData.parentEmail) {
    redirect("/parent-consent/pending");
  }

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

  // 1. Create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.name,
        role: "tutor",
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Failed to create user account." };
  }

  // 2. Insert profile data
  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    role: "tutor",
    full_name: formData.name,
    phone: formData.phone,
    highest_degree: formData.highestDegree,
    subjects: formData.subjects,
    experience: formData.experience,
    verified: false,
  });

  if (profileError) {
    console.error("Profile insert error:", profileError);
    return { error: "Account created, but profile save failed. Please contact support." };
  }

  redirect("/tutor/dashboard");
}

// ── File Upload to Supabase Storage ──
export async function uploadDocument(file: FormData, bucket: string, path: string) {
  const supabase = await createClient();
  const fileBlob = file.get("file") as File;

  if (!fileBlob) {
    return { error: "No file provided", url: null };
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, fileBlob, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return { error: error.message, url: null };
  }

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return { error: null, url: publicUrl.publicUrl };
}

// ── Sign Out ──
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
