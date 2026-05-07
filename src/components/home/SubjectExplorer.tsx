"use client";

import { useState, useRef } from "react";
import styles from "./SubjectExplorer.module.css";

const allSubjects = [
  // Core Academics
  { label: "Mathematics", icon: "📐" },
  { label: "Physics", icon: "⚡" },
  { label: "Chemistry", icon: "🧪" },
  { label: "Biology", icon: "🧬" },
  { label: "Computer Science", icon: "💻" },
  { label: "English Lit.", icon: "📖" },
  { label: "Economics", icon: "📊" },
  { label: "Accountancy", icon: "📒" },
  { label: "History", icon: "🏛️" },
  { label: "Geography", icon: "🌍" },
  { label: "Political Science", icon: "⚖️" },
  { label: "Psychology", icon: "🧠" },
  // Exams
  { label: "JEE Mains & Adv", icon: "🎯" },
  { label: "NEET", icon: "🏥" },
  { label: "SAT Prep", icon: "📝" },
  { label: "IELTS / TOEFL", icon: "🗣️" },
  { label: "GMAT / GRE", icon: "🎓" },
  { label: "Olympiads", icon: "🏆" },
  // Tech & Skills
  { label: "Python Basics", icon: "🐍" },
  { label: "Web Development", icon: "🌐" },
  { label: "Java Programming", icon: "☕" },
  { label: "Data Science", icon: "📈" },
  { label: "Machine Learning", icon: "🤖" },
  // Languages & Boards
  { label: "French", icon: "🇫🇷" },
  { label: "Spanish", icon: "🇪🇸" },
  { label: "German", icon: "🇩🇪" },
  { label: "CBSE / ICSE", icon: "📚" },
  { label: "IB / IGCSE", icon: "🌍" },
];

export default function SubjectExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <section className={`section ${styles.section}`} id="subject-explorer" ref={sectionRef}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.header}>
          <span className={styles.overline}>Limitless Learning</span>
          <h2 className={styles.heading}>
            Master <span className={styles.headingAccent}>Any Subject</span>
          </h2>
        </div>
      </div>

      <div className={styles.expandedGrid}>
        {(isExpanded ? allSubjects : allSubjects.slice(0, 8)).map((s, i) => (
          <div key={i} className={styles.expandedPill}>
            <span className={styles.expandedIcon}>{s.icon}</span>
            <span className={styles.expandedLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <button className={styles.ctaBtn} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Close Subjects List" : "See All Subjects"}
          <span className={styles.ctaIcon}>{isExpanded ? "↑" : "→"}</span>
        </button>
      </div>
    </section>
  );
}
