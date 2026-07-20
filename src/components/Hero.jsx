
import cameraImg from "../assets/camera.jpg";
import tomatoImg from "../assets/tomato.jpg";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <nav className={styles.heroNav}>
        <button className={styles.hamburger} aria-label="메뉴 열기">
          <span />
          <span />
        </button>
        <a href="#resume" className={styles.ctapill}>
          See Resume
        </a>
      </nav>
      <h1 className={styles.heroTitle}>
        <span className={styles.line}>
          THOROUGH
          <span className={styles.dot} aria-hidden="true"></span>
        </span>

        <span className={styles.line}>
          <img src={cameraImg} className={styles.icon} />
          PROACTIVE
        </span>

        <span className={`${styles.line} ${styles.lineIcon}`}>
          <img src={tomatoImg} className={styles.icon} />
          RESOURCEFUL
        </span>

        <span className={styles.line}>PERSISTENT</span>
      </h1>
    </section>
  );
}
