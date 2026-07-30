import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import tomatoIcon from "../assets/Tomato.jpg";
import styles from "./Nav.module.css";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`${styles.nav} ${isAboutPage ? styles.navDark : ""}`}>
      <div className={styles.left}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="메뉴 열기"
        >
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={styles.line} />
        </button>

        <Link to="/" className={styles.homeButton}>
          Home
        </Link>
      </div>

      <div className={styles.right}>
        <a href="#resume" className={styles.ctaPill}>
          See Resume
        </a>
      </div>

      {isMenuOpen && (
        <div className={styles.dropdown}>
          <Link
            to="/"
            className={styles.dropdownLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/project"
            className={styles.dropdownLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Project
          </Link>
          <Link
            to="/about"
            className={styles.dropdownLink}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
