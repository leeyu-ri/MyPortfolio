import { Link } from "react-router-dom";
import styles from "./OverviewCard.module.css";

function OverviewCard({ title, description, to }) {
  return (
    <Link to={to} className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.arrow}>↗</span>
    </Link>
  );
}

export default OverviewCard;
