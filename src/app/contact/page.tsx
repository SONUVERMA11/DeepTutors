"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./page.module.css";

type InfoCard = {
  icon: ReactNode;
  bg: string;
  title: string;
  text: ReactNode;
};

const infoCards: InfoCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12H4z" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    ),
    bg: "var(--royal-light)",
    title: "Email Us",
    text: (
      <>
        For general inquiries and support:
        <br />
        <a href="mailto:deeptutors.me@gmail.com" className={styles.infoLink}>
          deeptutors.me@gmail.com
        </a>
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    ),
    bg: "rgba(52, 199, 89, 0.08)",
    title: "WhatsApp Support",
    text: (
      <>
        Quick help via WhatsApp:
        <br />
        <a href="https://wa.me/917669910932" className={styles.infoLink}>
          +91 76699 10932
        </a>
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </svg>
    ),
    bg: "rgba(108, 92, 231, 0.08)",
    title: "Response Time",
    text: "We typically respond within 2-4 hours during business hours (9 AM – 9 PM IST, Mon-Sat).",
  },
];

const socials = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    bg: "linear-gradient(135deg, #E1306C, #F77737)",
    label: "Instagram",
    href: "https://www.instagram.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.1 1.5A4.5 4.5 0 0 0 12 7.5v1A10.7 10.7 0 0 1 3 4s-4 9 5 13a11.7 11.7 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.1-.9A7.7 7.7 0 0 0 23 3z" />
      </svg>
    ),
    bg: "linear-gradient(135deg, #1DA1F2, #0D8BD9)",
    label: "Twitter",
    href: "https://x.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v2" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    bg: "linear-gradient(135deg, #0077B5, #005885)",
    label: "LinkedIn",
    href: "https://www.linkedin.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12s0-4.3-.5-6.4a3.1 3.1 0 0 0-2.2-2.2C17.2 3 12 3 12 3s-5.2 0-7.3.4a3.1 3.1 0 0 0-2.2 2.2C2 7.7 2 12 2 12s0 4.3.5 6.4a3.1 3.1 0 0 0 2.2 2.2C6.8 21 12 21 12 21s5.2 0 7.3-.4a3.1 3.1 0 0 0 2.2-2.2C22 16.3 22 12 22 12z" />
        <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
      </svg>
    ),
    bg: "linear-gradient(135deg, #FF0000, #CC0000)",
    label: "YouTube",
    href: "https://www.youtube.com",
  },
];

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.contactPage}>
      {/* ── Hero ── */}
      <section className={styles.heroSection}>
        <div className={styles.orbOne}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>👋 Get in Touch</span>
          <h1 className={styles.heroTitle}>
            We&apos;re Here to{" "}
            <span className={styles.heroTitleAccent}>Help You Grow</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Have questions about our process, pricing, or want to become a tutor?
            Our support team is ready to assist you.
          </p>
        </div>
      </section>

      {/* ── Main Section ── */}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Left: Form */}
            <div className={styles.formCard}>
              {!submitted ? (
                <>
                  <h2 className={styles.formTitle}>Send us a Message</h2>
                  <p className={styles.formSubtitle}>
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                      <div className="input-group">
                        <label className="input-label" htmlFor="contact-name">
                          Full Name
                        </label>
                        <input
                          className="input-field"
                          type="text"
                          id="contact-name"
                          name="name"
                          placeholder="John Doe"
                          required
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="input-group">
                        <label className="input-label" htmlFor="contact-email">
                          Email Address
                        </label>
                        <input
                          className="input-field"
                          type="email"
                          id="contact-email"
                          name="email"
                          placeholder="john@example.com"
                          required
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className={`${styles.formGroupFull} input-group`}>
                        <label className="input-label" htmlFor="contact-subject">
                          Subject
                        </label>
                        <select
                          className="input-field"
                          id="contact-subject"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                        >
                          <option value="">Select a topic</option>
                          <option value="general">General Inquiry</option>
                          <option value="student">Student Support</option>
                          <option value="tutor">Tutor Support</option>
                          <option value="billing">Billing & Pricing</option>
                          <option value="partnership">Partnership</option>
                          <option value="bug">Report a Bug</option>
                        </select>
                      </div>

                      <div className={`${styles.formGroupFull} input-group`}>
                        <label className="input-label" htmlFor="contact-message">
                          Your Message
                        </label>
                        <textarea
                          className={`input-field ${styles.formTextarea}`}
                          id="contact-message"
                          name="message"
                          placeholder="How can we help you?"
                          required
                          value={form.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`btn btn-gold btn-xl ${styles.formSubmit}`}
                    >
                      Send Message →
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successMessage}>
                  <span className={styles.successEmoji}>🎉</span>
                  <h2 className={styles.successTitle}>Message Sent!</h2>
                  <p className={styles.successText}>
                    Thank you for reaching out. Our team will review your
                    message and get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>

            {/* ── Info Side ── */}
            <div className={styles.infoSide}>
              {infoCards.map((card, i) => (
                <div className={styles.infoCard} key={i}>
                  <div
                    className={styles.infoIcon}
                    style={{ background: card.bg }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3 className={styles.infoTitle}>{card.title}</h3>
                    <p className={styles.infoText}>{card.text}</p>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className={styles.socialCard}>
                <h3 className={styles.socialTitle}>Follow Us</h3>
                <div className={styles.socialLinks}>
                  {socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      className={styles.socialLink}
                      style={{ background: s.bg }}
                      aria-label={s.label}
                      title={s.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Location Card */}
              <div className={styles.locationCard}>
                <span className={styles.locationEmoji}><PinIcon /></span>
                <h3 className={styles.locationTitle}>Where We Operate</h3>
                <p className={styles.locationText}>
                  DeepTutors is a fully remote platform serving students and
                  tutors across India, UAE, Singapore, Malaysia, Saudi Arabia,
                  and 25+ other countries worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
