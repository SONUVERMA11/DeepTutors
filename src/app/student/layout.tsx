"use client";

import DashboardSidebar, { NavItem } from "@/components/layout/DashboardSidebar";

const studentLinks: NavItem[] = [
  { href: "/student/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/student/classes", icon: "📚", label: "My Classes" },
  { href: "/student/chat", icon: "💬", label: "Messages", badge: "3" },
  { href: "/student/payments", icon: "💳", label: "Payments" },
  { href: "/student/settings", icon: "⚙️", label: "Settings" },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardSidebar
      role="student"
      links={studentLinks}
      userName="Arjun Sharma"
      avatarEmoji="👩🏽‍🎓"
      avatarColor="var(--royal-50)"
    >
      {children}
    </DashboardSidebar>
  );
}
