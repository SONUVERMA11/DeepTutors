"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { signUpTutor, signInWithGoogle, uploadDocument } from "../../actions";

export default function TutorRegisterPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [degreeFile, setDegreeFile] = useState<File | null>(null);
  const [govIdFile, setGovIdFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    highestDegree: "",
    subjects: [] as string[],
    experience: "",
  });

  const availableSubjects = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "Computer Science", "English Language", "Economics", "History",
    "French", "Spanish", "Accounting", "Business Studies"
  ];

  const handleSubjectToggle = (sub: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(sub)
        ? prev.subjects.filter(s => s !== sub)
        : [...prev.subjects, sub]
    }));
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (step < 3) setStep(prev => prev + 1);
    else handleComplete();
  };

  const handleComplete = async () => {
    setError(null);
    setLoading(true);

    try {
      // 1. Create account + profile
      const result = await signUpTutor(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }
    } catch {
      // redirect throws on success — now try to upload files
      // Note: file uploads happen after account creation
      try {
        if (degreeFile) {
          const fd = new FormData();
          fd.append("file", degreeFile);
          await uploadDocument(fd, "tutor-docs", `degrees/${Date.now()}-${degreeFile.name}`);
        }
        if (govIdFile) {
          const fd = new FormData();
          fd.append("file", govIdFile);
          await uploadDocument(fd, "tutor-docs", `gov-ids/${Date.now()}-${govIdFile.name}`);
        }
      } catch {
        // File upload errors are non-blocking
        console.warn("File upload failed — user can retry from dashboard");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch {
      // redirect throws on success
    }
  };

  return (
    <div className={styles.authCard}>
      <div className={styles.header}>
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        <h1 className="text-h3">Become a Tutor</h1>
        <p className="text-body" style={{ marginTop: "0.5rem" }}>
          Step {step} of 3
        </p>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      <button
        type="button"
        className={styles.googleBtn}
        onClick={handleGoogleSignUp}
        disabled={loading}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Sign up with Google
      </button>

      <div className={styles.divider}>
        <span>OR</span>
      </div>

      <form onSubmit={nextStep} className={styles.form}>
        {step === 1 && (
          <div className="animate-fadeInRight">
            <div className="input-group" style={{ marginBottom: "1rem" }}>
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Dr. Jane Doe"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="input-group" style={{ marginBottom: "1rem" }}>
              <label className="input-label">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="jane@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="input-group" style={{ marginBottom: "1rem" }}>
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Min 6 characters"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="input-group" style={{ marginBottom: "1rem" }}>
              <label className="input-label">WhatsApp Number</label>
              <input
                type="tel"
                className="input-field"
                placeholder="+1 234 567 890"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeInRight">
            <h3 className="text-sm" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
              Select your expertise (Multiple)
            </h3>
            <div className={styles.subjectGrid}>
              {availableSubjects.map((sub) => (
                <button
                  type="button"
                  key={sub}
                  className={`${styles.subjectPill} ${formData.subjects.includes(sub) ? styles.subjectActive : ""}`}
                  onClick={() => handleSubjectToggle(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="input-group" style={{ marginTop: "1.5rem" }}>
              <label className="input-label">Years of Experience</label>
              <select
                className="input-field"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              >
                <option value="">Select Experience</option>
                <option value="0-2">0 - 2 Years</option>
                <option value="3-5">3 - 5 Years</option>
                <option value="5-10">5 - 10 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeInRight">
            <h3 className="text-sm" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
              Identity & Qualification Verification
            </h3>
            <p className="text-caption" style={{ marginBottom: "1rem" }}>
              Upload your highest degree and a Government ID to get verified.
              (Formats: PDF, JPG, PNG up to 10MB)
            </p>

            <div className={styles.uploadZone}>
              <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📄</span>
              <p className="text-sm" style={{ fontWeight: 500 }}>
                {degreeFile ? `✅ ${degreeFile.name}` : "Upload Highest Degree"}
              </p>
              <p className="text-caption">Drag & Drop or click to browse</p>
              <input
                type="file"
                className={styles.fileInput}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setDegreeFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className={styles.uploadZone} style={{ marginTop: "1rem" }}>
              <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🪪</span>
              <p className="text-sm" style={{ fontWeight: 500 }}>
                {govIdFile ? `✅ ${govIdFile.name}` : "Upload Government ID"}
              </p>
              <p className="text-caption">Passport, Driving License, or National ID</p>
              <input
                type="file"
                className={styles.fileInput}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setGovIdFile(e.target.files?.[0] || null)}
              />
            </div>

            <p className="text-caption" style={{ marginTop: "1rem", color: "var(--success)", textAlign: "center" }}>
              Your documents are securely fully encrypted.
            </p>
          </div>
        )}

        <div className={styles.actions}>
          {step > 1 && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setStep((prev) => prev - 1)}
              disabled={loading}
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={loading || (step === 2 && formData.subjects.length === 0)}
          >
            {loading ? "Creating account…" : step < 3 ? "Continue" : "Submit for Verification"}
          </button>
        </div>
      </form>

      <div className={styles.footer}>
        <p className="text-sm">Already a verified tutor?</p>
        <Link href="/login" className="text-sm text-gradient" style={{ fontWeight: 600, marginTop: "0.5rem", display: "inline-block" }}>
          Log In Here
        </Link>
      </div>
    </div>
  );
}
