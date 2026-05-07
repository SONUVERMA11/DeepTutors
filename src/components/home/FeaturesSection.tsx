"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./FeaturesSection.module.css";

const gridItems = [
  {
    type: "image",
    id: "img1",
    src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
    alt: "Dedicated student learning",
    colSpan: 1,
    rowSpan: 2,
    gradient: "transparent",
    borderColor: "var(--card-border)",
  },
  {
    type: "feature",
    id: "demos",
    title: "3 Free Demo Classes",
    text: "Try up to 3 tutors completely free. Not happy? We assign another. No risk, ever.",
    colSpan: 2,
    rowSpan: 1,
    gradient: "linear-gradient(135deg, rgba(245, 166, 35, 0.15), rgba(0,0,0,0))",
    borderColor: "rgba(245, 166, 35, 0.4)",
  },
  {
    type: "feature",
    id: "verified",
    title: "Verified & Tested",
    text: "Every tutor passes rigorous document verification and a live teaching test.",
    colSpan: 1,
    rowSpan: 1,
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(0,0,0,0))",
    borderColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    type: "feature",
    id: "cost",
    title: "Zero Upfront Cost",
    text: "No registration fee. No hidden charges. The negotiated price is all you ever pay.",
    colSpan: 1,
    rowSpan: 1,
    gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(0,0,0,0))",
    borderColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    type: "feature",
    id: "admin",
    title: "Admin-Matched Experts",
    text: "No algorithmic roulette. Our team hand-picks the perfect tutor based on your exact needs.",
    colSpan: 1,
    rowSpan: 1,
    gradient: "linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(0,0,0,0))",
    borderColor: "rgba(167, 139, 250, 0.4)",
  },
  {
    type: "feature",
    id: "refund",
    title: "100% Refund Policy",
    text: "Cancel anytime. Get a full refund on all unused classes. No questions asked.",
    colSpan: 1,
    rowSpan: 1,
    gradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(0,0,0,0))",
    borderColor: "rgba(244, 63, 94, 0.4)",
  },
  {
    type: "image",
    id: "img2",
    src: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=800&q=80",
    alt: "Expert home tutor",
    colSpan: 1,
    rowSpan: 1,
    gradient: "transparent",
    borderColor: "var(--card-border)",
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Auto-scroll slider on mobile every 3 seconds
    const interval = setInterval(() => {
      if (gridRef.current && window.innerWidth < 768) {
        const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        // If near the end, reset to start, else scroll one card's width
        if (scrollLeft >= maxScroll - 10) {
          gridRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const scrollAmount = clientWidth * 0.85 + 16;
          gridRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderMiniUI = (id: string) => {
    switch (id) {
      case "demos":
        return (
          <div className={styles.uiDemos}>
            {[1, 2, 3].map(n => (
              <div key={n} className={styles.demoSlot}>
                <div className={styles.demoCheck}>✓</div>
                <div className={styles.demoPulse} style={{ animationDelay: `${n * 0.4}s` }} />
              </div>
            ))}
          </div>
        );
      case "verified":
        return (
          <div className={styles.uiVerified}>
            <div className={styles.shieldIcon}>🛡️</div>
            <div className={styles.scannerLine} />
          </div>
        );
      case "cost":
        return (
          <div className={styles.uiCost}>
            <div className={styles.costTag}>
              $0<span className={styles.costStrike} />
            </div>
            <div className={styles.costGlow} />
          </div>
        );
      case "admin":
        return (
          <div className={styles.uiAdmin}>
            <div className={styles.adminAvatar}>A</div>
            <div className={styles.adminLine} />
            <div className={styles.adminTarget}>
              <div className={styles.targetInner}>S</div>
            </div>
          </div>
        );
      case "refund":
        return (
          <div className={styles.uiRefund}>
            <div className={styles.refundRing} />
            <div className={styles.refundIcon}>♻️</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className={`section ${styles.section}`} ref={sectionRef} id="features-section">
      <div className={styles.bgGridLines} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className={styles.header}>
          <div className={styles.badgeWrap}>
            <div className={styles.badgePulse} />
            <span className={styles.badgeText}>The Core Advantage</span>
          </div>
          <h2 className={styles.heading}>
            Not Just Another <span className={styles.headingAccent}>Directory.</span>
          </h2>
          <p className={styles.subtitle}>
            We completely rebuilt the tutoring model from the ground up to be safe, risk-free, and incredibly fair. Experience the platform of the future.
          </p>
        </div>

        <div className={styles.bentoGrid} ref={gridRef}>
          {gridItems.map((item, i) => (
            <div
              key={i}
              className={`${styles.bentoCard} ${isVisible ? styles.cardVisible : ""} ${item.type === "image" ? styles.imageCard : ""}`}
              style={{ 
                animationDelay: `${i * 100}ms`,
                ["--col-span" as string]: item.colSpan,
                ["--row-span" as string]: item.rowSpan,
                ["--border-color" as string]: item.borderColor,
                ["--card-bg" as string]: item.gradient,
              }}
            >
              {item.type === "image" ? (
                <div className={styles.bentoImgWrap}>
                  <Image src={item.src!} alt={item.alt!} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.bentoImg} />
                </div>
              ) : (
                <>
                  <div className={styles.cardGlowBg} />
                  <div className={styles.cardInner}>
                    <div className={styles.miniUIContainer}>
                      {renderMiniUI(item.id)}
                    </div>
                    <div className={styles.cardTextContainer}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardText}>{item.text}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
