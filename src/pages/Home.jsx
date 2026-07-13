import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.hero}>
      <p className={styles.heroText}>
        문제를 발견하고 <br />
        해결하는 <br />
        개발자입니다.
      </p>
    </div>
  );
}

export default Home;
