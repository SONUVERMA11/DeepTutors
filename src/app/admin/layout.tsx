"use client";

import DashboardSidebar, { NavItem } from "@/components/layout/DashboardSidebar";

const adminLinks: NavItem[] = [
  { href: "/admin/dashboard", icon: "📊", label: "Overview" },
  { href: "/admin/verification", icon: "✅", label: "Tutor Verification", badge: "12" },
  { href: "/admin/assignments", icon: "🔗", label: "Class Assignments" },
  { href: "/admin/payouts", icon: "💸", label: "Payout Center" },
  { href: "/admin/settings", icon: "⚙️", label: "Global Settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardSidebar
      role="admin"
      links={adminLinks}
      userName="Admin"
      avatarEmoji="🛡️"
      avatarColor="rgba(0, 206, 201, 0.1)"
    >
      {children}
    </DashboardSidebar>
  );
}
