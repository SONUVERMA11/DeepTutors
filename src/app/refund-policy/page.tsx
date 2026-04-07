import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Refund Policy | DeepTutors",
  description: "DeepTutors refund and cancellation policies for students and parents.",
};

export default function RefundPolicyPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.orbOne}></div>
      <div className={styles.orbTwo}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Financial</span>
          <h1 className={styles.title}>Refund Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: October 15, 2025</p>
        </div>
        
        <div className={styles.document}>
          <p>
            At DeepTutors, we aim to ensure complete satisfaction with the tutoring and educational services provided on our platform. We understand that sometimes things don&apos;t go as planned. This Refund Policy outlines the conditions under which students or parents may be eligible for a refund.
          </p>

          <h2>1. Free Demo Classes</h2>
          <p>
            We proudly offer 3 Free Demo Classes. Because these sessions are provided completely free of charge to first-time users, no refunds, reimbursements, or monetary compensation of any kind apply to these sessions under any circumstance.
          </p>

          <h2>2. Paid Tutoring Sessions</h2>
          <h3>2.1 Session Cancellations by the Student</h3>
          <p>
            If a student needs to cancel a scheduled paid session, they must do so providing at least <strong>24 hours notice</strong> prior to the session start time. Cancellations made with at least 24 hours notice entitles the student to a 100% refund for that specific session or the ability to reschedule without penalty. Cancellations made with less than 24 hours notice are non-refundable to ensure our Tutors are fairly compensated for their blocked time.
          </p>
          
          <h3>2.2 Session Cancellations by the Tutor</h3>
          <p>
            If a Tutor cancels a session or fails to attend a scheduled session within 15 minutes of the start time, the student is entitled to a 100% full refund for that session or a free rescheduled session at their sole discretion.
          </p>

          <h2>3. Unsatisfactory Sessions</h2>
          <p>
            If you are dissatisfied with the quality of a paid session, you must report the issue to our DeepTutors Support Team within <strong>48 hours</strong> of the session&apos;s completion. Claims made after 48 hours will not be eligible for review.
          </p>
          <p>
            Upon receiving your claim, our team will review the session records (if applicable and opted-in) and communications. If we find that the Tutor violated our standards of quality or conduct, a partial or full refund for that specific session may be issued.
          </p>

          <h2>4. Package Subscriptions</h2>
          <p>
            If you have purchased a bulk hour package (e.g., 10 hours for a discounted rate) and wish to terminate the package early, you may request a refund for the unused hours. The refund will be calculated by charging the standard/non-discounted hourly rate for the hours already consumed, and refunding the remaining balance.
          </p>

          <h2>5. Processing Time</h2>
          <p>
            Approved refunds are typically processed within 5 to 7 business days and will be returned to the original payment method used during checkout. If you do not see the credit after 10 business days, please contact your bank or credit card issuer.
          </p>
        </div>
      </div>
    </div>
  );
}
