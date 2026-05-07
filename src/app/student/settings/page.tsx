"use client";

import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳" }, { code: "+1", flag: "🇺🇸" }, { code: "+44", flag: "🇬🇧" },
  { code: "+971", flag: "🇦🇪" }, { code: "+65", flag: "🇸🇬" }, { code: "+61", flag: "🇦🇺" },
  { code: "+49", flag: "🇩🇪" }, { code: "+33", flag: "🇫🇷" },
];

const GRADES = ["Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12","Undergraduate","Postgraduate"];

const BOARDS: Record<string, string[]> = {
  "Grade 6": ["CBSE","ICSE","State Board","IB MYP","IGCSE"],
  "Grade 7": ["CBSE","ICSE","State Board","IB MYP","IGCSE"],
  "Grade 8": ["CBSE","ICSE","State Board","IB MYP","IGCSE"],
  "Grade 9": ["CBSE","ICSE","State Board","IB MYP","IGCSE"],
  "Grade 10": ["CBSE","ICSE","State Board","IB MYP","IGCSE"],
  "Grade 11": ["CBSE","ICSE","State Board","IB DP","A-Level","JEE","NEET"],
  "Grade 12": ["CBSE","ICSE","State Board","IB DP","A-Level","JEE","NEET"],
  "Undergraduate": ["B.Tech","B.Sc","B.Com","BA","BBA"],
  "Postgraduate": ["M.Tech","M.Sc","MBA","MA"],
};

const SUBJECTS: Record<string, string[]> = {
  "CBSE": ["Mathematics","Science","Physics","Chemistry","Biology","English","Hindi","Social Science","Computer Science","Accountancy","Economics","Business Studies"],
  "ICSE": ["Mathematics","Physics","Chemistry","Biology","English","Hindi","History","Geography","Computer Applications","Economics"],
  "State Board": ["Mathematics","Science","Physics","Chemistry","Biology","English","Hindi","Social Studies"],
  "IB MYP": ["Mathematics","Sciences","English","Language Acquisition","Design"],
  "IB DP": ["Math AA HL","Math AI HL","Physics HL","Chemistry HL","Biology HL","Economics HL","English A HL","CS HL"],
  "IGCSE": ["Mathematics","Physics","Chemistry","Biology","English","Economics","Business Studies","Computer Science"],
  "A-Level": ["Mathematics","Further Mathematics","Physics","Chemistry","Biology","Economics","Computer Science"],
  "JEE": ["Physics","Chemistry","Mathematics"],
  "NEET": ["Physics","Chemistry","Biology (Botany)","Biology (Zoology)"],
  "default": ["Mathematics","Physics","Chemistry","Biology","English","Economics","Computer Science"],
};

// Extract just the digits from a stored phone like "+91 7669910932"
function extractPhone(stored: string | null): string {
  if (!stored) return "";
  const parts = stored.trim().split(" ");
  return parts.length > 1 ? parts.slice(1).join("") : parts[0].replace(/\D/g, "").slice(-10);
}

function extractCountryCode(stored: string | null, fallback: string): string {
  if (!stored) return fallback;
  const match = stored.match(/^\+\d+/);
  return match ? match[0] : fallback;
}

export default function StudentSettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [customSubject, setCustomSubject] = useState("");

  useEffect(() => {
    async function load() {
      const p = await getUserProfile();
      if (p) {
        setProfile(p);
        setFullName(p.full_name || "");
        setCountryCode(p.country_code || extractCountryCode(p.phone, "+91"));
        setPhone(extractPhone(p.phone));
        setGrade(p.grade || "");
        setCurriculum(p.curriculum || "");
        setSelectedSubjects(p.subjects || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  const phoneDigitsOnly = phone.replace(/\D/g, "");
  const availableBoards = grade ? (BOARDS[grade] || []) : [];
  const availableSubjects = curriculum ? (SUBJECTS[curriculum] || SUBJECTS["default"]) : SUBJECTS["default"];

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
    if (phoneDigitsOnly.length !== 10) return alert("Enter a valid 10-digit number.");
    setSaving(true);
    const res = await updateProfile({
      full_name: fullName,
      phone: `${countryCode} ${phoneDigitsOnly}`,
      country_code: countryCode,
      grade, curriculum,
      subjects: selectedSubjects,
      profile_complete: true,
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
          <p className={s.pageSubtitle}>Update your academic details and contact information.</p>
        </div>
      </div>

      {/* Current Profile Summary */}
      {profile && (
        <div className={`${s.alertBanner} ${s.alertInfo}`} style={{ marginBottom: "1.5rem" }}>
          <div className={s.alertIcon}>👤</div>
          <div className={s.alertContent}>
            <div className={s.alertText}>
              <strong>{profile.full_name}</strong> • {profile.grade || "Grade not set"} • {profile.curriculum || "Board not set"} • {profile.subjects?.length || 0} subjects
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
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <select className="input-field" style={{ width: "110px" }} value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                  {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                </select>
                <input className="input-field" type="tel" maxLength={10} placeholder="10 digits" value={phone}
                  onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); if (v.length <= 10) setPhone(v); }} />
              </div>
            </div>
          </div>

          <div className={s.formRow}>
            <div className="input-group">
              <label className="input-label">Grade / Level</label>
              <select className="input-field" value={grade} onChange={(e) => { setGrade(e.target.value); setCurriculum(""); setSelectedSubjects([]); }}>
                <option value="">Select</option>
                {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Board / Curriculum</label>
              <select className="input-field" value={curriculum} onChange={(e) => { setCurriculum(e.target.value); setSelectedSubjects([]); }}>
                <option value="">Select</option>
                {availableBoards.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Subject selector with custom input */}
          <div className="input-group">
            <label className="input-label">Subjects <span style={{ fontWeight: 400, opacity: 0.7 }}>— tap to select or type your own</span></label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
              {availableSubjects.map((sub) => (
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
              {/* Custom subjects not in the preset list */}
              {selectedSubjects.filter(s => !availableSubjects.includes(s)).map((sub) => (
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
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
