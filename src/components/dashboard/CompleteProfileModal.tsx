"use client";

import { useState } from "react";
import { updateProfile } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
];

const GRADES = [
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12", "Undergraduate", "Postgraduate",
];

const BOARDS: Record<string, string[]> = {
  "Grade 6": ["CBSE", "ICSE", "State Board", "IB MYP", "IGCSE"],
  "Grade 7": ["CBSE", "ICSE", "State Board", "IB MYP", "IGCSE"],
  "Grade 8": ["CBSE", "ICSE", "State Board", "IB MYP", "IGCSE"],
  "Grade 9": ["CBSE", "ICSE", "State Board", "IB MYP", "IGCSE"],
  "Grade 10": ["CBSE", "ICSE", "State Board", "IB MYP", "IGCSE"],
  "Grade 11": ["CBSE", "ICSE", "State Board", "IB DP", "A-Level", "JEE", "NEET"],
  "Grade 12": ["CBSE", "ICSE", "State Board", "IB DP", "A-Level", "JEE", "NEET"],
  "Undergraduate": ["B.Tech", "B.Sc", "B.Com", "BA", "BBA", "Other"],
  "Postgraduate": ["M.Tech", "M.Sc", "MBA", "MA", "Other"],
};

const SUBJECTS: Record<string, string[]> = {
  "CBSE": ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science", "Computer Science", "Accountancy", "Economics", "Business Studies"],
  "ICSE": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Hindi", "History", "Geography", "Computer Applications", "Economics", "Commerce"],
  "State Board": ["Mathematics", "Science", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Studies"],
  "IB MYP": ["Mathematics", "Sciences", "English", "Language Acquisition", "Individuals and Societies", "Design"],
  "IB DP": ["Math AA HL", "Math AI HL", "Physics HL", "Chemistry HL", "Biology HL", "Economics HL", "English A HL", "Computer Science HL"],
  "IGCSE": ["Mathematics", "Additional Math", "Physics", "Chemistry", "Biology", "English", "Economics", "Business Studies", "Computer Science"],
  "A-Level": ["Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology", "Economics", "Business", "Computer Science"],
  "JEE": ["Physics", "Chemistry", "Mathematics"],
  "NEET": ["Physics", "Chemistry", "Biology (Botany)", "Biology (Zoology)"],
  "default": ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Economics", "Computer Science"],
};

interface Props {
  profile: any;
  /** Explicitly pass the role from the page context so it never misdetects */
  role: "student" | "tutor";
  onComplete: () => void;
}

export default function CompleteProfileModal({ profile, role, onComplete }: Props) {
  const isStudent = role === "student";
  const [saving, setSaving] = useState(false);
  const [countryCode, setCountryCode] = useState(profile?.country_code || "+91");
  const [phone, setPhone] = useState(profile?.phone?.replace(/^\+\d+\s?/, "") || "");
  const [grade, setGrade] = useState(profile?.grade || "");
  const [curriculum, setCurriculum] = useState(profile?.curriculum || "");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(profile?.subjects || []);
  const [customSubject, setCustomSubject] = useState("");
  const [experience, setExperience] = useState(profile?.experience || "");
  const [highestDegree, setHighestDegree] = useState(profile?.highest_degree || "");

  const phoneDigitsOnly = phone.replace(/\D/g, "");
  const phoneValid = phoneDigitsOnly.length === 10;

  const availableBoards = grade ? (BOARDS[grade] || []) : [];
  const availableSubjects = curriculum ? (SUBJECTS[curriculum] || SUBJECTS["default"]) : SUBJECTS["default"];

  const toggleSubject = (sub: string) => {
    setSelectedSubjects(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const addCustomSubject = () => {
    const trimmed = customSubject.trim();
    if (trimmed && !selectedSubjects.includes(trimmed)) {
      setSelectedSubjects(prev => [...prev, trimmed]);
      setCustomSubject("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneValid) return alert("Please enter a valid 10-digit mobile number.");
    if (isStudent && selectedSubjects.length === 0) return alert("Please select at least one subject.");

    setSaving(true);
    const updates: Record<string, any> = {
      phone: `${countryCode} ${phoneDigitsOnly}`,
      country_code: countryCode,
      subjects: selectedSubjects,
      profile_complete: true,
    };

    if (isStudent) {
      updates.grade = grade;
      updates.curriculum = curriculum;
    } else {
      updates.experience = experience;
      updates.highest_degree = highestDegree;
    }

    const res = await updateProfile(updates);
    if (res.success) onComplete();
    else alert("Error: " + res.error);
    setSaving(false);
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <h2 className={s.modalTitle}>
          {isStudent ? "Complete Your Student Profile 🎓" : "Complete Your Tutor Profile 👨‍🏫"}
        </h2>
        <p className={s.modalSubtitle}>
          {isStudent
            ? "Fill in your details to unlock free demo classes and get matched with expert tutors."
            : "Add your credentials so our admin team can verify your profile and match you with students."}
        </p>

        <form onSubmit={handleSubmit} className={s.modalForm}>
          {/* Phone */}
          <div className="input-group">
            <label className="input-label">WhatsApp Number *</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <select
                className="input-field"
                style={{ width: "130px", flexShrink: 0 }}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className="input-field"
                placeholder="10-digit number"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 10) setPhone(val);
                }}
              />
            </div>
            {phone && !phoneValid && (
              <span style={{ color: "var(--error)", fontSize: "11px" }}>
                Enter exactly 10 digits
              </span>
            )}
          </div>

          {isStudent ? (
            <>
              {/* Grade */}
              <div className="input-group">
                <label className="input-label">Class / Level *</label>
                <select className="input-field" value={grade} required onChange={(e) => {
                  setGrade(e.target.value);
                  setCurriculum("");
                  setSelectedSubjects([]);
                }}>
                  <option value="">Select your class</option>
                  {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* Board — only if grade selected and not competitive */}
              {grade && availableBoards.length > 0 && (
                <div className="input-group">
                  <label className="input-label">Board / Curriculum *</label>
                  <select className="input-field" value={curriculum} required onChange={(e) => {
                    setCurriculum(e.target.value);
                    setSelectedSubjects([]);
                  }}>
                    <option value="">Select board</option>
                    {availableBoards.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              )}

              {/* Subjects */}
              {(curriculum || grade) && (
                <div className="input-group">
                  <label className="input-label">Subjects Interested In * <span style={{ fontWeight: 400, opacity: 0.7 }}>— tap to select or type your own</span></label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {availableSubjects.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        style={{
                          padding: "0.5rem 1rem",
                          borderRadius: "999px",
                          border: selectedSubjects.includes(sub) ? "2px solid var(--royal)" : "2px solid var(--card-border)",
                          background: selectedSubjects.includes(sub) ? "var(--royal)" : "var(--card-bg)",
                          color: selectedSubjects.includes(sub) ? "white" : "var(--text-main)",
                          fontSize: "var(--text-xs)",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {selectedSubjects.includes(sub) ? "✓ " : ""}{sub}
                      </button>
                    ))}
                    {selectedSubjects.filter(s => !availableSubjects.includes(s)).map((sub) => (
                      <button key={sub} type="button" onClick={() => toggleSubject(sub)}
                        style={{ padding: "0.5rem 1rem", borderRadius: "999px", border: "2px solid var(--gold)", background: "var(--gold)", color: "white", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer" }}>
                        ✓ {sub} ✕
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                    <input className="input-field" type="text" placeholder="Type a subject not listed above..." value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomSubject(); } }}
                      style={{ flex: 1 }} />
                    <button type="button" className="btn btn-outline btn-sm" onClick={addCustomSubject} disabled={!customSubject.trim()}>+ Add</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={s.formRow}>
                <div className="input-group">
                  <label className="input-label">Highest Qualification *</label>
                  <input className="input-field" required placeholder="e.g. M.Sc Physics" value={highestDegree} onChange={(e) => setHighestDegree(e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Experience *</label>
                  <input className="input-field" required placeholder="e.g. 5 Years" value={experience} onChange={(e) => setExperience(e.target.value)} />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Subjects You Teach * <span style={{ fontWeight: 400, opacity: 0.7 }}>— tap to select or type your own</span></label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {SUBJECTS["default"].concat(["JEE Physics", "JEE Chemistry", "JEE Math", "NEET Biology", "IB Math", "IB Physics"]).map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubject(sub)}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "999px",
                        border: selectedSubjects.includes(sub) ? "2px solid var(--royal)" : "2px solid var(--card-border)",
                        background: selectedSubjects.includes(sub) ? "var(--royal)" : "var(--card-bg)",
                        color: selectedSubjects.includes(sub) ? "white" : "var(--text-main)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {selectedSubjects.includes(sub) ? "✓ " : ""}{sub}
                    </button>
                  ))}
                  {selectedSubjects.filter(s => !SUBJECTS["default"].concat(["JEE Physics", "JEE Chemistry", "JEE Math", "NEET Biology", "IB Math", "IB Physics"]).includes(s)).map((sub) => (
                    <button key={sub} type="button" onClick={() => toggleSubject(sub)}
                      style={{ padding: "0.5rem 1rem", borderRadius: "999px", border: "2px solid var(--gold)", background: "var(--gold)", color: "white", fontSize: "var(--text-xs)", fontWeight: 600, cursor: "pointer" }}>
                      ✓ {sub} ✕
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                  <input className="input-field" type="text" placeholder="Type a subject not listed above..." value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomSubject(); } }}
                    style={{ flex: 1 }} />
                  <button type="button" className="btn btn-outline btn-sm" onClick={addCustomSubject} disabled={!customSubject.trim()}>+ Add</button>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "0.5rem" }} disabled={saving}>
            {saving ? "Saving..." : "Complete Profile & Unlock Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
