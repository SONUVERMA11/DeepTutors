import type { Metadata } from "next";
import EnquiryForm from "./EnquiryForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Enquiry — Forward Your Request | DeepTutors",
  description: "Send us an enquiry today. We offer specialized support and onboarding for both students and expert tutors.",
};

export default function EnquiryPage() {
  return (
    <div className={styles.enquiryPage}>
      <div className={styles.orbOne}></div>
      <div className={styles.orbTwo}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>⚡ Fast Track</span>
          <h1 className={styles.title}>Submit an Enquiry</h1>
          <p className={styles.subtitle}>
            Whether you&apos;re looking to learn or looking to teach, drop your details below and our academic team will reach out to you within 24 hours.
          </p>
        </div>
        
        <EnquiryForm />
      </div>
    </div>
  );
}
