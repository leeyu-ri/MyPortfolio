import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav className={styles.nav}>
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
        <a
          href="https://app.notion.com/p/3b26e780c0d080bfa37adae3aa493ec2?source=copy_link"
          className={styles.ctaPill}
          target="_blank"
          rel="noopener noreferrer"
        >
          See Resume
          <span className="sr-only">(새 탭에서 열림)</span>
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
