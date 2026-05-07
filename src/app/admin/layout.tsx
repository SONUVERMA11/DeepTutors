"use client";

import { useEffect, useState } from "react";
import DashboardSidebar, { NavItem } from "@/components/layout/DashboardSidebar";
import { getUserProfile, getPendingTutors } from "@/app/(auth)/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<any>(null);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    async function load() {
      const [p, tutors] = await Promise.all([getUserProfile(), getPendingTutors()]);
      if (!p) return;
      if (p.role !== "admin") { window.location.href = `/${p.role}/dashboard`; return; }
      setProfile(p);
      setPendingCount(tutors.length);
    }
    load();
  }, []);

  const adminLinks: NavItem[] = [
    { href: "/admin/dashboard", icon: "📊", label: "Command Center" },
    { href: "/admin/verification", icon: "✅", label: "Verify Tutors", ...(pendingCount > 0 ? { badge: String(pendingCount) } : {}) },
    { href: "/admin/assignments", icon: "🔗", label: "Assignments" },
    { href: "/admin/payouts", icon: "💸", label: "Payments" },
    { href: "/admin/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <DashboardSidebar
      role="admin"
      links={adminLinks}
      userName={profile?.full_name || "Admin"}
      avatarEmoji="🛡️"
      avatarColor="rgba(0, 206, 201, 0.1)"
    >
      {children}
    </DashboardSidebar>
  );
}
