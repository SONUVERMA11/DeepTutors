"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

export default function ParentConsentPage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    // Mock validating token
    setTimeout(() => {
      if (token && token.length > 5) setStatus("valid");
      else setStatus("invalid");
    }, 1000);
  }, [token]);

  const handleConsent = () => {
    // Mock API call to approve student's account
    setGranted(true);
  };

  return (
    <div className={styles.authCard}>
      <div className={styles.header}>
        <span style={{ fontSize: "3rem", display: "inline-block", marginBottom: "1rem" }}>
          👨‍👩‍👧
        </span>
        <h1 className="text-h3">Parental Consent</h1>
        <p className="text-body" style={{ marginTop: "0.5rem" }}>
          We need your permission to register your child.
        </p>
      </div>

      <div className={styles.content}>
        {status === "loading" && (
          <div className="flex-center" style={{ flexDirection: "column", gap: "1rem" }}>
            <div className={styles.spinner} />
            <p>Verifying secure link...</p>
          </div>
        )}

        {status === "invalid" && (
          <div className="flex-center" style={{ flexDirection: "column", gap: "1rem", color: "var(--error)" }}>
            <span style={{ fontSize: "2rem" }}>❌</span>
            <p style={{ textAlign: "center", fontWeight: 600 }}>
              This link is invalid or has expired. Please ask your child to sign up again.
            </p>
          </div>
        )}

        {status === "valid" && !granted && (
          <div className="animate-fadeInRight">
            <div className={styles.infoBox}>
              <p className="text-sm">
                <strong>Student:</strong> John Doe (Your Child)<br/>
                <strong>Age:</strong> 15<br/>
                <strong>Platform:</strong> DeepTutors
              </p>
            </div>
            <p className="text-sm" style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
              DeepTutors takes child safety seriously. By granting consent, you allow your child
              to chat with verified tutors and attend online or home-based tutoring sessions. You
              will receive notifications for all payments and schedule changes.
            </p>
            <div className={styles.actions}>
              <button className="btn btn-primary" onClick={handleConsent} style={{ flex: 1 }}>
                I Grant Consent
              </button>
              <Link href="/" className="btn btn-ghost">
                Decline
              </Link>
            </div>
          </div>
        )}

        {granted && (
          <div className="animate-fadeInUp" style={{ textAlign: "center" }}>
            <span style={{ fontSize: "3.5rem", color: "var(--success)" }}>✅</span>
            <h2 className="text-h4" style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              Consent Granted!
            </h2>
            <p className="text-sm" style={{ color: "var(--gray-600)" }}>
              Thank you. Your child can now log in to DeepTutors using their WhatsApp number.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
