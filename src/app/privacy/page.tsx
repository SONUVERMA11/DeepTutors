import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | DeepTutors",
  description: "Learn how DeepTutors collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.orbOne}></div>
      <div className={styles.orbTwo}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Data Protection</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: October 15, 2025</p>
        </div>
        
        <div className={styles.document}>
          <p>
            Welcome to DeepTutors. We respect your privacy and are committed to protecting your personal data. This Privacy Policy informs you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tells you about your privacy rights and how the law protects you.
          </p>

          <h2>1. Important Information and Who We Are</h2>
          <p>
            <strong>Purpose of this Privacy Policy:</strong> This policy aims to give you information on how DeepTutors collects and processes your personal data through your use of this website, including any data you may provide when you register as a student, parent, or tutor.
          </p>
          <p>
            <strong>Data Controller:</strong> DeepTutors is the controller and responsible for your personal data. If you have any questions about this privacy policy, please <a href="/contact">contact us</a>.
          </p>

          <h2>2. The Data We Collect About You</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, and age (for tutoring matching).</li>
            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
            <li><strong>Academic Data:</strong> includes schools, curriculums, subjects of interest, and prior academic transcripts (if provided).</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting, and operating system.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ol>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., matching a Tutor with a Student).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ol>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>

          <h2>5. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to request access, correction, erasure, or restriction of your personal data. To exercise these rights, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
