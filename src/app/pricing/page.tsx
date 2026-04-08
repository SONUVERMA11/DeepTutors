"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const steps = [
  {
    emoji: "📝",
    color: "var(--royal)",
    title: "Student Requests",
    text: "Tell us the subject, board, schedule, and your budget range. We handle the rest.",
  },
  {
    emoji: "🔗",
    color: "var(--gold)",
    title: "We Match You",
    text: "Our algorithm finds the best-fit tutors based on subject, location, reviews, and your price range.",
  },
  {
    emoji: "🤝",
    color: "var(--success)",
    title: "You Agree Together",
    text: "Tutor and student finalize the fee — transparent negotiation, zero platform surprises.",
  },
];

const tiers = [
  {
    emoji: "🌱",
    name: "Starter",
    desc: "Perfect for occasional help with homework or exam prep.",
    amount: "300",
    period: "per hour (avg)",
    popular: false,
    features: [
      "Group session option (2-3 students)",
      "Verified tutor with 3+ reviews",
      "Flexible scheduling",
      "In-app messaging",
      "Session notes & feedback",
    ],
  },
  {
    emoji: "⭐",
    name: "Premium",
    desc: "Dedicated 1-on-1 sessions with top-rated expert tutors.",
    amount: "600",
    period: "per hour (avg)",
    popular: true,
    features: [
      "1-on-1 private sessions",
      "Top-rated tutor (4.8+ stars)",
      "Custom study plan",
      "Priority scheduling",
      "Progress reports to parents",
      "Recorded sessions (opt-in)",
    ],
  },
  {
    emoji: "🏆",
    name: "Elite",
    desc: "For competitive exam aspirants: JEE, NEET, SAT, Cambridge.",
    amount: "1,200",
    period: "per hour (avg)",
    popular: false,
    features: [
      "Subject matter expert (10+ yr exp)",
      "Intensive prep packages",
      "Mock tests & analysis",
      "WhatsApp doubt-clearing",
      "Parent dashboard access",
      "100% refund if unsatisfied*",
    ],
  },
];

const trustPoints = [
  {
    icon: "🔒",
    title: "No Hidden Fees",
    text: "The price you agree on is the price you pay. We charge a small platform fee, fully visible upfront.",
  },
  {
    icon: "💳",
    title: "Secure Payments",
    text: "Pay through our platform. Tutors get paid after each confirmed session — safe for everyone.",
  },
  {
    icon: "♻️",
    title: "Easy Cancellation",
    text: "Cancel or reschedule up to 4 hours before a session at no charge. Life happens — we get it.",
  },
];

const faqs = [
  {
    q: "How is the tutor fee decided?",
    a: "You set a budget range during registration. We match you with tutors whose rates fit. You and the tutor then agree on the final fee — no forced pricing.",
  },
  {
    q: "Does DeepTutors charge a commission?",
    a: "We charge a transparent 10-15% platform fee on each session, always visible before you confirm. It covers verification, support, and the platform itself.",
  },
  {
    q: "Can I try a tutor before committing?",
    a: "Absolutely. We encourage a trial session before committing to a long-term schedule. Most tutors offer a discounted first session.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "You can switch tutors at any time for free. For Elite tier, we offer a 100% refund guarantee on the first session if the experience doesn't meet expectations.",
  },
  {
    q: "Are there discounts for bulk sessions?",
    a: "Many tutors offer package discounts for 10+ sessions. You can negotiate this directly during the matching process.",
  },
  {
    q: "Do tutors set their own rates?",
    a: "Yes! Tutors set their base rate. Our platform suggests a range based on subject, experience, and market data. The final rate is always mutually agreed upon.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={styles.pricingPage}>
      {/* ── Hero ── */}
      <section className={styles.heroSection}>
        <div className={styles.orbOne}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>💰 Transparent Pricing</span>
          <h1 className={styles.heroTitle}>
            Fair Pricing,{" "}
            <span className={styles.heroTitleAccent}>Your Way</span>
          </h1>
          <p className={styles.heroSubtitle}>
            No surprises, no hidden fees. You set the budget, tutors set their
            rates, and we facilitate a transparent agreement.
          </p>
        </div>
      </section>

      {/* ── How Pricing Works ── */}
      <section className={`section ${styles.howSection}`} id="how-pricing-works">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How Pricing Works</h2>
            <p className={styles.sectionSubtitle}>
              Our unique 3-way model keeps things fair for students, tutors,
              and families.
            </p>
          </div>
          <div className={styles.pipelineContainer}>
            {steps.map((step, i) => (
              <div className={styles.pipelineNode} key={i}>
                <div className={styles.pipelineDot}>
                  <div className={styles.pipelineDotInner} style={{ background: step.color }}></div>
                </div>
                <div className={styles.pipelineContent}>
                  <span className={styles.pipelineEmoji} style={{ background: `${step.color}20` }}>
                    {step.emoji}
                  </span>
                  <h3 className={styles.pipelineTitle}>{step.title}</h3>
                  <p className={styles.pipelineText}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tiers ── */}
      <section className={styles.tiersSection} id="pricing-tiers">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Average Session Rates</h2>
            <p className={styles.sectionSubtitle}>
              These are typical ranges — actual pricing is always agreed between
              you and your tutor.
            </p>
          </div>
          <div className={styles.tiersGrid}>
            {tiers.map((tier, i) => (
              <div
                className={`${styles.tierCard} ${
                  tier.popular ? styles.tierPopular : ""
                }`}
                key={i}
              >
                {tier.popular && (
                  <span className={styles.tierBadge}>Most Popular</span>
                )}
                <span className={styles.tierEmoji}>{tier.emoji}</span>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierDesc}>{tier.desc}</p>
                <div className={styles.tierPrice}>
                  <span className={styles.tierCurrency}>₹</span>
                  <span className={styles.tierAmount}>{tier.amount}</span>
                  <span className={styles.tierPeriod}>/{tier.period}</span>
                </div>
                <hr className={styles.tierDivider} />
                <div className={styles.tierFeatures}>
                  {tier.features.map((feat, fi) => (
                    <div className={styles.tierFeature} key={fi}>
                      <span className={styles.tierFeatureIcon}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/register/student"
                  className={`btn btn-gold btn-lg ${styles.tierCta}`}
                >
                  Book Free Demo
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            {trustPoints.map((tp, i) => (
              <div className={styles.trustCard} key={i}>
                <span className={styles.trustIcon}>{tp.icon}</span>
                <div>
                  <h3 className={styles.trustTitle}>{tp.title}</h3>
                  <p className={styles.trustText}>{tp.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.faqSection} id="pricing-faq">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to know about how pricing works on DeepTutors.
            </p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div className={styles.faqItem} key={i}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  id={`faq-btn-${i}`}
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`${styles.faqChevron} ${
                      openFaq === i ? styles.faqChevronOpen : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`${styles.faqAnswer} ${
                    openFaq === i ? styles.faqAnswerOpen : ""
                  }`}
                >
                  <div className={styles.faqAnswerInner}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
