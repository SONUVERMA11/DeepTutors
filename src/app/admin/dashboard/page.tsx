"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Admin Overview</h1>
          <p className={styles.headerSubtitle}>Platform analytics and pending actions.</p>
        </div>
        <div className={styles.headerActions}>
          <button className="btn btn-outline btn-sm">Export Data</button>
        </div>
      </div>

      {loading ? (
        <div className={styles.skeletonGrid}>
          <div className="skeleton" style={{ height: "100px" }} />
          <div className="skeleton" style={{ height: "100px" }} />
          <div className="skeleton" style={{ height: "100px" }} />
          <div className="skeleton" style={{ height: "100px" }} />
        </div>
      ) : (
        <>
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Pending Tutors</div>
              <div className={`${styles.statValue} ${styles.statValueWarning}`}>14</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Unassigned Students</div>
              <div className={`${styles.statValue} ${styles.statValueRoyal}`}>8</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Total Active Classes</div>
              <div className={`${styles.statValue} ${styles.statValueGold}`}>1,245</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Monthly Revenue</div>
              <div className={`${styles.statValue} ${styles.statValueSuccess}`}>$42k</div>
            </div>
          </div>

          <div className={styles.twoCol}>
            <div>
              <h2 className={styles.sectionTitle}>Recent Tutor Signups</h2>
              <div className={styles.listCard}>
                <div className={styles.listItem}>
                  <div>
                    <div className={styles.listItemName}>Jane Smith</div>
                    <div className={styles.listItemMeta}>Mathematics • 5 Yrs Exp</div>
                  </div>
                  <button className="btn btn-primary btn-sm">Review Docs</button>
                </div>
                <div className={styles.listItem}>
                  <div>
                    <div className={styles.listItemName}>Ahmed Ali</div>
                    <div className={styles.listItemMeta}>Physics • 8 Yrs Exp</div>
                  </div>
                  <button className="btn btn-primary btn-sm">Review Docs</button>
                </div>
              </div>
            </div>

            <div>
              <h2 className={styles.sectionTitle}>Pending Class Assignments</h2>
              <div className={styles.listCard}>
                <div className={styles.listItem}>
                  <div>
                    <div className={styles.listItemName}>John Doe (Student)</div>
                    <div className={styles.listItemMeta}>Wants: IB Biology • Budget: $25</div>
                  </div>
                  <button className="btn btn-outline btn-sm">Match Tutor</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
