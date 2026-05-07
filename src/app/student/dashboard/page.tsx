"use client";

import { useEffect, useState } from "react";
import { getUserProfile, getStudentLeads, createLead, updateProfile } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";
import Link from "next/link";
import CompleteProfileModal from "@/components/dashboard/CompleteProfileModal";

export default function StudentDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    async function load() {
      const [p, l] = await Promise.all([getUserProfile(), getStudentLeads()]);
      setProfile(p);
      setLeads(l);
      if (p && !p.profile_complete) setShowOnboarding(true);
      setLoading(false);
    }
    load();
  }, []);

  const handleOnboardingComplete = async () => {
    const p = await getUserProfile();
    setProfile(p);
    setShowOnboarding(false);
  };

  if (loading) return <div className={s.dashPage}><div className="skeleton" style={{ height: "500px" }} /></div>;

  const freeDemos = profile?.free_demos_remaining ?? 3;

  return (
    <div className={s.dashPage}>
      {showOnboarding && <CompleteProfileModal profile={profile} role="student" onComplete={handleOnboardingComplete} />}
      {showDemoModal && (
        <DemoRequestModal
          subject={selectedSubject}
          onClose={() => setShowDemoModal(false)}
          onSubmit={async (data) => {
            const res = await createLead(data);
            if (res.success) {
              const [p, l] = await Promise.all([getUserProfile(), getStudentLeads()]);
              setProfile(p);
              setLeads(l);
              setShowDemoModal(false);
            } else {
              alert("Error: " + res.error);
            }
          }}
        />
      )}

      {/* Profile completion banner */}
      {!profile?.profile_complete && (
        <div className={`${s.alertBanner} ${s.alertWarning}`}>
          <div className={s.alertIcon}>⚠️</div>
          <div className={s.alertContent}>
            <div className={s.alertTitle}>Complete Your Profile</div>
            <div className={s.alertText}>Add your details to unlock free demo classes and get matched with tutors.</div>
          </div>
          <button className="btn btn-gold btn-sm" onClick={() => setShowOnboarding(true)}>Complete Now</button>
        </div>
      )}

      {/* Header */}
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Welcome back, {profile?.full_name === "Student" || profile?.full_name === "User" || !profile?.full_name ? profile?.email?.split("@")[0] || "Student" : profile?.full_name?.split(" ")[0]} 👋</h1>
          <p className={s.pageSubtitle}>{profile?.grade} • {profile?.curriculum || "Select your board"} • {profile?.subjects?.length || 0} subjects</p>
        </div>
        <Link href="/student/settings" className="btn btn-outline btn-sm">Edit Profile</Link>
      </div>

      {/* Stats */}
      <div className={s.statsRow}>
        <div className={s.statCard}>
          <div className={s.statLabel}>Free Demos Left</div>
          <div className={s.statValue} style={{ color: freeDemos > 0 ? "var(--success)" : "var(--error)" }}>{freeDemos}</div>
          <div className={s.statHint}>{freeDemos > 0 ? "Request a demo for any subject" : "All free demos used"}</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Active Subjects</div>
          <div className={s.statValue}>{profile?.subjects?.length || 0}</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Demo Requests</div>
          <div className={s.statValue}>{leads.length}</div>
          <div className={s.statHint}>{leads.filter(l => l.status === "assigned").length} matched</div>
        </div>
      </div>

      {/* My Subjects + Request Demo */}
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>My Subjects</h2>
        </div>
        {profile?.subjects?.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {profile.subjects.map((sub: string) => {
              const hasLead = leads.some(l => l.subject === sub);
              return (
                <div key={sub} className={s.subjectChip}>
                  <span>📖 {sub}</span>
                  {hasLead ? (
                    <span className="badge badge-success" style={{ marginLeft: "0.5rem" }}>Requested</span>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginLeft: "0.5rem", padding: "0.2rem 0.6rem" }}
                      onClick={() => { setSelectedSubject(sub); setShowDemoModal(true); }}
                      disabled={freeDemos <= 0}
                    >
                      Request Demo
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={s.emptyState}>
            <div className={s.emptyIcon}>📚</div>
            <div className={s.emptyTitle}>No subjects selected</div>
            <p>Complete your profile to add subjects and request free demos.</p>
          </div>
        )}
      </div>

      {/* My Demo Requests */}
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>My Demo Requests</h2>
        </div>
        {leads.length > 0 ? (
          <div className={s.cardGrid}>
            {leads.map((lead) => (
              <div key={lead.id} className={s.leadCard}>
                <div className={s.leadSubject}>{lead.subject}</div>
                <div className={s.leadMeta}>
                  <span>{lead.class_mode === "online" ? "🌐 Online" : "📍 Offline"}</span>
                  {lead.classes_per_month && <span>{lead.classes_per_month} classes/mo</span>}
                  {lead.plan_type && <span>{lead.plan_type}</span>}
                </div>
                <div>
                  <span className={`badge ${lead.status === "assigned" ? "badge-success" : lead.status === "open" ? "badge-warning" : "badge-primary"}`}>
                    {lead.status === "open" ? "⏳ Finding Tutors" : lead.status === "assigned" ? "✓ Tutor Matched" : lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={s.emptyState}>
            <div className={s.emptyIcon}>🗓️</div>
            <div className={s.emptyTitle}>No demo requests yet</div>
            <p>Click &quot;Request Demo&quot; on any subject above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Demo Request Modal ──
function DemoRequestModal({ subject, onClose, onSubmit }: {
  subject: string;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}) {
  const [mode, setMode] = useState("online");
  const [classesPerMonth, setClassesPerMonth] = useState("8");
  const [planType, setPlanType] = useState("Regular");
  const [specialRequest, setSpecialRequest] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({
      subject,
      class_mode: mode,
      classes_per_month: parseInt(classesPerMonth),
      plan_type: planType,
      special_request: specialRequest || null,
      address: mode === "offline" ? address : null,
      city: mode === "offline" ? city : null,
    });
    setSubmitting(false);
  };

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.modalTitle}>Request Demo — {subject}</h2>
        <p className={s.modalSubtitle}>We&apos;ll match you with the best tutor for this subject.</p>

        <form onSubmit={handleSubmit} className={s.modalForm}>
          <div className="input-group">
            <label className="input-label">Class Mode *</label>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["online", "offline"].map((m) => (
                <button key={m} type="button" onClick={() => setMode(m)}
                  style={{
                    flex: 1, padding: "0.75rem", borderRadius: "12px",
                    border: mode === m ? "2px solid var(--royal)" : "2px solid var(--card-border)",
                    background: mode === m ? "var(--royal)" : "var(--card-bg)",
                    color: mode === m ? "white" : "var(--text-main)",
                    fontWeight: 600, cursor: "pointer", fontSize: "var(--text-sm)",
                  }}>
                  {m === "online" ? "🌐 Online" : "📍 Offline (Home Tuition)"}
                </button>
              ))}
            </div>
          </div>

          <div className={s.formRow}>
            <div className="input-group">
              <label className="input-label">Classes per Month</label>
              <select className="input-field" value={classesPerMonth} onChange={(e) => setClassesPerMonth(e.target.value)}>
                <option value="4">4 Classes</option>
                <option value="8">8 Classes</option>
                <option value="12">12 Classes</option>
                <option value="16">16 Classes</option>
                <option value="20">20+ Classes</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Plan Type</label>
              <select className="input-field" value={planType} onChange={(e) => setPlanType(e.target.value)}>
                <option value="Regular">Regular</option>
                <option value="Intensive">Intensive (Exam Prep)</option>
                <option value="Crash Course">Crash Course</option>
                <option value="Doubt Clearing">Doubt Clearing Only</option>
              </select>
            </div>
          </div>

          {mode === "offline" && (
            <div className={s.formRow}>
              <div className="input-group">
                <label className="input-label">City *</label>
                <input className="input-field" required placeholder="e.g. Lucknow" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Area / Locality *</label>
                <input className="input-field" required placeholder="e.g. Gomti Nagar" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Special Request (optional)</label>
            <textarea className="input-field" rows={3} placeholder="e.g. Need a female tutor, prefer weekend classes..." value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} style={{ resize: "vertical" }} />
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="button" className="btn btn-outline btn-lg" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 2 }} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Demo Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
