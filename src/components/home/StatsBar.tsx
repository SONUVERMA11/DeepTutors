"use client";

import styles from "./StatsBar.module.css";

export default function StatsBar() {
  const stats = [
    { value: "10,000+", label: "Happy Students" },
    { value: "4,000+", label: "Verified Tutors" },
    { value: "250+", label: "Subjects Covered" },
    { value: "4.9/5", label: "Average Rating" },
  ];

  return (
    <section className={styles.statsBarContainer}>
      <div className={`container ${styles.statsGrid}`}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <div className={styles.statNumber}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
