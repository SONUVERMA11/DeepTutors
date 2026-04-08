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
        // Check if profile exists, if not create one
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!profile) {
          // First-time Google sign-in — create a profile
          const role =
            (user.user_metadata?.role as string) || "student";
          await supabase.from("profiles").insert({
            id: user.id,
            role,
            full_name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "User",
            verified: role === "student",
          });
        }

        // Redirect based on role
        const role =
          (user.app_metadata?.role as string) ||
          (user.user_metadata?.role as string) ||
          "student";

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
