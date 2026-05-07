"use client";

import { useEffect, useState } from "react";
import { getUserProfile, getOpenLeads, applyForLead, getTutorApplications } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";
import CompleteProfileModal from "@/components/dashboard/CompleteProfileModal";

export default function TutorDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    async function load() {
      const [p, apps] = await Promise.all([getUserProfile(), getTutorApplications()]);
      setProfile(p);
      setApplications(apps);
      if (p && !p.profile_complete) setShowOnboarding(true);

      // Only load leads if verified
      if (p?.verified) {
        const l = await getOpenLeads();
        setLeads(l);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleOnboardingComplete = async () => {
    const p = await getUserProfile();
    setProfile(p);
    setShowOnboarding(false);
  };

  const handleApply = async (leadId: string) => {
    const msg = prompt("Write a short message to the student (optional):");
    const res = await applyForLead(leadId, msg || "I would love to teach this subject.");
    if (res.success) {
      alert("✓ Application sent! Admin will review and assign.");
      const [l, apps] = await Promise.all([getOpenLeads(), getTutorApplications()]);
      setLeads(l);
      setApplications(apps);
    } else {
      alert("Error: " + res.error);
    }
  };

  if (loading) return <div className={s.dashPage}><div className="skeleton" style={{ height: "500px" }} /></div>;

  const appliedLeadIds = applications.map(a => a.lead_id);

  return (
    <div className={s.dashPage}>
      {showOnboarding && <CompleteProfileModal profile={profile} role="tutor" onComplete={handleOnboardingComplete} />}

      {/* Header */}
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Welcome, {profile?.full_name?.split(" ")[0] || "Tutor"} 👨‍🏫</h1>
          <p className={s.pageSubtitle}>
            {profile?.verified
              ? `${profile?.subjects?.length || 0} subjects • ${applications.length} applications sent`
              : "Complete verification to start receiving student leads"}
          </p>
        </div>
        {profile?.verified ? (
          <span className="badge badge-success" style={{ padding: "0.5rem 1rem" }}>✓ Verified</span>
        ) : (
          <span className="badge badge-warning" style={{ padding: "0.5rem 1rem" }}>⚠ Pending Verification</span>
        )}
      </div>

      {/* Verification Alert */}
      {!profile?.verified && profile?.profile_complete && (
        <div className={`${s.alertBanner} ${s.alertWarning}`}>
          <div className={s.alertIcon}>🛡️</div>
          <div className={s.alertContent}>
            <div className={s.alertTitle}>Verification Pending</div>
            <div className={s.alertText}>
              To complete verification, send your qualification documents and Government ID to:
              <br /><strong>WhatsApp: +91 7669910932</strong> or <strong>Email: deeptutors.me@gmail.com</strong>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className={s.statsRow}>
        <div className={s.statCard}>
          <div className={s.statLabel}>Status</div>
          <div className={s.statValue} style={{ fontSize: "var(--text-lg)" }}>{profile?.verified ? "Active" : "Pending"}</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Applications Sent</div>
          <div className={s.statValue}>{applications.length}</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Accepted</div>
          <div className={s.statValue}>{applications.filter(a => a.status === "accepted").length}</div>
        </div>
      </div>

      {/* Available Leads */}
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>Available Student Leads</h2>
          {profile?.verified && <span className="badge badge-primary">Live</span>}
        </div>

        {!profile?.verified ? (
          <div className={s.emptyState}>
            <div className={s.emptyIcon}>🔒</div>
            <div className={s.emptyTitle}>Verification Required</div>
            <p>Complete your profile and verification to see student leads.</p>
          </div>
        ) : leads.length > 0 ? (
          <div className={s.cardGrid}>
            {leads.map((lead) => {
              const already = appliedLeadIds.includes(lead.id);
              return (
                <div key={lead.id} className={s.leadCard}>
                  <div className={s.leadSubject}>{lead.subject}</div>
                  <div className={s.leadMeta}>
                    <span>{lead.class_mode === "online" ? "🌐 Online" : "📍 Offline"}</span>
                    {lead.city && <span>📍 {lead.city}</span>}
                    {lead.classes_per_month && <span>{lead.classes_per_month} cls/mo</span>}
                    {lead.plan_type && <span>{lead.plan_type}</span>}
                    {lead.profiles && <span>🎓 {lead.profiles.grade} • {lead.profiles.curriculum}</span>}
                  </div>
                  {lead.special_request && (
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", fontStyle: "italic" }}>
                      &quot;{lead.special_request}&quot;
                    </p>
                  )}
                  <div className={s.leadActions}>
                    {already ? (
                      <span className="badge badge-success">✓ Applied</span>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => handleApply(lead.id)}>
                        Apply for this Lead
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={s.emptyState}>
            <div className={s.emptyIcon}>📭</div>
            <div className={s.emptyTitle}>No open leads right now</div>
            <p>New student requests appear here in real-time. Check back soon!</p>
          </div>
        )}
      </div>

      {/* My Applications */}
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>My Applications</h2>
        </div>
        {applications.length > 0 ? (
          <div className={s.cardGrid}>
            {applications.map((app) => (
              <div key={app.id} className={s.leadCard}>
                <div className={s.leadSubject}>{app.leads?.subject || "Unknown"}</div>
                <div className={s.leadMeta}>
                  <span>{app.leads?.class_mode === "online" ? "🌐 Online" : "📍 Offline"}</span>
                  {app.leads?.city && <span>📍 {app.leads.city}</span>}
                </div>
                <span className={`badge ${app.status === "accepted" ? "badge-success" : app.status === "rejected" ? "badge-warning" : "badge-primary"}`}>
                  {app.status === "accepted" ? "✓ Accepted" : app.status === "rejected" ? "✗ Not Selected" : "⏳ Under Review"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className={s.emptyState}>
            <div className={s.emptyIcon}>📋</div>
            <div className={s.emptyTitle}>No applications yet</div>
            <p>Apply for student leads above to get matched.</p>
          </div>
        )}
      </div>
    </div>
  );
}
