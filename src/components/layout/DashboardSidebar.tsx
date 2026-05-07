"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";
import styles from "./DashboardSidebar.module.css";

export interface NavItem {
  href: string;
  icon: string;
  label: string;
  badge?: string;
}

interface DashboardSidebarProps {
  role: "student" | "tutor" | "admin";
  links: NavItem[];
  userName?: string;
  avatarEmoji?: string;
  avatarColor?: string;
  children: React.ReactNode;
}

const roleLabels: Record<string, string> = {
  student: "Student Portal",
  tutor: "Tutor Portal",
  admin: "Admin Panel",
};

export default function DashboardSidebar({
  role,
  links,
  userName = "User",
  avatarEmoji = "👤",
  avatarColor = "var(--royal-50)",
  children,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.sidebarWrapper}>
      {/* ── Sidebar ── */}
      <aside
        className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}
      >
        {/* User Header */}
        <div className={styles.sidebarHeader}>
          <div
            className={styles.avatarCircle}
            style={{ background: avatarColor }}
          >
            {avatarEmoji}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.userRole}>{roleLabels[role]}</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className={styles.nav}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <span className={styles.navIcon}>{link.icon}</span>
                <span className={styles.navLabel}>{link.label}</span>
                {link.badge && (
                  <span className={styles.navBadge}>{link.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={() => signOut()}>
            <span className={styles.navIcon}>🚪</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Overlay ── */}
      <div
        className={`${styles.mobileOverlay} ${
          mobileOpen ? styles.mobileOverlayOpen : ""
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile Toggle ── */}
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* ── Main Content ── */}
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
