import useInView from "../hooks/useInView";
import useScrollStep from "../hooks/useScrollStep";
import styles from "./SecondSection.module.css";
import StarBackground from "./StarBackground";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";

const images = [p1, p2, p3, p4, p5, p6, p7];
const STEP_VH = 70;

export default function SecondSection() {
  const [wrapperRef, visible] = useInView();
  const activeIndex = useScrollStep(wrapperRef, images.length);
  return (
    <div
      ref={wrapperRef}
      className={styles.pinWrapper}
      style={{ height: `${images.length * STEP_VH}vh` }}
    >
      <div
        className={`${styles.secondSection} ${visible ? styles.visible : ""}`}
      >
        <StarBackground />

        <div className={styles.secondMain}>
          <div className={styles.frame}>
            <span className={`${styles.corner} ${styles.cornerTl}`} />
            <span className={`${styles.corner} ${styles.cornerTr}`} />
            <span className={`${styles.corner} ${styles.cornerBl}`} />
            <span className={`${styles.corner} ${styles.cornerBr}`} />
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={`${styles.frameImg} ${
                  i === activeIndex ? styles.frameImgActive : ""
                }`}
              />
            ))}
          </div>

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
    </div>
  );
}
