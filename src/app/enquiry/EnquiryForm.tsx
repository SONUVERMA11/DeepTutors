"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function EnquiryForm() {
  const [activeTab, setActiveTab] = useState<"student" | "tutor">("student");
  const [submitted, setSubmitted] = useState(false);

  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    grade: "",
    details: "",
  });

  const [tutorForm, setTutorForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    details: "",
  });

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleTutorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTutorForm({ ...tutorForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.formCard}>
        <div className={styles.successState}>
          <span className={styles.successIcon}>🚀</span>
          <h2 className={styles.successTitle}>Enquiry Received!</h2>
          <p className={styles.successText}>
            Thank you, {activeTab === "student" ? studentForm.name : tutorForm.name}. Our academic coordination team is reviewing your details and will contact you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      {/* Visual Toggle */}
      <div className={styles.toggleContainer}>
        {/* Animated Highlight */}
        <div 
          className={styles.toggleHighlight}
          style={{ transform: activeTab === "student" ? "translateX(0)" : "translateX(100%)" }}
        />
        
        <button
          type="button"
          className={styles.toggleBtn}
          data-active={activeTab === "student"}
          onClick={() => setActiveTab("student")}
        >
          I am a Student / Parent
        </button>
        <button
          type="button"
          className={styles.toggleBtn}
          data-active={activeTab === "tutor"}
          onClick={() => setActiveTab("tutor")}
        >
          I am a Tutor
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === "student" ? (
          <div className={styles.formGrid}>
            <div className={`input-group ${styles.fullRow}`}>
              <label className="input-label" htmlFor="s-name">Full Name (Student or Parent)</label>
              <input required className="input-field" type="text" id="s-name" name="name" placeholder="E.g., Ryan Gosling" value={studentForm.name} onChange={handleStudentChange} />
            </div>
            
            <div className="input-group">
              <label className="input-label" htmlFor="s-email">Email Address</label>
              <input required className="input-field" type="email" id="s-email" name="email" placeholder="ryan@example.com" value={studentForm.email} onChange={handleStudentChange} />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="s-phone">Phone / WhatsApp</label>
              <input required className="input-field" type="tel" id="s-phone" name="phone" placeholder="+91 98765 43210" value={studentForm.phone} onChange={handleStudentChange} />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="s-subject">Subject Needed</label>
              <select required className="input-field" id="s-subject" name="subject" value={studentForm.subject} onChange={handleStudentChange}>
                <option value="">Select a Subject Area</option>
                <option value="math">Mathematics</option>
                <option value="science">Sciences (Physics/Chemistry/Bio)</option>
                <option value="english">English / Humanities</option>
                <option value="languages">Foreign Languages</option>
                <option value="competitive">Competitive Exams (JEE/NEET/SAT)</option>
                <option value="other">Other / Not Sure</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="s-grade">Current Grade / Curriculum</label>
              <input required className="input-field" type="text" id="s-grade" name="grade" placeholder="E.g., Grade 10 CBSE" value={studentForm.grade} onChange={handleStudentChange} />
            </div>

            <div className={`input-group ${styles.fullRow}`}>
              <label className="input-label" htmlFor="s-details">What specifically do you need help with?</label>
              <textarea required className={`input-field ${styles.textarea}`} id="s-details" name="details" placeholder="Please describe any specific challenges, preferred timings, or goals..." value={studentForm.details} onChange={handleStudentChange} />
            </div>
          </div>
        ) : (
          <div className={styles.formGrid}>
            <div className={`input-group ${styles.fullRow}`}>
              <label className="input-label" htmlFor="t-name">Full Name</label>
              <input required className="input-field" type="text" id="t-name" name="name" placeholder="E.g., Dr. Emma Watson" value={tutorForm.name} onChange={handleTutorChange} />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="t-email">Email Address</label>
              <input required className="input-field" type="email" id="t-email" name="email" placeholder="emma@example.com" value={tutorForm.email} onChange={handleTutorChange} />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="t-phone">Phone / WhatsApp</label>
              <input required className="input-field" type="tel" id="t-phone" name="phone" placeholder="+91 98765 43210" value={tutorForm.phone} onChange={handleTutorChange} />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="t-specialty">Primary Subject Specialty</label>
              <input required className="input-field" type="text" id="t-specialty" name="specialty" placeholder="E.g., Advanced Mathematics (JEE)" value={tutorForm.specialty} onChange={handleTutorChange} />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="t-experience">Years of Experience</label>
              <select required className="input-field" id="t-experience" name="experience" value={tutorForm.experience} onChange={handleTutorChange}>
                <option value="">Select Experience Level</option>
                <option value="0-1">Less than 1 Year</option>
                <option value="1-3">1 - 3 Years</option>
                <option value="3-5">3 - 5 Years</option>
                <option value="5-10">5 - 10 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </div>

            <div className={`input-group ${styles.fullRow}`}>
              <label className="input-label" htmlFor="t-details">Why do you want to join DeepTutors?</label>
              <textarea required className={`input-field ${styles.textarea}`} id="t-details" name="details" placeholder="Tell us briefly about your teaching style, background, and which syllabus you prefer teaching..." value={tutorForm.details} onChange={handleTutorChange} />
            </div>
          </div>
        )}

        <button type="submit" className={`btn btn-primary btn-xl ${styles.submitBtn}`}>
          Submit Enquiry →
        </button>
      </form>
    </div>
  );
}
