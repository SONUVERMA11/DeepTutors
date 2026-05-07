"use client";

import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";

const ALL_SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", "Economics", "Computer Science",
  "Accountancy", "Business Studies", "Hindi", "Social Science",
  "JEE Physics", "JEE Chemistry", "JEE Math", "NEET Biology", "NEET Physics", "NEET Chemistry",
  "IB Math", "IB Physics", "IB Chemistry", "IB Economics",
  "A-Level Math", "A-Level Physics",
];

function extractPhone(stored: string | null): string {
  if (!stored) return "";
  const parts = stored.trim().split(" ");
  return parts.length > 1 ? parts.slice(1).join("") : parts[0].replace(/\D/g, "").slice(-10);
}

export default function TutorSettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [highestDegree, setHighestDegree] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [customSubject, setCustomSubject] = useState("");

  useEffect(() => {
    async function load() {
      const p = await getUserProfile();
      if (p) {
        setProfile(p);
        setFullName(p.full_name || "");
        setPhone(p.phone || "");
        setExperience(p.experience || "");
        setHighestDegree(p.highest_degree || "");
        setSelectedSubjects(p.subjects || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const toggleSubject = (sub: string) => {
    setSelectedSubjects(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);
  };

  const addCustomSubject = () => {
    const trimmed = customSubject.trim();
    if (trimmed && !selectedSubjects.includes(trimmed)) {
      setSelectedSubjects(prev => [...prev, trimmed]);
      setCustomSubject("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateProfile({
      full_name: fullName, phone, experience, highest_degree: highestDegree,
      subjects: selectedSubjects, profile_complete: true,
    });
    if (res.success) alert("✓ Profile updated!");
    else alert("Error: " + res.error);
    setSaving(false);
  };

  if (loading) return <div className={s.dashPage}><div className="skeleton" style={{ height: "400px" }} /></div>;

  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Profile Settings ⚙️</h1>
          <p className={s.pageSubtitle}>Update your teaching credentials and contact information.</p>
        </div>
      </div>

      {/* Current Profile Summary */}
      {profile && (
        <div className={`${s.alertBanner} ${s.alertInfo}`} style={{ marginBottom: "1.5rem" }}>
          <div className={s.alertIcon}>👤</div>
          <div className={s.alertContent}>
            <div className={s.alertText}>
              <strong>{profile.full_name}</strong> • {profile.highest_degree || "Qualification not set"} • {profile.experience || "Experience not set"} • {profile.subjects?.length || 0} subjects
              {profile.phone && <> • 📞 {profile.phone}</>}
            </div>
          </div>
        </div>
      )}

      <div className={s.card}>
        <form onSubmit={handleSave} className={s.modalForm}>
          <div className={s.formRow}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">WhatsApp Number</label>
              <input className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div className={s.formRow}>
            <div className="input-group">
              <label className="input-label">Highest Qualification</label>
              <input className="input-field" placeholder="e.g. M.Sc Physics" value={highestDegree} onChange={(e) => setHighestDegree(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Teaching Experience</label>
              <input className="input-field" placeholder="e.g. 5 Years" value={experience} onChange={(e) => setExperience(e.target.value)} />
            </div>
          </div>

          {/* Subject selector with custom input */}
          <div className="input-group">
            <label className="input-label">Subjects You Teach <span style={{ fontWeight: 400, opacity: 0.7 }}>— tap to select or type your own</span></label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
              {ALL_SUBJECTS.map((sub) => (
                <button key={sub} type="button" onClick={() => toggleSubject(sub)}
                  style={{
                    padding: "0.5rem 1rem", borderRadius: "999px",
                    border: selectedSubjects.includes(sub) ? "2px solid var(--royal)" : "2px solid var(--card-border)",
                    background: selectedSubjects.includes(sub) ? "var(--royal)" : "var(--card-bg)",
                    color: selectedSubjects.includes(sub) ? "white" : "var(--text-main)",
                    fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer",
                  }}>
                  {selectedSubjects.includes(sub) ? "✓ " : ""}{sub}
                </button>
              ))}
              {selectedSubjects.filter(s => !ALL_SUBJECTS.includes(s)).map((sub) => (
                <button key={sub} type="button" onClick={() => toggleSubject(sub)}
                  style={{
                    padding: "0.5rem 1rem", borderRadius: "999px",
                    border: "2px solid var(--gold)", background: "var(--gold)", color: "white",
                    fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer",
                  }}>
                  ✓ {sub} ✕
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
              <input className="input-field" placeholder="Type a subject not listed above..." value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomSubject(); } }}
                style={{ flex: 1 }} />
              <button type="button" className="btn btn-outline btn-sm" onClick={addCustomSubject} disabled={!customSubject.trim()}>+ Add</button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "0.5rem" }} disabled={saving}>
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
