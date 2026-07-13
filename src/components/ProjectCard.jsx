import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  const { title, subtitle, period, type, description, stack, github, demo } =
    project;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.type}>{type}</span>
        <span className={styles.period}>{period}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>
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

export default ProjectCard;
