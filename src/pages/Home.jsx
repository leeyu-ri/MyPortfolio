import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div>
      <div className={styles.hero}>
        <p className={styles.heroText}>
          문제를 발견하고 <br />
          해결하는 <br />
          개발자입니다.
        </p>
      </div>

      <section className={styles.overview}>
        <h2 className={styles.overviewTitle}>Overview</h2>

        <p className={styles.overviewText}>
          Project 페이지에는 개인 및 팀 프로젝트에서 진행한 결과물이 담겨
          있습니다. 이 과정에서 고민했던 문제, 해결 방법, 그리고 구현한 기능들을
          통해 저의 기술 스택과 문제 해결 능력을 확인하실 수 있습니다. About
          페이지에서는 저의 경험과 가치관, 그리고 앞으로 개발자로서 나아가고
          싶은 방향을 소개하고 있습니다.
        </p>

        <div className={styles.overviewCards}>
          <Link to="/project" className={styles.overviewCard}>
            <span className={styles.overviewCardTitle}>Project</span>
            <span className={styles.overviewCardArrow}>↗</span>
          </Link>

          <Link to="/about" className={styles.overviewCard}>
            <span className={styles.overviewCardTitle}>About</span>
            <span className={styles.overviewCardArrow}>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
