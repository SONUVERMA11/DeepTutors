"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function TutorDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Dashboard</h1>
          <p className={styles.headerSubtitle}>Manage your active classes and earnings.</p>
        </div>
        <button className="btn btn-primary btn-sm">Update Availability</button>
      </div>

      {loading ? (
        <div className={styles.skeletonGrid}>
          <div className="skeleton" style={{ height: "120px" }} />
          <div className="skeleton" style={{ height: "120px" }} />
          <div className="skeleton" style={{ height: "120px" }} />
        </div>
      ) : (
        <>
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Monthly Earnings</div>
              <div className={`${styles.statValue} ${styles.statValueSuccess}`}>$450.00</div>
              <span className="badge badge-success">Payouts on 1st</span>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Active Students</div>
              <div className={styles.statValue} style={{ fontSize: "var(--text-3xl)" }}>3</div>
              <span className="badge badge-primary">View Roster</span>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Upcoming Classes</div>
              <div className={`${styles.statValue} ${styles.statValueGold}`}>5</div>
              <div className={styles.statLabel}>Next 7 days</div>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Recent Assignment Requests</h2>
          <div className={styles.requestList}>
            <div className={styles.requestItem}>
              <div>
                <div className={styles.requestName}>A-Level Math (UK)</div>
                <div className={styles.requestMeta}>Budget: $20/hr • Requested by Admin</div>
              </div>
              <div className={styles.requestActions}>
                <button className="btn btn-outline btn-sm">Counter Offer</button>
                <button className="btn btn-primary btn-sm">Accept $20/hr</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
