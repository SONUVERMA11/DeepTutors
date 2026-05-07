import Link from "next/link";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.section} id="cta-section">
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={`container ${styles.container}`}>
        <span className={styles.overline}>Ready to Start?</span>
        <h2 className={styles.heading}>
          Begin Your Learning Journey <br />
          <span className={styles.headingGold}>100% Free</span>
        </h2>
        <p className={styles.subtitle}>
          No credit card. No hidden fees. No commitment. Just 3 free demo classes 
          with a verified expert tutor matched specifically for you.
        </p>

        <div className={styles.cards}>
          {/* Student Card */}
          <div className={styles.card}>
            <span className={styles.cardIcon}>🎓</span>
            <h3 className={styles.cardTitle}>I&apos;m a Student</h3>
            <ul className={styles.cardList}>
              <li>✔ 3 free demo classes</li>
              <li>✔ Zero charges to parents</li>
              <li>✔ Cancel anytime, full refund</li>
              <li>✔ Admin-matched verified tutor</li>
            </ul>
            <Link href="/register/student" className="btn btn-gold btn-lg" style={{ width: "100%" }}>
              Book Free Demo Class
            </Link>
          </div>

          {/* Tutor Card */}
          <div className={styles.card}>
            <span className={styles.cardIcon}>👨‍🏫</span>
            <h3 className={styles.cardTitle}>I&apos;m a Tutor</h3>
            <ul className={styles.cardList}>
              <li>✔ Zero upfront cost</li>
              <li>✔ Keep 90% of every class</li>
              <li>✔ Max 10 students, quality focus</li>
              <li>✔ UPI / PayPal payout in 3 days</li>
            </ul>
            <Link href="/register/tutor" className="btn btn-gold btn-lg" style={{ width: "100%" }}>
              Apply to Teach
            </Link>
          </div>
        </div>

        <div className={styles.trustRow}>
          <span>✓ No credit card required</span>
          <span>✓ No hidden fees</span>
          <span>✓ Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
