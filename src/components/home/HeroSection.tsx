"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fluid entrance delay
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero} id="hero-section">
      <div className={`container ${styles.heroContainer} ${isVisible ? styles.visible : ""}`}>
        
        {/* ── Left Column: Typography & Actions ── */}
        <div className={styles.leftCol}>
          <div className={styles.betaPill}>
            <div className={styles.pillPulse} />
            <span className={styles.pillText}>Live AI Match System</span>
          </div>

          <h1 className={styles.heading}>
            Unlock Your Potential.<br />
            Find The <span className={styles.headingAccent}>Perfect Tutor.</span>
          </h1>

          <p className={styles.subtitle}>
            Experience the future of tailored education. Our advanced match engine instantly pairs you with elite, verified tutors perfectly suited to your exact learning style. 
            <br />
            <span className={styles.highlightText}>Zero upfront cost. 3 Free Demos.</span>
          </p>

          <div className={styles.actionArea}>
             <Link href="/register/student" className={styles.btnPrimary}>
              Start Learning For Free
              <span className={styles.btnArrow}>→</span>
            </Link>
            <Link href="/register/tutor" className={styles.btnSecondary}>
              Apply as a Tutor
            </Link>
          </div>

          <div className={styles.trustFeatures}>
            <span>✓ Verified Profiles</span>
            <span className={styles.dotSeparator}>•</span>
            <span>✓ Cancel Anytime</span>
            <span className={styles.dotSeparator}>•</span>
            <span>✓ Free Demoss</span>
          </div>
        </div>

        {/* ── Right Column: Mind-Blowing Live Engine ── */}
        <div className={styles.rightCol}>
          <div className={styles.engineWrapper}>
            
            {/* The Radar Sweep Cone */}
            <div className={styles.radarSweep} />
            
            {/* Center Student Node */}
            <div className={styles.centerNode}>
              <div className={styles.centerRingPulse1} />
              <div className={styles.centerRingPulse2} />
              <div className={styles.centerNodeCore}>You</div>
            </div>

            {/* Orbit 1 (Inner) */}
            <div className={`${styles.orbitLine} ${styles.orbit1}`}>
              <div className={`${styles.orbitAnchor} ${styles.posTop}`}>
                <div className={styles.antiBox}>
                  <div className={styles.tutorCard}>
                    <div className={styles.avatar}>👩‍🔬</div>
                    <div className={styles.tutorInfo}>
                      <span className={styles.cardName}>Sarah K.</span>
                      <span className={styles.cardDetail}>Match: 98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbit 2 (Middle Box) */}
            <div className={`${styles.orbitLine} ${styles.orbit2}`}>
              {/* Trust Badge */}
              <div className={`${styles.orbitAnchor} ${styles.posRight}`}>
                <div className={styles.antiBox}>
                  <div className={styles.badgeCard}>
                    🛡️ Verified
                  </div>
                </div>
              </div>

              {/* Tutor Badge */}
              <div className={`${styles.orbitAnchor} ${styles.posBottom}`}>
                <div className={styles.antiBox}>
                  <div className={styles.tutorCard}>
                    <div className={styles.avatar}>👨‍💻</div>
                    <div className={styles.tutorInfo}>
                      <span className={styles.cardName}>Arjun M.</span>
                      <span className={styles.cardDetail}>Physics ★5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbit 3 (Outer Box) */}
            <div className={`${styles.orbitLine} ${styles.orbit3}`}>
              <div className={`${styles.orbitAnchor} ${styles.posLeft}`}>
                <div className={styles.antiBox}>
                  <div className={styles.tutorCard}>
                    <div className={styles.avatar}>👨‍🏫</div>
                    <div className={styles.tutorInfo}>
                      <span className={styles.cardName}>David P.</span>
                      <span className={styles.cardDetail}>Mathematics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
