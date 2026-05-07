"use client";
import s from "@/styles/dashboard.module.css";
export default function TutorEarningsPage() {
  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}><div><h1 className={s.pageTitle}>Earnings & Payouts 💰</h1><p className={s.pageSubtitle}>Track your teaching revenue and withdrawal history.</p></div></div>
      <div className={s.emptyState}><div className={s.emptyIcon}>💰</div><div className={s.emptyTitle}>No earnings yet</div><p>Start teaching assigned students to begin earning.</p></div>
    </div>
  );
}
