"use client";
import s from "@/styles/dashboard.module.css";
export default function TutorSchedulePage() {
  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}><div><h1 className={s.pageTitle}>My Schedule 🗓️</h1><p className={s.pageSubtitle}>Your teaching calendar and upcoming sessions.</p></div></div>
      <div className={s.emptyState}><div className={s.emptyIcon}>🗓️</div><div className={s.emptyTitle}>No sessions scheduled</div><p>Once students are assigned to you, your schedule will appear here.</p></div>
    </div>
  );
}
