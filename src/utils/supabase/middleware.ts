import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type AppRole = 'student' | 'tutor' | 'admin'

function readRole(metadata: unknown): unknown {
  if (metadata && typeof metadata === 'object' && 'role' in metadata) {
    return (metadata as { role?: unknown }).role
  }

  return undefined
}

function getUserRole(user: { app_metadata?: unknown; user_metadata?: unknown } | null): AppRole {
  const appRole = readRole(user?.app_metadata)
  const userRole = readRole(user?.user_metadata)

  if (appRole === 'admin' || userRole === 'admin') return 'admin'
  if (appRole === 'tutor' || userRole === 'tutor') return 'tutor'
  return 'student'
}

function roleHome(role: AppRole): string {
  if (role === 'admin') return '/admin/dashboard'
  if (role === 'tutor') return '/tutor/dashboard'
  return '/student/dashboard'
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Prevent 500 Internal Server Error if environment variables are missing
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.warn("Supabase environment variables are missing. Bypassing auth middleware.");
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const role = getUserRole(user)

  // Protect the dashboard routes
  const isDashboardRoute = 
    request.nextUrl.pathname.startsWith('/student') ||
    request.nextUrl.pathname.startsWith('/tutor') ||
    request.nextUrl.pathname.startsWith('/admin')

  if (isDashboardRoute && !user) {
    // If no user and trying to access protected route, redirect to login.
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user) {
    const path = request.nextUrl.pathname
    const studentOnly = path.startsWith('/student')
    const tutorOnly = path.startsWith('/tutor')
    const adminOnly = path.startsWith('/admin')

    const blockedByRole =
      (studentOnly && role !== 'student' && role !== 'admin') ||
      (tutorOnly && role !== 'tutor' && role !== 'admin') ||
      (adminOnly && role !== 'admin')

    if (blockedByRole) {
      const url = request.nextUrl.clone()
      url.pathname = roleHome(role)
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged in users away from auth pages
  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')

  if (isAuthRoute && user) {
    // Redirect to proper dashboard based on role metadata.
    const url = request.nextUrl.clone()
    url.pathname = roleHome(role)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
