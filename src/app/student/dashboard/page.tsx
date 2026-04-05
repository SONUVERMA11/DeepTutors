"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Welcome back, Arjun 👋</h1>
          <p className={styles.headerSubtitle}>Here&apos;s your learning overview.</p>
        </div>
        <button className="btn btn-primary btn-sm">Join Class Now</button>
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
              <div className={styles.statLabel}>Classes Remaining</div>
              <div className={`${styles.statValue} ${styles.statValueRoyal}`}>8</div>
              <div className={styles.statProgress}>
                <div className={styles.statProgressFill} style={{ width: "20%" }} />
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Current Plan</div>
              <div className={styles.statValue} style={{ fontSize: "var(--text-2xl)" }}>IB Physics</div>
              <span className="badge badge-success">Active</span>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Completed Hours</div>
              <div className={`${styles.statValue} ${styles.statValueGold}`}>14h</div>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Upcoming Classes</h2>
          <div className={styles.classList}>
            <div className={styles.classItem}>
              <div>
                <div className={styles.className}>Physics Demo — Kinematics</div>
                <div className={styles.classMeta}>Today, 5:00 PM • Online</div>
              </div>
              <span className="badge badge-warning">Starts in 2 hours</span>
            </div>
            <div className={styles.classItem}>
              <div>
                <div className={styles.className}>Mathematics HL — Calculus Core</div>
                <div className={styles.classMeta}>Tomorrow, 4:00 PM • Home Tuition</div>
              </div>
              <span className="badge badge-primary">Scheduled</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
