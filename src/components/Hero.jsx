import cameraImg from "../assets/camera.jpg";
import tomatoImg from "../assets/tomato.jpg";
import NotebookImg from "../assets/Notebook.jpg";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <nav className={styles.heroNav}>
        <button className={styles.hamburger} aria-label="메뉴 열기">
          <span />
          <span />
          <span />
        </button>
        <a href="#resume" className={styles.ctaPill}>
          See Resume
        </a>
      </nav>
      <h1 className={styles.heroTitle}>
        <span className={styles.line}>
          THOROUGH
          <span className={styles.dot} aria-hidden="true"></span>
        </span>

        <span className={styles.line}>
          <img src={tomatoImg} className={styles.icon} />
          PROACTIVE
        </span>

        <span className={`${styles.line} ${styles.lineIcon}`}>
          RESOURCEFUL
          <img src={NotebookImg} className={styles.iconNoteBook} />
        </span>

        <span className={styles.line} style={{ marginLeft: "30px" }}>
          PERSISTENT
        </span>
      </h1>
    </section>
  );
}
