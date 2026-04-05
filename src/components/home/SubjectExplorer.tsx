"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./SubjectExplorer.module.css";

const subjectsRow1 = [
  { label: "Mathematics", icon: "📐" },
  { label: "Physics", icon: "⚡" },
  { label: "Chemistry", icon: "🧪" },
  { label: "Biology", icon: "🧬" },
  { label: "Computer Science", icon: "💻" },
  { label: "JEE Mains", icon: "🎯" },
  { label: "NEET", icon: "🏥" },
  { label: "SAT Prep", icon: "📝" },
];

const subjectsRow2 = [
  { label: "English", icon: "📖" },
  { label: "Economics", icon: "📊" },
  { label: "Accountancy", icon: "📒" },
  { label: "History", icon: "🏛️" },
  { label: "Python", icon: "🐍" },
  { label: "Web Dev", icon: "🌐" },
  { label: "French", icon: "🇫🇷" },
  { label: "Olympiads", icon: "🏆" },
];

export default function SubjectExplorer() {
  const sectionRef = useRef<HTMLElement>(null);

  // We use CSS keyframes for the marquee, so no complex JS needed here
  
  return (
    <section className={`section ${styles.section}`} id="subject-explorer" ref={sectionRef}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.header}>
          <span className={styles.overline}>Limitless Learning</span>
          <h2 className={styles.heading}>
            Master Any Subject with <br />
            <span className={styles.headingAccent}>Subject Matter Experts</span>
          </h2>
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        {/* Row 1 - Left to Right */}
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeInner}>
            {[...subjectsRow1, ...subjectsRow1, ...subjectsRow1].map((s, i) => (
              <div key={i} className={styles.subjectPill}>
                <span className={styles.pillIcon}>{s.icon}</span>
                <span className={styles.pillLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className={`${styles.marqueeTrack} ${styles.marqueeReverse}`}>
          <div className={styles.marqueeInner}>
            {[...subjectsRow2, ...subjectsRow2, ...subjectsRow2].map((s, i) => (
              <div key={i} className={styles.subjectPill}>
                <span className={styles.pillIcon}>{s.icon}</span>
                <span className={styles.pillLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.ctaWrap}>
        <Link href="/register/student" className={styles.ctaBtn}>
          Explore All Subjects
          <span className={styles.ctaIcon}>→</span>
        </Link>
      </div>
    </section>
  );
}
