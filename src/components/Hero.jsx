import { useEffect, useState } from "react";
import tomatoImg from "../assets/Tomato.jpg";
import NotebookImg from "../assets/Laptop.jpg";
import styles from "./Hero.module.css";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const innerClass = () => `${styles.maskInner} ${loaded ? styles.show : ""}`;

  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>
        <span className={styles.line}>
          <span className={styles.mask}>
            <span className={innerClass()} style={{ transitionDelay: "0ms" }}>
              Thorough
            </span>
          </span>
          <span
            className={`${styles.dot} ${loaded ? styles.dotShow : ""}`}
            aria-hidden="true"
            style={{ transitionDelay: "200ms" }}
          ></span>
        </span>

        <span className={`${styles.line} ${styles.indent1}`}>
          <img src={tomatoImg} className={styles.icon} alt="" />
          <span className={styles.mask}>
            <span className={innerClass()} style={{ transitionDelay: "150ms" }}>
              Proactive
            </span>
          </span>
        </span>

        <span className={`${styles.line} ${styles.lineIcon} ${styles.indent2}`}>
          <span className={styles.mask}>
            <span className={innerClass()} style={{ transitionDelay: "300ms" }}>
              Resourceful
            </span>
          </span>
          <img src={NotebookImg} className={styles.iconNoteBook} alt="" />
        </span>

        <span className={`${styles.line} ${styles.indent3}`}>
          <span className={styles.mask}>
            <span className={innerClass()} style={{ transitionDelay: "450ms" }}>
              Persistent
            </span>
          </span>
        </span>
      </h1>

      <div className={`${styles.scrollHint} ${loaded ? styles.show : ""}`}>
        <span className={styles.scrollText}>Scroll</span>
        <span className={styles.scrollArrow} aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  );
}
