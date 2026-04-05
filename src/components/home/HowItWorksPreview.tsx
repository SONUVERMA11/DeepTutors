"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./HowItWorksPreview.module.css";

const steps = [
  {
    num: "01",
    title: "Tell Us Your Needs",
    text: "Share your subject, target budget, and preferred schedule.",
    icon: "📝",
    glow: "rgba(56, 189, 248, 0.4)",
    borderColor: "rgba(56, 189, 248, 0.5)",
  },
  {
    num: "02",
    title: "AI & Admin Match",
    text: "Our experts hand-pick a top-tier verified tutor tailored to you.",
    icon: "🎯",
    glow: "rgba(167, 139, 250, 0.4)",
    borderColor: "rgba(167, 139, 250, 0.5)",
  },
  {
    num: "03",
    title: "3 Free Demos",
    text: "Take 3 full classes entirely free before making any decision.",
    icon: "🎓",
    glow: "rgba(245, 166, 35, 0.4)",
    borderColor: "rgba(245, 166, 35, 0.5)",
    badge: "FREE",
  },
  {
    num: "04",
    title: "Start Learning",
    text: "Pay absolutely zero hidden fees. Cancel anytime.",
    icon: "🚀",
    glow: "rgba(16, 185, 129, 0.4)",
    borderColor: "rgba(16, 185, 129, 0.5)",
  },
];

export default function HowItWorksPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the section
      const totalScrollable = rect.height;
      const scrolled = windowHeight - rect.top;
      
      let progress = scrolled / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`section ${styles.section}`} ref={sectionRef} id="how-it-works-preview">
      {/* Background Ambience */}
      <div className={styles.bgGlowSecondary} />

      <div className="container">
        <div className={styles.header}>
          <span className={styles.overline}>The Journey</span>
          <h2 className={styles.heading}>
            A Seamless Path to <span className={styles.headingAccent}>Excellence</span>
          </h2>
          <p className={styles.subtitle}>
            We've engineered a zero-friction process. From your first request to your first lesson, everything flows perfectly.
          </p>
        </div>

        <div className={styles.timelineContainer}>
          {/* Animated Connecting Line */}
          <div className={styles.timelineLine}>
            <div 
              className={styles.timelineFill} 
              style={{ height: `${scrollProgress * 100}%` }} 
            />
          </div>

          <div className={styles.stepsWrap}>
            {steps.map((step, i) => {
              // Calculate activation based on scroll
              const myActivationPoint = (i + 0.5) / steps.length;
              const isActive = scrollProgress >= myActivationPoint;

              return (
                <div 
                  key={i} 
                  className={`${styles.stepCardWrap} ${i % 2 === 0 ? styles.leftAlign : styles.rightAlign}`}
                >
                  {/* Node on the timeline */}
                  <div className={`${styles.timelineNode} ${isActive ? styles.nodeActive : ''}`}>
                    <div className={styles.nodeInner} style={{ background: isActive ? step.borderColor : '#1A2348' }} />
                  </div>

                  {/* The Glass Card */}
                  <div 
                    className={`${styles.stepCard} ${isActive ? styles.cardActive : ''}`}
                    style={{ ['--step-glow' as string]: step.glow, ['--step-border' as string]: step.borderColor }}
                  >
                    {step.badge && <span className={styles.stepBadge}>{step.badge}</span>}
                    
                    <div className={styles.stepNum}>{step.num}</div>
                    <div className={styles.stepIconWrap}>{step.icon}</div>
                    
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.ctaWrap}>
          <Link href="/how-it-works" className={styles.btnHollow}>
            Explore Full Process
          </Link>
        </div>
      </div>
    </section>
  );
}
