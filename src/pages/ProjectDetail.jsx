import { useParams, Link } from "react-router-dom";
import projects from "../data/projects";
import styles from "./ProjectDetail.module.css";

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <div>프로젝트를 찾을 수 없습니다.</div>;

  const { title, subtitle, period, type, description, stack, github, demo } =
    project;

  return (
    <div className={styles.page}>
      <Link to="/project" className={styles.backButton}>
        ←
      </Link>

      <div className={styles.header}>
        <span className={styles.type}>{type}</span>
        <span className={styles.period}>{period}</span>
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.description}>{description}</p>

      <ul className={styles.stackList}>
        {stack.map((tech) => (
          <li key={tech} className={styles.stackItem}>
            {tech}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
