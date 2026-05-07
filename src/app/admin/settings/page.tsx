"use client";
import s from "@/styles/dashboard.module.css";
export default function AdminSettingsPage() {
  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}><div><h1 className={s.pageTitle}>Platform Settings ⚙️</h1><p className={s.pageSubtitle}>Configure system-wide settings and notification preferences.</p></div></div>
      <div className={s.emptyState}><div className={s.emptyIcon}>⚙️</div><div className={s.emptyTitle}>Settings Panel</div><p>Platform configuration options coming soon.</p></div>
    </div>
  );
}
