"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";

const floatingImages = [
  {
    id: "tl",
    src: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80",
    alt: "Online Teacher on Screen",
    className: styles.floatTopLeft,
  },
  {
    id: "tr",
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    alt: "Collaborative Home Tutoring",
    className: styles.floatTopRight,
  },
  {
    id: "bl",
    src: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80",
    alt: "Online Learning Experience Laptop",
    className: styles.floatBottomLeft,
  },
  {
    id: "br",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    alt: "Happy Confident Student Studying",
    className: styles.floatBottomRight,
  }
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero} id="hero-section">
      
      {/* Absolute Floating UI Elements (Desktop Only) */}
      <div className={styles.floatingEnv}>
        {floatingImages.map((img) => (
          <div key={img.id} className={`${styles.floatImg} ${img.className}`}>
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1023px) 0px, 400px" className={styles.stockImg} priority />
          </div>
        ))}
      </div>

      <div className={`container ${styles.heroContainer} ${isVisible ? styles.visible : ""}`}>
        
        {/* Center: Text Content */}
        <div className={styles.textContent}>
          <div className={styles.betaPill}>
            <div className={styles.pillPulse} />
            <span className={styles.pillText}>Live AI Match System</span>
          </div>

          <h1 className={styles.heading}>
            Elite Home & Online Tutoring <br />
            <span className={styles.headingAccent}>Worldwide.</span>
          </h1>

          <p className={styles.subtitle}>
            Unlock your potential with our global network of top 1% verified educators. We deliver deeply personalized learning tailored exactly to your pace and goals.
            <br />
            <span className={styles.highlightText}>Zero upfront cost. 3 Free Demos.</span>
          </p>

          <div className={styles.actionArea}>
            <Link href="/register/student" className={styles.btnPrimary}>
              Book Demo Class
            </Link>
            <Link href="/register/tutor" className={styles.btnSecondary}>
              Become a Tutor
            </Link>
          </div>

          <div className={styles.trustFeatures}>
            <span>✓ Verified Tutors</span>
            <span className={styles.dotSeparator}>•</span>
            <span>✓ Cancel Anytime</span>
            <span className={styles.dotSeparator}>•</span>
            <span>✓ Trusted by 10k+</span>
          </div>
        </div>

        {/* Mobile-Only Horizontal Scroll Images */}
        <div className={styles.mobileImageSlider}>
          {floatingImages.map((img) => (
            <div key={img.id} className={styles.mobileSliderImg}>
               <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1023px) 90vw, 0px" className={styles.stockImg} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

