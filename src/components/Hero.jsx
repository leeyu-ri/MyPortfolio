import { useEffect, useState } from "react";
import tomatoImg from "../assets/Tomato.jpg";
import NotebookImg from "../assets/Laptop.jpg";
import styles from "./Hero.module.css";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  // 히어로 글자의 등장 애니메이션(커튼 걷히는 효과)을 재생하기 위한 코드.
  // CSS transition은 상태가 바뀔 때만 재생되므로, 먼저 숨김 상태(loaded=false)로 그린 뒤
  // 다음 프레임에 loaded를 true로 바꿔 show 클래스를 붙인다.
  // 컴포넌트가 사라지면 예약된 프레임을 취소한다.
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
