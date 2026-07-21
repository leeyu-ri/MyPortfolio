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
          Thorough
          <span className={styles.dot} aria-hidden="true"></span>
        </span>

        <span className={styles.line} style={{ marginLeft: "100px" }}>
          <img src={tomatoImg} className={styles.icon} />
          Proactive
        </span>

        <span
          className={`${styles.line} ${styles.lineIcon}`}
          style={{ marginLeft: "300px" }}
        >
          Resourceful
          <img src={NotebookImg} className={styles.iconNoteBook} />
        </span>

        <span className={styles.line} style={{ marginLeft: "90px" }}>
          Persistent
        </span>
      </h1>
    </section>
  );
}
