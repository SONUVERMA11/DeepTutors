"use client";

import { useEffect, useState } from "react";
import DashboardSidebar, { NavItem } from "@/components/layout/DashboardSidebar";
import { getUserProfile, getUnreadCount } from "@/app/(auth)/actions";

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<any>(null);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    async function load() {
      const [p, count] = await Promise.all([getUserProfile(), getUnreadCount()]);
      if (!p) return;
      if (p.role !== "tutor") { window.location.href = `/${p.role}/dashboard`; return; }
      setProfile(p);
      setUnread(count);
    }
    load();
  }, []);

  const tutorLinks: NavItem[] = [
    { href: "/tutor/dashboard", icon: "📊", label: "Dashboard" },
    { href: "/tutor/chat", icon: "💬", label: "Messages", ...(unread > 0 ? { badge: String(unread) } : {}) },
    { href: "/tutor/schedule", icon: "🗓️", label: "My Schedule" },
    { href: "/tutor/earnings", icon: "💰", label: "Earnings" },
    { href: "/tutor/settings", icon: "⚙️", label: "Profile Settings" },
  ];

  return (
    <DashboardSidebar
      role="tutor"
      links={tutorLinks}
      userName={profile?.full_name || "Tutor"}
      avatarEmoji="👨‍🏫"
      avatarColor="var(--gold-50)"
    >
      {children}
    </DashboardSidebar>
  );
}
