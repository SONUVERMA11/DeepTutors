"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
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

  return (
    <header
      className={`${styles.header} ${showSolid ? styles.scrolled : ""}`}
      id="main-header"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} id="logo-link">
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

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          <ThemeToggle />
          <Link href="/login" className={styles.loginBtn} id="login-btn">
            Log In
          </Link>
          <Link href="/register/student" className={`btn btn-gold btn-sm ${styles.demoCta}`} id="demo-cta-btn">
            Book Free Demo
          </Link>
        </div>

        {/* Hamburger */}
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
          </div>
        </div>
      </nav>
    </header>
  );
}
