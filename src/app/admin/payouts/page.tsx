"use client";
import s from "@/styles/dashboard.module.css";
export default function AdminPayoutsPage() {
  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}><div><h1 className={s.pageTitle}>Payment Management 💸</h1><p className={s.pageSubtitle}>Verify student payments and process tutor payouts.</p></div></div>
      <div className={s.emptyState}><div className={s.emptyIcon}>💸</div><div className={s.emptyTitle}>No payments to process</div><p>Student payment verifications will appear here.</p></div>
    </div>
  );
}
