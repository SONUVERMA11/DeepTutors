import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service | DeepTutors",
  description: "The terms and conditions governing your use of the DeepTutors platform.",
};

export default function TermsPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.orbOne}></div>
      <div className={styles.orbTwo}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Agreements</span>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lastUpdated}>Last Updated: October 15, 2025</p>
        </div>
        
        <div className={styles.document}>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the DeepTutors website, software, and services (collectively, the &quot;Service&quot;). Please read these Terms carefully before using the Service. By accessing or using the Service, you agree to be bound by these Terms.
          </p>

          <h2>1. Platform Overview</h2>
          <p>
            DeepTutors operates as an educational matching and facilitation platform. We provide a marketplace connecting students (or their parents/guardians) seeking tutoring services (&quot;Students&quot;) with independent professionals offering tutoring services (&quot;Tutors&quot;). 
          </p>

          <h2>2. User Accounts</h2>
          <h3>2.1 Registration</h3>
          <p>
            To use certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to maintain the security of your password.
          </p>
          
          <h3>2.2 Minor Restrictions</h3>
          <p>
            If you are under 18 years of age, you must have your parent or legal guardian&apos;s permission to use the Service. Parents or guardians must create the account on behalf of the minor and agree to these Terms.
          </p>

          <h2>3. Tutor Obligations</h2>
          <p>
            Tutors on the DeepTutors platform are independent contractors and are strictly not employees of DeepTutors. Tutors agree to:
          </p>
          <ul>
            <li>Provide accurate credentials, degrees, and background information.</li>
            <li>Maintain professional conduct at all times during sessions.</li>
            <li>Honor the scheduled times negotiated with the Student.</li>
            <li>Refrain from attempting to bypass the DeepTutors platform to receive payment off-platform.</li>
          </ul>

          <h2>4. Payments and Fees</h2>
          <p>
            Access to our platform generally incurs a fee. Student bookings are charged as per the rates displayed on the platform. DeepTutors reserves the right to charge an administrative fee or commission on transactions originating through the Service, which will be clearly communicated prior to payment.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, DeepTutors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. We do not guarantee academic outcomes, test results, or the absolute accuracy of information provided by independent Tutors.
          </p>
        </div>
      </div>
    </div>
  );
}
