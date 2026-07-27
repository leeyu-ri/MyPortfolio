import { Link } from "react-router-dom";

function OverviewCard({ title, description, to }) {
  return (
    <Link to={to}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>↗</span>
    </Link>
  );
}

export default OverviewCard;
