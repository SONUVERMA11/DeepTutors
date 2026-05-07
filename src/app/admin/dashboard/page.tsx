"use client";

import { useEffect, useState } from "react";
import { getUserProfile, getPendingTutors, approveTutor, getAllLeads, getLeadApplications, assignTutorToLead, getAdminStats } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";

export default function AdminDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>({});
  const [pendingTutors, setPendingTutors] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "tutors" | "leads">("overview");

  // For lead assignment
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [leadApps, setLeadApps] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const [p, t, l, st] = await Promise.all([
        getUserProfile(),
        getPendingTutors(),
        getAllLeads(),
        getAdminStats(),
      ]);
      setProfile(p);
      setPendingTutors(t);
      setLeads(l);
      setStats(st);
      setLoading(false);
    }
    load();
  }, []);

  const handleApprove = async (id: string) => {
    const res = await approveTutor(id);
    if (res.success) {
      setPendingTutors(prev => prev.filter(t => t.id !== id));
      setStats((prev: any) => ({ ...prev, totalTutors: (prev.totalTutors || 0) + 1 }));
    }
  };

  const handleViewApplicants = async (lead: any) => {
    setSelectedLead(lead);
    const apps = await getLeadApplications(lead.id);
    setLeadApps(apps);
  };

  const handleAssign = async (tutorId: string) => {
    if (!selectedLead) return;
    const res = await assignTutorToLead(selectedLead.id, tutorId);
    if (res.success) {
      alert("✓ Tutor assigned successfully! Chat is now enabled between them.");
      setSelectedLead(null);
      const l = await getAllLeads();
      setLeads(l);
    }
  };

  if (loading) return <div className={s.dashPage}><div className="skeleton" style={{ height: "500px" }} /></div>;

  return (
    <div className={s.dashPage}>
      {/* Assignment Modal */}
      {selectedLead && (
        <div className={s.modalOverlay} onClick={() => setSelectedLead(null)}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={s.modalTitle}>Assign Tutor — {selectedLead.subject}</h2>
            <p className={s.modalSubtitle}>
              Student: {selectedLead.profiles?.full_name} • {selectedLead.class_mode} • {selectedLead.city || "Online"}
            </p>
            {leadApps.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                {leadApps.map((app) => (
                  <div key={app.id} style={{
                    padding: "1rem", borderRadius: "16px",
                    border: "1px solid var(--card-border)", background: "var(--bg-alt)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{app.profiles?.full_name}</div>
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                        {app.profiles?.experience} • {app.profiles?.subjects?.join(", ")}
                      </div>
                      {app.message && <p style={{ fontSize: "11px", fontStyle: "italic", marginTop: "0.25rem" }}>&quot;{app.message}&quot;</p>}
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => handleAssign(app.tutor_id)}>Assign</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={s.emptyState} style={{ marginTop: "1rem" }}>
                <p>No tutors have applied for this lead yet.</p>
              </div>
            )}
            <button className="btn btn-outline btn-sm" style={{ marginTop: "1.5rem", width: "100%" }} onClick={() => setSelectedLead(null)}>Close</button>
          </div>
        </div>
      )}

      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Admin Command Center 🛡️</h1>
          <p className={s.pageSubtitle}>Manage the entire DeepTutors platform.</p>
        </div>
      </div>

      {/* Stats */}
      <div className={s.statsRow}>
        <div className={s.statCard}>
          <div className={s.statLabel}>Total Students</div>
          <div className={s.statValue}>{stats.totalStudents}</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Total Tutors</div>
          <div className={s.statValue}>{stats.totalTutors}</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Demo Requests</div>
          <div className={s.statValue}>{stats.totalLeads}</div>
        </div>
        <div className={s.statCard}>
          <div className={s.statLabel}>Pending Approvals</div>
          <div className={s.statValue} style={{ color: "var(--warning)" }}>{pendingTutors.length}</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {(["overview", "tutors", "leads"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`btn ${tab === t ? "btn-primary" : "btn-outline"} btn-sm`}>
            {t === "overview" ? "📊 Overview" : t === "tutors" ? `✅ Verify Tutors (${pendingTutors.length})` : `🔗 Manage Leads (${leads.length})`}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <div className={s.section}>
          <h2 className={s.sectionTitle}>Recent Leads</h2>
          <div className={s.card} style={{ marginTop: "1rem", overflow: "hidden", padding: 0 }}>
            {leads.length > 0 ? (
              <table className={s.table}>
                <thead>
                  <tr><th>Subject</th><th>Student</th><th>Mode</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {leads.slice(0, 10).map((lead) => (
                    <tr key={lead.id}>
                      <td style={{ fontWeight: 700 }}>{lead.subject}</td>
                      <td>{lead.profiles?.full_name}</td>
                      <td>{lead.class_mode}</td>
                      <td>
                        <span className={`badge ${lead.status === "assigned" ? "badge-success" : "badge-warning"}`}>{lead.status}</span>
                      </td>
                      <td>
                        {lead.status === "open" && (
                          <button className="btn btn-primary btn-sm" onClick={() => handleViewApplicants(lead)}>
                            View Applicants
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={s.emptyState}><p>No leads yet.</p></div>
            )}
          </div>
        </div>
      )}

      {tab === "tutors" && (
        <div className={s.section}>
          <h2 className={s.sectionTitle}>Pending Tutor Verifications</h2>
          <div className={s.cardGrid} style={{ marginTop: "1rem" }}>
            {pendingTutors.length > 0 ? pendingTutors.map((tutor) => (
              <div key={tutor.id} className={s.leadCard}>
                <div className={s.leadSubject}>{tutor.full_name}</div>
                <div className={s.leadMeta}>
                  <span>🎓 {tutor.highest_degree || "N/A"}</span>
                  <span>📅 {tutor.experience || "N/A"}</span>
                  <span>📞 {tutor.phone || "N/A"}</span>
                </div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                  Subjects: {tutor.subjects?.join(", ") || "None listed"}
                </p>
                <div className={s.leadActions}>
                  <button className="btn btn-primary btn-sm" onClick={() => handleApprove(tutor.id)}>✓ Approve</button>
                </div>
              </div>
            )) : (
              <div className={s.emptyState}><div className={s.emptyIcon}>✅</div><p>All tutors verified!</p></div>
            )}
          </div>
        </div>
      )}

      {tab === "leads" && (
        <div className={s.section}>
          <h2 className={s.sectionTitle}>All Demo Requests</h2>
          <div className={s.card} style={{ marginTop: "1rem", overflow: "hidden", padding: 0 }}>
            <table className={s.table}>
              <thead>
                <tr><th>Subject</th><th>Student</th><th>Phone</th><th>Mode</th><th>City</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 700 }}>{lead.subject}</td>
                    <td>{lead.profiles?.full_name}</td>
                    <td>{lead.profiles?.phone || "—"}</td>
                    <td>{lead.class_mode}</td>
                    <td>{lead.city || "—"}</td>
                    <td><span className={`badge ${lead.status === "assigned" ? "badge-success" : "badge-warning"}`}>{lead.status}</span></td>
                    <td>
                      {lead.status === "open" && (
                        <button className="btn btn-primary btn-sm" onClick={() => handleViewApplicants(lead)}>Match</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
