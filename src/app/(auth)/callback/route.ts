import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/student/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get user to check role
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Read role from query param or default to metadata/student
        const roleFromParams = searchParams.get("role");
        
        // Check if profile exists, if not create one
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!profile) {
          // First-time Google sign-in — create a profile
          const role = roleFromParams || (user.user_metadata?.role as string) || "student";
          
          // Get info from Google metadata
          const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User";

          const { error: insertError } = await supabase.from("profiles").insert({
            id: user.id,
            role,
            full_name: fullName,
            verified: false,
            profile_complete: false,
            free_demos_remaining: 3,
          });
          if (insertError) {
            console.error("[Auth Callback] Failed to create profile:", insertError);
          }
        } else {
          // Returning user — update name from Google if DB has a placeholder
          const googleName = user.user_metadata?.full_name || user.user_metadata?.name;
          if (googleName) {
            const { data: existing } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", user.id)
              .single();
            
            // Update if name is a placeholder
            const placeholders = ["User", "Student", "Tutor", "Admin", ""];
            const emailPrefix = user.email?.split("@")[0];
            if (existing && (placeholders.includes(existing.full_name || "") || existing.full_name === emailPrefix)) {
              await supabase.from("profiles").update({ full_name: googleName }).eq("id", user.id);
            }
          }
        }

        // Fetch final profile to get the correct role
        const { data: finalProfile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        const role = finalProfile?.role || "student";

        if (role === "admin") {
          return NextResponse.redirect(`${origin}/admin/dashboard`);
        }
        if (role === "tutor") {
          return NextResponse.redirect(`${origin}/tutor/dashboard`);
        }
        return NextResponse.redirect(`${origin}/student/dashboard`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If something went wrong, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
