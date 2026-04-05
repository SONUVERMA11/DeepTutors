"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    name: "Priya S.",
    role: "Parent of Grade 10 Student",
    text: "DeepTutors matched us with an incredible Math tutor perfectly suited to my child's learning pace. The 3 free demos gave us the confidence to commit without hesitation.",
    rating: 5,
    tag: "Parent",
  },
  {
    name: "Rahul Verma",
    role: "JEE Aspirant",
    text: "My Physics tutor doesn't just teach formulas; he makes me understand the concepts deeply. This is hands down the best tutoring experience I've had online.",
    rating: 5,
    tag: "Student",
  },
  {
    name: "Dr. Ananya Rao",
    role: "IB Biology Tutor",
    text: "As a tutor, the 90/10 revenue split is revolutionary. I finally feel valued for my time and expertise. DeepTutors handles the matching so I can focus entirely on teaching.",
    rating: 5,
    tag: "Tutor",
  },
  {
    name: "Karan Gupta",
    role: "Class 12 Student",
    text: "Zero rigid packages. We paid directly for the hours we needed. The level of transparency is exactly what you want when preparing for board exams.",
    rating: 5,
    tag: "Student",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Clone for infinite effect visually
  const cloned = [...testimonials, ...testimonials];

  return (
    <section className={`section ${styles.section}`} ref={sectionRef} id="testimonials-section">
      <div className={styles.gradientSphere} />
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.header}>
          <span className={styles.overline}>Success Stories</span>
          <h2 className={styles.heading}>
            Trusted by Families <br />
            <span className={styles.headingAccent}>Around the Globe</span>
          </h2>
        </div>
      </div>

      <div className={styles.sliderWrap}>
        <div className={styles.sliderTrack} ref={scrollRef}>
          {cloned.map((t, i) => (
            <div key={i} className={styles.testamonialCard}>
              <div className={styles.quoteMark}>"</div>
              
              <div className={styles.stars}>
                {"★".repeat(t.rating)}
              </div>
              
              <p className={styles.quoteText}>{t.text}</p>
              
              <div className={styles.authorArea}>
                <div className={styles.avatar}>
                  {t.name.charAt(0)}
                </div>
                <div className={styles.authorMeta}>
                  <strong className={styles.authorName}>{t.name}</strong>
                  <span className={styles.authorRole}>{t.role}</span>
                </div>
                <span className={styles.tag}>{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
