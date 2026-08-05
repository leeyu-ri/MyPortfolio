import { useEffect, useRef, useState } from "react";
import styles from "./SecondSection.module.css";

export default function SecondSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${styles.secondSection} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.starsLayer1}></div>
      <div className={styles.starsLayer2}></div>
      <div className={styles.starsLayer3}></div>

      <div className={styles.secondMain}>
        <p className={styles.sectionTop}>
          멈추지 않고, 주도적으로 답을 찾아내는 끈기 있는 개발자
        </p>
        <h1 className={styles.sectionTitle}>Problem Solver</h1>
        <p className={styles.sectionDescription}>
          웹 디자이너로 시작해 서비스가 실제로 돌아가는 구조에 매료되어 <br />
          개발자로 발을 넓혔습니다. <br />
          화면을 구성하는 시각적 감각을 바탕으로 <br />
          프론트엔드와 튼튼한 백엔드 구조를 함께 고민하며, <br />
          기획부터 AWS 배포, CI/CD 파이프라인 구축까지 전 과정을 <br />
          주도적으로 완주해낸 실행력을 지니고 있습니다.
        </p>
      </div>
    </div>
  );
}
