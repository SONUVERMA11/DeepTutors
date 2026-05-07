"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { createClient } from "@/utils/supabase/client";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/enquiry", label: "Enquiry" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; role?: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const showSolid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Check auth state
  useEffect(() => {
    const supabase = createClient();

    const checkUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const role = (authUser.app_metadata?.role as string) ||
                     (authUser.user_metadata?.role as string) ||
                     "student";
        setUser({ email: authUser.email, role });
      } else {
        setUser(null);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const role = (session.user.app_metadata?.role as string) ||
                     (session.user.user_metadata?.role as string) ||
                     "student";
        setUser({ email: session.user.email, role });
      } else {
        setUser(null);
      }
    });

    return () => { subscription.unsubscribe(); };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const dashboardHref = user?.role === "admin"
    ? "/admin/dashboard"
    : user?.role === "tutor"
      ? "/tutor/dashboard"
      : "/student/dashboard";

  return (
    <header
      className={`${styles.header} ${showSolid ? styles.scrolled : ""}`}
      id="main-header"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} id="logo-link">
          <Image src="/logo.png" alt="DeepTutors Logo" width={40} height={40} className={styles.logoImg} />
          <span className={styles.logoText}>
            Deep<span className={styles.logoAccent}>Tutors</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} id="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section (Theme Toggle, Auth, Hamburger) */}
        <div className={styles.rightSection}>
          <ThemeToggle />

          {/* Auth Buttons (Desktop Only) */}
          <div className={styles.authButtons}>
            {user ? (
              <>
                <Link href={dashboardHref} className={styles.loginBtn} id="dashboard-btn">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className={`btn btn-ghost btn-sm ${styles.signOutBtn}`}
                  id="signout-btn"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.loginBtn} id="login-btn">
                  Log In
                </Link>
                <Link href="/register/student" className={`btn btn-gold btn-sm ${styles.demoCta}`} id="demo-cta-btn">
                  Book Free Demo
                </Link>
              </>
            )}
          </div>

          {/* Hamburger (Mobile Only) */}
          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            id="hamburger-btn"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.overlayVisible : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Nav */}
      <nav
        className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`}
        id="mobile-nav"
      >
        <div className={styles.mobileNavInner}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileAuth}>
            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="btn btn-outline btn-lg"
                  style={{ width: "100%" }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-outline btn-lg"
                  style={{ width: "100%" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/register/student"
                  className="btn btn-gold btn-lg"
                  style={{ width: "100%" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Book Free Demo
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
