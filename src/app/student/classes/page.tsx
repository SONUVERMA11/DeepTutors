"use client";

import { useEffect, useState } from "react";
import { getUserProfile, getStudentLeads } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";

export default function StudentClassesPage() {
  const [profile, setProfile] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [p, l] = await Promise.all([getUserProfile(), getStudentLeads()]);
      setProfile(p);
      setLeads(l);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className={s.dashPage}><div className="skeleton" style={{ height: "400px" }} /></div>;

  const activeClasses = leads.filter(l => l.status === "assigned" || l.status === "demo_done" || l.status === "converted");

  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>My Learning Program 📚</h1>
          <p className={s.pageSubtitle}>Your enrolled subjects and session history.</p>
        </div>
      </div>

      <div className={s.section}>
        <h2 className={s.sectionTitle}>Active Classes</h2>
        {activeClasses.length > 0 ? (
          <div className={s.cardGrid} style={{ marginTop: "1rem" }}>
            {activeClasses.map((cls) => (
              <div key={cls.id} className={s.leadCard}>
                <div className={s.leadSubject}>{cls.subject}</div>
                <div className={s.leadMeta}>
                  <span>{cls.class_mode === "online" ? "🌐 Online" : "📍 Offline"}</span>
                  {cls.classes_per_month && <span>{cls.classes_per_month} classes/mo</span>}
                  {cls.plan_type && <span>{cls.plan_type}</span>}
                </div>
                <span className="badge badge-success">✓ Tutor Assigned</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={s.emptyState} style={{ marginTop: "1rem" }}>
            <div className={s.emptyIcon}>📖</div>
            <div className={s.emptyTitle}>No active classes yet</div>
            <p>Request a demo from your dashboard to get started with a tutor.</p>
          </div>
        )}
      </div>

      <div className={s.section}>
        <h2 className={s.sectionTitle}>Enrolled Subjects</h2>
        {profile?.subjects?.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            {profile.subjects.map((sub: string) => (
              <div key={sub} className={s.subjectChip}>📖 {sub}</div>
            ))}
          </div>
        ) : (
          <div className={s.emptyState} style={{ marginTop: "1rem" }}>
            <p>No subjects selected. Go to Settings to add subjects.</p>
          </div>
        )}
      </div>
    </div>
  );
}
