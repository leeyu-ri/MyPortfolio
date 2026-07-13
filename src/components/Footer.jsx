import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__contact}>
        <a href="mailto:yuri7534@naver.com" className={styles.footer__link}>
          yuri7534@naver.com
        </a>
        <a
          href="https://github.com/leeyu-ri"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          GitHub
        </a>
        <a
          href="https://www.instagram.com/rieeuly/?hl=ko"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          instagram
        </a>
      </div>
      <p className={styles.footer__copyright}>
        © {new Date().getFullYear()} 유리. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
