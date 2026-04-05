"use client";

import DashboardSidebar, { NavItem } from "@/components/layout/DashboardSidebar";

const tutorLinks: NavItem[] = [
  { href: "/tutor/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/tutor/students", icon: "🧑‍🎓", label: "My Students" },
  { href: "/tutor/chat", icon: "💬", label: "Messages", badge: "5" },
  { href: "/tutor/earnings", icon: "💸", label: "Earnings" },
  { href: "/tutor/settings", icon: "⚙️", label: "Settings" },
];

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardSidebar
      role="tutor"
      links={tutorLinks}
      userName="Dr. Priya Nair"
      avatarEmoji="👩🏻‍🏫"
      avatarColor="rgba(108, 92, 231, 0.1)"
    >
      {children}
    </DashboardSidebar>
  );
}
