"use client";

import styles from "./ComingSoon.module.css";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  subtitle: string;
  icon: string;
}

export default function ComingSoon({ title, subtitle, icon }: ComingSoonProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <Link href="." className="btn btn-primary">Go Back to Dashboard</Link>
    </div>
  );
}
