"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    name: "Priya S.",
    role: "Parent of Grade 10 Student",
    text: "Before DeepTutors, my daughter had no fixed study schedule. They matched us with an incredible Math tutor perfectly suited to her learning pace. Her confidence and grades have improved massively.",
    rating: 5,
    tag: "Parent",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80"
  },
  {
    name: "Rahul Verma",
    role: "JEE Aspirant",
    text: "My Physics tutor doesn't just teach formulas; he makes me understand the concepts deeply. I can ask doubts anytime via WhatsApp. This is hands down the best online tutoring experience.",
    rating: 5,
    tag: "Student",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80"
  },
  {
    name: "Dr. Ananya Rao",
    role: "IB Biology Tutor",
    text: "As a tutor, the level of transparency here is exactly what you want. DeepTutors handles the matching completely so I can focus entirely on teaching. Highly recommended platform.",
    rating: 5,
    tag: "Tutor",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&q=80"
  }
];

export default function TestimonialsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderCard = (t: typeof testimonials[0], i: number) => (
    <div key={i} className={styles.testamonialCard}>
      <div className={styles.quoteMark}>"</div>
      
      <div className={styles.stars}>
        {"★".repeat(t.rating)}
      </div>
      
      <p className={styles.quoteText}>{t.text}</p>
      
      <div className={styles.authorArea}>
        <div className={styles.avatar}>
          <Image src={t.avatar} alt={t.name} fill className={styles.avatarImg} />
        </div>
        <div className={styles.authorMeta}>
          <strong className={styles.authorName}>{t.name}</strong>
          <div className={styles.googleReview}>
             {/* Placeholder for SVG icon, using simple G for now */}
            <span className={styles.gIcon}>G</span> Google Review
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className={`section ${styles.section}`} id="testimonials-section">
      <div className={styles.gradientSphere} />
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.header}>
          <span className={styles.overline}>TESTIMONIALS</span>
          <h2 className={styles.heading}>
            Hear How DeepTutors Helped Their <br />
            <span className={styles.headingAccent}>Learning Journey!</span>
          </h2>
        </div>

        {!isExpanded ? (
          <div className={styles.sliderContainer}>
            <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Previous Testimonial">
              ←
            </button>
            <div className={styles.sliderTrack}>
              {renderCard(testimonials[currentIndex], currentIndex)}
            </div>
            <button className={styles.arrowBtn} onClick={handleNext} aria-label="Next Testimonial">
              →
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {testimonials.map((t, i) => renderCard(t, i))}
          </div>
        )}

        <div className={styles.toggleWrapper}>
          <button 
            className={styles.viewAllBtn} 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "View All Testimonials"}
          </button>
        </div>
      </div>
    </section>
  );
}
