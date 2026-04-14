"use client";

import { useState, useEffect } from "react";
import styles from "./EnquiryPopup.module.css";

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup this session
    const hasSeenPopup = sessionStorage.getItem("enquiryPopupShown");
    
    if (!hasSeenPopup) {
      // Show the popup after roughly 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("enquiryPopupShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission (You can later connect this to Supabase)
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const closePopup = () => setIsOpen(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={closePopup} aria-label="Close">
          &times;
        </button>
        
        {!submitted ? (
          <>
            <h2 className="heading-3" style={{ marginBottom: "0.5rem" }}>Book Your Free Demo!</h2>
            <p className="text-body" style={{ marginBottom: "1.5rem" }}>
              Leave your details and our academic counselor will contact you shortly.
            </p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className="input-group">
                <label className="input-label" htmlFor="enq-name">Student Name</label>
                <input type="text" id="enq-name" className="input-field" required placeholder="Enter student name" />
              </div>
              
              <div className="input-group">
                <label className="input-label" htmlFor="enq-phone">Phone / WhatsApp</label>
                <input type="tel" id="enq-phone" className="input-field" required placeholder="+91 9876543210" />
              </div>
              
              <div className="input-group">
                <label className="input-label" htmlFor="enq-grade">Class / Subject</label>
                <input type="text" id="enq-grade" className="input-field" required placeholder="e.g. Class 10 CBSE Maths" />
              </div>

              <button type="submit" className="btn btn-primary btn-xl" style={{ width: "100%", marginTop: "1rem" }}>
                Request Free Callback
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.checkCircle}>✓</div>
            <h3 className="heading-3">Request Received!</h3>
            <p className="text-body">Our team will get back to you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
