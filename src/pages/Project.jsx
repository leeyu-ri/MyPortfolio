import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import styles from "./Project.module.css";

function Project() {
  return (
    <div className={styles.project}>
      <h1 className={styles.projectTitle}>My Project</h1>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Project;
