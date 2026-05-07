"use client";

import { useEffect, useState } from "react";
import { getStudentPayments } from "@/app/(auth)/actions";
import s from "@/styles/dashboard.module.css";

export default function StudentPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const p = await getStudentPayments();
      setPayments(p);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className={s.dashPage}><div className="skeleton" style={{ height: "400px" }} /></div>;

  return (
    <div className={s.dashPage}>
      <div className={s.pageHeader}>
        <div>
          <h1 className={s.pageTitle}>Payments & Billing 💳</h1>
          <p className={s.pageSubtitle}>Pay for your sessions and track payment status.</p>
        </div>
      </div>

      {/* Payment QR */}
      <div className={s.qrCard}>
        <h3 style={{ fontSize: "var(--text-lg)", marginBottom: "0.5rem" }}>Pay via UPI / Bank Transfer</h3>
        <p style={{ opacity: 0.8, fontSize: "var(--text-sm)" }}>Scan the QR code below to make your payment</p>
        <div className={s.qrPlaceholder}>📱</div>
        <div style={{ background: "rgba(255,255,255,0.15)", padding: "1rem", borderRadius: "12px", marginTop: "1rem" }}>
          <p style={{ fontSize: "var(--text-sm)", marginBottom: "0.5rem" }}>
            <strong>Important:</strong> After payment, send a screenshot of the transaction to:
          </p>
          <p style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>
            📱 WhatsApp: +91 7669910932
          </p>
          <p style={{ fontSize: "var(--text-sm)", marginTop: "0.5rem", opacity: 0.8 }}>
            Or email: deeptutors.me@gmail.com
          </p>
        </div>
      </div>

      {/* Payment History */}
      <div className={s.section} style={{ marginTop: "2.5rem" }}>
        <h2 className={s.sectionTitle}>Payment History</h2>
        <div className={s.card} style={{ marginTop: "1rem", overflow: "hidden", padding: 0 }}>
          {payments.length > 0 ? (
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{new Date(p.created_at).toLocaleDateString()}</td>
                    <td>{p.leads?.subject || "—"}</td>
                    <td>₹{p.amount || "—"}</td>
                    <td>
                      <span className={`badge ${p.status === "verified" ? "badge-success" : p.status === "rejected" ? "badge-warning" : "badge-primary"}`}>
                        {p.status === "verified" ? "✓ Verified" : p.status === "rejected" ? "✗ Rejected" : "⏳ Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={s.emptyState}>
              <div className={s.emptyIcon}>💰</div>
              <div className={s.emptyTitle}>No payments yet</div>
              <p>Your payment history will appear here once you make your first payment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
