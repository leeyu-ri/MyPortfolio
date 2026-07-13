import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/project">Project</Link>
      <Link to="/about">About</Link>
      {/* to 속성 = a태그의 href 와 같은 역할 : 이 링크를 누르면 이 경로로 이동해줘 */}
    </nav>
  );
}

export default Nav;
