"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function StudentRegisterPage() {
  const [step, setStep] = useState(1);
  const [region, setRegion] = useState<"india" | "intl">(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone === "Asia/Kolkata" ? "india" : "intl";
  });
  const router = useRouter();

  // Basic form state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    curriculum: "", // e.g. CBSE, IB, IGCSE
    subjects: "",
    phone: "",
    parentEmail: "", // for under 18 consent
  });

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep((prev) => prev + 1);
    else handleComplete();
  };

  const handleComplete = () => {
    // Determine if age < 18
    const age = parseInt(formData.age, 10);
    if (age < 18) {
      router.push("/parent-consent/mock-token");
    } else {
      router.push("/student/dashboard");
    }
  };

  return (
    <div className={styles.authCard}>
      <div className={styles.header}>
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        <h1 className="text-h3">Student Registration</h1>
        <p className="text-body" style={{ marginTop: "0.5rem" }}>
          Step {step} of 3
        </p>
      </div>

      <button type="button" className={styles.googleBtn}>
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
                placeholder="Student's Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="input-group" style={{ marginBottom: "1rem" }}>
              <label className="input-label">Age</label>
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 15"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              <p className="text-caption">If under 18, parental consent will be required via email.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeInRight">
            <div className="input-group" style={{ marginBottom: "1rem" }}>
              <label className="input-label">Curriculum / Board</label>
              <select
                className="input-field"
                required
                value={formData.curriculum}
                onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
              >
                <option value="">Select Board</option>
                {region === "india" ? (
                  <>
                    <option value="cbse">CBSE</option>
                    <option value="icse">ICSE</option>
                    <option value="state">State Board</option>
                    <option value="jee">JEE Prep</option>
                    <option value="neet">NEET Prep</option>
                  </>
                ) : (
                  <>
                    <option value="ib">IB Programme</option>
                    <option value="igcse">Cambridge IGCSE / A-Levels</option>
                    <option value="sat">SAT Prep</option>
                    <option value="aps">AP Prep</option>
                    <option value="uk">National Curriculum (UK)</option>
                  </>
                )}
              </select>
            </div>
            <div className="input-group" style={{ marginBottom: "1rem" }}>
              <label className="input-label">Grade / Year</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Grade 10, Year 11"
                required
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeInRight">
            {parseInt(formData.age, 10) < 18 && (
              <div className="input-group" style={{ marginBottom: "1rem" }}>
                <label className="input-label">Parent&apos;s Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="parent@example.com"
                  required
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                />
              </div>
            )}
            <div className="input-group" style={{ marginBottom: "1rem" }}>
              <label className="input-label">Your WhatsApp Number (For OTP)</label>
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

        <div className={styles.actions}>
          {step > 1 && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </button>
          )}
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {step < 3 ? "Continue" : "Verify Number & Register"}
          </button>
        </div>
      </form>

      <div className={styles.footer}>
        <p className="text-sm">Already learning with us?</p>
        <Link href="/login" className="text-sm text-gradient" style={{ fontWeight: 600, marginTop: "0.5rem", display: "inline-block" }}>
          Log In Here
        </Link>
      </div>
    </div>
  );
}
