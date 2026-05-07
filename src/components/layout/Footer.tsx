import Link from "next/link";
import styles from "./Footer.module.css";

const platformLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const studentLinks = [
  { href: "/register/student", label: "Book Free Demo" },
  { href: "/how-it-works", label: "Free Demo Classes" },
  { href: "/pricing", label: "Session Rates" },
  { href: "/contact", label: "Student Support" },
];

const tutorLinks = [
  { href: "/register/tutor", label: "Apply as Tutor" },
  { href: "/blog/building-a-successful-tutoring-business", label: "Tutor Success Guide" },
  { href: "/pricing", label: "Earnings & Payouts" },
  { href: "/contact", label: "Tutor Support" },
];

const subjectLinks = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English", "Computer Science", "Economics", "Hindi",
];

const examLinks = [
  "CBSE", "ICSE", "IB", "IGCSE",
  "JEE", "NEET", "SAT", "A-Levels",
];

const cityLinks = [
  "Delhi", "Mumbai", "Bangalore", "Chennai",
  "Hyderabad", "Pune", "Kolkata", "Dubai",
];

export default function Footer() {
  return (
    <>
      {/* ── Popular Subjects Section (Moved above Footer & Redesigned) ── */}
      <section className={styles.popularSection} id="popular-subjects">
        <div className={`container ${styles.popularInner}`}>
          <div className={styles.popularHeader}>
            <div className={styles.badgePulse} />
            <h3 className={styles.popularHeading}>Explore DeepTutors</h3>
          </div>
          
          <div className={styles.tagGroups}>
            {/* Subjects */}
            <div className={styles.tagGroup}>
              <h4 className={styles.tagGroupTitle}>Popular Subjects</h4>
              <div className={styles.tagCloud}>
                {subjectLinks.map((s) => (
                  <Link key={s} href={`/tutors/${s.toLowerCase().replace(" ", "-")}`} className={styles.pillTag}>
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            {/* Exams */}
            <div className={styles.tagGroup}>
              <h4 className={styles.tagGroupTitle}>Exam Prep</h4>
              <div className={styles.tagCloud}>
                {examLinks.map((e) => (
                  <Link key={e} href={`/tutors/${e.toLowerCase()}`} className={styles.pillTag}>
                    {e}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div className={styles.tagGroup}>
              <h4 className={styles.tagGroupTitle}>Home Tutors Near You</h4>
              <div className={styles.tagCloud}>
                {cityLinks.map((c) => (
                  <Link key={c} href={`/home-tuition/${c.toLowerCase()}`} className={styles.pillTag}>
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Redesigned Footer ── */}
      <footer className={styles.footer} id="main-footer">
        <div className={`container ${styles.mainGrid}`}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoLink}>
              <span className={styles.logoText}>
                Deep<span className={styles.logoAccent}>Tutors</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Learn Deeper, Grow Further.
            </p>
            <p className={styles.subTagline}>
              Free for Students. Fair for Tutors.
              <br />
              Trusted by Families globally.
            </p>

            {/* Social */}
            <div className={styles.socials}>
              {[
                { 
                  name: "Instagram", 
                  url: "https://instagram.com/deeptutors", 
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  ) 
                },
                { 
                  name: "X", 
                  url: "https://x.com/deeptutors", 
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  ) 
                },
                { 
                  name: "LinkedIn", 
                  url: "https://linkedin.com/company/deeptutors", 
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  ) 
                },
                { 
                  name: "YouTube", 
                  url: "https://youtube.com/@deeptutors", 
                  svg: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  ) 
                }
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={s.name}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Links Container for Mobile Stacking */}
          <div className={styles.linksContainer}>
            {/* Platform Links */}
            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>Platform</h4>
              {platformLinks.map((l) => (
                <Link key={l.href} href={l.href} className={styles.footerLink}>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Students */}
            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>For Students</h4>
              {studentLinks.map((l) => (
                <Link key={l.label} href={l.href} className={styles.footerLink}>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Tutors */}
            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>For Tutors</h4>
              {tutorLinks.map((l) => (
                <Link key={l.label} href={l.href} className={styles.footerLink}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className={styles.bottomBar}>
          <div className={`container ${styles.bottomInner}`}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} DeepTutors. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
              <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
              <Link href="/refund-policy" className={styles.bottomLink}>Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
