"use client";

import { useEffect, useState } from "react";
import { getPendingTutors, approveTutor } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";

export default function AdminVerificationPage() {
  const [pendingTutors, setPendingTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const tutors = await getPendingTutors();
      setPendingTutors(tutors);
      setLoading(false);
    }
    load();
  }, []);

  const handleApprove = async (id: string) => {
    const res = await approveTutor(id);
    if (res.success) {
      setPendingTutors(prev => prev.filter(t => t.id !== id));
    } else {
      alert("Error: " + res.error);
    }
  };

  if (loading) return <div className={s.dashPage}><div className="skeleton" style={{ height: "400px" }} /></div>;

  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Tutor Verification ✅</h1>
          <p className={s.pageSubtitle}>{pendingTutors.length} tutors waiting for approval.</p>
        </div>
      </div>

      {pendingTutors.length > 0 ? (
        <div className={s.cardGrid}>
          {pendingTutors.map((tutor) => (
            <div key={tutor.id} className={s.leadCard}>
              <div className={s.leadSubject}>{tutor.full_name}</div>
              <div className={s.leadMeta}>
                <span>🎓 {tutor.highest_degree || "N/A"}</span>
                <span>📅 {tutor.experience || "N/A"}</span>
                <span>📞 {tutor.phone || "N/A"}</span>
              </div>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                Subjects: {tutor.subjects?.join(", ") || "Not listed"}
              </p>
              <div className={s.leadActions}>
                <button className="btn btn-primary btn-sm" onClick={() => handleApprove(tutor.id)}>✓ Approve</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={s.emptyState}>
          <div className={s.emptyIcon}>✅</div>
          <div className={s.emptyTitle}>All clear!</div>
          <p>No pending verifications.</p>
        </div>
      )}
    </div>
  );
}
