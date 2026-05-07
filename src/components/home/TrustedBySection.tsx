import styles from "./TrustedBySection.module.css";

const curricula = [
  "CBSE", "ICSE", "IB Programme", "Cambridge IGCSE",
  "A-Levels", "GCSE", "Khan Academy", "MIT OpenCourseWare",
  "Stanford Online", "AP Board", "CUET", "SAT / ACT",
];

export default function TrustedBySection() {
  return (
    <section className={styles.section} id="trusted-by">
      <div className={styles.label}>
        Tutors Experienced With Curricula From
      </div>
      <div className={styles.marqueeOuter}>
        <div className={styles.marqueeTrack}>
          {[...curricula, ...curricula].map((name, i) => (
            <span className={styles.item} key={i}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
