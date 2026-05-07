import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authWrapper}>
      {/* Desktop Left Panel — Brand Showcase */}
      <div className={styles.brandPanel}>
        <div className={styles.brandPanelContent}>
          <div className={styles.brandLogo}>
            Deep<span>Tutors</span>
          </div>
          <h2 className={styles.brandTagline}>
            Where Learning<br />
            Meets <span>Excellence</span>
          </h2>
          <p className={styles.brandSubtext}>
            Join thousands of students and tutors on India&apos;s most trusted personalized learning platform.
          </p>

          {/* Feature Chips */}
          <div className={styles.featureChips}>
            <div className={styles.chip}>
              <span className={styles.chipIcon}>✨</span>
              <span>3 Free Demo Classes</span>
            </div>
            <div className={styles.chip}>
              <span className={styles.chipIcon}>🎯</span>
              <span>AI-Powered Matching</span>
            </div>
            <div className={styles.chip}>
              <span className={styles.chipIcon}>🛡️</span>
              <span>Verified Tutors Only</span>
            </div>
          </div>
        </div>

        {/* Decorative Orbs */}
        <div className={styles.orbOne} />
        <div className={styles.orbTwo} />
      </div>

      {/* Right Panel — Auth Form */}
      <div className={styles.authInner}>
        {children}
      </div>
    </div>
  );
}
