"use client";

import { useEffect, useState } from "react";
import DashboardSidebar, { NavItem } from "@/components/layout/DashboardSidebar";
import { getUserProfile, getUnreadCount } from "@/app/(auth)/actions";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<any>(null);
  const [unread, setUnread] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      const [p, count] = await Promise.all([getUserProfile(), getUnreadCount()]);
      if (!p) return;
      if (p.role !== "student") { window.location.href = `/${p.role}/dashboard`; return; }
      setProfile(p);
      setUnread(count);
      setReady(true);
    }
    load();
  }, []);

  const studentLinks: NavItem[] = [
    { href: "/student/dashboard", icon: "📊", label: "Dashboard" },
    { href: "/student/classes", icon: "📚", label: "My Classes" },
    { href: "/student/chat", icon: "💬", label: "Messages", ...(unread > 0 ? { badge: String(unread) } : {}) },
    { href: "/student/payments", icon: "💳", label: "Payments" },
    { href: "/student/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <DashboardSidebar
      role="student"
      links={studentLinks}
      userName={ready ? (profile?.full_name === "Student" || profile?.full_name === "User" || !profile?.full_name ? profile?.email?.split("@")[0] || "Student" : profile?.full_name) : "Loading..."}
      avatarEmoji="👩🏽‍🎓"
      avatarColor="var(--royal-50)"
    >
      {children}
    </DashboardSidebar>
  );
}
