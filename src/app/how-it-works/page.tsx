import styles from "./page.module.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — 4 Steps to Your Perfect Tutor",
  description:
    "Register free, get admin-matched with a verified tutor, enjoy 3 free demo classes, then start learning. Zero cost to parents, ever.",
};

const steps = [
  {
    step: "Step 1",
    title: "Tell Us Your Needs",
    desc: "Register free in under 2 minutes. Tell us the subject, grade level, curriculum (CBSE/IB/SAT/etc.), preferred mode (home or online), and your budget. Our smart form adapts to your location.",
    icon: "📝",
    highlight: false,
    details: [
      { emoji: "📚", text: "Choose from 30+ subjects across all boards" },
      { emoji: "🏠", text: "Home tuition or online via Zoom/Meet" },
      { emoji: "💰", text: "Set your budget — we find tutors in range" },
      { emoji: "🌍", text: "Available in 30+ countries worldwide" },
    ],
  },
  {
    step: "Step 2",
    title: "We Assign Your Perfect Tutor",
    desc: "No algorithm roulette. Our experienced academic team personally reviews your request and hand-picks a verified tutor who fits your exact criteria, teaching style, and budget. If the tutor's rate differs, we mediate the negotiation.",
    icon: "🎯",
    highlight: false,
    details: [
      { emoji: "🛡️", text: "Every tutor verified with ID & documents" },
      { emoji: "🧑‍🏫", text: "Admin conducts live test class before approval" },
      { emoji: "🎓", text: "Subject expertise & teaching style matched" },
      { emoji: "🤝", text: "Budget negotiation handled by our team" },
    ],
  },
  {
    step: "Step 3",
    title: "3 Free Demo Classes",
    desc: "Before paying anything, meet your tutor in a free 1-hour demo session via Google Meet, Zoom, or at your home. Not the right fit? We assign another tutor. You get up to 3 free demos (5 in exceptional cases). Zero cost.",
    icon: "🎓",
    highlight: true,
    details: [
      { emoji: "💰", text: "₹0 for all demo classes — completely free" },
      { emoji: "🔄", text: "Not satisfied? We switch until you're happy" },
      { emoji: "⏰", text: "Full 1-hour demo sessions, not 15-min trials" },
      { emoji: "📝", text: "Progress tracking begins from demo class" },
    ],
  },
  {
    step: "Step 4",
    title: "Choose Your Package & Pay",
    desc: "Happy with your tutor? Choose weekly or monthly class packages. Pay advance via UPI, cards, or international payment. The agreed price is all you pay — no registration fee, no platform fee, no hidden charges. Ever.",
    icon: "💳",
    highlight: false,
    details: [
      { emoji: "📦", text: "Flexible weekly or monthly packages" },
      { emoji: "💳", text: "UPI, cards, net banking, international pay" },
      { emoji: "🚫", text: "Zero hidden charges — no platform fees" },
      { emoji: "♻️", text: "100% refund on unused classes, no questions" },
    ],
  },
  {
    step: "Step 5",
    title: "Learn, Track, Succeed",
    desc: "Schedule sessions with your tutor directly. Track progress from your dashboard. Chat via our secure messaging. Each class is auto-confirmed after 24 hours. Cancel anytime — get 100% refund on unused classes, no questions asked.",
    icon: "🚀",
    highlight: false,
    details: [
      { emoji: "📊", text: "Real-time progress dashboard for parents" },
      { emoji: "💬", text: "Secure in-app messaging with tutor" },
      { emoji: "📅", text: "Flexible scheduling & rescheduling" },
      { emoji: "🏆", text: "Regular assessment & performance reports" },
    ],
  },
];

const guarantees = [
  { icon: "🛡️", title: "Verified Tutors", desc: "Every tutor passes document verification + live test class" },
  { icon: "💰", title: "Zero Cost to Parents", desc: "No registration, demo, platform, or cancellation fees" },
  { icon: "♻️", title: "100% Refund", desc: "Full refund on unused classes, no questions asked" },
  { icon: "🔒", title: "Secure Platform", desc: "End-to-end encrypted chat & session management" },
];

export default function HowItWorksPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <span className={styles.heroBadge}>✨ Simple Process</span>
          <h1 className={styles.heroTitle}>
            Find Your Perfect Tutor in{" "}
            <span className={styles.heroAccent}>4 Simple Steps</span>
          </h1>
          <p className={styles.heroSubtitle}>
            We&apos;ve made finding a verified expert tutor as easy as it should be.
            No searching, no guessing — just great education, starting with 3 free demos.
          </p>

          {/* Guarantee badges */}
          <div className={styles.guaranteesRow}>
            {guarantees.map((g, i) => (
              <div key={i} className={styles.guaranteeBadge}>
                <span className={styles.guaranteeIcon}>{g.icon}</span>
                <span className={styles.guaranteeText}>{g.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`container ${styles.contentSection}`}>
        <div className={styles.timeline}>
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`${styles.timelineItem} ${item.highlight ? styles.timelineHighlight : ""}`}
            >
              <div className={`${styles.timelineIcon} ${item.highlight ? styles.iconHighlight : ""}`}>
                {item.icon}
              </div>
              <div className={`${styles.timelineContent} ${item.highlight ? styles.contentHighlight : ""}`}>
                <span className={styles.stepLabel}>
                  {item.step}
                  {item.highlight && <span className={styles.freeTag}>FREE</span>}
                </span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepText}>{item.desc}</p>

                {/* Mixing details grid */}
                <div className={styles.detailsGrid}>
                  {item.details.map((detail, j) => (
                    <div key={j} className={styles.detailChip}>
                      <span className={styles.detailEmoji}>{detail.emoji}</span>
                      <span className={styles.detailText}>{detail.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees section */}
        <div className={styles.guaranteesSection}>
          <h2 className={styles.guaranteesTitle}>Our Promise to You</h2>
          <div className={styles.guaranteesGrid}>
            {guarantees.map((g, i) => (
              <div key={i} className={styles.guaranteeCard}>
                <span className={styles.guaranteeCardIcon}>{g.icon}</span>
                <h3 className={styles.guaranteeCardTitle}>{g.title}</h3>
                <p className={styles.guaranteeCardDesc}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>
            Ready to start learning?
          </h2>
          <p className={styles.ctaText}>
            It takes less than 2 minutes to submit your request.
            3 free demos, zero charges, 100% refund guarantee.
          </p>
          <Link href="/register/student" className="btn btn-gold btn-xl">
            Book Your Free Demo Class
          </Link>
        </div>
      </div>
    </div>
  );
}
