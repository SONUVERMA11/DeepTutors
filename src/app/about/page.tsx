import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us — Our Mission & Story",
  description:
    "Learn about DeepTutors — 3 free demo classes, zero cost to parents, admin-matched verified tutors. Making quality education accessible worldwide.",
};

const values = [
  {
    icon: "🎓",
    color: "var(--gold-light)",
    title: "3 Free Demo Classes",
    text: "Try before you pay. We give you up to 3 free 1-hour demo sessions with verified tutors before you commit.",
  },
  {
    icon: "💰",
    color: "var(--royal-light)",
    title: "Zero Cost to Parents",
    text: "No registration fee, no demo fee, no platform fee, no cancellation fee. The price you agree on is all you ever pay.",
  },
  {
    icon: "🎯",
    color: "rgba(99, 102, 241, 0.08)",
    title: "Admin-Matched Experts",
    text: "Our team personally reviews your needs and hand-picks the best verified tutor — no algorithm roulette.",
  },
  {
    icon: "🛡️",
    color: "var(--success-light)",
    title: "Verified & Tested",
    text: "Every tutor passes document verification plus a live test class with our admin before being approved.",
  },
  {
    icon: "🤝",
    color: "var(--gold-50)",
    title: "Fair 90/10 Split",
    text: "Tutors keep 90% of every confirmed class. We earn only 10% — after a class is delivered, never before.",
  },
  {
    icon: "♻️",
    color: "rgba(6, 182, 212, 0.08)",
    title: "100% Refund Guarantee",
    text: "Cancel anytime and get a full refund on all unused classes. No questions asked, no penalty.",
  },
];

const stats = [
  { emoji: "🎓", value: "50,000+", label: "Students Served" },
  { emoji: "👨‍🏫", value: "10,000+", label: "Verified Tutors" },
  { emoji: "🌏", value: "30+", label: "Countries" },
  { emoji: "⭐", value: "4.9/5", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* ── Hero ── */}
      <section className={styles.heroSection}>
        <div className={styles.orbOne}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>🌟 Our Story</span>
          <h1 className={styles.heroTitle}>
            Making Quality Education{" "}
            <span className={styles.heroTitleAccent}>Accessible to All</span>
          </h1>
          <p className={styles.heroSubtitle}>
            DeepTutors was born from a simple belief: every student deserves a
            great teacher — and you shouldn&apos;t have to pay a single rupee to prove it.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <span className={styles.overline}>Our Mission</span>
              <h2 className={styles.missionTitle}>
                We Find Your Perfect Tutor — You Pay Nothing Until You&apos;re Sure
              </h2>
              <p className={styles.missionText}>
                Every existing platform makes students search, filter, and gamble
                on tutors. We flipped it. Tell us your needs, and our team
                hand-assigns a verified expert who matches your subject, level,
                budget, and teaching style.
              </p>
              <p className={styles.missionText}>
                Then you get <strong>3 free demo classes</strong> to make sure
                it&apos;s the right fit. Not satisfied? We assign another
                tutor. Still not happy? Another one. Up to 5 demos, all free.
              </p>
              <p className={styles.missionText}>
                You only pay when you&apos;re 100% sure — and even then, you can
                cancel anytime for a full refund on unused classes.
              </p>
            </div>
            <div className={styles.missionVisual}>
              <div className={styles.missionCard}>
                <span className={styles.missionEmoji}>🌱</span>
                <h3 className={styles.missionCardTitle}>Grow Without Limits</h3>
                <p className={styles.missionCardText}>
                  From Mumbai to Dubai, Singapore to London — admin-matched
                  verified tutors for CBSE, IB, JEE, SAT, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={styles.valuesSection} id="values-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.overline}>Why DeepTutors</span>
            <h2 className={styles.sectionTitle}>What We Stand For</h2>
            <p className={styles.sectionSubtitle}>
              Six core principles that make DeepTutors fundamentally different
              from every other tutoring platform.
            </p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div className={styles.valueCard} key={i}>
                <div
                  className={styles.valueIcon}
                >
                  {v.icon}
                </div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueText}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={styles.statsSection} id="stats-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.overline}>By The Numbers</span>
            <h2 className={styles.sectionTitle}>DeepTutors by the Numbers</h2>
          </div>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div className={styles.statCard} key={i}>
                <span className={styles.statEmoji}>{s.emoji}</span>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className={styles.storySection} id="story-section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.overline}>Our Origin</span>
            <h2 className={styles.sectionTitle}>The Story Behind DeepTutors</h2>
          </div>
          <div className={styles.storyContent}>
            <p className={styles.storyText}>
              It started with a{" "}
              <span className={styles.storyHighlight}>
                frustrating search for a reliable tutor
              </span>{" "}
              — endless WhatsApp groups, unverified referrals, platforms that
              charge fees before you&apos;ve even met the tutor. Sound familiar?
            </p>
            <p className={styles.storyText}>
              We realized millions of families across India, the Middle
              East, and Southeast Asia face the same problem. Meanwhile,
              thousands of talented educators pay monthly subscription fees
              to platforms with zero guaranteed students.
            </p>
            <p className={styles.storyText}>
              DeepTutors solves both sides:{" "}
              <span className={styles.storyHighlight}>
                Zero cost to students, zero upfront cost to tutors
              </span>
              . We earn only when a class is confirmed — 10% from each session.
              Fair for everyone.
            </p>

            <blockquote className={styles.storyQuote}>
              <p className={styles.storyQuoteText}>
                &ldquo;Learn Deeper, Grow Further.&rdquo;
              </p>
              <cite className={styles.storyQuoteAuthor}>
                — The DeepTutors Promise
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Start Learning for Free Today</h2>
            <p className={styles.ctaText}>
              3 free demo classes with a verified expert, matched specifically for you.
              No credit card. No hidden fees. No commitment.
            </p>
            <div className={styles.ctaActions}>
              <Link
                href="/register/student"
                className="btn btn-gold btn-xl"
                id="about-cta-student"
              >
                Book Free Demo Class
              </Link>
              <Link
                href="/register/tutor"
                className="btn btn-outline-light btn-lg"
                id="about-cta-tutor"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
