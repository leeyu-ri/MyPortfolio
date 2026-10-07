import styles from "./StarBackground.module.css";

function StarBackground() {
  return (
    <div className={styles.stars} aria-hidden="true">
      <div className={styles.layer1}></div>
      <div className={styles.layer2}></div>
      <div className={styles.layer3}></div>
    </div>
  );
}

export default StarBackground;
