import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  });

  return (
    <nav className={`${styles.nav} ${isAboutPage ? styles.navDark : ""}`}>
      <div className={styles.left}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
          aria-controls="nav-dropdown"
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
        <div className={styles.dropdown} id="nav-dropdown">
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
