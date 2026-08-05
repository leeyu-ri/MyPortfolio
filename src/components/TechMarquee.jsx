import styles from "./TechMarquee.module.css";

const techStack = [
  "REACT",
  "VITE",
  "SPRING BOOT",
  "MYSQL",
  "AWS",
  "GITHUB ACTIONS",
  "CSS MODULES",
];

export default function TechMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marqueeTrack}>
        {items.map((tech, i) => (
          <span key={i} className={styles.marqueeItem}>
            {tech}
            <span className={styles.dotSep} aria-hidden="true">
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
