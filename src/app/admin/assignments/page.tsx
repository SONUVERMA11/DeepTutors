"use client";
import s from "@/styles/dashboard.module.css";
export default function AdminAssignmentsPage() {
  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}><div><h1 className={s.pageTitle}>Class Assignments 🔗</h1><p className={s.pageSubtitle}>Manage tutor-student matching from the main dashboard.</p></div></div>
      <div className={`${s.alertBanner} ${s.alertInfo}`}>
        <div className={s.alertIcon}>💡</div>
        <div className={s.alertContent}><div className={s.alertText}>Use the <strong>Command Center</strong> dashboard to manage all lead assignments and tutor matching in one place.</div></div>
      </div>
    </div>
  );
}
